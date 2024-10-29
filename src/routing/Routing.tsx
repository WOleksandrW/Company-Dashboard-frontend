import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useQueryCurrUser from '@root/hooks/useQueryCurrUser';
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

function Routing() {
  const { data: userData } = useQueryCurrUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {userData ? (
            <Route path="" element={<AuthLayout />}>
              <Route path={ERouterPaths.HOME} element={<Dashboard />} />
              <Route path={ERouterPaths.COMPANIES} element={<CompaniesList />} />
              <Route path={`${ERouterPaths.COMPANIES}/:id`} element={<CompanyDetail />} />
              <Route path={`${ERouterPaths.PROFILE}/:id`} element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Navigate to={ERouterPaths.SIGNIN} replace />} />
              <Route path="" element={<NoAuthLayout />}>
                <Route path={ERouterPaths.RESET} element={<ResetPassword />} />
                <Route path={ERouterPaths.SIGNIN} element={<SignIn />} />
                <Route path={ERouterPaths.SIGNUP} element={<SignUp />} />
                <Route path="*" element={<Navigate to={ERouterPaths.SIGNIN} replace />} />
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
