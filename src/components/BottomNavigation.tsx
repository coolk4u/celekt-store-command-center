
import { NavLink } from 'react-router-dom';
import { Home, ClipboardCheck, AlertTriangle, Megaphone, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/audit', icon: ClipboardCheck, label: 'Audit' },
    { to: '/issues', icon: AlertTriangle, label: 'Issues' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                  isActive
                    ? "text-red-600 bg-red-50"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
