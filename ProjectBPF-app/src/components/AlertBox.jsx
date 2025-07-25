// src/components/AlertBox.jsx

import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const AlertBox = ({ 
  type = 'info', 
  children, 
  onClose, 
  dismissible = false,
  className = '' 
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: <FiCheckCircle className="w-5 h-5 text-green-400" />,
          closeButton: 'text-green-500 hover:text-green-600'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: <FiXCircle className="w-5 h-5 text-red-400" />,
          closeButton: 'text-red-500 hover:text-red-600'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: <FiAlertCircle className="w-5 h-5 text-yellow-400" />,
          closeButton: 'text-yellow-500 hover:text-yellow-600'
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: <FiInfo className="w-5 h-5 text-blue-400" />,
          closeButton: 'text-blue-500 hover:text-blue-600'
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`border rounded-md p-4 mb-4 ${styles.container} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3 flex-1">
          <div className="text-sm">
            {children}
          </div>
        </div>
        {(dismissible || onClose) && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${styles.closeButton}`}
              >
                <span className="sr-only">Dismiss</span>
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertBox;