import React from 'react';
import { Form, Field } from 'react-final-form';
import { Title, Tabs, TabLink, Row, StyledLink } from './styled';
import { InputField, Button, CheckboxField } from 'src/components/ui';
import validators, { composeValidators } from 'src/utils/validation';

interface LoginFormProps {
}

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Title>Welcome to Accelerist</Title>
          <Tabs>
            <TabLink to="/signup">Register</TabLink>
            <TabLink data-active to="/login">Login</TabLink>
          </Tabs>
          <Field
            name="email"
            inputName="Email"
            placeholder="Enter email"
            type="text"
            component={InputField}
            validate={composeValidators(validators.required, validators.email)}
          />
          <Field
            name="password"
            inputName="Password"
            placeholder="Enter password"
            type={passwordVisible ? 'text' : 'password'}
            isPasswordField={true}
            onClick={() => setPasswordVisible(!passwordVisible)}
            component={InputField}
            validate={validators.required}
          />
          <Row>
            <Field
              name="remember"
              text="Remember"
              type="checkbox"
              component={CheckboxField}
            />
            <StyledLink to="/reset">Forgot password?</StyledLink>
          </Row>
          <Button
            text="Login"
            disabled={submitting || pristine}
          />
        </form>
      )}
    />
  );
};

export default LoginForm;
