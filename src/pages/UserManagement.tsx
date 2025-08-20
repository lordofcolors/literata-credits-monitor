import AdminLayout from '@/components/AdminLayout';
import UserTable from '@/components/UserTable';
import StatCard from '@/components/StatCard';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const UserManagement = () => {
  return (
    <AdminLayout currentPage="users">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Authorized Users"
            value="0"
            subtitle="Showing 0"
            icon={Users}
            iconColor="blue"
          />
          <StatCard
            title="Current Filter"
            value="Authorized"
            subtitle="No search"
            icon={UserCheck}
            iconColor="green"
          />
          <StatCard
            title="Page"
            value="1"
            subtitle="of 1"
            icon={UserPlus}
            iconColor="cyan"
          />
          <StatCard
            title="Storage Admin Users"
            value="32"
            subtitle="Per reference"
            icon={UserX}
            iconColor="yellow"
          />
        </div>

        {/* API Connection Warning */}
        <Alert className="border-admin-warning bg-admin-warning/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>AI Credits API Connection Issue:</strong> Failed to fetch users. HTTPSConnectionPool(host='localhost', port=5443): Max retries exceeded with url: /ai-credits-backend-dev/us-west2/explore/internal/admin/users?filter=authorized (Caused by NewConnectionError('&lt;urllib3.connection.HTTPSConnection object at 0x7ff9b31be40&gt;': Failed to establish a new connection: [Errno 111] Connection refused'))
          </AlertDescription>
        </Alert>

        {/* User Management Table */}
        <UserTable />
      </div>
    </AdminLayout>
  );
};

export default UserManagement;