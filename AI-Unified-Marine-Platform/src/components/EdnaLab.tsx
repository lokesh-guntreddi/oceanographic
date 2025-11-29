import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Dna,
  Upload,
  Search,
  Download,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Zap,
  BarChart3,
  FileText,
  Eye,
  Copy
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { RouteName } from '../routes-maps';
interface EdnaLabProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function EdnaLab({ user, onNavigate, onLogout, language }: EdnaLabProps) {
  const t = useTranslation(language);
  const [selectedSequence, setSelectedSequence] = useState<any>(null);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [uploadedSequence, setUploadedSequence] = useState('');

  const ednaJobs = [
    {
      id: 'EDNA001',
      name: 'Arabian Sea Coastal Sample A1',
      status: 'Completed',
      progress: 100,
      sequences: 156,
      matches: 23,
      submitTime: '2024-12-20 14:30',
      completionTime: '2024-12-20 15:45',
      region: 'Arabian Sea',
      depth: '15m'
    },
    {
      id: 'EDNA002',
      name: 'Bengal Bay Deep Water B2',
      status: 'Running',
      progress: 67,
      sequences: 234,
      matches: 15,
      submitTime: '2024-12-20 16:00',
      completionTime: null,
      region: 'Bay of Bengal',
      depth: '120m'
    },
    {
      id: 'EDNA003',
      name: 'Coastal Mangrove Sample C3',
      status: 'Queued',
      progress: 0,
      sequences: 89,
      matches: 0,
      submitTime: '2024-12-20 16:30',
      completionTime: null,
      region: 'Coastal Waters',
      depth: '5m'
    },
    {
      id: 'EDNA004',
      name: 'Deep Sea Exploration D4',
      status: 'Failed',
      progress: 34,
      sequences: 67,
      matches: 0,
      submitTime: '2024-12-20 13:15',
      completionTime: null,
      region: 'Arabian Sea',
      depth: '850m'
    }
  ];

  const speciesMatches = [
    {
      species: 'Pampus argenteus',
      commonName: 'Silver Pomfret',
      similarity: 98.7,
      coverage: 95,
      eValue: '2e-85',
      accession: 'JX123456',
      family: 'Stromateidae',
      order: 'Perciformes'
    },
    {
      species: 'Rastrelliger kanagurta',
      commonName: 'Indian Mackerel',
      similarity: 96.4,
      coverage: 92,
      eValue: '4e-78',
      accession: 'KY789012',
      family: 'Scombridae',
      order: 'Perciformes'
    },
    {
      species: 'Sardinella longiceps',
      commonName: 'Indian Oil Sardine',
      similarity: 94.2,
      coverage: 88,
      eValue: '1e-72',
      accession: 'MH345678',
      family: 'Clupeidae',
      order: 'Clupeiformes'
    },
    {
      species: 'Thunnus albacares',
      commonName: 'Yellowfin Tuna',
      similarity: 92.8,
      coverage: 85,
      eValue: '3e-65',
      accession: 'LC901234',
      family: 'Scombridae',
      order: 'Perciformes'
    },
    {
      species: 'Scomberomorus commerson',
      commonName: 'Narrow-barred Spanish Mackerel',
      similarity: 91.5,
      coverage: 83,
      eValue: '7e-62',
      accession: 'AB567890',
      family: 'Scombridae',
      order: 'Perciformes'
    }
  ];

