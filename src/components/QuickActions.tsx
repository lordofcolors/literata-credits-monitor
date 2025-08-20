import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BarChart3, Settings, AlertTriangle } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Manage Users',
      icon: Users,
      variant: 'outline' as const,
      description: 'Add, edit, or remove user accounts'
    },
    {
      title: 'View Analytics', 
      icon: BarChart3,
      variant: 'outline' as const,
      description: 'Monitor credit usage and trends'
    },
    {
      title: 'System Health',
      icon: AlertTriangle,
      variant: 'outline' as const,
      description: 'Check system status and alerts'
    },
    {
      title: 'Change Admin',
      icon: Settings,
      variant: 'outline' as const,
      description: 'Update admin settings and permissions'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className="w-full justify-start h-auto p-4"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;