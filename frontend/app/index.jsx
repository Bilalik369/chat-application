import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../context/AuthContext"; // بدل import

export default function Index() {
  const { user, logout } = useAuth(); // بدل useContext

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue dans l application</Text>

      {user ? (
        <>
          <Text style={styles.welcome}>Bonjour, {user.name || "utilisateur"} !</Text>
          <Button title="Se déconnecter" onPress={logout} />
        </>
      ) : (
        <>
          <Link href="/login" asChild>
            <Button title="Se connecter" />
          </Link>
          <Link href="/signup" asChild>
            <Button title="Créer un compte" />
          </Link>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center", padding:16 },
  title: { fontSize:24, marginBottom:24 },
  welcome: { fontSize:18, marginBottom:12 },
});
