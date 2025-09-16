import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, TrendingUp, TrendingDown, Minus, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserActions from '@/components/UserActions';

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

type SortField = 'name' | 'email' | 'status' | 'tier' | 'creditsUsed' | 'dailyUsage' | 'apiCalls' | 'lastActivity';
type SortDirection = 'asc' | 'desc';

const RecentUsers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastActivity');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const recentUsers: RecentUser[] = [
    {
      id: '1',
      email: 'sarah.johnson@techcorp.com',
      name: 'Sarah Johnson',
      status: 'Authorized',
      creditsUsed: 47850,
      creditsRemaining: 2150,
      dailyUsage: 1250,
      lastActivity: '2 minutes ago',
      registrationDate: 'User registered',
      tier: 'Enterprise',
      apiCalls: 2845,
      trend: 'up'
    },
    {
      id: '2',
      email: 'marcus.rodriguez@innovate.io',
      name: 'Marcus Rodriguez',
      status: 'Banned',
      creditsUsed: 95000,
      creditsRemaining: 0,
      dailyUsage: 0,
      lastActivity: '5 days ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 4567,
      trend: 'down'
    },
    {
      id: '3',
      email: 'emily.chen@startup.dev',
      name: 'Emily Chen',
      status: 'Authorized',
      creditsUsed: 23400,
      creditsRemaining: 26600,
      dailyUsage: 890,
      lastActivity: '15 minutes ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 1234,
      trend: 'up'
    },
    {
      id: '4',
      email: 'raj.patel@cloudvision.com',
      name: 'Raj Patel',
      status: 'Authorized',
      creditsUsed: 78900,
      creditsRemaining: 21100,
      dailyUsage: 2340,
      lastActivity: '1 hour ago',
      registrationDate: 'User registered',
      tier: 'Enterprise',
      apiCalls: 3789,
      trend: 'up'
    },
    {
      id: '5',
      email: 'lisa.white@freelancer.net',
      name: 'Lisa White',
      status: 'Authorized',
      creditsUsed: 1250,
      creditsRemaining: 750,
      dailyUsage: 45,
      lastActivity: 'Never',
      registrationDate: 'User registered',
      tier: 'Free',
      apiCalls: 156,
      trend: 'stable'
    },
    {
      id: '6',
      email: 'david.kim@airesearch.org',
      name: 'David Kim',
      status: 'Authorized',
      creditsUsed: 56780,
      creditsRemaining: 43220,
      dailyUsage: 1890,
      lastActivity: '30 minutes ago',
      registrationDate: 'User registered',
      tier: 'Enterprise',
      apiCalls: 2567,
      trend: 'up'
    },
    {
      id: '7',
      email: 'alexandra.brown@medtech.co',
      name: 'Alexandra Brown',
      status: 'Authorized',
      creditsUsed: 12340,
      creditsRemaining: 37660,
      dailyUsage: 567,
      lastActivity: '3 hours ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 890,
      trend: 'down'
    },
    {
      id: '8',
      email: 'james.wilson@analytics.biz',
      name: 'James Wilson',
      status: 'Authorized',
      creditsUsed: 34560,
      creditsRemaining: 15440,
      dailyUsage: 1120,
      lastActivity: '45 minutes ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 1678,
      trend: 'up'
    },
    {
      id: '9',
      email: 'natasha.singh@designstudio.in',
      name: 'Natasha Singh',
      status: 'Authorized',
      creditsUsed: 8900,
      creditsRemaining: 41100,
      dailyUsage: 234,
      lastActivity: '2 days ago',
      registrationDate: 'User registered',
      tier: 'Pro',
      apiCalls: 456,
      trend: 'stable'
    },
    {
      id: '10',
      email: 'thomas.mueller@enterprise.de',
      name: 'Thomas Mueller',
      status: 'Authorized',
      creditsUsed: 89500,
      creditsRemaining: 60500,
      dailyUsage: 3450,
      lastActivity: '5 minutes ago',
      registrationDate: 'User registered',
      tier: 'Enterprise',
      apiCalls: 4123,
      trend: 'up'
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-3 w-3 inline ml-1" /> : 
      <ChevronDown className="h-3 w-3 inline ml-1" />;
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = recentUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle special cases
      if (sortField === 'lastActivity') {
        // Convert to sortable format
        const timeToMinutes = (time: string) => {
          if (time === 'Never') return Infinity;
          if (time.includes('minute')) return parseInt(time);
          if (time.includes('hour')) return parseInt(time) * 60;
          if (time.includes('day')) return parseInt(time) * 1440;
          return 0;
        };
        aValue = timeToMinutes(aValue);
        bValue = timeToMinutes(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [recentUsers, searchQuery, sortField, sortDirection]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Users</CardTitle>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {filteredAndSortedUsers.length === 0 ? (
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
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('name')}>
                    USER{getSortIcon('name')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('status')}>
                    STATUS{getSortIcon('status')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('tier')}>
                    TIER{getSortIcon('tier')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('creditsUsed')}>
                    CREDITS USED{getSortIcon('creditsUsed')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('dailyUsage')}>
                    DAILY USAGE{getSortIcon('dailyUsage')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('apiCalls')}>
                    API CALLS{getSortIcon('apiCalls')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">TREND</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('lastActivity')}>
                    LAST ACTIVITY{getSortIcon('lastActivity')}
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedUsers.map((user) => (
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
                      <UserActions 
                        userId={user.id}
                        userEmail={user.email}
                        userStatus={user.status}
                      />
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