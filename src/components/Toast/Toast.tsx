import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast: React.FC = () => {
  return (
    <ToastContainer
      autoClose={6000}
      hideProgressBar={true}
      draggablePercent={60}
      newestOnTop={true}
      position="top-right"
    />
  );
};

export default Toast;
