import React from 'react';
import { Form, Field } from 'react-final-form';
import { Title, Descr, ButtonWrapper } from './styled';
import { InputField, Button } from 'src/components/ui';
import validators, { composeValidators } from 'src/utils/validation';

interface ResetPasswordProps {
}

interface FormValues {
  email: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Title>Password Reset</Title>
          <Descr>Enter your email to receive instructions on how to reset your password.</Descr>
          <Field
            name="email"
            inputName="Email"
            placeholder="Enter email"
            type="text"
            component={InputField}
            validate={composeValidators(validators.required, validators.email)}
          />
          <ButtonWrapper>
            <Button
              text="Reset"
              disabled={submitting || pristine}
            />
          </ButtonWrapper>
        </form>
      )}
    />
  );
};

export default ResetPassword;
