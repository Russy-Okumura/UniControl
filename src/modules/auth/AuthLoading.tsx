import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function AuthLoading({ navigation }: any) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        navigation.replace("Dashboard");
      } else {
    
        navigation.replace("Login");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#a88eff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
});
