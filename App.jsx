import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {PickerItem} from './src/Picker';
import {api} from './src/Services/api';

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');
      let coinsArray = [];
      Object.keys(response.data).map(key => {
        coinsArray.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setCoins(coinsArray);
      setSelectedCoin(coinsArray[0].key);
      setIsloading(false);
    }

    loadMoedas();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.coinArea}>
        <Text style={styles.title}>Selecione sua moeda</Text>
        <PickerItem
          coins={coins}
          selectedCoin={selectedCoin}
          onChange={coin => setSelectedCoin(coin)}
        />
      </View>

      <View style={styles.areaValue}>
        <Text style={styles.title}>Digite um valor para converter em (R$)</Text>
        <TextInput
          placeholder="EX: 1.50"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.buttonArea}>
        <Text style={styles.textButton}>Converter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center',
  },
  coinArea: {
    backgroundColor: '#f9f9f9',
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    paddingLeft: 5,
    paddingTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101215',
  },
  areaValue: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingTop: 8,
    paddingBottom: 8,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000',
  },
  buttonArea: {
    width: '90%',
    backgroundColor: '#fb4b57',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textButton: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
