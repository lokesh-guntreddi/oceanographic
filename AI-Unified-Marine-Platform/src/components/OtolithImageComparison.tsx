import React, { useState, useRef } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Target, 
  Upload, 
  Image as ImageIcon, 
  Zap,
  CheckCircle,
  ArrowLeft,
  Download,
  Eye,
  Layers,
  Calculator,
  Database,
  Brain,
  Info,
  Ruler,
  Clock,
  Microscope
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { toast } from "sonner";
import { RouteName } from '../routes-maps';

interface OtolithImageComparisonProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function OtolithImageComparison({ user, onNavigate, onLogout, language }: OtolithImageComparisonProps) {
  const t = useTranslation(language);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState('automatic');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock analysis results
  const mockResults = {
    species: "Indian Mackerel",
    scientificName: "Rastrelliger kanagurta",
    estimatedAge: "2.3 years",
    confidence: 89.2,
    growthRings: 7,
    measurements: {
      length: "4.2 mm",
      width: "3.8 mm",
      area: "12.6 mm²",
      perimeter: "14.1 mm"
    },
    growthAnalysis: {
      ringSpacing: "Variable - indicating seasonal growth",
      growthRate: "Moderate - consistent with species norm",
      maturityIndicator: "Adult specimen based on ring count"
    },
    qualityMetrics: {
      imageClarity: 94,
      ringVisibility: 87,
      edgeDefinition: 91,
      overallQuality: 90
    },
    referenceMatches: [
      { species: "Indian Mackerel", age: "2.5 years", similarity: 94.2, confidence: "High" },
      { species: "Indian Mackerel", age: "2.0 years", similarity: 87.6, confidence: "High" },
      { species: "Chub Mackerel", age: "2.3 years", similarity: 73.4, confidence: "Medium" },
      { species: "Spanish Mackerel", age: "2.1 years", similarity: 68.9, confidence: "Medium" }
    ],
    environmentalIndicators: {
      stressRings: 2,
      fastGrowthPeriods: 3,
      slowGrowthPeriods: 2,
      seasonalVariation: "High - distinct summer/winter patterns"
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size should be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setAnalysisResults(null);
    };
    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeOtolith = () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      toast.success('Otolith analysis completed successfully!');
    }, 4000);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setAnalysisResults(null);
  };

  return (
    <Layout
      user={user}
      currentPage="otolithImageComparison"
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
                <Target className="h-8 w-8 mr-3 text-[#003366]" />
                Otolith Image Comparison
              </h1>
              <p className="text-gray-600 mt-1">
                AI-powered age determination and species validation through otolith analysis
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Brain className="h-4 w-4 mr-2" />
            Advanced Image Analysis
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload & Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-[#003366]" />
                Otolith Image Upload
              </CardTitle>
              <CardDescription>Upload otolith images for automated age determination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Analysis Method Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Analysis Method</label>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic Ring Detection</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic with Manual Verification</SelectItem>
                    <SelectItem value="manual">Manual Ring Counting</SelectItem>
                    <SelectItem value="comparison">Database Comparison Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upload Area */}
              <div className="space-y-4">
                {!uploadedImage ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#003366] hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Microscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Otolith Image</h3>
                    <p className="text-gray-600 mb-4">
                      High-resolution images work best for accurate ring detection
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded otolith" 
                        className="w-full max-h-80 object-contain rounded-lg border bg-gray-50"
                      />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={clearImage}
                      >
                        Clear
                      </Button>
                    </div>
                    
                    {!analysisResults && (
                      <Button 
                        onClick={analyzeOtolith}
                        disabled={isAnalyzing}
                        className="w-full bg-[#003366] hover:bg-[#004080]"
                      >
                        {isAnalyzing ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse" />
                            Analyzing Otolith...
                          </>
                        ) : (
                          <>
                            <Target className="h-4 w-4 mr-2" />
                            Analyze Growth Rings
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-600 animate-pulse" />
                        <span className="text-sm font-medium text-purple-800">Otolith Analysis in Progress</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="text-xs text-purple-700 space-y-1">
                        <div>✓ Image preprocessing completed</div>
                        <div>✓ Edge detection and enhancement done</div>
                        <div>✓ Growth ring identification running...</div>
                        <div>⏳ Database comparison in progress...</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Upload Guidelines */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Imaging Guidelines
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use high-resolution microscopy images</li>
                      <li>• Ensure proper lighting and contrast</li>
                      <li>• Clean otolith surface before imaging</li>
                      <li>• Include scale reference when possible</li>
                      <li>• Focus on growth ring clarity</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Analysis Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-[#003366]" />
                Analysis Results
              </CardTitle>
              <CardDescription>Age determination and growth pattern analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResults ? (
                <div className="text-center py-12">
                  <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Yet</h3>
                  <p className="text-gray-600">Upload and analyze an otolith image to see age determination results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Primary Results */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-purple-600" />
                          <span className="font-medium text-purple-800">Age Determined</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{analysisResults.estimatedAge}</h3>
                        <p className="text-sm text-gray-600">{analysisResults.species}</p>
                        <p className="text-xs text-gray-500 italic">{analysisResults.scientificName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{analysisResults.confidence}%</div>
                        <div className="text-xs text-purple-700">Confidence</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <div className="flex items-center text-sm text-purple-700">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{analysisResults.growthRings} growth rings detected</span>
                      </div>
                    </div>
                  </div>

                  {/* Measurements */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Ruler className="h-4 w-4 mr-2" />
                      Otolith Measurements
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-800">{analysisResults.measurements.length}</div>
                        <div className="text-xs text-blue-600">Length</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-800">{analysisResults.measurements.width}</div>
                        <div className="text-xs text-green-600">Width</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="font-bold text-orange-800">{analysisResults.measurements.area}</div>
                        <div className="text-xs text-orange-600">Area</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-800">{analysisResults.measurements.perimeter}</div>
                        <div className="text-xs text-purple-600">Perimeter</div>
                      </div>
                    </div>
                  </div>

                  {/* Quality Metrics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Image Quality Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Image Clarity</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={analysisResults.qualityMetrics.imageClarity} className="w-20 h-2" />
                          <span className="text-sm font-medium">{analysisResults.qualityMetrics.imageClarity}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ring Visibility</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={analysisResults.qualityMetrics.ringVisibility} className="w-20 h-2" />
                          <span className="text-sm font-medium">{analysisResults.qualityMetrics.ringVisibility}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Edge Definition</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={analysisResults.qualityMetrics.edgeDefinition} className="w-20 h-2" />
                          <span className="text-sm font-medium">{analysisResults.qualityMetrics.edgeDefinition}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Growth Analysis */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Growth Pattern Analysis</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">Ring Spacing</div>
                        <div className="text-sm text-gray-700">{analysisResults.growthAnalysis.ringSpacing}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">Growth Rate</div>
                        <div className="text-sm text-gray-700">{analysisResults.growthAnalysis.growthRate}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">Maturity Indicator</div>
                        <div className="text-sm text-gray-700">{analysisResults.growthAnalysis.maturityIndicator}</div>
                      </div>
                    </div>
                  </div>

                  {/* Reference Database Matches */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Reference Database Matches</h4>
                    <div className="space-y-2">
                      {analysisResults.referenceMatches.slice(0, 3).map((match: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{match.species}</div>
                            <div className="text-xs text-gray-600">Age: {match.age}</div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={match.confidence === 'High' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {match.similarity}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export Analysis
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => onNavigate('otolithViewer')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View in Lab
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Technology Information */}
        <Card className="bg-gradient-to-r from-[#003366] to-[#004080] text-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Target className="h-8 w-8 text-purple-200 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Advanced Otolith Analysis Technology</h3>
                <p className="text-blue-100 mb-4">
                  Our otolith analysis system combines computer vision with machine learning to automatically detect and count 
                  growth rings, providing accurate age estimates crucial for fisheries management and population studies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-purple-200">Image Processing</div>
                    <div>Edge Detection & Enhancement</div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-200">Ring Detection</div>
                    <div>AI Pattern Recognition</div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-200">Database</div>
                    <div>10K+ Reference Samples</div>
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