import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import { checkSvg } from 'src/assets/icons';

interface CheckboxFieldProps extends FieldRenderProps<string> {
  label?: string;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ input, label, disabled }) => {
  return (
    <CheckboxLabel>
      {label}
      <HiddenInput {...input} disabled={disabled} />
      <CheckboxMark checked={input.checked} />
    </CheckboxLabel>
  );
};

const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 31px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -3;
  height: 0;
  width: 0;
`;

const CheckboxMark = styled.span<{ checked?: boolean }>`
  position: absolute;
  top: -1px;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: ${props => props.checked ? '#CAF0FF' : '#FFFFFF'};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.checked ? '#CAF0FF' : '#E8E8E8'};
  border-radius: 3px;

  &::after {
    content: ' ';
    display: ${props => props.checked ? 'block' : 'none'};
    background-image: url(${checkSvg});
    position: absolute;
    left: 2px;
    top: 4px;
    width: 15px;
    height: 11px;
  }
`;

export default CheckboxField;
