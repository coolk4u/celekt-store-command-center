
import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title: string;
  showProfile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showProfile = false }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {showProfile && user && (
            <p className="text-sm text-muted-foreground mt-0.5">{user.storeName}</p>
          )}
        </div>
        
        {showProfile && (
          <div className="flex items-center space-x-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
