import { View, Text, Switch, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/constants/firebase";

const LightControl = () => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const ledRef = ref(db, "/esp32/led");
    const unsubscribe = onValue(ledRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setIsOn(val);
    });
    return () => unsubscribe();
  }, []);

  const toggleSwitch = async () => {
    const ledRef = ref(db, "/esp32/led");
    await set(ledRef, !isOn);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quản lý đèn</Text>
      <Switch value={isOn} onValueChange={toggleSwitch} />
    </View>
  );
};











const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LightControl;
