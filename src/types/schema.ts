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

const titleCompany = yup
  .string()
  .required('Title is required')
  .min(4, 'Title must be at least 4 characters long');

const serviceCompany = yup
  .string()
  .required('Service is required')
  .min(4, 'Service must be at least 4 characters long');

const addressCompany = yup
  .string()
  .required('Address is required')
  .min(4, 'Address must be at least 4 characters long');

const capitalCompany = yup
  .number()
  .required('Capital is required')
  .min(0, 'Capital must be bigger than 0');

const file = yup.mixed().nullable();

export const schemaSignUp = yup.object().shape({
  username,
  email,
  password,
  confirm: confirmPassword
});

export const schemaChangePassword = yup.object().shape({
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

export const schemaUpdateCompany = yup.object().shape({
  file,
  title: titleCompany,
  service: serviceCompany,
  address: addressCompany,
  capital: capitalCompany
});

export const schemaUpdateUser = yup.object().shape({
  username,
  email
});

export const schemaUpdateUserPassword = yup.object().shape({
  oldPassword: password,
  password,
  confirm: confirmPassword
});
