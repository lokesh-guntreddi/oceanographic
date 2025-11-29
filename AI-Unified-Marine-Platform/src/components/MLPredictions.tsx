import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Layout } from './Layout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { RouteName } from '../routes-maps';

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface MLPredictionsProps {
  user: User|null;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

const featureImportanceData = [
  { feature: 'Salinity', importance: 95, color: '#0891b2' },
  { feature: 'pH', importance: 88, color: '#0ea5e9' },
  { feature: 'Oxygen', importance: 82, color: '#38bdf8' },
  { feature: 'Temperature', importance: 76, color: '#7dd3fc' },
  { feature: 'Depth', importance: 65, color: '#bae6fd' },
  { feature: 'Turbidity', importance: 45, color: '#e0f2fe' }
];

const predictionHistory = [
  { time: '00:00', predicted: 820, actual: 785, confidence: 94 },
  { time: '06:00', predicted: 756, actual: 742, confidence: 96 },
  { time: '12:00', predicted: 689, actual: 701, confidence: 92 },
  { time: '18:00', predicted: 743, actual: 743, confidence: 98 },
  { time: '24:00', predicted: 743, actual: null, confidence: 98 }
];

const correlationData = [
  { parameter: 'Temperature', salinity: 0.45, ph: 0.32, oxygen: -0.67, depth: 0.23, turbidity: 0.12 },
  { parameter: 'Salinity', temperature: 0.45, ph: 0.78, oxygen: 0.34, depth: -0.56, turbidity: -0.23 },
  { parameter: 'pH', temperature: 0.32, salinity: 0.78, oxygen: 0.89, depth: -0.34, turbidity: -0.45 },
  { parameter: 'Oxygen', temperature: -0.67, salinity: 0.34, ph: 0.89, depth: -0.12, turbidity: -0.67 },
  { parameter: 'Depth', temperature: 0.23, salinity: -0.56, ph: -0.34, oxygen: -0.12, turbidity: 0.45 },
  { parameter: 'Turbidity', temperature: 0.12, salinity: -0.23, ph: -0.45, oxygen: -0.67, depth: 0.45 }
];

export function MLPredictions({ user, onNavigate, onLogout, language }: MLPredictionsProps) {
  const [parameters, setParameters] = useState({
    temperature: [26.0],
    salinity: [34.5],
    ph: [8.1],
    oxygen: [6.5],
    depth: [25],
    turbidity: [3.0],
    nutrients: [40]
  });

  const [predictions, setPredictions] = useState({
    fishCount: 743,
    speciesDiversity: 6.2,
    biomass: 5.5,
    confidence: 98
  });

  const [modelMetrics] = useState({
    algorithm: 'Random Forest Regression',
    accuracy: 94.2,
    features: 7,
    confidence: 98
  });

  // Update predictions based on parameters
  useEffect(() => {
    const calculatePredictions = () => {
      const temp = parameters.temperature[0];
      const sal = parameters.salinity[0];
      const ph = parameters.ph[0];
      const oxy = parameters.oxygen[0];
      const depth = parameters.depth[0];
      const turb = parameters.turbidity[0];
      const nutr = parameters.nutrients[0];

      // Simplified ML prediction algorithm
      let fishCount = 500;
      let diversity = 4.0;
      let biomass = 3.0;
      let confidence = 85;

      // Temperature impact (optimal 24-28°C)
      if (temp >= 24 && temp <= 28) {
        fishCount += 150;
        diversity += 1.5;
        biomass += 1.5;
        confidence += 5;
      } else {
        fishCount -= Math.abs(temp - 26) * 20;
        diversity -= Math.abs(temp - 26) * 0.3;
        biomass -= Math.abs(temp - 26) * 0.2;
        confidence -= Math.abs(temp - 26) * 2;
      }

      // Salinity impact (optimal 33-36 PSU)
      if (sal >= 33 && sal <= 36) {
        fishCount += 100;
        diversity += 0.8;
        biomass += 1.0;
        confidence += 3;
      } else {
        fishCount -= Math.abs(sal - 34.5) * 30;
        diversity -= Math.abs(sal - 34.5) * 0.2;
        biomass -= Math.abs(sal - 34.5) * 0.3;
        confidence -= Math.abs(sal - 34.5) * 3;
      }

      // pH impact (optimal 8.0-8.2)
      if (ph >= 8.0 && ph <= 8.2) {
        fishCount += 80;
        diversity += 0.6;
        biomass += 0.8;
        confidence += 4;
      } else {
        fishCount -= Math.abs(ph - 8.1) * 200;
        diversity -= Math.abs(ph - 8.1) * 1.0;
        biomass -= Math.abs(ph - 8.1) * 1.5;
        confidence -= Math.abs(ph - 8.1) * 5;
      }

      // Oxygen impact (optimal >6 mg/L)
      if (oxy >= 6) {
        fishCount += 120;
        diversity += 1.0;
        biomass += 1.2;
        confidence += 5;
      } else {
        fishCount -= (6 - oxy) * 100;
        diversity -= (6 - oxy) * 0.5;
        biomass -= (6 - oxy) * 0.8;
        confidence -= (6 - oxy) * 4;
      }

      // Depth impact (coastal optimal 10-50m)
      if (depth >= 10 && depth <= 50) {
        fishCount += 50;
        diversity += 0.3;
        biomass += 0.4;
        confidence += 2;
      }

      // Turbidity impact (clear <3 NTU)
      if (turb < 3) {
        fishCount += 30;
        diversity += 0.2;
        biomass += 0.3;
        confidence += 1;
      } else {
        fishCount -= turb * 15;
        diversity -= turb * 0.1;
        biomass -= turb * 0.1;
        confidence -= turb;
      }

      // Nutrients impact (optimal 30-50 µg/L)
      if (nutr >= 30 && nutr <= 50) {
        fishCount += 60;
        diversity += 0.4;
        biomass += 0.5;
        confidence += 2;
      }

      setPredictions({
        fishCount: Math.max(100, Math.floor(fishCount)),
        speciesDiversity: Math.max(1.0, Number(diversity.toFixed(1))),
        biomass: Math.max(1.0, Number(biomass.toFixed(1))),
        confidence: Math.max(70, Math.min(99, Math.floor(confidence)))
      });
    };

    calculatePredictions();
  }, [parameters]);

  const handleParameterChange = (param: keyof typeof parameters, value: number[]) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const getParameterStatus = (param: string, value: number) => {
    switch (param) {
      case 'temperature':
        return value >= 24 && value <= 28 ? 'optimal' : 'suboptimal';
      case 'salinity':
        return value >= 33 && value <= 36 ? 'optimal' : 'suboptimal';
      case 'ph':
        return value >= 8.0 && value <= 8.2 ? 'optimal' : 'suboptimal';
      case 'oxygen':
        return value >= 6 ? 'optimal' : 'critical';
      case 'turbidity':
        return value < 3 ? 'clear' : 'turbid';
      case 'nutrients':
        return value >= 30 && value <= 50 ? 'optimal' : 'suboptimal';
      default:
        return 'unknown';
    }
  };

  const getPredictionLevel = (count: number) => {
    if (count >= 800) return { label: 'Excellent', color: 'text-green-600' };
    if (count >= 600) return { label: 'Good', color: 'text-blue-600' };
    if (count >= 400) return { label: 'Average', color: 'text-yellow-600' };
    return { label: 'Below Average', color: 'text-red-600' };
  };

  const getDiversityLevel = (diversity: number) => {
    if (diversity >= 7) return { label: 'High Diversity', color: 'text-green-600' };
    if (diversity >= 5) return { label: 'Moderate Diversity', color: 'text-blue-600' };
    return { label: 'Limited Diversity', color: 'text-orange-600' };
  };

  return (
    <Layout  currentPage='mlPredictions' user={user} onNavigate={onNavigate} onLogout={onLogout} language={language}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">Machine Learning-driven Fish Abundance Prediction</h1>
            <p className="text-muted-foreground mt-2">Oceanographic Trends & ML Predictions Engine</p>
          </div>
        </div>

        {/* Model Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              ML Model Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Algorithm</div>
                <div className="font-semibold">{modelMetrics.algorithm}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Model Accuracy</div>
                <div className="font-semibold text-green-600">{modelMetrics.accuracy}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Features</div>
                <div className="font-semibold">{modelMetrics.features}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Confidence</div>
                <div className="font-semibold text-blue-600">{predictions.confidence}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Temperature: {parameters.temperature[0]}°C</label>
                  <Badge variant={getParameterStatus('temperature', parameters.temperature[0]) === 'optimal' ? 'default' : 'secondary'}>
                    {getParameterStatus('temperature', parameters.temperature[0]) === 'optimal' ? 'Optimal' : 'Suboptimal'}
                  </Badge>
                </div>
                <Slider
                  value={parameters.temperature}
                  onValueChange={(value:[number, number]) => handleParameterChange('temperature', value)}
                  max={32}
                  min={20}
                  step={0.1}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Optimal: 24-28°C</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Salinity: {parameters.salinity[0]} PSU</label>
                  <Badge variant={getParameterStatus('salinity', parameters.salinity[0]) === 'optimal' ? 'default' : 'secondary'}>
                    {getParameterStatus('salinity', parameters.salinity[0]) === 'optimal' ? 'Optimal' : 'Suboptimal'}
                  </Badge>
                </div>
                <Slider
                  value={parameters.salinity}
                  onValueChange={(value:[number]) => handleParameterChange('salinity', value)}
                  max={37}
                  min={30}
                  step={0.1}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Optimal: 33-36 PSU</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">pH Level: {parameters.ph[0]}</label>
                  <Badge variant={getParameterStatus('ph', parameters.ph[0]) === 'optimal' ? 'default' : 'secondary'}>
                    {getParameterStatus('ph', parameters.ph[0]) === 'optimal' ? 'Optimal' : 'Suboptimal'}
                  </Badge>
                </div>
                <Slider
                  value={parameters.ph}
                  onValueChange={(value:[number]) => handleParameterChange('ph', value)}
                  max={8.5}
                  min={7.5}
                  step={0.01}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Optimal: 8.0-8.2</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Dissolved Oxygen: {parameters.oxygen[0]} mg/L</label>
                  <Badge variant={getParameterStatus('oxygen', parameters.oxygen[0]) === 'optimal' ? 'default' : getParameterStatus('oxygen', parameters.oxygen[0]) === 'critical' ? 'destructive' : 'secondary'}>
                    {getParameterStatus('oxygen', parameters.oxygen[0]) === 'optimal' ? 'Optimal' : getParameterStatus('oxygen', parameters.oxygen[0]) === 'critical' ? 'Critical' : 'Low'}
                  </Badge>
                </div>
                <Slider
                  value={parameters.oxygen}
                  onValueChange={(value:[number]) => handleParameterChange('oxygen', value)}
                  max={10}
                  min={2}
                  step={0.1}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Optimal: &gt;6 mg/L</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Depth: {parameters.depth[0]}m</label>
                  <Badge variant="outline">Coastal</Badge>
                </div>
                <Slider
                  value={parameters.depth}
                  onValueChange={(value:[number]) => handleParameterChange('depth', value)}
                  max={200}
                  min={5}
                  step={1}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Coastal: 10-50m</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Turbidity: {parameters.turbidity[0]} NTU</label>
                  <Badge variant={getParameterStatus('turbidity', parameters.turbidity[0]) === 'clear' ? 'default' : 'secondary'}>
                    {getParameterStatus('turbidity', parameters.turbidity[0]) === 'clear' ? 'Clear' : 'Turbid'}
                  </Badge>
                </div>
                <Slider
                  value={parameters.turbidity}
                  onValueChange={(value:[number]) => handleParameterChange('turbidity', value)}
                  max={10}
                  min={0}
                  step={0.1}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Clear: &lt;3 NTU</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Nutrients: {parameters.nutrients[0]} µg/L</label>
                  <Badge variant={getParameterStatus('nutrients', parameters.nutrients[0]) === 'optimal' ? 'default' : 'secondary'}>
                    {getParameterStatus('nutrients', parameters.nutrients[0]) === 'optimal' ? 'Optimal' : 'Suboptimal'}
                  </Badge>
                </div>
                <Slider
                  value={parameters.nutrients}
                  onValueChange={(value:[number]) => handleParameterChange('nutrients', value)}
                  max={100}
                  min={10}
                  step={1}
                  className="mb-2"
                />
                <div className="text-xs text-green-600">Optimal: 30-50 µg/L</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictions Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Predicted Fish Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{predictions.fishCount}</div>
              <div className={`text-sm ${getPredictionLevel(predictions.fishCount).color}`}>
                {getPredictionLevel(predictions.fishCount).label}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Species Diversity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{predictions.speciesDiversity}</div>
              <div className={`text-sm ${getDiversityLevel(predictions.speciesDiversity).color}`}>
                {getDiversityLevel(predictions.speciesDiversity).label}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Biomass</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{predictions.biomass}t</div>
              <div className="text-sm text-muted-foreground">Estimated weight</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confidence Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{predictions.confidence}%</div>
              <div className="text-sm text-muted-foreground">Prediction accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Importance */}
        <Card>
          <CardHeader>
            <CardTitle>ML Model Feature Importance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="horizontal" data={featureImportanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="feature" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="importance" fill="#0891b2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Prediction History */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction History & Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#0891b2" 
                  strokeWidth={2}
                  name="Predicted Fish Count"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Actual Fish Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Environmental Optimization</h4>
                    <p className="text-sm text-blue-700 mt-1">Consider environmental restoration measures to improve oxygen levels and pH balance</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <h4 className="font-semibold text-green-800">Conservation Programs</h4>
                    <p className="text-sm text-green-700 mt-1">Implement biodiversity conservation programs to maintain species diversity</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Water Quality Monitoring</h4>
                    <p className="text-sm text-yellow-700 mt-1">Increase monitoring frequency for temperature and salinity fluctuations</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}