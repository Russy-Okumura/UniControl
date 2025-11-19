import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { Client } from "react-native-ssdp";
import { db, auth } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

// 🔹 Tipado del dispositivo detectado
interface DeviceInfo {
  name: string;
  ip: string;
  type: string;
  location?: string;
}

export default function DeviceDiscovery({ navigation }: any) {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = new Client();

    client.on("response", (headers, statusCode, rinfo) => {
      const server = headers.SERVER || "";
      const location = headers.LOCATION || "";
      let type = "Desconocido";

      // 🔹 Clasificación automática por firma del servidor
      if (server.includes("Hisense") || headers.USN?.includes("Hisense")) {
        type = "Televisión";
      } else if (server.includes("Tasmota") || headers.USN?.includes("ewelink")) {
        type = "Dispositivo IoT (Foco, Enchufe)";
      } else if (server.includes("Google") || headers.USN?.includes("Chromecast")) {
        type = "Bocina / Chromecast";
      } else if (server.includes("Camera") || headers.USN?.includes("ip-camera")) {
        type = "Cámara IP";
      } else if (server.includes("SmartPlug") || server.includes("Shelly")) {
        type = "Enchufe inteligente";
      }

      const deviceInfo: DeviceInfo = {
        name: server.split("/")[0] || "Dispositivo IoT",
        ip: rinfo.address,
        type,
        location,
      };

      // Evitar duplicados
      setDevices((prev) => {
        const exists = prev.some((d) => d.ip === deviceInfo.ip);
        return exists ? prev : [...prev, deviceInfo];
      });
    });

    // 🔍 Buscar servicios estándar IoT
    client.search("ssdp:all"); // búsqueda general
    client.search("urn:schemas-upnp-org:device:MediaRenderer:1"); // TVs
    client.search("urn:schemas-upnp-org:device:Basic:1"); // Cámaras IP

    // ⏳ Parar búsqueda después de 10 segundos
    setTimeout(() => {
      client.stop();
      setLoading(false);
    }, 10000);

    // 🧹 Limpiar cliente al desmontar
    return () => client.stop();
  }, []);

  // 🔹 Guardar dispositivo detectado en Firestore
  const handleAddDevice = async (device: DeviceInfo) => {
    try {
      await setDoc(doc(db, "devices", `${device.type}_${auth.currentUser?.uid}_${device.ip}`), {
        nombre: device.name,
        tipo: device.type,
        ip: device.ip,
        userId: auth.currentUser?.uid,
        registrado: new Date().toISOString(),
      });
      navigation.navigate("DashboardMain");
    } catch (error) {
      console.error("Error al guardar el dispositivo:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Dispositivos IoT detectados en tu red
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0066ff" />
      ) : devices.length > 0 ? (
        devices.map((device, i) => (
          <Card key={i} style={styles.card}>
            <Card.Title title={device.name} subtitle={device.ip} />
            <Card.Content>
              <Chip icon="chip">{device.type}</Chip>
              {device.location ? <Text>{device.location}</Text> : null}
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => handleAddDevice(device)}>
                Agregar a UniControl
              </Button>
            </Card.Actions>
          </Card>
        ))
      ) : (
        <Text>No se detectaron dispositivos IoT en la red.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginVertical: 16,
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    marginBottom: 12,
    borderRadius: 12,
  },
});

