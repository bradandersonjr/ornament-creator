import React from 'react';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isVisible: boolean;
}

function Toast({ message, type, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="toast toast-end">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;