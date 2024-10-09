import instance from './instance';

import authModule from './auth';
import usersModule from './users';
import companiesModule from './companies';

export default {
  auth: authModule(instance),
  users: usersModule(instance),
  companies: companiesModule(instance)
};
