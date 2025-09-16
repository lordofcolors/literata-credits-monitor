import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Download,
  Upload,
  Activity,
  DollarSign,
  MoreHorizontal,
  MessageSquare
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user data (in real app, fetch based on userId)
  const user = {
    id: userId || '1',
    name: 'David Tanner',
    email: 'david.tanner@xolv.com',
    status: 'active' as const,
    type: 'authorized' as const,
    joinDate: '2024-08-15T00:00:00Z',
    lastLogin: '2024-09-16T10:30:00Z',
    lastActive: '2024-09-16T11:45:00Z',
    inputTokens: 271212,
    outputTokens: 116235,
    totalTokens: 387447,
    cost: 0.5037,
    usage: 85.2,
    creditLimit: 100000,
    billingPlan: 'Professional',
    location: 'San Francisco, CA',
    timezone: 'PST',
    apiKeys: 2,
    integrations: ['Slack', 'Discord', 'Webhook']
  };

  // Mock timeline data
  const timelineData = [
    { time: '00:00', value: 2500 },
    { time: '02:00', value: 1800 },
    { time: '04:00', value: 1200 },
    { time: '06:00', value: 2100 },
    { time: '08:00', value: 3200 },
    { time: '10:00', value: 2800 },
    { time: '12:00', value: 3800 },
    { time: '14:00', value: 4200 },
    { time: '16:00', value: 3600 },
    { time: '18:00', value: 4800 },
    { time: '20:00', value: 3200 },
    { time: '22:00', value: 2400 }
  ];

  // Mock daily summary data
  const dailySummary = [
    { date: 'Thu, Sep 11', sessions: 24, totalTokens: 18667, avgPerSession: 444 },
    { date: 'Wed, Sep 10', sessions: 17, totalTokens: 44156, avgPerSession: 2597 },
    { date: 'Tue, Sep 9', sessions: 11, totalTokens: 39759, avgPerSession: 3614 }
  ];

  const chartConfig = {
    value: {
      label: "Tokens",
      color: "hsl(var(--primary))",
    },
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
              variant="outline"
              onClick={() => navigate('/users')}
              className="flex items-center space-x-2 bg-background border-border text-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="flex items-center space-x-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* User Token Usage Details Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">User Token Usage Details</h1>
          <p className="text-muted-foreground">{user.email} • Current month</p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select defaultValue="2025">
              <SelectTrigger className="w-32 bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="2025" className="text-foreground hover:bg-muted">2025</SelectItem>
                <SelectItem value="2024" className="text-foreground hover:bg-muted">2024</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="september">
              <SelectTrigger className="w-40 bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="september" className="text-foreground hover:bg-muted">September</SelectItem>
                <SelectItem value="august" className="text-foreground hover:bg-muted">August</SelectItem>
                <SelectItem value="july" className="text-foreground hover:bg-muted">July</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Apply
            </Button>

            <Button variant="outline" className="border-border text-foreground hover:bg-muted">
              Reset
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Input Tokens</p>
                  <p className="text-2xl font-bold">{user.inputTokens.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Output Tokens</p>
                  <p className="text-2xl font-bold">{user.outputTokens.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Tokens</p>
                  <p className="text-2xl font-bold">{user.totalTokens.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Cost</p>
                  <p className="text-2xl font-bold">{formatCurrency(user.cost)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Usage Timeline Chart */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Token Usage Timeline</span>
                <Badge variant="secondary">3H intervals</Badge>
              </CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full overflow-hidden">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Chart Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Peak Session</p>
                <p className="font-semibold">12,724 tokens</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Average Session</p>
                <p className="font-semibold">3,206 tokens</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Most Active Day</p>
                <p className="font-semibold">Sep 9</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Daily Active</p>
                <p className="font-semibold">9 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs with More Features */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                <TabsTrigger value="summary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Daily Summary
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Daily Activity
                </TabsTrigger>
                <TabsTrigger value="conversations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Conversations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-0">
                <div className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DATE</TableHead>
                        <TableHead className="text-center">SESSIONS</TableHead>
                        <TableHead className="text-center">TOTAL TOKENS</TableHead>
                        <TableHead className="text-center">AVG PER SESSION</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailySummary.map((day, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{day.date}</TableCell>
                          <TableCell className="text-center">{day.sessions}</TableCell>
                          <TableCell className="text-center">{day.totalTokens.toLocaleString()}</TableCell>
                          <TableCell className="text-center">{day.avgPerSession.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="p-6">
                  <div className="text-center py-12 space-y-4">
                    <Activity className="h-16 w-16 text-muted-foreground mx-auto" />
                    <h3 className="text-lg font-semibold text-foreground">Daily Activity Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Detailed user activity tracking will be available here soon. This data will flow directly from Mixpanel, 
                      showing all user actions, interactions, and behavioral patterns.
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Data source: Mixpanel</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="conversations" className="mt-0">
                <div className="p-6">
                  <div className="text-center py-12 space-y-4">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto" />
                    <h3 className="text-lg font-semibold text-foreground">Agent Conversations Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Recent conversations with AI agents will be displayed here. View conversation history, 
                      interaction patterns, and agent performance metrics in one place.
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Integration in progress</span>
                    </div>
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