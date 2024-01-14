import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type {
  RNMultiSelectProps,
  SectionedMultiSelectData,
  SectionedSelectedItems,
} from '../BaseMultiPicker/RNMultiPicker.type';
import { CheckedItemList } from '../common/CheckedItemList';
import ChevronDown from '../../assets/icons/chevron-down.png';
import { useSectionedMultiPickerItems } from '../../hooks/useSectionedMultiPickerItems';
import { SectionedOptionsModal } from './SectionedOptionsModal';
import { rnMultiPickerStyles } from '../common/commonStyles';
import { MAX_CHECKED_ITEMS_VISIBLE } from '../../constants';

type OmmitedSectionedPickerProps = Omit<
  RNMultiSelectProps,
  | 'data'
  | 'selectedItems'
  | 'onSelectedItemsChange'
  | 'renderCheckedItem'
  | 'renderCheckBox'
>;

export interface RNSectionedMultiPickerProps
  extends OmmitedSectionedPickerProps {
  data: SectionedMultiSelectData[];
  selectedItems: SectionedSelectedItems[];
  onSelectedItemsChange: (selectedItems: SectionedSelectedItems[]) => void;
  renderCheckedItem?: (value: SectionedSelectedItems, i: number) => JSX.Element;
  renderCheckBox?: (
    value: SectionedSelectedItems,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
}

export const RNSectionedMultiPicker = ({
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
}: RNSectionedMultiPickerProps) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const {
    checkedList,
    onCheck,
    onApply,
    onRemove,
    onCheckMultiple,
    checkedDropdownList,
    onRemoveMultiple,
  } = useSectionedMultiPickerItems(
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
      <View style={rnMultiPickerStyles.checkedItemsContainer}>
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
          isSectioned
        />
      </View>
    );
  };

  const FloatingLabel = (
    <Text style={rnMultiPickerStyles.floatingLabel}>{placeholder}</Text>
  );

  const DefaultLabel = (
    <TouchableOpacity
      onPress={toggleDropdown}
      style={rnMultiPickerStyles.defaultLabel}
    >
      <Text style={rnMultiPickerStyles.defaultLabelText}>{placeholder}</Text>
      <View style={rnMultiPickerStyles.defaultLabelCrossContainer}>
        <Image source={ChevronDown} style={rnMultiPickerStyles.chevronDown} />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {dropDownVisible && (
        <SectionedOptionsModal
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
          onCheckMultiple={onCheckMultiple}
          onRemoveMultiple={onRemoveMultiple}
        />
      )}
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[rnMultiPickerStyles.multiSelect, multiSelectStyles, inputStyle]}
      >
        {renderCheckedItems()}
        {!!checkedDropdownList.length && FloatingLabel}
        {!checkedDropdownList.length && DefaultLabel}
      </TouchableOpacity>
    </>
  );
};
