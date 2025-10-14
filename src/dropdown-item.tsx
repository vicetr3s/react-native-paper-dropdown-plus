import { useMemo } from 'react';
import { Divider, Menu, useTheme } from 'react-native-paper';
import { Fragment } from 'react/jsx-runtime';
import { DropdownItemProps } from './types';

function DropdownItem(props: DropdownItemProps) {
  const {
    option,
    width,
    value,
    onSelect,
    toggleMenu,
    isLast,
    menuItemTestID,
    menuItemProps,
  } = props;
  const style = useMemo(() => ({ minWidth: width }), [width]);
  const theme = useTheme();
  const defaultTitleStyle = useMemo(
    () => ({
      color:
        value === option.value ? theme.colors.primary : theme.colors.onSurface,
      width: width,
    }),
    [option.value, theme.colors.onSurface, theme.colors.primary, value, width]
  );

  const mergedTitleStyle = useMemo(
    () => [defaultTitleStyle, menuItemProps?.titleStyle],
    [defaultTitleStyle, menuItemProps?.titleStyle]
  );

  const mergedStyle = useMemo(
    () => [style, menuItemProps?.style],
    [style, menuItemProps?.style]
  );

  const mergedContentStyle = useMemo(
    () => [style, menuItemProps?.contentStyle],
    [style, menuItemProps?.contentStyle]
  );

  const onPress = () => {
    if (option.value) {
      onSelect?.(option.value);
    }
    toggleMenu();
  };

  return (
    <Fragment>
      <Menu.Item
        style={mergedStyle}
        title={option.label}
        titleStyle={mergedTitleStyle}
        titleMaxFontSizeMultiplier={menuItemProps?.titleMaxFontSizeMultiplier}
        contentStyle={mergedContentStyle}
        containerStyle={menuItemProps?.containerStyle}
        onPress={onPress}
        testID={menuItemTestID}
      />
      {!isLast && <Divider />}
    </Fragment>
  );
}

export default DropdownItem;
