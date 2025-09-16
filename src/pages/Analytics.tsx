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
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Comprehensive analytics dashboard is currently in development.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Credit usage patterns and trends</p>
              <p>• User behavior analytics</p>
              <p>• System performance metrics</p>
              <p>• Revenue and billing insights</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;