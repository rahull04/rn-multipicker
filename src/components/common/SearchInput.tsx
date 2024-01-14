import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import Cross from '../../assets/icons/close.png';
import { Keyboard } from 'react-native';

interface SearchInputProps {
  searchText: string;
  searchBarStyle?: StyleProp<TextStyle>;
  searchBarPlaceholder?: string;
  onSearch: (newValue: string) => void;
  clearSearch: () => void;
}

export const SearchInput = ({
  searchText,
  searchBarStyle,
  searchBarPlaceholder,
  onSearch,
  clearSearch,
}: SearchInputProps) => {
  return (
    <View>
      <TextInput
        style={[styles.searchBar, searchBarStyle]}
        value={searchText}
        placeholder={searchBarPlaceholder ?? 'Search..'}
        onChangeText={onSearch}
      />
      {searchText ? (
        <Pressable
          style={styles.searchCrossContainer}
          onPress={() => {
            clearSearch();
            Keyboard.dismiss();
          }}
        >
          <Image source={Cross} style={styles.searchCross} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingRight: 32,
    paddingVertical: Platform.select({
      ios: 13,
      android: 8,
      web: 14,
    }),
    marginBottom: 8,
    borderRadius: 6,
  },
  cross: {
    width: 14,
    height: 14,
  },
  searchCrossContainer: {
    position: 'absolute',
    top: 17,
    right: 12,
  },
  searchCross: {
    width: 12,
    height: 12,
  },
});
