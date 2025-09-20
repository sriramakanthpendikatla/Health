import React, { useState } from 'react';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  TrendingUp,
  Beaker
} from 'lucide-react';
import { useOffline } from '../contexts/OfflineContext';

const WaterQuality: React.FC = () => {
  const { isOnline, addToSyncQueue } = useOffline();
  const [activeTab, setActiveTab] = useState<'test' | 'results' | 'sensors'>('test');
  
  const [testData, setTestData] = useState({
    source: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    testType: 'manual',
    ph: '',
    turbidity: '',
    temperature: '',
    ecoli: '',
    chlorine: '',
    notes: ''
  });

  const waterSources = [
    'Village Well #1',
    'Village Well #2', 
    'Hand Pump A',
    'Hand Pump B',
    'Community Tank',
    'Borewell Main',
    'River Intake'
  ];

  const recentTests = [
    {
      id: 1,
      source: 'Village Well #1',
      date: '2024-01-15',
      ph: 6.8,
      turbidity: 4.2,
      temperature: 24,
      status: 'safe',
      tester: 'Sunita Devi'
    },
    {
      id: 2,
      source: 'Hand Pump A',
      date: '2024-01-15',
      ph: 5.9,
      turbidity: 8.5,
      temperature: 26,
      status: 'caution',
      tester: 'Rajesh Kumar'
    },
    {
      id: 3,
      source: 'Community Tank',
      date: '2024-01-14',
      ph: 5.2,
      turbidity: 12.1,
      temperature: 28,
      status: 'unsafe',
      tester: 'Priya Sharma'
    }
  ];

  const sensors = [
    {
      id: 1,
      name: 'Sensor WQ-001',
      location: 'Village Well #1',
      status: 'active',
      lastReading: '2024-01-15 14:30',
      ph: 6.8,
      turbidity: 3.2,
      temperature: 24
    },
    {
      id: 2,
      name: 'Sensor WQ-002',
      location: 'Hand Pump A',
      status: 'offline',
      lastReading: '2024-01-14 09:15',
      ph: 6.2,
      turbidity: 5.1,
      temperature: 25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'caution': return 'text-yellow-600 bg-yellow-100';
      case 'unsafe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return CheckCircle;
      case 'caution': return AlertTriangle;
      case 'unsafe': return AlertTriangle;
      default: return Activity;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reportData = {
      ...testData,
      id: Date.now().toString(),
      type: 'water_quality',
      timestamp: new Date().toISOString()
    };

    if (isOnline) {
      console.log('Submitting water quality test:', reportData);
    } else {
      addToSyncQueue(reportData);
    }

    // Reset form
    setTestData({
      source: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      testType: 'manual',
      ph: '',
      turbidity: '',
      temperature: '',
      ecoli: '',
      chlorine: '',
      notes: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Droplets className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Water Quality Monitoring</h1>
            <p className="text-gray-600">Test water sources and monitor quality parameters</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'test', label: 'New Test', icon: Beaker },
              { id: 'results', label: 'Test Results', icon: TrendingUp },
              { id: 'sensors', label: 'Sensors', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id 
                      ? 'border-teal-500 text-teal-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'test' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Water Source *
                  </label>
                  <select
                    required
                    value={testData.source}
                    onChange={(e) => setTestData(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select source</option>
                    {waterSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={testData.date}
                    onChange={(e) => setTestData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={testData.time}
                    onChange={(e) => setTestData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Test Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Method</label>
                <div className="flex space-x-4">
                  {[
                    { value: 'manual', label: 'Manual Test Kit' },
                    { value: 'sensor', label: 'Sensor Reading' }
                  ].map(type => (
                    <label key={type.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="testType"
                        value={type.value}
                        checked={testData.testType === type.value}
                        onChange={(e) => setTestData(prev => ({ ...prev, testType: e.target.value }))}
                        className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    pH Level *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    required
                    value={testData.ph}
                    onChange={(e) => setTestData(prev => ({ ...prev, ph: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="6.5 - 8.5"
                  />
                  <p className="text-xs text-gray-500 mt-1">Safe range: 6.5 - 8.5</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Turbidity (NTU) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={testData.turbidity}
                    onChange={(e) => setTestData(prev => ({ ...prev, turbidity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="< 5 NTU"
                  />
                  <p className="text-xs text-gray-500 mt-1">Safe: &lt; 5 NTU</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Thermometer className="inline h-4 w-4 mr-1" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={testData.temperature}
                    onChange={(e) => setTestData(prev => ({ ...prev, temperature: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="20-30°C"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E. coli (CFU/100ml)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={testData.ecoli}
                    onChange={(e) => setTestData(prev => ({ ...prev, ecoli: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Safe: 0 CFU/100ml</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chlorine (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={testData.chlorine}
                    onChange={(e) => setTestData(prev => ({ ...prev, chlorine: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="0.2-0.5"
                  />
                  <p className="text-xs text-gray-500 mt-1">Safe: 0.2-0.5 mg/L</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes & Observations
                </label>
                <textarea
                  rows={3}
                  value={testData.notes}
                  onChange={(e) => setTestData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any unusual observations, test conditions, or additional notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-teal-600 text-white px-4 py-3 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              >
                {isOnline ? 'Submit Test Results' : 'Queue for Sync'}
              </button>
            </form>
          )}

          {activeTab === 'results' && (
            <div className="space-y-4">
              {recentTests.map((test) => {
                const StatusIcon = getStatusIcon(test.status);
                return (
                  <div key={test.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{test.source}</h3>
                        <p className="text-sm text-gray-500">Tested by {test.tester} on {test.date}</p>
                      </div>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{test.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">pH:</span>
                        <span className={`ml-2 font-medium ${test.ph < 6.5 || test.ph > 8.5 ? 'text-red-600' : 'text-green-600'}`}>
                          {test.ph}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Turbidity:</span>
                        <span className={`ml-2 font-medium ${test.turbidity > 5 ? 'text-red-600' : 'text-green-600'}`}>
                          {test.turbidity} NTU
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Temp:</span>
                        <span className="ml-2 font-medium text-gray-900">{test.temperature}°C</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'sensors' && (
            <div className="space-y-4">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{sensor.name}</h3>
                      <p className="text-sm text-gray-500">{sensor.location}</p>
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      sensor.status === 'active' 
                        ? 'text-green-600 bg-green-100' 
                        : 'text-red-600 bg-red-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${sensor.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="capitalize">{sensor.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">pH:</span>
                      <span className="ml-2 font-medium text-gray-900">{sensor.ph}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Turbidity:</span>
                      <span className="ml-2 font-medium text-gray-900">{sensor.turbidity} NTU</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Temp:</span>
                      <span className="ml-2 font-medium text-gray-900">{sensor.temperature}°C</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">Last reading: {sensor.lastReading}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;