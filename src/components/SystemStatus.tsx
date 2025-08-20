import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Zap, Shield, Clock } from 'lucide-react';

interface SystemStatusProps {
  className?: string;
}

const SystemStatus = ({ className }: SystemStatusProps) => {
  const systemServices = [
    {
      name: 'Database',
      status: 'Healthy',
      icon: Database,
      variant: 'default' as const
    },
    {
      name: 'Cache', 
      status: 'Operational',
      icon: Zap,
      variant: 'default' as const
    },
    {
      name: 'AI Credits API',
      status: 'Disconnected',
      icon: Clock,
      variant: 'destructive' as const
    },
    {
      name: 'Security',
      status: 'Active',
      icon: Shield,
      variant: 'default' as const
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemServices.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.name} className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{service.name}</p>
                    <Badge variant={service.variant} className="text-xs">
                      {service.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;