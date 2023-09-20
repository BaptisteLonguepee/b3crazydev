import './HomePage.css';
import SpeedGame from "../../PhaserGame/SpeedGame";
import Quiz from "../Quizz/Quiz";
import React from 'react';
import { Link } from 'react-router-dom';



const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <div className="banner">
                <img src="/banner2.png" alt="Bannière" className="banner-image"/>
                <div className="banner-text">
                    Footix Quiz
                </div>
            </div>
            <Link to="../Quizz/Quiz">
                <button className="quiz-button">
                    Commencer le Quiz
                </button>
            </Link>
            {/* Autres éléments de la page d'accueil ici */}
        </div>


    );
}


export default HomePage;
