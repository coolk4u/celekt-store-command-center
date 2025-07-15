
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ClipboardCheck, AlertTriangle, Megaphone, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
      alt: "Latest Mobile Technology",
      title: "Latest Mobile Technology"
    },
    {
      src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=400&fit=crop",
      alt: "Premium Mobile Collection",
      title: "Premium Mobile Collection"
    },
    {
      src: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop",
      alt: "Mobile Innovation",
      title: "Mobile Innovation"
    }
  ];

  const summaryCards = [
    {
      title: "Today's Audit",
      value: "Not Started",
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      action: () => navigate('/audit')
    },
    {
      title: "Open Issues",
      value: "3",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      action: () => navigate('/issues')
    },
    {
      title: "Announcements",
      value: "2 New",
      icon: Megaphone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      action: () => navigate('/announcements')
    },
    {
      title: "Monthly Score",
      value: "92%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      action: () => {}
    }
  ];

  const quickActions = [
    { 
      title: 'Start Daily Audit', 
      action: () => navigate('/audit'), 
      gradient: 'from-primary to-red-600',
      icon: ClipboardCheck
    },
    { 
      title: 'Raise New Issue', 
      action: () => navigate('/raise-issue'), 
      gradient: 'from-gray-600 to-gray-700',
      icon: AlertTriangle
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title={`Hello, ${user?.name?.split(' ')[0] || 'Manager'}!`} showProfile />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Carousel Section */}
        <div className="relative">
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-48 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl p-4">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        

        {/* Summary Cards */}
        {/* Welcome Section */}
        <div className="text-center py-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            You have <span className="text-primary font-bold">4 tasks</span> today
          </h2>
          <p className="text-sm text-muted-foreground">Keep up the great work!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {summaryCards.map((card, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:-translate-y-1" 
              onClick={card.action}
            >
              <CardContent className="p-4">
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-3`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1 font-medium">{card.title}</p>
                <p className="text-lg font-bold text-gray-900">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className={`w-full h-14 bg-gradient-to-r ${action.gradient} hover:shadow-lg text-white font-medium rounded-2xl transition-all duration-200 hover:-translate-y-0.5`}
                size="lg"
              >
                <action.icon className="h-5 w-5 mr-2" />
                {action.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Yesterday's audit completed</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Score: 95% - Excellent work!</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">AC maintenance issue raised</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Status: In Progress</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">New announcement posted</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Festival offers guidelines</p>
                </div>
                <span className="text-xs text-muted-foreground">2d ago</span>
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
