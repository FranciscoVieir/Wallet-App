import React from 'react';

import {Picker} from '@react-native-picker/picker';

export function PickerItem({coins, selectedCoin, onChange}) {
  let moedasItem = coins.map((item, index) => {
    return <Picker.Item value={item.key} key={index} label={item.key} />;
  });

  return (
    <Picker
      selectedValue={selectedCoin}
      onValueChange={value => onChange(value)}>
      {moedasItem}
    </Picker>
  );
}
