// App.tsx
import React from "react";
import { Platform, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  const colorScheme = useColorScheme(); // Detecta si el sistema está en modo claro u oscuro

  React.useEffect(() => {
    if (Platform.OS === "android") {
      // Permitir que el sistema controle los colores de la barra inferior
      NavigationBar.setBackgroundColorAsync("transparent");
      NavigationBar.setVisibilityAsync("visible");
      NavigationBar.setBehaviorAsync("inset-swipe");
      NavigationBar.setButtonStyleAsync(
        colorScheme === "dark" ? "light" : "dark"
      );
    }
  }, [colorScheme]);

  return (
    <PaperProvider theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

