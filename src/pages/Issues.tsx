
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, AlertTriangle, Clock } from 'lucide-react';

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

  const getPriorityIcon = (priority: string) => {
    if (priority === 'High') return <AlertTriangle className="h-3 w-3" />;
    return <Clock className="h-3 w-3" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Issues" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Action Button */}
        <Button
          onClick={() => navigate('/raise-issue')}
          className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 h-14 rounded-2xl"
        >
          <Plus className="h-5 w-5 mr-2" />
          Raise New Issue
        </Button>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={`rounded-xl ${filter === 'all' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            All ({issues.length})
          </Button>
          <Button
            variant={filter === 'open' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('open')}
            className={`rounded-xl ${filter === 'open' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            Open ({issues.filter(i => i.status !== 'Closed').length})
          </Button>
          <Button
            variant={filter === 'closed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('closed')}
            className={`rounded-xl ${filter === 'closed' ? 'bg-gradient-to-r from-primary to-red-600 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            Closed ({issues.filter(i => i.status === 'Closed').length})
          </Button>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-5" onClick={() => navigate(`/issues/${issue.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{issue.title}</h3>
                    <p className="text-sm font-medium text-gray-600 mb-2">{issue.category}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`${getStatusColor(issue.status)} font-medium rounded-full px-3 py-1`}>
                      {issue.status}
                    </Badge>
                    <Badge variant="outline" className={`${getPriorityColor(issue.priority)} font-medium rounded-full px-3 py-1 flex items-center gap-1`}>
                      {getPriorityIcon(issue.priority)}
                      {issue.priority}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {issue.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    Raised: {new Date(issue.dateRaised).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 font-medium">
                    View Details →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground font-medium">No issues found</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Issues;
