import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from './CheckBox';
import React from 'react';

interface DefaultCheckBoxProps {
  onCheck: () => void;
  item: string;
  active: boolean;
}

export const DefaultCheckBox = ({
  onCheck,
  item,
  active,
}: DefaultCheckBoxProps) => (
  <TouchableOpacity onPress={onCheck} style={styles.checkboxContainer}>
    <CheckBox active={active} />
    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.label}>
      {item}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    fontSize: 16,
    width: '90%',
  },
});
