import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, AlertTriangle } from 'lucide-react';

interface Issue {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dateRaised: string;
}

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);

  // Step 1: Fetch access token
  useEffect(() => {
    const fetchToken = async () => {
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
      } catch (err) {
        console.error('Error fetching access token:', err);
      }
    };

    fetchToken();
  }, []);

  // Step 2: Fetch Case record by ID
  useEffect(() => {
    if (!accessToken || !id) return;

    const fetchIssue = async () => {
      const query = `
        SELECT Id, Subject, Description, Status, Priority, CreatedDate, Category__c
        FROM Case WHERE Id = '${id}'
      `.replace(/\s+/g, '+');

      const url = `https://4cecloudlabscustomerdemos-dev-ed.develop.my.salesforce.com/services/data/v62.0/query?q=${query}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const record = response.data.records[0];

        if (record) {
          const mapped: Issue = {
            id: record.Id,
            category: record.Category__c || 'General',
            title: record.Subject || 'No Title',
            description: record.Description || 'No Description',
            status: record.Status || 'Open',
            priority: record.Priority || 'Medium',
            dateRaised: record.CreatedDate,
          };
          setIssue(mapped);
        }
      } catch (error) {
        console.error('Error fetching issue details:', error);
      }
    };

    fetchIssue();
  }, [accessToken, id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!issue) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Issue Details" />

      <div className="max-w-md mx-auto p-4 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/issues')}
          className="mb-4 p-0 h-auto hover:bg-gray-100 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="font-medium text-gray-900">Back to Issues</span>
        </Button>

        {/* Issue Info */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl text-gray-900">{issue.title}</CardTitle>
                </div>
                <p className="text-sm font-medium text-gray-700">{issue.category}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={`${getStatusColor(issue.status)} font-medium rounded-full px-3 py-1`}>
                  {issue.status}
                </Badge>
                <Badge variant="outline" className={`${getPriorityColor(issue.priority)} font-medium rounded-full px-3 py-1`}>
                  {issue.priority} Priority
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-bold mb-3 text-gray-900">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{issue.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Date Raised</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(issue.dateRaised).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Raised By</p>
                  <p className="text-sm font-bold text-gray-900">System</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default IssueDetails;
