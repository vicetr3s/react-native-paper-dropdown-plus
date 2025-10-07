import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Menu, TextInput, TouchableRipple, useTheme } from 'react-native-paper';
import DropdownItem from './dropdown-item';
import DropdownInput from './dropdown-input';
import { DropdownProps, DropdownRef, Option } from './types';
import useDropdown from './use-dropdown';
import {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react';
import DropdownHeader from './dropdown-header';

function Dropdown(props: DropdownProps, ref: Ref<DropdownRef>) {
  const {
    testID,
    menuTestID,
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = <TextInput.Icon icon={'menu-up'} pointerEvents="none" />,
    menuDownIcon = <TextInput.Icon icon={'menu-down'} pointerEvents="none" />,
    value,
    maxMenuHeight,
    menuContentStyle,
    listContainerStyle,
    inputStyle,
    inputOutlineStyle,
    statusBarHeight = Platform.OS === 'android'
      ? StatusBar.currentHeight
      : undefined,
    hideMenuHeader = false,
    isFlatList = false,
    flatListProps,
    scrollViewProps,
    Touchable = TouchableRipple,
    disabled = false,
    error = false,
    menuAnchorPosition = 'bottom',
    menuMode = 'flat',
    headerTitle,
    headerTitleStyle,
    headerStyle,
    highlightBorderOnFocus = false,
    onSelect,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onOpen,
    onClose,
    CustomDropdownItem = DropdownItem,
    CustomDropdownInput = DropdownInput,
    CustomMenuHeader = DropdownHeader,
  } = props;
  const selectedLabel = options.find((option) => option.value === value)?.label;
  const {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout,
  } = useDropdown(maxMenuHeight);
  const theme = useTheme();
  const rightIcon = enable ? menuUpIcon : menuDownIcon;
  const baseContentStyle = useMemo(() => ({ paddingVertical: 0 }), []);
  const normalizedMenuContentStyle = useMemo(() => {
    if (!menuContentStyle) return undefined;
    if (menuAnchorPosition === 'top') {
      const { marginTop, margin, ...rest } = (menuContentStyle as any) ?? {};
      const adjusted: any = { ...rest };
      if (typeof marginTop !== 'undefined') adjusted.marginBottom = marginTop;
      if (typeof margin !== 'undefined' && typeof marginTop === 'undefined')
        adjusted.marginBottom = margin;
      adjusted.marginTop = undefined;
      return adjusted as typeof menuContentStyle;
    }
    return menuContentStyle;
  }, [menuContentStyle, menuAnchorPosition]);
  const flattenedOutlineStyle = useMemo(() => {
    if (highlightBorderOnFocus && mode === 'outlined' && enable) {
      return {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        ...StyleSheet.flatten(inputOutlineStyle),
      };
    }

    return inputOutlineStyle;
  }, [
    highlightBorderOnFocus,
    mode,
    enable,
    inputOutlineStyle,
    theme.colors.primary,
  ]);

  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    },
  }));

  const resetMenu = useCallback(() => {
    onSelect?.(undefined);
    toggleMenu();
  }, [onSelect, toggleMenu]);

  const handleDismiss = useCallback(() => {
    toggleMenu();
    onClose?.();
  }, [toggleMenu, onClose]);

  const renderDropdownItem = useCallback(
    (option: Option, index: number) => (
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
    ),
    [
      value,
      dropdownLayout.width,
      toggleMenu,
      onSelect,
      options,
      menuTestID,
      CustomDropdownItem,
    ]
  );

  const isAnchorMeasured =
    dropdownLayout.width > 0 && dropdownLayout.height > 0;

  return (
    <Menu
      mode={menuMode}
      statusBarHeight={statusBarHeight}
      visible={enable && isAnchorMeasured}
      onDismiss={handleDismiss}
      style={menuStyle}
      keyboardShouldPersistTaps={'handled'}
      anchorPosition={menuAnchorPosition}
      anchor={
        <View collapsable={false} onLayout={onLayout}>
          <Touchable
            testID={testID}
            disabled={disabled}
            onPress={async () => {
              try {
                await onOpen?.();
              } catch {}
              await new Promise<void>((resolve) =>
                requestAnimationFrame(() => resolve())
              );
              toggleMenu();
            }}
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
                style={inputStyle}
                outlineStyle={flattenedOutlineStyle}
              />
            </View>
          </Touchable>
        </View>
      }
      contentStyle={[baseContentStyle, normalizedMenuContentStyle]}
      testID={menuTestID}
    >
      {!hideMenuHeader && (
        <CustomMenuHeader
          headerStyle={headerStyle}
          headerTitle={headerTitle}
          headerTitleStyle={headerTitleStyle}
          toggleMenu={toggleMenu}
          resetMenu={resetMenu}
          value={value}
          multiSelect={false}
        />
      )}

      {isFlatList ? (
        <FlatList
          data={options}
          bounces={false}
          renderItem={({ item: option, index }) =>
            renderDropdownItem(option, index)
          }
          keyExtractor={(item) => item.value}
          style={[defaultListStyle, listContainerStyle]}
          {...flatListProps}
        />
      ) : (
        <ScrollView
          style={[defaultListStyle, listContainerStyle]}
          bounces={false}
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          {...scrollViewProps}
        >
          {options.map((option, index) => renderDropdownItem(option, index))}
        </ScrollView>
      )}
    </Menu>
  );
}

export default forwardRef(Dropdown);
