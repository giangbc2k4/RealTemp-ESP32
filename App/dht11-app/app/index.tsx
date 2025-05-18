import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "@/components/Header";
import MultiLightControl from "@/components/MultiLightControl";
import InfoBlock from '@/components/InfoBlock';
import { ref, onValue } from "firebase/database";
import { db } from "@/constants/firebase";
import CircleInfoBlock from '@/components/CircleInfoBlock';
export default function HomeScreen() {
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);


  useEffect(() => {
    const tempRef = ref(db, "/esp32/temperature");
    const humiRef = ref(db, "/esp32/humidity");

    onValue(tempRef, (snapshot) => {
      const val = snapshot.val();
        console.log("Temperature:", val); 
      if (val !== null) setTemperature(val);
    });
    onValue(humiRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setHumidity(val);
    });
  
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Header />
  
      <CircleInfoBlock temperature={temperature} humidity={humidity} />
  <InfoBlock temperature={temperature} humidity={humidity} />
  <MultiLightControl />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
