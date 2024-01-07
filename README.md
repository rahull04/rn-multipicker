# rn-multipicker

This package will provide features to select and search multiple dropdown items gracefully

[rn-multipicker-ios-preview.webm](https://github.com/rahull04/rn-multipicker/assets/59685264/c8a87f3f-d698-4a41-bd7d-45af71391330)

[rn-multipicker-android-preview.webm](https://github.com/rahull04/rn-multipicker/assets/59685264/c963034d-284c-4903-a477-e2a81a04cd84)



## Installation

```sh
npm install rn-multipicker
```

## Usage

```js
import { RNMultiSelect } from 'rn-multi-select';

// ...

const COUNTRIES = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
];

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

## API

### Properties

| Name | Type | Default | Description |
|---|---|---|---|
| placeholder | string | --- | Placeholder text for Multi select input |
|   |   |   |   |
| data | string[] | --- | Dropdown items to be shown and selected |
|   |   |   |   |
| onSelectedItemsChange | (selectedItems: string[]) => void | --- | Callback called when a user selects or de-selects an item, passed |
|   |   |   |   |
| selectedItems | string[] | [] | Array of selected items |
|   |   |   |   |
| styles | StyleProp<ViewStyle> | --- | Multi select input style |
|   |   |   |   |
| renderCheckedItem | (value: string, i: number) => JSX.Element | --- | Render custom CheckedItem on Multi select input |
|   |   |   |   |
| renderCheckBox | (value: string, active: boolean, onCheck: (item: string) => void) => JSX.Element | --- | Render custom Checkbox item on Multi select picker modal |
|   |   |   |   |
| searchBarStyle | StyleProp<TextStyle> | --- | Search bar style |
|   |   |   |   |
| clearButtonStyle | StyleProp<ViewStyle> | --- | Clear button style |
|   |   |   |   |
| saveButtonStyle | StyleProp<ViewStyle> | --- | Save button style |
|   |   |   |   |
| renderClearButton | (onClearAll: () => void, disabled: boolean) => JSX.Element | --- | Render custom clear button on Multi select picker modal |
|   |   |   |   |
| renderSaveButton | (onApply: () => void, disabled: boolean) => JSX.Element | --- | Render custom save button on Multi select picker modal |
|   |   |   |   |
| modalTitleStyle | StyleProp<TextStyle> |  | Multi select picker modal header title style |
|   |   |   |   |
| searchBarPlaceholder | string | --- | Placeholder text shown on the search input |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
