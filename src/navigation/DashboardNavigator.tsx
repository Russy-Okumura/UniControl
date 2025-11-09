import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../modules/dashboard/DashboardScreen";
import AddDeviceScreen from "../modules/dashboard/AddDeviceScreen";
import EditDeviceScreen from "../modules/dashboard/EditDeviceScreen";
import GroupsScreen from "../modules/dashboard/GroupsScreen";

export type DashboardStackParamList = {
  DashboardMain: undefined;
  AddDevice: undefined;
  EditDevice: { deviceId: string };
  Groups: undefined; // 👈 NUEVA PANTALLA
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardMain"
        component={DashboardScreen}
        options={{ title: "Panel de Dispositivos" }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
        options={{ title: "Agregar Dispositivo" }}
      />
      <Stack.Screen
        name="EditDevice"
        component={EditDeviceScreen}
        options={{ title: "Editar Dispositivo" }}
      />
      <Stack.Screen
        name="Groups"
        component={GroupsScreen}
        options={{ title: "Grupos" }}
      />
    </Stack.Navigator>
  );
}
