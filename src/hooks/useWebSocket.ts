// React Hook for WebSocket connection
'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface TestEvent {
  type: 'answer_change' | 'tab_blur' | 'tab_focus' | 'progress_update' | 'test_submitted';
  testSessionId: string;
  data: any;
}

export function useWebSocket(testSessionId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<TestEvent | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socket = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);

      // Join test room if testSessionId is provided
      if (testSessionId) {
        socket.emit('join_test_room', testSessionId);
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    socket.on('test_update', (event: TestEvent) => {
      console.log('Test update received:', event);
      setLastEvent(event);
    });

    // Cleanup on unmount
    return () => {
      if (testSessionId) {
        socket.emit('leave_test_room', testSessionId);
      }
      socket.disconnect();
    };
  }, [testSessionId]);

  // Emit candidate event
  const emitCandidateEvent = (event: TestEvent) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('candidate_event', event);
    }
  };

  return {
    isConnected,
    lastEvent,
    emitCandidateEvent,
    socket: socketRef.current,
  };
}
