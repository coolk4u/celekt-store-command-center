
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Eye, IndianRupee } from 'lucide-react';

const ApprovedSales = () => {
  const navigate = useNavigate();
  
  const [approvedSales] = useState([
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      phone: '+91 9876543210',
      device: 'iPhone 15 Pro',
      originalPrice: 134900,
      discount: 10000,
      finalPrice: 124900,
      managerNotes: 'Approved for 7% discount. Customer is a repeat buyer.',
      approvedDate: '2024-07-15',
      status: 'Ready for Sale'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      phone: '+91 9876543211',
      device: 'Samsung Galaxy S24',
      originalPrice: 79999,
      discount: 5000,
      finalPrice: 74999,
      managerNotes: 'Approved for festival discount. Valid till month end.',
      approvedDate: '2024-07-16',
      status: 'Ready for Sale'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      phone: '+91 9876543212',
      device: 'OnePlus 12',
      originalPrice: 64999,
      discount: 3000,
      finalPrice: 61999,
      managerNotes: 'Student discount approved with valid ID verification.',
      approvedDate: '2024-07-17',
      status: 'Sold'
    }
  ]);

  const handleViewDetails = (saleId: number) => {
    navigate(`/approved-sales/${saleId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready for Sale':
        return 'bg-green-100 text-green-800';
      case 'Sold':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="Approved Sales" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-gray-900">
              <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
              Approved Sales ({approvedSales.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {approvedSales.map((sale) => (
              <Card key={sale.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{sale.customerName}</h3>
                      <p className="text-sm text-gray-600">{sale.phone}</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{sale.device}</p>
                    </div>
                    <Badge className={getStatusColor(sale.status)}>
                      {sale.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="flex items-center text-gray-900">
                        <IndianRupee className="h-3 w-3" />
                        {sale.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="flex items-center text-red-600">
                        -<IndianRupee className="h-3 w-3" />
                        {sale.discount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gray-900">Final Price:</span>
                      <span className="flex items-center text-green-600">
                        <IndianRupee className="h-3 w-3" />
                        {sale.finalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Manager Notes:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{sale.managerNotes}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Approved: {new Date(sale.approvedDate).toLocaleDateString()}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(sale.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ApprovedSales;
