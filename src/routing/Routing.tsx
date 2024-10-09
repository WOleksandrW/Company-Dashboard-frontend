import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout, NoAuthLayout } from '../layouts';
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
  const [isAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {isAuth ? (
            <>
              <Route path="" element={<Dashboard />} />
              <Route path="companies" element={<CompaniesList />} />
              <Route path="company/:id" element={<CompanyDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="sign-in" replace />} />
              <Route path="" element={<NoAuthLayout />}>
                <Route path="reset" element={<ResetPassword />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="*" element={<Navigate to="sign-in" replace />} />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
