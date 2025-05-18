// components/CircleInfoBlock.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircleStatus from './CircleStatus';
import DateCircleRow from './DateCircleRow';

interface Props {
  temperature: number;
  humidity: number;
}

const CircleInfoBlock = ({ temperature, humidity }: Props) => {
  return (
    <View style={styles.container}>
      <DateCircleRow temperature={temperature} humidity={humidity} />
    </View>
  );
};

export default CircleInfoBlock;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  }
});
