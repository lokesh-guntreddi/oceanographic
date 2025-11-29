import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Slider } from "./ui/slider";
import { RouteName } from "../routes-maps";
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  FileText, 
  BarChart3, 
  Target,
  Download,
  Settings,
  RefreshCw,
  PieChart,
  Activity,
  DollarSign
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface PolicymakerDashboardProps {
  user: any;
  onNavigate: (page:RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function PolicymakerDashboard({ user, onNavigate, onLogout, language }: PolicymakerDashboardProps) {
  const t = useTranslation(language);


  const kpiData = [
    {
      title: t('fisheries_yield'),
      value: '2.8M tons',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Economic Impact',
      value: '₹45.2B',
      change: '+8.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: t('overfishing_risk'),
      value: 'Medium',
      change: '+2.1%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: t('food_security'),
      value: '87%',
      change: '-1.2%',
      trend: 'down',
      icon: Target,
      color: 'text-red-600'
    }
  ];

  const yieldForecast = [
    { year: '2020', yield: 2.4, sustainable: 2.8 },
    { year: '2021', yield: 2.5, sustainable: 2.7 },
    { year: '2022', yield: 2.6, sustainable: 2.6 },
    { year: '2023', yield: 2.7, sustainable: 2.5 },
    { year: '2024', yield: 2.8, sustainable: 2.4 },
    { year: '2025', yield: 2.9, sustainable: 2.3 },
    { year: '2026', yield: 3.0, sustainable: 2.2 }
  ];

  const riskData = [
    { region: 'Arabian Sea', overfishing: 68, pollution: 45, climate: 72 },
    { region: 'Bay of Bengal', overfishing: 78, pollution: 62, climate: 68 },
    { region: 'Coastal Waters', overfishing: 85, pollution: 58, climate: 55 },
    { region: 'Deep Sea', overfishing: 42, pollution: 28, climate: 82 }
  ];

  const speciesDistribution = [
    { name: 'Pomfret', value: 25, color: '#003366' },
    { name: 'Mackerel', value: 20, color: '#004080' },
    { name: 'Sardine', value: 18, color: '#0066cc' },
    { name: 'Tuna', value: 15, color: '#3399ff' },
    { name: 'Others', value: 22, color: '#66b3ff' }
  ];



  return (
    <Layout
      user={user}
      currentPage="policymaker"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Policy {t('dashboard')}</h1>
            <p className="text-gray-600 mt-1">
              Strategic insights for marine policy development and implementation.
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
            <Button 
              size="sm" 
              className="bg-[#003366] hover:bg-[#004080]"
              onClick={() => onNavigate('policyTools')}
            >
              <Settings className="h-4 w-4 mr-2" />
              {t('scenario_simulator')}
            </Button>

          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
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
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            kpi.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
          {/* Fisheries Yield Forecast */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#003366]" />
                {t('fisheries_yield')} Forecast
              </CardTitle>
              <CardDescription>
                Projected yield vs. sustainable levels with current policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yieldForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#003366" 
                    strokeWidth={3}
                    name="Projected Yield"
                    dot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sustainable" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Sustainable Level"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Species Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-[#003366]" />
                Species Distribution
              </CardTitle>
              <CardDescription>Current catch composition by species</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={speciesDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {speciesDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {speciesDistribution.map((species, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: species.color }}
                      />
                      <span>{species.name}</span>
                    </div>
                    <span className="font-medium">{species.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Risk Assessment Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                {t('risk_assessment')} Heatmap
              </CardTitle>
              <CardDescription>Risk levels across different marine regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskData.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-sm">{region.region}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Overfishing</span>
                          <span>{region.overfishing}%</span>
                        </div>
                        <Progress 
                          value={region.overfishing} 
                          className="h-2"
                          style={{
                            backgroundColor: region.overfishing > 70 ? '#fecaca' : region.overfishing > 50 ? '#fed7aa' : '#d1fae5'
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Pollution</span>
                          <span>{region.pollution}%</span>
                        </div>
                        <Progress 
                          value={region.pollution} 
                          className="h-2"
                          style={{
                            backgroundColor: region.pollution > 70 ? '#fecaca' : region.pollution > 50 ? '#fed7aa' : '#d1fae5'
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Climate</span>
                          <span>{region.climate}%</span>
                        </div>
                        <Progress 
                          value={region.climate} 
                          className="h-2"
                          style={{
                            backgroundColor: region.climate > 70 ? '#fecaca' : region.climate > 50 ? '#fed7aa' : '#d1fae5'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Policy Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#003366]" />
                Recommended Actions
              </CardTitle>
              <CardDescription>Priority policy interventions based on current data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-900">Urgent: Coastal Overfishing</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Implement immediate quota restrictions in coastal waters (85% risk level)
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 border-red-300 text-red-700">
                        Draft Policy
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Activity className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">Medium: Climate Adaptation</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Develop climate resilience strategies for deep sea fishing
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 border-orange-300 text-orange-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Low: Technology Adoption</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Promote sustainable fishing technology in Arabian Sea region
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 border-blue-300 text-blue-700">
                        Schedule Review
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#003366] hover:bg-[#004080]"
                  onClick={() => onNavigate('policyTools')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t('policy_brief')}
                </Button>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}