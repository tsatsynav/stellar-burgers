import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, setValues } = useForm({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const setEmail: React.Dispatch<React.SetStateAction<string>> = (value) => {
    if (typeof value === 'function') {
      setValues((prev) => ({ ...prev, email: value(prev.email) }));
    } else {
      setValues((prev) => ({ ...prev, email: value }));
    }
  };

  const setName: React.Dispatch<React.SetStateAction<string>> = (value) => {
    if (typeof value === 'function') {
      setValues((prev) => ({ ...prev, name: value(prev.name) }));
    } else {
      setValues((prev) => ({ ...prev, name: value }));
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
    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password
      })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message || 'Ошибка регистрации');
      });
  };

  return (
    <RegisterUI
      errorText={error}
      email={values.email}
      userName={values.name}
      password={values.password}
      setEmail={setEmail}
      setUserName={setName}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
