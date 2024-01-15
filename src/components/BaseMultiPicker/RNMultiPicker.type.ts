import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface SectionedMultiSelectData {
  title: string;
  data: {
    id: string;
    value: string;
  }[];
}

export interface SectionedSelectedItems {
  id: string;
  title: string;
  value: string;
}

export interface CustomSelectedSectionHeaderData {
  title: string;
  data: SectionedMultiSelectData['data'];
}

export interface RNMultiSelectProps {
  /** (string): Placeholder text displayed in the multi-select input field. */
  placeholder: string;
  /**  (string[]): An array of strings representing the selectable items in the multi-select. */
  data: string[];
  /** ((selectedItems: string[]) => void): Callback function triggered when selected items change. */
  onSelectedItemsChange: (selectedItems: string[]) => void;
  /**  (string[]): An array of strings representing the currently selected items. */
  selectedItems: string[];
  /**
   * @deprecated Use {@link inputStyle} instead.
   */
  styles?: StyleProp<ViewStyle>;
  /**   ((value: string, i: number) => JSX.Element): Custom renderer for checked items.. */
  renderCheckedItem?: (value: string, i: number) => JSX.Element;
  /** ((value: string, active: boolean, onCheck: (item: string) => void) => JSX.Element): Custom renderer for checkboxes. */
  renderCheckBox?: (
    value: string,
    active: boolean,
    onCheck: (item: string) => void
  ) => JSX.Element;
  /** (StyleProp<TextStyle>): Styling for the search bar. */
  searchBarStyle?: StyleProp<TextStyle>;
  /** (StyleProp<ViewStyle>): Styling for the clear button. */
  clearButtonStyle?: StyleProp<ViewStyle>;
  /**  (StyleProp<ViewStyle>): Styling for the save button. */
  saveButtonStyle?: StyleProp<ViewStyle>;
  /**   ((onClearAll: () => void, disabled: boolean) => JSX.Element): Custom renderer for the clear button. */
  renderClearButton?: (
    onClearAll: () => void,
    disabled: boolean
  ) => JSX.Element;
  /**   ((onApply: () => void, disabled: boolean) => JSX.Element): Custom renderer for the save button. */
  renderSaveButton?: (onApply: () => void, disabled: boolean) => JSX.Element;
  /**  (StyleProp<ViewStyle>): (StyleProp<TextStyle>): Styling for the picker modal title. */
  modalTitleStyle?: StyleProp<TextStyle>;
  /**  (string): Placeholder text for the search bar. */
  searchBarPlaceholder?: string;
  /**  (StyleProp<ViewStyle>): Styling for the input field. */
  inputStyle?: StyleProp<ViewStyle>;
  /**  (number): Maximum number of checked items visible in the selection. */
  maxCheckedItemsVisible?: number;
  /**  ((showAll: () => void, remainingCount: number) => JSX.Element): Custom renderer for the "View More" button on the input. */
  renderViewMoreButton?: (
    showAll: () => void,
    remainingCount: number
  ) => JSX.Element;
  /**   ((showLess: () => void) => JSX.Element): Custom renderer for the "View Less" button on the input. */
  renderViewLessButton?: (showLess: () => void) => JSX.Element;
  /**  (sring): Change the background color of the checked items visible on the input box. */
  checkedItemsColor?: string;
  /**  (sring): Change the color of the title and cross icon on the the checked items visible on the input box. */
  checkedItemsContentColor?: string;
}
