import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface OptionsModalProps {
  onClose: () => void;
  onCheck: (item: string) => void;
  checkedList: string[];
  title: string;
  onApply: () => void;
  onClearAll: () => void;
  data: string[];
  searchBarStyle?: StyleProp<TextStyle>;
  renderCheckBox?: (
    value: string,
    active: boolean,
    onCheck: (item: string) => void
  ) => JSX.Element;
  clearButtonStyle?: StyleProp<ViewStyle>;
  saveButtonStyle?: StyleProp<ViewStyle>;
  renderClearButton?: (
    onClearAll: () => void,
    disabled: boolean
  ) => JSX.Element;
  renderSaveButton?: (onApply: () => void, disabled: boolean) => JSX.Element;
  modalTitleStyle?: StyleProp<TextStyle>;
  searchBarPlaceholder?: string;
  onSearchTextChange?: (
    searchText: string,
    setLoader: (value: boolean) => void
  ) => void;
  onEndReached?: (
    iteration: number,
    setLoader: (value: boolean) => void
  ) => void;
}
