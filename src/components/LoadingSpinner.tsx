import React from 'react';
import { Activity } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <Activity className="h-8 w-8 text-white animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">HealthWatch</h2>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;