import { ScrollView, View } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownItem from './dropdown-item';
import DropdownInput from './dropdown-input';
import { DropdownProps } from './types';
import useDropdown from './use-dropdown';

function Dropdown(props: DropdownProps) {
  const {
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = <TextInput.Icon icon={'menu-up'} pointerEvents="none" />,
    menuDownIcon = <TextInput.Icon icon={'menu-down'} pointerEvents="none" />,
    value,
    onSelect,
    maxMenuHeight,
    menuContentStyle,
    CustomDropdownItem = DropdownItem,
    CustomDropdownInput = DropdownInput,
    Touchable = TouchableRipple,
    disabled = false,
    error = false,
    testID,
    menuTestID,
  } = props;
  const selectedLabel = options.find((option) => option.value === value)?.label;
  const {
    enable,
    toggleMenu,
    onLayout,
    menuStyle,
    scrollViewStyle,
    dropdownLayout,
  } = useDropdown(maxMenuHeight);
  const rightIcon = enable ? menuUpIcon : menuDownIcon;

  return (
    <Menu
      visible={enable}
      onDismiss={toggleMenu}
      style={menuStyle}
      elevation={5}
      keyboardShouldPersistTaps={'handled'}
      anchor={
        <Touchable
          testID={testID}
          disabled={disabled}
          onPress={toggleMenu}
          onLayout={onLayout}
        >
          <View pointerEvents="none">
            <CustomDropdownInput
              placeholder={placeholder}
              label={label}
              rightIcon={rightIcon}
              selectedLabel={selectedLabel}
              mode={mode}
              disabled={disabled}
              error={error}
            />
          </View>
        </Touchable>
      }
      contentStyle={menuContentStyle}
      testID={menuTestID}
    >
      <ScrollView style={scrollViewStyle} bounces={false}>
        {options.map((option, index) => {
          return (
            <CustomDropdownItem
              key={option.value}
              option={option}
              value={value}
              width={dropdownLayout.width}
              toggleMenu={toggleMenu}
              onSelect={onSelect}
              isLast={options.length <= index + 1}
              menuItemTestID={menuTestID ? `${menuTestID}-${option.value}` : ''}
            />
          );
        })}
      </ScrollView>
    </Menu>
  );
}

export default Dropdown;
