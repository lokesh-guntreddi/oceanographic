import React from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Users, 
  Database, 
  Activity, 
  Shield,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { RouteName } from "../routes-maps";
interface AdminDashboardProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function AdminDashboard({ user, onNavigate, onLogout, language }: AdminDashboardProps) {
  const t = useTranslation(language);

  const systemStats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Sessions',
      value: '324',
      change: '+5.2%',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Data Storage',
      value: '847 GB',
      change: '+18.3%',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'System Health',
      value: '99.7%',
      change: '+0.1%',
      icon: Shield,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  const recentActivities = [
    { type: 'user', message: 'New researcher registered: Dr. Sharma', time: '2 min ago', status: 'success' },
    { type: 'system', message: 'Database backup completed', time: '15 min ago', status: 'success' },
    { type: 'alert', message: 'High storage usage detected', time: '1 hour ago', status: 'warning' },
    { type: 'user', message: 'Bulk data upload by Marine Institute', time: '2 hours ago', status: 'info' },
    { type: 'system', message: 'Security scan completed', time: '4 hours ago', status: 'success' }
  ];

  return (
    <Layout
      user={user}
      currentPage="admin"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              System administration and user management
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <Shield className="h-3 w-3 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className={`${stat.bgColor} border-0`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-xs ${stat.color} mt-1`}>{stat.change} from last week</p>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent System Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#003366]" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system and user activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`flex-shrink-0 mt-0.5 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'warning' ? 'text-orange-600' :
                      activity.status === 'error' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {activity.status === 'success' ? <CheckCircle className="h-4 w-4" /> :
                       activity.status === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                       <Activity className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-[#003366]" />
                Admin Actions
              </CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start bg-[#003366] hover:bg-[#004080]"
                  onClick={() => onNavigate('settings')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  System Monitoring
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('dataExplorer')}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Data Management
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('reports')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">System Maintenance</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      Scheduled maintenance window: Sunday 2:00 AM - 4:00 AM IST
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-[#003366]" />
              System Health Overview
            </CardTitle>
            <CardDescription>Current system status and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.7%</div>
                <div className="text-sm text-gray-600">Uptime</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2.3s</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
                <div className="text-xs text-gray-500 mt-1">API endpoints</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">847 GB</div>
                <div className="text-sm text-gray-600">Storage Used</div>
                <div className="text-xs text-gray-500 mt-1">of 2 TB capacity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}