
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lock, 
  LogOut, 
  Phone, 
  Mail, 
  User, 
  Settings, 
  HelpCircle,
  FileText,
  Shield
} from 'lucide-react';

const More = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      icon: User,
      title: 'Profile',
      description: 'View and edit your profile',
      action: () => console.log('Profile clicked')
    },
    {
      icon: Lock,
      title: 'Change Password',
      description: 'Update your account password',
      action: () => console.log('Change password clicked')
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Notifications and preferences',
      action: () => console.log('Settings clicked')
    },
    {
      icon: FileText,
      title: 'Documents',
      description: 'View SOPs and policies',
      action: () => navigate('/documents')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      action: () => console.log('Help clicked')
    },
    {
      icon: Shield,
      title: 'Privacy Policy',
      description: 'View privacy policy',
      action: () => console.log('Privacy clicked')
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Central Team',
      description: '+91 98765 43210',
      action: () => window.open('tel:+919876543210')
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@celekt.com',
      action: () => window.open('mailto:support@celekt.com')
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="More" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* User Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.employeeId}</p>
                <p className="text-sm text-muted-foreground">{user?.storeName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4" onClick={item.action}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Central Team */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Contact Central Team</h3>
          <div className="space-y-2">
            {contactOptions.map((option, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4" onClick={option.action}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <option.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Celekt Store Manager v1.0.0
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default More;
