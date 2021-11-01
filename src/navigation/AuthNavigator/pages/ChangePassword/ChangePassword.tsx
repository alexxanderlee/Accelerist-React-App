import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { AnyAction } from '@reduxjs/toolkit';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { Button } from 'src/components/ui';
import { PasswordInputField } from 'src/components/fields';
import validators, { composeValidators } from 'src/utils/validation';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { userActions, userSelectors } from 'src/state/features/user';

const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useAppSelector(userSelectors.isLoading);
  const resetToken = queryString.parse(history.location.search)?.passwordResetToken;

  function onSubmit(values: { password: string }) {
    const payload = {
      password: values.password,
      resetToken,
    };
    dispatch(userActions.changePassword(payload))
      .then((action: AnyAction) => {
        if (action.type.endsWith('/fulfilled')) {
          history.push('/login');
        }
      });
  }
  
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Title>New Password</Title>
          <Descr>Сome up with a new password.</Descr>
          <Field
            name="password"
            label="Password"
            placeholder="Enter new password"
            component={PasswordInputField}
            validate={composeValidators(validators.required, validators.passwordLength)}
          />
          <ButtonWrapper>
            <Button
              text="Done"
              disabled={submitting || pristine || invalid}
              loading={isLoading}
            />
          </ButtonWrapper>
        </form>
      )}
    />
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

export default ChangePassword;
