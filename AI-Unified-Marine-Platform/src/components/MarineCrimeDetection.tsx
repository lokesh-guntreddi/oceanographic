import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Satellite, 
  Eye,
  Radio,
  Phone,
  Camera,
  Clock,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  Bell,
  Users,
  Activity,
  Zap,
  Target,
  Navigation,
  Crosshair,
  Radar,
  Signal,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  FileImage,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../utils/translations';
import { RouteName } from '../routes-maps';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface MarineCrimeDetectionProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function MarineCrimeDetection({ user, onNavigate, onLogout, language }: MarineCrimeDetectionProps) {
  const t = useTranslation(language);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [liveMonitoring, setLiveMonitoring] = useState(true);
  const [autoAlerts, setAutoAlerts] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');

  // Simulate real-time monitoring data
  const [monitoringStats, setMonitoringStats] = useState({
    activeSatellites: 8,
    monitoringZones: 15,
    activeVessels: 234,
    alertsToday: 12,
    violationsDetected: 3,
    authoritiesAlerted: 2
  });

  const restrictedZones = [
    {
      id: 'RZ001',
      name: 'Marine National Park - Lakshadweep',
      coordinates: '10.5667° N, 72.6417° E',
      radius: '25 km',
      restrictions: ['No fishing', 'No anchoring', 'Speed limit 5 knots'],
      status: 'Active',
      violationCount: 5
    },
    {
      id: 'RZ002', 
      name: 'Whale Migration Corridor - Arabian Sea',
      coordinates: '15.2993° N, 73.1240° E',
      radius: '50 km',
      restrictions: ['No fishing', 'No loud sounds', 'Maintain 500m distance'],
      status: 'Active',
      violationCount: 2
    },
    {
      id: 'RZ003',
      name: 'Coral Breeding Area - Andaman Sea',
      coordinates: '11.7401° N, 92.6586° E', 
      radius: '15 km',
      restrictions: ['No anchoring', 'No diving without permit'],
      status: 'Seasonal',
      violationCount: 1
    },
    {
      id: 'RZ004',
      name: 'Turtle Nesting Beach - Odisha Coast',
      coordinates: '19.8135° N, 85.8312° E',
      radius: '10 km',
      restrictions: ['No beach access during nesting season', 'No lights after sunset'],
      status: 'Active',
      violationCount: 8
    }
  ];

  const recentIncidents = [
    {
      id: 'INC001',
      type: 'Illegal Fishing',
      vessel: 'Unregistered Trawler',
      location: 'Lakshadweep Marine Park',
      zone: 'RZ001',
      coordinates: '10.5667° N, 72.6417° E',
      timestamp: '2024-12-21 14:30:25',
      severity: 'High',
      status: 'Alert Sent',
      description: 'Large commercial trawler detected fishing in protected coral reef area',
      evidence: ['Satellite imagery', 'AIS tracking data', 'Sonar detection'],
      authorities: ['Coast Guard', 'Marine Police', 'Local Navy'],
      response: 'Coast Guard vessel dispatched - ETA 45 minutes',
      vesselDetails: {
        length: '45m',
        type: 'Commercial Trawler',
        speed: '8.5 knots',
        heading: '225°'
      }
    },
    {
      id: 'INC002',
      type: 'Restricted Area Violation',
      vessel: 'Tourist Boat "Sea Explorer"',
      location: 'Whale Migration Corridor',
      zone: 'RZ002',
      coordinates: '15.2993° N, 73.1240° E', 
      timestamp: '2024-12-21 12:15:10',
      severity: 'Medium',
      status: 'Under Investigation',
      description: 'Tourist vessel entered whale protection zone during active migration period',
      evidence: ['GPS tracking', 'Satellite imagery'],
      authorities: ['Marine Wildlife Department'],
      response: 'Warning issued via radio - vessel complied',
      vesselDetails: {
        length: '25m',
        type: 'Tourist Vessel',
        speed: '12 knots',
        heading: '045°'
      }
    },
    {
      id: 'INC003',
      type: 'Pollution Discharge',
      vessel: 'Cargo Ship "MV Chennai Star"',
      location: 'Bay of Bengal',
      zone: 'General Waters',
      coordinates: '13.0827° N, 80.2707° E',
      timestamp: '2024-12-21 08:45:30',
      severity: 'High',
      status: 'Resolved',
      description: 'Suspected oil discharge detected via satellite monitoring',
      evidence: ['Thermal imaging', 'Oil spill detection', 'Water quality sensors'],
      authorities: ['Pollution Control Board', 'Coast Guard'],
      response: 'Ship inspected - minor bilge leak fixed',
      vesselDetails: {
        length: '180m',
        type: 'Cargo Vessel',
        speed: '14 knots',
        heading: '090°'
      }
    }
  ];

  const violationTrends = [
    { month: 'Jul', illegal_fishing: 15, area_violations: 8, pollution: 3, total: 26 },
    { month: 'Aug', illegal_fishing: 12, area_violations: 11, pollution: 5, total: 28 },
    { month: 'Sep', illegal_fishing: 18, area_violations: 6, pollution: 2, total: 26 },
    { month: 'Oct', illegal_fishing: 22, area_violations: 9, pollution: 4, total: 35 },
    { month: 'Nov', illegal_fishing: 19, area_violations: 13, pollution: 6, total: 38 },
    { month: 'Dec', illegal_fishing: 14, area_violations: 7, pollution: 3, total: 24 }
  ];

  const responseTimeData = [
    { authority: 'Coast Guard', avgTime: 25, incidents: 45 },
    { authority: 'Marine Police', avgTime: 18, incidents: 32 },
    { authority: 'Navy', avgTime: 35, incidents: 12 },
    { authority: 'Port Authority', avgTime: 15, incidents: 28 },
    { authority: 'Pollution Control', avgTime: 42, incidents: 18 }
  ];

  const violationTypes = [
    { name: 'Illegal Fishing', value: 156, color: '#ef4444' },
    { name: 'Area Violations', value: 89, color: '#f97316' },
    { name: 'Pollution', value: 34, color: '#eab308' },
    { name: 'Speed Violations', value: 67, color: '#3b82f6' },
    { name: 'Anchoring', value: 23, color: '#8b5cf6' }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (liveMonitoring) {
        setMonitoringStats(prev => ({
          ...prev,
          activeVessels: prev.activeVessels + Math.floor(Math.random() * 10) - 5,
          alertsToday: prev.alertsToday + (Math.random() > 0.95 ? 1 : 0)
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [liveMonitoring]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200'; 
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alert Sent': return 'bg-red-100 text-red-800';
      case 'Under Investigation': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'False Alarm': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredIncidents = recentIncidents.filter(incident => {
    const matchesSearch = incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.vessel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesZone = selectedZone === 'all' || incident.zone === selectedZone;
    return matchesSearch && matchesStatus && matchesZone;
  });

  const handleSendAlert = (incident: any) => {
    // Simulate sending alert to authorities
    console.log('Alert sent for incident:', incident.id);
    setAlertDialogOpen(false);
  };

  const getRolePermissions = (userRole: string) => {
    const permissions = {
      researcher: {
        canViewIncidents: true,
        canSendAlerts: false,
        canModifyZones: false,
        canAccessEvidence: true,
        canViewStatistics: true
      },
      policymaker: {
        canViewIncidents: true,
        canSendAlerts: true,
        canModifyZones: true,
        canAccessEvidence: true,
        canViewStatistics: true
      },
      conservationist: {
        canViewIncidents: true,
        canSendAlerts: true,
        canModifyZones: false,
        canAccessEvidence: true,
        canViewStatistics: true
      }
    };
    return permissions[userRole as keyof typeof permissions] || permissions.researcher;
  };

  const userPermissions = getRolePermissions(user?.role);

  return (
    <Layout
      user={user}
      currentPage="marineCrimeDetection"
      onNavigate={onNavigate}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield className="h-8 w-8 text-[#003366] mr-3" />
              Marine Crime Detection Hub
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time satellite monitoring and automated threat detection for marine protected areas
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${liveMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {liveMonitoring ? 'Live Monitoring Active' : 'Monitoring Paused'}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setLiveMonitoring(!liveMonitoring)}
            >
              {liveMonitoring ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {liveMonitoring ? 'Pause' : 'Start'} Monitoring
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Real-time Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Satellites</p>
                  <p className="text-2xl font-bold text-gray-900">{monitoringStats.activeSatellites}</p>
                </div>
                <Satellite className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monitoring Zones</p>
                  <p className="text-2xl font-bold text-gray-900">{monitoringStats.monitoringZones}</p>
                </div>
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Vessels</p>
                  <p className="text-2xl font-bold text-gray-900">{monitoringStats.activeVessels}</p>
                </div>
                <Navigation className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alerts Today</p>
                  <p className="text-2xl font-bold text-gray-900">{monitoringStats.alertsToday}</p>
                </div>
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Violations</p>
                  <p className="text-2xl font-bold text-gray-900">{monitoringStats.violationsDetected}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Authorities Alerted</p>
                  <p className="text-2xl font-bold text-gray-900">{monitoringStats.authoritiesAlerted}</p>
                </div>
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="live-monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="live-monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="restricted-zones">Restricted Zones</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          {/* Live Monitoring Tab */}
          <TabsContent value="live-monitoring" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Satellite Map View */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-[#003366]" />
                    Real-time Satellite View
                  </CardTitle>
                  <CardDescription>Live satellite monitoring of marine protected areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-lg h-80 overflow-hidden">
                    {/* Real Satellite Earth View */}
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1640697687394-d02650d7ecc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3b3JsZCUyMG9jZWFuJTIwbWFwJTIwYmx1ZSUyMG1hcmJsZXxlbnwxfHx8fDE3NTg2NTA5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Real-time Satellite Marine Monitoring"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Live monitoring overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-green-600/10"></div>
                    
                    {/* Satellite scan lines for live effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse"></div>
                    
                    {/* Restricted Zone Overlays */}
                    <div className="absolute inset-0">
                      {/* Zone 1 - High Risk */}
                      <div className="absolute top-1/4 left-1/3 w-16 h-16 border-2 border-red-500 rounded-full bg-red-500/20 animate-pulse">
                        <div className="absolute inset-2 bg-red-500 rounded-full animate-ping"></div>
                        <div className="absolute -top-6 -left-8 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          VIOLATION
                        </div>
                      </div>
                      
                      {/* Zone 2 - Protected Area */}
                      <div className="absolute top-2/3 right-1/4 w-20 h-20 border-2 border-green-500 rounded-full bg-green-500/20">
                        <div className="absolute inset-4 bg-green-500 rounded-full"></div>
                      </div>
                      
                      {/* Zone 3 - Monitoring */}
                      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-blue-500 rounded-full bg-blue-500/20">
                        <div className="absolute inset-2 bg-blue-500 rounded-full"></div>
                      </div>

                      {/* Vessel Markers */}
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                      <div className="absolute top-3/5 right-2/5 w-2 h-2 bg-yellow-400 rounded-full shadow-lg"></div>
                      <div className="absolute bottom-2/5 left-3/5 w-2 h-2 bg-orange-400 rounded-full shadow-lg"></div>
                    </div>

                    {/* Control Overlay */}
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-black/50 text-white border-gray-500">
                        <Crosshair className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-black/50 text-white border-gray-500">
                        <Radar className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-black/50 text-white border-gray-500">
                        <Signal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Legend */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white p-3 rounded-lg text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>Violation</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>Protected</div>
                        <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>Monitoring</div>
                        <div className="flex items-center"><div className="w-2 h-2 bg-white rounded-full mr-2"></div>Vessel</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                      Active Alerts
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {recentIncidents.filter(i => i.status === 'Alert Sent').length} Active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-72 overflow-y-auto">
                    {recentIncidents.filter(incident => incident.status === 'Alert Sent').map((incident) => (
                      <div key={incident.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-red-900">{incident.type}</h4>
                            <p className="text-sm text-red-700 mt-1">{incident.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-red-600">
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {incident.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(incident.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          {userPermissions.canSendAlerts && (
                            <Button size="sm" variant="destructive">
                              <Send className="h-4 w-4 mr-2" />
                              Alert Sent
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {recentIncidents.filter(i => i.status === 'Alert Sent').length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                        <p>No active alerts</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-[#003366]" />
                  System Status & Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Monitoring Controls</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="live-monitoring">Live Monitoring</Label>
                      <Switch 
                        id="live-monitoring"
                        checked={liveMonitoring}
                        onCheckedChange={setLiveMonitoring}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-alerts">Auto Alerts</Label>
                      <Switch 
                        id="auto-alerts"
                        checked={autoAlerts}
                        onCheckedChange={setAutoAlerts}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Satellite Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CARTOSAT-3</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>RESOURCESAT-2</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>SENTINEL-2</span>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Standby</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Alert Channels</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Radio className="h-3 w-3 mr-1" />
                          Coast Guard Radio
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          Emergency Hotline
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Bell className="h-3 w-3 mr-1" />
                          SMS Alerts
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Response Times</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Coast Guard</span>
                        <span className="text-green-600 font-medium">22 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Marine Police</span>
                        <span className="text-green-600 font-medium">15 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Navy</span>
                        <span className="text-yellow-600 font-medium">38 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="incident-search">Search Incidents</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="incident-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by type, vessel, or location..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status-filter">Status Filter</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Alert Sent">Alert Sent</SelectItem>
                        <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="False Alarm">False Alarm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zone-filter">Zone Filter</Label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Zones</SelectItem>
                        {restrictedZones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incidents List */}
            <div className="grid gap-4">
              {filteredIncidents.map((incident) => (
                <Card key={incident.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 flex items-center">
                              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                              {incident.type} - {incident.vessel}
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mt-2">
                              <div><span className="font-medium">Location:</span> {incident.location}</div>
                              <div><span className="font-medium">Coordinates:</span> {incident.coordinates}</div>
                              <div><span className="font-medium">Time:</span> {incident.timestamp}</div>
                              <div><span className="font-medium">Response:</span> {incident.response}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getSeverityColor(incident.severity)}`}
                            >
                              {incident.severity}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getStatusColor(incident.status)}`}
                            >
                              {incident.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{incident.description}</p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Vessel Details</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Length: {incident.vesselDetails.length}</div>
                              <div>Type: {incident.vesselDetails.type}</div>
                              <div>Speed: {incident.vesselDetails.speed}</div>
                              <div>Heading: {incident.vesselDetails.heading}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Evidence</h4>
                            <div className="space-y-1">
                              {incident.evidence.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Authorities Notified</h4>
                            <div className="space-y-1">
                              {incident.authorities.map((authority, index) => (
                                <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1 bg-blue-100 text-blue-800">
                                  {authority}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 lg:ml-6 lg:w-40">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {userPermissions.canAccessEvidence && (
                          <Button variant="outline" size="sm" className="w-full">
                            <FileImage className="h-4 w-4 mr-2" />
                            Evidence
                          </Button>
                        )}
                        {userPermissions.canSendAlerts && incident.status !== 'Resolved' && (
                          <Button size="sm" className="w-full bg-[#003366] hover:bg-[#004080]">
                            <Send className="h-4 w-4 mr-2" />
                            Send Alert
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Restricted Zones Tab */}
          <TabsContent value="restricted-zones" className="space-y-6">
            <div className="grid gap-6">
              {restrictedZones.map((zone) => (
                <Card key={zone.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{zone.name}</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div><span className="font-medium">Zone ID:</span> {zone.id}</div>
                          <div><span className="font-medium">Coordinates:</span> {zone.coordinates}</div>
                          <div><span className="font-medium">Radius:</span> {zone.radius}</div>
                          <div><span className="font-medium">Violations:</span> {zone.violationCount} this month</div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm text-gray-700 mb-2">Restrictions</h4>
                          <div className="flex flex-wrap gap-2">
                            {zone.restrictions.map((restriction, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {restriction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant="secondary" 
                          className={`${zone.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {zone.status}
                        </Badge>
                        {userPermissions.canModifyZones && (
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Violation Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Violation Trends (6 Months)</CardTitle>
                  <CardDescription>Monthly breakdown of detected violations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={violationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="illegal_fishing" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="area_violations" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="pollution" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Violation Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Violation Types Distribution</CardTitle>
                  <CardDescription>Breakdown by violation category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={violationTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {violationTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Response Time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Authority Response Times</CardTitle>
                  <CardDescription>Average response time by authority (minutes)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="authority" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgTime" fill="#003366" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Success Rate */}
              <Card>
                <CardHeader>
                  <CardTitle>Detection & Response Success Rate</CardTitle>
                  <CardDescription>Effectiveness metrics for the monitoring system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Detection Accuracy</span>
                        <span className="text-sm text-gray-600">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Alert Response Rate</span>
                        <span className="text-sm text-gray-600">87.5%</span>
                      </div>
                      <Progress value={87.5} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">False Positive Rate</span>
                        <span className="text-sm text-gray-600">8.3%</span>
                      </div>
                      <Progress value={8.3} className="h-2 [&>div]:bg-orange-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Violation Prevention</span>
                        <span className="text-sm text-gray-600">76.8%</span>
                      </div>
                      <Progress value={76.8} className="h-2 [&>div]:bg-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Parameters</CardTitle>
                  <CardDescription>Configure automated detection thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="detection-sensitivity">Detection Sensitivity</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">Low</span>
                      <Input 
                        type="range" 
                        min="1" 
                        max="10" 
                        defaultValue="7"
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600">High</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="alert-threshold">Alert Threshold</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Alert on all detections</SelectItem>
                        <SelectItem value="medium">Medium - Alert on confirmed violations</SelectItem>
                        <SelectItem value="high">High - Alert only on critical violations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userPermissions.canModifyZones && (
                    <Button className="w-full bg-[#003366] hover:bg-[#004080]">
                      Save Detection Settings
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Configuration</CardTitle>
                  <CardDescription>Manage notification and escalation settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <Switch id="email-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <Switch id="sms-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="radio-alerts">Radio Alerts</Label>
                      <Switch id="radio-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-escalation">Auto Escalation</Label>
                      <Switch id="auto-escalation" />
                    </div>
                  </div>

                  {userPermissions.canSendAlerts && (
                    <Button className="w-full bg-[#003366] hover:bg-[#004080]">
                      Save Alert Settings
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Role-based Access Control */}
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>Your current permissions in the Marine Crime Detection System</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Your Role: {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">View Incidents</span>
                        {userPermissions.canViewIncidents ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> : 
                          <XCircle className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Send Alerts</span>
                        {userPermissions.canSendAlerts ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> : 
                          <XCircle className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Modify Zones</span>
                        {userPermissions.canModifyZones ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> : 
                          <XCircle className="h-4 w-4 text-red-600" />
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Access Evidence</span>
                        {userPermissions.canAccessEvidence ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> : 
                          <XCircle className="h-4 w-4 text-red-600" />
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Hub Access</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      This Marine Crime Detection Hub is accessible to all authorized personnel across research, 
                      policy, and conservation teams to ensure coordinated response to marine violations.
                    </p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>• Researchers: Data access and analysis</div>
                      <div>• Policymakers: Full system control</div>
                      <div>• Conservationists: Field response coordination</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}