import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { AnyAction } from '@reduxjs/toolkit';
import { Button } from 'src/components/ui';
import { InputField } from 'src/components/fields';
import validators, { composeValidators } from 'src/utils/validation';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { userActions, userSelectors } from 'src/state/features/user';
import { ErrorMessageBox } from 'src/components/ui';

interface FormValues {
  email: string;
}

const SendMail: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoading = useAppSelector(userSelectors.isLoading);
  const error = useAppSelector(userSelectors.getError);

  function onSubmit(values: FormValues) {
    dispatch(userActions.sendMail(values.email))
      .then((action: AnyAction) => {
        if (action.type.endsWith('/fulfilled')) {
          history.push({
            pathname: '/resend_link',
            state: { email: values.email },
          });
        }
      });
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Title>Password Reset</Title>
          <Descr>Enter your email to receive instructions on how to reset your password.</Descr>
          {error && (
            <ErrorMessageBox
              customStyle={'margin-bottom: 15px'}
              error={error.error}
              message={error.message}
            />
          )}
          <Field
            name="email"
            label="Email"
            placeholder="Enter email"
            component={InputField}
            validate={composeValidators(validators.required, validators.validEmail)}
          />
          <ButtonWrapper>
            <Button
              text="Reset"
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

export default SendMail;
