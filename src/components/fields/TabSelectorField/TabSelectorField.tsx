import React from 'react';
import styled, { CSSProp } from 'styled-components';
import { FieldRenderProps } from 'react-final-form';
import { ISelectorOption } from 'src/interfaces';

interface TabSelectorFieldProps extends FieldRenderProps<string> {
  label?: string;
  options: ISelectorOption[];
  defaultOptionIndex: number;
  customStyle?: CSSProp;
}

const TabSelectorField: React.FC<TabSelectorFieldProps> = ({ input, label, options, defaultOptionIndex, customStyle }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number>(defaultOptionIndex ?? 0);

  React.useEffect(() => {
    const value = options[selectedOptionIndex].value;
    input.onChange(value);
  }, [selectedOptionIndex]);

  return (
    <Wrapper customStyle={customStyle}>
      {label && <Label>{label}</Label>}
      <TabBar>
        {options && options.map((option, index) => (
          <Tab
            key={option.label}
            selected={index === selectedOptionIndex}
            onClick={() => setSelectedOptionIndex(index)}
          >{option.label}</Tab>
        ))}
      </TabBar>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ customStyle?: CSSProp }>`
  position: relative;
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

const TabBar = styled.div`
  width: 100%;
  padding: 2px;
  background-color: #F8F8F8;
  border-radius: 6px;
  display: flex;
`;

const Tab = styled.div<{ selected?: boolean }>`
  flex: 1;
  padding: 9px;
  background-color: ${props => props.selected ? '#D4F3FF' : 'transparent'};
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:not(:last-child) {
    margin-right: 1px
  }

  &:hover {
    background-color: #bfedff;
  }
`;

export default TabSelectorField;
