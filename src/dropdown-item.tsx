import { useMemo } from 'react';
import { useTheme, Menu, Divider } from 'react-native-paper';
import { Fragment } from 'react/jsx-runtime';
import type { DropdownItemProps } from './types';

function DropdownItem(props: DropdownItemProps) {
  const { option, width, value, onSelect, toggleMenu, isLast } = props;
  const style = useMemo(() => ({ minWidth: width }), []);
  const theme = useTheme();
  const titleStyle = {
    color:
      value === option.value ? theme.colors.primary : theme.colors.onBackground,
  };
  const onPress = () => {
    if (option.value) {
      onSelect?.(option.value);
    }
    toggleMenu();
  };

  return (
    <Fragment key={option.value}>
      <Menu.Item
        style={style}
        title={option.label}
        titleStyle={titleStyle}
        onPress={onPress}
      />
      {!isLast && <Divider />}
    </Fragment>
  );
}

export default DropdownItem;
