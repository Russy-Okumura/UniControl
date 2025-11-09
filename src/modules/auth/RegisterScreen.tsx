import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Éxito", "Cuenta creada correctamente.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Card>
        <Card.Title title="Unicontrol" subtitle="Crear cuenta" />
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
          <Button mode="contained" onPress={handleRegister} loading={loading}>
            Registrarse
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
