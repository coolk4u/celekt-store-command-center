
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
      action: () => console.log('Profile clicked'),
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Lock,
      title: 'Change Password',
      description: 'Update your account password',
      action: () => console.log('Change password clicked'),
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Notifications and preferences',
      action: () => console.log('Settings clicked'),
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: FileText,
      title: 'Documents',
      description: 'View SOPs and policies',
      action: () => navigate('/documents'),
      color: 'from-green-400 to-green-600'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      action: () => console.log('Help clicked'),
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Privacy Policy',
      description: 'View privacy policy',
      action: () => console.log('Privacy clicked'),
      color: 'from-gray-400 to-gray-600'
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Central Team',
      description: '+91 98765 43210',
      action: () => window.open('tel:+919876543210'),
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@celekt.com',
      action: () => window.open('mailto:support@celekt.com'),
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/50 pb-20">
      <Header title="More" />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* User Info */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{user?.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">{user?.employeeId}</p>
                <p className="text-sm text-muted-foreground">{user?.storeName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-5" onClick={item.action}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Central Team */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Contact Central Team</h3>
          <div className="space-y-3">
            {contactOptions.map((option, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-xl transition-all duration-200 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-5" onClick={option.action}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <option.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Logout */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-5">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 h-12 rounded-xl"
              size="lg"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-medium">
            Celekt Store Manager v1.0.0
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default More;
