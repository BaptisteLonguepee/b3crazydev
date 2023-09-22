import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './QuizzGame.css';

const socket = io('http://localhost:3000');

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


const QuizzGame = () => {
    const [roomID, setRoomID] = useState("");
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<number[]>([]);
    const [opponentProgress, setOpponentProgress] = useState(0);
    const [winner, setWinner] = useState("");
    const currentQuestion = QUIZ_DATA[currentQuestionIndex];
    const [opponentTotalScore, setOpponentTotalScore] = useState<number>(0);
    const [otherPlayerSocketId, setOtherPlayerSocketId] = useState<string>("");
    const [quizFinished, setQuizFinished] = useState(false);
    const [adversaryScore, setAdversaryScore] = useState<number>(0);

    const createOrJoinRoom = () => {
        socket.emit('createOrJoinRoom', roomID);
    };

    useEffect(() => {
        socket.on('startQuiz', (data) => {
            setStarted(true);
            setOtherPlayerSocketId(data.otherPlayerSocketId);
        });


        socket.on('updateOpponentProgress', (progress) => {
            setOpponentProgress(Math.round(progress));
        });


        socket.on('announceWinner', (data) => {
            setWinner(data.winner === socket.id ? 'Vous' : 'Adversaire');
        });

        socket.on('gameOver', (data) => {
            setOpponentTotalScore(data.score);
        });

        socket.on('finalScores', (scores) => {
            console.log(`Received finalScores:`, scores);
            console.log(`Other player's socket ID: ${otherPlayerSocketId}`);
            setOpponentTotalScore(scores[otherPlayerSocketId]);
        });


        return () => {

            socket.off('finalScores');
        };
    }, [otherPlayerSocketId]);


    const handleAnswerClick = (answerScore: number) => {
        setScores((prevScores) => [...prevScores, answerScore]);
        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex >= QUIZ_DATA.length) {
            const totalScore = scores.reduce((acc, val) => acc + val, 0) + answerScore;
            console.log('Sending final score:', totalScore);
            socket.emit('gameOver', { score: totalScore });
            setQuizFinished(true);
        } else {
            setCurrentQuestionIndex(nextQuestionIndex);
            const progress = Math.round((nextQuestionIndex / QUIZ_DATA.length) * 100);
            socket.emit('answerQuestion', { roomID, currentQuestionIndex: nextQuestionIndex, quizLength: QUIZ_DATA.length });
        }
    };


    return (
        <div>
            {!started ? (
                <div>
                    <input type="text" value={roomID} onChange={e => setRoomID(e.target.value)} placeholder="Enter room ID" />
                    <button onClick={createOrJoinRoom}>Create/Join Room</button>
                </div>
            ) : (
                <>
                    {quizFinished ? (
                        <div>
                            <h2>Votre score: {scores.reduce((acc, val) => acc + val, 0)}</h2>
                            <h3>Score de l'adversaire: {opponentTotalScore}</h3>
                        </div>
                    ) : (
                        <>
                            <div className="opponentProgress">
                                <ProgressBar now={opponentProgress} label={`${opponentProgress}%`} striped variant="info" animated/>
                            </div>
                            <div className="quizContainer">
                                <h2 className="emojiHeader">{EMOJIS[currentQuestionIndex]}</h2>
                                <h3>{currentQuestion.category}</h3>
                                <p>{currentQuestion.question}</p>
                                {currentQuestion.answers.map((answer: any, index: number) => (
                                    <button className="answerButton" key={index} onClick={() => handleAnswerClick(answer.score)}>
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizzGame;