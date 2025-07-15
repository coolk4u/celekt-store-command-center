
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, MessageSquare } from 'lucide-react';

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on ID
  const issue = {
    id: '1',
    category: 'Air Conditioning',
    title: 'AC not cooling properly',
    description: 'The main hall AC unit is not maintaining the desired temperature. Customers are complaining about the heat, especially during peak hours. The unit seems to be running but not cooling effectively.',
    status: 'In Progress',
    priority: 'High',
    dateRaised: '2024-01-15',
    raisedBy: 'Rajesh Kumar',
    updates: [
      {
        date: '2024-01-15',
        message: 'Issue reported by store manager',
        by: 'System'
      },
      {
        date: '2024-01-16',
        message: 'Technician assigned. Will visit on 17th Jan.',
        by: 'Central Team'
      },
      {
        date: '2024-01-17',
        message: 'Technician visited. Filter needs replacement.',
        by: 'Technician'
      }
    ]
  };

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Issue Details" />
      
      <div className="max-w-md mx-auto p-4 space-y-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/issues')}
          className="mb-4 p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Issues
        </Button>

        {/* Issue Info */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{issue.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{issue.category}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={getStatusColor(issue.status)}>
                  {issue.status}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                  {issue.priority} Priority
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{issue.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date Raised</p>
                  <p className="text-sm font-medium">{new Date(issue.dateRaised).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Raised By</p>
                  <p className="text-sm font-medium">{issue.raisedBy}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Updates & Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issue.updates.map((update, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{update.by}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(update.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {issue.status !== 'Closed' && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Add Update
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default IssueDetails;
