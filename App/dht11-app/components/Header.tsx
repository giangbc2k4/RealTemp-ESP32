import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db } from '@/constants/firebase';
import { ref, onValue } from 'firebase/database';

const Header = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectedRef = ref(db, '.info/connected');
    const unsubscribe = onValue(connectedRef, (snapshot) => {
      setConnected(!!snapshot.val());
    });
    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <View style={{ padding: 20, paddingTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Theo dõi nhiệt độ{' '}
        <Text style={{ color: connected ? 'green' : 'red' }}>
          {connected ? '●' : '●'}
        </Text>
      </Text>
      <Text style={{ color: 'gray', marginTop: 4 }}>
        <Text style={{ fontWeight: 'bold' }}>Trạng thái kết nối: </Text>
        {connected ? 'True' : 'False'}{' '}
         
      </Text>
    </View>
  );
};

export default Header;
