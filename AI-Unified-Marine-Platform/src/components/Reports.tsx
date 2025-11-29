import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { ReportGenerator } from './ReportGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import {RouteName} from '../routes-maps';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon,
  Plus,
  Eye,
  Edit,
  Share,
  Clock,
  User,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface ReportsProps {
  user: any;
  onNavigate: (page:RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function Reports({ user, onNavigate, onLogout, language }: ReportsProps) {
  const t = useTranslation(language);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reportType, setReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [savedReports, setSavedReports] = useState<any[]>([]);

  // Load saved reports from localStorage
  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('cmlre-reports') || '[]');
    setSavedReports(reports);
  }, []);

  const reportTemplates = [
    {
      id: 'biodiversity-summary',
      title: 'Biodiversity Assessment Report',
      description: 'Comprehensive analysis of species diversity and distribution',
      category: 'Research',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      id: 'ecosystem-health',
      title: 'Ecosystem Health Report',
      description: 'Environmental indicators and habitat condition assessment',
      category: 'Environmental',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 'species-profile',
      title: 'Species Profile Report',
      description: 'Detailed analysis of individual species characteristics',
      category: 'Research',
      icon: PieChart,
      color: 'text-purple-600'
    },
    {
      id: 'threat-assessment',
      title: 'Conservation Threat Assessment',
      description: 'Risk analysis and conservation priority recommendations',
      category: 'Conservation',
      icon: AlertCircle,
      color: 'text-red-600'
    }
  ];

  const staticReports = [
    {
      id: 'RPT001',
      title: 'Arabian Sea Biodiversity Assessment 2024',
      type: 'Biodiversity Report',
      status: 'Published',
      createdBy: 'Dr. Marine Research',
      createdDate: '2024-12-20',
      lastModified: '2024-12-20',
      downloads: 45,
      pages: 28,
      size: '3.2 MB'
    },
    {
      id: 'RPT002',
      title: 'Coastal Ecosystem Health Analysis',
      type: 'Environmental Report',
      status: 'Draft',
      createdBy: 'Research Team Alpha',
      createdDate: '2024-12-18',
      lastModified: '2024-12-19',
      downloads: 12,
      pages: 15,
      size: '1.8 MB'
    },
    {
      id: 'RPT003',
      title: 'Pomfret Population Dynamics Study',
      type: 'Species Profile',
      status: 'Under Review',
      createdBy: 'Dr. Fish Biology',
      createdDate: '2024-12-15',
      lastModified: '2024-12-17',
      downloads: 23,
      pages: 42,
      size: '5.1 MB'
    },
    {
      id: 'RPT004',
      title: 'Microplastic Impact Assessment',
      type: 'Threat Assessment',
      status: 'Published',
      createdBy: 'Environmental Lab',
      createdDate: '2024-12-10',
      lastModified: '2024-12-12',
      downloads: 78,
      pages: 35,
      size: '4.7 MB'
    },
    {
      id: 'RPT005',
      title: 'Deep Sea Exploration Summary',
      type: 'Research Report',
      status: 'Draft',
      createdBy: 'Deep Sea Team',
      createdDate: '2024-12-08',
      lastModified: '2024-12-15',
      downloads: 7,
      pages: 22,
      size: '2.9 MB'
    }
  ];

  // Combine static reports with saved reports
  const existingReports = [...staticReports, ...savedReports.map(report => ({
    id: report.id,
    title: report.title,
    type: report.type,
    status: report.status,
    createdBy: report.author,
    createdDate: new Date(report.dateGenerated).toLocaleDateString(),
    lastModified: new Date(report.dateGenerated).toLocaleDateString(),
    downloads: Math.floor(Math.random() * 50) + 1,
    pages: Math.floor(Math.random() * 40) + 10,
    size: `${(Math.random() * 5 + 1).toFixed(1)} MB`
  }))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = existingReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === 'all' || report.type === reportType;
    return matchesSearch && matchesType;
  });

  const ReportTemplateCard = ({ template }: { template: any }) => {
    const IconComponent = template.icon;
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full bg-gray-50 ${template.color}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{template.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              <Badge variant="outline" className="mt-2">
                {template.category}
              </Badge>
            </div>
          </div>
          <Button 
            className="w-full mt-4" 
            size="sm"
            onClick={() => setShowReportGenerator(true)}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout
      user={user}
      currentPage="reports"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Show Report Generator Modal */}
        {showReportGenerator && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Professional Report Generator</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowReportGenerator(false)}
                  >
                    Close
                  </Button>
                </div>
                <ReportGenerator 
                  user={user} 
                  onClose={() => {
                    setShowReportGenerator(false);
                    // Refresh reports list
                    const reports = JSON.parse(localStorage.getItem('cmlre-reports') || '[]');
                    setSavedReports(reports);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('reports')}</h1>
            <p className="text-gray-600 mt-1">
              Generate, manage, and share research reports
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced {t('filters')}
            </Button>
            <Button 
              size="sm" 
              className="bg-[#003366] hover:bg-[#004080]"
              onClick={() => setShowReportGenerator(true)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="existing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="existing">Existing Reports</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          {/* Existing Reports Tab */}
          <TabsContent value="existing" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Biodiversity Report">Biodiversity Report</SelectItem>
                      <SelectItem value="Environmental Report">Environmental Report</SelectItem>
                      <SelectItem value="Species Profile">Species Profile</SelectItem>
                      <SelectItem value="Threat Assessment">Threat Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {selectedDate ? selectedDate.toLocaleDateString() : "Date range"}
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
              </CardContent>
            </Card>

            {/* Reports Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#003366]" />
                  Report Library ({filteredReports.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{report.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <User className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{report.createdBy}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{report.pages} pages</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{report.size}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-600">{report.createdDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.downloads}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>
                  Pre-configured report templates for common research scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {reportTemplates.map((template) => (
                    <ReportTemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create New Tab */}
          <TabsContent value="create" className="space-y-6">
            <ReportGenerator user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}