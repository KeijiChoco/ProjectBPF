// src/components/LoadingSpinner.jsx

import React from 'react';

const LoadingSpinner = ({ 
  text = 'Loading...', 
  size = 'medium', 
  color = 'indigo',
  className = '',
  fullScreen = false,
  overlay = false 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      case 'xlarge':
        return 'w-16 h-16';
      case 'medium':
      default:
        return 'w-8 h-8';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'border-blue-600';
      case 'green':
        return 'border-green-600';
      case 'red':
        return 'border-red-600';
      case 'yellow':
        return 'border-yellow-600';
      case 'purple':
        return 'border-purple-600';
      case 'gray':
        return 'border-gray-600';
      case 'indigo':
      default:
        return 'border-indigo-600';
    }
  };

  const spinnerClasses = `animate-spin rounded-full border-2 border-gray-300 ${getSizeClasses()} ${getColorClasses()}`;
  const borderTopClass = `border-t-2 ${getColorClasses()}`;

  const SpinnerContent = () => (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${spinnerClasses} ${borderTopClass}`}></div>
      {text && (
        <p className="mt-3 text-sm text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <SpinnerContent />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        <SpinnerContent />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <SpinnerContent />
    </div>
  );
};

// Component variations untuk kemudahan penggunaan
export const SmallSpinner = ({ text, color }) => (
  <LoadingSpinner size="small" text={text} color={color} />
);

export const LargeSpinner = ({ text, color }) => (
  <LoadingSpinner size="large" text={text} color={color} />
);

export const FullScreenSpinner = ({ text, color }) => (
  <LoadingSpinner size="large" text={text} color={color} fullScreen={true} />
);

export const OverlaySpinner = ({ text, color }) => (
  <LoadingSpinner size="medium" text={text} color={color} overlay={true} />
);

export default LoadingSpinner;