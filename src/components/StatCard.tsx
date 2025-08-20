import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: 'blue' | 'green' | 'yellow' | 'cyan';
  onClick?: () => void;
  clickable?: boolean;
}

const StatCard = ({ title, value, subtitle, icon: Icon, iconColor = 'blue', onClick, clickable = false }: StatCardProps) => {
  const iconColorClasses = {
    blue: 'text-brand-tertiary',
    green: 'text-semantic-success', 
    yellow: 'text-semantic-warning',
    cyan: 'text-theme-accent-2'
  };

  return (
    <Card 
      className={cn(
        clickable && "cursor-pointer hover:bg-muted/50 transition-colors",
      )}
      onClick={clickable ? onClick : undefined}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Icon className={cn('h-5 w-5', iconColorClasses[iconColor])} />
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            </div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;