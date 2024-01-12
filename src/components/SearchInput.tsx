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
import Cross from '../assets/icons/close.png';

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
        <Pressable style={styles.searchCrossContainer} onPress={clearSearch}>
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
    paddingVertical: Platform.OS === 'ios' ? 13 : 8,
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
