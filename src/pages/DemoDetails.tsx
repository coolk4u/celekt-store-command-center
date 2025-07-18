
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, User, Smartphone, Percent, MessageSquare, CheckCircle } from 'lucide-react';

const DemoDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const [demoData, setDemoData] = useState({
    id: '1',
    customerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    scheduledDate: '2024-01-18',
    scheduledTime: '14:00',
    status: 'Scheduled' as 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled',
    productInterest: 'iPhone 15 Pro',
    discountExpected: '10',
    managerApproval: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
    managerComment: ''
  });

  const handleApprovalChange = (approval: string) => {
    setDemoData(prev => ({
      ...prev,
      managerApproval: approval as 'Pending' | 'Approved' | 'Rejected'
    }));
    toast.success('Manager approval updated!');
  };

  const handleCommentChange = (comment: string) => {
    setDemoData(prev => ({
      ...prev,
      managerComment: comment
    }));
  };

  const handleDiscountChange = (discount: string) => {
    setDemoData(prev => ({
      ...prev,
      discountExpected: discount
    }));
    toast.success('Discount updated!');
  };

  const handleStatusChange = (status: string) => {
    setDemoData(prev => ({
      ...prev,
      status: status as 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
    }));
    toast.success('Demo status updated!');
  };

  const handleProductInterestChange = (product: string) => {
    setDemoData(prev => ({
      ...prev,
      productInterest: product
    }));
    toast.success('Product interest updated!');
  };

  const handleMarkCompleted = () => {
    setDemoData(prev => ({
      ...prev,
      status: 'Completed'
    }));
    toast.success('Demo marked as completed!');
  };

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

        {/* Customer Info & Manager Details Combined */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-gray-900">
              <div className="flex items-center">
                <User className="h-6 w-6 mr-2 text-primary" />
                Customer & Demo Information
              </div>
              <Badge className={`${getStatusColor(demoData.status)} font-medium rounded-full px-3 py-1`}>
                {demoData.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-gray-600 text-sm">Name</Label>
                <p className="font-medium text-gray-900">{demoData.customerName}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Phone</Label>
                <p className="font-medium text-gray-900">{demoData.phone}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Email</Label>
                <p className="font-medium text-gray-900">{demoData.email}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Scheduled Date & Time</Label>
                <p className="font-medium text-gray-900">
                  {new Date(demoData.scheduledDate).toLocaleDateString()} at {demoData.scheduledTime}
                </p>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Product Interest</Label>
                <Input
                  value={demoData.productInterest}
                  onChange={(e) => handleProductInterestChange(e.target.value)}
                  className="border-gray-200 bg-white text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Expected Discount (%)</Label>
                <Input
                  type="number"
                  value={demoData.discountExpected}
                  onChange={(e) => handleDiscountChange(e.target.value)}
                  className="border-gray-200 bg-white text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Manager Approval</Label>
                <Select onValueChange={handleApprovalChange} value={demoData.managerApproval}>
                  <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Pending" className="text-gray-900">Pending</SelectItem>
                    <SelectItem value="Approved" className="text-gray-900">Approved</SelectItem>
                    <SelectItem value="Rejected" className="text-gray-900">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Manager Comment</Label>
                <Textarea
                  value={demoData.managerComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  placeholder="Add manager comment..."
                  className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-500"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 text-sm">Demo Status</Label>
                <Select onValueChange={handleStatusChange} value={demoData.status}>
                  <SelectTrigger className="border-gray-200 bg-white text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Scheduled" className="text-gray-900">Scheduled</SelectItem>
                    <SelectItem value="In Progress" className="text-gray-900">In Progress</SelectItem>
                    <SelectItem value="Completed" className="text-gray-900">Completed</SelectItem>
                    <SelectItem value="Cancelled" className="text-gray-900">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {demoData.status !== 'Completed' && (
          <div className="space-y-3">
            <Button
              onClick={handleMarkCompleted}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 h-12 rounded-xl"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Mark Demo Completed
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DemoDetails;
