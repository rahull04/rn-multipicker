import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { RNMultiSelect } from 'rn-multipicker';
import { COUNTRIES } from './constants';

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  return (
    <View style={styles.container}>
      <RNMultiSelect
        placeholder="Countries"
        data={[...new Set(COUNTRIES)]}
        onSelectedItemsChange={(val) => setSelectedItems(val)}
        selectedItems={selectedItems}
        searchBarPlaceholder="Search country.."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
