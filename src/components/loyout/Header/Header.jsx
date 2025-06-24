import React from "react";
import styles from './header.module.css';

const Header = ({children}) => {
  return (
    <header className={styles['header-loyout']}>
      { children }
    </header>
  );
};

export default Header;