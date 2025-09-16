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
            <p className="text-muted-foreground mb-6">
              We're currently integrating analytics data from multiple sources. Real-time analytics and reporting features will be available here soon.
            </p>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">Data Sources Being Integrated:</h4>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Mixpanel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Sentry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Datadog</span>
                </div>
              </div>
            </div>
            
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