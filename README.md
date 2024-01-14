# rn-multipicker

This package will provide features to select and search multiple dropdown items gracefully

[rn-multipicker-ios-preview.webm](https://github.com/rahull04/rn-multipicker/assets/59685264/c8a87f3f-d698-4a41-bd7d-45af71391330)

[rn-multipicker-android-preview.webm](https://github.com/rahull04/rn-multipicker/assets/59685264/c963034d-284c-4903-a477-e2a81a04cd84)



## Installation

```sh
npm install rn-multipicker
```

or

```sh
yarn add rn-multipicker
```

## Usage

```js
import { RNMultiSelect } from 'rn-multipicker';
import { COUNTRIES } from './constants';

// ...

const App() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <View style={{flex: 1}}>
      <RNMultiSelect
        placeholder="Countries"
        data={COUNTRIES}
        onSelectedItemsChange={(value) => setSelectedItems(value)}
        selectedItems={selectedItems}
      />
    </View>
  );
}
```

## RNMultiSelect API

### Properties

| Prop                  | Type                                               | Description                                                  |
|-----------------------|----------------------------------------------------|--------------------------------------------------------------|
| `placeholder`         | `string`                                           | Placeholder text displayed in the multi-select input field.  |
| `data`                | `string[]`                                         | Array of strings representing selectable items.              |
| `onSelectedItemsChange` | `(selectedItems: string[]) => void`               | Callback triggered when selected items change.               |
| `selectedItems`       | `string[]`                                         | Array of strings representing currently selected items.      |
| `styles` (deprecated) | `StyleProp<ViewStyle>`                             | Deprecated: Use `inputStyle` instead.                         |
| `renderCheckedItem`   | `(value: string, i: number) => JSX.Element`        | Custom renderer for checked items.                            |
| `renderCheckBox`      | `(value: string, active: boolean, onCheck: (item: string) => void) => JSX.Element` | Custom renderer for checkboxes.     |
| `searchBarStyle`      | `StyleProp<TextStyle>`                             | Styling for the search bar.                                   |
| `clearButtonStyle`    | `StyleProp<ViewStyle>`                             | Styling for the clear button.                                 |
| `saveButtonStyle`     | `StyleProp<ViewStyle>`                             | Styling for the save button.                                  |
| `renderClearButton`   | `(onClearAll: () => void, disabled: boolean) => JSX.Element` | Custom renderer for the clear button. |
| `renderSaveButton`    | `(onApply: () => void, disabled: boolean) => JSX.Element` | Custom renderer for the save button. |
| `modalTitleStyle`     | `StyleProp<TextStyle>`                             | Styling for the picker modal title.                           |
| `searchBarPlaceholder`| `string`                                           | Placeholder text for the search bar.                         |
| `inputStyle`          | `StyleProp<ViewStyle>`                             | Styling for the input field.                                  |
| `maxCheckedItemsVisible` | `number`                                        | Maximum number of checked items visible in the selection.    |
| `renderViewMoreButton`| `(showAll: () => void, remainingCount: number) => JSX.Element` | Custom renderer for "View More" button.  |
| `renderViewLessButton`| `(showLess: () => void) => JSX.Element`           | Custom renderer for "View Less" button.                      |


## RNMultiSelect.Sectioned API

| Prop                  | Type                                               | Description                                                  |
|-----------------------|----------------------------------------------------|--------------------------------------------------------------|
| `data`                | `SectionedMultiSelectData[]`                       | Array of data representing sectioned items in the multi-picker.|
| `selectedItems`       | `SectionedSelectedItems[]`                         | Array of selected items with section information.             |
| `onSelectedItemsChange` | `(selectedItems: SectionedSelectedItems[]) => void` | Callback triggered when selected items change.               |
| `renderCheckedItem`   | `(value: SectionedSelectedItems, onRemove: () => void, i: number) => JSX.Element` | Custom renderer for checked items in the picker.   |
| `renderCheckBox`      | `(value: SectionedSelectedItems, active: boolean, onCheck: (item: SectionedSelectedItems) => void) => JSX.Element` | Custom renderer for checkboxes in the picker. |
| `placeholder`         | `string`                                           | Placeholder text displayed in the multi-select input field.  |
| `styles` (deprecated) | `StyleProp<ViewStyle>`                             | Deprecated: Use `inputStyle` instead.                         |
| `searchBarStyle`      | `StyleProp<TextStyle>`                             | Styling for the search bar.                                   |
| `clearButtonStyle`    | `StyleProp<ViewStyle>`                             | Styling for the clear button.                                 |
| `saveButtonStyle`     | `StyleProp<ViewStyle>`                             | Styling for the save button.                                  |
| `renderClearButton`   | `(onClearAll: () => void, disabled: boolean) => JSX.Element` | Custom renderer for the clear button. |
| `renderSaveButton`    | `(onApply: () => void, disabled: boolean) => JSX.Element` | Custom renderer for the save button. |
| `modalTitleStyle`     | `StyleProp<TextStyle>`                             | Styling for the picker modal title.                           |
| `searchBarPlaceholder`| `string`                                           | Placeholder text for the search bar.                         |
| `inputStyle`          | `StyleProp<ViewStyle>`                             | Styling for the input field.                                  |
| `maxCheckedItemsVisible` | `number`                                        | Maximum number of checked items visible in the selection.    |
| `renderViewMoreButton`| `(showAll: () => void, remainingCount: number) => JSX.Element` | Custom renderer for "View More" button.  |
| `renderViewLessButton`| `(showLess: () => void) => JSX.Element`           | Custom renderer for "View Less" button.                      |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
