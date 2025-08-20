import AdminLayout from '@/components/AdminLayout';
import StatCard from '@/components/StatCard';
import SystemStatus from '@/components/SystemStatus';
import QuickActions from '@/components/QuickActions';
import RecentUsers from '@/components/RecentUsers';
import { Users, UserCheck, UserX, Brain } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* API Connection Warning */}
        <Alert className="border-admin-warning bg-admin-warning/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>AI Credits API Connection Issue:</strong> Unable to connect to AI Credits backend. Some data may be unavailable.
          </AlertDescription>
        </Alert>

        {/* Success Message */}
        <Alert className="border-admin-success bg-admin-success/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Successfully signed in as arthurluguyen.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Authorized Users"
            value="77"
            subtitle="Registered users"
            icon={Users}
            iconColor="blue"
          />
          <StatCard
            title="Active Users"
            value="76"
            subtitle="Not banned"
            icon={UserCheck}
            iconColor="green"
          />
          <StatCard
            title="Banned Users"
            value="1"
            subtitle="Restricted access"
            icon={UserX}
            iconColor="yellow"
          />
          <StatCard
            title="AI Credits Used"
            value="77"
            subtitle="vs 2.5M allowed"
            icon={Brain}
            iconColor="cyan"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats and Quick Actions */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">AI Credits Admin Portal Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admin Users</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staff</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Suspended</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
            </div>
            
            <QuickActions />
          </div>

          {/* Right Column - Recent Users */}
          <div className="lg:col-span-2">
            <RecentUsers />
          </div>
        </div>

        {/* System Status */}
        <SystemStatus />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;