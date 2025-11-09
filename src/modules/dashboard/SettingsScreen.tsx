// src/modules/dashboard/SettingsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button, Avatar, Divider } from "react-native-paper";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function SettingsScreen({ navigation }: any) {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Detectar sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "Usuario");
        setUserEmail(user.email || "Sin correo");
      } else {
        setUserName(null);
        setUserEmail(null);
      }
    });

    return unsubscribe;
  }, []);

  // Cerrar sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Tu sesión ha sido cerrada correctamente.");
      navigation.replace("Auth");

    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Avatar.Icon size={80} icon="account" />
        <Text variant="titleMedium" style={styles.userName}>
          {userName || "Usuario"}
        </Text>
        <Text variant="bodyMedium" style={styles.userEmail}>
          {userEmail || ""}
        </Text>
      </View>

      <Divider style={{ marginVertical: 16 }} />

      <Text variant="titleSmall" style={styles.sectionTitle}>
        Preferencias
      </Text>
      <Button
        icon="theme-light-dark"
        mode="outlined"
        style={styles.button}
        onPress={() => Alert.alert("Modo oscuro", "Aquí puedes cambiar el tema.")}
      >
        Cambiar tema
      </Button>

      <Divider style={{ marginVertical: 16 }} />

      <Text variant="titleSmall" style={styles.sectionTitle}>
        Cuenta
      </Text>
      <Button
        icon="logout"
        mode="contained-tonal"
        onPress={handleSignOut}
        style={[styles.button, { backgroundColor: "#ff4d4d" }]}
        textColor="#fff"
      >
        Cerrar sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    marginTop: 8,
    fontWeight: "600",
  },
  userEmail: {
    color: "#666",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    marginVertical: 6,
  },
});
