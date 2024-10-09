import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts';
import {
  CompaniesList,
  CompanyDetail,
  Dashboard,
  NotFound,
  Profile,
  ResetPassword,
  SignIn,
  SignUp
} from '../pages';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="companies" element={<CompaniesList />} />
          <Route path="company/:id" element={<CompanyDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
