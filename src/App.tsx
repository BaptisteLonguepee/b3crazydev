import React, { useState } from 'react';
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizz from "./pages/Quizz/Quiz";
import QuizzGame from "./pages/QuizzGame/QuizzGame";
import BalloonComponent from "./BallonComponement";

function App() {
    const lastExplodedDate = localStorage.getItem('lastExplodedDate');
    const minutesSinceLastExploded = lastExplodedDate ? (Date.now() - new Date(lastExplodedDate).getTime()) / (1000 * 60) : 0;

    const [balloonExploded, setBalloonExploded] = useState(() => {
        if (localStorage.getItem('balloonExploded') === 'true') {
            return minutesSinceLastExploded <= 1;

        }
        return false;
    });

    const explodeAndNavigate = () => {
        setBalloonExploded(true);
        localStorage.setItem('balloonExploded', 'true');
        localStorage.setItem('lastExplodedDate', new Date().toISOString());
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={balloonExploded ? <HomePage /> : <BalloonComponent explodeAndNavigate={explodeAndNavigate} />} />
                <Route path="/quizz" element={<Quizz />} />
                <Route path="/quizzGame" element={<QuizzGame />} />
            </Routes>
        </Router>
    );
}

export default App;
