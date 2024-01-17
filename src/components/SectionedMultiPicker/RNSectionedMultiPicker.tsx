import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type {
  CustomSelectedSectionHeaderData,
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
  /** (SectionedMultiSelectData[]): An array of data representing the sectioned items in the multi-picker. */
  data: SectionedMultiSelectData[];
  /** SectionedSelectedItems[]): An array of selected items with section information. */
  selectedItems: SectionedSelectedItems[];
  /** ((selectedItems: SectionedSelectedItems[]) => void): Callback function triggered when selected items change. */
  onSelectedItemsChange: (selectedItems: SectionedSelectedItems[]) => void;
  /** ((value: SectionedSelectedItems, onRemove: () => void, i: number) => JSX.Element): Custom renderer for checked items in the picker. */
  renderCheckedItem?: (
    value: SectionedSelectedItems,
    onRemove: () => void,
    i: number
  ) => JSX.Element;
  /** ((value: SectionedSelectedItems, active: boolean, onCheck: (item: SectionedSelectedItems) => void) => JSX.Element): Custom renderer for checkboxes in the picker. */
  renderCheckBox?: (
    value: SectionedSelectedItems,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
  /** ((value: SectionedSelectedItems, active: boolean, onCheck: (item: SectionedSelectedItems) => void) => JSX.Element): Custom renderer for Section title headers in the Selected items. */
  renderSelectedSectionHeader?: (
    value: CustomSelectedSectionHeaderData,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
  /** ((value: CustomSelectedSectionHeaderData, active: boolean, onCheck: (item: SectionedSelectedItems) => void) => JSX.Element): Custom renderer for Section title headers in the Not Selected items. */
  renderNotSelectedSectionHeader?: (
    value: CustomSelectedSectionHeaderData,
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
  checkedItemsColor,
  checkedItemsContentColor,
  renderSelectedSectionHeader,
  renderNotSelectedSectionHeader,
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
          checkedItemsColor={checkedItemsColor}
          checkedItemsContentColor={checkedItemsContentColor}
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
          renderSelectedSectionHeader={renderSelectedSectionHeader}
          renderNotSelectedSectionHeader={renderNotSelectedSectionHeader}
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
