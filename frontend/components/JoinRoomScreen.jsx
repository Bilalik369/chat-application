import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import joinRoomStyles from '../assets/styles/join.styles';

const JoinRoomScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (value) => {
    setRoomCode(value.toUpperCase());
    if (error) {
      setError('');
    }
  };

  const validateRoomCode = () => {
    if (!roomCode.trim()) {
      return 'Le code de la salle est requis';
    }
    if (roomCode.length < 4) {
      return 'Le code doit contenir au moins 4 caractères';
    }
    return '';
  };

  const handleJoinRoom = async () => {
    const validationError = validateRoomCode();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    
    try {
     
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate room validation
      const roomExists = Math.random() > 0.3; // 70% chance room exists
      
      if (roomExists) {
        router.push(`/chat/${roomCode}`);
      } else {
        setError('Salle introuvable. Vérifiez le code et réessayez.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de rejoindre la salle. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanQR = () => {
    Alert.alert('Scanner QR', 'Fonctionnalité de scan QR à implémenter');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={joinRoomStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={joinRoomStyles.header}>
          <TouchableOpacity 
            style={joinRoomStyles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color="#6d93b8" />
          </TouchableOpacity>
          <Text style={joinRoomStyles.title}>Rejoindre une salle</Text>
        </View>

        <View style={joinRoomStyles.card}>
          <View style={joinRoomStyles.iconContainer}>
            <Icon name="group-add" size={64} color="#6d93b8" />
          </View>

          <Text style={joinRoomStyles.subtitle}>
            Entrez le code de la salle pour rejoindre la conversation
          </Text>

          <View style={joinRoomStyles.inputGroup}>
            <Text style={joinRoomStyles.label}>Code de la salle</Text>
            <View style={joinRoomStyles.inputContainer}>
              <Icon 
                name="vpn-key" 
                size={20} 
                color="#6d93b8" 
                style={joinRoomStyles.inputIcon} 
              />
              <TextInput
                style={joinRoomStyles.input}
                placeholder="Entrez le code (ex: ABC123)"
                placeholderTextColor="#767676"
                value={roomCode}
                onChangeText={handleInputChange}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={10}
              />
            </View>
            {error && (
              <Text style={joinRoomStyles.errorText}>{error}</Text>
            )}
          </View>

          <TouchableOpacity 
            style={joinRoomStyles.joinButton}
            onPress={handleJoinRoom}
            disabled={isLoading || !roomCode.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Icon name="login" size={20} color="#ffffff" />
                <Text style={joinRoomStyles.joinButtonText}>Rejoindre</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={joinRoomStyles.divider}>
            <View style={joinRoomStyles.dividerLine} />
            <Text style={joinRoomStyles.dividerText}>OU</Text>
            <View style={joinRoomStyles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={joinRoomStyles.qrButton}
            onPress={handleScanQR}
          >
            <Icon name="qr-code-scanner" size={20} color="#6d93b8" />
            <Text style={joinRoomStyles.qrButtonText}>Scanner un code QR</Text>
          </TouchableOpacity>

          <View style={joinRoomStyles.helpContainer}>
            <Icon name="help-outline" size={16} color="#999" />
            <Text style={joinRoomStyles.helpText}>
              Demandez le code de la salle à votre ami ou scannez le code QR qu il partage
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default JoinRoomScreen;