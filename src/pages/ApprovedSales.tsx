// ✅ ApprovedSales.tsx (updated to fetch live data from Salesforce with dynamic navigation)

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Eye, IndianRupee } from 'lucide-react';

const ApprovedSales = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [approvedSales, setApprovedSales] = useState<any[]>([]);

  const getAccessToken = async () => {
    const url = 'https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/oauth2/token';
    const clientId = '3MVG9BBZP0d0A9KAcJnBKSzCfrRE_gMs1F.S7Uw0j_NByrWXPE6QjuPbeOqXjD7ud8_N3h5OFhGobUpSI.nRR';
    const clientSecret = 'B36DBB1474A5226DEE9C3696BA1080A63AD857EBF1735E4816D7931E8EA79A6C';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await axios.post(url, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    setAccessToken(response.data.access_token);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchSales = async () => {
      const query = `
        SELECT Id, Name, Account.Name, Account.Phone, Amount, StageName,
               Manager_Comments__c, Expected_Discount__c, Approved_Date__c,
               Converted_Lead__r.ProductInterest__c
        FROM Opportunity
        WHERE AccountId != NULL AND Converted_Lead__c != NULL AND StageName = 'Discount Approval'
      `.replace(/\s+/g, '+');

      const queryUrl = `https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=${query}`;
      const response = await axios.get(queryUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setApprovedSales(response.data.records);
    };

    fetchSales();
  }, [accessToken]);

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
              <Card key={sale.Id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{sale.Account?.Name}</h3>
                      <p className="text-sm text-gray-600">{sale.Account?.Phone}</p>
                      <p className="text-sm font-medium text-gray-800 mt-1">{sale.Converted_Lead__r?.ProductInterest__c}</p>
                    </div>
                    <Badge className={getStatusColor(sale.StageName)}>{sale.StageName}</Badge>
                  </div>

<div className="space-y-2 mb-4">
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">Original Price:</span>
    <span className="flex items-center text-gray-900">
      <IndianRupee className="h-3 w-3" />
      {(sale.Amount || 0).toLocaleString()}
    </span>
  </div>

  <div className="flex justify-between text-sm">
    <span className="text-gray-600">Discount (%):</span>
    <span className="flex items-center text-red-600">
      {(sale.Expected_Discount__c || 0)}%
    </span>
  </div>

  <div className="flex justify-between text-sm font-semibold">
    <span className="text-gray-900">Final Price:</span>
    <span className="flex items-center text-green-600">
      <IndianRupee className="h-3 w-3" />
      {(
        (sale.Amount || 0) * (1 - ((sale.Expected_Discount__c || 0) / 100))
      ).toFixed(0)}
    </span>
  </div>
</div>


                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Manager Notes:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{sale.Manager_Comments__c}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Approved: {sale.Approved_Date__c ? new Date(sale.Approved_Date__c).toLocaleDateString() : 'N/A'}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(sale.Id)}
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
