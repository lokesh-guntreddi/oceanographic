import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Layout } from './Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar
} from 'recharts';
import { 
  Activity, TrendingUp, TrendingDown, Thermometer, Waves, TestTube, 
  Fish, Download, RefreshCw, Calendar, Target, Map, Brain, FileText,
  Layers, Shield, Radar as RadarIcon, BarChart3
} from 'lucide-react';

import { RouteName } from '../routes-maps';

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface DynamicAnalyticsProps {
  user: User | null;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
  currentPage?: string;
}

// Generate realistic marine data for different parameters
const generateParameterData = (parameter: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const baseValues = {
    temperature: { base: 26, variation: 3, trend: 0.5 },
    salinity: { base: 34, variation: 1.5, trend: 0.1 },
    fishCount: { base: 12000, variation: 3000, trend: -500 },
    phLevel: { base: 8.1, variation: 0.2, trend: -0.02 },
    oxygen: { base: 6.5, variation: 1, trend: -0.1 },
    turbidity: { base: 3.5, variation: 1.2, trend: 0.2 }
  };

  const config = baseValues[parameter as keyof typeof baseValues];
  
  return months.map((month, index) => {
    const seasonal = Math.sin((index * Math.PI) / 6) * config.variation * 0.5;
    const trend = config.trend * index;
    const random = (Math.random() - 0.5) * config.variation * 0.5;
    const value = config.base + seasonal + trend + random;
    
    return {
      month,
      value: Math.max(0, Number(value.toFixed(parameter === 'fishCount' ? 0 : 2))),
      rawValue: value
    };
  });
};

// Current metric values
const currentMetrics = {
  temperature: { value: 28.5, unit: '°C', change: 12.3, trending: 'up', icon: Thermometer, color: 'text-red-500' },
  fishCount: { value: 3524, unit: '', change: 12.5, trending: 'up', icon: Fish, color: 'text-green-500' },
  phLevel: { value: 8.1, unit: '', change: -1.8, trending: 'down', icon: TestTube, color: 'text-purple-500' },
  salinity: { value: 34.3, unit: 'PSU', change: 17.2, trending: 'up', icon: Waves, color: 'text-blue-500' }
};

const parameterOptions = [
  { value: 'temperature', label: 'Temperature', unit: '°C', color: '#ef4444' },
  { value: 'salinity', label: 'Salinity', unit: 'PSU', color: '#3b82f6' },
  { value: 'fishCount', label: 'Fish Count', unit: '', color: '#10b981' },
  { value: 'phLevel', label: 'pH Level', unit: '', color: '#8b5cf6' },
  { value: 'oxygen', label: 'Oxygen', unit: 'mg/L', color: '#06b6d4' },
  { value: 'turbidity', label: 'Turbidity', unit: 'NTU', color: '#f59e0b' }
];

// Depth profile data
const depthProfileData = [
  { depth: '0-10m', value: 8, temperature: 28.5 },
  { depth: '10-20m', value: 16, temperature: 26.2 },
  { depth: '20-50m', value: 24, temperature: 23.8 },
  { depth: '100-200m', value: 32, temperature: 18.4 },
  { depth: '>200m', value: 40, temperature: 12.1 }
];

// Environmental Health Index radar data
const environmentalHealthData = [
  { subject: 'Temperature', A: 85, fullMark: 100 },
  { subject: 'Water Quality', A: 92, fullMark: 100 },
  { subject: 'Salinity', A: 78, fullMark: 100 },
  { subject: 'pH', A: 88, fullMark: 100 },
  { subject: 'Oxygen', A: 76, fullMark: 100 },
  { subject: 'Biodiversity', A: 82, fullMark: 100 }
];

// Enhanced species distribution data for pie chart
const speciesDistributionPie = [
  { name: 'Lutjanus argentimaculatus', value: 45, color: '#8b5cf6' },
  { name: 'Scomberomorus commersoni', value: 18, color: '#3b82f6' },
  { name: 'Sardinella longiceps', value: 15, color: '#10b981' },
  { name: 'Rastrelliger kanagurta', value: 12, color: '#f59e0b' },
  { name: 'Others', value: 10, color: '#6b7280' }
];

// Temperature trend data (like in AQUILA)
const temperatureTrendData = [
  { time: '25.1°C', value: 25.1 },
  { time: '27.8°C', value: 27.8 },
  { time: '29.2°C', value: 29.2 },
  { time: '28.5°C', value: 28.5 },
  { time: '27.1°C', value: 27.1 },
  { time: '26.2°C', value: 26.2 }
];

