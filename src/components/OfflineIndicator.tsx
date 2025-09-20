import React from 'react';
import { FolderSync as Sync, CheckCircle, AlertCircle } from 'lucide-react';
import { useOffline } from '../contexts/OfflineContext';

const OfflineIndicator: React.FC = () => {
  const { isOnline, syncQueue, syncData, isSyncing } = useOffline();

  if (isOnline && syncQueue.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOnline && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 mb-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Working offline</span>
        </div>
      )}

      {syncQueue.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Sync className={`h-4 w-4 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium text-gray-900">
              {isSyncing ? 'Syncing...' : `${syncQueue.length} items pending`}
            </span>
          </div>
          
          {isOnline && !isSyncing && (
            <button
              onClick={syncData}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Sync Now
            </button>
          )}
          
          {isSyncing && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Syncing data...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;