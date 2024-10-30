import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useQueryCurrentUser from '@root/hooks/useQueryCurrentUser';
import { AuthLayout, MainLayout, NoAuthLayout } from '@root/layouts';
import {
  CompaniesList,
  CompanyDetail,
  Dashboard,
  NotFound,
  Profile,
  ResetPassword,
  SignIn,
  SignUp
} from '@root/pages';
import { ERouterPaths } from '@root/enums/routerPaths.enum';
import ProtectedRoute from './ProtectedRoute';

function Routing() {
  const { data: userData } = useQueryCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Protected Routes */}
          <Route
            element={<ProtectedRoute isAllowed={!!userData} redirectPath={ERouterPaths.SIGNIN} />}>
            <Route element={<AuthLayout />}>
              <Route path={ERouterPaths.HOME} element={<Dashboard />} />
              <Route path={ERouterPaths.COMPANIES} element={<CompaniesList />} />
              <Route path={`${ERouterPaths.COMPANIES}/:id`} element={<CompanyDetail />} />
              <Route path={`${ERouterPaths.PROFILE}/:id`} element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route element={<NoAuthLayout />}>
            <Route path={ERouterPaths.RESET} element={<ResetPassword />} />
            <Route path={ERouterPaths.SIGNIN} element={<SignIn />} />
            <Route path={ERouterPaths.SIGNUP} element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
