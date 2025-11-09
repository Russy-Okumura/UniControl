// src/modules/auth/LoginScreen.tsx
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);

      // ✅ Redirige al AuthNavigator (ya maneja sesión)
      navigation.replace("Auth");
    } catch (error: any) {
      Alert.alert("Error", "Correo o contraseña incorrectos.");
      console.error("Error de inicio de sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#fff" }}>
      <Card style={{ paddingVertical: 10 }}>
        <Card.Title
          title="UniControl"
          subtitle="Iniciar sesión"
          titleStyle={{ fontSize: 22, fontWeight: "bold" }}
        />
        <Card.Content>
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ marginBottom: 12 }}
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ marginBottom: 12 }}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 8 }}
          >
            Entrar
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 10 }}
          >
            Crear cuenta nueva
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
