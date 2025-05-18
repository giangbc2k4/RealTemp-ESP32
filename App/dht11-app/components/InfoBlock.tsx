import { View, StyleSheet } from 'react-native';
import React from 'react';
import InfoRow from './InfoRow';

interface Props {
  temperature: number;
  humidity: number;
}

const InfoBlock = ({ temperature, humidity }: Props) => {
  return (
    <View style={styles.container}>
      <InfoRow temperature={temperature} humidity={humidity} />
    </View>
  );
};

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
  },
});

export default InfoBlock;
