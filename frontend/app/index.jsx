import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, Redirect } from 'expo-router';
import styles from '../assets/styles/index.styles';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user } = useAuth(); 

 
  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Mobile-bro.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>Welcome to our Chat App!</Text>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
