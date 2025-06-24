import React, { useEffect } from 'react';
import './authorization.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fetchLogin, clearAuthError } from '../../../../store/slices/authSlice';

const schema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Email обязателен'),
  password: yup.string().required('Пароль обязателен'),
});

const Authorization = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
      reset();
    }
  }, [isAuthenticated, history, reset]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(fetchLogin({ email: data.email, password: data.password }));
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h2 className='form__title'>Sign in</h2>
      <label className='form__label' htmlFor="email">
        <span>Email address</span>
        <input
          className={`form__input${errors.email ? ' form__input-danger' : ''}`}
          name='email'
          type="email"
          placeholder='Email address'
          {...register('email')}
        />
        {errors.email && <span className="form__input-danger">{errors.email.message}</span>}
      </label>
      <label className='form__label' htmlFor="password">
        <span>Password</span>
        <input
          className={`form__input${errors.password ? ' form__input-danger' : ''}`}
          name='password'
          type="password"
          placeholder='Password'
          {...register('password')}
        />
        {errors.password && <span className="form__input-danger">{errors.password.message}</span>}
      </label>
      {error && <div className="form__input-danger" style={{textAlign: 'center'}}>{typeof error === 'string' ? error : 'Ошибка авторизации'}</div>}
      <button className='form__button' type="submit" disabled={loading}>
        {loading ? 'Вход...' : 'Login'}
      </button>
      <span className='form__bottom-text'>Don&apos;t have an account?  <span><Link to="/registration">Sign Up.</Link></span></span>
    </form>
  );
}

export default Authorization;