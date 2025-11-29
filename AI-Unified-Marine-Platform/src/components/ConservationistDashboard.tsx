import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Camera, 
  FileText, 
  Users,
  TrendingDown,
  TrendingUp,
  Upload,
  RefreshCw,
  PlusCircle,
  Eye,
  Calendar,
  Star
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../utils/translations';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {RouteName} from '../routes-maps';
interface ConservationistDashboardProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function ConservationistDashboard({ user, onNavigate, onLogout, language }: ConservationistDashboardProps) {
  const t = useTranslation(language);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    location: '',
    species: '',
    observations: '',
    severity: 'medium',
    coordinates: ''
  });

  const conservationKPIs = [
    {
      title: t('species_at_risk'),
      value: '47',
      change: '+3',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: t('critical_habitats'),
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Shield,
      color: 'text-orange-600'
    },
    {
      title: 'Protected Areas',
      value: '8.2%',
      change: '+0.5%',
      trend: 'up',
      icon: MapPin,
      color: 'text-green-600'
    },
    {
      title: 'Community Reports',
      value: '234',
      change: '+18',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    }
  ];

  const speciesAtRisk = [
    { 
      name: 'Blue Whale', 
      status: 'Critically Endangered', 
      population: 156, 
      trend: -12,
      lastSeen: '2024-12-15',
      location: 'Arabian Sea'
    },
    { 
      name: 'Olive Ridley Turtle', 
      status: 'Vulnerable', 
      population: 2340, 
      trend: -8,
      lastSeen: '2024-12-18',
      location: 'Bay of Bengal'
    },
    { 
      name: 'Whale Shark', 
      status: 'Endangered', 
      population: 89, 
      trend: -15,
      lastSeen: '2024-12-12',
      location: 'Gujarat Coast'
    },
    { 
      name: 'Green Turtle', 
      status: 'Endangered', 
      population: 567, 
      trend: -5,
      lastSeen: '2024-12-20',
      location: 'Lakshadweep'
    },
    { 
      name: 'Dugong', 
      status: 'Vulnerable', 
      population: 234, 
      trend: -18,
      lastSeen: '2024-12-10',
      location: 'Tamil Nadu Coast'
    }
  ];

  const communityReports = [
    {
      id: 1,
      reporter: 'Fisherman\'s Association, Kerala',
      location: 'Kochi Coast',
      species: 'Dolphin',
      observation: 'Unusual dolphin behavior, swimming in shallow waters',
      date: '2024-12-20',
      status: 'Under Review',
      severity: 'medium',
      coordinates: '9.9312° N, 76.2673° E'
    },
    {
      id: 2,
      reporter: 'Marine Volunteer, Karnataka',
      location: 'Mangalore Beach',
      species: 'Sea Turtle',
      observation: 'Dead turtle found on beach, possible plastic ingestion',
      date: '2024-12-19',
      status: 'Investigated',
      severity: 'high',
      coordinates: '12.9141° N, 74.8560° E'
    },
    {
      id: 3,
      reporter: 'Local Diving Club, Goa',
      location: 'Cabo de Rama',
      species: 'Coral',
      observation: 'Coral bleaching observed in reef area',
      date: '2024-12-18',
      status: 'Action Taken',
      severity: 'high',
      coordinates: '15.0872° N, 73.9436° E'
    },
    {
      id: 4,
      reporter: 'Tourism Operator, Andaman',
      location: 'Havelock Island',
      species: 'Manta Ray',
      observation: 'Manta ray sighting - rare for this season',
      date: '2024-12-17',
      status: 'Verified',
      severity: 'low',
      coordinates: '12.0066° N, 93.0076° E'
    }
  ];

  const populationTrends = [
    { month: 'Jan', turtles: 890, whales: 45, dolphins: 234 },
    { month: 'Feb', turtles: 856, whales: 42, dolphins: 221 },
    { month: 'Mar', turtles: 923, whales: 48, dolphins: 245 },
    { month: 'Apr', turtles: 1045, whales: 52, dolphins: 267 },
    { month: 'May', turtles: 1156, whales: 49, dolphins: 289 },
    { month: 'Jun', turtles: 1089, whales: 46, dolphins: 276 },
    { month: 'Jul', turtles: 1234, whales: 51, dolphins: 298 },
    { month: 'Aug', turtles: 1178, whales: 48, dolphins: 287 },
    { month: 'Sep', turtles: 1098, whales: 44, dolphins: 265 },
    { month: 'Oct', turtles: 1034, whales: 41, dolphins: 243 },
    { month: 'Nov', turtles: 976, whales: 38, dolphins: 231 },
    { month: 'Dec', turtles: 912, whales: 35, dolphins: 218 }
  ];

  const handleReportSubmit = () => {
    // Handle report submission
    console.log('Submitting report:', reportForm);
    setReportModalOpen(false);
    // Reset form
    setReportForm({
      location: '',
      species: '',
      observations: '',
      severity: 'medium',
      coordinates: ''
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Action Taken': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Investigated': return 'bg-purple-100 text-purple-800';
      case 'Verified': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout
      user={user}
      currentPage="conservationist"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conservation {t('dashboard')}</h1>
            <p className="text-gray-600 mt-1">
              Monitor marine life, track conservation efforts, and coordinate protection activities.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('refresh')}
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              onClick={() => onNavigate('reports')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Field Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Field Report</DialogTitle>
                  <DialogDescription>
                    Report marine wildlife observations, conservation concerns, or environmental changes for scientific review.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={reportForm.location}
                        onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                        placeholder="e.g., Kochi Beach"
                      />
                    </div>
                    <div>
                      <Label htmlFor="species">Species</Label>
                      <Select value={reportForm.species} onValueChange={(value: string) => setReportForm({...reportForm, species: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="turtle">Sea Turtle</SelectItem>
                          <SelectItem value="whale">Whale</SelectItem>
                          <SelectItem value="dolphin">Dolphin</SelectItem>
                          <SelectItem value="coral">Coral</SelectItem>
                          <SelectItem value="shark">Shark</SelectItem>
                          <SelectItem value="ray">Ray</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="coordinates">Coordinates (Optional)</Label>
                    <Input
                      id="coordinates"
                      value={reportForm.coordinates}
                      onChange={(e) => setReportForm({...reportForm, coordinates: e.target.value})}
                      placeholder="e.g., 9.9312° N, 76.2673° E"
                    />
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={reportForm.severity} onValueChange={(value: string) => setReportForm({...reportForm, severity: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Observation</SelectItem>
                        <SelectItem value="medium">Medium - Concern</SelectItem>
                        <SelectItem value="high">High - Urgent Action</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="observations">Observations</Label>
                    <Textarea
                      id="observations"
                      value={reportForm.observations}
                      onChange={(e) => setReportForm({...reportForm, observations: e.target.value})}
                      placeholder="Describe what you observed..."
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photos
                    </Button>
                    <Button onClick={handleReportSubmit} className="flex-1 bg-[#003366] hover:bg-[#004080]">
                      Submit Report
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {conservationKPIs.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <div className="flex items-center mt-2">
                        {kpi.trend === 'up' ? (
                          <TrendingUp className={`h-4 w-4 mr-1 ${kpi.color}`} />
                        ) : (
                          <TrendingDown className={`h-4 w-4 mr-1 ${kpi.color}`} />
                        )}
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            kpi.trend === 'up' && kpi.title === 'Protected Areas' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {kpi.change}
                        </Badge>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-50 ${kpi.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Species at Risk */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                {t('species_at_risk')}
              </CardTitle>
              <CardDescription>
                Critical species requiring immediate conservation attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {speciesAtRisk.map((species, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{species.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={species.status === 'Critically Endangered' ? 'border-red-500 text-red-700' : 
                                        species.status === 'Endangered' ? 'border-orange-500 text-orange-700' : 
                                        'border-yellow-500 text-yellow-700'}
                            >
                              {species.status}
                            </Badge>
                            <span className="text-sm text-gray-500">Pop: {species.population}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-red-600 mb-1">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{species.trend}%</span>
                      </div>
                      <p className="text-xs text-gray-500">Last seen: {species.lastSeen}</p>
                      <p className="text-xs text-gray-500">{species.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Habitats Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#003366]" />
                {t('critical_habitats')}
              </CardTitle>
              <CardDescription>Protected and vulnerable marine areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg h-64 overflow-hidden">
                {/* Real Satellite Map Background */}
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1722850998715-91dcb2b7d327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHNhdGVsbGl0ZSUyMHZpZXclMjBzcGFjZXxlbnwxfHx8fDE3NTg2NTA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Critical Marine Habitats Satellite View"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Ocean emphasis overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-green-600/20"></div>
                
                {/* Conservation zone overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"></div>
                
                {/* Critical habitat markers with real geographical positioning */}
                <div className="absolute top-[35%] left-[25%] w-6 h-6 bg-red-500 rounded-full border-3 border-white shadow-xl animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-[45%] left-[70%] w-6 h-6 bg-red-500 rounded-full border-3 border-white shadow-xl animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-[20%] left-[60%] w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-[60%] left-[30%] w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-[70%] left-[45%] w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-[25%] left-[80%] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-[55%] left-[15%] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-[40%] left-[85%] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Map legend overlay */}
                <div className="absolute top-4 right-4 bg-white/95 rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-xs font-medium text-gray-900 mb-1">Marine Protected Areas</div>
                  <div className="text-xs text-gray-600">Global Conservation Network</div>
                </div>
                
                {/* Scale indicator */}
                <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-8 h-0.5 bg-[#003366]"></div>
                    <span className="font-medium">500 km</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Critical</span>
                  </div>
                  <span className="font-medium">4 areas</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span>Vulnerable</span>
                  </div>
                  <span className="font-medium">5 areas</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Protected</span>
                  </div>
                  <span className="font-medium">3 areas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Population Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-[#003366]" />
                Population Trends
              </CardTitle>
              <CardDescription>Monthly population counts for key species</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="turtles" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="turtles">Turtles</TabsTrigger>
                  <TabsTrigger value="whales">Whales</TabsTrigger>
                  <TabsTrigger value="dolphins">Dolphins</TabsTrigger>
                </TabsList>
                
                <TabsContent value="turtles">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={populationTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="turtles" 
                        stroke="#059669" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="whales">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={populationTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="whales" 
                        stroke="#dc2626" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="dolphins">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={populationTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="dolphins" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Community Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-[#003366]" />
                {t('community_reports')}
              </CardTitle>
              <CardDescription>Recent field reports from local communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {communityReports.map((report) => (
                  <div key={report.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{report.species} - {report.location}</h4>
                        <p className="text-xs text-gray-600 mb-1">{report.reporter}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getSeverityColor(report.severity)}`}
                        >
                          {report.severity}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(report.status)}`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{report.observation}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {report.date}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {report.coordinates}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => setReportModalOpen(true)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Submit New Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Conservation Plan Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#003366]" />
              {t('conservation_plan')}
            </CardTitle>
            <CardDescription>
              Create and manage conservation action plans for priority species and habitats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Active Plans</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-900">Blue Whale Protection</h5>
                    <p className="text-sm text-blue-700">Ship strike prevention in Arabian Sea</p>
                    <div className="mt-2">
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-blue-600 mt-1">75% complete</p>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-900">Coral Restoration</h5>
                    <p className="text-sm text-green-700">Reef rehabilitation in Lakshadweep</p>
                    <div className="mt-2">
                      <Progress value={45} className="h-2" />
                      <p className="text-xs text-green-600 mt-1">45% complete</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Pending Approval</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <h5 className="font-medium text-orange-900">Turtle Nesting Sites</h5>
                    <p className="text-sm text-orange-700">Beach protection in Odisha</p>
                    <Badge variant="outline" className="mt-2 text-xs border-orange-300 text-orange-700">
                      Awaiting Funds
                    </Badge>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <h5 className="font-medium text-purple-900">Mangrove Conservation</h5>
                    <p className="text-sm text-purple-700">Restoration in Sundarbans</p>
                    <Badge variant="outline" className="mt-2 text-xs border-purple-300 text-purple-700">
                      Under Review
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Quick Actions</h4>
                <div className="space-y-2">
                  <Dialog open={planModalOpen} onOpenChange={setPlanModalOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full justify-start bg-[#003366] hover:bg-[#004080]">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create Conservation Plan</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Plan Title</Label>
                          <Input placeholder="e.g., Whale Shark Protection Initiative" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Target Species</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select species" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="whale">Whale</SelectItem>
                                <SelectItem value="turtle">Sea Turtle</SelectItem>
                                <SelectItem value="coral">Coral</SelectItem>
                                <SelectItem value="mangrove">Mangrove</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Priority Level</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="critical">Critical</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea placeholder="Describe the conservation objectives and approach..." rows={4} />
                        </div>
                        <Button className="w-full bg-[#003366] hover:bg-[#004080]">
                          Create Plan
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Plans
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Template
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}