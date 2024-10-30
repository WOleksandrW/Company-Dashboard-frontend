import { Navigate, Outlet } from 'react-router-dom';

interface IProps {
  isAllowed: boolean;
  children?: React.ReactNode;
  redirectPath?: string;
}

function ProtectedRoute({ isAllowed, redirectPath = '/', children }: IProps) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
