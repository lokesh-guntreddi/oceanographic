import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { 
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Move,
  Ruler,
  Target,
  Upload,
  Download,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Brain,
  Database,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RouteName } from '../routes-maps';
interface OtolithViewerProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function OtolithViewer({ user, onNavigate, onLogout, language }: OtolithViewerProps) {
  const t = useTranslation(language);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const otolithSamples = [
    {
      id: 'OTO001',
      filename: 'pomfret_adult_001.jpg',
      species: 'Pomfret',
      scientificName: 'Pampus argenteus',
      confidence: 0.94,
      length: 12.4,
      width: 8.7,
      area: 87.2,
      perimeter: 34.5,
      location: 'Arabian Sea',
      depth: '45m',
      date: '2024-12-15',
      ageGroup: 'Adult',
      status: 'Verified',
      imageUrl: 'https://images.unsplash.com/photo-1638741957611-e0a80e0c9cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwb3RvbGl0aCUyMGVhciUyMGJvbmV8ZW58MXx8fHwxNzU4NjUwNDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO002',
      filename: 'mackerel_juvenile_002.jpg',
      species: 'Mackerel',
      scientificName: 'Rastrelliger kanagurta',
      confidence: 0.89,
      length: 8.2,
      width: 5.6,
      area: 35.8,
      perimeter: 22.1,
      location: 'Bay of Bengal',
      depth: '25m',
      date: '2024-12-14',
      ageGroup: 'Juvenile',
      status: 'Pending Review',
      imageUrl: 'https://images.unsplash.com/photo-1711414389627-83cfb281e0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwYm9uZSUyMHNwZWNpbWVufGVufDF8fHx8MTc1ODY1MDQ0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO003',
      filename: 'sardine_adult_003.jpg',
      species: 'Sardine',
      scientificName: 'Sardinella longiceps',
      confidence: 0.92,
      length: 6.8,
      width: 4.2,
      area: 22.4,
      perimeter: 18.3,
      location: 'Coastal Waters',
      depth: '15m',
      date: '2024-12-13',
      ageGroup: 'Adult',
      status: 'Verified',
      imageUrl: 'https://images.unsplash.com/photo-1689384558967-44186820b58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmUlMjBiaW9sb2d5JTIwbWljcm9zY29wZXxlbnwxfHx8fDE3NTg2NTA0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO004',
      filename: 'tuna_adult_004.jpg',
      species: 'Tuna',
      scientificName: 'Thunnus albacares',
      confidence: 0.87,
      length: 18.6,
      width: 12.3,
      area: 156.7,
      perimeter: 48.9,
      location: 'Arabian Sea',
      depth: '120m',
      date: '2024-12-12',
      ageGroup: 'Adult',
      status: 'Verified',
      imageUrl: 'https://images.unsplash.com/photo-1675899043736-287294b6616a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwc2NhbGVzJTIwbWljcm9zY29waWN8ZW58MXx8fHwxNzU4NjUwNDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO005',
      filename: 'kingfish_subadult_005.jpg',
      species: 'Kingfish',
      scientificName: 'Scomberomorus commerson',
      confidence: 0.91,
      length: 15.2,
      width: 9.8,
      area: 112.3,
      perimeter: 41.2,
      location: 'Bay of Bengal',
      depth: '80m',
      date: '2024-12-11',
      ageGroup: 'Sub-adult',
      status: 'Verified',
      imageUrl: 'https://images.unsplash.com/photo-1758206523826-a65d4cf070aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2dpY2FsJTIwc3BlY2ltZW4lMjBhbmFseXNpc3xlbnwxfHx8fDE3NTg2NTA0NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO006',
      filename: 'anchovy_adult_006.jpg',
      species: 'Anchovy',
      scientificName: 'Stolephorus commersonnii',
      confidence: 0.88,
      length: 4.5,
      width: 2.8,
      area: 9.8,
      perimeter: 12.6,
      location: 'Coastal Waters',
      depth: '8m',
      date: '2024-12-10',
      ageGroup: 'Adult',
      status: 'Pending Review',
      imageUrl: 'https://images.unsplash.com/photo-1689384558967-44186820b58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHN0cnVjdHVyZSUyMG1pY3Jvc2NvcGljfGVufDF8fHx8MTc1ODY1MDQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO007',
      filename: 'seabass_adult_007.jpg',
      species: 'Sea Bass',
      scientificName: 'Lates calcarifer',
      confidence: 0.93,
      length: 14.8,
      width: 10.2,
      area: 118.4,
      perimeter: 39.7,
      location: 'Mangrove Waters',
      depth: '35m',
      date: '2024-12-09',
      ageGroup: 'Adult',
      status: 'Verified',
      imageUrl: 'https://images.unsplash.com/photo-1748712308129-1d200044113d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpZmljJTIwc3BlY2ltZW4lMjBib25lfGVufDF8fHx8MTc1ODY1MDUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'OTO008',
      filename: 'snapper_subadult_008.jpg',
      species: 'Red Snapper',
      scientificName: 'Lutjanus campechanus',
      confidence: 0.86,
      length: 11.7,
      width: 7.9,
      area: 73.2,
      perimeter: 31.4,
      location: 'Coral Reef',
      depth: '55m',
      date: '2024-12-08',
      ageGroup: 'Sub-adult',
      status: 'Processing',
      imageUrl: 'https://images.unsplash.com/photo-1630959300489-63dae3a8240a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwYW5hbHlzaXMlMjBtaWNyb3Njb3BlfGVufDF8fHx8MTc1ODY1MDUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const filteredSamples = otolithSamples.filter(sample => {
    const matchesSearch = sample.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = filterSpecies === 'all' || sample.species === filterSpecies;
    return matchesSearch && matchesSpecies;
  });

