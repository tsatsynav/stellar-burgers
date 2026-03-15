import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, setValues } = useForm({ email: '', password: '' });
  const [error, setError] = useState('');

  const setEmail: React.Dispatch<React.SetStateAction<string>> = (value) => {
    if (typeof value === 'function') {
      setValues((prev) => ({ ...prev, email: value(prev.email) }));
    } else {
      setValues((prev) => ({ ...prev, email: value }));
    }
  };

  const setPassword: React.Dispatch<React.SetStateAction<string>> = (value) => {
    if (typeof value === 'function') {
      setValues((prev) => ({ ...prev, password: value(prev.password) }));
    } else {
      setValues((prev) => ({ ...prev, password: value }));
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    dispatch(loginUser({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message || 'Ошибка входа');
      });
  };

  return (
    <LoginUI
      errorText={error}
      email={values.email}
      setEmail={setEmail}
      password={values.password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
