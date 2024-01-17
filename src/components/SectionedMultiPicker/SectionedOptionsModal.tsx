import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Cross from '../../assets/icons/close.png';
import { SearchInput } from '../common/SearchInput';
import { useSearch } from '../../hooks/useSearch';
import type { OptionsModalProps } from '../BaseMultiPicker/OptionsModal.type';
import { DefaultCheckBox } from '../common/DefaultCheckBox';
import { DefaultFooterButton } from '../common/DefaultFooterButton';
import type {
  CustomSelectedSectionHeaderData,
  SectionedMultiSelectData,
  SectionedSelectedItems,
} from '../BaseMultiPicker/RNMultiPicker.type';
import ChevronDown from '../../assets/icons/chevron-down.png';
import { useSectionedDropdownList } from '../../hooks/useDropdownList';
import { SectionedDropdownItem } from './SectionedDropdownItem';
import { isCloseToBottom } from '../../utils';

const ALL_ITEMS_CHECKED_TEXT = 'No data available!';
const TRY_CHANGING_SEARCH_TEXT = 'Try changing the search text!';

type OmmitedSectionedOptionsModalProps = Omit<
  OptionsModalProps,
  'onCheck' | 'checkedList' | 'data' | 'renderCheckBox'
>;

interface SectionedOptionsModalProps extends OmmitedSectionedOptionsModalProps {
  onCheck: (item: SectionedSelectedItems) => void;
  checkedList: SectionedSelectedItems[];
  data: SectionedMultiSelectData[];
  renderCheckBox?: (
    value: SectionedSelectedItems,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
  onCheckMultiple: (items: SectionedSelectedItems[]) => void;
  onRemoveMultiple: (items: SectionedSelectedItems[]) => void;
  renderSelectedSectionHeader?: (
    value: CustomSelectedSectionHeaderData,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
  renderNotSelectedSectionHeader?: (
    value: CustomSelectedSectionHeaderData,
    active: boolean,
    onCheck: (item: SectionedSelectedItems) => void
  ) => JSX.Element;
}

export const SectionedOptionsModal = ({
  onClose,
  data,
  onCheck,
  checkedList,
  title,
  onApply,
  onClearAll,
  searchBarStyle,
  renderCheckBox,
  clearButtonStyle,
  saveButtonStyle,
  renderClearButton,
  renderSaveButton,
  modalTitleStyle,
  searchBarPlaceholder,
  onCheckMultiple,
  onRemoveMultiple,
  renderSelectedSectionHeader,
  renderNotSelectedSectionHeader,
  onSearchTextChange: onSearchExternal,
  onEndReached,
}: SectionedOptionsModalProps) => {
  const [showSearchLoader, setShowSearchLoader] = useState(false);
  const [showRefetchLoader, setShowRefetchLoader] = useState(false);
  const [fetchIteration, setFetchIteration] = useState(0);
  const { searchText, onSearch, clearSearch } = useSearch(
    setShowSearchLoader,
    onSearchExternal
  );
  const [initialCheckedList] = React.useState(checkedList);

  // Selected and not selected dropdown related states
  const [selectedDropdownVisible, setSelectedDropdownVisible] = useState(true);
  const [notSelectedDropdownVisible, setNotSelectedDropdownVisible] =
    useState(true);

  const totalItems = useMemo(() => {
    let total = 0;
    data.forEach((value) => {
      value.data.forEach(() => {
        total++;
      });
    });
    return total;
  }, [data]);

  const { dropDownList, checkedDropDownList } = useSectionedDropdownList(
    data,
    checkedList,
    searchText
  );

  const localAndAppliedAreEqual =
    initialCheckedList.sort().toString() === checkedList.sort().toString();
  const areAllItemsChecked = totalItems === checkedList.length;

  const onSelectedSectionHeaderCheck = useCallback(
    (item: SectionedMultiSelectData) => {
      const remainingItems = item.data.map((val) => ({
        ...val,
        title: item.title,
      }));
      onRemoveMultiple([...remainingItems]);
    },
    [onRemoveMultiple]
  );

  const onNotSelectedSectionHeaderCheck = useCallback(
    (item: SectionedMultiSelectData) => {
      const remainingItems = item.data.map((val) => ({
        ...val,
        title: item.title,
      }));
      onCheckMultiple([...checkedList, ...remainingItems]);
    },
    [checkedList, onCheckMultiple]
  );

  const SelectedSection = (
    <>
      {checkedList.length ? (
        <Pressable
          onPress={() => setSelectedDropdownVisible((curr) => !curr)}
          style={styles.selectedBox}
        >
          <Text style={styles.selectedText}>Selected</Text>
          <Image
            source={ChevronDown}
            style={[
              styles.chevronDown,
              !selectedDropdownVisible && styles.inverted,
            ]}
          />
        </Pressable>
      ) : null}
      {selectedDropdownVisible
        ? checkedDropDownList?.map((item, i) => {
            return (
              <View key={`${item.title}-${i}`}>
                {renderSelectedSectionHeader ? (
                  renderSelectedSectionHeader(
                    {
                      title: item.title,
                      data: item.data,
                    },
                    true,
                    () => onSelectedSectionHeaderCheck(item)
                  )
                ) : (
                  <DefaultCheckBox
                    item={item.title}
                    onCheck={() => onSelectedSectionHeaderCheck(item)}
                    active={true}
                    titleStyle={styles.title}
                    titleNumberOfLines={1}
                  />
                )}
                {item.data.map((value) => (
                  <SectionedDropdownItem
                    key={`${value.id}-${i}`}
                    value={value}
                    onCheck={onCheck}
                    checkedList={checkedList}
                    title={item.title}
                    renderCheckBox={renderCheckBox}
                  />
                ))}
              </View>
            );
          })
        : null}
    </>
  );

  const NotSelectedHeaderSection = (
    <>
      {checkedList.length ? (
        <Pressable
          onPress={() => setNotSelectedDropdownVisible((curr) => !curr)}
          style={styles.selectedBox}
        >
          <Text style={styles.selectedText}>Not Selected</Text>
          <Image
            source={ChevronDown}
            style={[
              styles.chevronDown,
              !notSelectedDropdownVisible && styles.inverted,
            ]}
          />
        </Pressable>
      ) : null}
      {!dropDownList.length && notSelectedDropdownVisible ? (
        <>
          {areAllItemsChecked ? (
            <Text style={styles.notDataAvailableText}>
              {ALL_ITEMS_CHECKED_TEXT}
            </Text>
          ) : (
            <View style={styles.noDataWithSearchFilter}>
              <Text style={styles.noDataWithSearchFilterText}>
                {ALL_ITEMS_CHECKED_TEXT}
              </Text>
              <Text style={styles.noDataWithSearchFilterText}>
                {TRY_CHANGING_SEARCH_TEXT}
              </Text>
            </View>
          )}
        </>
      ) : null}
    </>
  );

  const Footer = (
    <View style={styles.footer}>
      {renderClearButton ? (
        renderClearButton(() => {
          onClearAll();
          setNotSelectedDropdownVisible(true);
          setSelectedDropdownVisible(true);
        }, !checkedList.length)
      ) : (
        <DefaultFooterButton
          title="Clear"
          onPress={
            checkedList.length
              ? () => {
                  onClearAll();
                  setNotSelectedDropdownVisible(true);
                  setSelectedDropdownVisible(true);
                }
              : () => null
          }
          disabled={!checkedList.length}
          style={clearButtonStyle}
        />
      )}
      {renderSaveButton ? (
        renderSaveButton(onApply, localAndAppliedAreEqual)
      ) : (
        <DefaultFooterButton
          title="Save"
          onPress={() => (localAndAppliedAreEqual ? null : onApply())}
          disabled={localAndAppliedAreEqual}
          style={saveButtonStyle}
        />
      )}
    </View>
  );

  const ContentList = (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onScroll={({ nativeEvent }) => {
          // Call user defined callback function
          if (isCloseToBottom(nativeEvent) && onEndReached) {
            const newIteration = fetchIteration + 1;
            setFetchIteration(newIteration);
            onEndReached(newIteration, (val: boolean) => {
              setShowRefetchLoader(val);
            });
          }
        }}
        scrollEventThrottle={400}
      >
        {SelectedSection}
        {NotSelectedHeaderSection}
        {notSelectedDropdownVisible
          ? dropDownList?.map((item, i) => {
              return (
                <View key={`item-${item.title}-${i}`}>
                  {renderNotSelectedSectionHeader ? (
                    renderNotSelectedSectionHeader(
                      {
                        title: item.title,
                        data: item.data,
                      },
                      true,
                      () => onNotSelectedSectionHeaderCheck(item)
                    )
                  ) : (
                    <DefaultCheckBox
                      item={item.title}
                      onCheck={() => onNotSelectedSectionHeaderCheck(item)}
                      active={false}
                      titleStyle={styles.title}
                    />
                  )}

                  {item.data.map((value) => (
                    <SectionedDropdownItem
                      key={`${value.id}-${i}`}
                      value={value}
                      onCheck={onCheck}
                      checkedList={checkedList}
                      title={item.title}
                      renderCheckBox={renderCheckBox}
                    />
                  ))}
                </View>
              );
            })
          : null}
        {showRefetchLoader ? (
          <ActivityIndicator style={styles.searchLoader} size={'large'} />
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <Modal animationType="slide" visible={true}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, modalTitleStyle]}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={Cross} style={styles.cross} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <SearchInput
            searchText={searchText}
            searchBarStyle={searchBarStyle}
            searchBarPlaceholder={searchBarPlaceholder}
            onSearch={onSearch}
            clearSearch={clearSearch}
          />
          {showSearchLoader ? (
            <ActivityIndicator style={styles.searchLoader} size={'large'} />
          ) : (
            ContentList
          )}
        </View>
        {Footer}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 58 : 20,
  },
  content: {
    flex: 15,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cross: {
    width: 19,
    height: 19,
  },
  scrollViewContent: {
    paddingVertical: 8,
  },
  notSelected: {
    marginVertical: 6,
    marginBottom: 10,
  },
  notDataAvailableText: {
    textAlign: 'center',
    color: '#808080',
    marginTop: 12,
    fontSize: 14,
  },
  noDataWithSearchFilter: {
    alignSelf: 'center',
    marginTop: 12,
  },
  noDataWithSearchFilterText: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 14,
  },
  selectedText: {
    marginBottom: 10,
  },
  chevronDown: {
    width: 16,
    height: 16,
  },
  selectedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#8c8c8c',
    marginVertical: 12,
    paddingTop: 8,
  },
  inverted: {
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 4,
    color: '#404040',
  },
  smallCheckBoxStyle: {
    paddingLeft: 8,
  },
  keyboardAvoidingView: { flex: 1 },
  searchLoader: {
    marginTop: 20,
  },
});
