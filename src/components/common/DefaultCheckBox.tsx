import { Image, StyleSheet, Text, Pressable } from 'react-native';
import { CheckBox } from './CheckBox';
import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import ChevronDown from '../../assets/icons/chevron-down.png';

interface DefaultCheckBoxProps {
  onCheck: () => void;
  item: string;
  active: boolean;
  size?: number;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  tintColor?: string;
  showChevron?: boolean;
}

export const DefaultCheckBox = ({
  onCheck,
  item,
  active,
  size,
  titleStyle,
  containerStyle,
  tintColor,
  showChevron,
}: DefaultCheckBoxProps) => (
  <Pressable
    onPressIn={onCheck}
    onStartShouldSetResponder={() => true}
    onTouchEnd={(e) => e.stopPropagation()}
    style={({ pressed }) => [
      styles.checkboxContainer,
      containerStyle,
      { opacity: pressed ? 0.2 : 1 },
      showChevron && { borderBottomWidth: 1, borderBottomColor: '#e6e6e6' },
    ]}
  >
    <CheckBox active={active} size={size} tintColor={tintColor} />
    <Text
      numberOfLines={2}
      ellipsizeMode="tail"
      style={[styles.label, titleStyle]}
    >
      {item}
    </Text>
    {showChevron ? (
      <Pressable>
        <Image source={ChevronDown} style={styles.chevronDown} />
      </Pressable>
    ) : null}
  </Pressable>
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
    fontSize: 14,
    width: '82%',
  },
  chevronDown: {
    width: 18,
    height: 18,
    zIndex: 1111,
    tintColor: '#00264d',
    marginBottom: 2,
  },
});
