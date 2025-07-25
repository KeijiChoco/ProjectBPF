// src/components/PageHeader.jsx

import React from 'react';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const PageHeader = ({ title, breadcrumb = [], children }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Left side - Title and Breadcrumb */}
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FiHome className="mr-2" />
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="hover:text-gray-700 cursor-pointer">
                    {item}
                  </span>
                  {index < breadcrumb.length - 1 && (
                    <FiChevronRight className="mx-2 text-gray-400" size={14} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;