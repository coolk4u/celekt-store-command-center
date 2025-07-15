
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, AlertTriangle, Megaphone, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const summaryCards = [
    {
      title: "Today's Audit",
      value: "Not Started",
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: () => navigate('/audit')
    },
    {
      title: "Open Issues",
      value: "3",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      action: () => navigate('/issues')
    },
    {
      title: "Unread Announcements",
      value: "2",
      icon: Megaphone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => navigate('/announcements')
    },
    {
      title: "This Month's Score",
      value: "92%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: () => {}
    }
  ];

  const quickActions = [
    { title: 'Start Daily Audit', action: () => navigate('/audit'), color: 'bg-red-600' },
    { title: 'Raise Issue', action: () => navigate('/raise-issue'), color: 'bg-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title={`Hello ${user?.name?.split(' ')[0] || 'Manager'}`} showProfile />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            You've got <span className="text-red-600">4 tasks</span> today
          </h2>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          {summaryCards.map((card, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={card.action}>
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center mb-3`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-lg font-semibold text-foreground">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className={`w-full ${action.color} hover:opacity-90 text-white`}
                size="lg"
              >
                {action.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Yesterday's audit completed</p>
                  <p className="text-xs text-muted-foreground">Score: 95% - Excellent work!</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">AC issue raised</p>
                  <p className="text-xs text-muted-foreground">Status: In Progress</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New announcement</p>
                  <p className="text-xs text-muted-foreground">Festival offers guidelines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
