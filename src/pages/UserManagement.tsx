import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  UserX, 
  Search, 
  MoreHorizontal, 
  ChevronUp, 
  ChevronDown,
  Ban,
  Trash2
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type SortField = 'name' | 'email' | 'status' | 'type' | 'lastLogin' | 'inputTokens' | 'outputTokens' | 'totalTokens' | 'cost' | 'usage';
type SortDirection = 'asc' | 'desc';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'banned';
  type: 'authorized' | 'pending' | 'trial';
  lastLogin: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number;
  usage: number;
}

const UserManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastLogin');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterType, setFilterType] = useState<'all' | 'banned'>('all');

  // Mock user data - 100 entries with some over 100% usage
  const users: User[] = [
    {
      id: '1',
      name: 'David Tanner',
      email: 'david.tanner@oak.com',
      status: 'active',
      type: 'authorized',
      lastLogin: '2024-09-16T10:30:00Z',
      inputTokens: 271212,
      outputTokens: 118235,
      totalTokens: 389447,
      cost: 15.28,
      usage: 85.2
    },
    {
      id: '2', 
      name: 'Kris Luongmatanski',
      email: 'kris.luongmatanski@gmail.com',
      status: 'banned',
      type: 'authorized',
      lastLogin: '2024-09-16T09:15:00Z',
      inputTokens: 161865,
      outputTokens: 86171,
      totalTokens: 248036,
      cost: 12.45,
      usage: 142.3
    },
    {
      id: '3',
      name: 'Cuong Pham',
      email: 'cuong.pham@edu.com',
      status: 'active',
      type: 'trial',
      lastLogin: '2024-09-16T08:45:00Z',
      inputTokens: 18337,
      outputTokens: 7868,
      totalTokens: 26205,
      cost: 1.03,
      usage: 24.7
    },
    {
      id: '4',
      name: 'Marcus Rodriguez',
      email: 'marcus.r@company.io',
      status: 'banned',
      type: 'authorized',
      lastLogin: '2024-09-15T16:20:00Z',
      inputTokens: 625680,
      outputTokens: 289234,
      totalTokens: 914914,
      cost: 45.12,
      usage: 178.7
    },
    {
      id: '5',
      name: 'Sarah Chen',
      email: 'sarah.chen@startup.co',
      status: 'active',
      type: 'pending',
      lastLogin: '2024-09-16T07:30:00Z',
      inputTokens: 9245,
      outputTokens: 4123,
      totalTokens: 13368,
      cost: 0.52,
      usage: 12.3
    },
    ...Array.from({ length: 95 }, (_, i) => {
      // Create 8 banned users with high usage (over 100%)
      const isBannedUser = i < 8;
      const baseUsage = isBannedUser ? 120 + Math.random() * 50 : Math.random() * 90; // Banned: 120-170%, Others: 0-90%
      const inputTokens = Math.floor(Math.random() * 500000) + 1000;
      const outputTokens = Math.floor(Math.random() * 200000) + 500;
      
      return {
        id: `${i + 6}`,
        name: [
          'Alexandra Thompson', 'Benjamin Park', 'Charlotte Wilson', 'Daniel Kim', 'Elena Rodriguez',
          'Felix Anderson', 'Grace Liu', 'Harrison Smith', 'Isabella Garcia', 'Jack Thompson',
          'Katherine Brown', 'Liam Davis', 'Maya Patel', 'Nathan Williams', 'Olivia Johnson',
          'Patrick Miller', 'Quinn Taylor', 'Rachel Green', 'Samuel Lee', 'Tessa Clark',
          'Ulysses Martinez', 'Victoria Adams', 'William Chen', 'Xiara Lopez', 'Yasmin Ali',
          'Zachary Turner', 'Amelia Foster', 'Blake Harrison', 'Chloe Wright', 'Diego Santos',
          'Emma Peterson', 'Finn O\'Connor', 'Gabriela Silva', 'Hunter Reid', 'Iris Wang',
          'Julian Morales', 'Kara Stevens', 'Lucas Mitchell', 'Mia Rodriguez', 'Noah Cooper',
          'Penelope Hayes', 'Quinn Anderson', 'Ruby Martinez', 'Sebastian Torres', 'Talia Nguyen',
          'Uriel Gonzalez', 'Vera Campbell', 'Wesley Kim', 'Xander Phillips', 'Yuki Tanaka',
          'Zoe Rivera', 'Aaron Butler', 'Bianca Morris', 'Caleb Ward', 'Delilah Brooks',
          'Ethan Powell', 'Fiona Kelly', 'Gabriel Ross', 'Hazel Barnes', 'Ivan Price',
          'Jade Coleman', 'Kyle Fisher', 'Luna Ward', 'Mason Hughes', 'Nora Bell',
          'Oscar Cruz', 'Paige Russell', 'Quinton Gray', 'Raven Cooper', 'Sean Murphy',
          'Thea Jenkins', 'Ulrich Perry', 'Violet Reed', 'Walter Cook', 'Xenia Bailey',
          'York Patterson', 'Zelda Morgan', 'Atlas Parker', 'Blair Edwards', 'Cruz Stewart',
          'Drew Collins', 'Eden Sanders', 'Falcon Wood', 'Gemma Rogers', 'Hendrix Price',
          'Ivy Carter', 'Jett Richardson', 'Kira Cox', 'Lexi Howard', 'Miles Sanders',
          'Nova Bennett', 'Orion Gray', 'Phoenix Torres', 'River Stone', 'Sage Miller'
        ][i % 85],
        email: `user${i + 6}@${['gmail.com', 'xolv.com', 'gmail.com', 'xolv.com', 'gmail.com', 'xolv.com'][i % 6]}`,
        status: isBannedUser ? 'banned' : (['active', 'inactive'][i % 2]) as 'active' | 'inactive' | 'banned',
        type: ['authorized', 'pending', 'trial'][i % 3] as 'authorized' | 'pending' | 'trial',
        lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        inputTokens,
        outputTokens,
        totalTokens: inputTokens + outputTokens,
        cost: Math.random() * 50,
        usage: baseUsage
      };
    })
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (filterType === 'banned') {
        return matchesSearch && user.status === 'banned';
      }
      
      return matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'lastLogin') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [searchQuery, sortField, sortDirection, users, filterType]);

  const handleUserAction = (userId: string, action: string) => {
    if (action === 'view') {
      navigate(`/users/${userId}`);
      return;
    }
    
    toast({
      title: `User ${action}`,
      description: `User action "${action}" has been executed.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </TableHead>
  );

  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className={`cursor-pointer transition-colors ${filterType === 'all' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
            onClick={() => setFilterType('all')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-xs text-muted-foreground">Click to view all</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card 
            className={`cursor-pointer transition-colors ${filterType === 'banned' ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
            onClick={() => setFilterType('banned')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Ban className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Banned Users</p>
                  <p className="text-2xl font-bold">{users.filter(u => u.status === 'banned').length}</p>
                  <p className="text-xs text-muted-foreground">Click to view banned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card className="flex-1 min-h-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>
                {filterType === 'all' ? 'All Users' : 'Banned Users'} 
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredAndSortedUsers.length} {filteredAndSortedUsers.length === 1 ? 'user' : 'users'})
                </span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 p-0">
            <div className="h-[calc(100vh-320px)] overflow-auto">
              <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader field="name">User</SortableHeader>
                  <SortableHeader field="email">Email</SortableHeader>
                  <SortableHeader field="status">Status</SortableHeader>
                  <SortableHeader field="type">Type</SortableHeader>
                  <SortableHeader field="lastLogin">Last Login</SortableHeader>
                  <SortableHeader field="inputTokens">Input Tokens</SortableHeader>
                  <SortableHeader field="outputTokens">Output Tokens</SortableHeader>
                  <SortableHeader field="totalTokens">Total Tokens</SortableHeader>
                  <SortableHeader field="cost">Est. Cost</SortableHeader>
                  <SortableHeader field="usage">Usage %</SortableHeader>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedUsers.map((user) => (
                  <TableRow 
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onDoubleClick={() => navigate(`/users/${user.id}`)}
                  >
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : user.status === 'banned' ? 'destructive' : 'secondary'}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell>{user.inputTokens.toLocaleString()}</TableCell>
                    <TableCell>{user.outputTokens.toLocaleString()}</TableCell>
                    <TableCell>{user.totalTokens.toLocaleString()}</TableCell>
                    <TableCell>${user.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={user.usage > 100 ? 'text-red-500 font-bold' : ''}>{user.usage.toFixed(1)}%</span>
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              user.usage > 100 ? 'bg-red-500' : 
                              user.usage > 90 ? 'bg-orange-500' : 
                              user.usage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(user.usage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end" 
                          className="bg-background border-border shadow-lg z-50 min-w-[160px]"
                          style={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            color: 'hsl(var(--foreground))'
                          }}
                        >
                          <DropdownMenuItem 
                            onClick={() => handleUserAction(user.id, 'view')}
                            className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer"
                            style={{ color: 'hsl(var(--foreground))' }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction(user.id, 'reset')}
                            className="text-foreground hover:bg-muted focus:bg-muted cursor-pointer"
                            style={{ color: 'hsl(var(--foreground))' }}
                          >
                            Reset Credits
                          </DropdownMenuItem>
                          {user.status !== 'banned' && (
                            <DropdownMenuItem 
                              onClick={() => handleUserAction(user.id, 'ban')}
                              className="text-red-400 hover:bg-red-950/50 focus:bg-red-950/50 cursor-pointer"
                              style={{ color: 'hsl(0 84.2% 60.2%)' }}
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Ban User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleUserAction(user.id, 'remove')}
                            className="text-red-400 hover:bg-red-950/50 focus:bg-red-950/50 cursor-pointer"
                            style={{ color: 'hsl(0 84.2% 60.2%)' }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;