import * as yup from 'yup';
import { emailRegexp, passwordRegexp, titleRegexp, usernameRegexp } from '@root/constants/regexps';

const username = yup
  .string()
  .trim()
  .required('Username is required')
  .min(3, 'Username must be at least 3 characters long')
  .max(20, 'Username must not exceed 20 characters')
  .matches(usernameRegexp, 'Username can only contain letters, numbers, and underscores');

const email = yup
  .string()
  .required('Email is required')
  .max(254, 'Email must not exceed 254 characters.')
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
  .min(3, 'Title must be at least 3 characters long')
  .max(30, 'Title must not exceed 30 characters')
  .matches(titleRegexp, 'Title can only contain letters, numbers, and spaces');

const serviceCompany = yup
  .string()
  .required('Service is required')
  .min(4, 'Service must be at least 4 characters long')
  .max(30, 'Service must not exceed 30 characters');

const addressCompany = yup
  .string()
  .required('Address is required')
  .max(100, 'Address must not exceed 100 characters');

const capitalCompany = yup
  .number()
  .required('Capital is required')
  .min(1, 'Capital must be bigger than 0');

const file = yup.mixed().nullable();

const userSchema = yup.object().shape({
  username,
  email
});

const passwordSchema = yup.object({
  password,
  confirm: confirmPassword
});

export const schemaSignUp = userSchema.concat(passwordSchema);

export const schemaSignIn = yup.object().shape({
  email,
  password
});

export const schemaResetPassword = yup
  .object()
  .shape({
    email
  })
  .concat(passwordSchema);

export const schemaUpdateUser = yup
  .object()
  .shape({
    file: file.optional()
  })
  .concat(userSchema);

export const schemaChangePassword = yup
  .object()
  .shape({
    oldPassword: password.optional()
  })
  .concat(passwordSchema);

export const schemaCompany = yup.object().shape({
  file,
  title: titleCompany,
  service: serviceCompany,
  address: addressCompany,
  capital: capitalCompany
});
