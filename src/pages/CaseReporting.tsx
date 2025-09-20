import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Camera, 
  Mic, 
  Users, 
  Calendar,
  AlertCircle,
  Save,
  Send,
  Plus
} from 'lucide-react';
import { useOffline } from '../contexts/OfflineContext';

const CaseReporting: React.FC = () => {
  const { isOnline, addToSyncQueue } = useOffline();
  const [formData, setFormData] = useState({
    location: '',
    date: new Date().toISOString().split('T')[0],
    symptoms: [] as string[],
    patientCount: 1,
    ageGroup: '',
    severity: 'mild',
    description: '',
    media: [] as string[]
  });

  const symptoms = [
    'Diarrhea',
    'Vomiting',
    'Fever',
    'Abdominal pain',
    'Dehydration',
    'Nausea',
    'Fatigue',
    'Loss of appetite'
  ];

  const ageGroups = [
    'Under 5 years',
    '5-18 years',
    '19-60 years',
    'Above 60 years'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    
    const reportData = {
      ...formData,
      id: Date.now().toString(),
      type: 'case_report',
      status: isDraft ? 'draft' : 'submitted',
      timestamp: new Date().toISOString()
    };

    if (isOnline && !isDraft) {
      // Direct submission logic would go here
      console.log('Submitting report:', reportData);
    } else {
      addToSyncQueue(reportData);
    }

    // Reset form
    setFormData({
      location: '',
      date: new Date().toISOString().split('T')[0],
      symptoms: [],
      patientCount: 1,
      ageGroup: '',
      severity: 'mild',
      description: '',
      media: []
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Reporting</h1>
            <p className="text-gray-600">Report waterborne disease cases in your community</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select location</option>
                <option value="Bhadra Village">Bhadra Village</option>
                <option value="Kumta Block">Kumta Block</option>
                <option value="Sirsi Town">Sirsi Town</option>
                <option value="Yellapur">Yellapur</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date of Occurrence *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Patient Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Number of Patients *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.patientCount}
                onChange={(e) => setFormData(prev => ({ ...prev, patientCount: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Age Group *
              </label>
              <select
                required
                value={formData.ageGroup}
                onChange={(e) => setFormData(prev => ({ ...prev, ageGroup: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select age group</option>
                {ageGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Symptoms Observed *</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {symptoms.map(symptom => (
              <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.symptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{symptom}</span>
              </label>
            ))}
          </div>
          
          {formData.symptoms.length === 0 && (
            <p className="text-red-500 text-sm mt-2">Please select at least one symptom</p>
          )}
        </div>

        {/* Severity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Severity Assessment *</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'mild', label: 'Mild', desc: 'Manageable symptoms, no hospitalization needed', color: 'green' },
              { value: 'moderate', label: 'Moderate', desc: 'Some symptoms concerning, monitoring required', color: 'yellow' },
              { value: 'severe', label: 'Severe', desc: 'Critical symptoms, immediate medical attention needed', color: 'red' }
            ].map(severity => (
              <label key={severity.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="severity"
                  value={severity.value}
                  checked={formData.severity === severity.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                  className="sr-only"
                />
                <div className={`
                  p-4 rounded-lg border-2 transition-colors
                  ${formData.severity === severity.value 
                    ? `border-${severity.color}-500 bg-${severity.color}-50` 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className={`h-5 w-5 ${
                      formData.severity === severity.value 
                        ? `text-${severity.color}-600` 
                        : 'text-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{severity.label}</p>
                      <p className="text-sm text-gray-600">{severity.desc}</p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description & Notes
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide additional context, suspected causes, or any other relevant information..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Camera className="h-4 w-4" />
                  <span className="text-sm">Photo</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Mic className="h-4 w-4" />
                  <span className="text-sm">Audio Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4" />
              <span>Save as Draft</span>
            </button>
            
            <button
              type="submit"
              disabled={formData.symptoms.length === 0}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              <Send className="h-4 w-4" />
              <span>{isOnline ? 'Submit Report' : 'Queue for Sync'}</span>
            </button>
          </div>
          
          {!isOnline && (
            <p className="mt-2 text-sm text-orange-600 flex items-center space-x-1">
              <AlertCircle className="h-4 w-4" />
              <span>You're offline. Report will be submitted when connection is restored.</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CaseReporting;