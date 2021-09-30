import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InputWrapper, Input, Label, ErrorText, InputBtn } from './styled';

interface InputFiledProps extends FieldRenderProps<string> {
  placeholder?: string;
  inputName?: string;
  disabled?: boolean;
  isPasswordField?: boolean;
  onClick?: () => void
}

const InputFiled: React.FC<InputFiledProps> = ({ input, meta, placeholder, inputName, disabled = false, isPasswordField = false, onClick }) => {
  return (
    <InputWrapper>
      {inputName && <Label>{inputName}</Label>}
      <Input
        {...input}
        error={meta.error && meta.touched}
        disabled={disabled}
        placeholder={placeholder}
        isPasswordField={isPasswordField}
      />
      {isPasswordField && onClick && (
        <InputBtn onClick={onClick} passwordHidden={input.type === 'password'} />
      )}
      {meta.error && meta.touched && <ErrorText>{meta.error}</ErrorText>}
    </InputWrapper>
  );
};

export default InputFiled;
