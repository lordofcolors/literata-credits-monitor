import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserActions from '@/components/UserActions';

interface User {
  id: string;
  email: string;
  status: 'Authorized' | 'Banned' | 'Suspended' | 'Active';
  creditsUsed: number;
  creditsRemaining: number;
  dailyUsage: number;
  apiCalls: number;
  lastActivity: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  trend: 'up' | 'down' | 'stable';
}

// Mock data for different user types
const generateMockUsers = (type: string, count: number): User[] => {
  const users = [];
  const baseUsers = [
    { email: 'david.tanner@email.com', tier: 'Free' as const },
    { email: 'test@email.com', tier: 'Pro' as const },
    { email: 'cuong.pham@email.com', tier: 'Enterprise' as const },
    { email: 'andrew.nguyen@email.com', tier: 'Pro' as const },
    { email: 'unknown@email.com', tier: 'Free' as const },
  ];

  for (let i = 0; i < count; i++) {
    const baseUser = baseUsers[i % baseUsers.length];
    const status = type === 'authorized' ? 'Authorized' : 
                  type === 'active' ? 'Active' :
                  type === 'banned' ? 'Banned' : 'Suspended';
    
    users.push({
      id: `${type}-${i + 1}`,
      email: i < baseUsers.length ? baseUser.email : `user${i + 1}@email.com`,
      status: status as User['status'],
      creditsUsed: Math.floor(Math.random() * 2000) + 100,
      creditsRemaining: Math.floor(Math.random() * 1500) + 500,
      dailyUsage: Math.floor(Math.random() * 100) + 1,
      apiCalls: Math.floor(Math.random() * 500) + 10,
      lastActivity: i === 0 ? 'Never' : `${Math.floor(Math.random() * 10) + 1} ${Math.random() > 0.5 ? 'hours' : 'days'} ago`,
      tier: i < baseUsers.length ? baseUser.tier : (['Free', 'Pro', 'Enterprise'][Math.floor(Math.random() * 3)] as User['tier']),
      trend: (['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as User['trend'])
    });
  }
  
  return users;
};

const UserTable = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const filter = searchParams.get('filter');
    
    // Generate appropriate mock data based on filter
    let mockUsers: User[] = [];
    let count = 0;
    
    switch(filter) {
      case 'authorized':
        count = 77;
        mockUsers = generateMockUsers('authorized', count);
        setStatusFilter('Authorized');
        break;
      case 'active':
        count = 76;
        mockUsers = generateMockUsers('active', count);
        setStatusFilter('Active');
        break;
      case 'banned':
        count = 1;
        mockUsers = generateMockUsers('banned', count);
        setStatusFilter('Banned');
        break;
      default:
        count = 5;
        mockUsers = generateMockUsers('authorized', count);
        setStatusFilter('All');
    }
    
    setUsers(mockUsers);
  }, [searchParams]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      'Authorized': 'default',
      'Active': 'default',
      'Banned': 'destructive', 
      'Suspended': 'secondary'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getTierBadge = (tier: User['tier']) => {
    const colors = {
      'Free': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      'Pro': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Enterprise': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    
    return (
      <Badge className={colors[tier]}>
        {tier}
      </Badge>
    );
  };

  const getTrendIcon = (trend: User['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-admin-success" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-admin-danger" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>User Management</span>
          </CardTitle>
          <Button variant="default" size="sm">
            Add User
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by email, name, UID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              <SelectItem value="All">All Users</SelectItem>
              <SelectItem value="Authorized">Authorized Users</SelectItem>
              <SelectItem value="Active">Active Users</SelectItem>
              <SelectItem value="Banned">Banned Users</SelectItem>
              <SelectItem value="Suspended">Suspended Users</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check AI credit connection.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">EMAIL</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">STATUS</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">TIER</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">CREDITS USED</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">CREDITS LEFT</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">DAILY USAGE</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">API CALLS</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">TREND</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">LAST ACTIVITY</th>
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 text-sm">{user.email}</td>
                    <td className="py-4">{getStatusBadge(user.status)}</td>
                    <td className="py-4">{getTierBadge(user.tier)}</td>
                    <td className="py-4 text-sm">{user.creditsUsed.toLocaleString()}</td>
                    <td className="py-4 text-sm">{user.creditsRemaining.toLocaleString()}</td>
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

export default UserTable;