import React from 'react';

export const LoadingCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full mt-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};