import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { RNMultiSelect } from 'rn-multipicker';

const DATA = [
  'Tunisian Restaurant',
  'Hypnotherapy Service',
  'Armenian Restaurant',
  'Chamber of Commerce',
  'District Government Office',
  'Millwork Shop',
  'Time and Temperature Announcement Service',
  'Dock Builder',
  'Ammunition Supplier',
  'Youth Social Services Organization',
  'Wholesale Fish Merchant',
  'Satellite Communication Service',
  'Elementary School',
  'Soup Shop',
  'Family Restaurant',
  'Bus Tour Agency',
  'Motorcycle Insurance Agency',
  'Bankruptcy Service',
  'Towing Service',
  'Ecuadorian Restaurant',
  'Theaters',
  'South African Restaurant',
  'Trading Card Store',
  'Water Sports Equipment Rental Service',
  'Authentic Japanese  Restaurant',
  'Flag Store',
  'General Store',
  'Dental Clinic',
  'Mexican Grocery Store',
  'Church of Christ',
  'Dump Truck Dealer',
  'Camera Repair Shop',
  'Well',
  'Tribal Headquarters',
  'Runway',
  'Trade School',
  'Archaeological Museum',
  'Psychotherapist',
  'Bedroom Furniture Store',
  'Marriage Counselor',
  'Batting Cage Center',
  'Real Estate Developer',
  'Auditorium',
  'Paraguayan Restaurant',
  'Dry Ice Supplier',
  'Credit Union',
  'Flea Market',
  'Tax Consultant',
  'Cemetery',
  'Hose Supplier',
  'Mailing Service',
  'Mobile Home Supply Store',
  'Envelope Supplier',
  'Dried Flower Shop',
  'Lawn Irrigation Equipment Supplier',
  'Western Restaurant',
  'Graduate School',
  'Public School',
];

export default function App() {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  return (
    <View style={styles.container}>
      <RNMultiSelect
        placeholder="Companies"
        data={[...new Set(DATA)]}
        onSelectedItemsChange={(val) => setSelectedItems(val)}
        selectedItems={selectedItems}
        searchBarPlaceholder="Search item.."
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
