import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  syncQueue: any[];
  addToSyncQueue: (data: any) => void;
  syncData: () => Promise<void>;
  isSyncing: boolean;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

interface OfflineProviderProps {
  children: ReactNode;
}

export const OfflineProvider: React.FC<OfflineProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncQueue, setSyncQueue] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load sync queue from localStorage
    const savedQueue = localStorage.getItem('syncQueue');
    if (savedQueue) {
      setSyncQueue(JSON.parse(savedQueue));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
  }, [syncQueue]);

  const addToSyncQueue = (data: any) => {
    const queueItem = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      synced: false
    };
    setSyncQueue(prev => [...prev, queueItem]);
  };

  const syncData = async () => {
    if (!isOnline || syncQueue.length === 0) return;

    setIsSyncing(true);
    try {
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear synced items
      setSyncQueue([]);
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <OfflineContext.Provider value={{
      isOnline,
      syncQueue,
      addToSyncQueue,
      syncData,
      isSyncing
    }}>
      {children}
    </OfflineContext.Provider>
  );
};