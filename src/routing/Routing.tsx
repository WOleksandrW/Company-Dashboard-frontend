import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useQueryCurrUser from '../hooks/useQueryCurrUser';
import { AuthLayout, MainLayout, NoAuthLayout } from '../layouts';
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
  const { data: userData } = useQueryCurrUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {userData ? (
            <Route path="" element={<AuthLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="companies" element={<CompaniesList />} />
              <Route path="companies/:id" element={<CompanyDetail />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
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
