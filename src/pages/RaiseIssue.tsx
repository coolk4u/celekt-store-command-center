import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
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

  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', '3MVG9BBZP0d0A9KAcJnBKSzCfrRE_gMs1F.S7Uw0j_NByrWXPE6QjuPbeOqXjD7ud8_N3h5OFhGobUpSI.nRR');
    params.append('client_secret', 'B36DBB1474A5226DEE9C3696BA1080A63AD857EBF1735E4816D7931E8EA79A6C');

    try {
      const res = await axios.post(
        'https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/oauth2/token',
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      setAccessToken(res.data.access_token);
    } catch (err) {
      console.error('Access token error:', err);
      toast.error('Authentication failed');
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

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

    const caseData: any = {
      Subject: formData.title,
      Description: formData.description,
      Priority: formData.priority,
      RecordTypeId:
        requestType === 'customer'
          ? '012fI0000019obJQAQ'
          : '012fI0000019ocvQAA',
      Category__c: formData.category,
    };

    if (requestType === 'customer') {
      caseData.Contact = {
        Name: formData.customerName,
        Phone: formData.customerPhone
      };
      caseData.Device_Model__c = formData.deviceModel;
      caseData.Issue_Type__c = formData.issueType;
    }

    try {
      await axios.post(
        'https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/apexrest/CreateIssueCase',
        caseData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success(
        `${requestType === 'customer' ? 'Customer' : 'Store'} issue submitted successfully!`
      );
      navigate('/issues');
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Error submitting issue');
    }
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
                <Label>Category</Label>
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
                <Label>Title</Label>
                <Input
                  placeholder="Issue Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the issue"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {requestType === 'customer' && (
                <>
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      placeholder="Customer Name"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Customer Phone</Label>
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
