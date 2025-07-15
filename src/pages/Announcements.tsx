
import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Eye, Megaphone } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  priority: 'normal' | 'important';
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Festival Offers - New Guidelines',
      content: 'Please ensure all festival offer banners are displayed prominently. New pricing guidelines attached. Offers valid until month end.',
      date: '2024-01-16',
      isRead: false,
      priority: 'important'
    },
    {
      id: '2',
      title: 'Store Hours Extension',
      content: 'Due to increased footfall, store hours will be extended till 10 PM on weekends starting this Saturday.',
      date: '2024-01-15',
      isRead: false,
      priority: 'important'
    },
    {
      id: '3',
      title: 'New Product Launch - iPhone 15',
      content: 'iPhone 15 series now available. Please update display units and pricing. Training session scheduled for tomorrow.',
      date: '2024-01-14',
      isRead: true,
      priority: 'normal'
    },
    {
      id: '4',
      title: 'Monthly Sales Meeting',
      content: 'Monthly sales review meeting scheduled for 20th Jan at 3 PM. Please prepare sales reports and inventory status.',
      date: '2024-01-13',
      isRead: true,
      priority: 'normal'
    },
    {
      id: '5',
      title: 'Security Protocol Update',
      content: 'New security protocols effective immediately. Ensure CCTV is operational and cash handling procedures are followed.',
      date: '2024-01-12',
      isRead: true,
      priority: 'important'
    }
  ]);

  const markAsRead = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, isRead: true } : ann
    ));
  };

  const unreadCount = announcements.filter(ann => !ann.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="Announcements" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bell className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread Announcements</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                </div>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAnnouncements(prev => prev.map(ann => ({ ...ann, isRead: true })));
                  }}
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-medium rounded-xl"
                >
                  Mark All Read
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1 ${
                !announcement.isRead ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => markAsRead(announcement.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Megaphone className="h-4 w-4 text-primary" />
                      <h3 className={`font-bold text-gray-900 ${!announcement.isRead ? 'text-primary' : ''}`}>
                        {announcement.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      {announcement.priority === 'important' && (
                        <Badge variant="destructive" className="text-xs font-medium rounded-full px-2 py-1">
                          Important
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!announcement.isRead && (
                      <div className="w-3 h-3 bg-primary rounded-full shadow-sm"></div>
                    )}
                    <Eye className={`h-4 w-4 ${announcement.isRead ? 'text-muted-foreground' : 'text-primary'}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground font-medium">No announcements yet</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Announcements;
