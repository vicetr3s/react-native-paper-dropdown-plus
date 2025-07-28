# react-native-paper-dropdown-plus

[![npm version](https://img.shields.io/npm/v/react-native-paper-dropdown-plus.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown-plus)
[![npm downloads](https://img.shields.io/npm/dm/react-native-paper-dropdown-plus.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown-plus)
[![npm](https://img.shields.io/npm/dt/react-native-paper-dropdown-plus.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown-plus)
[![npm](https://img.shields.io/npm/l/react-native-paper-dropdown-plus?style=for-the-badge)](https://github.com/vicetr3s/react-native-paper-dropdown-plus/blob/master/LICENSE)

> **🍴 This is a maintained fork of the original [react-native-paper-dropdown](https://github.com/fateh999/react-native-paper-dropdown) by [@fateh999](https://github.com/fateh999)**

Material Design Dropdown Component using React Native Paper, now with enhanced features and community improvements

## 🚀 What's New in This Fork

This fork includes several enhancements and community-contributed features that were never merged into the original repository:

### ✨ New Features & Improvements

#### 🎯 **FlatList Support** (by [@levon-zakarian](https://github.com/levon-zakarian))
- **`isFlatList` prop**: Choose between ScrollView (default) or FlatList for better performance with large datasets
- **`flatListProps`**: Pass additional props to FlatList when enabled
- **Performance boost**: Better memory management for large option lists

#### 📜 **Enhanced Scroll Events** (by [@ashaffah](https://github.com/ashaffah))
- **Advanced scroll event props**: Better control over scroll behavior
- **Scroll event handling**: Enhanced scroll event management for improved UX
- **Better scroll integration**: More responsive scroll interactions

#### 🎨 **Enhanced Styling Options** (by [@vicetr3s](https://github.com/vicetr3s))
- **`style` prop**: Apply custom styles to the Dropdown Input component
- **`outlineStyle` prop**: Customize outline styles for better theming
- **Better customization**: More control over component appearance

#### 🎯 **Advanced Menu Positioning** (by [@vicetr3s](https://github.com/vicetr3s))
- **`anchorPosition` prop**: Control menu anchor positioning
- **`mode` prop**: Menu display mode options for better UX
- **Updated react-native-paper**: Compatible with latest Menu component features

#### 📋 **Improved Header Component** (by [@vicetr3s](https://github.com/vicetr3s))
- **`headerTitle` prop**: Display custom text in header (independent from input label)
- **`headerTitleStyle` prop**: Style the header title text
- **`headerStyle` prop**: Customize header container styles
- **Smaller default height**: More compact header design

#### 🌙 **Dark Mode Fix** (by [@PaitoAnderson](https://github.com/PaitoAnderson))
- **Fixed item text visibility**: Proper text contrast in dark mode themes
- **Better accessibility**: Improved readability across all themes

#### 📱 **Enhanced Scroll Support** (by community)
- **`scrollViewProps`**: Additional scroll event props for better control
- **Improved scroll behavior**: Smoother scrolling experience

### 🔧 **Community Contributions**
This fork actively accepts and merges valuable community contributions that enhance the package, providing a more feature-rich and maintained alternative to the original.

## Dependencies

```bash
react-native-paper
```

## Installation

```bash
yarn add react-native-paper-dropdown-plus
```

or

```bash
npm i react-native-paper-dropdown-plus
```

## Demo

<img src="https://github.com/fateh999/react-native-paper-dropdown/raw/main/Demo.gif" style="object-fit:contain" width="250" height="444" />

## Basic Example

### Single Select

```javascript
import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-paper-dropdown-plus';
import { Provider as PaperProvider } from 'react-native-paper';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function App() {
  const [gender, setGender] = useState<string>('');

  return (
    <PaperProvider>
      <View style={{ margin: 16 }}>
        <Dropdown
          label="Gender"
          placeholder="Select Gender"
          options={OPTIONS}
          value={gender}
          onSelect={setGender}
          // New features from this fork:
          isFlatList={true} // Use FlatList for better performance
          inputStyle={{ backgroundColor: '#f5f5f5' }} // Custom input styling
          headerTitle="Choose Your Gender" // Custom header text
          menuAnchorPosition="bottom" // Menu positioning

        />
      </View>
    </PaperProvider>
  );
}
```

### Multi Select

```javascript
import React, { useState } from 'react';
import { View } from 'react-native';
import { MultiSelectDropdown } from 'react-native-paper-dropdown-plus';
import { Provider as PaperProvider } from 'react-native-paper';

const MULTI_SELECT_OPTIONS = [
  { label: 'White', value: 'white' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Orange', value: 'orange' },
];

export default function App() {
  const [colors, setColors] = useState<string[]>([]);

  return (
    <PaperProvider>
      <View style={{ margin: 16 }}>
        <MultiSelectDropdown
          label="Colors"
          placeholder="Select Colors"
          options={MULTI_SELECT_OPTIONS}
          value={colors}
          onSelect={setColors}
          // Enhanced features:
          isFlatList={true}
          headerTitle="Pick Your Favorite Colors"
          headerTitleStyle={{ fontWeight: 'bold', color: '#333' }}
        />
      </View>
    </PaperProvider>
  );
}
```

## Props

### `DropdownProps`

| Prop                  | Type                                                                    | Description                                                      | **Fork Enhancement** |
| --------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------- |
| `testID`              | `string`                                                                | Test ID for the dropdown component.                              |                      |
| `menuTestID`          | `string`                                                                | Test ID for the dropdown menu.                                   |                      |
| `value`               | `string`                                                                | The currently selected value.                                    |                      |
| `onSelect`            | `(value?: string) => void`                                              | Callback function to handle value selection.                     |                      |
| `options`             | `Option[]`                                                              | Array of options for the dropdown.                               |                      |
| `menuUpIcon`          | `ReactElement`                                                          | Custom icon for menu up state.                                   |                      |
| `menuDownIcon`        | `ReactElement`                                                          | Custom icon for menu down state.                                 |                      |
| `maxMenuHeight`       | `number`                                                                | Maximum height of the dropdown menu.                             |                      |
| `menuContentStyle`    | `ViewStyle`                                                             | Style for the dropdown menu content.                             |                      |
| `listContainerStyle`  | `StyleProp<ViewStyle>`                                                  | Style for the list container (FlatList/ScrollView).              |                      |
| `inputStyle`          | `StyleProp<ViewStyle>`                                                  | Custom styles for the Dropdown Input component.                  | ✅ @vicetr3s         |
| `inputOutlineStyle`   | `StyleProp<ViewStyle>`                                                  | Custom outline styles for the Dropdown Input component.          | ✅ @vicetr3s         |
| `headerTitle`         | `ReactElement \| string`                                                | Custom text/component for the header (independent from input label). | ✅ @vicetr3s     |
| `headerTitleStyle`    | `StyleProp<TextStyle>`                                                  | Style for the header title text.                                 | ✅ @vicetr3s         |
| `headerStyle`         | `StyleProp<ViewStyle>`                                                  | Style for the header container.                                   | ✅ @vicetr3s         |
| `hideMenuHeader`      | `boolean`                                                               | Hide menu header component (default: false).                     |                      |
| `statusBarHeight`     | `number`                                                                | Additional top margin for the status bar on Android.             |                      |
| `menuAnchorPosition`  | `'top' \| 'bottom'`                                                     | Menu anchor positioning.                                          | ✅ @vicetr3s         |
| `menuMode`            | `'flat' \| 'elevated'`                                                  | Menu display mode.                                                | ✅ @vicetr3s         |
| `Touchable`           | `ForwardRefExoticComponent<PressableProps & RefAttributes<View>>`       | Custom touchable component for the dropdown.                     |                      |
| `CustomMenuHeader`    | `(props: DropdownHeaderProps) => ReactElement`                          | Custom component for the dropdown menu header.                   |                      |
| `CustomDropdownItem`  | `(props: DropdownItemProps) => ReactElement`                            | Custom component for dropdown item.                              |                      |
| `CustomDropdownInput` | `(props: DropdownInputProps) => ReactElement`                           | Custom component for dropdown input.                             |                      |
| `onScroll`            | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`              | Scroll event callback.                                            | ✅ @ashaffah         |
| `onScrollBeginDrag`   | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`              | Scroll begin drag event callback.                                | ✅ @ashaffah         |
| `onScrollEndDrag`     | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`              | Scroll end drag event callback.                                  | ✅ @ashaffah         |
| `placeholder`         | `string`                                                                | Placeholder text for the dropdown input.                         |                      |
| `label`               | `TextInputLabelProp`                                                    | Label for the dropdown input.                                    |                      |
| `mode`                | `'flat' \| 'outlined'`                                                  | Mode for the dropdown input.                                     |                      |
| `disabled`            | `boolean`                                                               | Whether the dropdown is disabled.                                |                      |
| `error`               | `boolean`                                                               | Whether the dropdown has an error.                               |                      |
| `isFlatList`          | `boolean`                                                               | Whether to use FlatList for rendering (default: false).          | ✅ @levon-zakarian   |
| `flatListProps`       | `Omit<FlatListProps<Option>, 'data' \| 'renderItem' \| 'keyExtractor'>` | Additional props for FlatList (only when isFlatList is true).    | ✅ @levon-zakarian   |
| `scrollViewProps`     | `ScrollViewProps`                                                       | Additional props for ScrollView (only when isFlatList is false). | ✅ @levon-zakarian   |

### `MultiSelectDropdownProps`

| Prop                             | Type                                                                    | Description                                                          | **Fork Enhancement** |
|----------------------------------|-------------------------------------------------------------------------|----------------------------------------------------------------------|----------------------|
| `testID`                         | `string`                                                                | Test ID for the dropdown component.                                  |                      |
| `menuTestID`                     | `string`                                                                | Test ID for the dropdown menu.                                       |                      |
| `value`                          | `string[]`                                                              | The currently selected values.                                       |                      |
| `onSelect`                       | `(value: string[]) => void`                                             | Callback function to handle value selection.                         |                      |
| `options`                        | `Option[]`                                                              | Array of options for the dropdown.                                   |                      |
| `menuUpIcon`                     | `ReactElement`                                                          | Custom icon for menu up state.                                       |                      |
| `menuDownIcon`                   | `ReactElement`                                                          | Custom icon for menu down state.                                     |                      |
| `maxMenuHeight`                  | `number`                                                                | Maximum height of the dropdown menu.                                 |                      |
| `menuContentStyle`               | `ViewStyle`                                                             | Style for the dropdown menu content.                                 |                      |
| `listContainerStyle`             | `StyleProp<ViewStyle>`                                                  | Style for the list container (FlatList/ScrollView).                  |                      |
| `inputStyle`                     | `StyleProp<ViewStyle>`                                                  | Custom styles for the Dropdown Input component.                      | ✅ @vicetr3s          |
| `inputOutlineStyle`              | `StyleProp<ViewStyle>`                                                  | Custom outline styles for the Dropdown Input component.              | ✅ @vicetr3s          |
| `headerTitle`                    | `ReactElement \| string`                                                | Custom text/component for the header (independent from input label). | ✅ @vicetr3s          |
| `headerTitleStyle`               | `StyleProp<TextStyle>`                                                  | Style for the header title text.                                     | ✅ @vicetr3s          |
| `headerStyle`                    | `StyleProp<ViewStyle>`                                                  | Style for the header container.                                      | ✅ @vicetr3s          |
| `hideMenuHeader`                 | `boolean`                                                               | Hide menu header component (default: false).                         |                      |
| `statusBarHeight`                | `number`                                                                | Additional top margin for the status bar on Android.                 |                      |
| `menuAnchorPosition`             | `'top' \| 'bottom'`                                                     | Menu anchor positioning.                                             | ✅ @vicetr3s          |
| `menuMode`                       | `'flat' \| 'elevated'`                                                  | Menu display mode.                                                   | ✅ @vicetr3s          |
| `Touchable`                      | `ForwardRefExoticComponent<PressableProps & RefAttributes<View>>`       | Custom touchable component for the dropdown.                         |                      |
| `CustomMenuHeader`               | `(props: DropdownHeaderProps) => ReactElement`                          | Custom component for the dropdown menu header.                       |                      |
| `CustomMultiSelectDropdownItem`  | `(props: MultiSelectDropdownItemProps) => ReactElement`                 | Custom component for multi-select dropdown item.                     |                      |
| `CustomMultiSelectDropdownInput` | `(props: DropdownInputProps) => ReactElement`                           | Custom component for multi-select dropdown input.                    |                      |
| `onScroll`                       | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`              | Scroll event callback.                                               | ✅ @ashaffah          |
| `onScrollBeginDrag`              | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`              | Scroll begin drag event callback.                                    | ✅ @ashaffah          |
| `onScrollEndDrag`                | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`              | Scroll end drag event callback.                                      | ✅ @ashaffah          |
| `placeholder`                    | `string`                                                                | Placeholder text for the dropdown input.                             |                      |
| `label`                          | `TextInputLabelProp`                                                    | Label for the dropdown input.                                        |                      |
| `mode`                           | `'flat' \| 'outlined'`                                                  | Mode for the dropdown input.                                         |                      |
| `disabled`                       | `boolean`                                                               | Whether the dropdown is disabled.                                    |                      |
| `error`                          | `boolean`                                                               | Whether the dropdown has an error.                                   |                      |
| `isFlatList`                     | `boolean`                                                               | Whether to use FlatList for rendering (default: false).              | ✅ @levon-zakarian    |
| `flatListProps`                  | `Omit<FlatListProps<Option>, 'data' \| 'renderItem' \| 'keyExtractor'>` | Additional props for FlatList (only when isFlatList is true).        | ✅ @levon-zakarian    |
| `scrollViewProps`                | `ScrollViewProps`                                                       | Additional props for ScrollView (only when isFlatList is false).     | ✅ @levon             |

## Methods

| Method    | Return | Description                  |
| --------- | ------ | ---------------------------- |
| `focus()` | `void` | Open the dropdown manually.  |
| `blur()`  | `void` | Close the dropdown manually. |

## 🤝 Contributing

This fork actively welcomes community contributions! Feel free to submit Pull Requests with improvements, bug fixes, or new features.

### Contributors to this fork:
- [@levon-zakarian](https://github.com/levon-zakarian) - FlatList support and documentation improvements
- [@PaitoAnderson](https://github.com/PaitoAnderson) - Dark mode text fixes
- [@ashaffah](https://github.com/ashaffah) - Enhanced scroll event props and scroll handling
- [@vicetr3s](https://github.com/vicetr3s) - Enhanced styling, menu positioning, and header improvements

## 🙏 Credits

**Original Package**: [react-native-paper-dropdown](https://github.com/fateh999/react-native-paper-dropdown) by [Fateh Farooqui (@fateh999)](https://github.com/fateh999)

This package is a community-maintained fork that includes valuable contributions and improvements that enhance the original functionality. Special thanks to [@fateh999](https://github.com/fateh999) for creating the foundation of this amazing component!

## 📄 License

MIT

---

**Original Documentation**: [https://fateh999.github.io/react-native-paper-dropdown](https://fateh999.github.io/react-native-paper-dropdown)

**Maintained Fork**: [react-native-paper-dropdown-plus](https://github.com/vicetr3s/react-native-paper-dropdown-plus) by [Vicente Díaz (@vicetr3s)](https://github.com/vicetr3s)
