// src/modules/dashboard/AddDeviceScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Text,
  Button,
  Card,
  IconButton,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase"; // 👈 ajusta esta ruta a tu config real

export default function AddDeviceScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [marca, setMarca] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const dispositivos = [
    { id: "luz", icon: "lightbulb", label: "Luz" },
    { id: "television", icon: "television", label: "Televisión" },
    { id: "ventilador", icon: "fan", label: "Ventilador" },
    { id: "bocina", icon: "speaker", label: "Bocina" },
    { id: "ac", icon: "air-conditioner", label: "A/C" },
    { id: "camara", icon: "camera", label: "Cámara" },
  ];

  const handleSaveDevice = async () => {
    if (!selectedType || !marca.trim() || !ubicacion.trim()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    try {
      setIsSaving(true);
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "No hay usuario autenticado.");
        return;
      }

      await addDoc(collection(db, "devices"), {
        tipo: selectedType,
        marca,
        ubicacion,
        uidUsuario: user.uid,
        estado: false,
        fechaRegistro: new Date(),
      });

      Alert.alert("✅ Dispositivo agregado", "Se ha guardado correctamente.");
      setSelectedType(null);
      setMarca("");
      setUbicacion("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar el dispositivo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text variant="headlineMedium" style={styles.title}>
        Agregar dispositivo
      </Text>

      {/* 🔘 Selección de tipo */}
      <Text style={styles.subtitle}>Selecciona el tipo</Text>
      <View style={styles.grid}>
        {dispositivos.map((item) => (
          <Card
            key={item.id}
            style={[
              styles.card,
              selectedType === item.id && styles.cardSelected,
            ]}
            onPress={() => setSelectedType(item.id)}
          >
            <Card.Content style={styles.cardContent}>
              <IconButton
                icon={item.icon}
                size={36}
                iconColor={
                  selectedType === item.id ? "#0066ff" : "rgba(0,0,0,0.6)"
                }
              />
              <Text
                style={[
                  styles.cardText,
                  selectedType === item.id && styles.cardTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* 🏷️ Datos adicionales */}
      {selectedType && (
        <View>
          <TextInput
            label="Marca"
            mode="outlined"
            value={marca}
            onChangeText={setMarca}
            style={styles.input}
          />
          <TextInput
            label="Ubicación (ej. Sala, Cocina)"
            mode="outlined"
            value={ubicacion}
            onChangeText={setUbicacion}
            style={styles.input}
          />

          <Button
            mode="contained"
            icon="plus-circle"
            onPress={handleSaveDevice}
            style={styles.button}
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar dispositivo"}
          </Button>

          {isSaving && (
            <ActivityIndicator
              animating={true}
              style={{ marginTop: 16 }}
              size="large"
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 10,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    marginBottom: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cardSelected: {
    borderColor: "#0066ff",
    borderWidth: 2,
  },
  cardContent: {
    alignItems: "center",
  },
  cardText: {
    fontSize: 12,
    textAlign: "center",
  },
  cardTextSelected: {
    color: "#0066ff",
    fontWeight: "bold",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 12,
  },
});
