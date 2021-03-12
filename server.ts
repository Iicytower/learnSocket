import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { router as indexRouter } from './routes/index';

// App setup
const app: express.Application = express();

app.use('/', indexRouter);

// Create server
const httpServer = http.createServer(app);

const io = new Server(httpServer, {});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log('message: ' + JSON.stringify(msg));
  });

  io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value',
  }); // This will emit the event to all connected sockets

  io.on('connection', socket => {
    // io.emit('chat message', {
    //   nickname: 'Admin',
    //   value: 'New user connected',
    // });
    socket.broadcast.emit('hi');
  });

  // Disconnect section
  socket.on('disconnect', () => {

    io.emit('chat message', {
      nickname: 'Admin',
      value: 'User disconnected',
    });

    console.log('user disconnected');
  });

});

const PORT: number = Number(process.env.PORT ?? 5000);
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
