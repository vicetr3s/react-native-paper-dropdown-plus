import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type LayoutRectangle,
  type ViewStyle,
} from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownInput from './dropdown-input';
import MultiSelectDropdownItem from './multi-select-dropdown-item';
import type { MultiSelectDropdownProps } from './types';

function MultiSelectDropdown(props: MultiSelectDropdownProps) {
  const [enable, setEnable] = useState(false);
  const { height } = useWindowDimensions();
  const {
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = <TextInput.Icon icon={'menu-up'} pointerEvents="none" />,
    menuDownIcon = <TextInput.Icon icon={'menu-down'} pointerEvents="none" />,
    value = [],
    onSelect,
    maxMenuHeight = height / 2.5,
    menuContentStyle,
    CustomMultiSelectDropdownItem = MultiSelectDropdownItem,
    CustomMultiSelectDropdownInput = DropdownInput,
    Touchable = TouchableRipple,
    disabled = false,
  } = props;

  const selectedLabel = useMemo(
    () =>
      options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
        .join(', '),
    [options, value]
  );
  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const rightIcon = enable ? menuUpIcon : menuDownIcon;

  const toggleMenu = useCallback(() => {
    Keyboard.dismiss();
    setEnable(!enable);
  }, [enable]);

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setDropdownLayout(layout);
    },
    []
  );

  const menuStyle: ViewStyle = useMemo(
    () => ({
      width: dropdownLayout.width,
    }),
    [dropdownLayout.width]
  );

  return (
    <Menu
      visible={enable}
      onDismiss={toggleMenu}
      style={menuStyle}
      elevation={5}
      keyboardShouldPersistTaps={'handled'}
      anchor={
        <Touchable disabled={disabled} onPress={toggleMenu} onLayout={onLayout}>
          <View pointerEvents="none">
            <CustomMultiSelectDropdownInput
              placeholder={placeholder}
              label={label}
              rightIcon={rightIcon}
              selectedLabel={selectedLabel}
              mode={mode}
              disabled={disabled}
            />
          </View>
        </Touchable>
      }
      contentStyle={menuContentStyle}
    >
      <ScrollView style={{ maxHeight: maxMenuHeight }} bounces={false}>
        {options.map((option, index) => {
          return (
            <CustomMultiSelectDropdownItem
              key={option.value}
              option={option}
              value={value}
              width={dropdownLayout.width}
              onSelect={onSelect}
              isLast={options.length <= index + 1}
            />
          );
        })}
      </ScrollView>
    </Menu>
  );
}

export default forwardRef(MultiSelectDropdown);
