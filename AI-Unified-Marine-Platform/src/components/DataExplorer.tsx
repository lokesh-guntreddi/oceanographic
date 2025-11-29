import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon,
  Map,
  ChevronDown,
  BarChart3,
  FileText,
  Eye,
  Settings,
  Layers,
  Grid,
  List
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RouteName } from '../routes-maps';
interface DataExplorerProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function DataExplorer({ user, onNavigate, onLogout, language }: DataExplorerProps) {
  const t = useTranslation(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDataType, setSelectedDataType] = useState('all');
  const [selectedTaxa, setSelectedTaxa] = useState('all');
  const [depthRange, setDepthRange] = useState([0, 5000]);
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'chart'>('table');
  const [selectedDate, setSelectedDate] = useState<Date>();

  const mockDatasets = [
    {
      id: 'DS001',
      title: 'Arabian Sea Biodiversity Survey 2024',
      description: 'Comprehensive species census in Arabian Sea coastal waters',
      type: 'Survey Data',
      region: 'Arabian Sea',
      dateRange: '2024-01-15 to 2024-03-20',
      samples: 1247,
      species: 342,
      size: '12.4 MB',
      status: 'Complete',
      depth: '0-200m',
      coordinates: '15.2993°N, 74.1240°E',
      lastUpdated: '2024-12-20'
    },
    {
      id: 'DS002',
      title: 'eDNA Metabarcoding - Bay of Bengal',
      description: 'Environmental DNA analysis from Bengal Bay samples',
      type: 'eDNA',
      region: 'Bay of Bengal',
      dateRange: '2024-02-01 to 2024-04-15',
      samples: 856,
      species: 178,
      size: '8.7 MB',
      status: 'Processing',
      depth: '0-100m',
      coordinates: '21.2787°N, 88.2637°E',
      lastUpdated: '2024-12-19'
    },
    {
      id: 'DS003',
      title: 'Otolith Morphometry Collection',
      description: 'High-resolution otolith images with morphometric data',
      type: 'Images',
      region: 'Coastal Waters',
      dateRange: '2024-03-01 to 2024-05-30',
      samples: 2156,
      species: 89,
      size: '245.8 MB',
      status: 'Complete',
      depth: '10-500m',
      coordinates: 'Multiple locations',
      lastUpdated: '2024-12-18'
    },
    {
      id: 'DS004',
      title: 'Deep Sea Exploration Data',
      description: 'ROV collected samples from deep sea environments',
      type: 'Survey Data',
      region: 'Arabian Sea',
      dateRange: '2024-04-10 to 2024-06-25',
      samples: 534,
      species: 267,
      size: '34.2 MB',
      status: 'Complete',
      depth: '1000-3000m',
      coordinates: '12.9716°N, 77.5946°E',
      lastUpdated: '2024-12-17'
    },
    {
      id: 'DS005',
      title: 'Microplastic Analysis Dataset',
      description: 'Microplastic distribution and impact assessment',
      type: 'Environmental',
      region: 'Coastal Waters',
      dateRange: '2024-05-01 to 2024-07-15',
      samples: 724,
      species: 45,
      size: '15.6 MB',
      status: 'Complete',
      depth: '0-50m',
      coordinates: 'Multiple coastal sites',
      lastUpdated: '2024-12-16'
    }
  ];

  const filterDatasets = () => {
    return mockDatasets.filter(dataset => {
      const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || dataset.region === selectedRegion;
      const matchesType = selectedDataType === 'all' || dataset.type === selectedDataType;
      
      return matchesSearch && matchesRegion && matchesType;
    });
  };

  const filteredDatasets = filterDatasets();

  const chartData = [
    { month: 'Jan', surveys: 45, species: 234 },
    { month: 'Feb', surveys: 52, species: 267 },
    { month: 'Mar', surveys: 48, species: 298 },
    { month: 'Apr', surveys: 61, species: 334 },
    { month: 'May', surveys: 55, species: 356 },
    { month: 'Jun', surveys: 67, species: 389 }
  ];

  const DatasetCard = ({ dataset }: { dataset: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{dataset.title}</CardTitle>
            <CardDescription className="mt-1">{dataset.description}</CardDescription>
          </div>
          <Badge variant={dataset.status === 'Complete' ? 'default' : 'secondary'} 
                 className={dataset.status === 'Complete' ? 'bg-green-100 text-green-800' : ''}>
            {dataset.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Region</p>
            <p className="font-medium">{dataset.region}</p>
          </div>
          <div>
            <p className="text-gray-600">Type</p>
            <p className="font-medium">{dataset.type}</p>
          </div>
          <div>
            <p className="text-gray-600">Samples</p>
            <p className="font-medium">{dataset.samples.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Species</p>
            <p className="font-medium">{dataset.species}</p>
          </div>
          <div>
            <p className="text-gray-600">Depth Range</p>
            <p className="font-medium">{dataset.depth}</p>
          </div>
          <div>
            <p className="text-gray-600">Size</p>
            <p className="font-medium">{dataset.size}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout
      user={user}
      currentPage="dataExplorer"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('data_explorer')}</h1>
            <p className="text-gray-600 mt-1">
              Explore and analyze marine datasets from across Indian waters
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Advanced {t('filters')}
            </Button>
            <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
              <Download className="h-4 w-4 mr-2" />
              Bulk {t('export')}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-[#003366]" />
              {t('filters')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Datasets</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title or description..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('region')}</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Arabian Sea">Arabian Sea</SelectItem>
                    <SelectItem value="Bay of Bengal">Bay of Bengal</SelectItem>
                    <SelectItem value="Coastal Waters">Coastal Waters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('data_type')}</label>
                <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Survey Data">Survey Data</SelectItem>
                    <SelectItem value="eDNA">eDNA</SelectItem>
                    <SelectItem value="Images">Images</SelectItem>
                    <SelectItem value="Environmental">Environmental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">{t('depth')} Range: {depthRange[0]}m - {depthRange[1]}m</label>
              <Slider
                value={depthRange}
                onValueChange={setDepthRange}
                max={5000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results and View Controls */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredDatasets.length} of {mockDatasets.length} datasets
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'chart' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('chart')}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Display */}
        {viewMode === 'table' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#003366]" />
                Dataset Catalog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Samples</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDatasets.map((dataset) => (
                    <TableRow key={dataset.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{dataset.title}</p>
                          <p className="text-sm text-gray-600">{dataset.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{dataset.type}</Badge>
                      </TableCell>
                      <TableCell>{dataset.region}</TableCell>
                      <TableCell>{dataset.samples.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={dataset.status === 'Complete' ? 'default' : 'secondary'}>
                          {dataset.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDatasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        )}

        {viewMode === 'chart' && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Collection Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="surveys" 
                      stroke="#003366" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Species Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="species" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}