
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Eye, IndianRupee } from 'lucide-react';

const ApprovedSales = () => {
  const navigate = useNavigate();
  const [approvedSales, setApprovedSales] = useState<any[]>([]);

  // Dummy data in JSON format
  const dummySalesData = [
    {
      id: '1',
      name: 'Enterprise Deal - Q4',
      account: {
        name: 'TechCorp Solutions',
        phone: '+91 9876543210'
      },
      amount: 500000,
      stageName: 'Discount Approval',
      managerComments: 'Approved with 15% discount as per volume commitment. Customer has good payment history.',
      expectedDiscount: 15,
      approvedDate: '2024-12-15',
      convertedLead: {
        productInterest: 'Enterprise Cloud Suite'
      }
    },
    {
      id: '2',
      name: 'SMB Package Deal',
      account: {
        name: 'StartUp Innovations',
        phone: '+91 8765432109'
      },
      amount: 150000,
      stageName: 'Discount Approval',
      managerComments: 'Approved for 10% discount as introductory offer. Potential for upsell in Q2.',
      expectedDiscount: 10,
      approvedDate: '2024-12-14',
      convertedLead: {
        productInterest: 'Business Starter Pack'
      }
    },
    {
      id: '3',
      name: 'Annual Renewal Contract',
      account: {
        name: 'Global Retail Chain',
        phone: '+91 7654321098'
      },
      amount: 750000,
      stageName: 'Discount Approval',
      managerComments: '20% discount approved for 3-year commitment. Customer is a strategic partner.',
      expectedDiscount: 20,
      approvedDate: '2024-12-13',
      convertedLead: {
        productInterest: 'Premium Support Package'
      }
    },
    {
      id: '4',
      name: 'New Implementation Project',
      account: {
        name: 'Healthcare Systems Ltd',
        phone: '+91 6543210987'
      },
      amount: 300000,
      stageName: 'Discount Approval',
      managerComments: 'Approved with 12% discount for pilot project. Good reference account potential.',
      expectedDiscount: 12,
      approvedDate: '2024-12-12',
      convertedLead: {
        productInterest: 'Custom Implementation'
      }
    }
  ];

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setApprovedSales(dummySalesData);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleViewDetails = (id: string) => navigate(`/approved-sales/${id}`);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Discount Approval': return 'bg-green-100 text-green-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
                      <h3 className="font-semibold text-gray-900">{sale.account?.name}</h3>
                      <p className="text-sm text-gray-600">{sale.account?.phone}</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">
                        {sale.convertedLead?.productInterest}
                      </p>
                    </div>
                    <Badge className={getStatusColor(sale.stageName)}>
                      {sale.stageName}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="flex items-center text-gray-900">
                        <IndianRupee className="h-3 w-3" />
                        {(sale.amount || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount (%):</span>
                      <span className="flex items-center text-red-600">
                        {(sale.expectedDiscount || 0)}%
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gray-900">Final Price:</span>
                      <span className="flex items-center text-green-600">
                        <IndianRupee className="h-3 w-3" />
                        {(
                          (sale.amount || 0) * (1 - ((sale.expectedDiscount || 0) / 100))
                        ).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Manager Notes:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {sale.managerComments}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Approved: {sale.approvedDate ? new Date(sale.approvedDate).toLocaleDateString() : 'N/A'}
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
