import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './button.module.css'

const ButtonAuth = ({type, text}) => {

  if (type === 'signUp') {
    return (
      <Button color="cyan" variant="outlined">
        <Link to="/authorization">
          {text}
        </Link>
      </Button>
    )
  }

  return (
    <Button variant="text">
      <Link to='/registration' className={styles.link}>
        {text}
      </Link>
    </Button>
  );
};

export default ButtonAuth;