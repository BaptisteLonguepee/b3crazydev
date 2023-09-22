import React, { useState, useEffect } from 'react';
import './SpeedGame.css';

function SpeedGame() {
    const [carType, setCarType] = useState<"ferrari" | "2cv" | null>(null);
    const [score, setScore] = useState(0);

    const startGame = () => {
        setCarType(Math.random() > 0.5 ? "ferrari" : "2cv");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            endGame();
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const endGame = () => {
        if (score >= 20) {
            alert("Vous recevez une carte FIFA or !");
        } else if (score >= 10) {
            alert("Vous recevez une carte FIFA argent !");
        } else {
            console.log("Vous êtes un vélo 🚴");
        }
    };

    const handleCarClick = () => {
        if (carType === "ferrari") {
            setScore(prevScore => prevScore + 10);
        } else {
            setScore(prevScore => prevScore - 5);
        }
        setCarType(null);
    };



    return (
        <>
        <div className="gameContainer">
            <h1>Cliquez sur la Ferrari!</h1>
            <img
                className="movingCar"
                src={carType === "ferrari" ? "/ferrari.svg" : "/2cv2Blue.png"}
                alt={carType || "Car image"}
                onClick={handleCarClick}
            />

        </div>
        <div>Score : {score}</div>
        </>
);
}

export default SpeedGame;
