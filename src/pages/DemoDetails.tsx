// React & routing hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Custom UI Components
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Utils
import { toast } from 'sonner';
import { ArrowLeft, User, CheckCircle } from 'lucide-react';

// --- Type Declaration ---
interface OpportunityData {
  Id: string;
  Name: string;
  StageName: string;
  ScheduledDateTime__c?: string;
  Expected_Discount__c?: number;
  Demo_Status__c?: string;
  Account?: {
    Phone?: string;
  };
  Converted_Lead__r?: {
    ProductInterest__c?: string;
  };
}

// --- Dummy Data ---
const DUMMY_OPPORTUNITIES: OpportunityData[] = [
  {
    Id: '1',
    Name: 'Acme Corp Demo',
    StageName: 'Demo Scheduled',
    ScheduledDateTime__c: '2024-01-15T14:30:00Z',
    Expected_Discount__c: 15,
    Demo_Status__c: 'Scheduled',
    Account: {
      Phone: '+1 (555) 123-4567'
    },
    Converted_Lead__r: {
      ProductInterest__c: 'Enterprise Suite'
    }
  },
  {
    Id: '2',
    Name: 'TechStart Inc Demo',
    StageName: 'Prospecting',
    ScheduledDateTime__c: '2024-01-20T10:00:00Z',
    Expected_Discount__c: 10,
    Demo_Status__c: 'Scheduled',
    Account: {
      Phone: '+1 (555) 987-6543'
    },
    Converted_Lead__r: {
      ProductInterest__c: 'Basic Package'
    }
  },
  {
    Id: '3',
    Name: 'Global Solutions Demo',
    StageName: 'Negotiation',
    ScheduledDateTime__c: '2024-01-25T16:45:00Z',
    Expected_Discount__c: 20,
    Demo_Status__c: 'In Progress',
    Account: {
      Phone: '+1 (555) 456-7890'
    },
    Converted_Lead__r: {
      ProductInterest__c: 'Premium Package'
    }
  }
];

// --- Main Component ---
const DemoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [opportunity, setOpportunity] = useState<OpportunityData | null>(null);
  const [managerApproval, setManagerApproval] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [managerComment, setManagerComment] = useState('');
  const [demoStatus, setDemoStatus] = useState<string>('Scheduled');
  const [expectedDiscount, setExpectedDiscount] = useState<string>('');

  const fetchOpportunityDetails = () => {
    if (!id) return;

    // Find opportunity from dummy data
    const foundOpportunity = DUMMY_OPPORTUNITIES.find(opp => opp.Id === id);
    
    if (foundOpportunity) {
      setOpportunity(foundOpportunity);
      setDemoStatus(foundOpportunity.Demo_Status__c || 'Scheduled');
      setExpectedDiscount(foundOpportunity.Expected_Discount__c?.toString() || '');
    } else {
      // Fallback dummy data if ID not found
      setOpportunity({
        Id: id,
        Name: 'Demo Request',
        StageName: 'Scheduled',
        ScheduledDateTime__c: new Date().toISOString(),
        Expected_Discount__c: 0,
        Demo_Status__c: 'Scheduled',
        Account: {
          Phone: '+1 (555) 000-0000'
        },
        Converted_Lead__r: {
          ProductInterest__c: 'Not Specified'
        }
      });
    }
  };

  const handleMarkCompleted = () => {
    if (!id) return;

    // Simulate API call delay
    setTimeout(() => {
      toast.success('Demo marked as completed and updated!');
      // Redirect after success
      navigate('/demo-requests');
    }, 500);
  };

  useEffect(() => {
    fetchOpportunityDetails();
  }, [id]);

  const formattedDateTime = opportunity?.ScheduledDateTime__c
    ? new Date(opportunity.ScheduledDateTime__c).toLocaleString()
    : '';

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Demo Details" />

      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/demo-requests')}
          className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Demo Requests
        </Button>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-gray-900">
              <div className="flex items-center">
                <User className="h-6 w-6 mr-2 text-primary" />
                Customer & Demo Information
              </div>
              {opportunity && (
                <Badge className="bg-gray-200 text-gray-800 font-medium rounded-full px-3 py-1">
                  {opportunity.StageName}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-gray-600 text-sm">Demo Name</Label>
                <p className="font-medium text-gray-900">{opportunity?.Name}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Phone</Label>
                <p className="font-medium text-gray-900">{opportunity?.Account?.Phone || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Scheduled Date & Time</Label>
                <p className="font-medium text-gray-900">{formattedDateTime}</p>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div>
                <Label className="text-gray-600 text-sm">Product Interest</Label>
                <p className="font-medium text-gray-900">
                  {opportunity?.Converted_Lead__r?.ProductInterest__c || 'N/A'}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Expected Discount (%)</Label>
                <Input
                  value={expectedDiscount}
                  onChange={(e) => setExpectedDiscount(e.target.value)}
                  placeholder="Enter expected discount"
                  className="border-gray-200 bg-white text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Demo Status</Label>
                <Select value={demoStatus} onValueChange={setDemoStatus}>
                  <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Manager Approval</Label>
                <Select value={managerApproval} onValueChange={(val) => setManagerApproval(val as any)}>
                  <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Manager Comment</Label>
                <Textarea
                  value={managerComment}
                  onChange={(e) => setManagerComment(e.target.value)}
                  placeholder="Add manager comment..."
                  className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-500"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={handleMarkCompleted}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 h-12 rounded-xl"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark Demo Completed
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DemoDetails;
