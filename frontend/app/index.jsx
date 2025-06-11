import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import styles from '../assets/styles/home.styles';

export default function Index() {
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
