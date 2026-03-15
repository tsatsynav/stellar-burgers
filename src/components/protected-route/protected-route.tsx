import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/slices/authSlice';
import { Preloader } from '../../components/ui/preloader';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, user]);

  if (loading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
};
