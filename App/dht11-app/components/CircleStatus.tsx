import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface Props {
  status: string;
  circleColor?: string;
}

const CircleStatus = ({ status, circleColor = "#A0E9CB" }: Props) => {
  return (
    <View style={[styles.circle, { backgroundColor: circleColor, shadowColor: circleColor }]}>
      <Text style={styles.label}>Cảm Giác</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  label: {
    color: "#555",
  },
  status: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007F5F",
  },
});

export default CircleStatus;
