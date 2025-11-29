import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MapPin, 
  Camera, 
  FileText, 
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Navigation,
  Thermometer,
  Droplet,
  Fish,
  TreePine,
  Target,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from "sonner";
import { RouteName } from '../routes-maps';
interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface ConservationToolsProps {
  user: User|null;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function ConservationTools({ user, onNavigate, onLogout, language }: ConservationToolsProps) {
  const [activeReport, setActiveReport] = useState('');
  const [reportData, setReportData] = useState({
    location: '',
    coordinates: '',
    species: '',
    observation: '',
    threat: '',
    urgency: 'medium',
    weather: '',
    temperature: '',
    visibility: ''
  });

  // Field reports data
  const fieldReports = [
    {
      id: 'FR001',
      title: 'Coral Bleaching Event - Lakshadweep',
      location: 'Agatti Island',
      status: 'Critical',
      submitted: '2024-01-15',
      reporter: 'Dr. Marine Researcher',
      priority: 'High',
      coordinates: '10.8517°N, 72.1781°E'
    },
    {
      id: 'FR002',
      title: 'Illegal Fishing Activity Report',
      location: 'Karnataka Coast',
      status: 'Under Investigation',
      submitted: '2024-01-14',
      reporter: 'Field Officer',
      priority: 'Critical',
      coordinates: '14.8593°N, 74.1289°E'
    },
    {
      id: 'FR003',
      title: 'Sea Turtle Nesting Survey',
      location: 'Goa Beaches',
      status: 'Completed',
      submitted: '2024-01-12',
      reporter: 'Conservation Team',
      priority: 'Medium',
      coordinates: '15.2993°N, 74.1240°E'
    }
  ];

  // Conservation plans data
  const conservationPlans = [
    {
      id: 'CP001',
      title: 'Arabian Sea Marine Protected Area Expansion',
      status: 'Active',
      progress: 75,
      startDate: '2023-06-01',
      endDate: '2024-12-31',
      budget: '₹2.5 Crores',
      objectives: ['Expand MPA coverage by 30%', 'Establish 5 new monitoring stations', 'Train 50 local fishermen'],
      milestones: [
        { task: 'Site Survey Completion', status: 'completed', date: '2023-08-15' },
        { task: 'Stakeholder Consultation', status: 'completed', date: '2023-10-30' },
        { task: 'Equipment Procurement', status: 'in-progress', date: '2024-02-15' },
        { task: 'Community Training Program', status: 'pending', date: '2024-06-01' }
      ]
    },
    {
      id: 'CP002',
      title: 'Coral Restoration Initiative - Andaman Islands',
      status: 'Planning',
      progress: 25,
      startDate: '2024-03-01',
      endDate: '2026-02-28',
      budget: '₹4.2 Crores',
      objectives: ['Restore 500 sq meters of coral', 'Establish coral nurseries', 'Monitor recovery progress'],
      milestones: [
        { task: 'Initial Assessment', status: 'completed', date: '2024-01-10' },
        { task: 'Funding Approval', status: 'in-progress', date: '2024-02-15' },
        { task: 'Equipment Setup', status: 'pending', date: '2024-04-01' },
        { task: 'Community Engagement', status: 'pending', date: '2024-05-01' }
      ]
    }
  ];

  const submitFieldReport = () => {
    if (!reportData.location || !reportData.observation) {
      toast.error("Please fill in required fields");
      return;
    }

    toast.success("Field report submitted successfully");
    
    // Reset form
    setReportData({
      location: '',
      coordinates: '',
      species: '',
      observation: '',
      threat: '',
      urgency: 'medium',
      weather: '',
      temperature: '',
      visibility: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Under Investigation': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'High': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'Medium': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Layout currentPage='conservationTools' user={user} onNavigate={onNavigate} onLogout={onLogout} language={language}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">Conservation Management</h1>
            <p className="text-muted-foreground mt-2">
              Field reporting and conservation planning tools for marine ecosystem protection
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Conservation Tools
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="reporting" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reporting">Field Reporting</TabsTrigger>
            <TabsTrigger value="plans">Conservation Plans</TabsTrigger>
            <TabsTrigger value="monitoring">Progress Monitoring</TabsTrigger>
          </TabsList>

          {/* Field Reporting Tab */}
          <TabsContent value="reporting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* New Report Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Submit Field Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location *</label>
                      <Input
                        value={reportData.location}
                        onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Location name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">GPS Coordinates</label>
                      <Input
                        value={reportData.coordinates}
                        onChange={(e) => setReportData(prev => ({ ...prev, coordinates: e.target.value }))}
                        placeholder="Lat, Long"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Species Observed</label>
                    <Input
                      value={reportData.species}
                      onChange={(e) => setReportData(prev => ({ ...prev, species: e.target.value }))}
                      placeholder="Species name or description"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Key Observations *</label>
                    <Textarea
                      value={reportData.observation}
                      onChange={(e) => setReportData(prev => ({ ...prev, observation: e.target.value }))}
                      placeholder="Detailed description of observations"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Threats Identified</label>
                    <Textarea
                      value={reportData.threat}
                      onChange={(e) => setReportData(prev => ({ ...prev, threat: e.target.value }))}
                      placeholder="Any threats or conservation concerns"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                      <Select value={reportData.urgency} onValueChange={(value:string) => setReportData(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Water Temperature (°C)</label>
                      <Input
                        value={reportData.temperature}
                        onChange={(e) => setReportData(prev => ({ ...prev, temperature: e.target.value }))}
                        placeholder="27.5"
                        type="number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Visibility (m)</label>
                      <Input
                        value={reportData.visibility}
                        onChange={(e) => setReportData(prev => ({ ...prev, visibility: e.target.value }))}
                        placeholder="15"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photos
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      GPS Location
                    </Button>
                  </div>

                  <Button onClick={submitFieldReport} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Field Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fieldReports.map((report) => (
                      <div
                        key={report.id}
                        className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => setActiveReport(report.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{report.title}</h4>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {report.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {report.submitted}
                          </div>
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {report.reporter}
                          </div>
                          <div className="flex items-center">
                            {getPriorityIcon(report.priority)}
                            <span className="ml-1">{report.priority}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">{report.coordinates}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Conservation Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="space-y-6">
              {conservationPlans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <Target className="w-5 h-5 mr-2" />
                          {plan.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <Badge className={getStatusColor(plan.status)}>
                            {plan.status}
                          </Badge>
                          <span>Budget: {plan.budget}</span>
                          <span>{plan.startDate} - {plan.endDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{plan.progress}%</div>
                        <div className="text-sm text-gray-500">Complete</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Objectives */}
                      <div>
                        <h4 className="font-medium mb-3">Key Objectives</h4>
                        <ul className="space-y-2">
                          {plan.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                              <span className="text-sm">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Milestones */}
                      <div>
                        <h4 className="font-medium mb-3">Project Milestones</h4>
                        <div className="space-y-3">
                          {plan.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              {getMilestoneIcon(milestone.status)}
                              <div className="flex-1">
                                <p className="text-sm font-medium">{milestone.task}</p>
                                <p className="text-xs text-gray-500">{milestone.date}</p>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  milestone.status === 'completed' ? 'text-green-600' :
                                  milestone.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'
                                }`}
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${plan.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Conservation Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">145</div>
                      <div className="text-sm text-gray-600">Species Protected</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2,847</div>
                      <div className="text-sm text-gray-600">Hectares Conserved</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">23</div>
                      <div className="text-sm text-gray-600">Active Projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Coral restoration milestone achieved</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">New threat report submitted</p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="w-4 h-4 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Community training completed</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Site Map
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Photo Gallery
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('marineMap')}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Marine Map View
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}