import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UserPlus, ArrowLeft } from 'lucide-react';


const LeadCapture = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    location: '',
    productInterest: ''
  });

  // Brutal token logic from FetchData.tsx
  const getAccessToken = async () => {
    const salesforceUrl = 'https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/oauth2/token';
    const clientId = '3MVG9BBZP0d0A9KAcJnBKSzCfrRE_gMs1F.S7Uw0j_NByrWXPE6QjuPbeOqXjD7ud8_N3h5OFhGobUpSI.nRR';
    const clientSecret = 'B36DBB1474A5226DEE9C3696BA1080A63AD857EBF1735E4816D7931E8EA79A6C';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
      const response = await axios.post(salesforceUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setAccessToken(response.data.access_token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('❌ Error fetching access token:', err.message);
      } else {
        console.error('❌ Error fetching access token:', err);
      }
      setError('Failed to fetch access token.');
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
    toast.error('Please fill in all required fields');
    return;
  }

  try {
    const payload = {
      type: 'lead',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      dateOfBirth: formData.dob,
      productInterest: formData.productInterest
    };

    const response = await axios.post(
      'https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/apexrest/createLead',
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  setTimeout(() => navigate('/leads'), 800);

    // ✅ Success toast
if (response.status === 200) {
  toast.success('Lead captured successfully!', {
    icon: '✅',
    duration: 2000,
    dismissible: true,
    style: {
      background: '#16a34a', // Tailwind's green-600
      color: 'white',
      fontWeight: '600',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    },
  });

  setFormData({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    location: '',
    productInterest: ''
  });

} else {
  toast.error('Something went wrong while capturing the lead.', {
    dismissible: true,
    duration: 4000,
  });
}

  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('❌ Error submitting lead:', err.response?.data || err.message);
    } else {
      console.error('❌ Error submitting lead:', err);
    }
    toast.error('❌ Failed to submit lead.');
  }
};


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Lead Capture" />
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/leads')}
          className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Leads
        </Button>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-900">
              <UserPlus className="h-6 w-6 mr-2 text-primary" />
              Capture New Lead
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inputs stay untouched */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={formData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productInterest">Product Interest</Label>
                <Input id="productInterest" value={formData.productInterest} onChange={(e) => handleInputChange('productInterest', e.target.value)} />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-red-600 text-white font-medium h-12 rounded-xl">
                Capture Lead
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default LeadCapture;
