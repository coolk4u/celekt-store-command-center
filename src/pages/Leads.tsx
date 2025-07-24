import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  dateCreated: string;
}

const Leads = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'converted'>('all');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Token Fetcher
  const getAccessToken = async () => {
    const tokenUrl = 'https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/oauth2/token';
    const clientId = '3MVG9BBZP0d0A9KAcJnBKSzCfrRE_gMs1F.S7Uw0j_NByrWXPE6QjuPbeOqXjD7ud8_N3h5OFhGobUpSI.nRR';
    const clientSecret = 'B36DBB1474A5226DEE9C3696BA1080A63AD857EBF1735E4816D7931E8EA79A6C';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
      const res = await axios.post(tokenUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      setAccessToken(res.data.access_token);
      console.log('✅ Access Token:', res.data.access_token);
    } catch (error) {
      console.error('❌ Token Error:', error);
    }
  };

  // Lead Fetcher
  const fetchLeads = async (token: string) => {
    try {
      const queryUrl =
        "https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=" +
        "SELECT+Id,FirstName,LastName,Email,Phone,Status,CreatedDate,Location__c+FROM+Lead+WHERE+Location__c+!=+null";

      const res = await axios.get(queryUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      interface SalesforceLeadRecord {
        Id: string;
        FirstName?: string;
        LastName?: string;
        Email?: string;
        Phone?: string;
        Location__c?: string;
        Status?: string;
        CreatedDate?: string;
      }

      const sfLeads: Lead[] = res.data.records.map((l: SalesforceLeadRecord) => ({
        id: l.Id,
        firstName: l.FirstName || '',
        lastName: l.LastName || '',
        email: l.Email || '',
        phone: l.Phone || '',
        location: l.Location__c || '',
        status: l.Status || 'New',
        dateCreated: l.CreatedDate || '',
      }));

      setLeads(sfLeads);
      console.log('📦 Leads:', sfLeads);
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) fetchLeads(accessToken);
  }, [accessToken]);

  const filteredLeads = leads.filter(lead => {
    if (filter === 'new') return lead.status === 'New';
    if (filter === 'contacted') return lead.status === 'Contacted';
    if (filter === 'converted') return lead.status === 'Converted';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Interested': return 'bg-purple-100 text-purple-800';
      case 'Converted': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <Clock className="h-3 w-3" />;
      case 'Contacted': return <TrendingUp className="h-3 w-3" />;
      case 'Converted': return <CheckCircle className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    contacted: leads.filter(l => l.status === 'Contacted').length,
    converted: leads.filter(l => l.status === 'Converted').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <div className="pt-6 pb-2">
        <div className="flex items-center justify-center gap-2 relative left-[-80px]">
    <button
      onClick={() => navigate('/')}
      className="text-gray-700 hover:text-gray-900"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h1 className="text-xl font-bold text-gray-900">Lead Management</h1>
  </div>
</div>


      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Leads</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.converted}</p>
              <p className="text-sm text-gray-600">Converted</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Lead Button */}
        <Button
          onClick={() => navigate('/lead-capture')}
          className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 h-14 rounded-2xl"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Lead
        </Button>

        {/* Filter Buttons */}
        <div className="flex space-x-2 overflow-x-auto">
          {(['all', 'new', 'contacted', 'converted'] as const).map(type => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className={`rounded-xl whitespace-nowrap ${filter === type ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} ({stats[type] ?? stats.total})
            </Button>
          ))}
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{lead.firstName} {lead.lastName}</h3>
                    <p className="text-sm text-gray-600 mb-1">{lead.email}</p>
                    <p className="text-sm text-gray-600 mb-1">{lead.phone}</p>
                    <p className="text-sm text-gray-600">{lead.location}</p>
                  </div>
                  <Badge className={`${getStatusColor(lead.status)} font-medium rounded-full px-3 py-1 flex items-center gap-1`}>
                    {getStatusIcon(lead.status)}
                    {lead.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Created: {new Date(lead.dateCreated).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 font-medium">
                    View Details →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No leads found</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Leads;
