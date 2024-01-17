import type { NativeScrollEvent } from 'react-native';
import type { SectionedMultiSelectData } from './components/BaseMultiPicker/RNMultiPicker.type';

export const isSectioned = (data: any): data is SectionedMultiSelectData[] => {
  if (
    data.length &&
    Object.keys(data).length === 2 &&
    data[0]?.title &&
    data[0]?.data
  ) {
    return true;
  }
  return false;
};

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
