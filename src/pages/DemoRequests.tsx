import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface OpportunityRecord {
  Id: string;
  Name: string;
  Account?: {
    Phone?: string;
  };
  ScheduledDateTime__c?: string;
  StageName?: string;
  Manager_Approved__c?: 'Pending' | 'Approved' | 'Rejected';
  Expected_Discount__c?: number;
  Manager_Comments__c?: string;
  Converted_Lead__r?: {
    ProductInterest__c?: string;
  };
}

const DemoRequests = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [demos, setDemos] = useState<OpportunityRecord[]>([]);

  // Dummy data in JSON format
  const dummyDemoData: OpportunityRecord[] = [
    {
      Id: '1',
      Name: 'Acme Corporation Demo',
      Account: {
        Phone: '+1 (555) 123-4567'
      },
      ScheduledDateTime__c: '2024-12-15T14:30:00Z',
      StageName: 'Product Demo Scheduled',
      Manager_Approved__c: 'Approved',
      Expected_Discount__c: 15,
      Manager_Comments__c: 'High potential client',
      Converted_Lead__r: {
        ProductInterest__c: 'Cloud Storage Solutions'
      }
    },
    {
      Id: '2',
      Name: 'TechStart Inc. Presentation',
      Account: {
        Phone: '+1 (555) 987-6543'
      },
      ScheduledDateTime__c: '2024-12-18T10:00:00Z',
      StageName: 'Product Demo Scheduled',
      Manager_Approved__c: 'Pending',
      Expected_Discount__c: 10,
      Manager_Comments__c: 'Needs technical validation',
      Converted_Lead__r: {
        ProductInterest__c: 'Data Analytics Platform'
      }
    },
    {
      Id: '3',
      Name: 'Global Retail Demo',
      Account: {
        Phone: '+1 (555) 456-7890'
      },
      ScheduledDateTime__c: '2024-12-10T13:00:00Z',
      StageName: 'Completed',
      Manager_Approved__c: 'Approved',
      Expected_Discount__c: 20,
      Manager_Comments__c: 'Successful demo, follow-up required',
      Converted_Lead__r: {
        ProductInterest__c: 'E-commerce Integration'
      }
    },
    {
      Id: '4',
      Name: 'Healthcare Solutions Review',
      Account: {
        Phone: '+1 (555) 234-5678'
      },
      ScheduledDateTime__c: '2024-12-20T09:30:00Z',
      StageName: 'Product Demo Scheduled',
      Manager_Approved__c: 'Rejected',
      Expected_Discount__c: 25,
      Manager_Comments__c: 'Discount too high for budget',
      Converted_Lead__r: {
        ProductInterest__c: 'HIPAA Compliant Storage'
      }
    },
    {
      Id: '5',
      Name: 'Education Sector Demo',
      Account: {
        Phone: '+1 (555) 876-5432'
      },
      ScheduledDateTime__c: '2024-12-12T11:00:00Z',
      StageName: 'Completed',
      Manager_Approved__c: 'Approved',
      Expected_Discount__c: 30,
      Manager_Comments__c: 'Bulk license agreement pending',
      Converted_Lead__r: {
        ProductInterest__c: 'Collaboration Tools'
      }
    }
  ];

  // Load dummy data
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setDemos(dummyDemoData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredDemos = demos.filter((demo) => {
    if (filter === 'scheduled') return demo.StageName === 'Product Demo Scheduled';
    if (filter === 'completed') return demo.StageName === 'Completed';
    return true;
  });

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'Product Demo Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalColor = (approval: string | undefined) => {
    switch (approval) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'Product Demo Scheduled': return <Calendar className="h-3 w-3" />;
      case 'In Progress': return <Clock className="h-3 w-3" />;
      case 'Completed': return <CheckCircle className="h-3 w-3" />;
      case 'Cancelled': return <AlertCircle className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  const stats = {
    total: demos.length,
    scheduled: demos.filter(d => d.StageName === 'Product Demo Scheduled').length,
    completed: demos.filter(d => d.StageName === 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      {/* 🔙 Back Button in Header */}
      <div className="w-full flex justify-center mt-4 mb-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
          style={{ transform: 'translateX(-90px)' }}
        >
          <ArrowLeft className="h-5 w-5 text-gray-800" />
          <h1 className="text-xl font-semibold text-gray-800">Demo Requests</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {/* Total */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </CardContent>
          </Card>
          {/* Scheduled */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.scheduled}</p>
              <p className="text-xs text-gray-600">Scheduled</p>
            </CardContent>
          </Card>
          {/* Completed */}
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
          {['all', 'scheduled', 'completed'].map((key) => (
            <Button
              key={key}
              size="sm"
              variant={filter === key ? 'default' : 'outline'}
              onClick={() => setFilter(key as any)}
              className={`rounded-xl ${filter === key ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50 text-gray-900'}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} ({stats[key as keyof typeof stats]})
            </Button>
          ))}
        </div>

        {/* Demo List */}
        <div className="space-y-4">
          {filteredDemos.map((demo) => {
            const datetime = demo.ScheduledDateTime__c ? new Date(demo.ScheduledDateTime__c) : null;
            const dateStr = datetime?.toLocaleDateString() || 'N/A';
            const timeStr = datetime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'N/A';

            return (
              <Card key={demo.Id} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-5" onClick={() => navigate(`/demo-details/${demo.Id}`)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{demo.Name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{demo.Account?.Phone || 'N/A'}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={`${getStatusColor(demo.StageName)} font-medium rounded-full px-3 py-1 flex items-center gap-1`}>
                        {getStatusIcon(demo.StageName)}
                        {demo.StageName}
                      </Badge>
                      <Badge className={`${getApprovalColor(demo.Manager_Approved__c)} font-medium rounded-full px-2 py-1 text-xs`}>
                        {demo.Manager_Approved__c || 'Pending'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium text-gray-900">{dateStr} at {timeStr}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Interest:</span>
                      <span className="font-medium text-gray-900">{demo.Converted_Lead__r?.ProductInterest__c || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Expected Discount:</span>
                      <span className="font-medium text-gray-900">{demo.Expected_Discount__c ? `${demo.Expected_Discount__c}%` : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Scheduled for: {dateStr}</span>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 font-medium">View Details →</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
