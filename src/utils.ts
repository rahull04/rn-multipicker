import type { SectionedMultiSelectData } from './components/RNMultiPicker.type';

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
