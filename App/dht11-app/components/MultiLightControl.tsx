// components/MultiLightControl.tsx
import { View, Text, Switch, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/constants/firebase";

const MultiLightControl = () => {
  const [leds, setLeds] = useState({
    all: false,
    temperatureLed: false, // gộp led1 và led2
    led3: false,
  });

  useEffect(() => {
    const controlRef = ref(db, "/esp32/control");
    return onValue(controlRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setLeds({
          all: val.all || false,
          temperatureLed: val.led1 && val.led2,
          led3: val.led3 || false,
        });
      }
    });
  }, []);

  const toggle = (key: keyof typeof leds) => {
    if (key === "temperatureLed") {
      const newVal = !leds.temperatureLed;
      set(ref(db, `/esp32/control/led1`), newVal);
      set(ref(db, `/esp32/control/led2`), newVal);
      setLeds((prev) => ({ ...prev, temperatureLed: newVal }));
    } else if (key === "all") {
      const newVal = !leds.all;
      set(ref(db, `/esp32/control/all`), newVal);
      set(ref(db, `/esp32/control/led1`), newVal);
      set(ref(db, `/esp32/control/led2`), newVal);
      set(ref(db, `/esp32/control/led3`), newVal);
      setLeds({ all: newVal, temperatureLed: newVal, led3: newVal });
    } else {
      const newVal = !leds[key];
      set(ref(db, `/esp32/control/${key}`), newVal);
      setLeds((prev) => ({ ...prev, [key]: newVal }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý đèn</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Tất cả</Text>
        <Switch value={leds.all} onValueChange={() => toggle("all")} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Đèn nhiệt độ</Text>
        <Switch value={leds.temperatureLed} onValueChange={() => toggle("temperatureLed")} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Đèn 3</Text>
        <Switch value={leds.led3} onValueChange={() => toggle("led3")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});

export default MultiLightControl;
