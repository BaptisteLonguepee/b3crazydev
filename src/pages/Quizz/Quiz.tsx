import React, { useState } from "react";
import "./Quiz.css";

const EMOJIS = ["🚗", "🏀", "📺", "🕺", "🍕", "📚"];

const QUIZ_DATA = [
    {
        category: "Vitesse",
        question: "Si tu étais une voiture, laquelle serais-tu?",
        answers: [
            { text: "a) Une Ferrari", score: 90 },
            { text: "b) Une 2CV", score: 60 },
            { text: "c) Un vélo (ça compte ?)", score: 30 }
        ]
    },
    {
        category: "Tir",
        question: "Comment lances-tu un papier à la poubelle?",
        answers: [
            { text: "a) En visant soigneusement.", score: 80 },
            { text: "b) En shootant comme un pro.", score: 90 },
            { text: "c) Je le pose gentiment à côté.", score: 10 }
        ]
    },
    {
        category: "Passes",
        question: "Comment donnes-tu la télécommande à quelqu'un?",
        answers: [
            { text: "a) Je la lance.", score: 70 },
            { text: "b) Je la passe doucement.", score: 85 },
            { text: "c) Je ne la donne jamais, c'est la mienne !", score: 10 }
        ]
    },
    {
        category: "Dribbles",
        question: "Comment te faufiles-tu dans une foule?",
        answers: [
            { text: "a) En dribblant entre les gens.", score: 90 },
            { text: "b) J'attends patiemment mon tour.", score: 30 },
            { text: "c) J'évite les foules.", score: 40 }
        ]
    },
    {
        category: "Défense",
        question: "Comment réagis-tu quand quelqu'un essaie de prendre la dernière part de pizza ?",
        answers: [
            { text: "a) Je la défends avec ma vie.", score: 90 },
            { text: "b) Je la laisse partir.", score: 20 },
            { text: "c) Je propose de la partager.", score: 70 }
        ]
    },
    {
        category: "Physique",
        question: "Comment portes-tu une pile de livres ?",
        answers: [
            { text: "a) Sur la tête, pour travailler mon équilibre.", score: 70 },
            { text: "b) Dans mes bras, en grimaçant.", score: 40 },
            { text: "c) Un à un.", score: 20 }
        ]
    }
];

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<number[]>([]);
    const currentQuestion = QUIZ_DATA[currentQuestionIndex];

    const handleAnswerClick = (answerScore: number) => {
        setScores([...scores, answerScore]);
        const nextQuestionIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextQuestionIndex);
    };

    const totalScore = scores.reduce((acc, curr) => acc + curr, 0);

    if (currentQuestionIndex === QUIZ_DATA.length) {
        return (
            <div className="resultContainerFlex">
                <div className="resultContainer">
                    <img src="/carte.webp" alt="FIFA Card" className="fifaCardImage"/>
                    {scores.map((score, index) => (
                        <div key={index} className={`score score-${index}`}>{score}</div>
                    ))}
                    <div className="totalScore">{Math.floor(totalScore/6)}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="quizContainerFlex">
            <div className="quizContainer">
                <h2 className="emojiHeader">{EMOJIS[currentQuestionIndex]}</h2>
                <h3>{currentQuestion.category}</h3>
                <p>{currentQuestion.question}</p>
                {currentQuestion.answers.map((answer, index) => (
                    <button className="answerButton" key={index} onClick={() => handleAnswerClick(answer.score)}>
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>

    );
}

export default Quiz;
