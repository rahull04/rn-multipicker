import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Cross from '../../assets/icons/close.png';
import { SearchInput } from '../common/SearchInput';
import { useSearch } from '../../hooks/useSearch';
import type { OptionsModalProps } from './OptionsModal.type';
import { DefaultCheckBox } from '../common/DefaultCheckBox';
import { DefaultFooterButton } from '../common/DefaultFooterButton';
import { TouchableOpacity } from 'react-native';

const ALL_ITEMS_CHECKED_TEXT = 'No data available!';
const TRY_CHANGING_SEARCH_TEXT = 'Try changing the search text!';

export const OptionsModal = ({
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
}: OptionsModalProps) => {
  const { searchText, onSearch, clearSearch } = useSearch();
  const [initialCheckedList] = React.useState(checkedList);
  const dropDownList = data.filter(
    (item) =>
      item.toLowerCase().startsWith(searchText?.toLowerCase() ?? '') &&
      !checkedList.includes(item)
  );

  const localAndAppliedAreEqual =
    initialCheckedList.sort().toString() === checkedList.sort().toString();

  const areAllItemsChecked = data.length === checkedList.length;

  const SelectedSection = (
    <>
      {checkedList.length ? <Text>Selected</Text> : null}
      {checkedList?.map((item) =>
        renderCheckBox ? (
          <View key={`checked-${item}`}>
            {renderCheckBox(item, checkedList.includes(item), onCheck)}
          </View>
        ) : (
          <DefaultCheckBox
            item={item}
            key={`checked-${item}`}
            onCheck={() => onCheck(item)}
            active={checkedList.includes(item)}
          />
        )
      )}
    </>
  );

  const NotSelectedHeaderSection = (
    <>
      {checkedList.length ? (
        <Text style={styles.notSelected}>Not Selected</Text>
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
        renderClearButton(onClearAll, !checkedList.length)
      ) : (
        <DefaultFooterButton
          title="Clear"
          onPress={() => (checkedList.length ? onClearAll() : null)}
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
              {dropDownList?.map((item) =>
                renderCheckBox ? (
                  <View key={`unchecked-${item}`}>
                    {renderCheckBox(item, checkedList.includes(item), onCheck)}
                  </View>
                ) : (
                  <DefaultCheckBox
                    item={item}
                    key={`unchecked-${item}`}
                    onCheck={() => onCheck(item)}
                    active={checkedList.includes(item)}
                  />
                )
              )}
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
  keyboardAvoidingView: { flex: 1 },
});
