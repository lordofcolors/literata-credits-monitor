import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart3, Users, CreditCard, TrendingUp, Activity } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import StatCard from '@/components/StatCard';

const Analytics = () => {
  // Mock data for charts
  const usageData = [
    { month: 'Jan', tokens: 45000, cost: 890 },
    { month: 'Feb', tokens: 52000, cost: 1040 },
    { month: 'Mar', tokens: 48000, cost: 960 },
    { month: 'Apr', tokens: 61000, cost: 1220 },
    { month: 'May', tokens: 55000, cost: 1100 },
    { month: 'Jun', tokens: 67000, cost: 1340 },
  ];

  const userTypeData = [
    { name: 'Basic', value: 45, fill: 'hsl(var(--primary))' },
    { name: 'Premium', value: 30, fill: 'hsl(var(--secondary))' },
    { name: 'Enterprise', value: 25, fill: 'hsl(var(--accent))' },
  ];

  const dailyActiveUsers = [
    { day: 'Mon', users: 125 },
    { day: 'Tue', users: 142 },
    { day: 'Wed', users: 138 },
    { day: 'Thu', users: 156 },
    { day: 'Fri', users: 149 },
    { day: 'Sat', users: 98 },
    { day: 'Sun', users: 87 },
  ];

  const chartConfig = {
    tokens: {
      label: "Tokens",
      color: "hsl(var(--primary))",
    },
    cost: {
      label: "Cost ($)",
      color: "hsl(var(--secondary))",
    },
    users: {
      label: "Users",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="1,247"
            subtitle="+12% from last month"
            icon={Users}
            iconColor="blue"
          />
          <StatCard
            title="Monthly Revenue"
            value="$8,420"
            subtitle="+18% from last month"
            icon={CreditCard}
            iconColor="green"
          />
          <StatCard
            title="Token Usage"
            value="2.4M"
            subtitle="This month"
            icon={Activity}
            iconColor="cyan"
          />
          <StatCard
            title="Growth Rate"
            value="23.5%"
            subtitle="Monthly active users"
            icon={TrendingUp}
            iconColor="yellow"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token Usage Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Token Usage & Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="tokens" orientation="left" />
                  <YAxis yAxisId="cost" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    yAxisId="tokens"
                    type="monotone"
                    dataKey="tokens"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="cost"
                    type="monotone"
                    dataKey="cost"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* User Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Daily Active Users */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={dailyActiveUsers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="users" fill="hsl(var(--accent))" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-sm font-bold text-semantic-success">245ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Uptime</span>
                  <span className="text-sm font-bold text-semantic-success">99.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Error Rate</span>
                  <span className="text-sm font-bold text-semantic-warning">0.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Peak Concurrent Users</span>
                  <span className="text-sm font-bold">342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cache Hit Rate</span>
                  <span className="text-sm font-bold text-semantic-success">94.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;