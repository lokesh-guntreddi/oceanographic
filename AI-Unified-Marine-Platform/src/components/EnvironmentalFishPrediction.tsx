import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  Thermometer, 
  Droplets, 
  Wind, 
  Fish,
  Calendar,
  MapPin,
  Brain,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Play,
  BarChart3
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RouteName } from '../routes-maps';

interface EnvironmentalFishPredictionProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function EnvironmentalFishPrediction({ user, onNavigate, onLogout, language }: EnvironmentalFishPredictionProps) {
  const t = useTranslation(language);
  const [temperature, setTemperature] = useState([28.5]);
  const [salinity, setSalinity] = useState([34.8]);
  const [oxygenLevel, setOxygenLevel] = useState([7.2]);
  const [phLevel, setPhLevel] = useState([8.1]);
  const [selectedRegion, setSelectedRegion] = useState('arabian-sea');
  const [selectedSpecies, setSelectedSpecies] = useState('mackerel');
  const [predictionPeriod, setPredictionPeriod] = useState('3months');
  const [isRunning, setIsRunning] = useState(false);

  const predictionData = [
    { month: 'Current', actual: 245, predicted: 245, confidence: 100 },
    { month: 'Month 1', actual: null, predicted: 267, confidence: 94 },
    { month: 'Month 2', actual: null, predicted: 298, confidence: 89 },
    { month: 'Month 3', actual: null, predicted: 334, confidence: 84 },
    { month: 'Month 4', actual: null, predicted: 356, confidence: 78 },
    { month: 'Month 5', actual: null, predicted: 389, confidence: 72 },
    { month: 'Month 6', actual: null, predicted: 412, confidence: 67 }
  ];

  const environmentalFactors = [
    { name: 'Temperature', value: temperature[0], unit: '°C', impact: 'High', trend: 'Increasing', icon: Thermometer, color: 'text-red-600' },
    { name: 'Salinity', value: salinity[0], unit: 'PSU', impact: 'Medium', trend: 'Stable', icon: Droplets, color: 'text-blue-600' },
    { name: 'Oxygen', value: oxygenLevel[0], unit: 'mg/L', impact: 'High', trend: 'Decreasing', icon: Wind, color: 'text-green-600' },
    { name: 'pH Level', value: phLevel[0], unit: '', impact: 'Low', trend: 'Stable', icon: Activity, color: 'text-purple-600' }
  ];

  const runPrediction = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  return (
    <Layout
      user={user}
      currentPage="environmentalFishPrediction"
      onNavigate={onNavigate}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('exploreFeatures')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Features
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="h-8 w-8 mr-3 text-[#003366]" />
                Environmental Fish Prediction
              </h1>
              <p className="text-gray-600 mt-1">
                AI-powered predictive modeling for fish population dynamics
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Brain className="h-4 w-4 mr-2" />
            Machine Learning Model
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#003366]" />
                Prediction Parameters
              </CardTitle>
              <CardDescription>Configure environmental and location parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Region Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                    <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
                    <SelectItem value="coastal-waters">Coastal Waters</SelectItem>
                    <SelectItem value="deep-sea">Deep Sea</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Species Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Species</label>
                <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mackerel">Indian Mackerel</SelectItem>
                    <SelectItem value="sardine">Oil Sardine</SelectItem>
                    <SelectItem value="tuna">Yellowfin Tuna</SelectItem>
                    <SelectItem value="pomfret">Silver Pomfret</SelectItem>
                    <SelectItem value="kingfish">King Fish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Prediction Period */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Prediction Period</label>
                <Select value={predictionPeriod} onValueChange={setPredictionPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Environmental Parameters */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Environmental Parameters</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Temperature</label>
                    <span className="text-sm text-gray-600">{temperature[0]}°C</span>
                  </div>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={35}
                    min={20}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Salinity</label>
                    <span className="text-sm text-gray-600">{salinity[0]} PSU</span>
                  </div>
                  <Slider
                    value={salinity}
                    onValueChange={setSalinity}
                    max={40}
                    min={30}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Oxygen Level</label>
                    <span className="text-sm text-gray-600">{oxygenLevel[0]} mg/L</span>
                  </div>
                  <Slider
                    value={oxygenLevel}
                    onValueChange={setOxygenLevel}
                    max={10}
                    min={4}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">pH Level</label>
                    <span className="text-sm text-gray-600">{phLevel[0]}</span>
                  </div>
                  <Slider
                    value={phLevel}
                    onValueChange={setPhLevel}
                    max={8.5}
                    min={7.5}
                    step={0.01}
                    className="w-full"
                  />
                </div>
              </div>

              <Button 
                onClick={runPrediction}
                disabled={isRunning}
                className="w-full bg-[#003366] hover:bg-[#004080]"
              >
                {isRunning ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Running Prediction...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Prediction Model
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Environmental Impact Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-[#003366]" />
                  Environmental Impact Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {environmentalFactors.map((factor) => {
                    const IconComponent = factor.icon;
                    return (
                      <div key={factor.name} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent className={`h-4 w-4 ${factor.color}`} />
                            <span className="font-medium text-sm">{factor.name}</span>
                          </div>
                          <Badge 
                            variant={factor.impact === 'High' ? 'destructive' : factor.impact === 'Medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {factor.impact}
                          </Badge>
                        </div>
                        <div className="text-lg font-bold">{factor.value}{factor.unit}</div>
                        <div className="text-xs text-gray-500">{factor.trend}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Prediction Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-[#003366]" />
                  Population Prediction Results
                </CardTitle>
                <CardDescription>
                  Predicted fish population trends based on environmental parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#003366" 
                        fill="#003366" 
                        fillOpacity={0.3}
                        name="Predicted Population"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.5}
                        name="Actual Population"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-600 mb-1">Current Population</div>
                      <div className="text-xl font-bold text-green-800">245</div>
                      <div className="text-xs text-green-600">individuals/km²</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-600 mb-1">3-Month Prediction</div>
                      <div className="text-xl font-bold text-blue-800">334</div>
                      <div className="text-xs text-blue-600">+36% increase</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-sm text-orange-600 mb-1">Model Confidence</div>
                      <div className="text-xl font-bold text-orange-800">84%</div>
                      <div className="text-xs text-orange-600">High accuracy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-green-800">Optimal Conditions Detected</div>
                      <div className="text-sm text-green-700">Current environmental parameters favor population growth for {selectedSpecies}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Fish className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-blue-800">Sustainable Fishing Window</div>
                      <div className="text-sm text-blue-700">Recommended harvest quota: 15-20% of predicted population in months 2-3</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-yellow-800">Monitor Temperature Rise</div>
                      <div className="text-sm text-yellow-700">Temperature increases beyond 30°C may negatively impact population growth</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

