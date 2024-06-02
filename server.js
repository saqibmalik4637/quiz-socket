const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.post('/rooms/joined', (req, res) => {
  const user = req.body.user;
  const room = req.body.room;

  io.emit(`new_user_joined${room.id}`, { user: user });
  res.status(200).send({ status: 'Joined user broadcasted' });
});

server.listen(4000, () => {
  console.log('Socket.IO server running on port 4000');
});
