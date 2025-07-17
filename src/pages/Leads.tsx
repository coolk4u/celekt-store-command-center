
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Converted' | 'Lost';
  dateCreated: string;
}

const Leads = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'converted'>('all');
  
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      location: 'Mumbai',
      status: 'New',
      dateCreated: '2024-01-15'
    },
    {
      id: '2',
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      location: 'Delhi',
      status: 'Contacted',
      dateCreated: '2024-01-14'
    },
    {
      id: '3',
      firstName: 'Amit',
      lastName: 'Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      location: 'Bangalore',
      status: 'Converted',
      dateCreated: '2024-01-12'
    }
  ]);

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
      <Header title="Lead Management" />
      
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
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={`rounded-xl whitespace-nowrap ${filter === 'all' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            All ({stats.total})
          </Button>
          <Button
            variant={filter === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('new')}
            className={`rounded-xl whitespace-nowrap ${filter === 'new' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            New ({stats.new})
          </Button>
          <Button
            variant={filter === 'contacted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('contacted')}
            className={`rounded-xl whitespace-nowrap ${filter === 'contacted' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            Contacted ({stats.contacted})
          </Button>
          <Button
            variant={filter === 'converted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('converted')}
            className={`rounded-xl whitespace-nowrap ${filter === 'converted' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            Converted ({stats.converted})
          </Button>
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
