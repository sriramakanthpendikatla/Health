import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  Droplets,
  Shield,
  AlertTriangle,
  CheckCircle,
  Phone,
  Users,
  Stethoscope,
  Home
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  priority: 'high' | 'medium' | 'low';
}

const Tips: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'prevention',
      question: 'How can I prevent waterborne diseases in my community?',
      answer: 'Boil water for at least 1 minute before drinking. Store boiled water in clean containers with tight covers. Use separate utensils for clean and contaminated water. Wash hands frequently with soap. Keep water sources covered and clean. Report any unusual taste, color, or smell in water immediately.',
      priority: 'high'
    },
    {
      id: '2',
      category: 'symptoms',
      question: 'What are the early warning signs of waterborne diseases?',
      answer: 'Early signs include diarrhea (3+ loose stools per day), vomiting, stomach cramps, fever, nausea, and dehydration. In children, watch for sunken eyes, dry mouth, lethargy, and reduced urination. Seek immediate medical attention if symptoms persist for more than 24 hours.',
      priority: 'high'
    },
    {
      id: '3',
      category: 'water-testing',
      question: 'How often should water sources be tested?',
      answer: 'Test community water sources at least weekly during normal times. Increase testing to daily during monsoon season or after any contamination event. Hand pumps and wells should be tested bi-weekly. Always test after cleaning, repair, or suspected contamination.',
      priority: 'high'
    },
    {
      id: '4',
      category: 'emergency',
      question: 'What should I do when someone shows severe symptoms?',
      answer: 'Give ORS (Oral Rehydration Solution) immediately. Mix 1 packet ORS in 1 liter clean water. If no ORS available, mix 6 teaspoons sugar + 1/2 teaspoon salt in 1 liter clean water. Call emergency helpline 108. Take patient to nearest health center immediately. Do not give solid food until vomiting stops.',
      priority: 'high'
    },
    {
      id: '5',
      category: 'reporting',
      question: 'When should I report a case to health authorities?',
      answer: 'Report immediately if: 2+ people have similar symptoms in same area, any severe case with blood in stool/vomit, children under 5 with persistent diarrhea, death related to diarrhea/vomiting, unusual increase in diarrhea cases. Don\'t wait - early reporting saves lives.',
      priority: 'high'
    },
    {
      id: '6',
      category: 'water-quality',
      question: 'What water quality parameters should I monitor?',
      answer: 'pH should be between 6.5-8.5. Turbidity should be less than 5 NTU (water should be clear). No foul smell or unusual taste. E. coli should be 0 CFU/100ml. Chlorine residual should be 0.2-0.5 mg/L in treated water. Temperature changes may indicate contamination.',
      priority: 'medium'
    },
    {
      id: '7',
      category: 'treatment',
      question: 'How do I treat water at home if boiling is not possible?',
      answer: 'Use water purification tablets (follow package instructions). Solar disinfection: fill clear plastic bottle, shake, lay horizontally in direct sunlight for 6 hours. Use bleach: 2 drops per liter, wait 30 minutes. Ceramic or sand filters if available. Always use multiple methods when possible.',
      priority: 'medium'
    },
    {
      id: '8',
      category: 'prevention',
      question: 'How should I store treated water safely?',
      answer: 'Use clean, covered containers with narrow openings. Don\'t put hands or utensils in stored water. Pour water out instead of dipping. Clean storage containers weekly with soap and chlorine solution. Store in cool, dark places. Use stored water within 24 hours.',
      priority: 'medium'
    },
    {
      id: '9',
      category: 'hygiene',
      question: 'What hygiene practices prevent waterborne diseases?',
      answer: 'Wash hands with soap for 20 seconds before eating, after toilet use, before handling food/water. Keep fingernails short and clean. Use clean utensils for food and water. Avoid eating street food during outbreaks. Clean and disinfect surfaces regularly.',
      priority: 'medium'
    },
    {
      id: '10',
      category: 'community',
      question: 'How can I engage my community in disease prevention?',
      answer: 'Organize weekly community meetings to discuss water safety. Train local volunteers in basic water testing. Create community WhatsApp groups for quick alerts. Display water safety posters in local language. Involve local leaders and self-help groups in awareness campaigns.',
      priority: 'low'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, color: 'gray' },
    { id: 'prevention', name: 'Prevention', icon: Shield, color: 'green' },
    { id: 'symptoms', name: 'Symptoms', icon: Stethoscope, color: 'blue' },
    { id: 'water-testing', name: 'Water Testing', icon: Droplets, color: 'teal' },
    { id: 'emergency', name: 'Emergency Care', icon: AlertTriangle, color: 'red' },
    { id: 'reporting', name: 'Reporting', icon: Phone, color: 'purple' },
    { id: 'hygiene', name: 'Hygiene', icon: Home, color: 'indigo' },
    { id: 'community', name: 'Community Action', icon: Users, color: 'orange' }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'gray';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tips & Guidelines</h1>
            <p className="text-gray-600">Essential knowledge for preventing and managing waterborne diseases</p>
          </div>
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Emergency</h3>
          </div>
          <p className="text-sm text-red-800 mb-3">
            Call 108 for medical emergencies. Give ORS immediately for severe dehydration.
          </p>
          <div className="text-xs text-red-700 font-mono bg-red-100 rounded px-2 py-1">
            Emergency: 108
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Water Safety</h3>
          </div>
          <p className="text-sm text-blue-800 mb-3">
            Boil water for 1 minute. Store in clean, covered containers.
          </p>
          <div className="text-xs text-blue-700 bg-blue-100 rounded px-2 py-1">
            pH: 6.5-8.5 | Turbidity: &lt;5 NTU
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Prevention</h3>
          </div>
          <p className="text-sm text-green-800 mb-3">
            Wash hands frequently. Use clean utensils. Avoid contaminated water.
          </p>
          <div className="text-xs text-green-700 bg-green-100 rounded px-2 py-1">
            Hand washing: 20 seconds with soap
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Phone className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Report Cases</h3>
          </div>
          <p className="text-sm text-purple-800 mb-3">
            Report 2+ similar cases immediately. Don't wait for confirmation.
          </p>
          <div className="text-xs text-purple-700 bg-purple-100 rounded px-2 py-1">
            District Health Office: 24/7
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition-colors
                  ${isActive 
                    ? `border-${category.color}-500 bg-${category.color}-50 text-${category.color}-700` 
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Frequently Asked Questions
            {activeCategory !== 'all' && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredFAQs.length} questions)
              </span>
            )}
          </h2>
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openFAQ === faq.id;
            const categoryColor = getCategoryColor(faq.category);
            
            return (
              <div 
                key={faq.id} 
                className={`border-l-4 ${getPriorityColor(faq.priority)} bg-gray-50 rounded-r-lg overflow-hidden`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-${categoryColor}-100 text-${categoryColor}-800`}>
                          {categories.find(c => c.id === faq.category)?.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          faq.priority === 'high' ? 'bg-red-100 text-red-800' :
                          faq.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {faq.priority} priority
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">{faq.question}</h3>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isOpen ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <HelpCircle className="mx-auto h-12 w-12 mb-4 text-gray-300" />
            <p>No questions found for this category.</p>
          </div>
        )}
      </div>

      {/* Additional Resources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Important Contacts</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Medical Emergency:</span>
                <span className="font-mono text-red-600">108</span>
              </div>
              <div className="flex justify-between">
                <span>District Health Office:</span>
                <span className="font-mono text-blue-600">+91-98765-43210</span>
              </div>
              <div className="flex justify-between">
                <span>Water Quality Lab:</span>
                <span className="font-mono text-teal-600">+91-98765-43211</span>
              </div>
              <div className="flex justify-between">
                <span>Health Supervisor:</span>
                <span className="font-mono text-purple-600">+91-98765-43212</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Quick Reference</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <strong>ORS Recipe:</strong> 1 packet ORS + 1L clean water
              </div>
              <div>
                <strong>Home ORS:</strong> 6 tsp sugar + ½ tsp salt + 1L water
              </div>
              <div>
                <strong>Boiling Time:</strong> 1 minute rolling boil
              </div>
              <div>
                <strong>Hand Washing:</strong> 20 seconds with soap
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;