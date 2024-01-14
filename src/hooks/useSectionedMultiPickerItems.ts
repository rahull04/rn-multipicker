import { useCallback, useMemo, useState } from 'react';
import type {
  SectionedMultiSelectData,
  SectionedSelectedItems,
} from '../components/BaseMultiPicker/RNMultiPicker.type';

export const useSectionedMultiPickerItems = (
  selectedItems: SectionedSelectedItems[],
  onSelectedItemsChange: (selectedItems: SectionedSelectedItems[]) => void,
  hideDropDown: () => void,
  data: SectionedMultiSelectData[]
) => {
  const [checkedList, setCheckedList] = useState(selectedItems);
  const checkedDropdownList = useMemo(() => {
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

  const onCheck = useCallback(
    (selectedItem: SectionedSelectedItems) => {
      let checkedListCopy: SectionedSelectedItems[] = JSON.parse(
        JSON.stringify(checkedList)
      );
      const isSelected = checkedListCopy.find(
        (item) => item.id === selectedItem.id
      );
      if (isSelected) {
        checkedListCopy = checkedListCopy.filter(
          (item) => item.id !== selectedItem.id
        );
      } else {
        checkedListCopy.push(selectedItem);
      }
      setCheckedList(checkedListCopy);
    },
    [checkedList, setCheckedList]
  );

  const onApply = useCallback(() => {
    onSelectedItemsChange(checkedList);
    hideDropDown();
  }, [onSelectedItemsChange, hideDropDown, checkedList]);

  const onRemove = useCallback(
    (id: string) => {
      onSelectedItemsChange(selectedItems.filter((item) => item.id !== id));
      setCheckedList((curr) => curr.filter((item) => item.id !== id));
    },
    [onSelectedItemsChange, selectedItems]
  );

  const onCheckMultiple = useCallback(
    (items: SectionedSelectedItems[]) => {
      setCheckedList(items);
    },
    [setCheckedList]
  );

  const onRemoveMultiple = useCallback(
    (items: SectionedSelectedItems[]) => {
      let checkedItemsCopy: SectionedSelectedItems[] = JSON.parse(
        JSON.stringify(checkedList)
      );
      const itemsIds = items.map((i) => i.id);
      checkedItemsCopy = checkedItemsCopy.filter(
        (value) => !itemsIds.includes(value.id)
      );
      setCheckedList(checkedItemsCopy);
    },
    [setCheckedList, checkedList]
  );

  return {
    checkedList,
    onCheck,
    onApply,
    onRemove,
    onCheckMultiple,
    checkedDropdownList,
    onRemoveMultiple,
  };
};
