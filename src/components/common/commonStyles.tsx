import { StyleSheet } from 'react-native';

export const rnMultiPickerStyles = StyleSheet.create({
  multiSelect: {
    padding: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 20,
    width: '90%',
  },
  defaultLabel: {
    marginLeft: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 8,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#4d4d4d',
  },
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
  downArrowIconContainer: {
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultLabelText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  defaultLabelCrossContainer: {
    marginRight: 4,
  },
  chevronDown: {
    width: 16,
    height: 16,
  },
});
