import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  raisedBy: string;
}

// Dummy data matching the structure
const dummyIssues: Issue[] = [
  {
    id: 'ISS-001',
    category: 'Technical',
    title: 'Login authentication failure',
    description: 'Users are unable to log in to the mobile application. The authentication service returns a 500 error when attempting to validate credentials. This affects all users trying to access their accounts.',
    status: 'Open',
    priority: 'High',
    dateRaised: '2024-03-15T10:30:00Z',
    raisedBy: 'John Smith'
  },
  {
    id: 'ISS-002',
    category: 'Feature Request',
    title: 'Add dark mode support',
    description: 'Users have requested a dark mode feature for better nighttime usage and reduced eye strain. This would include theme switching options in settings.',
    status: 'In Progress',
    priority: 'Medium',
    dateRaised: '2024-03-10T14:20:00Z',
    raisedBy: 'Sarah Johnson'
  },
  {
    id: 'ISS-003',
    category: 'Bug',
    title: 'Profile picture upload fails',
    description: 'When users try to upload profile pictures larger than 2MB, the application crashes without error message. Need to implement proper file size validation and error handling.',
    status: 'Closed',
    priority: 'Medium',
    dateRaised: '2024-03-05T09:15:00Z',
    raisedBy: 'Mike Chen'
  },
  {
    id: 'ISS-004',
    category: 'Performance',
    title: 'Slow dashboard loading',
    description: 'The main dashboard takes 8-10 seconds to load on average. Need to optimize database queries and implement caching for frequently accessed data.',
    status: 'Open',
    priority: 'High',
    dateRaised: '2024-03-18T11:45:00Z',
    raisedBy: 'System'
  },
  {
    id: 'ISS-005',
    category: 'UI/UX',
    title: 'Improve navigation menu',
    description: 'Current navigation is confusing for new users. Suggested improvements include better iconography, clearer labels, and a more intuitive layout.',
    status: 'In Progress',
    priority: 'Low',
    dateRaised: '2024-03-12T16:30:00Z',
    raisedBy: 'Alex Rodriguez'
  }
];

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);

  // Fetch issue from dummy data
  useEffect(() => {
    if (!id) return;

    // Simulate API delay
    const timer = setTimeout(() => {
      const foundIssue = dummyIssues.find(issue => issue.id === id);
      setIssue(foundIssue || null);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

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

  if (!issue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
        <Header title="Issue Details" />
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading issue details...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

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
                    {new Date(issue.dateRaised).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
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

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            variant="outline" 
            className="flex-1 border-gray-300"
            onClick={() => navigate(`/edit-issue/${issue.id}`)}
          >
            Edit Issue
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => alert(`Action for ${issue.id} triggered`)}
          >
            Take Action
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default IssueDetails;
