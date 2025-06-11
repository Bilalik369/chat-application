import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext.js';
import { validateForm } from '../utils/validation.js';
import loginStyles from '../assets/styles/login.styles.js';


import { useRouter } from 'expo-router';





const LoginScreen = ({ navigation }) => {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    const validation = validateForm(formData, 'login');
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      Alert.alert('Erreur', result.error || 'Erreur de connexion');
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={loginStyles.container}
      style={loginStyles.scrollViewStyle}
      showsVerticalScrollIndicator={false}
    >
      <View style={loginStyles.topIllustration}>
        <Image
          source={require("../assets/images/Chat-rafiki.png")}
          style={loginStyles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      <View style={loginStyles.card}>
        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>Connexion</Text>
          <Text style={loginStyles.subtitle}>
            Connectez-vous pour accéder à vos conversations
          </Text>
        </View>

        <View style={loginStyles.formContainer}>
          <View style={loginStyles.inputGroup}>
            <Text style={loginStyles.label}>Email</Text>
            <View style={loginStyles.inputContainer}>
              <Icon 
                name="email" 
                size={20} 
                color="#6d93b8" 
                style={loginStyles.inputIcon} 
              />
              <TextInput
                style={loginStyles.input}
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

          <View style={loginStyles.inputGroup}>
            <Text style={loginStyles.label}>Mot de passe</Text>
            <View style={loginStyles.inputContainer}>
              <Icon 
                name="lock" 
                size={20} 
                color="#6d93b8" 
                style={loginStyles.inputIcon} 
              />
              <TextInput
                style={loginStyles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#767676"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={loginStyles.eyeIcon}
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

          <TouchableOpacity 
            style={loginStyles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={loginStyles.buttonText}>Se connecter</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>Pas de compte ?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={loginStyles.link}>S inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
