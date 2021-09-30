import React from 'react';
import { Form, Field } from 'react-final-form';
import { Title, Tabs, TabLink, Text, Bold, Anchor } from './styled';
import { InputField, Button } from 'src/components/ui';
import validators, { composeValidators } from 'src/utils/validation';

interface RegisterFormProps {
}

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
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
            <TabLink data-active to="/signup">Register</TabLink>
            <TabLink to="/login">Login</TabLink>
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
            validate={composeValidators(validators.required, validators.password)}
          />
          <Text>I agree that by clicking <Bold>“Registration”</Bold> I accept the <Anchor href="#">Terms Of Service</Anchor> and <Anchor href="#">Privacy Policy</Anchor></Text>
          <Button
            text="Login"
            disabled={submitting || pristine}
          />
        </form>
      )}
    />
  );
};

export default RegisterForm;
