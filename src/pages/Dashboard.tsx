import AdminLayout from '@/components/AdminLayout';
import StatCard from '@/components/StatCard';
import SystemStatus from '@/components/SystemStatus';
import RecentUsers from '@/components/RecentUsers';
import { Users, UserCheck, UserX, Brain } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleStatCardClick = (filter: string) => {
    navigate(`/users?filter=${filter.toLowerCase()}`);
  };

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-6">
        {/* Success Message */}
        <Alert className="border-semantic-success bg-semantic-success/10">
          <AlertTriangle className="h-4 w-4 text-semantic-success" />
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
            clickable={true}
            onClick={() => handleStatCardClick('authorized')}
          />
          <StatCard
            title="Active Users"
            value="76"
            subtitle="Not banned"
            icon={UserCheck}
            iconColor="green"
            clickable={true}
            onClick={() => handleStatCardClick('active')}
          />
          <StatCard
            title="Banned Users"
            value="1"
            subtitle="Restricted access"
            icon={UserX}
            iconColor="yellow"
            clickable={true}
            onClick={() => handleStatCardClick('banned')}
          />
          <StatCard
            title="AI Credits Used"
            value="77"
            subtitle="vs 2.5M allowed"
            icon={Brain}
            iconColor="cyan"
            clickable={true}
            onClick={() => handleStatCardClick('credits')}
          />
        </div>

        {/* Recent Users */}
        <RecentUsers />

        {/* System Status */}
        <SystemStatus />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;