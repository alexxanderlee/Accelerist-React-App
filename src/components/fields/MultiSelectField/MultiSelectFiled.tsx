import React from 'react';
import styled, { CSSProp, css } from 'styled-components';
import { FieldRenderProps } from 'react-final-form';
import { ChevronDownSvg, XIcon } from 'src/assets/icons';
import OptionItem from './OptionItem';
import { ISelectorOption } from 'src/interfaces';

interface MultiSelectFieldProps extends FieldRenderProps<string[]> {
  placeholder?: string;
  label?: string;
  options?: ISelectorOption[];
  customStyle?: CSSProp;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  input, placeholder, label, customStyle, options = []
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selectedOptions, setSelectedOptions] = React.useState<ISelectorOption[]>([]);
  const [optionsVisible, setOptionsVisible] = React.useState<boolean>(false);

  function checkIsOptionSelected(option: ISelectorOption) {
    return selectedOptions.some(selectedOption => selectedOption.value === option.value);
  }

  function selectOption(option: ISelectorOption) {
    if (checkIsOptionSelected(option)) {
      const options = selectedOptions.filter(selectedOption => selectedOption.value !== option.value);
      setSelectedOptions(options);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  }

  function renderSelectedOptions() {
    return selectedOptions.map(option => option.label).join('; ')
  }

  React.useEffect(() => {
    const selectedValues: string[] = selectedOptions.map(option => option.value);
    input.onChange(selectedValues);
  }, [selectedOptions]);

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const element = containerRef.current;
      const target = event.target as Node;
      if (element && !element.contains(target)) {
        setOptionsVisible(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Wrapper customStyle={customStyle} ref={containerRef}>
      {label && <Label>{label}</Label>}
      <Select
        optionsVisible={optionsVisible}
        onClick={() => setOptionsVisible(!optionsVisible)}
      >
        {selectedOptions.length > 0 ? renderSelectedOptions() : placeholder}
        {selectedOptions.length > 0 && (
          <ClearBtn onClick={() => setSelectedOptions([])}>
            <XIcon color="#122434" size={22} />
          </ClearBtn>
        )}
        <ChevronWrapper optionsVisible={optionsVisible}>
          <ChevronDownSvg />
        </ChevronWrapper>
      </Select>
      {optionsVisible && (
        <OptionsList>
          {options.map(option => {
            const isSelected = checkIsOptionSelected(option);
            const onClick = () => selectOption(option);
            return (
              <OptionItem
                key={option.value}
                item={option}
                isSelected={isSelected}
                onClick={onClick}
              />
            )
          })}
        </OptionsList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ customStyle?: CSSProp }>`
  position: relative;
  ${props => props.customStyle}
`;

const Select = styled.div<{ optionsVisible?: boolean }>`
  position: relative;
  width: 100%;
  padding: 10px 65px 10px 16px;
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #737373;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${props => props.optionsVisible && css`
    border-bottom-color: #FFFFFF;
    border-radius: 8px 8px 0px 0px;
  `}
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

const ChevronWrapper = styled.div<{ optionsVisible?: boolean }>`
  position: absolute;
  top: 19px;
  right: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  ${props => props.optionsVisible && css`
    transform: rotate(180deg);
  `}
`;

const ClearBtn = styled.div`
  position: absolute;
  top: 11px;
  right: 40px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.5;
  }
`;

const OptionsList = styled.div`
  width: 100%;
  max-height: 181px;
  position: absolute;
  left: 0;
  top: 100%;
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-top: none;
  border-radius: 0px 0px 8px 8px;
  overflow-y: scroll;
  z-index: 9;
`;

export default MultiSelectField;