  const alignmentHeatmap = [
    { position: 1, a: 0.8, t: 0.1, c: 0.05, g: 0.05 },
    { position: 2, a: 0.1, t: 0.05, c: 0.8, g: 0.05 },
    { position: 3, a: 0.05, t: 0.8, c: 0.1, g: 0.05 },
    { position: 4, a: 0.05, t: 0.05, c: 0.1, g: 0.8 },
    { position: 5, a: 0.7, t: 0.15, c: 0.1, g: 0.05 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Queued': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Running': return <Play className="h-4 w-4" />;
      case 'Queued': return <Clock className="h-4 w-4" />;
      case 'Failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const sampleSequence = `>Sample_Sequence_001
ATGCGATCGTAGCTAGCTAGCTAGCTAGCATCGATCGATCGATCGATCGATC
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCTAGCATCGATCGATCGATCGATCGATCGCTAGCTAGCTAGCTAGCTAGCT
AGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCATCGATCGATCGATCGATCGA
TCGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG`;

  return (
    <Layout
      user={user}
      currentPage="ednaLab"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('edna_lab')}</h1>
            <p className="text-gray-600 mt-1">
              Environmental DNA sequence analysis and species identification
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Reference Database
            </Button>
            <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
              <Upload className="h-4 w-4 mr-2" />
              Upload FASTA
            </Button>
          </div>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">Analysis Jobs</TabsTrigger>
            <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="database">Species Database</TabsTrigger>
          </TabsList>

          {/* Analysis Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dna className="h-5 w-5 mr-2 text-[#003366]" />
                  eDNA Analysis Jobs
                </CardTitle>
                <CardDescription>Track the progress of your sequence analysis jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Sequences</TableHead>
                      <TableHead>Matches</TableHead>
                      <TableHead>Submit Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ednaJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.name}</p>
                            <p className="text-sm text-gray-600">{job.region} • {job.depth}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(job.status)}>
                            <span className="flex items-center">
                              {getStatusIcon(job.status)}
                              <span className="ml-1">{job.status}</span>
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={job.progress} className="h-2 w-24" />
                            <span className="text-sm text-gray-600">{job.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{job.sequences}</TableCell>
                        <TableCell>{job.matches}</TableCell>
                        <TableCell className="text-sm">{job.submitTime}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {job.status === 'Completed' && (
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload & Analyze Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-[#003366]" />
                    Upload Sequence
                  </CardTitle>
                  <CardDescription>Upload FASTA format sequences for analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sample Name</label>
                    <Input placeholder="Enter sample identifier..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Collection Location</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arabian">Arabian Sea</SelectItem>
                        <SelectItem value="bengal">Bay of Bengal</SelectItem>
                        <SelectItem value="coastal">Coastal Waters</SelectItem>
                        <SelectItem value="deep">Deep Sea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">FASTA Sequence</label>
                    <Textarea 
                      placeholder="Paste your FASTA format sequence here..."
                      value={uploadedSequence}
                      onChange={(e) => setUploadedSequence(e.target.value)}
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="bg-[#003366] hover:bg-[#004080]"
                      onClick={() => setUploadedSequence(sampleSequence)}
                    >
                      Load Sample
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-[#003366]" />
                    Analysis Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reference Database</label>
                    <Select defaultValue="comprehensive">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprehensive">Comprehensive Marine Database</SelectItem>
                        <SelectItem value="fish">Fish Species Only</SelectItem>
                        <SelectItem value="invertebrates">Marine Invertebrates</SelectItem>
                        <SelectItem value="custom">Custom Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Similarity Threshold</label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="95">95% (High Confidence)</SelectItem>
                        <SelectItem value="90">90% (Standard)</SelectItem>
                        <SelectItem value="85">85% (Broad Search)</SelectItem>
                        <SelectItem value="80">80% (Maximum Coverage)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Analysis Type</label>
                    <Select defaultValue="blastn">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blastn">BLASTN (Nucleotide)</SelectItem>
                        <SelectItem value="blastx">BLASTX (Translated)</SelectItem>
                        <SelectItem value="megablast">MEGABLAST (Fast)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Results</label>
                    <Select defaultValue="50">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 matches</SelectItem>
                        <SelectItem value="25">25 matches</SelectItem>
                        <SelectItem value="50">50 matches</SelectItem>
                        <SelectItem value="100">100 matches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="w-full bg-[#003366] hover:bg-[#004080]"
                    disabled={!uploadedSequence || analysisRunning}
                    onClick={() => setAnalysisRunning(true)}
                  >
                    {analysisRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="h-5 w-5 mr-2 text-[#003366]" />
                    Species Matches
                  </CardTitle>
                  <CardDescription>Top species matches for your sequence</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Species</TableHead>
                        <TableHead>Similarity</TableHead>
                        <TableHead>Coverage</TableHead>
                        <TableHead>E-value</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {speciesMatches.map((match, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{match.species}</p>
                              <p className="text-sm text-gray-600">{match.commonName}</p>
                              <p className="text-xs text-gray-500">{match.family}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={match.similarity} className="h-2 w-16" />
                              <span className="text-sm font-medium">{match.similarity}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{match.coverage}%</TableCell>
                          <TableCell className="font-mono text-sm">{match.eValue}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-[#003366]" />
                    Match Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Matches</span>
                      <span className="font-medium">{speciesMatches.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>High Confidence (&gt;95%)</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Medium Confidence (90-95%)</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Low Confidence (&lt;90%)</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Taxonomic Distribution</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Perciformes</span>
                        <span>4 species</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clupeiformes</span>
                        <span>1 species</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alignment Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dna className="h-5 w-5 mr-2 text-[#003366]" />
                  Sequence Alignment
                </CardTitle>
                <CardDescription>Nucleotide composition heatmap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    <div className="font-bold">Pos</div>
                    <div className="font-bold text-red-600">A</div>
                    <div className="font-bold text-blue-600">T</div>
                    <div className="font-bold text-green-600">C</div>
                    <div className="font-bold text-orange-600">G</div>
                    <div className="font-bold">Cons</div>
                  </div>
                  {alignmentHeatmap.map((row) => (
                    <div key={row.position} className="grid grid-cols-6 gap-2 mb-1">
                      <div>{row.position}</div>
                      <div 
                        className="text-red-600 p-1 rounded text-center"
                        style={{ backgroundColor: `rgba(239, 68, 68, ${row.a})` }}
                      >
                        {(row.a * 100).toFixed(0)}%
                      </div>
                      <div 
                        className="text-blue-600 p-1 rounded text-center"
                        style={{ backgroundColor: `rgba(59, 130, 246, ${row.t})` }}
                      >
                        {(row.t * 100).toFixed(0)}%
                      </div>
                      <div 
                        className="text-green-600 p-1 rounded text-center"
                        style={{ backgroundColor: `rgba(34, 197, 94, ${row.c})` }}
                      >
                        {(row.c * 100).toFixed(0)}%
                      </div>
                      <div 
                        className="text-orange-600 p-1 rounded text-center"
                        style={{ backgroundColor: `rgba(249, 115, 22, ${row.g})` }}
                      >
                        {(row.g * 100).toFixed(0)}%
                      </div>
                      <div className="font-bold">
                        {row.a > 0.5 ? 'A' : row.t > 0.5 ? 'T' : row.c > 0.5 ? 'C' : 'G'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Species Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-[#003366]" />
                  Marine Species Reference Database
                </CardTitle>
                <CardDescription>Browse the reference sequences used for species identification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#003366]">15,247</div>
                      <div className="text-sm text-gray-600">Total Sequences</div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#003366]">2,156</div>
                      <div className="text-sm text-gray-600">Species Covered</div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#003366]">Last Updated</div>
                      <div className="text-sm text-gray-600">Dec 2024</div>
                    </div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input placeholder="Search species..." className="flex-1" />
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Families</SelectItem>
                        <SelectItem value="scombridae">Scombridae</SelectItem>
                        <SelectItem value="clupeidae">Clupeidae</SelectItem>
                        <SelectItem value="stromateidae">Stromateidae</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Database browser interface would be implemented here</p>
                    <p className="text-sm">Search and browse reference sequences by species, family, or accession number</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}