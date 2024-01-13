import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import ChevronDown from '../assets/icons/chevron-down.png';
import { OptionsModal } from './OptionsModal';
import type { RNMultiSelectProps } from './RNMultiPicker.type';
import { useMultiPickerItems } from '../hooks/useMultiPickerItems';
import { CheckedItemList } from './CheckedItemList';

const MAX_CHECKED_ITEMS_VISIBLE = 10;

export const RNMultiSelect = ({
  placeholder,
  data,
  onSelectedItemsChange,
  selectedItems,
  styles: multiSelectStyles,
  inputStyle,
  renderCheckedItem,
  searchBarStyle,
  renderCheckBox,
  clearButtonStyle,
  saveButtonStyle,
  renderClearButton,
  renderSaveButton,
  modalTitleStyle,
  searchBarPlaceholder,
  maxCheckedItemsVisible = MAX_CHECKED_ITEMS_VISIBLE,
  renderViewMoreButton,
  renderViewLessButton,
}: RNMultiSelectProps) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const { checkedList, onCheck, onApply, onRemove, onCheckMultiple } =
    useMultiPickerItems(selectedItems, onSelectedItemsChange, () =>
      setDropDownVisible(false)
    );

  const checkedDropdownList = data?.filter((i) => selectedItems.includes(i));

  const toggleDropdown = useCallback(() => {
    setDropDownVisible((curr) => !curr);
  }, [setDropDownVisible]);

  const onClose = useCallback(() => {
    onCheckMultiple(selectedItems);
    toggleDropdown();
  }, [onCheckMultiple, selectedItems, toggleDropdown]);

  const renderCheckedItems = () => {
    if (!selectedItems.length) {
      return null;
    }
    return (
      <View style={styles.checkedItemsContainer}>
        <CheckedItemList
          selectedItems={selectedItems}
          checkedListCount={checkedList.length}
          maxCheckedItemsVisible={maxCheckedItemsVisible}
          renderCheckedItem={renderCheckedItem}
          renderViewMoreButton={renderViewMoreButton}
          onRemove={onRemove}
          renderViewLessButton={renderViewLessButton}
        />
      </View>
    );
  };

  const FloatingLabel = <Text style={styles.floatingLabel}>{placeholder}</Text>;

  const DefaultLabel = (
    <TouchableOpacity onPress={toggleDropdown} style={styles.defaultLabel}>
      <Text style={styles.defaultLabelText}>{placeholder}</Text>
      <View style={styles.defaultLabelCrossContainer}>
        <Image source={ChevronDown} style={styles.chevronDown} />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {dropDownVisible && (
        <OptionsModal
          onClose={onClose}
          onCheck={onCheck}
          onApply={onApply}
          checkedList={checkedList}
          title={placeholder}
          data={data}
          onClearAll={() => onCheckMultiple([])}
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
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[styles.multiSelect, multiSelectStyles, inputStyle]}
      >
        {renderCheckedItems()}
        {!!checkedDropdownList.length && FloatingLabel}
        {!checkedDropdownList.length && DefaultLabel}
      </TouchableOpacity>
    </>
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
  defaultLabelText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  defaultLabelCrossContainer: {
    marginRight: 4,
  },
  chevronDown: {
    width: 16,
    height: 16,
  },
});
