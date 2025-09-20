import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Droplets, 
  Users, 
  MapPin,
  Calendar,
  Activity,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Active Cases', value: '23', change: '+12%', icon: TrendingUp, color: 'text-red-600 bg-red-100' },
    { name: 'Water Sources Monitored', value: '156', change: '+3%', icon: Droplets, color: 'text-blue-600 bg-blue-100' },
    { name: 'Communities Covered', value: '42', change: '0%', icon: Users, color: 'text-green-600 bg-green-100' },
    { name: 'Alerts This Week', value: '7', change: '-15%', icon: AlertTriangle, color: 'text-orange-600 bg-orange-100' },
  ];

  const recentAlerts = [
    { id: 1, type: 'High Risk', location: 'Bhadra Village', time: '2 hours ago', severity: 'high' },
    { id: 2, type: 'Water Quality', location: 'Kumta Block', time: '4 hours ago', severity: 'medium' },
    { id: 3, type: 'Case Cluster', location: 'Sirsi Town', time: '6 hours ago', severity: 'high' },
  ];

  const recentCases = [
    { id: 1, symptoms: 'Diarrhea, Fever', location: 'Bhadra Village', reporter: 'Sunita Devi', time: '1 hour ago' },
    { id: 2, symptoms: 'Vomiting, Abdominal pain', location: 'Kumta Block', reporter: 'Rajesh Kumar', time: '3 hours ago' },
    { id: 3, symptoms: 'Diarrhea, Dehydration', location: 'Sirsi Town', reporter: 'Priya Sharma', time: '5 hours ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor waterborne disease outbreaks and coordinate response activities
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.change} from last week</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Cases</h2>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {recentCases.map((case_) => (
              <div key={case_.id} className="p-3 rounded-lg border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{case_.symptoms}</p>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{case_.location}</span>
                      <span>•</span>
                      <span>by {case_.reporter}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{case_.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Report Case</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-colors">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Droplets className="h-5 w-5 text-teal-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Test Water</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Send Alert</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Mark Resolved</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;