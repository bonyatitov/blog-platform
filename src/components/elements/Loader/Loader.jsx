import React from "react";
import styles from './loader.module.css';
import { motion } from 'motion/react'
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


const Loader = () => {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles['loader-container']}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </motion.div>
  )
}

export default Loader;