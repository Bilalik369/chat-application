import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
     
      const newSocket = io(process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000', {
        auth: {
          token: token
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setIsConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user, token]);

  const joinRoom = (roomId) => {
    if (socket && isConnected) {
      socket.emit('join-room', roomId);
    }
  };

  const leaveRoom = (roomId) => {
    if (socket && isConnected) {
      socket.emit('leave-room', roomId);
    }
  };

  const sendMessage = (roomId, message) => {
    if (socket && isConnected) {
      socket.emit('send-message', {
        roomId,
        message: message.text,
        timestamp: new Date().toISOString()
      });
    }
  };

  const value = {
    socket,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};