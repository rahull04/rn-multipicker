import { Image, Pressable, StyleSheet, Text } from 'react-native';
import ChevronDown from '../../assets/icons/chevron-down.png';
import React from 'react';

interface ViewBtnProps {
  onPress: () => void;
  more?: boolean;
  remainingCount: number;
}

export const ViewButton = ({
  more = true,
  onPress,
  remainingCount,
}: ViewBtnProps) => (
  <Pressable onPress={onPress} style={styles.viewAllBtn}>
    <Text style={styles.viewAll} key="view_more">
      {more ? `+${remainingCount} more` : 'Show less'}
    </Text>
    <Image
      source={ChevronDown}
      style={[styles.chevronDown, !more && styles.showLess]}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  chevronDown: {
    width: 16,
    height: 16,
  },
  viewAll: {
    fontSize: 12,
    marginRight: 6,
    color: '#666666',
  },
  viewAllBtn: {
    padding: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginRight: 2,
    marginBottom: 1,
    marginTop: 2,
    borderColor: '#666666',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 280,
  },
  showLess: {
    transform: [{ rotate: '180deg' }],
  },
});
