import { useCallback, useState } from 'react';

export const useMultiPickerItems = (
  selectedItems: string[],
  onSelectedItemsChange: (selectedItems: string[]) => void,
  hideDropDown: () => void
) => {
  const [checkedList, setCheckedList] = useState(selectedItems);

  const onCheck = useCallback(
    (item: string) => {
      const checkedListCopy = JSON.parse(JSON.stringify(checkedList));
      if (checkedListCopy.includes(item)) {
        checkedListCopy.splice(checkedList.indexOf(item), 1);
      } else {
        checkedListCopy.push(item);
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
    (value: string) => {
      onSelectedItemsChange(selectedItems.filter((i) => i !== value));
      setCheckedList((curr) => curr.filter((item) => item !== value));
    },
    [onSelectedItemsChange, selectedItems]
  );

  const onCheckMultiple = useCallback(
    (items: string[]) => {
      setCheckedList(items);
    },
    [setCheckedList]
  );

  return {
    checkedList,
    onCheck,
    onApply,
    onRemove,
    onCheckMultiple,
  };
};
