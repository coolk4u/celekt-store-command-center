
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Camera, IndianRupee, Receipt, Save } from 'lucide-react';

const ApprovedSalesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [billData, setBillData] = useState({
    billNumber: '',
    billAmount: '',
    billPhoto: null as File | null
  });

  // Mock data - in real app, fetch based on ID
  const saleDetails = {
    id: parseInt(id || '1'),
    customerName: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    device: 'iPhone 15 Pro',
    color: 'Natural Titanium',
    storage: '256GB',
    originalPrice: 134900,
    discount: 10000,
    finalPrice: 124900,
    managerNotes: 'Approved for 7% discount. Customer is a repeat buyer. Valid for 7 days.',
    approvedDate: '2024-07-15',
    approvedBy: 'Manager - Suresh Singh',
    status: 'Ready for Sale'
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBillData({ ...billData, billPhoto: file });
      toast.success('Bill photo captured successfully!');
    }
  };

  const handleSaveBill = () => {
    if (!billData.billNumber || !billData.billAmount) {
      toast.error('Please fill in bill number and amount');
      return;
    }

    console.log('Bill data saved:', {
      saleId: id,
      ...billData,
      billPhotoName: billData.billPhoto?.name
    });
    
    toast.success('Bill details saved successfully!');
    navigate('/approved-sales');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Sale Details" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/approved-sales')}
          className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Approved Sales
        </Button>

        {/* Customer Details */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-gray-900">
              <span>Customer Details</span>
              <Badge className="bg-green-100 text-green-800">
                {saleDetails.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium text-gray-900">{saleDetails.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium text-gray-900">{saleDetails.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Email:</p>
                <p className="font-medium text-gray-900">{saleDetails.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device Details */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900">Device Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Device:</p>
                <p className="font-medium text-gray-900">{saleDetails.device}</p>
              </div>
              <div>
                <p className="text-gray-600">Color:</p>
                <p className="font-medium text-gray-900">{saleDetails.color}</p>
              </div>
              <div>
                <p className="text-gray-600">Storage:</p>
                <p className="font-medium text-gray-900">{saleDetails.storage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Details */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900">Pricing Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Original Price:</span>
              <span className="flex items-center text-gray-900">
                <IndianRupee className="h-3 w-3" />
                {saleDetails.originalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount:</span>
              <span className="flex items-center text-red-600">
                -<IndianRupee className="h-3 w-3" />
                {saleDetails.discount.toLocaleString()}
              </span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900">Final Price:</span>
                <span className="flex items-center text-green-600">
                  <IndianRupee className="h-4 w-4" />
                  {saleDetails.finalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manager Approval */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900">Manager Approval</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Approved By:</p>
              <p className="font-medium text-gray-900">{saleDetails.approvedBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Approval Date:</p>
              <p className="font-medium text-gray-900">
                {new Date(saleDetails.approvedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Notes:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{saleDetails.managerNotes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Bill Capture */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-900">
              <Receipt className="h-5 w-5 mr-2" />
              Bill Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billNumber" className="text-gray-900 font-medium">
                Bill Number *
              </Label>
              <Input
                id="billNumber"
                placeholder="Enter bill number"
                value={billData.billNumber}
                onChange={(e) => setBillData({...billData, billNumber: e.target.value})}
                className="border-gray-200 bg-white text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billAmount" className="text-gray-900 font-medium">
                Bill Amount *
              </Label>
              <Input
                id="billAmount"
                type="number"
                placeholder="Enter bill amount"
                value={billData.billAmount}
                onChange={(e) => setBillData({...billData, billAmount: e.target.value})}
                className="border-gray-200 bg-white text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billPhoto" className="text-gray-900 font-medium">
                Bill Photo
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="billPhoto"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoCapture}
                  className="border-gray-200 bg-white text-gray-900 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('billPhoto')?.click()}
                  className="shrink-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              {billData.billPhoto && (
                <p className="text-sm text-green-600">
                  Photo captured: {billData.billPhoto.name}
                </p>
              )}
            </div>

            <Button
              onClick={handleSaveBill}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 h-12 rounded-xl"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Bill Details
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ApprovedSalesDetails;
