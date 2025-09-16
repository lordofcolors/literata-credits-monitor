import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, BarChart3, Settings, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const AdminLayout = ({ children, currentPage = 'dashboard' }: AdminLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-foreground">
              Admin Portal
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  className="flex items-center space-x-2"
                  onClick={() => handleNavClick(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              arthurluguyen
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;