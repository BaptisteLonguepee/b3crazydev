import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

const PhaserGame: React.FC = () => {
    const gameRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!gameRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config);

        let star: Phaser.Physics.Arcade.Image;

        function preload(this: Phaser.Scene) {
            this.load.image('star', 'path/to/star.png');
        }

        function create(this: Phaser.Scene) {
            star = this.physics.add.image(400, 300, 'star');
            star.setCollideWorldBounds(true);
            star.setBounce(0.7);
        }

        function update() {
            if (star.y > 580) {
                star.setVelocityY(-300);
            }
        }

        return () => {
            // À la désinscription, détruisez le jeu pour libérer la mémoire
            game.destroy(true);
        };
    }, []);

    return <div ref={gameRef}></div>;
};

export default PhaserGame;
