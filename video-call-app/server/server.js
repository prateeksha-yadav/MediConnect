const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Configure port (use environment variable if available)
const PORT = process.env.PORT || 3000;

// Serve static files with caching rules
app.use(express.static(path.join(__dirname, '../public'), { 
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
})); // ✅ Fixed: closing parenthesis was missing here

// Socket.io connection handling
io.on('connection', socket => {
    console.log('New user connected');
    
    socket.on('join-room', (roomId, userId, userType) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId, userType);
        
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        });
    });

    socket.on('offer', (offer, roomId, userType) => {
        socket.broadcast.to(roomId).emit('offer', offer, userType);
    });

    socket.on('answer', (answer, roomId) => {
        socket.broadcast.to(roomId).emit('answer', answer);
    });

    socket.on('ice-candidate', (candidate, roomId) => {
        socket.broadcast.to(roomId).emit('ice-candidate', candidate);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
