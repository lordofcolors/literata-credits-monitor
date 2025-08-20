import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle } from 'lucide-react';

const UserProfile = () => {
  const user = {
    name: 'David Tanner',
    email: 'david.tanner@email.com',
    uid: '14j7yn9j4nt2rvaakzb2en72cv86t2',
    status: 'Authorized',
    accountCreated: 'Limited User',
    lastSignIn: 'Never',
    tier: 'Free',
    creditsUsed: 1250,
    creditsRemaining: 750,
    analyticsSource: '3 sources'
  };

  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        {/* User Header */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">DT</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">Refresh</Button>
              <Button variant="outline" size="sm">Ban User</Button>
              <Button variant="destructive" size="sm">Block to Users</Button>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Account Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{user.accountCreated}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Last Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{user.lastSignIn}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">AI Credits UID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-mono text-muted-foreground">{user.uid}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Analytics Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{user.analyticsSource}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="misogynai">AI Usage</TabsTrigger>
            <TabsTrigger value="limits">CloudFlare</TabsTrigger>
            <TabsTrigger value="sentry">Sentry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Data Not Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No PostgreSQL analytics data found for this user.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This user exists in AI Credits but has no associated analytics data in the PostgreSQL database.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="misogynai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Credit Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Credits Used</span>
                    <span className="font-medium">{user.creditsUsed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credits Remaining</span>
                    <span className="font-medium">{user.creditsRemaining.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Tier</span>
                    <Badge>{user.tier}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="limits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CloudFlare Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">CloudFlare data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sentry" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Sentry error logs will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default UserProfile;