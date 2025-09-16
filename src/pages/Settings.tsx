import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings as SettingsIcon, Save, Shield, Database, Bell } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maxCredits: '2500000',
    alertThreshold: '80',
    apiTimeout: '30',
    enableNotifications: true
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <AdminLayout currentPage="settings">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <SettingsIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Credit Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Credit Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxCredits">Maximum Credits</Label>
                <Input
                  id="maxCredits"
                  value={settings.maxCredits}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxCredits: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
                <Input
                  id="alertThreshold"
                  value={settings.alertThreshold}
                  onChange={(e) => setSettings(prev => ({ ...prev, alertThreshold: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiTimeout">API Timeout (seconds)</Label>
                <Input
                  id="apiTimeout"
                  value={settings.apiTimeout}
                  onChange={(e) => setSettings(prev => ({ ...prev, apiTimeout: e.target.value }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={settings.enableNotifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, enableNotifications: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure how and when you receive notifications about system events.
              </p>
              <Button variant="outline" disabled>
                Configure Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;