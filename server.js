const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createOrJoinRoom', (roomID) => {
        if (!rooms[roomID]) {
            rooms[roomID] = {
                players: [],
                scores: {}
            };
        }

        if (rooms[roomID].players.length < 2) {
            rooms[roomID].players.push(socket.id);
            socket.join(roomID);
            if (rooms[roomID].players.length === 2) {
                socket.emit('startQuiz', { otherPlayerSocketId: rooms[roomID].players[0] });
                io.to(rooms[roomID].players[0]).emit('startQuiz', { otherPlayerSocketId: socket.id });
            }
        } else {
            socket.emit('roomError', 'La salle est pleine ou une autre erreur s\'est produite.');
        }
    });

    socket.on('answerQuestion', (data) => {
        const { roomID, currentQuestionIndex, quizLength } = data;
        const progress = Math.round((currentQuestionIndex / quizLength) * 100);
        socket.to(roomID).emit('updateOpponentProgress', progress);
    });


    socket.on('gameOver', (data) => {
        const { score } = data;
        console.log(`Received gameOver from ${socket.id} with score: ${score}`);
        const room = Object.keys(socket.rooms).find(room => room !== socket.id);
        if (room && rooms[room]) {
            rooms[room].scores[socket.id] = score;

            // Si les deux joueurs ont terminé, envoyez les scores finaux
            if (Object.keys(rooms[room].scores).length === 2) {
                io.to(room).emit('finalScores', rooms[room].scores);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        for (let room in rooms) {
            const index = rooms[room].players.indexOf(socket.id);
            if (index !== -1) {
                rooms[room].players.splice(index, 1);
                delete rooms[room].scores[socket.id];
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
