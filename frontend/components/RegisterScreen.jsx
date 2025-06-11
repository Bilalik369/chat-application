import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext.js';
import { validateForm } from '../utils/validation.js';
import signupStyles from '../assets/styles/signup.styles';
import {useRouter} from "expo-router";



const SignupScreen = ({ navigation }) => {
    const router = useRouter()
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleSignup = async () => {
    const validation = validateForm(formData, 'signup');
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    
    if (!result.success) {
      Alert.alert('Erreur', result.error || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={signupStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={signupStyles.card}>
        <View style={signupStyles.header}>
          <Text style={signupStyles.title}>Inscription</Text>
          <Text style={signupStyles.subtitle}>
            Créez votre compte pour commencer à chatter
          </Text>
        </View>

        <View style={signupStyles.formContainer}>
          <View style={signupStyles.inputGroup}>
            <Text style={signupStyles.label}>Nom complet</Text>
            <View style={signupStyles.inputContainer}>
              <Icon 
                name="person" 
                size={20} 
                color="#6d93b8" 
                style={signupStyles.inputIcon} 
              />
              <TextInput
                style={signupStyles.input}
                placeholder="Entrez votre nom"
                placeholderTextColor="#767676"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
            {errors.name && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                {errors.name}
              </Text>
            )}
          </View>

          <View style={signupStyles.inputGroup}>
            <Text style={signupStyles.label}>Email</Text>
            <View style={signupStyles.inputContainer}>
              <Icon 
                name="email" 
                size={20} 
                color="#6d93b8" 
                style={signupStyles.inputIcon} 
              />
              <TextInput
                style={signupStyles.input}
                placeholder="Entrez votre email"
                placeholderTextColor="#767676"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                {errors.email}
              </Text>
            )}
          </View>

          <View style={signupStyles.inputGroup}>
            <Text style={signupStyles.label}>Mot de passe</Text>
            <View style={signupStyles.inputContainer}>
              <Icon 
                name="lock" 
                size={20} 
                color="#6d93b8" 
                style={signupStyles.inputIcon} 
              />
              <TextInput
                style={signupStyles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#767676"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={signupStyles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#6d93b8"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                {errors.password}
              </Text>
            )}
          </View>

          <View style={signupStyles.inputGroup}>
            <Text style={signupStyles.label}>Confirmer le mot de passe</Text>
            <View style={signupStyles.inputContainer}>
              <Icon 
                name="lock" 
                size={20} 
                color="#6d93b8" 
                style={signupStyles.inputIcon} 
              />
              <TextInput
                style={signupStyles.input}
                placeholder="Confirmez votre mot de passe"
                placeholderTextColor="#767676"
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={signupStyles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="#6d93b8"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <TouchableOpacity 
            style={signupStyles.button}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={signupStyles.buttonText}>S inscrire</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={signupStyles.footer}>
          <Text style={signupStyles.footerText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={() => router.push("login")}>
            <Text style={signupStyles.link}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;