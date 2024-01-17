import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { RNMultiSelect, type SectionedSelectedItems } from 'rn-multipicker';
import { COUNTRIES, SECTIONED_COUNTRIES } from './constants';

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [selectedItems2, setSelectedItems2] = React.useState<
    SectionedSelectedItems[]
  >([]);

  return (
    <View style={styles.container}>
      <RNMultiSelect
        placeholder="Countries"
        data={[...new Set(COUNTRIES)]}
        onSelectedItemsChange={(val) => setSelectedItems(val)}
        selectedItems={selectedItems}
        searchBarPlaceholder="Search country.."
      />
      <View style={styles.space} />
      <RNMultiSelect.Sectioned
        placeholder="Sectioned Countries"
        data={SECTIONED_COUNTRIES}
        onSelectedItemsChange={(val) => setSelectedItems2(val)}
        selectedItems={selectedItems2}
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
  space: { height: 22 },
});
