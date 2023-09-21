import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const MAX_SIZE = 15;
const VOLUME_THRESHOLD = 50;

const BalloonComponent: React.FC<{ explodeAndNavigate: () => void }> = ({ explodeAndNavigate }) => {
    const balloonElement = useRef<HTMLDivElement>(null);
    const [balloonSize, setBalloonSize] = useState(1);
    const [shouldExplode, setShouldExplode] = useState(false);

    useEffect(() => {
        let cancelAnimationFrameId: number;

        function inflateBalloon() {
            setBalloonSize(prevSize => {
                const newSize = prevSize + 0.05;
                if (newSize > MAX_SIZE) {
                    setShouldExplode(true);
                }
                return newSize;
            });
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
                    cancelAnimationFrameId = requestAnimationFrame(checkVolume);
                }

                checkVolume();
            })
            .catch(error => {
                console.error('Erreur d’accès au micro:', error);
            });

        return () => {
            cancelAnimationFrame(cancelAnimationFrameId);
        };
    }, []);

    useEffect(() => {
        if (shouldExplode) {
            explodeAndNavigate();
        }
    }, [shouldExplode, explodeAndNavigate]);

    useEffect(() => {
        if (balloonElement.current) {
            balloonElement.current.style.transform = `scale(${balloonSize})`;
        }
    }, [balloonSize]);

    return (
        <div className="container">
            <div className="instruction">Soufflez pour faire exploser le ballon 🎈</div>
            <div className="balloon" ref={balloonElement}></div>
            <button className="styled-button" onClick={() => setShouldExplode(true)}>
                Asthmatique ? Clique ici
            </button>
        </div>
    );
};

export default BalloonComponent;