export function DynamicAnalytics({ user, onNavigate, onLogout, language, currentPage }: DynamicAnalyticsProps) {
  const [selectedParameter, setSelectedParameter] = useState('temperature');
  const [chartData, setChartData] = useState(generateParameterData('temperature'));
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const selectedParamConfig = parameterOptions.find(p => p.value === selectedParameter);

  // Update chart data when parameter changes
  useEffect(() => {
    setChartData(generateParameterData(selectedParameter));
  }, [selectedParameter]);

  // Simulate live updates
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setChartData(generateParameterData(selectedParameter));
        setLastUpdated(new Date());
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [selectedParameter, isLiveMode]);

  const handleParameterChange = (value: string) => {
    setSelectedParameter(value);
  };

  const handleExport = () => {
    // Mock export functionality
    const timestamp = new Date().toISOString().slice(0, 10);
    console.log(`Exporting ${selectedParameter} data for ${timestamp}`);
  };

  const handleRefresh = () => {
    setChartData(generateParameterData(selectedParameter));
    setLastUpdated(new Date());
  };

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout} language={language} currentPage='dynamicAnalytics'>
      <div className="p-6 space-y-6 bg-slate-900 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dynamic Analytics Dashboard</h1>
            <p className="text-slate-400 mt-2">Real-time marine data visualization and analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsLiveMode(!isLiveMode)}
              variant={isLiveMode ? "default" : "outline"}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              {isLiveMode ? 'Live Mode' : 'Enable Live Mode'}
            </Button>
            <Button onClick={handleExport} variant="outline" className="text-white border-slate-600">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(currentMetrics).map(([key, metric]) => {
            const IconComponent = metric.icon;
            return (
              <Card key={key} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-slate-400 text-sm">
                        {key === 'fishCount' ? 'Fish Population' : 
                         key === 'phLevel' ? 'pH Level' :
                         key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </div>
                    <Badge 
                      variant={metric.trending === 'up' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {metric.trending === 'up' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(metric.change)}%
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-white">
                      {metric.value.toLocaleString()}{metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Interactive Parameter Analysis */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-400" />
              <CardTitle className="text-white">Interactive Parameter Analysis</CardTitle>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="text-white border-slate-600"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Select value={selectedParameter} onValueChange={handleParameterChange}>
                <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {parameterOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-white hover:bg-slate-600"
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: option.color }}
                        />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="text-sm">
                  {chartData[chartData.length - 1]?.value.toLocaleString()} {selectedParamConfig?.unit}
                </span>
                <Badge variant="outline" className="text-xs">
                  {selectedParameter === 'temperature' && chartData[chartData.length - 1]?.value > 28 ? '+3.1%' :
                   selectedParameter === 'salinity' && chartData[chartData.length - 1]?.value > 34 ? '+0.3%' :
                   selectedParameter === 'fishCount' && chartData[chartData.length - 1]?.value < 10000 ? '-12.4%' :
                   '+2.1%'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`gradient-${selectedParameter}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedParamConfig?.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={selectedParamConfig?.color} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    domain={['dataMin - 10%', 'dataMax + 10%']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#f8fafc'
                    }}
                    formatter={(value: number) => [
                      `${value.toLocaleString()} ${selectedParamConfig?.unit}`,
                      selectedParamConfig?.label
                    ]}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={selectedParamConfig?.color}
                    strokeWidth={3}
                    fill={`url(#gradient-${selectedParameter})`}
                    dot={{ fill: selectedParamConfig?.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: selectedParamConfig?.color, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Analysis Grid - AQUILA Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Readings */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-orange-400" />
                Temperature Readings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis 
                      dataKey="time"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[20, 35]}
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Species Distribution Pie Chart */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Fish className="w-5 h-5 mr-2 text-cyan-400" />
                Species Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={speciesDistributionPie}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${value}%`}
                    >
                      {speciesDistributionPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm">
                  Lutjanus argentimaculatus: <span className="text-purple-400">45%</span> | 
                  Scomberomorus commersoni: <span className="text-blue-400">18%</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics - AQUILA Enhanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Depth Profile Analysis */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layers className="w-5 h-5 mr-2 text-blue-400" />
                Depth Profile Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={depthProfileData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis 
                      type="number"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <YAxis 
                      type="category"
                      dataKey="depth"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc'
                      }}
                      formatter={(value, name) => [
                        `${value}m`, 
                        'Depth Range'
                      ]}
                    />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Health Index */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Environmental Health Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={environmentalHealthData}>
                    <PolarGrid stroke="#475569" />
                    <PolarAngleAxis 
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      className="text-slate-400"
                    />
                    <PolarRadiusAxis 
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      domain={[0, 100]}
                    />
                    <Radar
                      name="Health Index"
                      dataKey="A"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#10b981' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc'
                      }}
                      formatter={(value) => [`${value}%`, 'Health Score']}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              Quick Actions
            </CardTitle>
            <p className="text-slate-400 text-sm mt-1">
              Analyze your data with advanced marine research tools
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => onNavigate('marineMap')}
                className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex-col space-y-2"
              >
                <Map className="w-6 h-6" />
                <span>View Map</span>
              </Button>
              <Button
                onClick={() => onNavigate('aiQuery')}
                className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex-col space-y-2"
              >
                <Brain className="w-6 h-6" />
                <span>AI Classifier</span>
              </Button>
              <Button
                onClick={() => onNavigate('reports')}
                className="bg-green-600 hover:bg-green-700 text-white h-16 flex-col space-y-2"
              >
                <FileText className="w-6 h-6" />
                <span>Generate Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}