import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const Analytics = () => {
  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Credit Usage Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analytics dashboard coming soon. This will show detailed credit usage patterns, 
              user behavior analytics, and system performance metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;