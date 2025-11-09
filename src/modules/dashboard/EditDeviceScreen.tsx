import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { auth, db } from "../../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditDeviceScreen({ route, navigation }: any) {
  const { deviceId } = route.params;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDevice = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const deviceRef = doc(db, "users", user.uid, "devices", deviceId);
      const snapshot = await getDoc(deviceRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setName(data.name);
        setType(data.type);
      }

      setLoading(false);
    };

    loadDevice();
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const deviceRef = doc(db, "users", user.uid, "devices", deviceId);
    await updateDoc(deviceRef, { name, type });

    navigation.goBack();
  };

  if (loading) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Editar dispositivo
      </Text>

      <TextInput
        label="Nombre del dispositivo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Tipo"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSaveChanges}>
        Guardar cambios
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 15 },
});
