
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface DemoRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  mobileInterest: string;
  discountExpected: string;
  managerApproval: 'Pending' | 'Approved' | 'Rejected';
  managerComment: string;
}

const DemoRequests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed'>('all');
  
  const [demos] = useState<DemoRequest[]>([
    {
      id: '1',
      customerName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      scheduledDate: '2024-01-18',
      scheduledTime: '14:00',
      status: 'Scheduled',
      mobileInterest: 'iPhone 15 Pro',
      discountExpected: '10%',
      managerApproval: 'Pending',
      managerComment: ''
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya.sharma@email.com',
      scheduledDate: '2024-01-17',
      scheduledTime: '11:00',
      status: 'In Progress',
      mobileInterest: 'Samsung Galaxy S24',
      discountExpected: '15%',
      managerApproval: 'Approved',
      managerComment: 'Customer has good credit history'
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      phone: '+91 76543 21098',
      email: 'amit.patel@email.com',
      scheduledDate: '2024-01-16',
      scheduledTime: '16:30',
      status: 'Completed',
      mobileInterest: 'OnePlus 12',
      discountExpected: '8%',
      managerApproval: 'Approved',
      managerComment: 'Demo successful, ready to purchase'
    }
  ]);

  const filteredDemos = demos.filter(demo => {
    if (filter === 'scheduled') return demo.status === 'Scheduled';
    if (filter === 'completed') return demo.status === 'Completed';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalColor = (approval: string) => {
    switch (approval) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Calendar className="h-3 w-3" />;
      case 'In Progress': return <Clock className="h-3 w-3" />;
      case 'Completed': return <CheckCircle className="h-3 w-3" />;
      case 'Cancelled': return <AlertCircle className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  const stats = {
    total: demos.length,
    scheduled: demos.filter(d => d.status === 'Scheduled').length,
    completed: demos.filter(d => d.status === 'Completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Demo Requests" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.scheduled}</p>
              <p className="text-xs text-gray-600">Scheduled</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.completed}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={`rounded-xl ${filter === 'all' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            All ({stats.total})
          </Button>
          <Button
            variant={filter === 'scheduled' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('scheduled')}
            className={`rounded-xl ${filter === 'scheduled' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            Scheduled ({stats.scheduled})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
            className={`rounded-xl ${filter === 'completed' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
          >
            Completed ({stats.completed})
          </Button>
        </div>

        {/* Demo List */}
        <div className="space-y-4">
          {filteredDemos.map((demo) => (
            <Card key={demo.id} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-5" onClick={() => navigate(`/demo-details/${demo.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{demo.customerName}</h3>
                    <p className="text-sm text-gray-600 mb-1">{demo.phone}</p>
                    <p className="text-sm text-gray-600">{demo.email}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={`${getStatusColor(demo.status)} font-medium rounded-full px-3 py-1 flex items-center gap-1`}>
                      {getStatusIcon(demo.status)}
                      {demo.status}
                    </Badge>
                    <Badge className={`${getApprovalColor(demo.managerApproval)} font-medium rounded-full px-2 py-1 text-xs`}>
                      {demo.managerApproval}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(demo.scheduledDate).toLocaleDateString()} at {demo.scheduledTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Interest:</span>
                    <span className="font-medium text-gray-900">{demo.mobileInterest}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Expected Discount:</span>
                    <span className="font-medium text-gray-900">{demo.discountExpected}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Scheduled for: {new Date(demo.scheduledDate).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 font-medium">
                    View Details →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDemos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No demo requests found</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DemoRequests;
