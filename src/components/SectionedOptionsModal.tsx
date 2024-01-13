import React, { useMemo, useState } from 'react';
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
} from 'react-native';
import Cross from '../assets/icons/close.png';
import { SearchInput } from './SearchInput';
import { useSearch } from '../hooks/useSearch';
import type { OptionsModalProps } from './OptionsModal.type';
import { DefaultCheckBox } from './DefaultCheckBox';
import { DefaultFooterButton } from './DefaultFooterButton';
import type {
  SectionedMultiSelectData,
  SectionedSelectedItems,
} from './RNMultiPicker.type';
import ChevronDown from '../assets/icons/chevron-down.png';

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
}: SectionedOptionsModalProps) => {
  const { searchText, onSearch, clearSearch } = useSearch();
  const [initialCheckedList] = React.useState(checkedList);

  // Selected and not selected dropdown related states
  const [selectedDropdownVisible, setSelectedDropdownVisible] = useState(true);
  const [notSelectedDropdownVisible, setNotSelectedDropdownVisible] =
    useState(true);

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

  const totalItems = useMemo(() => {
    let total = 0;
    data.forEach((value) => {
      value.data.forEach(() => {
        total++;
      });
    });
    return total;
  }, [data]);

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

  const localAndAppliedAreEqual =
    initialCheckedList.sort().toString() === checkedList.sort().toString();

  const areAllItemsChecked = totalItems === checkedList.length;

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
                <DefaultCheckBox
                  item={item.title}
                  onCheck={() => {
                    const remainingItems = item.data.map((val) => ({
                      ...val,
                      title: item.title,
                    }));
                    onRemoveMultiple([...checkedList, ...remainingItems]);
                  }}
                  active={true}
                  titleStyle={styles.title}
                />
                {item.data.map((value) => (
                  <View key={`${value.id}-${i}`}>
                    {renderCheckBox ? (
                      <View key={`unchecked-${value.id}`}>
                        {renderCheckBox(
                          { ...value, title: item.title },
                          !!checkedList.find((dt) => dt.id === value.id),
                          onCheck
                        )}
                      </View>
                    ) : (
                      <DefaultCheckBox
                        item={value.value}
                        key={`unchecked-${value.value}`}
                        onCheck={() => onCheck({ ...value, title: item.title })}
                        active={!!checkedList.find((dt) => dt.id === value.id)}
                        size={16}
                        containerStyle={styles.smallCheckBoxStyle}
                      />
                    )}
                  </View>
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
      {!dropDownList.length ? (
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
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {SelectedSection}
              {NotSelectedHeaderSection}
              {notSelectedDropdownVisible
                ? dropDownList?.map((item, i) => {
                    return (
                      <View key={`item-${item.title}-${i}`}>
                        <DefaultCheckBox
                          item={item.title}
                          onCheck={() => {
                            const remainingItems = item.data.map((val) => ({
                              ...val,
                              title: item.title,
                            }));
                            onCheckMultiple([
                              ...checkedList,
                              ...remainingItems,
                            ]);
                          }}
                          active={false}
                          titleStyle={styles.title}
                        />
                        {item.data.map((value) => (
                          <View key={`${value.id}-${i}`}>
                            {renderCheckBox ? (
                              <View key={`unchecked-${value.id}`}>
                                {renderCheckBox(
                                  { ...value, title: item.title },
                                  !!checkedList.find(
                                    (dt) => dt.id === value.id
                                  ),
                                  onCheck
                                )}
                              </View>
                            ) : (
                              <DefaultCheckBox
                                item={value.value}
                                key={`unchecked-${value.value}`}
                                onCheck={() =>
                                  onCheck({ ...value, title: item.title })
                                }
                                active={
                                  !!checkedList.find((dt) => dt.id === value.id)
                                }
                                size={16}
                                tintColor="#808080"
                                containerStyle={styles.smallCheckBoxStyle}
                              />
                            )}
                          </View>
                        ))}
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </KeyboardAvoidingView>
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
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cross: {
    width: 16,
    height: 16,
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
    borderBottomColor: '#bfbfbf',
    marginVertical: 12,
  },
  inverted: {
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 4,
    color: '#404040',
  },
  smallCheckBoxStyle: {
    paddingLeft: 8,
  },
  keyboardAvoidingView: { flex: 1 },
});
