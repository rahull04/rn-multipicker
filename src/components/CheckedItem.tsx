import React from 'react';
import { Image, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Cross from '../assets/icons/white-cross.png';
import { Pressable } from 'react-native';

export interface CheckedItemProps {
  title: string;
  onRemove: (value: string) => void;
}

export const CheckedItem = ({ title, onRemove }: CheckedItemProps) => {
  return (
    <Pressable
      style={styles.checkedItem}
      onStartShouldSetResponder={() => true}
      onTouchEnd={(e) => e.stopPropagation()}
      onPress={() => onRemove(title)}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.crossContainer}>
        <Image source={Cross} style={styles.cross} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkedItem: {
    padding: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginRight: 2,
    marginBottom: 1,
    borderColor: 'gray',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 280,
    backgroundColor: '#6666ff',
  },
  title: {
    color: 'white',
    fontSize: 12,
    marginRight: 6,
  },
  crossContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cross: {
    width: 10,
    height: 10,
  },
});
