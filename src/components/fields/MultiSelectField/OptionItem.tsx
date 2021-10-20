import React from 'react';
import styled from 'styled-components';
import { checkSvg } from 'src/assets/icons';
import { ISelectorOption } from 'src/interfaces';

interface OptionItemProps {
  item: ISelectorOption;
  isSelected: boolean;
  onClick?: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ item, isSelected, onClick }) => {
  return (
    <Item onClick={onClick}>
      {item.label}
      <Checkbox checked={isSelected} />
    </Item>
  );
};

const Item = styled.div`
  position: relative;
  padding: 11px 40px 11px 16px ;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #D5F3FF;
  }
`;

const Checkbox = styled.div<{ checked?: boolean }>`
  position: absolute;
  right: 18px;
  top: 12px;
  height: 20px;
  width: 20px;
  border: 1px solid #BFBFBF;
  border-radius: 2px;

  &::after {
    content: ' ';
    display: ${props => props.checked ? 'block' : 'none'};
    position: absolute;
    top: 3px;
    left: 2px;
    background-image: url(${checkSvg});
    width: 15px;
    height: 11px;
  }
`;

export default OptionItem;
