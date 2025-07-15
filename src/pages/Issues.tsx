
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter } from 'lucide-react';

interface Issue {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  dateRaised: string;
}

const Issues = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  
  const [issues] = useState<Issue[]>([
    {
      id: '1',
      category: 'Air Conditioning',
      title: 'AC not cooling properly',
      description: 'Main hall AC unit not maintaining temperature',
      status: 'In Progress',
      priority: 'High',
      dateRaised: '2024-01-15'
    },
    {
      id: '2',
      category: 'Electrical',
      title: 'Display light flickering',
      description: 'LED display lights are flickering intermittently',
      status: 'Open',
      priority: 'Medium',
      dateRaised: '2024-01-14'
    },
    {
      id: '3',
      category: 'Security Systems',
      title: 'CCTV camera issue',
      description: 'Camera 3 showing blurry image',
      status: 'Open',
      priority: 'Low',
      dateRaised: '2024-01-13'
    },
    {
      id: '4',
      category: 'Cleanliness',
      title: 'Floor tiles cracked',
      description: 'Multiple tiles near entrance are cracked',
      status: 'Closed',
      priority: 'Medium',
      dateRaised: '2024-01-10'
    }
  ]);

  const filteredIssues = issues.filter(issue => {
    if (filter === 'open') return issue.status !== 'Closed';
    if (filter === 'closed') return issue.status === 'Closed';
    return true;
  });

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
      <Header title="Issues" />
      
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={() => navigate('/raise-issue')}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Raise Issue
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            All ({issues.length})
          </Button>
          <Button
            variant={filter === 'open' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('open')}
            className={filter === 'open' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            Open ({issues.filter(i => i.status !== 'Closed').length})
          </Button>
          <Button
            variant={filter === 'closed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('closed')}
            className={filter === 'closed' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            Closed ({issues.filter(i => i.status === 'Closed').length})
          </Button>
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4" onClick={() => navigate(`/issues/${issue.id}`)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{issue.category}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {issue.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Raised: {new Date(issue.dateRaised).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No issues found</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Issues;
