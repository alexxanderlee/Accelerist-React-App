import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { CheckboxLabel, HiddenInput, CheckboxMark } from './styled';

interface CheckboxFieldProps extends FieldRenderProps<string> {
  text?: string;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ input, text, disabled }) => {
  return (
    <CheckboxLabel>
      {text}
      <HiddenInput
        {...input}
        disabled={disabled}
      />
      <CheckboxMark checked={input.checked} />
    </CheckboxLabel>
  );
};

export default CheckboxField;
