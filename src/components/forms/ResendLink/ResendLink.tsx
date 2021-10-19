import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ButtonWithTimeout } from 'src/components/ui';
import { useAppDispatch } from 'src/state/hooks';
import { userActions } from 'src/state/features/user';

interface locationState {
  email: string;
}

const ResendLink: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<locationState>();
  const email = history.location.state?.email;

  function onClick() {
    if (email) {
      dispatch(userActions.sendMail(email));
    }
  }

  return (
    <>
      <Title>Password Reset</Title>
      <Descr>A link was sent to your email to confirm password reset and create a new one.</Descr>
      <ButtonWrapper>
        <ButtonWithTimeout
          text="Resend"
          type="button"
          disabled={!email}
          onClick={onClick}
          timeout={60000}
          timeoutOnMount={false}
        />
      </ButtonWrapper>
    </>
  );
};

const Title = styled.h1`
  margin: 0;
  margin-bottom: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
  text-align: left;
`;

const Descr = styled.div`
  margin-bottom: 24px;
  max-width: 338px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

export default ResendLink;
