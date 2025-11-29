import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  Activity,
  Zap,
  Target,
  AlertTriangle,
  Download,
  RefreshCw,
  Calendar,
  Map,
  Grid3X3,
  Thermometer,
  Waves,
  Clock,
  Fish,
  Brain,
  Database,
  Eye
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { RouteName } from '../routes-maps';
interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface UnifiedAnalyticsProps {
  user: User | null;
  onNavigate: (page:RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function UnifiedAnalytics({ user, onNavigate, onLogout, language }: UnifiedAnalyticsProps) {
  const [viewMode, setViewMode] = useState<'standard' | 'dynamic'>('dynamic');
  const [timeRange, setTimeRange] = useState('1m');
  const [selectedMetric, setSelectedMetric] = useState('fish-population');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const t = useTranslation(language);

  // Sample data for different chart types
  const speciesPopulationData = [
    { month: 'Jan', sardines: 1200, mackerel: 800, tuna: 400, anchovies: 600 },
    { month: 'Feb', sardines: 1100, mackerel: 750, tuna: 450, anchovies: 580 },
    { month: 'Mar', sardines: 1300, mackerel: 820, tuna: 380, anchovies: 620 },
    { month: 'Apr', sardines: 1250, mackerel: 780, tuna: 420, anchovies: 590 },
    { month: 'May', sardines: 1400, mackerel: 900, tuna: 480, anchovies: 650 },
    { month: 'Jun', sardines: 1350, mackerel: 850, tuna: 460, anchovies: 630 }
  ];

  const environmentalData = [
    { time: '00:00', temperature: 26.5, salinity: 35.2, ph: 8.1, oxygen: 6.8 },
    { time: '04:00', temperature: 26.2, salinity: 35.1, ph: 8.0, oxygen: 6.9 },
    { time: '08:00', temperature: 27.1, salinity: 35.3, ph: 8.2, oxygen: 7.1 },
    { time: '12:00', temperature: 28.4, salinity: 35.4, ph: 8.3, oxygen: 7.2 },
    { time: '16:00', temperature: 29.1, salinity: 35.5, ph: 8.2, oxygen: 7.0 },
    { time: '20:00', temperature: 27.8, salinity: 35.3, ph: 8.1, oxygen: 6.9 }
  ];

  const biodiversityData = [
    { name: 'Fish Species', value: 45, color: '#3b82f6' },
    { name: 'Marine Mammals', value: 12, color: '#10b981' },
    { name: 'Crustaceans', value: 28, color: '#f59e0b' },
    { name: 'Mollusks', value: 35, color: '#ef4444' },
    { name: 'Other', value: 18, color: '#8b5cf6' }
  ];

  const predictionData = [
    { species: 'Sardines', current: 1350, predicted: 1420, confidence: 85 },
    { species: 'Mackerel', current: 850, predicted: 780, confidence: 78 },
    { species: 'Tuna', current: 460, predicted: 520, confidence: 92 },
    { species: 'Anchovies', current: 630, predicted: 680, confidence: 76 }
  ];

  const realTimeMetrics = [
    { 
      id: 'active-sensors', 
      label: 'Active Sensors', 
      value: '247', 
      change: '+12%', 
      trend: 'up',
      icon: Activity,
      color: 'text-green-600'
    },
    { 
      id: 'data-points', 
      label: 'Data Points Today', 
      value: '89.2K', 
      change: '+8%', 
      trend: 'up',
      icon: Database,
      color: 'text-blue-600'
    },
    { 
      id: 'species-detected', 
      label: 'Species Detected', 
      value: '156', 
      change: '+3%', 
      trend: 'up',
      icon: Fish,
      color: 'text-teal-600'
    },
    { 
      id: 'alerts-active', 
      label: 'Active Alerts', 
      value: '7', 
      change: '-15%', 
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <Layout user={user} currentPage="analytics" onNavigate={onNavigate as any} onLogout={onLogout} language={language}>
      <div className="p-6 space-y-6">
        {/* Header with Mode Toggle */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">
              {viewMode === 'dynamic' ? 'Dynamic Analytics Dashboard' : 'Standard Analytics'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {viewMode === 'dynamic' 
                ? 'Real-time marine ecosystem analysis with AI insights'
                : 'Traditional marine research analytics and reports'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Standard</span>
              <Switch 
                checked={viewMode === 'dynamic'} 
                onCheckedChange={(checked:boolean) => setViewMode(checked ? 'dynamic' : 'standard')}
              />
              <span className="text-sm">Dynamic</span>
              <Brain className="w-4 h-4 ml-2" />
            </div>
            
            {viewMode === 'dynamic' && (
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={realTimeEnabled} 
                  onCheckedChange={setRealTimeEnabled}
                />
                <span className="text-sm flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Metrics (Dynamic Mode Only) */}
        {viewMode === 'dynamic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {realTimeMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <div className="flex items-center space-x-1">
                          {metric.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <IconComponent className={`w-8 h-8 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Main Analytics Content */}
        <Tabs defaultValue={viewMode === 'dynamic' ? 'real-time' : 'population'} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none">
              {viewMode === 'dynamic' ? (
                <>
                  <TabsTrigger value="real-time">Real-time</TabsTrigger>
                  <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="population">Population</TabsTrigger>
                  <TabsTrigger value="environmental">Environmental</TabsTrigger>
                  <TabsTrigger value="biodiversity">Biodiversity</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </>
              )}
            </TabsList>

            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Dynamic Mode Tabs */}
          {viewMode === 'dynamic' && (
            <>
              <TabsContent value="real-time" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Live Environmental Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={environmentalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
                          <Line type="monotone" dataKey="salinity" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Fish className="w-5 h-5 mr-2" />
                        Species Detection Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={speciesPopulationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="sardines" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                          <Area type="monotone" dataKey="mackerel" stackId="1" stroke="#10b981" fill="#10b981" />
                          <Area type="monotone" dataKey="tuna" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="w-5 h-5 mr-2" />
                        AI Population Predictions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {predictionData.map((item) => (
                          <div key={item.species} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{item.species}</span>
                              <Badge variant={item.predicted > item.current ? "default" : "secondary"}>
                                {item.predicted > item.current ? 'Increase' : 'Decrease'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Current</p>
                                <p className="font-semibold">{item.current}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Predicted</p>
                                <p className="font-semibold">{item.predicted}</p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-gray-600 mb-1">Confidence: {item.confidence}%</p>
                              <Progress value={item.confidence} className="h-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Model Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Prediction Accuracy</span>
                            <span>87.3%</span>
                          </div>
                          <Progress value={87.3} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Data Quality Score</span>
                            <span>92.1%</span>
                          </div>
                          <Progress value={92.1} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Model Confidence</span>
                            <span>84.5%</span>
                          </div>
                          <Progress value={84.5} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}

          {/* Standard Mode Tabs */}
          {viewMode === 'standard' && (
            <>
              <TabsContent value="population" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Species Population Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={speciesPopulationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="sardines" stroke="#3b82f6" strokeWidth={2} />
                          <Line type="monotone" dataKey="mackerel" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="tuna" stroke="#f59e0b" strokeWidth={2} />
                          <Line type="monotone" dataKey="anchovies" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Biodiversity Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Tooltip />
                          <Cell />
                          {biodiversityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={environmentalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="salinity" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="oxygen" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}