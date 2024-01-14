import React from 'react';
import { View, StyleSheet } from 'react-native';
import type {
  SectionedMultiSelectData,
  SectionedSelectedItems,
} from '../BaseMultiPicker/RNMultiPicker.type';
import { DefaultCheckBox } from '../common/DefaultCheckBox';

interface SectionedDropdownItemProps {
  value: SectionedMultiSelectData['data'][0];
  renderCheckBox?: (
    value: SectionedSelectedItems,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
  title: string;
  onCheck: (item: SectionedSelectedItems) => void;
  checkedList: SectionedSelectedItems[];
}

export const SectionedDropdownItem = ({
  value,
  renderCheckBox,
  title,
  checkedList,
  onCheck,
}: SectionedDropdownItemProps) => {
  return (
    <View>
      {renderCheckBox ? (
        <View key={`sectionedDropdownItem-${value.id}`}>
          {renderCheckBox(
            { ...value, title: title },
            !!checkedList.find((dt) => dt.id === value.id),
            onCheck
          )}
        </View>
      ) : (
        <DefaultCheckBox
          item={value.value}
          key={`sectionedDropdownItem-${value.value}`}
          onCheck={() => onCheck({ ...value, title: title })}
          active={!!checkedList.find((dt) => dt.id === value.id)}
          size={16}
          containerStyle={styles.smallCheckBoxStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  smallCheckBoxStyle: {
    paddingLeft: 8,
  },
});
