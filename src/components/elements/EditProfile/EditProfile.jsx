import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../store/slices/editProfileSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './edit-profile.css';
import { useEffect } from 'react';
import { initAuth } from '../../../store/slices/authSlice';

// Все поля опциональны, но если заполнены - валидируются
const schema = yup.object().shape({
  username: yup.string().min(3, 'Имя пользователя должно быть не меньше 3-х символов').max(20, 'Максимум 20 символов').notRequired(),
  email: yup.string().email('Некорректный email').notRequired(),
  password: yup
    .string()
    .transform(v => v === '' ? undefined : v)
    .min(6, 'Не меньше 6 символов')
    .max(40, 'Не больше 40 символов')
    .notRequired(),
  image: yup.string().url('Некорректный URL').notRequired(),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { isLoading, error } = useSelector(state => state.editProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      image: user?.image || '',
    },
  });

  useEffect(() => {
    reset({
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      image: user?.image || '',
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    // Удаляем пустые поля, чтобы не отправлять их
    const payload = {};
    Object.keys(data).forEach(key => {
      if (data[key] && data[key].trim() !== '') payload[key] = data[key];
    });
    if (Object.keys(payload).length === 0) return; // ничего не менять
    const res = await dispatch(updateUserProfile(payload));
    if (!res.error) {
      dispatch(initAuth()); // обновить данные пользователя в auth
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='form__title'>Edit Profile</h2>
      <label className='form__label' htmlFor="username">
        <span>Username</span>
        <input
          {...register('username')}
          className='form__input'
          name='username'
          type="text"
          placeholder='John Doe'
        />
        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
      </label>

      <label className='form__label' htmlFor="email">
        <span>Email address</span>
        <input
          {...register('email')}
          className='form__input'
          name='email'
          type="email"
          placeholder='john@example.com'
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </label>

      <label className='form__label' htmlFor="password">
        <span>New password</span>
        <input
          {...register('password')}
          className='form__input'
          name='password'
          type="password"
          placeholder='New password'
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </label>

      <label className='form__label' htmlFor="image">
        <span>Avatar image (url)</span>
        <input
          {...register('image')}
          className='form__input'
          name='image'
          type="text"
          placeholder='Avatar image'
        />
        {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
      </label>

      {error && <ErrorMessage>{typeof error === 'string' ? error : 'Ошибка обновления профиля'}</ErrorMessage>}

      <button className='form__button' type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

export default EditProfile;