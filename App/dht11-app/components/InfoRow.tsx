import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface InfoRowProps {
  temperature: number;
  humidity: number;
}

const InfoRow = ({ temperature, humidity }: InfoRowProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tempBox}>
        <Text style={styles.tempLabel}>Nhiệt độ</Text>
        <Text style={styles.tempValue}>{temperature}℃</Text>
      </View>

      <View style={styles.humiBox}>
        <Text style={styles.humiLabel}>Độ ẩm</Text>
        <Text style={styles.humiValue}>{humidity}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  tempBox: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tempLabel: {
    color: '#388E3C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tempValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  humiBox: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  humiLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  humiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
  },
});

export default InfoRow;
