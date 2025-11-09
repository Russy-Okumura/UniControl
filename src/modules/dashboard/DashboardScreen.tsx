// src/modules/dashboard/DashboardScreen.tsx
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Avatar, Text, IconButton, Card } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "../../navigation/DashboardNavigator";

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  "DashboardMain"
>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

export default function DashboardScreen({ navigation }: Props) {
  const funciones = [
    { icon: "lightbulb", label: "Luz" },
    { icon: "fan", label: "Ventilador" },
    { icon: "camera", label: "Cámara" },
    { icon: "television", label: "TV" },
    { icon: "router", label: "Router" },
    { icon: "speaker", label: "Bocina" },
    { icon: "air-conditioner", label: "A/C" },
  ];

  const grupos = [
    { id: 1, nombre: "Sala", descripcion: "Luces y TV principal" },
    { id: 2, nombre: "Cocina", descripcion: "Refrigerador y cafetera" },
    { id: 3, nombre: "Habitación", descripcion: "Lámpara y clima" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 🧍 Perfil */}
      <View style={styles.profileSection}>
        <Avatar.Icon size={80} icon="account" />
        <Text variant="titleMedium" style={styles.profileName}>
          Lorem ipsum dolor sit amet
        </Text>
      </View>

      {/* ⚙️ Funciones */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Funciones
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {funciones.map((item, index) => (
          <View key={index} style={styles.functionItem}>
            <IconButton
              icon={item.icon}
              size={36}
              mode="contained"
              onPress={() => console.log("Función:", item.label)}
            />
            <Text style={styles.functionLabel}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 👥 Grupos */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Grupos
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {grupos.map((grupo) => (
          <Card
            key={grupo.id}
            style={styles.groupCard}
            onPress={() => navigation.navigate("Groups")}
          >
            <Card.Cover
              source={{ uri: "https://placehold.co/300x180" }}
              style={{ height: 140 }}
            />
            <Card.Title title={grupo.nombre} subtitle={grupo.descripcion} />
          </Card>
        ))}
      </ScrollView>

      {/* 💡 Recomendados */}
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Recomendados
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {[1, 2, 3].map((n) => (
          <Card key={n} style={styles.groupCard}>
            <Card.Cover source={{ uri: "https://placehold.co/300x180" }} />
            <Card.Title
              title={`Dispositivo ${n}`}
              subtitle="Último uso: hace 2h"
            />
          </Card>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileName: {
    marginTop: 8,
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  horizontalScroll: {
    paddingHorizontal: 16,
  },
  functionItem: {
    alignItems: "center",
    marginRight: 16,
  },
  functionLabel: {
    fontSize: 12,
  },
  groupCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
});
