import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge"; // Add this line
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Monitor,
  Languages,
  Palette,
  Download,
  Upload,
  Key,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { RouteName, navigateTo } from '../routes-maps';
interface SettingsProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function Settings({ user, onNavigate, onLogout, language }: SettingsProps) {
  const t = useTranslation(language);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    dataUpdates: true,
    analysisComplete: true,
    weeklyReports: false,
    systemMaintenance: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    units: 'metric'
  });

  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    compressionLevel: 'standard',
    retentionPeriod: '5years',
    exportFormat: 'csv'
  });

  return (
    <Layout
      user={user}
      currentPage="settings"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('settings')}</h1>
            <p className="text-gray-600 mt-1">
              Manage your account preferences and system configuration
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
              <Upload className="h-4 w-4 mr-2" />
              Import Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data & Storage</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#003366]" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Dr. Marine Researcher" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue={user?.email} disabled />
                    <p className="text-xs text-gray-500">Contact admin to change email address</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" defaultValue="CMLRE, Ministry of Earth Sciences" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Marine Biology Research" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2 text-[#003366]" />
                    Display Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={preferences.theme} onValueChange={(value:string) => setPreferences({...preferences, theme: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <span className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </span>
                        </SelectItem>
                        <SelectItem value="dark">
                          <span className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </span>
                        </SelectItem>
                        <SelectItem value="system">
                          <span className="flex items-center">
                            <Monitor className="h-4 w-4 mr-2" />
                            System
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={preferences.language} onValueChange={(value:string) => setPreferences({...preferences, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ml">മലയാളം (Malayalam)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={preferences.timezone} onValueChange={(value:string) => setPreferences({...preferences, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select value={preferences.dateFormat} onValueChange={(value: string) => setPreferences({...preferences, dateFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-[#003366]" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about system events and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked: boolean) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-600">Receive push notifications in browser</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked:boolean) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Event Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Updates</Label>
                        <p className="text-sm text-gray-600">New datasets and data updates</p>
                      </div>
                      <Switch 
                        checked={notifications.dataUpdates}
                        onCheckedChange={(checked:boolean) => setNotifications({...notifications, dataUpdates: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analysis Completion</Label>
                        <p className="text-sm text-gray-600">When your analysis jobs complete</p>
                      </div>
                      <Switch 
                        checked={notifications.analysisComplete}
                        onCheckedChange={(checked:boolean) => setNotifications({...notifications, analysisComplete: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Weekly summary of your activity</p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked:boolean) => setNotifications({...notifications, weeklyReports: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Maintenance</Label>
                        <p className="text-sm text-gray-600">Scheduled maintenance notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.systemMaintenance}
                        onCheckedChange={(checked:boolean) => setNotifications({...notifications, systemMaintenance: checked})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Storage */}
          <TabsContent value="data" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-[#003366]" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backup</Label>
                      <p className="text-sm text-gray-600">Automatically backup your data</p>
                    </div>
                    <Switch 
                      checked={dataSettings.autoBackup}
                      onCheckedChange={(checked:boolean) => setDataSettings({...dataSettings, autoBackup: checked})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Compression Level</Label>
                    <Select value={dataSettings.compressionLevel} onValueChange={(value:string) => setDataSettings({...dataSettings, compressionLevel: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Compression</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High Compression</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Data Retention Period</Label>
                    <Select value={dataSettings.retentionPeriod} onValueChange={(value:string) => setDataSettings({...dataSettings, retentionPeriod: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Default Export Format</Label>
                    <Select value={dataSettings.exportFormat} onValueChange={(value:string) => setDataSettings({...dataSettings, exportFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                        <SelectItem value="netcdf">NetCDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used Storage</span>
                      <span>2.3 GB / 10 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#003366] h-2 rounded-full w-[23%]"></div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Survey Data</span>
                      <span>1.2 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Images</span>
                      <span>0.8 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reports</span>
                      <span>0.2 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>eDNA Data</span>
                      <span>0.1 GB</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#003366]" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Enable 2FA
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="flex space-x-2">
                      <Input type="password" placeholder="Current password" className="flex-1" />
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>API Access</Label>
                    <div className="flex space-x-2">
                      <Input value="cmlre_api_key_*********" disabled className="flex-1" />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-xs text-gray-500">Use this key to access CMLRE APIs programmatically</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Session Management</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Monitor className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-gray-600">Chrome on Windows • India</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Mobile Device</p>
                          <p className="text-xs text-gray-600">Safari on iOS • 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-[#003366]" />
                  External Integrations
                </CardTitle>
                <CardDescription>Connect with external tools and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">OBIS Integration</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-600">Sync with Ocean Biodiversity Information System</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">GBIF Connection</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-600">Global Biodiversity Information Facility</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">R Integration</h4>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-gray-600">Export data for R statistical analysis</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">QGIS Plugin</h4>
                      <Switch />
                    </div>
                    <p className="text-sm text-gray-600">Direct QGIS mapping integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-[#003366]" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>Advanced configuration options - use with caution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Debug Mode</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Enable detailed logging and error reporting. This may impact performance.
                        </p>
                        <Switch className="mt-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cache Settings</Label>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Clear Cache</Button>
                      <Button variant="outline" size="sm">Reset Preferences</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-red-600">Danger Zone</Label>
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-700 mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t">
          <p className="text-sm text-gray-500">
            Settings are automatically saved
          </p>
          <div className="flex space-x-3">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-[#003366] hover:bg-[#004080]">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}