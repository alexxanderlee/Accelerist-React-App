import React from 'react';
import styled, { CSSProp } from 'styled-components';

interface ErrorMessageBoxProps {
  error?: string;
  message?: string;
  customStyle?: CSSProp;
}

const ErrorMessageBox: React.FC<ErrorMessageBoxProps> = ({ error, message, customStyle }) => {
  return (
    <Container customStyle={customStyle}>
      <Title>{error}</Title>
      {message && <Descr>{message}</Descr>}
    </Container>
  );
};

const Container = styled.div<{ customStyle?: CSSProp }>`
  padding: 12px 16px;
  background-color: #FFF2F2;
  border-radius: 6px;

  ${props => props.customStyle}
`;

const Title = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #F05658;
`;

const Descr = styled.div`
  margin-top: 3px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #F05658;
`;

export default ErrorMessageBox;
