import styled from 'styled-components';
import { checkSvg } from 'src/assets/icons';

export const CheckboxLabel = styled.label`
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

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -3;
  height: 0;
  width: 0;
`;

export const CheckboxMark = styled.span<{ checked?: boolean }>`
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