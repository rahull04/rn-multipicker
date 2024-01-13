import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from './CheckBox';
import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface DefaultCheckBoxProps {
  onCheck: () => void;
  item: string;
  active: boolean;
  size?: number;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  tintColor?: string;
}

export const DefaultCheckBox = ({
  onCheck,
  item,
  active,
  size,
  titleStyle,
  containerStyle,
  tintColor,
}: DefaultCheckBoxProps) => (
  <TouchableOpacity
    onPress={onCheck}
    style={[styles.checkboxContainer, containerStyle]}
  >
    <CheckBox active={active} size={size} tintColor={tintColor} />
    <Text
      numberOfLines={2}
      ellipsizeMode="tail"
      style={[styles.label, titleStyle]}
    >
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
