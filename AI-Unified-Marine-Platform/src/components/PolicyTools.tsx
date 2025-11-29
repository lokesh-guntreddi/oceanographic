import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import {RouteName} from '../routes-maps';
import { 
  FileText, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Download,
  Share,
  Bookmark,
  Calendar,
  Users,
  Globe,
  BarChart3,
  Settings,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface PolicyToolsProps {
  user: User | null;
  onNavigate: (page:RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function PolicyTools({ user, onNavigate, onLogout, language }: PolicyToolsProps) {
  const [activeScenario, setActiveScenario] = useState('current');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [briefType, setBriefType] = useState('summary');
  
  // Scenario parameters
  const [scenarioParams, setScenarioParams] = useState({
    fishingQuota: [75],
    protectedAreas: [15],
    pollutionControl: [60],
    temperatureChange: [1.5],
    economicGrowth: [2.5]
  });

  // Policy briefs data
  const policyBriefs = [
    {
      id: 1,
      title: 'Marine Protected Area Expansion Impact Assessment',
      type: 'Impact Assessment',
      status: 'Draft',
      lastModified: '2024-01-15',
      priority: 'High',
      stakeholders: ['Fishermen Associations', 'Tourism Board', 'Conservation Groups']
    },
    {
      id: 2,
      title: 'Sustainable Fishing Quotas for Arabian Sea',
      type: 'Regulatory Framework',
      status: 'Under Review',
      lastModified: '2024-01-12',
      priority: 'Critical',
      stakeholders: ['Fishing Industry', 'Marine Research Institute']
    },
    {
      id: 3,
      title: 'Climate Change Adaptation Strategy for Coastal Communities',
      type: 'Strategic Plan',
      status: 'Published',
      lastModified: '2024-01-08',
      priority: 'Medium',
      stakeholders: ['State Government', 'Coastal Communities', 'NGOs']
    }
  ];

  // Simulation scenarios
  const scenarios = [
    { 
      id: 'current', 
      name: 'Current Baseline',
      description: 'Current marine policies and fishing practices',
      fishStock: 100,
      biodiversity: 82,
      economics: 75,
      sustainability: 68
    },
    { 
      id: 'conservative', 
      name: 'Conservation Priority',
      description: 'Strengthen marine protection with reduced fishing quotas',
      fishStock: 125,
      biodiversity: 95,
      economics: 60,
      sustainability: 88
    },
    { 
      id: 'economic', 
      name: 'Economic Focus',
      description: 'Maximize economic benefits while maintaining basic conservation',
      fishStock: 85,
      biodiversity: 70,
      economics: 95,
      sustainability: 55
    },
    { 
      id: 'balanced', 
      name: 'Balanced Approach',
      description: 'Balance between conservation and economic interests',
      fishStock: 110,
      biodiversity: 85,
      economics: 80,
      sustainability: 78
    }
  ];

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationProgress(0);

    // Simulate progression
    for (let i = 0; i <= 100; i += 5) {
      setSimulationProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setIsSimulating(false);
    toast.success("Scenario simulation completed successfully");
  };

  const generateBrief = () => {
    toast.success("Policy brief generated and saved to drafts");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-blue-600';
      case 'Low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const currentScenario = scenarios.find(s => s.id === activeScenario) || scenarios[0];

  return (
    <Layout user={user} currentPage="policyTools" onNavigate={onNavigate as any} onLogout={onLogout} language={language}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">Policy Development Tools</h1>
            <p className="text-muted-foreground mt-2">
              Integrated scenario modeling and policy brief generation for marine governance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center">
              <Target className="w-3 h-3 mr-1" />
              Policymaker Tools
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="simulator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulator">Scenario Simulator</TabsTrigger>
            <TabsTrigger value="briefs">Policy Briefs</TabsTrigger>
            <TabsTrigger value="analysis">Impact Analysis</TabsTrigger>
          </TabsList>

          {/* Scenario Simulator Tab */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Parameter Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Policy Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Fishing Quota Reduction (%)
                    </label>
                    <Slider
                      value={scenarioParams.fishingQuota}
                      onValueChange={(value: number[]) => setScenarioParams(prev => ({ ...prev, fishingQuota: value }))}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <span className="text-sm text-muted-foreground">{scenarioParams.fishingQuota[0]}%</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Protected Areas Coverage (%)
                    </label>
                    <Slider
                      value={scenarioParams.protectedAreas}
                      onValueChange={(value: number[]) => setScenarioParams(prev => ({ ...prev, protectedAreas: value }))}
                      max={50}
                      step={1}
                      className="mb-2"
                    />
                    <span className="text-sm text-muted-foreground">{scenarioParams.protectedAreas[0]}%</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Pollution Control Measures (%)
                    </label>
                    <Slider
                      value={scenarioParams.pollutionControl}
                      onValueChange={(value: number[]) => setScenarioParams(prev => ({ ...prev, pollutionControl: value }))}
                      max={100}
                      step={5}
                      className="mb-2"
                    />
                    <span className="text-sm text-muted-foreground">{scenarioParams.pollutionControl[0]}%</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Temperature Change (°C)
                    </label>
                    <Slider
                      value={scenarioParams.temperatureChange}
                      onValueChange={(value: number[]) => setScenarioParams(prev => ({ ...prev, temperatureChange: value }))}
                      max={5}
                      min={0}
                      step={0.1}
                      className="mb-2"
                    />
                    <span className="text-sm text-muted-foreground">+{scenarioParams.temperatureChange[0]}°C</span>
                  </div>

                  <Button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="w-full"
                  >
                    {isSimulating ? (
                      <>
                        <PauseCircle className="w-4 h-4 mr-2" />
                        Simulating... {simulationProgress}%
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Run Simulation
                      </>
                    )}
                  </Button>

                  {isSimulating && (
                    <Progress value={simulationProgress} className="w-full" />
                  )}
                </CardContent>
              </Card>

              {/* Scenario Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Pre-built Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          activeScenario === scenario.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveScenario(scenario.id)}
                      >
                        <h4 className="font-medium">{scenario.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Results Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Impact Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Fish Stock Health</span>
                        <span className="font-medium">{currentScenario.fishStock}%</span>
                      </div>
                      <Progress value={currentScenario.fishStock} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Biodiversity Index</span>
                        <span className="font-medium">{currentScenario.biodiversity}%</span>
                      </div>
                      <Progress value={currentScenario.biodiversity} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Economic Impact</span>
                        <span className="font-medium">{currentScenario.economics}%</span>
                      </div>
                      <Progress value={currentScenario.economics} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sustainability Score</span>
                        <span className="font-medium">{currentScenario.sustainability}%</span>
                      </div>
                      <Progress value={currentScenario.sustainability} className="h-2" />
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm mb-2">Scenario Summary</h5>
                    <p className="text-xs text-gray-600">{currentScenario.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Policy Briefs Tab */}
          <TabsContent value="briefs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Brief Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Generate New Brief
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brief Type</label>
                    <Select value={briefType} onValueChange={setBriefType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Executive Summary</SelectItem>
                        <SelectItem value="assessment">Impact Assessment</SelectItem>
                        <SelectItem value="framework">Regulatory Framework</SelectItem>
                        <SelectItem value="strategy">Strategic Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input placeholder="Enter policy brief title" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Key Focus Areas</label>
                    <Textarea 
                      placeholder="Describe the main policy areas and objectives"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Stakeholders</label>
                    <Input placeholder="Government agencies, industry groups, NGOs" />
                  </div>

                  <Button onClick={generateBrief} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Brief
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Briefs */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Brief Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {policyBriefs.map((brief) => (
                        <div key={brief.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{brief.title}</h4>
                            <Badge className={getStatusColor(brief.status)}>
                              {brief.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Type:</span> {brief.type}
                            </div>
                            <div>
                              <span className="font-medium">Modified:</span> {brief.lastModified}
                            </div>
                            <div>
                              <span className={`font-medium ${getPriorityColor(brief.priority)}`}>
                                Priority: {brief.priority}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-600">Stakeholders:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {brief.stakeholders.map((stakeholder, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {stakeholder}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Impact Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Cross-Scenario Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id} className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2">{scenario.name}</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Fish Stock:</span>
                              <span className="font-medium">{scenario.fishStock}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Biodiversity:</span>
                              <span className="font-medium">{scenario.biodiversity}%</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>Economics:</span>
                              <span className="font-medium">{scenario.economics}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sustainability:</span>
                              <span className="font-medium">{scenario.sustainability}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <div>
                          <h6 className="font-medium text-red-800">High Risk</h6>
                          <p className="text-sm text-red-700">
                            Aggressive fishing quotas may lead to stock depletion within 5 years
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                        <div>
                          <h6 className="font-medium text-orange-800">Medium Risk</h6>
                          <p className="text-sm text-orange-700">
                            Economic impacts on fishing communities require mitigation strategies
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <h6 className="font-medium text-green-800">Low Risk</h6>
                          <p className="text-sm text-green-700">
                            Balanced approach shows positive long-term sustainability outlook
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}