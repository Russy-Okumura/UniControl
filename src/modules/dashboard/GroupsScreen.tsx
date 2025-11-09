// src/modules/dashboard/GroupsScreen.tsx
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";

export default function GroupsScreen() {
  const grupos = [
    { id: 1, nombre: "Sala", descripcion: "Luces, TV y ventilador" },
    { id: 2, nombre: "Cocina", descripcion: "Refrigerador y cafetera" },
    { id: 3, nombre: "Habitación", descripcion: "Clima y lámpara" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Grupos agregados
      </Text>

      {grupos.map((grupo) => (
        <Card key={grupo.id} style={styles.card}>
          <Card.Cover source={{ uri: "https://placehold.co/600x400" }} />
          <Card.Title title={grupo.nombre} subtitle={grupo.descripcion} />
        </Card>
      ))}
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
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
});