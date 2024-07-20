import { TextInput } from 'react-native-paper';
import { DropdownInputProps } from './types';

function DropdownInput(props: DropdownInputProps) {
  const { placeholder, label, rightIcon, selectedLabel, mode, disabled } =
    props;

  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      value={selectedLabel}
      right={rightIcon}
      mode={mode}
      editable={false}
      disabled={disabled}
    />
  );
}

export default DropdownInput;
