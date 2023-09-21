// External Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Styles
import './HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    // Handlers
    const handleQuizStart = () => {
        const homeContainer = document.querySelector('.home-container');
        homeContainer?.classList.add('bounce-out-right-animation');
        setTimeout(() => {
            navigate("/quizz");
        }, 700); // redirige vers le quiz après 0.7 secondes
    }

    const handleNavigateToQuizzGame = () => {
        navigate("/quizzGame");
    }

    return (
        <div className="home-container">

            {/* Banner Section */}
            <div className="banner">
                <img src="/banner2.png" alt="Bannière" className="banner-image"/>
                <div className="banner-text">Footix Quiz</div>
            </div>

            {/* Content Section */}
            <div className="content-wrapper">
                {/* Left Content */}
                <div className="left-content">
                    <div className="quiz-button-container">
                        <button className="quiz-button" onClick={handleQuizStart}>
                            Commencer le Quiz
                        </button>
                    </div>
                </div>

                {/* Right Content */}
                <div className="right-content">
                    <div className="ronaldo-speech-bubble">
                        Bienvenue au Footix Quiz! Quel joueur seras-tu !🤔
                    </div>
                    <img src="/gifUmtiti.gif" alt="Ronaldo Gif" className="ronaldo-gif" />
                </div>
            </div>

            {/* Confrontation Section */}
            <div className="confrontation-section">
                <div className="confrontation-message">Prouvez votre génie footbalistique ! ⚽️ Défiez vos amis dès maintenant.</div>
                <div className="confrontation-buttons">
                    <button className="confrontation-button" onClick={handleNavigateToQuizzGame}>
                        Créer un salon
                    </button>
                    <button className="confrontation-button" onClick={handleNavigateToQuizzGame}>
                        Rejoindre un salon
                    </button>
                </div>
            </div>
            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <div className="creators">
                        <span>Créateurs :</span>
                        <a href="https://www.linkedin.com/in/baptiste-longuepee-6953a4207/" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin-icon.png" alt="LinkedIn de Creator1" className="linkedin-icon" />
                            Baptiste
                        </a>
                        <a href="https://www.linkedin.com/in/vianney-basquin-173358220/" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin-icon.png" alt="LinkedIn de Creator2" className="linkedin-icon" />
                            Vianney
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    © 2023 Footix Quiz. Tous droits réservés.
                </div>
            </footer>

        </div>

    );

}

export default HomePage;
