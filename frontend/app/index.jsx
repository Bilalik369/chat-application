import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans l'application</Text>
      
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: { 
    fontSize: 24, 
    marginBottom: 24, 
    fontWeight: 'bold',
    color: '#333'
  },
  button: { 
    backgroundColor: '#007AFF', 
    paddingVertical: 12, 
    paddingHorizontal: 32, 
    borderRadius: 8, 
    marginVertical: 8 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18,
    textAlign: 'center'
  }
});
