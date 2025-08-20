import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  email: string;
  status: 'Authorized' | 'Banned' | 'Suspended';
  creditsUsed: number;
  creditsRemaining: number;
  lastActivity: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'david.tanner@email.com',
    status: 'Authorized',
    creditsUsed: 1250,
    creditsRemaining: 750,
    lastActivity: 'Never',
    tier: 'Free'
  },
  {
    id: '2', 
    email: 'test@email.com',
    status: 'Authorized',
    creditsUsed: 890,
    creditsRemaining: 1110,
    lastActivity: '2 hours ago',
    tier: 'Pro'
  },
  {
    id: '3',
    email: 'cuong.pham@email.com',
    status: 'Authorized',
    creditsUsed: 2100,
    creditsRemaining: 900,
    lastActivity: '1 day ago',
    tier: 'Enterprise'
  },
  {
    id: '4',
    email: 'andrew.nguyen@email.com',
    status: 'Authorized',
    creditsUsed: 450,
    creditsRemaining: 1550,
    lastActivity: '3 days ago',
    tier: 'Pro'
  }
];

const UserTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      'Authorized': 'default',
      'Banned': 'destructive', 
      'Suspended': 'secondary'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const getTierBadge = (tier: User['tier']) => {
    const colors = {
      'Free': 'bg-gray-100 text-gray-800',
      'Pro': 'bg-blue-100 text-blue-800',
      'Enterprise': 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge className={colors[tier]}>
        {tier}
      </Badge>
    );
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
            <SelectContent>
              <SelectItem value="All">All Users</SelectItem>
              <SelectItem value="Authorized">Authorized Users</SelectItem>
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
                    <td className="py-4 text-sm text-muted-foreground">{user.lastActivity}</td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
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

export default UserTable;