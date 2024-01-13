import { StyleSheet, View } from 'react-native';
import { ViewButton } from './ViewButton';
import React, { useState } from 'react';
import { CheckedItem } from './CheckedItem';
import type { SectionedSelectedItems } from './RNMultiPicker.type';

interface CheckedListProps {
  checkedListCount: number;
  selectedItems: string[] | SectionedSelectedItems[];
  maxCheckedItemsVisible: number;
  renderCheckedItem?: (
    value: string | SectionedSelectedItems,
    i: number
  ) => JSX.Element;
  renderViewMoreButton?: (
    showAll: () => void,
    remainingCount: number
  ) => JSX.Element;
  onRemove: (value: string | SectionedSelectedItems[]) => void;
  renderViewLessButton?: (showLess: () => void) => JSX.Element;
  isSectioned?: boolean;
}

export const CheckedItemList = ({
  selectedItems,
  checkedListCount,
  maxCheckedItemsVisible,
  renderCheckedItem,
  renderViewMoreButton,
  onRemove,
  renderViewLessButton,
  isSectioned,
}: CheckedListProps) => {
  const [showAllCheckedItems, setShowAllCheckedItems] = useState(false);
  const showViewCheckedButton = checkedListCount > maxCheckedItemsVisible;

  const renderViewButton = (i: number) => {
    const showViewMoreBtn =
      i + 1 === maxCheckedItemsVisible + 1 && !showAllCheckedItems;
    const exceedsMaxCheckedItemsPossible =
      i + 1 > maxCheckedItemsVisible && !showAllCheckedItems;
    const remainingCount = checkedListCount - maxCheckedItemsVisible;

    if (showViewMoreBtn) {
      // Display custom button if prop present
      if (renderViewMoreButton) {
        return renderViewMoreButton(
          () => setShowAllCheckedItems(true),
          remainingCount
        );
      }
      return (
        <ViewButton
          key="view_more"
          onPress={() => setShowAllCheckedItems((val) => !val)}
          remainingCount={remainingCount}
        />
      );
    }
    if (exceedsMaxCheckedItemsPossible) {
      return null;
    }
    return <></>;
  };

  if (isSectioned) {
    return (
      <View style={styles.checkedList}>
        {(selectedItems as SectionedSelectedItems[])?.map((value, i) => (
          <View key={`${value.id}-${i}`}>
            {renderViewButton(i)}
            {renderCheckedItem ? (
              <View key={`${value}-${i}`}>
                {renderCheckedItem(value as SectionedSelectedItems, i)}
              </View>
            ) : (
              <CheckedItem
                key={`${value}-${i}`}
                title={value.value}
                onRemove={onRemove}
                id={value.id}
              />
            )}
          </View>
        ))}
        {showViewCheckedButton && showAllCheckedItems ? (
          <>
            {renderViewLessButton ? (
              renderViewLessButton(() => setShowAllCheckedItems(false))
            ) : (
              <ViewButton
                more={false}
                onPress={() => setShowAllCheckedItems((val) => !val)}
                remainingCount={checkedListCount - maxCheckedItemsVisible}
              />
            )}
          </>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.checkedList}>
      {(selectedItems as string[])?.map((value, i) => (
        <View key={`${value}-${i}`}>
          {renderViewButton(i)}
          {renderCheckedItem ? (
            <View key={`${value}-${i}`}>{renderCheckedItem(value, i)}</View>
          ) : (
            <CheckedItem
              key={`${value}-${i}`}
              title={value}
              onRemove={onRemove}
            />
          )}
        </View>
      ))}
      {showViewCheckedButton && showAllCheckedItems ? (
        <>
          {renderViewLessButton ? (
            renderViewLessButton(() => setShowAllCheckedItems(false))
          ) : (
            <ViewButton
              more={false}
              onPress={() => setShowAllCheckedItems((val) => !val)}
              remainingCount={checkedListCount - maxCheckedItemsVisible}
            />
          )}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  checkedItemsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  checkedList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
