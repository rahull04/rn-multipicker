import React from 'react';
import { Image, View } from 'react-native';

import CheckedBox from '../assets/icons/checkedbox.png';
import UnCheckedBox from '../assets/icons/uncheckedbox.png';
import { StyleSheet } from 'react-native';

interface RadioProps {
  active: boolean;
}

export const CheckBox = ({ active }: RadioProps) => {
  return (
    <View>
      {active ? (
        <Image source={CheckedBox} style={styles.icon} />
      ) : (
        <Image source={UnCheckedBox} style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
