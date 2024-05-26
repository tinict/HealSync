import React, { useState } from 'react';
import { Button } from '@mui/material';

const ToastMessage = ({ open, message, handleClose, type }) => {
    const toastStyle = {
        position: 'fixed',
        top: '80px',
        right: '20px',
        padding: '10px 20px',
        color: '#fff',
        borderRadius: '4px',
        backgroundColor: type === 'success' ? 'blue' : 'red',
        display: open ? 'block' : 'none',
    };

    if (open) {
        setTimeout(() => {
            handleClose();
        }, 5000);
    }

    return (
        <div style={toastStyle}>
            {message}
        </div>
    );
};

export default ToastMessage;
