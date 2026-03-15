import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/authSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { IngredientDetailsModal } from '../modal/ingredient-details-modal';
import { OrderInfoModal } from '../modal/order-info-modal';
import { IngredientDetails } from '../../components/ingredient-details';
import { OrderInfo } from '../../components/order-info';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        {/* Прямые маршруты для страниц */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfoModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
