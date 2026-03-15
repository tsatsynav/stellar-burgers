import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/authSlice';
import { useForm } from '../../hooks/useForm';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { values, setValues, handleChange } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user, setValues]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
