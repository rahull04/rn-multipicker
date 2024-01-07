import React, { useCallback, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

import { CheckedItem } from './CheckedItem';
import ChevronDown from '../assets/icons/chevron-down.png';
import { OptionsModal } from './OptionsModal';

export interface RNMultiSelectProps {
  placeholder: string;
  data: string[];
  onSelectedItemsChange: (selectedItems: string[]) => void;
  selectedItems: string[];
  styles?: StyleProp<ViewStyle>;
  renderCheckedItem?: (value: string, i: number) => JSX.Element;
  renderCheckBox?: (
    value: string,
    active: boolean,
    onCheck: (item: string) => void
  ) => JSX.Element;
  searchBarStyle?: StyleProp<TextStyle>;
  clearButtonStyle?: StyleProp<ViewStyle>;
  saveButtonStyle?: StyleProp<ViewStyle>;
  renderClearButton?: (
    onClearAll: () => void,
    disabled: boolean
  ) => JSX.Element;
  renderSaveButton?: (onApply: () => void, disabled: boolean) => JSX.Element;
  modalTitleStyle?: StyleProp<TextStyle>;
  searchBarPlaceholder?: string;
}

export const RNMultiSelect = ({
  placeholder,
  data,
  onSelectedItemsChange,
  selectedItems,
  styles: multiSelectStyles,
  renderCheckedItem,
  searchBarStyle,
  renderCheckBox,
  clearButtonStyle,
  saveButtonStyle,
  renderClearButton,
  renderSaveButton,
  modalTitleStyle,
  searchBarPlaceholder,
}: RNMultiSelectProps) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [checkedList, setCheckedList] = useState(selectedItems);

  const checkedDropdownList = data?.filter((i) => selectedItems.includes(i));

  const onCheck = useCallback(
    (item: string) => {
      const checkedListCopy = JSON.parse(JSON.stringify(checkedList));
      if (checkedListCopy.includes(item)) {
        checkedListCopy.splice(checkedList.indexOf(item), 1);
      } else {
        checkedListCopy.push(item);
      }
      setCheckedList(checkedListCopy);
    },
    [checkedList, setCheckedList]
  );

  const onApply = () => {
    onSelectedItemsChange(checkedList);
    setDropDownVisible(false);
  };

  const toggleDropdown = () => {
    setDropDownVisible((curr) => !curr);
  };

  const onRemove = useCallback(
    (value: string) => {
      onSelectedItemsChange(selectedItems.filter((i) => i !== value));
      setCheckedList((curr) => curr.filter((item) => item !== value));
    },
    [onSelectedItemsChange, selectedItems]
  );

  const onClose = () => {
    setCheckedList(selectedItems);
    toggleDropdown();
  };

  const renderCheckedItems = () => {
    if (!selectedItems.length) {
      return null;
    }
    return (
      <View style={styles.checkedItemsContainer}>
        <View style={styles.checkedList}>
          {selectedItems?.map((value, i) =>
            renderCheckedItem ? (
              <View key={`${value}-${i}`}>{renderCheckedItem(value, i)}</View>
            ) : (
              <CheckedItem
                key={`${value}-${i}`}
                title={value}
                onRemove={onRemove}
              />
            )
          )}
        </View>
      </View>
    );
  };

  const FloatingLabel = <Text style={styles.floatingLabel}>{placeholder}</Text>;

  const DefaultLabel = (
    <TouchableOpacity onPress={toggleDropdown} style={styles.defaultLabel}>
      <Text style={{ color: '#666666', fontWeight: 'bold' }}>
        {placeholder}
      </Text>
      <View style={{ marginRight: 4 }}>
        <Image source={ChevronDown} style={{ width: 16, height: 16 }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      onPress={toggleDropdown}
      style={[styles.multiSelect, multiSelectStyles]}
    >
      {dropDownVisible && (
        <OptionsModal
          onClose={onClose}
          onCheck={onCheck}
          onApply={onApply}
          checkedList={checkedList}
          title={placeholder}
          data={data}
          onClearAll={() => setCheckedList([])}
          searchBarStyle={searchBarStyle}
          renderCheckBox={renderCheckBox}
          clearButtonStyle={clearButtonStyle}
          saveButtonStyle={saveButtonStyle}
          renderClearButton={renderClearButton}
          renderSaveButton={renderSaveButton}
          modalTitleStyle={modalTitleStyle}
          searchBarPlaceholder={searchBarPlaceholder}
        />
      )}
      {renderCheckedItems()}
      {!!checkedDropdownList.length && FloatingLabel}
      {!checkedDropdownList.length && DefaultLabel}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  multiSelect: {
    padding: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 20,
    width: '90%',
  },
  defaultLabel: {
    marginLeft: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 8,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#4d4d4d',
  },
  checkedItemsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  checkedList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  downArrowIconContainer: {
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
