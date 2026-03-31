import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, History, LayoutTemplate, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: '首页' },
    { to: '/history', icon: History, label: '历史' },
    { to: '/new', icon: PlusCircle, label: '新建', isPrimary: true },
    { to: '/templates', icon: LayoutTemplate, label: '模板' },
    { to: '/profile', icon: User, label: '我的' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 pb-safe sm:rounded-b-[40px] z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-16 h-full transition-colors",
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600",
                item.isPrimary && "relative -top-4"
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.isPrimary ? (
                  <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-200">
                    <item.icon size={28} strokeWidth={2.5} />
                  </div>
                ) : (
                  <>
                    <item.icon size={22} className={cn("mb-1", isActive && "fill-blue-100")} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
