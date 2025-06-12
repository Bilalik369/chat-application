import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class RoomService {
  async createRoom(roomData) {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/rooms/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(roomData),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async joinRoom(roomCode) {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/rooms/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ roomCode }),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async getUserRooms() {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/rooms/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async getRoomMessages(roomId, page = 1, limit = 50) {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/messages?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async leaveRoom(roomId) {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }
}

export default new RoomService();
