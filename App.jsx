import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {PickerItem} from './src/Picker';
import {api} from './src/Services/api';

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const [moedaBValor, setMoedaBValor] = useState('');

  const [coinValue, setCoinValue] = useState(null);
  const [convertedValue, setConvertedValue] = useState(0);

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

  async function toConvert() {
    if (moedaBValor === 0 || moedaBValor === '' || selectedCoin === null) {
      return;
    }

    const response = await api.get(`/all/${selectedCoin}-BRL`);
    console.log(response.data[selectedCoin].ask);

    let resultado = response.data[selectedCoin].ask * parseFloat(moedaBValor);

    setConvertedValue(
      `${resultado.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}`,
    );
    setCoinValue(moedaBValor);

    Keyboard.dismiss();
  }

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
          value={moedaBValor}
          onChangeText={value => setMoedaBValor(value)}
        />
      </View>

      <TouchableOpacity style={styles.buttonArea} onPress={toConvert}>
        <Text style={styles.textButton}>Converter</Text>
      </TouchableOpacity>

      {convertedValue !== 0 && (
        <View style={styles.areaResult}>
          <Text style={styles.convertedValue}>
            {coinValue} {selectedCoin}
          </Text>

          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{fontSize: 18, margin: 8, color: '#000'}}>
            corresponde a:
          </Text>

          <Text style={styles.convertedValue}>{convertedValue}</Text>
        </View>
      )}
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
  areaResult: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  convertedValue: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default App;
