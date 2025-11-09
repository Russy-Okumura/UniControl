// src/modules/navigation/AuthNavigator.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

// 📱 Pantallas
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../modules/auth/LoginScreen"; // 👈 ajusta la ruta si tu login está en otra carpeta

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Escucha el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Mientras Firebase valida la sesión
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#0066ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // 🔓 Usuario autenticado → va al Dashboard
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      ) : (
        // 🔒 Sin sesión → va al Login
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
