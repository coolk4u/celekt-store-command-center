
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

const RaiseIssue = () => {
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState<'customer' | 'store' | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'Medium',
    // Customer request specific fields
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (requestType === 'customer' && (!formData.customerName || !formData.customerPhone)) {
      toast.error('Please fill in customer details');
      return;
    }

    console.log('Issue submitted:', {
      requestType,
      ...formData
    });
    
    toast.success(`${requestType === 'customer' ? 'Customer' : 'Store'} issue submitted successfully!`);
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
              <p className="text-gray-600 mb-6">Choose the type of issue you want to report:</p>
              
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
              {requestType === 'customer' ? <User className="h-6 w-6 mr-2 text-blue-600" /> : <Store className="h-6 w-6 mr-2 text-gray-600" />}
              {requestType === 'customer' ? 'Customer Issue Report' : 'Store Issue Report'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {requestType === 'customer' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="text-gray-900 font-medium">
                      Customer Name *
                    </Label>
                    <Input
                      id="customerName"
                      placeholder="Enter customer name"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      className="border-gray-200 bg-white text-gray-900"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="text-gray-900 font-medium">
                      Customer Phone *
                    </Label>
                    <Input
                      id="customerPhone"
                      placeholder="Enter customer phone number"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                      className="border-gray-200 bg-white text-gray-900"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deviceModel" className="text-gray-900 font-medium">
                      Device Model
                    </Label>
                    <Input
                      id="deviceModel"
                      placeholder="Enter device model (e.g., iPhone 15 Pro)"
                      value={formData.deviceModel}
                      onChange={(e) => setFormData({...formData, deviceModel: e.target.value})}
                      className="border-gray-200 bg-white text-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issueType" className="text-gray-900 font-medium">
                      Issue Type *
                    </Label>
                    <Select onValueChange={(value) => setFormData({...formData, issueType: value})}>
                      <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {customerIssueTypes.map((type) => (
                          <SelectItem key={type} value={type} className="text-gray-900">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-900 font-medium">
                  {requestType === 'customer' ? 'Category' : 'Category'} *
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {requestType === 'customer' ? 
                      customerIssueTypes.map((category) => (
                        <SelectItem key={category} value={category} className="text-gray-900">
                          {category}
                        </SelectItem>
                      )) :
                      storeCategories.map((category) => (
                        <SelectItem key={category} value={category} className="text-gray-900">
                          {category}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-900 font-medium">
                  Short Description *
                </Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="border-gray-200 bg-white text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-900 font-medium">
                  {requestType === 'customer' ? 'Problem Summary' : 'Detailed Description'} *
                </Label>
                <Textarea
                  id="description"
                  placeholder={requestType === 'customer' ? 
                    "Describe the customer's problem in detail..." :
                    "Provide detailed information about the issue..."
                  }
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="border-gray-200 bg-white text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-gray-900 font-medium">
                  Priority Level
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, priority: value})} defaultValue="Medium">
                  <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Low" className="text-gray-900">Low</SelectItem>
                    <SelectItem value="Medium" className="text-gray-900">Medium</SelectItem>
                    <SelectItem value="High" className="text-gray-900">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 h-12 rounded-xl"
              >
                Submit {requestType === 'customer' ? 'Customer' : 'Store'} Issue
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
