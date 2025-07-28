import { ForwardRefExoticComponent, ReactElement, RefAttributes } from 'react';
import {
  DimensionValue,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PressableProps,
  ScrollViewProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TextInputLabelProp } from 'react-native-paper/lib/typescript/components/TextInput/types';
import { TextInputProps } from 'react-native-paper';

export type DropdownInputProps = {
  placeholder?: string;
  label?: TextInputLabelProp;
  rightIcon: ReactElement;
  selectedLabel?: string;
  mode?: 'flat' | 'outlined';
  disabled?: boolean;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
};

export type Option = {
  label: string;
  value: string;
};

export type DropdownProps = {
  testID?: string;
  menuTestID?: string;
  value?: string;
  options: Option[];
  menuUpIcon?: ReactElement;
  menuDownIcon?: ReactElement;
  maxMenuHeight?: number;
  menuContentStyle?: ViewStyle;
  listContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  inputOutlineStyle?: StyleProp<ViewStyle>;
  headerTitle?: ReactElement | string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  hideMenuHeader?: boolean;
  statusBarHeight?: number;
  menuAnchorPosition?: 'top' | 'bottom';
  menuMode?: 'flat' | 'elevated';
  Touchable?: ForwardRefExoticComponent<PressableProps & RefAttributes<View>>;
  onSelect?: (value?: string) => void;
  CustomMenuHeader?: (props: DropdownHeaderProps) => ReactElement;
  CustomDropdownItem?: (props: DropdownItemProps) => ReactElement;
  CustomDropdownInput?: (props: DropdownInputProps) => ReactElement;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
} & Pick<
  TextInputProps,
  'placeholder' | 'label' | 'mode' | 'disabled' | 'error'
> &
  ListRenderProps;

export type MultiSelectDropdownProps = {
  testID?: string;
  menuTestID?: string;
  value: string[];
  options: Option[];
  menuUpIcon?: ReactElement;
  menuDownIcon?: ReactElement;
  maxMenuHeight?: number;
  menuContentStyle?: ViewStyle;
  listContainerStyle?: StyleProp<ViewStyle>;
  hideMenuHeader?: boolean;
  statusBarHeight?: number;
  menuAnchorPosition?: 'top' | 'bottom';
  menuMode?: 'flat' | 'elevated';
  inputStyle?: StyleProp<ViewStyle>;
  inputOutlineStyle?: StyleProp<ViewStyle>;
  headerTitle?: ReactElement | string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  Touchable?: ForwardRefExoticComponent<PressableProps & RefAttributes<View>>;
  onSelect?: (value: string[]) => void;
  CustomMenuHeader?: (props: DropdownHeaderProps) => ReactElement;
  CustomMultiSelectDropdownItem?: (
    props: MultiSelectDropdownItemProps
  ) => ReactElement;
  CustomMultiSelectDropdownInput?: (props: DropdownInputProps) => ReactElement;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
} & Pick<
  TextInputProps,
  'placeholder' | 'label' | 'mode' | 'disabled' | 'error'
> &
  ListRenderProps;

export type DropdownItemProps = {
  option: Option;
  value?: string;
  onSelect?: (value: string) => void;
  width: DimensionValue;
  toggleMenu: () => void;
  isLast: boolean;
  menuItemTestID?: string;
};

export type MultiSelectDropdownItemProps = {
  option: Option;
  value?: string[];
  onSelect?: (value: string[]) => void;
  width: DimensionValue;
  isLast: boolean;
  menuItemTestID?: string;
};

export type DropdownHeaderProps = {
  value?: string | string[];
  headerTitle?: ReactElement | string;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  multiSelect: boolean;
  toggleMenu: () => void;
  resetMenu: () => void;
};

export type DropdownRef = {
  blur: () => void;
  focus: () => void;
};

export type ListRenderProps =
  | {
      isFlatList: true;
      flatListProps?: Omit<
        FlatListProps<Option>,
        'data' | 'renderItem' | 'keyExtractor'
      >;
      scrollViewProps?: never;
    }
  | {
      isFlatList?: false;
      flatListProps?: never;
      scrollViewProps?: ScrollViewProps;
    };
