import { StyleSheet, View } from 'react-native';
import { ViewButton } from './ViewButton';
import React, { useState } from 'react';
import { CheckedItem } from './CheckedItem';

interface CheckedListProps {
  checkedListCount: number;
  selectedItems: string[];
  maxCheckedItemsVisible: number;
  renderCheckedItem?: (value: string, i: number) => JSX.Element;
  renderViewMoreButton?: (
    showAll: () => void,
    remainingCount: number
  ) => JSX.Element;
  onRemove: (value: string) => void;
  renderViewLessButton?: (showLess: () => void) => JSX.Element;
}

export const CheckedItemList = ({
  selectedItems,
  checkedListCount,
  maxCheckedItemsVisible,
  renderCheckedItem,
  renderViewMoreButton,
  onRemove,
  renderViewLessButton,
}: CheckedListProps) => {
  const [showAllCheckedItems, setShowAllCheckedItems] = useState(false);
  const showViewCheckedButton = checkedListCount > maxCheckedItemsVisible;

  return (
    <View style={styles.checkedList}>
      {selectedItems?.map((value, i) => {
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

        return renderCheckedItem ? (
          <View key={`${value}-${i}`}>{renderCheckedItem(value, i)}</View>
        ) : (
          <CheckedItem
            key={`${value}-${i}`}
            title={value}
            onRemove={onRemove}
          />
        );
      })}
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
