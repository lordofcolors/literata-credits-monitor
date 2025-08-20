import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash2, Ban, Shield, RefreshCw, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserActionsProps {
  userId: string;
  userEmail: string;
  userStatus: string;
}

const UserActions = ({ userId, userEmail, userStatus }: UserActionsProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} User`,
      description: `${action} action for ${userEmail}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border shadow-lg z-50"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('View')}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('Edit')}>
          <Edit className="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('Reset')}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Credits
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {userStatus !== 'Banned' ? (
          <DropdownMenuItem 
            onClick={() => handleAction('Ban')}
            className="text-admin-warning focus:text-admin-warning"
          >
            <Ban className="mr-2 h-4 w-4" />
            Ban User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem 
            onClick={() => handleAction('Unban')}
            className="text-admin-success focus:text-admin-success"
          >
            <Shield className="mr-2 h-4 w-4" />
            Unban User
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleAction('Delete')}
          className="text-admin-danger focus:text-admin-danger"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;