// WebSocket Server for Real-time Updates
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

export interface TestEvent {
  type: 'answer_change' | 'tab_blur' | 'tab_focus' | 'progress_update' | 'test_submitted';
  testSessionId: string;
  data: any;
}

class WebSocketServer {
  private io: SocketIOServer | null = null;

  initialize(httpServer: HTTPServer) {
    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Join a test session room (for recruiters monitoring)
      socket.on('join_test_room', (testSessionId: string) => {
        socket.join(`test_${testSessionId}`);
        console.log(`Socket ${socket.id} joined room: test_${testSessionId}`);
      });

      // Leave a test session room
      socket.on('leave_test_room', (testSessionId: string) => {
        socket.leave(`test_${testSessionId}`);
        console.log(`Socket ${socket.id} left room: test_${testSessionId}`);
      });

      // Handle candidate events
      socket.on('candidate_event', (event: TestEvent) => {
        console.log('Candidate event:', event.type, event.testSessionId);
        // Broadcast to all recruiters monitoring this test
        this.io?.to(`test_${event.testSessionId}`).emit('test_update', event);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    console.log('WebSocket server initialized');
  }

  // Emit event to specific test room
  emitToTestRoom(testSessionId: string, event: TestEvent) {
    if (!this.io) {
      console.warn('WebSocket server not initialized');
      return;
    }

    this.io.to(`test_${testSessionId}`).emit('test_update', event);
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    if (!this.io) {
      console.warn('WebSocket server not initialized');
      return;
    }

    this.io.emit(event, data);
  }

  getIO() {
    return this.io;
  }
}

export const websocketServer = new WebSocketServer();
