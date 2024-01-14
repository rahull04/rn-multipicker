import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Pressable, Text } from 'react-native';

interface DefaultFooterButtonProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
  style: StyleProp<ViewStyle>;
}

export const DefaultFooterButton = ({
  title,
  onPress,
  disabled,
  style,
}: DefaultFooterButtonProps) => (
  <Pressable
    onPress={onPress}
    style={[styles.button, disabled && styles.disabledStyle, style]}
  >
    <Text style={styles.label}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    width: 120,
    height: 42,
    borderColor: '#b3b3b3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
  disabledStyle: {
    backgroundColor: '#f2f2f2',
    borderWidth: 0,
  },
});
