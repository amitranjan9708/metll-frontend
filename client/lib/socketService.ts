import { io, Socket } from 'socket.io-client';
import { API_BASE_URL as API_URL, getAuthHeaders } from './api-config';

// Convert API_URL to WebSocket URL by replacing /api with nothing (if socket runs on root)
// Assuming the backend is at http://localhost:8080/api, the socket server is at http://localhost:8080
const SOCKET_URL = API_URL.replace(/\/api\/?$/, '');

class SocketService {
  private socket: Socket | null = null;
  private currentRoomId: number | null = null;
  private messageHandlers: Array<(msg: any) => void> = [];

  connect() {
    if (this.socket?.connected) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Socket connect failed: No auth token');
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
      // Rejoin room if we reconnected
      if (this.currentRoomId) {
        this.joinChat(this.currentRoomId);
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket connect_error:', err.message);
    });

    // Listen for new messages
    this.socket.on('new_message', (data: any) => {
      this.messageHandlers.forEach(handler => handler(data));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentRoomId = null;
    }
  }

  joinChat(matchId: number) {
    if (!this.socket?.connected) this.connect();
    
    this.currentRoomId = matchId;
    this.socket?.emit('join_chat', { matchId });
    console.log(`Joined chat room for match: ${matchId}`);
  }

  leaveChat(matchId: number) {
    this.socket?.emit('leave_chat', { matchId });
    if (this.currentRoomId === matchId) {
      this.currentRoomId = null;
    }
    console.log(`Left chat room for match: ${matchId}`);
  }

  // Use HTTP API as primary for sending to guarantee delivery,
  // but we can expose socket.emit if needed.
  sendMessage(matchId: number, content: string, type: 'text' | 'image' | 'video' = 'text', mediaUrl?: string) {
    if (!this.socket?.connected) {
      console.error('Cannot send message via socket: Not connected');
      return false;
    }
    this.socket.emit('send_message', { matchId, content, type, mediaUrl });
    return true;
  }

  onMessage(handler: (msg: any) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }
}

export const socketService = new SocketService();
