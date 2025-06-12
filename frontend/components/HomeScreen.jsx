// components/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import homeStyles from '../assets/styles/home.styles';

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleCreateRoom = () => {
    router.push('/create-room');
  };

  const handleJoinRoom = () => {
    router.push('/join-room');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              router.replace('/');
            }
          }
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
   
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView 
      style={homeStyles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={homeStyles.header}>
        <View style={homeStyles.userInfo}>
          <Text style={homeStyles.welcomeText}>Salut, {user?.name}!</Text>
          <Text style={homeStyles.subtitle}>Prêt à chatter ?</Text>
        </View>
        <TouchableOpacity style={homeStyles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color="#ff4757" />
        </TouchableOpacity>
      </View>

      <View style={homeStyles.actionsContainer}>
        <TouchableOpacity style={homeStyles.primaryAction} onPress={handleCreateRoom}>
          <Icon name="add-circle" size={32} color="#ffffff" />
          <Text style={homeStyles.primaryActionText}>Créer une salle</Text>
          <Text style={homeStyles.actionSubtext}>Commencer une nouvelle conversation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={homeStyles.secondaryAction} onPress={handleJoinRoom}>
          <Icon name="group-add" size={32} color="#6d93b8" />
          <Text style={homeStyles.secondaryActionText}>Rejoindre une salle</Text>
          <Text style={homeStyles.actionSubtext}>Entrer avec un code de salle</Text>
        </TouchableOpacity>
      </View>

      <View style={homeStyles.recentRoomsContainer}>
        <Text style={homeStyles.sectionTitle}>Salles récentes</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6d93b8" style={homeStyles.loader} />
        ) : rooms.length === 0 ? (
          <View style={homeStyles.emptyState}>
            <Icon name="chat-bubble-outline" size={48} color="#cccccc" />
            <Text style={homeStyles.emptyStateText}>Aucune salle récente</Text>
            <Text style={homeStyles.emptyStateSubtext}>
              Créez ou rejoignez une salle pour commencer à chatter
            </Text>
          </View>
        ) : (
          rooms.map((room) => (
            <TouchableOpacity 
              key={room.id} 
              style={homeStyles.roomCard}
              onPress={() => router.push(`/chat/${room.id}`)}
            >
              <View style={homeStyles.roomInfo}>
                <Text style={homeStyles.roomName}>{room.name}</Text>
                <Text style={homeStyles.roomLastMessage}>{room.lastMessage}</Text>
              </View>
              <View style={homeStyles.roomMeta}>
                <Text style={homeStyles.roomTime}>{room.lastMessageTime}</Text>
                {room.unreadCount > 0 && (
                  <View style={homeStyles.unreadBadge}>
                    <Text style={homeStyles.unreadCount}>{room.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;