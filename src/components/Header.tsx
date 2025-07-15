
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title: string;
  showProfile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showProfile = false }) => {
  const { user } = useAuth();

  return (
    <header className="bg-background border-b border-border px-4 py-3 sticky top-0 z-40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {showProfile && user && (
            <p className="text-sm text-muted-foreground">{user.storeName}</p>
          )}
        </div>
        
        {showProfile && (
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-accent rounded-full relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
