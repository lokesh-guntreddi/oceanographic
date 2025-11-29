import React, { useState, useRef , useEffect } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { RouteName } from "../routes-maps";
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  Image as ImageIcon, 
  Dna, 
  Map, 
  Calendar,
  Filter,
  Upload,
  Download,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  CheckCircle,
  FileText
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { LucideProps } from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";
interface ResearcherDashboardProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}
type KPIItem = {
  title: string;
  value: string | number;
  change?: string | number;
  icon: React.ComponentType<LucideProps>; // lucide-react icon components
  color?: string;
  route?: RouteName;
};
export function ResearcherDashboard({ user, onNavigate, onLogout, language }: ResearcherDashboardProps) {
  const t = useTranslation(language);
  const [timeRange, setTimeRange] = useState([2020, 2024]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [kpiData, setKpiData] = useState<KPIItem[]>([]);

  // const kpiData = [
  //   {
  //     title: t('surveys_completed'),
  //     value: '1,247',
  //     change: '+12%',
  //     icon: BarChart3,
  //     color: 'text-blue-600'
  //   },
  //   {
  //     title: t('unique_species'),
  //     value: '8,943',
  //     change: '+8%',
  //     icon: Database,
  //     color: 'text-green-600'
  //   },
  //   {
  //     title: t('otolith_images'),
  //     value: '15,678',
  //     change: '+24%',
  //     icon: ImageIcon,
  //     color: 'text-purple-600'
  //   },
  //   {
  //     title: t('edna_matches'),
  //     value: '3,156',
  //     change: '+16%',
  //     icon: Dna,
  //     color: 'text-orange-600'
  //   }
  // ];

  const timeSeriesData = [
    { month: 'Jan', surveys: 95, species: 234, samples: 156 },
    { month: 'Feb', surveys: 87, species: 267, samples: 189 },
    { month: 'Mar', surveys: 123, species: 298, samples: 234 },
    { month: 'Apr', surveys: 145, species: 334, samples: 267 },
    { month: 'May', surveys: 134, species: 356, samples: 298 },
    { month: 'Jun', surveys: 167, species: 389, samples: 334 },
    { month: 'Jul', surveys: 189, species: 423, samples: 378 },
    { month: 'Aug', surveys: 156, species: 445, samples: 398 },
    { month: 'Sep', surveys: 178, species: 467, samples: 423 },
    { month: 'Oct', surveys: 198, species: 489, samples: 456 },
    { month: 'Nov', surveys: 223, species: 512, samples: 489 },
    { month: 'Dec', surveys: 234, species: 534, samples: 512 }
  ];

  const recentUploads = [
    {
      id: 1,
      filename: 'arabian_sea_survey_2024.csv',
      type: 'Survey Data',
      date: '2024-12-20',
      size: '2.4 MB',
      status: 'Processed'
    },
    {
      id: 2,
      filename: 'otolith_batch_127.zip',
      type: 'Images',
      date: '2024-12-19',
      size: '45.7 MB',
      status: 'Processing'
    },
    {
      id: 3,
      filename: 'edna_sequences_coastal.fasta',
      type: 'eDNA',
      date: '2024-12-18',
      size: '8.9 MB',
      status: 'Processed'
    },
    {
      id: 4,
      filename: 'bengal_bay_samples.csv',
      type: 'Survey Data',
      date: '2024-12-17',
      size: '3.2 MB',
      status: 'Processed'
    }
  ];

  const otolithSamples = [
    { id: 1, species: 'Pomfret', confidence: 0.94, image: 'otolith1.jpg' },
    { id: 2, species: 'Mackerel', confidence: 0.89, image: 'otolith2.jpg' },
    { id: 3, species: 'Sardine', confidence: 0.92, image: 'otolith3.jpg' },
    { id: 4, species: 'Tuna', confidence: 0.87, image: 'otolith4.jpg' },
    { id: 5, species: 'Kingfish', confidence: 0.91, image: 'otolith5.jpg' },
    { id: 6, species: 'Anchovy', confidence: 0.88, image: 'otolith6.jpg' }
  ];

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload process
    const uploadPromise = new Promise((resolve) => {
      setTimeout(() => {
        setIsUploading(false);
        resolve('success');
      }, 2000);
    });

    // Show progress toast
    toast.promise(uploadPromise, {
      loading: `Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`,
      success: () => {
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            <span>Data uploaded successfully! Processing has begun.</span>
          </div>
        );
      },
      error: 'Upload failed. Please try again.',
    });

    // Log file details for demonstration
    Array.from(files).forEach(file => {
      console.log('Uploaded file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified)
      });
    });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

