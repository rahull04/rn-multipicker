import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import ChevronDown from '../../assets/icons/chevron-down.png';
import { OptionsModal } from './OptionsModal';
import type { RNMultiSelectProps } from './RNMultiPicker.type';
import { useMultiPickerItems } from '../../hooks/useMultiPickerItems';
import { CheckedItemList } from '../common/CheckedItemList';
import { RNSectionedMultiPicker } from '../SectionedMultiPicker/RNSectionedMultiPicker';
import { rnMultiPickerStyles as styles } from '../common/commonStyles';
import { MAX_CHECKED_ITEMS_VISIBLE } from '../../constants';

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
  checkedItemsColor,
  checkedItemsContentColor,
  onSearchTextChange,
  onEndReached,
}: RNMultiSelectProps) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const {
    checkedList,
    onCheck,
    onApply,
    onRemove,
    onCheckMultiple,
    checkedDropdownList,
  } = useMultiPickerItems(
    selectedItems,
    onSelectedItemsChange,
    () => setDropDownVisible(false),
    data
  );

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
          /* @ts-ignore */
          renderCheckedItem={renderCheckedItem}
          renderViewMoreButton={renderViewMoreButton}
          /* @ts-ignore */
          onRemove={onRemove}
          renderViewLessButton={renderViewLessButton}
          checkedItemsColor={checkedItemsColor}
          checkedItemsContentColor={checkedItemsContentColor}
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
          onSearchTextChange={onSearchTextChange}
          onEndReached={onEndReached}
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

RNMultiSelect.Sectioned = RNSectionedMultiPicker;
