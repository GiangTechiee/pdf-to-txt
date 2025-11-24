const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    // Join a test session room (for recruiters monitoring)
    socket.on('join_test_room', (testSessionId) => {
      socket.join(`test_${testSessionId}`);
      console.log(`📍 Socket ${socket.id} joined room: test_${testSessionId}`);
    });

    // Leave a test session room
    socket.on('leave_test_room', (testSessionId) => {
      socket.leave(`test_${testSessionId}`);
      console.log(`📍 Socket ${socket.id} left room: test_${testSessionId}`);
    });

    // Handle candidate events
    socket.on('candidate_event', (event) => {
      console.log('📨 Candidate event:', event.type, event.testSessionId);
      // Broadcast to all recruiters monitoring this test
      io.to(`test_${event.testSessionId}`).emit('test_update', event);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🚀 Server ready on http://${hostname}:${port}`);
      console.log(`🔌 WebSocket ready on ws://${hostname}:${port}`);
    });
});
