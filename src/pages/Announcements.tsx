
import { useState } from 'react';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Eye } from 'lucide-react';

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
    <div className="min-h-screen bg-background pb-20">
      <Header title="Announcements" />
      
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unread Announcements</p>
                  <p className="text-lg font-semibold">{unreadCount}</p>
                </div>
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAnnouncements(prev => prev.map(ann => ({ ...ann, isRead: true })));
                  }}
                >
                  Mark All Read
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <Card 
              key={announcement.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                !announcement.isRead ? 'border-l-4 border-l-red-500' : ''
              }`}
              onClick={() => markAsRead(announcement.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`font-medium ${!announcement.isRead ? 'font-semibold' : ''}`}>
                      {announcement.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                      {announcement.priority === 'important' && (
                        <Badge variant="destructive" className="text-xs">Important</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!announcement.isRead && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <Eye className={`h-4 w-4 ${announcement.isRead ? 'text-muted-foreground' : 'text-red-500'}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No announcements yet</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Announcements;
