import './HomePage.css';
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
            <Link to="/quizz">
                <button className="quiz-button">
                    Commencer le Quiz
                </button>
            </Link>
        </div>


    );
}


export default HomePage;
