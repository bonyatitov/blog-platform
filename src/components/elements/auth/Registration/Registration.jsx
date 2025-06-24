import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schemes/registrationSchema';
import { 
  setFieldError, 
  clearFieldError, 
  fetchRegistration,
  resetRegistrationState
} from '../../../../store/slices/registrationSlice';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader';
import AlertComponent from '../../AlertComponent';
import './registration.css';

const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, alert } = useSelector((state) => state.registration);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      dispatch(resetRegistrationState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (alert === 'success') {
      const timer = setTimeout(() => {
        history.push('/authorization');
        reset();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [alert, history, reset]);

  const onSubmit = (data) => {
    dispatch(
      fetchRegistration({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    );
  };

  const handleInputChange = (fieldName) => () => {
    if (errors[fieldName]?.message) {
      dispatch(setFieldError({ field: fieldName, message: errors[fieldName].message }));
    } else {
      dispatch(clearFieldError(fieldName));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="registration-container">
      {alert === 'success' && (
        <AlertComponent messageForAlert={'Успешная регистрация'} type={'success'}/>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h2 className='form__title'>Create new account</h2>
        
        <label className='form__label' htmlFor="username">
          <span>Username</span>
          <input 
            {...register('username')}
            onChange={handleInputChange('username')}
            className='form__input' 
            name='username' 
            type="text" 
            placeholder='Username' 
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </label>

        <label className='form__label' htmlFor="email">
          <span>Email address</span>
          <input
            {...register('email')} 
            onChange={handleInputChange('email')}
            className='form__input' 
            name='email' 
            type="email" 
            placeholder='Email address' 
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </label>

        <label className='form__label' htmlFor="password">
          <span>Password</span>
          <input
            {...register('password')}
            className='form__input' 
            name='password' 
            type="password" 
            placeholder='Password' 
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </label>

        <label className='form__label' htmlFor="repeat">
          <span>Repeat Password</span>
          <input
            {...register('repeat')} 
            className='form__input' 
            name='repeat' 
            type='password' 
            placeholder='Repeat password' 
          />
          {errors.repeat && <ErrorMessage>{errors.repeat.message}</ErrorMessage>}
          {watch('password') && watch('repeat') && watch('password') !== watch('repeat') && (
            <ErrorMessage>Пароли не совпадают</ErrorMessage>
          )}
        </label>

        <label className='form__checkbox-container' htmlFor="checkbox">
          <input 
            {...register('checkbox')}
            type="checkbox" 
            name="checkbox" 
            className='form__checkbox' 
          />
          <span>I agree to the processing of my personal information</span>
          {errors.checkbox && <ErrorMessage>{errors.checkbox.message}</ErrorMessage>}
        </label>

        <button className='form__button' type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Create'}
        </button>

        <span className='form__bottom-text'>
          Already have an account? <Link to="/authorization">Sign In.</Link>
        </span>
      </form>
    </div>
  );
};

export default Registration;