import React from 'react';
import { Image, View } from 'react-native';

import CheckedBox from '../../assets/icons/checkedbox.png';
import UnCheckedBox from '../../assets/icons/uncheckedbox.png';
import { StyleSheet } from 'react-native';

interface RadioProps {
  active: boolean;
  size?: number;
  tintColor?: string;
}

export const CheckBox = ({ active, size, tintColor }: RadioProps) => {
  return (
    <View>
      {active ? (
        <Image
          source={CheckedBox}
          style={[
            styles.icon,
            size ? { height: size, width: size } : undefined,
            tintColor ? { tintColor } : undefined,
          ]}
        />
      ) : (
        <Image
          source={UnCheckedBox}
          style={[
            styles.icon,
            size ? { height: size, width: size } : undefined,
            tintColor ? { tintColor } : undefined,
          ]}
        />
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
