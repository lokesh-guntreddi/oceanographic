import React, { useState, useRef, useEffect } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Search,
  Sparkles,
  MapPin,
  FileText,
  Zap,
  Fish,
  Waves,
  Thermometer,
  Droplet,
  TrendingUp,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  BookOpen,
  Globe,
  Microscope,
  BarChart3,
  Target,
  AlertTriangle,
  Info,
  Clock,
  Layers,
  Activity
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../utils/translations';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { RouteName } from '../routes-maps';
interface AIQueryProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

interface QueryResponse {
  type: 'summary' | 'detailed' | 'taxonomy' | 'location' | 'parameters' | 'animation';
  content: any;
  confidence: number;
  sources: string[];
  relatedQueries: string[];
}

interface FishMovementData {
  time: number;
  latitude: number;
  longitude: number;
  depth: number;
  temperature: number;
  species: string;
}

export function AIQuery({ user, onNavigate, onLogout, language }: AIQueryProps) {
  const t = useTranslation(language);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<QueryResponse[]>([]);
  const [selectedResponseType, setSelectedResponseType] = useState('summary');
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mock marine data for demonstrations
  const mockTaxonomyData = {
    kingdom: 'Animalia',
    phylum: 'Chordata',
    class: 'Actinopterygii',
    order: 'Perciformes',
    family: 'Scombridae',
    genus: 'Thunnus',
    species: 'Thunnus albacares'
  };

  const mockOceanParameters = {
    physical: {
      temperature: '26.5°C',
      salinity: '35.2 ppt',
      depth: '50-200m',
      currents: 'Southwest monsoon driven'
    },
    chemical: {
      pH: '8.1',
      oxygen: '6.2 mg/L',
      nutrients: 'High phosphate levels',
      pollutants: 'Low microplastic concentration'
    },
    biological: {
      primaryProductivity: 'Moderate (250 mg C/m²/day)',
      chlorophyll: '0.8 mg/m³',
      biomass: 'High fish biomass detected',
      biodiversity: 'Shannon index: 2.8'
    }
  };

  const fishMovementData: FishMovementData[] = [
    { time: 0, latitude: 15.2993, longitude: 74.1240, depth: 50, temperature: 26.5, species: 'Yellowfin Tuna' },
    { time: 1, latitude: 15.3100, longitude: 74.1300, depth: 45, temperature: 26.8, species: 'Yellowfin Tuna' },
    { time: 2, latitude: 15.3250, longitude: 74.1450, depth: 60, temperature: 26.2, species: 'Yellowfin Tuna' },
    { time: 3, latitude: 15.3400, longitude: 74.1600, depth: 55, temperature: 26.6, species: 'Yellowfin Tuna' },
    { time: 4, latitude: 15.3600, longitude: 74.1800, depth: 70, temperature: 25.9, species: 'Yellowfin Tuna' },
    { time: 5, latitude: 15.3800, longitude: 74.2000, depth: 65, temperature: 26.1, species: 'Yellowfin Tuna' }
  ];

  const speciesAbundanceData = [
    { species: 'Yellowfin Tuna', count: 1250, biomass: 3400, trend: 'stable' },
    { species: 'Indian Mackerel', count: 2840, biomass: 1200, trend: 'increasing' },
    { species: 'Pomfret', count: 890, biomass: 2100, trend: 'decreasing' },
    { species: 'Sardines', count: 4520, biomass: 800, trend: 'stable' },
    { species: 'Kingfish', count: 670, biomass: 1800, trend: 'increasing' }
  ];

  const diversityMetrics = [
    { metric: 'Species Richness', value: 245, unit: 'species' },
    { metric: 'Shannon Diversity', value: 2.85, unit: 'H\'' },
    { metric: 'Simpson Index', value: 0.78, unit: 'D' },
    { metric: 'Evenness', value: 0.82, unit: 'J\'' }
  ];

  const processQuery = async (queryText: string) => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses: QueryResponse[] = [];
    
    // Generate different types of responses based on query content
    const queryLower = queryText.toLowerCase();
    
    if (queryLower.includes('fish') || queryLower.includes('species') || queryLower.includes('marine life')) {
      // Summary Response
      responses.push({
        type: 'summary',
        content: {
          title: 'Marine Species Analysis',
          summary: `Based on current data from the Arabian Sea and Bay of Bengal regions, we've identified ${speciesAbundanceData.length} primary commercial species. The analysis reveals healthy biodiversity with a Shannon diversity index of 2.85, indicating a stable ecosystem. Key findings include strong populations of Indian Mackerel and Sardines, with moderate concern for Pomfret populations showing declining trends.`,
          keyFindings: [
            'High species diversity (245 species recorded)',
            'Stable yellowfin tuna populations in deep waters',
            'Increasing mackerel abundance in coastal zones',
            'Declining pomfret requires conservation attention'
          ],
          dataPoints: 15847,
          confidence: 87
        },
        confidence: 87,
        sources: ['CMLRE Survey Database', 'eDNA Analysis', 'Fisheries Catch Data'],
        relatedQueries: ['Show fish movement patterns', 'Analyze breeding seasons', 'Predict stock levels']
      });

      // Taxonomy Response
      responses.push({
        type: 'taxonomy',
        content: {
          species: 'Thunnus albacares (Yellowfin Tuna)',
          taxonomy: mockTaxonomyData,
          commonNames: ['Yellowfin Tuna', 'Ahi', 'Allison Tuna'],
          conservation: 'Near Threatened (IUCN)',
          economicValue: 'High commercial value'
        },
        confidence: 94,
        sources: ['FishBase', 'IUCN Red List', 'CMLRE Species Database'],
        relatedQueries: ['Related species', 'Breeding behavior', 'Migration routes']
      });

      // Location Response
      responses.push({
        type: 'location',
        content: {
          primaryHabitats: [
            { name: 'Arabian Sea Deep Waters', coordinates: [15.3, 74.1], depth: '50-200m', abundance: 'High' },
            { name: 'Karnataka Coastal Zone', coordinates: [14.8, 74.2], depth: '10-50m', abundance: 'Medium' },
            { name: 'Goa Shelf Waters', coordinates: [15.5, 73.8], depth: '30-100m', abundance: 'High' }
          ],
          migrationRoutes: 'Seasonal movement between deep ocean (monsoon) and coastal waters (post-monsoon)',
          breedingGrounds: 'Open ocean waters, 100-300m depth',
          criticalHabitats: 'Upwelling zones off Karnataka coast'
        },
        confidence: 82,
        sources: ['Satellite Tagging Data', 'Acoustic Surveys', 'Fishermen Reports'],
        relatedQueries: ['Track migration patterns', 'Identify spawning areas', 'Seasonal distribution']
      });

      // Parameters Response
      responses.push({
        type: 'parameters',
        content: mockOceanParameters,
        confidence: 91,
        sources: ['CTD Sensor Data', 'Autonomous Glider Network', 'Satellite Observations'],
        relatedQueries: ['Water quality trends', 'Climate impact analysis', 'Optimal fishing conditions']
      });

      // Animation Response
      responses.push({
        type: 'animation',
        content: {
          title: 'Fish Movement Timeline',
          description: 'Real-time tracking of yellowfin tuna movement patterns over 6-hour period',
          data: fishMovementData,
          duration: 6,
          species: 'Yellowfin Tuna'
        },
        confidence: 88,
        sources: ['Acoustic Telemetry', 'Satellite Tags', 'Fisherman Observations'],
        relatedQueries: ['Extended tracking period', 'Multi-species tracking', 'Seasonal patterns']
      });
    }

    setResponses(responses);
    setIsLoading(false);
  };

  const startAnimation = () => {
    setAnimationPlaying(true);
    setAnimationTime(0);
    
    animationRef.current = setInterval(() => {
      setAnimationTime(prev => {
        if (prev >= fishMovementData.length - 1) {
          setAnimationPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pauseAnimation = () => {
    setAnimationPlaying(false);
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
  };

  const resetAnimation = () => {
    setAnimationPlaying(false);
    setAnimationTime(0);
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  const getRoleSpecificSuggestions = () => {
    switch (user?.role) {
      case 'researcher':
        return [
          'Analyze species diversity in Arabian Sea',
          'Show otolith morphology patterns',
          'Compare eDNA results across regions',
          'Track fish migration patterns'
        ];
      case 'policymaker':
        return [
          'Assess fisheries sustainability status',
          'Predict climate change impacts',
          'Evaluate conservation effectiveness',
          'Economic value of marine resources'
        ];
      case 'conservationist':
        return [
          'Identify threatened species habitats',
          'Monitor protected area effectiveness',
          'Track pollution impact on marine life',
          'Plan restoration strategies'
        ];
      default:
        return [
          'What fish species are found in Indian waters?',
          'How do ocean currents affect fish distribution?',
          'Show marine biodiversity trends',
          'Analyze fishing impact on ecosystems'
        ];
    }
  };

  const renderResponseContent = (response: QueryResponse) => {
    switch (response.type) {
      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{response.content.title}</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {response.confidence}% confidence
              </Badge>
            </div>
            <p className="text-gray-700">{response.content.summary}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Key Findings</h4>
                <ul className="space-y-1">
                  {response.content.keyFindings.map((finding: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Target className="h-4 w-4 text-[#003366] mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Data Points Analyzed</span>
                  <span className="font-medium">{response.content.dataPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Analysis Confidence</span>
                  <span className="font-medium">{response.content.confidence}%</span>
                </div>
                <Progress value={response.content.confidence} className="h-2" />
              </div>
            </div>
          </div>
        );

      case 'taxonomy':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{response.content.species}</h3>
              <Badge variant="outline">{response.content.conservation}</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Taxonomic Classification</h4>
                <div className="space-y-2">
                  {Object.entries(response.content.taxonomy).map(([rank, value]) => (
                    <div key={rank} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-sm capitalize text-gray-600">{rank}</span>
                      <span className="text-sm font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Additional Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Common Names</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {response.content.commonNames.map((name: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Economic Value</span>
                    <p className="text-sm mt-1">{response.content.economicValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Habitat & Distribution Analysis</h3>
            
            <div className="grid gap-4">
              <div>
                <h4 className="font-medium mb-3">Primary Habitats</h4>
                <div className="space-y-3">
                  {response.content.primaryHabitats.map((habitat: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{habitat.name}</h5>
                        <Badge 
                          variant={habitat.abundance === 'High' ? 'default' : 'secondary'}
                          className={habitat.abundance === 'High' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {habitat.abundance}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>Coordinates: {habitat.coordinates.join(', ')}</div>
                        <div>Depth: {habitat.depth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Migration Routes</h4>
                  <p className="text-sm text-gray-700">{response.content.migrationRoutes}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Breeding Grounds</h4>
                  <p className="text-sm text-gray-700">{response.content.breedingGrounds}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'parameters':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ocean Parameters Analysis</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center mb-3">
                  <Waves className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium">Physical Parameters</h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(response.content.physical).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-sm capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Droplet className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-medium">Chemical Parameters</h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(response.content.chemical).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-sm capitalize text-gray-600">{key}</span>
                      <span className="text-sm font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Activity className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-medium">Biological Parameters</h4>
                </div>
                <div className="space-y-2">
                  {Object.entries(response.content.biological).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-sm capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'animation':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{response.content.title}</h3>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={animationPlaying ? pauseAnimation : startAnimation}
                >
                  {animationPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={resetAnimation}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">{response.content.description}</p>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Animation Visualization */}
              <div className="space-y-4">
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-64 overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    <div className="grid grid-cols-8 grid-rows-6 gap-1 h-full">
                      {Array.from({ length: 48 }).map((_, index) => {
                        const currentData = fishMovementData[Math.floor(animationTime)];
                        const isCurrentPosition = index === Math.floor(animationTime * 8 + 20);
                        return (
                          <div
                            key={index}
                            className={`rounded-full transition-all duration-500 ${
                              isCurrentPosition 
                                ? 'bg-red-500 w-3 h-3 animate-pulse' 
                                : 'bg-blue-200 w-1 h-1'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 rounded px-2 py-1">
                    <div className="flex items-center space-x-2">
                      <Fish className="h-4 w-4 text-[#003366]" />
                      <span className="text-sm font-medium">{response.content.species}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 rounded px-2 py-1">
                    <span className="text-sm">Time: {Math.floor(animationTime)}h</span>
                  </div>
                </div>
                
                {/* Timeline Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0h</span>
                    <span>{response.content.duration}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#003366] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(animationTime / (fishMovementData.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Current Data Display */}
              <div className="space-y-4">
                <h4 className="font-medium">Current Position Data</h4>
                {fishMovementData[Math.floor(animationTime)] && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center mb-1">
                          <MapPin className="h-4 w-4 text-red-600 mr-1" />
                          <span className="text-sm font-medium">Position</span>
                        </div>
                        <p className="text-sm">
                          {fishMovementData[Math.floor(animationTime)].latitude.toFixed(4)}°N, {fishMovementData[Math.floor(animationTime)].longitude.toFixed(4)}°E
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center mb-1">
                          <Layers className="h-4 w-4 text-blue-600 mr-1" />
                          <span className="text-sm font-medium">Depth</span>
                        </div>
                        <p className="text-sm">{fishMovementData[Math.floor(animationTime)].depth}m</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center mb-1">
                          <Thermometer className="h-4 w-4 text-orange-600 mr-1" />
                          <span className="text-sm font-medium">Temperature</span>
                        </div>
                        <p className="text-sm">{fishMovementData[Math.floor(animationTime)].temperature}°C</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center mb-1">
                          <Clock className="h-4 w-4 text-purple-600 mr-1" />
                          <span className="text-sm font-medium">Time</span>
                        </div>
                        <p className="text-sm">{fishMovementData[Math.floor(animationTime)].time}:00h</p>
                      </div>
                    </div>
                    
                    {/* Movement Chart */}
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={fishMovementData.slice(0, Math.floor(animationTime) + 1)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="depth" stroke="#003366" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Response type not supported</div>;
    }
  };

  return (
    <Layout
      user={user}
      currentPage="aiQuery"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-8 w-8 text-[#003366] mr-3" />
              Marine Intelligence Assistant
            </h1>
            <p className="text-gray-600 mt-1">
              Ask questions about marine data, species, habitats, and environmental conditions
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {user?.role || 'User'} Mode
          </Badge>
        </div>

        {/* Query Input */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Textarea
                    placeholder="Ask me anything about marine data, fish species, ocean conditions, migration patterns, or conservation strategies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-20 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (query.trim()) {
                          processQuery(query);
                        }
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={() => processQuery(query)}
                  disabled={!query.trim() || isLoading}
                  size="lg"
                  className="bg-[#003366] hover:bg-[#004080]"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Suggested Queries */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Suggested queries for {user?.role}:</p>
                <div className="flex flex-wrap gap-2">
                  {getRoleSpecificSuggestions().map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(suggestion);
                        processQuery(suggestion);
                      }}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Display */}
        {responses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-[#003366] mr-2" />
                AI Analysis Results
              </CardTitle>
              <CardDescription>
                Multiple analysis formats available - select your preferred view
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedResponseType} onValueChange={setSelectedResponseType}>
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="summary" className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>Summary</span>
                  </TabsTrigger>
                  <TabsTrigger value="taxonomy" className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Taxonomy</span>
                  </TabsTrigger>
                  <TabsTrigger value="location" className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </TabsTrigger>
                  <TabsTrigger value="parameters" className="flex items-center space-x-1">
                    <Microscope className="h-4 w-4" />
                    <span>Parameters</span>
                  </TabsTrigger>
                  <TabsTrigger value="animation" className="flex items-center space-x-1">
                    <Fish className="h-4 w-4" />
                    <span>Animation</span>
                  </TabsTrigger>
                  <TabsTrigger value="detailed" className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Data</span>
                  </TabsTrigger>
                </TabsList>

                {responses.map((response, index) => (
                  <TabsContent key={index} value={response.type} className="space-y-6">
                    <div className="bg-white rounded-lg border p-6">
                      {renderResponseContent(response)}
                    </div>
                    
                    {/* Sources and Related Queries */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          Data Sources
                        </h4>
                        <div className="space-y-2">
                          {response.sources.map((source, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-2 h-2 bg-[#003366] rounded-full mr-2" />
                              <span className="text-sm">{source}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Related Queries
                        </h4>
                        <div className="space-y-2">
                          {response.relatedQueries.map((relatedQuery, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => {
                                setQuery(relatedQuery);
                                processQuery(relatedQuery);
                              }}
                            >
                              {relatedQuery}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}

                {/* Detailed Data Analysis Tab */}
                <TabsContent value="detailed" className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Species Abundance Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Species Abundance Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={speciesAbundanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="species" angle={-45} textAnchor="end" height={80} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#003366" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Diversity Metrics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Biodiversity Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {diversityMetrics.map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{metric.metric}</span>
                                <span className="text-sm">{metric.value} {metric.unit}</span>
                              </div>
                              <Progress value={(metric.value / 5) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Analysis
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
                <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
                  <Globe className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}