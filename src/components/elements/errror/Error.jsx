import React from "react";
import styles from './error.module.css';
import icon from './assets/icon-error.png'
import { motion } from 'motion/react';

const Error = ({text}) => {
  return (
    <motion.div className={styles['error-container']} initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <img src={icon} alt="" />
        <p className={styles['error-text']}>{text}</p>
    </motion.div>
  );
};

export default Error;