
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, MessageSquare, AlertTriangle } from 'lucide-react';

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
                  <p className="text-sm font-bold text-gray-900">{new Date(issue.dateRaised).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Raised By</p>
                  <p className="text-sm font-bold text-gray-900">{issue.raisedBy}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-gray-900">
              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
              Updates & Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issue.updates.map((update, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-gray-900">{update.by}</p>
                      <p className="text-xs text-gray-500 font-medium">
                        {new Date(update.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {issue.status !== 'Closed' && (
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="space-y-3">
                <Button variant="outline" className="w-full h-12 border-gray-200 hover:bg-gray-50 font-medium rounded-xl text-gray-900">
                  Add Update
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-xl transition-all duration-200"
                >
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
