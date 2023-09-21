import React, { useEffect, useRef, useState } from 'react';

const MAX_SIZE = 15;
const VOLUME_THRESHOLD = 50;

const BalloonComponent: React.FC = () => {
    const balloonElement = useRef<HTMLDivElement>(null);
    const [balloonSize, setBalloonSize] = useState(1);

    useEffect(() => {
        let cancelAnimationFrameId: number;

        function inflateBalloon() {
            setBalloonSize(prevSize => {
                const newSize = prevSize + 0.05;
                if (newSize > MAX_SIZE) {
                    explodeBalloon();
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
        if (balloonElement.current) {
            balloonElement.current.style.transform = `scale(${balloonSize})`;
        }
    }, [balloonSize]);

    function explodeBalloon() {
        if (balloonElement.current) {
            balloonElement.current.classList.add('explode');
            // Vous pouvez aussi ajouter la logique pour jouer le son d'explosion ici.
        }
    }

    return (
        <div className="container">
            <div className="balloon" ref={balloonElement}></div>
        </div>
    );
};

export default BalloonComponent;
