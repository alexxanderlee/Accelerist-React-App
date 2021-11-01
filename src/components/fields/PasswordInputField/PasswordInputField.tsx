import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled, { CSSProp } from 'styled-components';
import { TextInput } from 'src/components/ui';
import { eyeSvg, eyeOffSvg } from 'src/assets/icons';

interface PasswordInputFieldProps extends FieldRenderProps<string> {
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  customStyle?: CSSProp;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({ input, meta, placeholder, label, disabled, customStyle }) => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  
  return (
    <InputWrapper customStyle={customStyle}>
      {label && <Label>{label}</Label>}
      <Wrapper>
        <TextInput
          {...input}
          type={passwordVisible ? 'text' : 'password'}
          customStyle={'padding-right: 40px'}
          error={meta.error && meta.touched}
          disabled={disabled}
          placeholder={placeholder}
        />
        <Icon
          src={passwordVisible ? eyeSvg : eyeOffSvg}
          onClick={() => setPasswordVisible(!passwordVisible)}
        />
      </Wrapper>
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

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  top: 12px;
  right: 15px;
  cursor: pointer;
  opacity: 0.5;
`;

export default PasswordInputField;