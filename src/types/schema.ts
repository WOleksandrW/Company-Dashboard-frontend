import * as yup from 'yup';
import { emailRegexp, passwordRegexp } from '../constants/regexps';

const username = yup
  .string()
  .trim()
  .required('Username is required')
  .min(2, 'Username must be at least 2 characters long');

const email = yup
  .string()
  .required('Email is required')
  .matches(emailRegexp, 'Invalid email address');

const password = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .max(20, 'Password must be less than 20 characters')
  .matches(
    passwordRegexp,
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  );

const confirmPassword = yup
  .string()
  .required('Please confirm your password')
  .oneOf([yup.ref('password')], 'Passwords must match');

export const schemaSignUp = yup.object().shape({
  username,
  email,
  password,
  confirm: confirmPassword
});

export const schemaSignIn = yup.object().shape({
  email,
  password
});

export const schemaResetPassword = yup.object().shape({
  email,
  password,
  confirm: confirmPassword
});
