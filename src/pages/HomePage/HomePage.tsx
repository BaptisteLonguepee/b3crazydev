import './HomePage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleQuizStart = () => {
        const homeContainer = document.querySelector('.home-container');
        homeContainer?.classList.add('bounce-out-right-animation');
        setTimeout(() => {
            navigate("/quizz");
        }, 700); // redirige vers le quiz après 0.7 secondes
    }

    return (
        <div className="home-container">
            <div className="banner">
                <img src="/banner2.png" alt="Bannière" className="banner-image"/>
                <div className="banner-text">Footix Quiz</div>
            </div>

            <div className="content-wrapper">
                <div className="left-content">
                    <div className="quiz-button-container">
                        <button className="quiz-button" onClick={handleQuizStart}>
                            Commencer le Quiz
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <div className="ronaldo-speech-bubble">
                        Bienvenue au Footix Quiz! Quel joueur seras-tu !🤔
                    </div>
                    <img src="/gifUmtiti.gif" alt="Ronaldo Gif" className="ronaldo-gif" />
                </div>
            </div>

            <footer>
                © 2023 Footix Quiz. Tous droits réservés.
            </footer>
        </div>
    );
}

export default HomePage;
