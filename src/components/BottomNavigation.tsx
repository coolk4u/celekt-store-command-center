
import { NavLink } from 'react-router-dom';
import { Home, ClipboardCheck, AlertTriangle, Megaphone, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/audit', icon: ClipboardCheck, label: 'Audit' },
    { to: '/issues', icon: AlertTriangle, label: 'Issues' },
    { to: '/announcements', icon: Megaphone, label: 'News' },
    { to: '/more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-2 z-50 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 min-w-[60px]",
                  isActive
                    ? "text-primary bg-red-50 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )
              }
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
