import React from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Fish, 
  Camera, 
  Target, 
  TrendingUp,
  Sparkles,
  Database,
  ArrowRight,
  Brain,
  Image as ImageIcon,
  Search
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { RouteName } from '../routes-maps';

interface ExploreFeaturesProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function ExploreFeatures({ user, onNavigate, onLogout, language }: ExploreFeaturesProps) {
  const t = useTranslation(language);

  const features = [
    {
      id: 'environmental-fish-prediction',
      route: 'environmentalFishPrediction' as RouteName,
      title: 'Environmental Fish Prediction',
      description: 'AI-powered predictive modeling for fish population dynamics based on environmental parameters',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      details: [
        'Machine learning models for population forecasting',
        'Environmental parameter correlation analysis',
        'Climate change impact assessment',
        'Sustainable fishing quota recommendations'
      ],
      comingSoon: false
    },
    {
      id: 'fish-image-identification',
      route: 'fishImageIdentification' as RouteName,
      title: 'Fish Image Identification',
      description: 'Advanced computer vision system for automatic fish species identification from photographs',
      icon: Camera,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      details: [
        'Real-time species classification',
        'Confidence scoring and verification',
        'Morphometric analysis and measurements',
        'Field survey integration and data logging'
      ],
      comingSoon: false
    },
    {
      id: 'otolith-image-comparison',
      route: 'otolithViewer' as RouteName,
      title: 'Otolith Image Comparison',
      description: 'Sophisticated image analysis for otolith-based age determination and species validation',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      details: [
        'Automated growth ring detection',
        'Age estimation algorithms',
        'Reference database comparison',
        'Statistical analysis and reporting'
      ],
      comingSoon: false
    }
  ];

  return (
    <Layout
      user={user}
      currentPage="exploreFeatures"
      onNavigate={onNavigate}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-8 w-8 mr-3 text-[#003366]" />
              Explore AI Features
            </h1>
            <p className="text-gray-600 mt-1">
              Advanced AI-powered tools for marine research and analysis
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-[#003366] text-white">
              {user?.role || 'User'}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              AI-Powered Tools
            </Badge>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 mb-1">AI Models</p>
                  <p className="text-2xl font-bold text-blue-800">3</p>
                  <p className="text-xs text-blue-600 mt-1">Available Tools</p>
                </div>
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-green-800">94.7%</p>
                  <p className="text-xs text-green-600 mt-1">Average Confidence</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 mb-1">Processed</p>
                  <p className="text-2xl font-bold text-purple-800">15.2k</p>
                  <p className="text-xs text-purple-600 mt-1">Total Analyses</p>
                </div>
                <Database className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Features */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Features</h2>
            <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Cutting-edge Technology
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.id} 
                  className={`${feature.bgColor} ${feature.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-full ${feature.bgColor} ${feature.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      {feature.comingSoon && (
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <CardTitle className={`${feature.color} group-hover:text-opacity-80 transition-colors`}>
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <>
                        {feature.details.map((detail, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                            <p className="text-sm text-gray-700">{detail}</p>
                          </div>
                        ))}
                        <Button
                          className={`w-full ${feature.comingSoon ? 'opacity-50 cursor-not-allowed' : 'group-hover:translate-x-1'} transition-all duration-300`}
                          onClick={() => !feature.comingSoon && onNavigate(feature.route)}
                          disabled={feature.comingSoon}
                          variant={feature.comingSoon ? "secondary" : "default"}
                        >
                          {feature.comingSoon ? (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Coming Soon
                            </>
                          ) : (
                            <>
                              Launch Tool
                              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </>
                    </div>
                  </CardContent>

                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Information */}
        <Card className="bg-gradient-to-r from-[#003366] to-[#004080] text-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Fish className="h-8 w-8 text-blue-200" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Advanced Marine AI Research</h3>
                <p className="text-blue-100 mb-4">
                  Our AI tools are developed in collaboration with marine biologists and data scientists, 
                  incorporating the latest advances in computer vision, machine learning, and environmental modeling 
                  to support evidence-based marine conservation and research.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-blue-200" />
                    <span>Deep Learning Models</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4 text-blue-200" />
                    <span>Computer Vision</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-200" />
                    <span>Predictive Analytics</span>
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