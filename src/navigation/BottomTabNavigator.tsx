// src/modules/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import DashboardScreen from "../modules/dashboard/DashboardScreen";
import GroupsScreen from "../modules/dashboard/GroupsScreen";
import AddDeviceScreen from "../modules/dashboard/AddDeviceScreen";
import SettingsScreen from "../modules/dashboard/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#0066ff",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "Inicio":
              iconName = "home";
              break;
            case "Dispositivos":
              iconName = "devices";
              break;
            case "Grupos":
              iconName = "account-group";
              break;
            case "Ajustes":
              iconName = "cog";
              break;
          }
          return <Icon source={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={DashboardScreen} />
      <Tab.Screen name="Dispositivos" component={AddDeviceScreen} />
      <Tab.Screen name="Grupos" component={GroupsScreen} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
