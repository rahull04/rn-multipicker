import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  Platform,
} from 'react-native';
import { CheckBox } from './CheckBox';
import Cross from '../assets/icons/close.png';

export interface OptionsModalProps {
  onClose: () => void;
  onCheck: (item: string) => void;
  checkedList: string[];
  title: string;
  onApply: () => void;
  onClearAll: () => void;
  data: string[];
  searchBarStyle?: StyleProp<TextStyle>;
  renderCheckBox?: (
    value: string,
    active: boolean,
    onCheck: (item: string) => void
  ) => JSX.Element;
  clearButtonStyle?: StyleProp<ViewStyle>;
  saveButtonStyle?: StyleProp<ViewStyle>;
  renderClearButton?: (
    onClearAll: () => void,
    disabled: boolean
  ) => JSX.Element;
  renderSaveButton?: (onApply: () => void, disabled: boolean) => JSX.Element;
  modalTitleStyle?: StyleProp<TextStyle>;
  searchBarPlaceholder?: string;
}

interface DefaultCheckBoxProps {
  onCheck: () => void;
  item: string;
  active: boolean;
}

const DefaultCheckBox = ({ onCheck, item, active }: DefaultCheckBoxProps) => (
  <TouchableOpacity onPress={onCheck} style={styles.checkboxContainer}>
    <CheckBox active={active} />
    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.label}>
      {item}
    </Text>
  </TouchableOpacity>
);

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
  const [searchText, setSearchText] = React.useState('');
  const [initialCheckedList] = React.useState(checkedList);
  const dropDownList = data.filter((item) =>
    item.toLowerCase().startsWith(searchText?.toLowerCase() ?? '')
  );
  const checkedDropdownList = checkedList.filter((item) =>
    item.toLowerCase().startsWith(searchText?.toLowerCase() ?? '')
  );

  const localAndAppliedAreEqual =
    initialCheckedList.sort().toString() === checkedList.sort().toString();

  const DefaultClearButton = (
    <Pressable
      onPress={() => (checkedList.length ? onClearAll() : null)}
      style={[
        styles.footerButton,
        !checkedList.length && styles.disabledStyle,
        clearButtonStyle,
      ]}
    >
      <Text style={styles.footerlabel}>Clear</Text>
    </Pressable>
  );

  const DefaultSaveButton = (
    <Pressable
      onPress={() => (localAndAppliedAreEqual ? null : onApply())}
      style={[
        styles.footerButton,
        localAndAppliedAreEqual && styles.disabledStyle,
        saveButtonStyle,
      ]}
    >
      <Text style={styles.footerlabel}>Save</Text>
    </Pressable>
  );

  return (
    <Modal animationType="slide" visible={true}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, modalTitleStyle]}>{title}</Text>
          <Pressable onPress={onClose}>
            <Image source={Cross} style={{ width: 14, height: 14 }} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <View>
            <TextInput
              style={[styles.searchBar, searchBarStyle]}
              value={searchText}
              placeholder={searchBarPlaceholder ?? 'Search..'}
              onChangeText={setSearchText}
            />
            {searchText ? (
              <Pressable
                style={{ position: 'absolute', top: 17, right: 12 }}
                onPress={() => setSearchText('')}
              >
                <Image source={Cross} style={{ width: 12, height: 12 }} />
              </Pressable>
            ) : null}
          </View>
          <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
            {checkedDropdownList.length ? <Text>Selected</Text> : null}
            {checkedDropdownList?.map((item) =>
              renderCheckBox ? (
                <View key={`checked-${item}`}>
                  {renderCheckBox(
                    item,
                    checkedDropdownList.includes(item),
                    onCheck
                  )}
                </View>
              ) : (
                <DefaultCheckBox
                  item={item}
                  key={`checked-${item}`}
                  onCheck={() => onCheck(item)}
                  active={checkedDropdownList.includes(item)}
                />
              )
            )}
            {checkedDropdownList.length ? (
              <Text style={{ marginVertical: 6 }}>Not Selected</Text>
            ) : null}
            {dropDownList
              .filter((val) => !checkedList.includes(val))
              ?.map((item) =>
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
        </View>
        <View style={styles.footer}>
          {renderClearButton
            ? renderClearButton(onClearAll, !checkedList.length)
            : DefaultClearButton}
          {renderSaveButton
            ? renderSaveButton(onApply, localAndAppliedAreEqual)
            : DefaultSaveButton}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 58 : 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    fontSize: 16,
    width: '90%',
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
  footerButton: {
    borderWidth: 1,
    width: 120,
    height: 42,
    borderColor: '#b3b3b3',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerlabel: {
    fontSize: 18,
  },
  searchBar: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 13 : 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  disabledStyle: {
    backgroundColor: '#f2f2f2',
    borderWidth: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
});
