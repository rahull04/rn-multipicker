import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface RNMultiSelectProps {
  placeholder: string;
  data: string[];
  onSelectedItemsChange: (selectedItems: string[]) => void;
  selectedItems: string[];
  /**
   * @deprecated Use {@link inputStyle} instead.
   */
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
  inputStyle?: StyleProp<ViewStyle>;
  maxCheckedItemsVisible?: number;
  renderViewMoreButton?: (
    showAll: () => void,
    remainingCount: number
  ) => JSX.Element;
  renderViewLessButton?: (showLess: () => void) => JSX.Element;
}
