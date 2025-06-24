import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import './alert.css';

const AlertComponent = ({ messageForAlert, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('show');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setAnimationClass('hide');

      setTimeout(() => {
        setIsVisible(false);
      }, 300); 
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`alert-container ${animationClass}`}>
      <Alert message={messageForAlert} type={type} />
    </div>
  );
};

export default AlertComponent;