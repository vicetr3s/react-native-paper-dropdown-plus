import { useCallback, useMemo, Fragment } from 'react';
import { useTheme, Menu, Divider, Checkbox } from 'react-native-paper';
import { View } from 'react-native';
import type { MultiSelectDropdownItemProps } from './types';

function MultiSelectDropdownItem(props: MultiSelectDropdownItemProps) {
  const { option, width, value = [], onSelect, isLast } = props;
  const style = useMemo(() => ({ minWidth: width }), []);

  const isActive = useCallback(
    (currentValue: any) => {
      return value.indexOf(currentValue) !== -1;
    },
    [value]
  );

  const theme = useTheme();
  const titleStyle = {
    color: isActive(option.value)
      ? theme.colors.primary
      : theme.colors.onBackground,
  };
  const onPress = () => {
    if (option.value) {
      const valueIndex = value.indexOf(option.value);
      if (valueIndex === -1) {
        onSelect?.([...value, option.value]);
      } else {
        onSelect?.(
          [...value].filter((currentValue) => currentValue !== option.value)
        );
      }
    }
  };

  return (
    <Fragment key={option.value}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}
      >
        <View style={{ flex: 1 }}>
          <Menu.Item
            style={style}
            title={option.label}
            titleStyle={titleStyle}
            onPress={onPress}
          />
        </View>
        <Checkbox.Android
          status={isActive(option.value) ? 'checked' : 'unchecked'}
          onPress={onPress}
        />
      </View>

      {!isLast && <Divider />}
    </Fragment>
  );
}

export default MultiSelectDropdownItem;
