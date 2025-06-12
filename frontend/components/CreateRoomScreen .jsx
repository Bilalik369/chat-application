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
import createRoomStyles from '../assets/styles/Create.room';

const CreateRoomScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    maxParticipants: '', // ⬅️ بدلناها هنا
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la salle est requis';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

    const participants = parseInt(formData.maxParticipants);
    if (isNaN(participants) || participants < 2 || participants > 100) {
      newErrors.maxParticipants = 'Le nombre de participants doit être entre 2 et 100';
    }

    return newErrors;
  };

  const handleCreateRoom = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      Alert.alert(
        'Salle créée avec succès!',
        `Code de la salle: ${roomCode}\nPartagez ce code avec vos amis pour qu'ils puissent rejoindre la salle.`,
        [
          {
            text: 'Copier le code',
            onPress: () => router.push(`/chat/${roomCode}`)
          },
          {
            text: 'Entrer dans la salle',
            onPress: () => router.push(`/chat/${roomCode}`)
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer la salle. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={createRoomStyles.container} showsVerticalScrollIndicator={false}>
        <View style={createRoomStyles.header}>
          <TouchableOpacity style={createRoomStyles.backButton} onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#6d93b8" />
          </TouchableOpacity>
          <Text style={createRoomStyles.title}>Créer une salle</Text>
        </View>

        <View style={createRoomStyles.card}>
          {/* NOM DE LA SALLE */}
          <View style={createRoomStyles.inputGroup}>
            <Text style={createRoomStyles.label}>Nom de la salle *</Text>
            <View style={createRoomStyles.inputContainer}>
              <Icon name="meeting-room" size={20} color="#6d93b8" style={createRoomStyles.inputIcon} />
              <TextInput
                style={createRoomStyles.input}
                placeholder="Entrez le nom de la salle"
                placeholderTextColor="#767676"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                maxLength={50}
              />
            </View>
            {errors.name && <Text style={createRoomStyles.errorText}>{errors.name}</Text>}
          </View>

          {/* DESCRIPTION */}
          <View style={createRoomStyles.inputGroup}>
            <Text style={createRoomStyles.label}>Description (optionnel)</Text>
            <View style={createRoomStyles.inputContainer}>
              <Icon name="description" size={20} color="#6d93b8" style={createRoomStyles.inputIcon} />
              <TextInput
                style={[createRoomStyles.input, createRoomStyles.textArea]}
                placeholder="Décrivez votre salle..."
                placeholderTextColor="#767676"
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                multiline
                numberOfLines={3}
                maxLength={200}
              />
            </View>
          </View>

          {/* NOMBRE DE PARTICIPANTS */}
          <View style={createRoomStyles.inputGroup}>
            <Text style={createRoomStyles.label}>Nombre maximum de participants</Text>
            <View style={createRoomStyles.inputContainer}>
              <Icon name="people" size={20} color="#6d93b8" style={createRoomStyles.inputIcon} />
              <TextInput
                style={createRoomStyles.input}
                placeholder="10"
                placeholderTextColor="#767676"
                value={formData.maxParticipants.toString()}
                onChangeText={(value) => handleInputChange('maxParticipants', value)}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            {errors.maxParticipants && <Text style={createRoomStyles.errorText}>{errors.maxParticipants}</Text>}
          </View>

          {/* PRIVÉ / PUBLIC */}
          <View style={createRoomStyles.switchContainer}>
            <View style={createRoomStyles.switchInfo}>
              <Text style={createRoomStyles.switchLabel}>Salle privée</Text>
              <Text style={createRoomStyles.switchDescription}>
                Seules les personnes avec le code peuvent rejoindre
              </Text>
            </View>
            <TouchableOpacity
              style={[
                createRoomStyles.switch,
                formData.isPrivate && createRoomStyles.switchActive
              ]}
              onPress={() => handleInputChange('isPrivate', !formData.isPrivate)}
            >
              <View style={[
                createRoomStyles.switchThumb,
                formData.isPrivate && createRoomStyles.switchThumbActive
              ]} />
            </TouchableOpacity>
          </View>

          {/* BOUTON DE CRÉATION */}
          <TouchableOpacity
            style={createRoomStyles.createButton}
            onPress={handleCreateRoom}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Icon name="add-circle" size={20} color="#ffffff" />
                <Text style={createRoomStyles.createButtonText}>Créer la salle</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateRoomScreen;
