import React, { useEffect } from 'react';
import './App.css';

function App() {
    let game: Phaser.Game | undefined;
    let balloon: Phaser.GameObjects.Sprite | undefined;
    const MAX_BALLOON_SIZE = 500;

    useEffect(() => {
        // Demande d'accès au microphone
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                // Configuration de l'analyseur pour obtenir des données de volume
                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                // Boucle pour vérifier le volume
                function checkVolume() {
                    analyser.getByteFrequencyData(dataArray);

                    // Obtenez le volume moyen
                    const volume = dataArray.reduce((a, b) => a + b) / bufferLength;

                    // Logique pour gonfler le ballon
                    const VOLUME_THRESHOLD = 150;

                    if(volume > VOLUME_THRESHOLD) {
                        inflateBalloon();
                    }

                    requestAnimationFrame(checkVolume);
                }

                checkVolume();
            })
            .catch(error => {
                console.error('Error accessing microphone: ', error);
            });

        function inflateBalloon() {
            // Initialisation de Phaser s'il n'est pas déjà initialisé
            if (!game) {
                const config: Phaser.Types.Core.GameConfig = {
                    type: Phaser.AUTO,
                    width: 800,
                    height: 600,
                    scene: {
                        preload: preload,
                        create: create
                    },
                    parent: 'phaser-game'  // Ajout du parent pour ancrer le jeu à l'élément div
                };
                game = new Phaser.Game(config);
            }

            // Augmenter la taille du ballon
            if (balloon) {
                balloon.setScale(balloon.scaleX + 0.05, balloon.scaleY + 0.05);

                // Vérifier si le ballon doit exploser
                if (balloon.scaleX * balloon.width >= MAX_BALLOON_SIZE) {
                    explodeBalloon();
                }
            }
        }

        function preload(this: Phaser.Scene) {
            this.load.image('balloon', './img/ballon.jpg');
        }

        function create(this: Phaser.Scene) {
            balloon = this.add.sprite(400, 300, 'balloon');
            balloon.setScale(0.1);
        }

        function explodeBalloon() {
            balloon?.destroy();
            // window.location.href = '/';
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>React + Phaser Demo with TypeScript</p>
                <div id="phaser-game" style={{ width: '800px', height: '600px' }}></div>  {/* Ajout de styles pour définir les dimensions */}
            </header>
        </div>
    );
}

export default App;
