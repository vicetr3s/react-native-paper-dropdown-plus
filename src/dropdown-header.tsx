import { Appbar, useTheme } from 'react-native-paper';
import { DropdownHeaderProps } from './types';
import { useMemo } from 'react';

function DropdownHeader(props: DropdownHeaderProps) {
  const {
    resetMenu,
    toggleMenu,
    value,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  } = props;
  const theme = useTheme();
  const isValueSelected = Array.isArray(value) ? value.length > 0 : !!value;
  const style = useMemo(
    () => ({
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
      height: 42,
      backgroundColor: theme.colors.surface,
    }),
    [theme.colors.surface]
  );

  const isHeaderTitleAString = typeof headerTitle === 'string';

  return (
    <Appbar.Header statusBarHeight={0} style={[style, headerStyle]}>
      {isValueSelected && <Appbar.Action icon={'reload'} onPress={resetMenu} />}
      {isHeaderTitleAString ? (
        <Appbar.Content title={headerTitle} titleStyle={headerTitleStyle} />
      ) : (
        <Appbar.Content title={headerTitle} />
      )}
      <Appbar.Action
        icon={isValueSelected ? 'check' : 'close'}
        onPress={toggleMenu}
      />
    </Appbar.Header>
  );
}

export default DropdownHeader;
