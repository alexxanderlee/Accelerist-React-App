import React from 'react';
import { Form, Field } from 'react-final-form';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui';
import { InputField, PasswordInputField } from 'src/components/fields';
import validators, { composeValidators } from 'src/utils/validation';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { userActions, userSelectors } from 'src/state/features/user';
import { ErrorMessageBox } from 'src/components/ui';

interface FormValues {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(userSelectors.isLoading);
  const error = useAppSelector(userSelectors.getError);

  function onSubmit(values: FormValues) {
    const payload = {
      email: values.email,
      password: values.password,
    };
    dispatch(userActions.signupUser(payload));
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Title>Welcome to Accelerist</Title>
          <Tabs>
            <TabLink data-active to="/signup" onClick={() => dispatch(userActions.clearError())}>
              Register
            </TabLink>
            <TabLink to="/login" onClick={() => dispatch(userActions.clearError())}>
              Login
            </TabLink>
          </Tabs>
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
            customStyle={'margin-bottom: 24px'}
            component={InputField}
            validate={composeValidators(validators.required, validators.validEmail)}
          />
          <Field
            name="password"
            label="Password"
            placeholder="Enter password"
            customStyle={'margin-bottom: 24px'}
            component={PasswordInputField}
            validate={composeValidators(validators.required, validators.passwordLength)}
          />
          <Text>I agree that by clicking <Bold>“Registration”</Bold> I accept the <Anchor href="#">Terms Of Service</Anchor> and <Anchor href="#">Privacy Policy</Anchor></Text>
          <Button
            text="Registration"
            disabled={submitting || pristine || invalid}
            loading={isLoading}
          />
        </form>
      )}
    />
  );
};

const Title = styled.h1`
  margin: 0;
  margin-bottom: 24px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
  text-align: center;
`;

const Tabs = styled.div`
  margin-bottom: 24px;
  padding: 2px 3px;
  background-color: #F8F8F8;
  border-radius: 6px;
  display: flex;
`;

const TabLink = styled(Link)<{ 'data-active'?: boolean }>`
  flex: 1;
  padding: 9px;
  text-align: center;
  text-decoration: none;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${props => props['data-active'] && css`
    background-color: #CAF0FF;
    border-radius: 6px;
    color: #122434;
  `}
`;

const Text = styled.p`
  margin-bottom: 20px;
  max-width: 360px;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const Bold = styled.b`
  font-weight: 500;
  color: #122434;
`;

const Anchor = styled.a`
  text-decoration: none;
  color: #122434;

  &:hover {
    text-decoration: underline;
  }
`;


export default RegisterForm;