  const uniqueSpecies = [...new Set(otolithSamples.map(sample => sample.species))];

  const handleImageSelect = (sample: any, index: number) => {
    setSelectedImage(sample);
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + filteredSamples.length) % filteredSamples.length
      : (currentImageIndex + 1) % filteredSamples.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredSamples[newIndex]);
  };

  const OtolithCard = ({ sample, index }: { sample: any; index: number }) => (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => handleImageSelect(sample, index)}
    >
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
          <ImageWithFallback
            src={sample.imageUrl}
            alt={`${sample.species} otolith specimen`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {/* Overlay with species info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs font-medium">{sample.filename}</p>
            </div>
          </div>
          {/* Confidence badge overlay */}
          <div className="absolute top-2 right-2">
            <Badge 
              variant={sample.status === 'Verified' ? 'default' : 'secondary'}
              className={`text-xs ${
                sample.status === 'Verified' 
                  ? 'bg-green-100 text-green-800' 
                  : sample.status === 'Processing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-white/90 text-gray-700'
              }`}
            >
              {Math.round(sample.confidence * 100)}%
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-sm">{sample.species}</h4>
              <p className="text-xs text-gray-600 italic">{sample.scientificName}</p>
            </div>
            <Badge 
              variant={sample.status === 'Verified' ? 'default' : 'outline'}
              className={
                sample.status === 'Verified' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : sample.status === 'Processing'
                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  : ''
              }
            >
              {sample.status}
            </Badge>
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Length:</span>
              <span className="font-medium">{sample.length}mm</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="font-medium">{sample.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{sample.date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout
      user={user}
      currentPage="otolithViewer"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('otolith_viewer')}</h1>
            <p className="text-gray-600 mt-1">
              Analyze and classify otolith images with AI-powered species identification
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
            <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
              <Brain className="h-4 w-4 mr-2" />
              Batch Analysis
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Image Gallery */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Image Library</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search species..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Species</SelectItem>
                    {uniqueSpecies.map(species => (
                      <SelectItem key={species} value={species}>{species}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample Grid */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredSamples.map((sample, index) => (
                <OtolithCard key={sample.id} sample={sample} index={index} />
              ))}
            </div>
          </div>

          {/* Main Viewer */}
          <div className="lg:col-span-2 space-y-4">
            {selectedImage ? (
              <>
                {/* Image Viewer */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <ImageIcon className="h-5 w-5 mr-2 text-[#003366]" />
                        {selectedImage.filename}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigateImage('prev')}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigateImage('next')}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Image Display Area */}
                    <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden mb-4">
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={{ 
                          transform: `scale(${zoomLevel / 100})`,
                          transformOrigin: 'center center'
                        }}
                      >
                        <ImageWithFallback
                          src={selectedImage.imageUrl}
                          alt={`${selectedImage.species} otolith - ${selectedImage.filename}`}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        />
                      </div>
                      
                      {/* Image Controls Overlay */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-white/90 hover:bg-white shadow-md"
                          onClick={() => setZoomLevel(Math.min(500, zoomLevel + 25))}
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-white/90 hover:bg-white shadow-md"
                          onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
                        >
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-white/90 hover:bg-white shadow-md"
                          onClick={() => setShowMeasurements(!showMeasurements)}
                        >
                          <Ruler className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-white/90 hover:bg-white shadow-md"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Image Information Overlay */}
                      <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg px-3 py-2 shadow-lg">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{selectedImage.species}</p>
                          <p className="text-xs text-gray-600 italic">{selectedImage.scientificName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {selectedImage.location} • {selectedImage.depth} • {selectedImage.ageGroup}
                          </p>
                        </div>
                      </div>

                      {/* Zoom Level Indicator */}
                      <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg px-3 py-2 shadow-lg">
                        <p className="text-sm font-medium text-gray-900">Zoom: {zoomLevel}%</p>
                      </div>

                      {/* Measurement Overlay (when enabled) */}
                      {showMeasurements && (
                        <div className="absolute inset-0 pointer-events-none">
                          <svg className="w-full h-full">
                            {/* Example measurement lines */}
                            <line 
                              x1="20%" y1="30%" x2="80%" y2="30%" 
                              stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"
                            />
                            <text x="50%" y="25%" textAnchor="middle" className="fill-red-500 text-sm font-medium">
                              Length: {selectedImage.length}mm
                            </text>
                            <line 
                              x1="25%" y1="25%" x2="25%" y2="75%" 
                              stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"
                            />
                            <text x="20%" y="50%" textAnchor="middle" className="fill-blue-500 text-sm font-medium" transform="rotate(-90 20% 50%)">
                              Width: {selectedImage.width}mm
                            </text>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Zoom Control */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Zoom Level: {zoomLevel}%</label>
                      <Slider
                        value={[zoomLevel]}
                        onValueChange={(value : [number]) => setZoomLevel(value[0])}
                        max={500}
                        min={25}
                        step={25}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Panel */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Species Classification */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-[#003366]" />
                        AI Classification
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{selectedImage.species}</h4>
                          <p className="text-sm text-gray-600 italic">{selectedImage.scientificName}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {(selectedImage.confidence * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence Score</span>
                          <span>{(selectedImage.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={selectedImage.confidence * 100} className="h-2" />
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Age Group</span>
                          <span className="font-medium">{selectedImage.ageGroup}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <Badge 
                            variant={selectedImage.status === 'Verified' ? 'default' : 'secondary'}
                            className={
                              selectedImage.status === 'Verified' 
                                ? 'bg-green-100 text-green-800'
                                : selectedImage.status === 'Processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : ''
                            }
                          >
                            {selectedImage.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Morphometric Data */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Ruler className="h-5 w-5 mr-2 text-[#003366]" />
                        Measurements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Length</p>
                          <p className="font-medium">{selectedImage.length} mm</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Width</p>
                          <p className="font-medium">{selectedImage.width} mm</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Area</p>
                          <p className="font-medium">{selectedImage.area} mm²</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Perimeter</p>
                          <p className="font-medium">{selectedImage.perimeter} mm</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Location</span>
                          <span className="font-medium">{selectedImage.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Depth</span>
                          <span className="font-medium">{selectedImage.depth}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Collection Date</span>
                          <span className="font-medium">{selectedImage.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Image Selected</h3>
                  <p className="text-gray-600">
                    Select an otolith image from the library to view detailed analysis and measurements
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}