import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import chatStyles from '../assets/styles/chat.styles';

const ChatScreen = () => {
  const router = useRouter();
  const { roomId } = useLocalSearchParams();
  const { user } = useAuth();
  const scrollViewRef = useRef();
  
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Salut tout le monde! 👋',
      userId: 'user1',
      userName: 'Alice',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: '2',
      text: 'Hey! Comment allez-vous?',
      userId: user?.id,
      userName: user?.name,
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
    },
    {
      id: '3',
      text: 'Ça va bien, merci! Et toi?',
      userId: 'user1',
      userName: 'Alice',
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [roomInfo, setRoomInfo] = useState({
    name: `Salle ${roomId}`,
    participants: 3,
    maxParticipants: 10,
  });

  useEffect(() => {
 
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      userId: user?.id,
      userName: user?.name,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRoomInfo = () => {
    Alert.alert(
      'Informations de la salle',
      `Nom: ${roomInfo.name}\nParticipants: ${roomInfo.participants}/${roomInfo.maxParticipants}\nCode: ${roomId}`,
      [
        { text: 'Partager le code', onPress: () => {} },
        { text: 'Fermer', style: 'cancel' },
      ]
    );
  };

  const handleLeaveRoom = () => {
    Alert.alert(
      'Quitter la salle',
      'Êtes-vous sûr de vouloir quitter cette salle?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Quitter',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={chatStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={chatStyles.header}>
        <TouchableOpacity 
          style={chatStyles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={chatStyles.roomInfo}
          onPress={handleRoomInfo}
        >
          <Text style={chatStyles.roomName}>{roomInfo.name}</Text>
          <Text style={chatStyles.participantCount}>
            {roomInfo.participants} participants
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={chatStyles.menuButton}
          onPress={handleLeaveRoom}
        >
          <Icon name="exit-to-app" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={chatStyles.messagesContainer}
        contentContainerStyle={chatStyles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              chatStyles.messageContainer,
              message.isOwn ? chatStyles.ownMessage : chatStyles.otherMessage,
            ]}
          >
            {!message.isOwn && (
              <Text style={chatStyles.senderName}>{message.userName}</Text>
            )}
            <View
              style={[
                chatStyles.messageBubble,
                message.isOwn ? chatStyles.ownBubble : chatStyles.otherBubble,
              ]}
            >
              <Text
                style={[
                  chatStyles.messageText,
                  message.isOwn ? chatStyles.ownMessageText : chatStyles.otherMessageText,
                ]}
              >
                {message.text}
              </Text>
            </View>
            <Text style={chatStyles.messageTime}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={chatStyles.inputContainer}>
        <View style={chatStyles.inputWrapper}>
          <TextInput
            style={chatStyles.textInput}
            placeholder="Tapez votre message..."
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              chatStyles.sendButton,
              newMessage.trim() ? chatStyles.sendButtonActive : null,
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Icon
              name="send"
              size={20}
              color={newMessage.trim() ? '#ffffff' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;