const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "http://localhost:3001", methods: ["GET", "POST"] }
});

let rooms = {};
let scores = {};

io.on('connection', (socket) => {
  socket.on('createOrJoinRoom', (roomID) => {
    if (!rooms[roomID]) {
      rooms[roomID] = [];
    }
    rooms[roomID].push(socket.id);
    socket.join(roomID);

    if (rooms[roomID].length === 2) {
      io.to(rooms[roomID][0]).emit('startQuiz', {otherPlayerSocketId: rooms[roomID][1]});
      io.to(rooms[roomID][1]).emit('startQuiz', {otherPlayerSocketId: rooms[roomID][0]});
    }

  });

  socket.on('gameOver', (data) => {
    const roomID = Object.keys(rooms).find((key) => rooms[key].includes(socket.id));
    if (!roomID) return;

    if (!scores[roomID]) {
      scores[roomID] = {};
    }

    scores[roomID][socket.id] = data.score;

    // Côté serveur
    if (Object.keys(scores[roomID]).length === 2) {
      console.log("Both players finished, calculating winner...");
      let winner = "";
      const entries = Object.entries(scores[roomID]);
      if (entries[0][1] > entries[1][1]) {
        winner = entries[0][0];
      } else {
        winner = entries[1][0];
      }
      io.to(roomID).emit('announceWinner', { winner });
      io.to(roomID).emit('gameOver', {scores: scores[roomID]});
    }


  });

  socket.on('newTurn', (msg) => {
    socket.broadcast.emit('updateOpponentProgress', { score: msg.turn });
  });

  socket.on('answerQuestion', (data) => {
    const roomID = data.roomID;
    const questionIndex = data.currentQuestionIndex;
    const progress = ((questionIndex + 1) / 20) * 100;

    // Envoyer cette progression à l'adversaire
    socket.to(roomID).emit('updateOpponentProgress', progress);
  });

  socket.on('disconnect', () => {
    for (const room in rooms) {
      rooms[room] = rooms[room].filter(id => id !== socket.id);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});