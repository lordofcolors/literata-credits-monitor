import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecentUser {
  id: string;
  email: string;
  name: string;
  status: 'Authorized' | 'Banned' | 'Suspended';
  creditsUsed: number;
  creditsRemaining: number;
  dailyUsage: number;
  lastActivity: string;
  registrationDate: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  apiCalls: number;
  trend: 'up' | 'down' | 'stable';
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
      creditsRemaining: 750,
      dailyUsage: 45,
      lastActivity: 'Never',
      registrationDate: 'User registered',
      tier: 'Free',
      apiCalls: 156,
      trend: 'up'
    },
    {
      id: '2',
      email: 'test@email.com', 
      name: 'Test User',
      status: 'Authorized',
      creditsUsed: 890,
      creditsRemaining: 1110,
      dailyUsage: 32,
      lastActivity: '2 hours ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 89,
      trend: 'down'
    },
    {
      id: '3',
      email: 'cuong.pham@email.com',
      name: 'Cuong Pham',
      status: 'Authorized', 
      creditsUsed: 2100,
      creditsRemaining: 900,
      dailyUsage: 78,
      lastActivity: '1 day ago',
      registrationDate: 'User registered',
      tier: 'Enterprise',
      apiCalls: 234,
      trend: 'up'
    },
    {
      id: '4',
      email: 'unknown@email.com',
      name: 'Unknown User',
      status: 'Authorized',
      creditsUsed: 0,
      creditsRemaining: 2000,
      dailyUsage: 0,
      lastActivity: 'Never',
      registrationDate: 'User registered',
      tier: 'Free',
      apiCalls: 0,
      trend: 'stable'
    },
    {
      id: '5',
      email: 'andrew.nguyen@email.com',
      name: 'Andrew Nguyen', 
      status: 'Authorized',
      creditsUsed: 450,
      creditsRemaining: 1550,
      dailyUsage: 18,
      lastActivity: '3 days ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 67,
      trend: 'stable'
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

  const getTierBadge = (tier: RecentUser['tier']) => {
    const colors = {
      'Free': 'bg-stroke-primary/20 text-foreground border-stroke-primary',
      'Pro': 'bg-brand-tertiary/20 text-brand-tertiary border-brand-tertiary',
      'Enterprise': 'bg-brand-primary/20 text-brand-primary border-brand-primary'
    };
    
    return (
      <Badge variant="outline" className={colors[tier]}>
        {tier}
      </Badge>
    );
  };

  const getTrendIcon = (trend: RecentUser['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-semantic-success" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-semantic-error" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
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
        <CardTitle>Recent Authenticated Users</CardTitle>
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">USER</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">STATUS</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">TIER</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">CREDITS USED</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">DAILY USAGE</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">API CALLS</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">TREND</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">LAST ACTIVITY</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleUserClick(user.id)}
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{getStatusBadge(user.status)}</td>
                    <td className="py-4">{getTierBadge(user.tier)}</td>
                    <td className="py-4 text-sm">{user.creditsUsed.toLocaleString()}</td>
                    <td className="py-4 text-sm">{user.dailyUsage}</td>
                    <td className="py-4 text-sm">{user.apiCalls}</td>
                    <td className="py-4">{getTrendIcon(user.trend)}</td>
                    <td className="py-4 text-sm text-muted-foreground">{user.lastActivity}</td>
                    <td className="py-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentUsers;