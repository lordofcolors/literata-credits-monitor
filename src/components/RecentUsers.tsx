import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentUser {
  id: string;
  email: string;
  name: string;
  status: 'Authorized' | 'Banned' | 'Suspended';
  creditsUsed: number;
  registrationDate: string;
}

const RecentUsers = () => {
  const navigate = useNavigate();
  
  const recentUsers: RecentUser[] = [
    {
      id: '1',
      email: 'david.tanner@email.com',
      name: 'David Tanner',
      status: 'Authorized',
      creditsUsed: 1250,
      registrationDate: 'User registered'
    },
    {
      id: '2',
      email: 'test@email.com', 
      name: 'Test User',
      status: 'Authorized',
      creditsUsed: 890,
      registrationDate: 'User registered'
    },
    {
      id: '3',
      email: 'cuong.pham@email.com',
      name: 'Cuong Pham',
      status: 'Authorized', 
      creditsUsed: 2100,
      registrationDate: 'User registered'
    },
    {
      id: '4',
      email: 'unknown@email.com',
      name: 'Unknown User',
      status: 'Authorized',
      creditsUsed: 0,
      registrationDate: 'User registered'
    },
    {
      id: '5',
      email: 'andrew.nguyen@email.com',
      name: 'Andrew Nguyen', 
      status: 'Authorized',
      creditsUsed: 450,
      registrationDate: 'User registered'
    }
  ];

  const getStatusBadge = (status: RecentUser['status']) => {
    const variants = {
      'Authorized': 'default',
      'Banned': 'destructive',
      'Suspended': 'secondary'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleViewAll = () => {
    navigate('/users');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Authenticated Users (Limited to 8)</CardTitle>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {recentUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unable to load authenticated users.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check AI Credits API connection.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.registrationDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(user.status)}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle menu actions
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentUsers;