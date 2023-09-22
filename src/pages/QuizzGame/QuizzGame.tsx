import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './QuizzGame.css';

const socket = io('http://localhost:3000');

const EMOJIS = ["🚗", "🏀", "📺", "🕺", "🍕", "📚"];
const QUIZ_DATA = [
    {
        category: "Règles",
        question: "Combien de temps dure une mi-temps en football ?",
        answers: [
            { text: "a) 45 minutes", score: 1 },
            { text: "b) 30 minutes", score: 0 },
            { text: "c) 60 minutes", score: 0 }
        ]
    },
    {
        category: "Équipes",
        question: "Quelle équipe est surnommée 'Les Reds'?",
        answers: [
            { text: "a) Manchester United", score: 1 },
            { text: "b) Chelsea", score: 0 },
            { text: "c) Juventus", score: 0 }
        ]
    },
    {
        category: "Joueurs",
        question: "Quel joueur est surnommé 'La Pulga'?",
        answers: [
            { text: "a) Cristiano Ronaldo", score: 0 },
            { text: "b) Lionel Messi", score: 1 },
            { text: "c) Neymar", score: 0 }
        ]
    },
    {
        category: "Stades",
        question: "Quel est le stade du FC Barcelone ?",
        answers: [
            { text: "a) Old Trafford", score: 0 },
            { text: "b) Camp Nou", score: 1 },
            { text: "c) Anfield", score: 0 }
        ]
    },
    {
        category: "Championnats",
        question: "Quel est le championnat de football d'Allemagne ?",
        answers: [
            { text: "a) Serie A", score: 0 },
            { text: "b) La Liga", score: 0 },
            { text: "c) Bundesliga", score: 1 }
        ]
    },
    {
        category: "Coupes",
        question: "Quel club a remporté le plus de Ligue des Champions ?",
        answers: [
            { text: "a) FC Barcelone", score: 0 },
            { text: "b) AC Milan", score: 0 },
            { text: "c) Real Madrid", score: 1 }
        ]
    },
    {
        category: "Techniques",
        question: "Qu'est-ce qu'un 'hat-trick'?",
        answers: [
            { text: "a) Trois buts en un match", score: 1 },
            { text: "b) Un triple dribble", score: 0 },
            { text: "c) Trois cartons rouges", score: 0 }
        ]
    },
    {
        category: "Stratégie",
        question: "Qu'est-ce qu'une 'feinte de corps' en football ?",
        answers: [
            { text: "a) Un mouvement pour tromper l'adversaire sans toucher le ballon", score: 1 },
            { text: "b) Une technique de tacle", score: 0 },
            { text: "c) Un type de passe", score: 0 }
        ]
    },
    {
        category: "Formation",
        question: "Quelle formation utilise trois défenseurs, cinq milieux et deux attaquants ?",
        answers: [
            { text: "a) 4-4-2", score: 0 },
            { text: "b) 3-5-2", score: 1 },
            { text: "c) 4-3-3", score: 0 }
        ]
    },
    {
        category: "Tactique",
        question: "Qu'est-ce que le 'pressing' en football ?",
        answers: [
            { text: "a) Courir vite vers le but adverse", score: 0 },
            { text: "b) Mettre la pression sur l'adversaire pour récupérer le ballon", score: 1 },
            { text: "c) Tirer en force", score: 0 }
        ]
    },
    {
        category: "Jargon",
        question: "Qu'est-ce qu'un 'caviar' en football ?",
        answers: [
            { text: "a) Une passe décisive de grande qualité", score: 1 },
            { text: "b) Un but spectaculaire", score: 0 },
            { text: "c) Un tir raté", score: 0 }
        ]
    },
    {
        category: "Fair-Play",
        question: "Quelle action peut être récompensée par un prix du fair-play ?",
        answers: [
            { text: "a) Simuler une faute", score: 0 },
            { text: "b) Aider un adversaire à se relever", score: 1 },
            { text: "c) Ignorer l'arbitre", score: 0 }
        ]
    },
    {
        category: "Légendes",
        question: "Qui a remporté le Ballon d'Or en 1998 ?",
        answers: [
            { text: "a) Ronaldo", score: 0 },
            { text: "b) Zinedine Zidane", score: 1 },
            { text: "c) George Weah", score: 0 }
        ]
    },
    {
        category: "Records",
        question: "Qui détient le record du nombre de buts marqués en un an civil ?",
        answers: [
            { text: "a) Lionel Messi", score: 1 },
            { text: "b) Pele", score: 0 },
            { text: "c) Thierry Henry", score: 0 }
        ]
    },
    {
        category: "Transferts",
        question: "Quel est le transfert le plus cher de l'histoire ? (jusqu'en 2022)",
        answers: [
            { text: "a) Neymar vers PSG", score: 1 },
            { text: "b) Cristiano Ronaldo vers Juventus", score: 0 },
            { text: "c) Gareth Bale vers Real Madrid", score: 0 }
        ]
    },
    {
        category: "Arbitrage",
        question: "Quel carton exclut temporairement un joueur en football ?",
        answers: [
            { text: "a) Carton jaune", score: 0 },
            { text: "b) Carton rouge", score: 0 },
            { text: "c) Aucun, l'exclusion est toujours définitive", score: 1 }
        ]
    },
    {
        category: "Internationaux",
        question: "Quel pays a remporté le plus de Coupes du Monde féminines ?",
        answers: [
            { text: "a) États-Unis", score: 1 },
            { text: "b) Allemagne", score: 0 },
            { text: "c) Norvège", score: 0 }
        ]
    },
    {
        category: "Histoire récente",
        question: "Quel club a remporté la Ligue des Champions en 2021 ?",
        answers: [
            { text: "a) Manchester City", score: 0 },
            { text: "b) Chelsea", score: 1 },
            { text: "c) Bayern Munich", score: 0 }
        ]
    },
    {
        category: "Histoire",
        question: "Quel pays a remporté la première Coupe du Monde de football en 1930 ?",
        answers: [
            { text: "a) Brésil", score: 0 },
            { text: "b) Allemagne", score: 0 },
            { text: "c) Uruguay", score: 1 }
        ]
    },
    {
        category: "Sponsor",
        question: "Quelle marque sponsorise l'équipe du FC Barcelone ?",
        answers: [
            { text: "a) Adidas", score: 0 },
            { text: "b) Nike", score: 1 },
            { text: "c) Puma", score: 0 }
        ]
    },
    {
        category: "",
        question: "Bien joué, vous avez terminé le quizz !",
        answers: [
            { text: "Voir les resultats", score: 0 },

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

    useEffect(() => {
        socket.on('startQuiz', (data) => {
            setStarted(true);
            setOtherPlayerSocketId(data.otherPlayerSocketId);
        });

        socket.on('updateOpponentProgress', (progress) => {
            setOpponentProgress(progress);
        });

        socket.on('announceWinner', (data) => {
            setWinner(data.winner === socket.id ? 'gagné' : 'perdu');
        });

        socket.on('gameOver', (data) => {
            console.log('Received gameOver with data:', data);
            setOpponentTotalScore(data.scores[otherPlayerSocketId]);
        });
    }, []);

    const createOrJoinRoom = () => {
        socket.emit('createOrJoinRoom', roomID);
    };

    const handleAnswerClick = (answerScore: number) => {
        setScores((prevScores) => [...prevScores, answerScore]);
        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex >= QUIZ_DATA.length) {
            const totalScore = scores.reduce((acc, val) => acc + val, 0) + answerScore;
            console.log('Sending final score:', totalScore);
            socket.emit('gameOver', { score: totalScore });
            return;
        }

        setCurrentQuestionIndex(nextQuestionIndex);
        socket.emit('answerQuestion', { roomID, currentQuestionIndex, quizLength: QUIZ_DATA.length });
    };

    return (
        <div>
            {winner ? (
                <>
                    <h2>Vous avez {winner}</h2>
                    <h3>Votre score: {scores.reduce((acc, val) => acc + val, 0)}</h3>
                </>
            ) : null}
            {!started ? (
                <div>
                    <input type="text" value={roomID} onChange={e => setRoomID(e.target.value)} placeholder="Enter room ID" />
                    <button onClick={createOrJoinRoom}>Create/Join Room</button>
                </div>
            ) : (
                <>

                    {currentQuestion && (
                        <>
                            <div className="opponentProgress">
                                <ProgressBar
                                    now={opponentProgress}
                                    label={`${opponentProgress}%`}
                                    striped
                                    variant="info"
                                    animated
                                />
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