import { FieldValidator } from 'final-form';

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validators = {
  required: (value: string) => (typeof value !== 'string') ? 'Required' : (value.trim() ? undefined : 'Required'),

  validEmail: (value: string) => value.match(emailPattern) ? undefined : 'Incorrect email format',

  passwordLength: (value: string) => (value.length < 6) ? 'Minimum password length is 6 symbols' : undefined,
};

export const composeValidators = (...validators: FieldValidator<any>[]) => (value: any) => 
  validators.reduce((error, validator) => error || validator(value, {}), undefined);

export default validators;