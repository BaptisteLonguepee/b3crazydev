import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import HomePages from "./pages/HomePage/HomePage";

function App() {
    const balloonElement = useRef<HTMLDivElement>(null);
    const explosionSound = useRef<HTMLAudioElement>(null);
    const explosionBallon = useRef<HTMLAudioElement>(null);

    const [ballonExploded, setBallonExploded] = useState(false); // État pour vérifier si le ballon a explosé ou non
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

    }, []);  // Le tableau vide signifie que useEffect ne s'exécute qu'au montage du composant

    function explodeBalloon() {
        if (balloonElement.current) {
            balloonElement.current.classList.add('explode');
            // Jouer le son d'explosion
            explosionBallon.current?.play();
            explosionSound.current?.play();

            setTimeout(() => {
                setBallonExploded(true);
            }, 500);
        }
    }

    return (
        <>
            {ballonExploded ? (
                <HomePages />
            ) : (
                <div className="container">
                    <div className="ballon" ref={balloonElement}></div>
                </div>
            )}
            <audio ref={explosionBallon} src="/BallonPop.mp3" preload="auto"></audio>
            <audio ref={explosionSound} src="/SUIII.mp3" preload="auto"></audio>
        </>
    );

}

export default App;
