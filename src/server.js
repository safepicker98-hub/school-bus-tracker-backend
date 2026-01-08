require('dotenv').config();

const http = require('http');
const express = require('express');
const app = express();
const routes = require('./routes/index');
const server = http.createServer(app);
const socketIo = require('socket.io');

app.use(express.json());

app.get('/welcome', (req, res) => {
  res.status(200).send('OK');
});
app.use('/api', routes);

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
