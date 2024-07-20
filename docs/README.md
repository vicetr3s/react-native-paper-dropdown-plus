# react-native-paper-dropdown

[![npm version](https://img.shields.io/npm/v/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm downloads](https://img.shields.io/npm/dm/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/dt/react-native-paper-dropdown.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-dropdown)
[![npm](https://img.shields.io/npm/l/react-native-paper-dropdown?style=for-the-badge)](https://github.com/fateh999/react-native-paper-dropdown/blob/master/LICENSE)

Material Design Dropdown Component using React Native Paper

## Dependencies

    react-native-paper

## Installation

```bash

yarn add react-native-paper-dropdown

```

or

```

npm i react-native-paper-dropdown

```

## Basic Example

```javascript
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import {
  Appbar,
  Divider,
  Headline,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Paragraph,
  TextInput,
  ThemeProvider,
  TouchableRipple,
} from 'react-native-paper';
import {
  Dropdown,
  MultiSelectDropdown,
  type DropdownInputProps,
  type DropdownItemProps,
} from 'react-native-paper-dropdown';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const MULTI_SELECT_OPTIONS = [
  {
    label: 'White',
    value: 'white',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
];

const CustomDropdownItem = ({
  width,
  option,
  value,
  onSelect,
  toggleMenu,
  isLast,
}: DropdownItemProps) => {
  const style: ViewStyle = useMemo(
    () => ({
      height: 50,
      width,
      backgroundColor:
        value === option.value
          ? MD3DarkTheme.colors.primary
          : MD3DarkTheme.colors.onPrimary,
      justifyContent: 'center',
      paddingHorizontal: 16,
    }),
    [option.value, value, width]
  );

  return (
    <>
      <TouchableRipple
        onPress={() => {
          onSelect?.(option.value);
          toggleMenu();
        }}
        style={style}
      >
        <Headline
          style={{
            color:
              value === option.value
                ? MD3DarkTheme.colors.onPrimary
                : MD3DarkTheme.colors.primary,
          }}
        >
          {option.label}
        </Headline>
      </TouchableRipple>
      {!isLast && <Divider />}
    </>
  );
};

const CustomDropdownInput = ({
  placeholder,
  selectedLabel,
  rightIcon,
}: DropdownInputProps) => {
  return (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor={MD3DarkTheme.colors.onSecondary}
      value={selectedLabel}
      style={{
        backgroundColor: MD3DarkTheme.colors.primary,
      }}
      textColor={MD3DarkTheme.colors.onPrimary}
      right={rightIcon}
    />
  );
};

export default function App() {
  const [nightMode, setNightmode] = useState(false);
  const [gender, setGender] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const Theme = nightMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeProvider theme={Theme}>
      <PaperProvider theme={Theme}>
        <View
          style={[
            styles.container,
            { backgroundColor: Theme.colors.background },
          ]}
        >
          <Appbar.Header elevated>
            <Appbar.Content title={'Dropdown Demo'} />
            <Appbar.Action
              icon={nightMode ? 'brightness-7' : 'brightness-3'}
              onPress={() => setNightmode(!nightMode)}
            />
          </Appbar.Header>
          <ScrollView
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={styles.formWrapper}>
              <Headline>Single Select</Headline>
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
              />
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown (Outline Mode)</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                mode="outlined"
              />
              <View style={styles.spacer} />
              <Paragraph>Custom Dropdown</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                menuContentStyle={{
                  backgroundColor: MD3DarkTheme.colors.onPrimary,
                }}
                menuUpIcon={
                  <TextInput.Icon
                    icon={'menu-up'}
                    color={MD3DarkTheme.colors.primaryContainer}
                    pointerEvents="none"
                  />
                }
                menuDownIcon={
                  <TextInput.Icon
                    icon={'menu-down'}
                    color={MD3DarkTheme.colors.primaryContainer}
                    pointerEvents="none"
                  />
                }
                CustomDropdownItem={CustomDropdownItem}
                CustomDropdownInput={CustomDropdownInput}
              />

              <View style={styles.spacer} />
              <View style={styles.spacer} />

              <Headline>Multi Select</Headline>
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown</Paragraph>
              <MultiSelectDropdown
                label={'Colors'}
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
              />
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown (Outline Mode)</Paragraph>
              <MultiSelectDropdown
                label={'Colors'}
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
                mode={'outlined'}
              />
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    margin: 16,
  },
  spacer: {
    height: 16,
  },
});
```

## Demo

![Demo](https://github.com/fateh999/react-native-paper-dropdown/blob/main/Demo.gif)

## Props

```typescript
import type { ForwardRefExoticComponent } from 'react';
import type { PressableProps, View, ViewStyle } from 'react-native';
import type { TextInputLabelProp } from 'react-native-paper/lib/typescript/components/TextInput/types';
import type { TextInputProps } from 'react-native-paper';

export type DropdownInputProps = {
  placeholder?: string;
  label?: TextInputLabelProp;
  rightIcon: JSX.Element;
  selectedLabel?: string;
  mode?: 'flat' | 'outlined';
  disabled?: boolean;
  error?: boolean;
};

export type Option = {
  label: string;
  value: string;
};

export type DropdownProps = {
  value?: string;
  onSelect?: (value: string) => void;
  options: Option[];
  menuUpIcon?: JSX.Element;
  menuDownIcon?: JSX.Element;
  maxMenuHeight?: number;
  menuContentStyle?: ViewStyle;
  CustomDropdownItem?: (props: DropdownItemProps) => JSX.Element;
  CustomDropdownInput?: (props: DropdownInputProps) => JSX.Element;
  Touchable?: ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<View>
  >;
  testID?: string;
  menuTestID?: string;
} & Pick<
  TextInputProps,
  'placeholder' | 'label' | 'mode' | 'disabled' | 'error'
>;

export type MultiSelectDropdownProps = {
  value?: string[];
  onSelect?: (value: string[]) => void;
  options: Option[];
  menuUpIcon?: JSX.Element;
  menuDownIcon?: JSX.Element;
  Touchable?: ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<View>
  >;
  maxMenuHeight?: number;
  menuContentStyle?: ViewStyle;
  CustomMultiSelectDropdownItem?: (
    props: MultiSelectDropdownItemProps
  ) => JSX.Element;
  CustomMultiSelectDropdownInput?: (props: DropdownInputProps) => JSX.Element;
  testID?: string;
  menuTestID?: string;
} & Pick<
  TextInputProps,
  'placeholder' | 'label' | 'mode' | 'disabled' | 'error'
>;

export type DropdownItemProps = {
  option: Option;
  value?: string;
  onSelect?: (value: string) => void;
  width: number;
  toggleMenu: () => void;
  isLast: boolean;
  menuItemTestID?: string;
};

export type MultiSelectDropdownItemProps = {
  option: Option;
  value?: string[];
  onSelect?: (value: string[]) => void;
  width: number;
  isLast: boolean;
  menuItemTestID?: string;
};
```
