import React, { useEffect } from 'react';
import './xbox.css'

function Xbox() {

    useEffect(() => {
        let achievementSound = new Audio('https://dl.dropboxusercontent.com/s/8qvrpd69ua7wio8/XboxAchievement.mp3');
        let achievementSoundRare = new Audio('https://dl.dropboxusercontent.com/s/po1udpov43am81i/XboxOneRareAchievement.mp3');

        const achievement = () => {
            let title = "Félicitations! Quizz fini !";
            let score = 100;

            let achievNameElem = document.querySelector('.achiev_name') as HTMLElement;
            let achieveScoreElem = document.querySelector('.acheive_score') as HTMLElement;

            if (achievNameElem) achievNameElem.innerText = title;
            if (achieveScoreElem) achieveScoreElem.innerText = score.toString();

            achievementSound.play();

            let circleElem = document.querySelector('.circle');
            let bannerElem = document.querySelector('.banner');
            let achieveDispElem = document.querySelector('.achieve_disp');

            if (circleElem) circleElem.classList.add('circle_animate');
            if (bannerElem) bannerElem.classList.add('banner-animate');
            if (achieveDispElem) achieveDispElem.classList.add('achieve_disp_animate');

            setTimeout(() => {
                if (circleElem) circleElem.classList.remove('circle_animate');
                if (bannerElem) bannerElem.classList.remove('banner-animate');
                if (achieveDispElem) achieveDispElem.classList.remove('achieve_disp_animate');
            }, 12000);
        };

        // Exécutez la fonction d'animation dès que le composant est monté
        achievement();
    }, []);

    return (
        <div className="content">
            <div className="achievement">
                <div className="animation">
                    <div className="circle">
                        <div className="img trophy_animate trophy_img">
                            <img className="trophy_1" src="https://dl.dropboxusercontent.com/s/k0n14tzcl4q61le/trophy_full.svg"/>
                            <img className="trophy_2" src="https://dl.dropboxusercontent.com/s/cd4k1h6w1c8an9j/trophy_no_handles.svg"/>
                        </div>
                        <div className="img xbox_img">
                            <img src="https://dl.dropboxusercontent.com/s/uopiulb5yeo1twm/xbox.svg?dl=0"/>
                        </div>
                        <div className="brilliant-wrap">
                            <div className="brilliant"></div>
                        </div>
                    </div>
                    <div className="banner-outer">
                        <div className="bannerXbox">
                            <div className="achieve_disp">
                                <span className="unlocked">Achievement unlocked</span>
                                <div className="score_disp">
                                    <div className="gamerscore">
                                        <img width="20px" src="https://dl.dropboxusercontent.com/s/gdqf5amvjkx9rfb/G.svg?dl=0"/>
                                        <span className="acheive_score"></span>
                                    </div>
                                    <span className="hyphen_sep">-</span>
                                    <span className="achiev_name"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Xbox;
