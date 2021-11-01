import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled, { CSSProp } from 'styled-components';
import { TextInput } from 'src/components/ui';

interface InputFiledProps extends FieldRenderProps<string> {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  customStyle?: CSSProp;
}

const InputFiled: React.FC<InputFiledProps> = ({ input, meta, placeholder, label, disabled, customStyle }) => {
  return (
    <InputWrapper customStyle={customStyle}>
      {label && <Label>{label}</Label>}
      <TextInput
        {...input}
        error={meta.error && meta.touched}
        disabled={disabled}
        placeholder={placeholder}
      />
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </InputWrapper>
  );
};

export const InputWrapper = styled.div<{ customStyle?: CSSProp }>`
  ${props => props.customStyle}
`;

const Label = styled.label`
  margin: 0;
  margin-bottom: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const Error = styled.p`
  position: absolute;
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #F05658;
`;

export default InputFiled;
