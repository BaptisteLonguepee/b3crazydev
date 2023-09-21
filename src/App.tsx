import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import HomePages from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizz from "./pages/Quizz/Quiz";

function App() {
    const balloonElement = useRef<HTMLDivElement>(null);
    const explosionSound = useRef<HTMLAudioElement>(null);
    const explosionBallon = useRef<HTMLAudioElement>(null);
    const lastExplodedDate = localStorage.getItem('lastExplodedDate');
    const minutesSinceLastExploded = lastExplodedDate ? (Date.now() - new Date(lastExplodedDate).getTime()) / (1000 * 60) : 0;

    const [ballonExploded, setBallonExploded] = useState(() => {
        if (localStorage.getItem('ballonExploded') === 'true') {
            if (minutesSinceLastExploded > 1) {
                // si plus de 1 minute s'est écoulée, considérez le ballon comme n'ayant pas explosé
                return false;
            }
            return true;
        }
        return false;
    });


    const VOLUME_THRESHOLD = 50;
    const MAX_SIZE = 15;
    let balloonSize = 1;
    useEffect(() => {
        function inflateBalloon() {
            balloonSize += 0.05;
            if (balloonElement.current) {
                balloonElement.current.style.transform = `scale(${balloonSize})`;
            }

            if (balloonSize > MAX_SIZE) {
                explodeBalloon();
            }
        }

        if (!ballonExploded) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const audioContext = new AudioContext();
                    const analyser = audioContext.createAnalyser();
                    const source = audioContext.createMediaStreamSource(stream);
                    source.connect(analyser);

                    const dataArray = new Uint8Array(analyser.frequencyBinCount);

                    function checkVolume() {
                        analyser.getByteFrequencyData(dataArray);
                        let sum = 0;
                        for (let i = 0; i < dataArray.length; i++) {
                            sum += dataArray[i];
                        }
                        let average = sum / dataArray.length;
                        if (average > VOLUME_THRESHOLD) {
                            inflateBalloon();
                        }
                        requestAnimationFrame(checkVolume);
                    }

                    checkVolume();

                })
                .catch(error => {
                    console.error('Erreur d’accès au micro:', error);
                });
        }

    }, [ballonExploded]);

    function explodeBalloon() {
        if (balloonElement.current) {
            balloonElement.current.classList.add('explode');
            explosionBallon.current?.play();
            explosionSound.current?.play();

            setTimeout(() => {
                setBallonExploded(true);
                localStorage.setItem('ballonExploded', 'true');
                localStorage.setItem('lastExplodedDate', new Date().toISOString()); // Enregistrez la date actuelle
            }, 500);
        }
    }

    return (
        <Router>
            {ballonExploded ? (
                <Routes>
                    <Route path="/" element={<HomePages />} />
                    <Route path="/quizz" element={<Quizz />} />
                </Routes>
            ) : (
                <div className="container">
                    <div className="ballon" ref={balloonElement}></div>
                </div>
            )}
            <audio ref={explosionBallon} src="/BallonPop.mp3" preload="auto"></audio>
            <audio ref={explosionSound} src="/SUIII.mp3" preload="auto"></audio>
        </Router>
    );
}
export default App;
