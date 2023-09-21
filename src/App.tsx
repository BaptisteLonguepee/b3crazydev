import React, { useState } from 'react';
import './App.css';
import HomePages from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quizz from "./pages/Quizz/Quiz";
import QuizzGame from "./pages/QuizzGame/QuizzGame";
import BalloonComponent from "./BallonComponement";

function App() {
    const lastExplodedDate = localStorage.getItem('lastExplodedDate');
    const minutesSinceLastExploded = lastExplodedDate ? (Date.now() - new Date(lastExplodedDate).getTime()) / (1000 * 60) : 0;

    const [balloonExploded, setBalloonExploded] = useState(() => {
        if (localStorage.getItem('balloonExploded') === 'true') {
            if (minutesSinceLastExploded > 1) {
                return false;
            }
            return true;
        }
        return false;
    });

    return (
        <Router>
            <Routes>
                <Route path="/" element={balloonExploded ? <HomePages /> : <BalloonComponent />} />
                <Route path="/quizz" element={<Quizz />} />
                <Route path="/quizzGame" element={<QuizzGame />} />
            </Routes>
        </Router>
    );
}

export default App;
