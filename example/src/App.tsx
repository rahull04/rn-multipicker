import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { RNMultiSelect, type SectionedSelectedItems } from 'rn-multipicker';
import { COUNTRIES } from './constants';

const SECTIONED_COUNTRIES = [
  {
    id: '1',
    title: 'Asia',
    data: [
      { value: 'India', id: '1' },
      { value: 'China', id: '2' },
      { value: 'Afghanistan', id: '3' },
    ],
  },
  {
    id: '4',
    title: 'Europe',
    data: [
      { value: 'Spain', id: '5' },
      { value: 'Sweden', id: '6' },
      { value: 'France', id: '7' },
      { value: 'Albania', id: '8' },
    ],
  },
];

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