useEffect(() => {
  async function loadKPIs() {
    const res = await fetch("http://localhost:5000/api/kpi"); 
    const data = await res.json();
    setKpiData([
      {
        title: t('surveys_completed'),
        value: data.surveysCompleted,
        change: data.surveysGrowth,
        icon: BarChart3,
        color: 'text-blue-600',
        route:  'surveys'
      },
      {
        title: t('unique_species'),
        value: data.uniqueSpecies,
        change: data.speciesGrowth,
        icon: Database,
        color: 'text-green-600',
        route: 'speciesProfile'
      },
      {
        title: t('otolith_images'),
        value: data.otolithImages,
        change: data.otolithGrowth,
        icon: ImageIcon,
        color: 'text-purple-600',
        route: 'otolithAnalysis'
      },
      {
        title: t('edna_matches'),
        value: data.ednaMatches,
        change: data.ednaGrowth,
        icon: Dna,
        color: 'text-orange-600',
        route: 'edna'
      }
    ]);
  }

  loadKPIs();
}, []);

  return (
    <Layout
      user={user}
      currentPage="researcher"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Research {t('dashboard')}</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.email?.split('@')[0]}. Here's your research overview.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('refresh')}
            </Button>
            <Button 
              size="sm" 
              className="bg-[#003366] hover:bg-[#004080]"
              onClick={triggerFileUpload}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : `${t('upload')} Data`}
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              onClick={() => onNavigate('reports')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.json,.zip,.fasta,.jpg,.jpeg,.png,.tiff,.tif"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card 
  key={index}
  className="hover:shadow-md transition-shadow cursor-pointer"
  onClick={() => onNavigate(kpi.route || 'researcher')}
>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <Badge 
                        variant="secondary" 
                        className="mt-2 text-xs bg-green-100 text-green-800"
                      >
                        {kpi.change}
                      </Badge>
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
          {/* Interactive Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-[#003366]" />
                {t('interactive_map')}
              </CardTitle>
              <CardDescription>
                Survey locations and data collection points with temporal filtering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filter Controls */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Time Range:</span>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md">
                      <span className="text-sm">{timeRange[0]} - {timeRange[1]}</span>
                    </div>
                  </div>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="arabian">Arabian Sea</SelectItem>
                      <SelectItem value="bengal">Bay of Bengal</SelectItem>
                      <SelectItem value="coastal">Coastal Waters</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Marine Map Preview */}
                <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 rounded-lg p-6 h-64 overflow-hidden">
                  {/* Ocean Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="waves" patternUnits="userSpaceOnUse" width="100" height="20">
                        <path d="M0 10 Q25 0 50 10 Q75 20 100 10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#waves)"/>
                    </svg>
                  </div>
                  
                  {/* Sample data points */}
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Map className="w-12 h-12 mx-auto mb-3 opacity-80" />
                      <h3 className="text-lg font-medium mb-2">Marine Research Areas</h3>
                      <p className="text-sm opacity-90 mb-4">Interactive species distribution mapping</p>
                      <Button 
                        variant="outline" 
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => onNavigate('marineMap')}
                      >
                        Open Full Map
                      </Button>
                    </div>
                  </div>
                  
                  {/* Sample markers */}
                  <div className="absolute top-4 left-8 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 right-12 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-12 right-8 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>

                {/* Time Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Temporal Filter: {timeRange[0]} - {timeRange[1]}
                  </label>
                  <Slider
                    value={timeRange}
                    onValueChange={setTimeRange}
                    max={2024}
                    min={2015}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Otolith Lab */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
                  {t('otolith_lab')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {otolithSamples.slice(0, 6).map((sample) => (
                    <div
                      key={sample.id}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#003366] transition-all"
                      onClick={() => onNavigate('otolithViewer')}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1">
                        <p className="text-xs truncate">{sample.species}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => onNavigate('otolithViewer')}
                >
                  View All Samples
                </Button>
              </CardContent>
            </Card>

            {/* Dynamic Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Dynamic Analytics
                  <Badge variant="secondary" className="ml-2 text-xs">NEW</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Interactive parameter analysis with real-time marine data visualization
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => onNavigate('dynamicAnalytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Launch Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Quick Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Quick Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('dataExplorer')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t('run_correlation')}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('ednaLab')}
                >
                  <Dna className="h-4 w-4 mr-2" />
                  {t('edna_lab')}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('exploreFeatures')}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Explore AI Features
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Dataset
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Time Series Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-[#003366]" />
                {t('time_series')}
              </CardTitle>
              <CardDescription>Monthly trends in data collection and species discovery</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="surveys" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="surveys">Surveys</TabsTrigger>
                  <TabsTrigger value="species">Species</TabsTrigger>
                  <TabsTrigger value="samples">Samples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="surveys" className="space-y-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="surveys" 
                        stroke="#003366" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="species" className="space-y-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="species" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="samples" className="space-y-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="samples" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-[#003366]" />
                {t('recent_uploads')}
              </CardTitle>
              <CardDescription>Latest data submissions and processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {upload.filename}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {upload.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{upload.size}</span>
                        <span className="text-xs text-gray-500">{upload.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={upload.status === 'Processed' ? 'default' : 'secondary'}
                        className={upload.status === 'Processed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {upload.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => onNavigate('dataExplorer')}
              >
                View All Uploads
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}