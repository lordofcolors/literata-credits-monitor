import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  Activity, 
  MessageSquare, 
  ArrowLeft,
  Ban,
  Trash2,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user data (in real app, fetch based on userId)
  const user = {
    id: userId || '1',
    name: 'David Tanner',
    email: 'david.tanner@oak.com',
    status: 'active' as const,
    type: 'authorized' as const,
    joinDate: '2024-08-15T00:00:00Z',
    lastLogin: '2024-09-16T10:30:00Z',
    lastActive: '2024-09-16T11:45:00Z',
    inputTokens: 271212,
    outputTokens: 118235,
    totalTokens: 389447,
    cost: 15.28,
    usage: 85.2,
    creditLimit: 100000,
    billingPlan: 'Professional',
    location: 'San Francisco, CA',
    timezone: 'PST',
    apiKeys: 2,
    integrations: ['Slack', 'Discord', 'Webhook']
  };

  const activityLogs = [
    { id: 1, timestamp: '2024-09-16T11:45:00Z', action: 'API Request', details: 'Completed chat completion with 1,234 tokens', cost: 0.024 },
    { id: 2, timestamp: '2024-09-16T11:30:00Z', action: 'Login', details: 'User logged in from 192.168.1.100', cost: 0 },
    { id: 3, timestamp: '2024-09-16T11:15:00Z', action: 'API Request', details: 'Text generation with 2,150 tokens', cost: 0.043 },
    { id: 4, timestamp: '2024-09-16T10:45:00Z', action: 'Settings Update', details: 'Changed API timeout to 30 seconds', cost: 0 },
    { id: 5, timestamp: '2024-09-16T10:30:00Z', action: 'API Request', details: 'Code completion with 890 tokens', cost: 0.018 },
    { id: 6, timestamp: '2024-09-16T09:15:00Z', action: 'Credit Purchase', details: 'Added 50,000 credits to account', cost: -25.00 },
    { id: 7, timestamp: '2024-09-16T08:30:00Z', action: 'API Request', details: 'Large conversation processing with 5,670 tokens', cost: 0.113 },
    { id: 8, timestamp: '2024-09-15T16:20:00Z', action: 'Integration Setup', details: 'Connected Slack workspace', cost: 0 }
  ];

  const conversations = [
    { id: 1, timestamp: '2024-09-16T11:45:00Z', title: 'React Component Help', tokens: 1234, cost: 0.024, model: 'GPT-4' },
    { id: 2, timestamp: '2024-09-16T11:15:00Z', title: 'Database Query Optimization', tokens: 2150, cost: 0.043, model: 'GPT-4' },
    { id: 3, timestamp: '2024-09-16T10:30:00Z', title: 'Code Review Assistant', tokens: 890, cost: 0.018, model: 'GPT-3.5' },
    { id: 4, timestamp: '2024-09-16T08:30:00Z', title: 'API Documentation Generation', tokens: 5670, cost: 0.113, model: 'GPT-4' },
    { id: 5, timestamp: '2024-09-15T14:22:00Z', title: 'Bug Fix Suggestions', tokens: 3210, cost: 0.064, model: 'GPT-4' }
  ];

  const handleUserAction = (action: string) => {
    toast({
      title: `User ${action}`,
      description: `Action "${action}" has been executed for ${user.name}.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/users')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Users</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleUserAction('reset credits')}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Credits
            </Button>
            <Button variant="destructive" onClick={() => handleUserAction('ban')}>
              <Ban className="h-4 w-4 mr-2" />
              Ban User
            </Button>
            <Button variant="destructive" onClick={() => handleUserAction('remove')}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove User
            </Button>
          </div>
        </div>

        {/* Usage Alert */}
        {user.usage > 90 && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <p className="font-medium text-orange-700">High Usage Alert</p>
              <p className="text-sm text-orange-600">
                This user is at {user.usage.toFixed(1)}% of their credit limit and may need monitoring.
              </p>
            </div>
          </div>
        )}

        {/* User Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                    <Badge variant="outline">{user.type}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Credits Used</p>
                  <p className="text-2xl font-bold">{user.usage.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">{user.totalTokens.toLocaleString()} tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">{formatCurrency(user.cost)}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="text-sm font-medium">{formatDate(user.lastActive)}</p>
                  <p className="text-xs text-muted-foreground">Joined {formatDate(user.joinDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>User Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Billing Plan</p>
                <p className="font-medium">{user.billingPlan}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{user.location}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Timezone</p>
                <p className="font-medium">{user.timezone}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">API Keys</p>
                <p className="font-medium">{user.apiKeys} active</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Integrations</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.integrations.map((integration) => (
                    <Badge key={integration} variant="outline" className="text-xs">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Usage Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Input Tokens</p>
                  <p className="font-medium">{user.inputTokens.toLocaleString()}</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Output Tokens</p>
                  <p className="font-medium">{user.outputTokens.toLocaleString()}</p>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Total Tokens</p>
                  <p className="font-bold">{user.totalTokens.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Credit Limit</p>
                  <p className="font-medium">{user.creditLimit.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Usage Percentage</p>
                  <p className={`font-bold ${user.usage > 90 ? 'text-red-500' : ''}`}>
                    {user.usage.toFixed(1)}%
                  </p>
                </div>
                <div className="w-full h-3 bg-muted rounded-full mt-1">
                  <div 
                    className={`h-full rounded-full ${user.usage > 90 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(user.usage, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{conversations.length}</p>
                <p className="text-sm text-muted-foreground">Total Conversations</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{activityLogs.length}</p>
                <p className="text-sm text-muted-foreground">Recent Activities</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold">{formatCurrency(user.cost)}</p>
                <p className="text-sm text-muted-foreground">Monthly Spend</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Activity Log
                </TabsTrigger>
                <TabsTrigger value="conversations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Conversations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-0">
                <div className="p-6">
                  <div className="space-y-4 max-h-96 overflow-auto">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                        <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{log.action}</p>
                            <div className="flex items-center space-x-2">
                              {log.cost !== 0 && (
                                <span className={`text-sm ${log.cost > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                  {log.cost > 0 ? '+' : ''}{formatCurrency(log.cost)}
                                </span>
                              )}
                              <span className="text-sm text-muted-foreground">
                                {formatDate(log.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conversations" className="mt-0">
                <div className="p-6">
                  <div className="space-y-4 max-h-96 overflow-auto">
                    {conversations.map((conversation) => (
                      <div key={conversation.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{conversation.title}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{conversation.model}</Badge>
                              <span className="text-sm text-red-500">{formatCurrency(conversation.cost)}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm text-muted-foreground">
                              {conversation.tokens.toLocaleString()} tokens
                            </p>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(conversation.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserProfile;