import { useMemo } from 'react';
import type {
  SectionedMultiSelectData,
  SectionedSelectedItems,
} from '../components/BaseMultiPicker/RNMultiPicker.type';

export const useSectionedDropdownList = (
  data: SectionedMultiSelectData[],
  checkedList: SectionedSelectedItems[],
  searchText: string
) => {
  const dropDownList = useMemo(() => {
    const dt: SectionedMultiSelectData[] = [];
    data.forEach((value) => {
      const objData: SectionedMultiSelectData['data'] = [];
      // Create data array
      value.data.forEach((item) => {
        const isChecked = checkedList.find((chec) => chec.id === item.id);
        const valueContainsSearchText = item.value
          .toLowerCase()
          .startsWith(searchText?.toLowerCase() ?? '');
        const titleContainsSearchText = value.title
          .toLowerCase()
          .startsWith(searchText?.toLowerCase() ?? '');
        if (
          !isChecked &&
          (valueContainsSearchText || titleContainsSearchText)
        ) {
          objData.push(item);
        }
      });
      if (objData.length) {
        dt.push({ title: value.title, data: objData });
      }
    });
    return dt;
  }, [data, checkedList, searchText]);

  const checkedDropDownList = useMemo(() => {
    const dt: SectionedMultiSelectData[] = [];
    data.forEach((value) => {
      const objData: SectionedMultiSelectData['data'] = [];
      // Create data array
      value.data.forEach((item) => {
        const isChecked = checkedList.find((chec) => chec.id === item.id);
        if (isChecked) {
          objData.push(item);
        }
      });
      if (objData.length) {
        dt.push({ title: value.title, data: objData });
      }
    });
    return dt;
  }, [data, checkedList]);

  return { dropDownList, checkedDropDownList };
};
