import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircleStatus from "./CircleStatus";
import { getComfortLevel, getColorByTemperature } from "@/utils/getComfortLevel";

interface Props {
  temperature: number;
  humidity: number;
  dateString?: string;
}

const DateCircleRow = ({ temperature, humidity, dateString }: Props) => {
  const comfortText = getComfortLevel(temperature, humidity);
  const circleColor = getColorByTemperature(temperature);

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const displayDate = dateString || currentDate.toLocaleString();

  return (
    <View style={styles.row}>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{displayDate}</Text>
      </View>
      <CircleStatus status={comfortText} circleColor={circleColor} />
    </View>
  );
};

export default DateCircleRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  dateBox: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  comfortText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007F5F",
  },
});
