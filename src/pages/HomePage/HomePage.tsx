import './HomePage.css';
import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="container">
            <div className="banner">
                <img src="/banner2.png" alt="Bannière" className="banner-image"/>
                <div className="banner-text">
                    Footix Quiz
                </div>
            </div>
            {/* Autres éléments de la page d'accueil ici */}
        </div>
    );
}

export default HomePage;
