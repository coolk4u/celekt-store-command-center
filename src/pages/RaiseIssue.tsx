import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { AlertTriangle, ArrowLeft, User, Store } from 'lucide-react';

// Dummy data for submission
const DUMMY_ISSUES = [
  {
    id: '1',
    type: 'customer',
    category: 'Battery Drain',
    title: 'Phone battery drains too fast',
    description: 'Customer complains that phone battery lasts only 2 hours',
    priority: 'High',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    deviceModel: 'iPhone 14 Pro',
    issueType: 'Battery Drain',
    status: 'Open',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'store',
    category: 'Air Conditioning',
    title: 'AC not working in store',
    description: 'Main AC unit in electronics section is not cooling',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: new Date().toISOString()
  }
];

const RaiseIssue = () => {
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState<'customer' | 'store' | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'Medium',
    customerName: '',
    customerPhone: '',
    deviceModel: '',
    issueType: ''
  });

  const storeCategories = [
    'Air Conditioning',
    'Electrical',
    'Security Systems',
    'Cleanliness',
    'Display/Signage',
    'Customer Service',
    'Other'
  ];

  const customerIssueTypes = [
    'Phone Heating',
    'Battery Drain',
    'Screen Issues',
    'Charging Problems',
    'Software Issues',
    'Camera Problems',
    'Audio Issues',
    'Network Issues',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (requestType === 'customer' && (!formData.customerName || !formData.customerPhone)) {
      toast.error('Please fill in customer details');
      return;
    }

    // Create dummy issue object
    const newIssue = {
      id: `issue-${Date.now()}`,
      type: requestType,
      category: formData.category,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      customerName: formData.customerName || null,
      customerPhone: formData.customerPhone || null,
      deviceModel: formData.deviceModel || null,
      issueType: formData.issueType || null,
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real app, you would send this to your backend API
    // For now, we'll just log it and show success message
    console.log('Submitting issue:', newIssue);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Add to local storage for persistence (optional)
    const existingIssues = JSON.parse(localStorage.getItem('dummy-issues') || '[]');
    const updatedIssues = [...existingIssues, newIssue];
    localStorage.setItem('dummy-issues', JSON.stringify(updatedIssues));

    toast.success(
      `${requestType === 'customer' ? 'Customer' : 'Store'} issue submitted successfully!`
    );
    
    // Reset form and navigate
    resetForm();
    navigate('/issues');
  };

  const resetForm = () => {
    setRequestType(null);
    setFormData({
      category: '',
      title: '',
      description: '',
      priority: 'Medium',
      customerName: '',
      customerPhone: '',
      deviceModel: '',
      issueType: ''
    });
  };

  if (!requestType) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <Header title="Raise Issue" />
        <div className="max-w-md mx-auto p-4 space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/issues')}
            className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Issues
          </Button>

          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-gray-900">
                <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
                Select Request Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setRequestType('customer')}
                className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-2xl flex items-center justify-center space-x-3"
              >
                <User className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Customer Request</div>
                  <div className="text-sm opacity-90">Device issues, complaints</div>
                </div>
              </Button>
              <Button
                onClick={() => setRequestType('store')}
                className="w-full h-16 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-2xl flex items-center justify-center space-x-3"
              >
                <Store className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">Store Request</div>
                  <div className="text-sm opacity-90">AC, electrical, maintenance</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title={`${requestType === 'customer' ? 'Customer' : 'Store'} Issue`} />
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={resetForm}
          className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Request Type
        </Button>
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-900">
              {requestType === 'customer' ? (
                <User className="h-6 w-6 mr-2 text-blue-600" />
              ) : (
                <Store className="h-6 w-6 mr-2 text-gray-600" />
              )}
              {requestType === 'customer' ? 'Customer Issue Report' : 'Store Issue Report'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Category *</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  value={formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(requestType === 'customer'
                      ? customerIssueTypes
                      : storeCategories
                    ).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Title *</Label>
                <Input
                  placeholder="Issue Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  placeholder="Describe the issue"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Priority</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                  value={formData.priority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {requestType === 'customer' && (
                <>
                  <div>
                    <Label>Customer Name *</Label>
                    <Input
                      placeholder="Customer Name"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Customer Phone *</Label>
                    <Input
                      placeholder="Phone Number"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, customerPhone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Device Model</Label>
                    <Input
                      placeholder="Device Model"
                      value={formData.deviceModel}
                      onChange={(e) =>
                        setFormData({ ...formData, deviceModel: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Issue Type</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, issueType: value })
                      }
                      value={formData.issueType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Issue Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {customerIssueTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                Submit Issue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default RaiseIssue;
