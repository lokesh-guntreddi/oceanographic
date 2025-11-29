import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Layout } from './Layout';
import { Upload, FileText, Image, Dna, Database, MapPin, CheckCircle, AlertCircle, FileIcon, Settings } from 'lucide-react';
import { toast } from "sonner";
import { RouteName } from '../routes-maps';

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface DataUploadProps {
  user: User|null;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
  currentPage: RouteName;
}

export function DataUpload({ user, onNavigate, onLogout, language, currentPage }: DataUploadProps) {
  const [uploadMode, setUploadMode] = useState<'standard' | 'enhanced'>('enhanced');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    researcher: '',
    tags: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    if (uploadMode === 'enhanced') {
      // Auto-extract metadata for enhanced mode
      newFiles.forEach(file => {
        if (file.name.includes('otolith') || file.name.includes('fish')) {
          toast.info(`Detected marine specimen file: ${file.name}`);
        }
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const simulateUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate AI processing for enhanced mode
    if (uploadMode === 'enhanced') {
      toast.success("Files uploaded and processed with AI enhancement");
    } else {
      toast.success("Files uploaded successfully");
    }
    
    setProcessing(false);
    setUploadProgress(0);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().includes('image') || fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return <Image className="w-4 h-4" />;
    }
    if (fileName.toLowerCase().includes('dna') || fileName.match(/\.(fasta|fastq)$/i)) {
      return <Dna className="w-4 h-4" />;
    }
    if (fileName.match(/\.(csv|xlsx|xls)$/i)) {
      return <Database className="w-4 h-4" />;
    }
    return <FileIcon className="w-4 h-4" />;
  };

  const getFileCategory = (fileName: string) => {
    if (fileName.toLowerCase().includes('otolith')) return 'Otolith Data';
    if (fileName.toLowerCase().includes('fish')) return 'Fish Specimens';
    if (fileName.toLowerCase().includes('dna')) return 'eDNA Samples';
    if (fileName.toLowerCase().includes('water')) return 'Water Quality';
    return 'General Data';
  };

  return (
    <Layout  user={user} onNavigate={onNavigate} onLogout={onLogout} language={language} currentPage='dataUpload'>
      <div className="p-6 space-y-6">
        {/* Header with Mode Toggle */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">Data Upload Center</h1>
            <p className="text-muted-foreground mt-2">
              Upload marine research data with {uploadMode === 'enhanced' ? 'AI-powered' : 'standard'} processing
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Standard</span>
              <Switch 
                checked={uploadMode === 'enhanced'} 
                onCheckedChange={(checked:boolean) => setUploadMode(checked ? 'enhanced' : 'standard')}
              />
              <span className="text-sm">Enhanced</span>
              <Settings className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  {uploadMode === 'enhanced' ? 'AI-Enhanced Upload' : 'Standard Upload'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Tabs */}
                <Tabs defaultValue="files" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="files">File Upload</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    <TabsTrigger value="review">Review</TabsTrigger>
                  </TabsList>

                  <TabsContent value="files" className="space-y-4">
                    {/* Drag & Drop Area */}
                    <div
                      ref={dragRef}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Supported formats: Images (JPG, PNG), Data (CSV, XLSX), Sequences (FASTA)
                      </p>
                      {uploadMode === 'enhanced' && (
                        <Badge variant="default" className="bg-blue-600">
                          AI Auto-Detection Enabled
                        </Badge>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                      accept=".jpg,.jpeg,.png,.csv,.xlsx,.xls,.fasta,.fastq,.txt"
                    />

                    {/* File List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium">Selected Files ({uploadedFiles.length})</h3>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(file.name)}
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                  {uploadMode === 'enhanced' && (
                                    <Badge variant="outline" className="text-xs">
                                      {getFileCategory(file.name)}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="metadata" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Dataset Title</label>
                        <Input
                          value={metadata.title}
                          onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter dataset title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Collection Date</label>
                        <Input
                          type="date"
                          value={metadata.date}
                          onChange={(e) => setMetadata(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input
                          value={metadata.location}
                          onChange={(e) => setMetadata(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="GPS coordinates or location name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Researcher</label>
                        <Input
                          value={metadata.researcher}
                          onChange={(e) => setMetadata(prev => ({ ...prev, researcher: e.target.value }))}
                          placeholder="Primary researcher name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea
                        value={metadata.description}
                        onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed description of the dataset"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                      <Input
                        value={metadata.tags}
                        onChange={(e) => setMetadata(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="otolith, fish-age, arabian-sea"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="review" className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Upload Summary</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Files:</strong> {uploadedFiles.length} selected</p>
                        <p><strong>Total Size:</strong> {(uploadedFiles.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB</p>
                        <p><strong>Mode:</strong> {uploadMode === 'enhanced' ? 'AI-Enhanced Processing' : 'Standard Upload'}</p>
                        {metadata.title && <p><strong>Title:</strong> {metadata.title}</p>}
                        {metadata.location && <p><strong>Location:</strong> {metadata.location}</p>}
                      </div>
                    </div>

                    {uploadMode === 'enhanced' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">AI Enhancement Features</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Automatic species identification from images</li>
                          <li>• Metadata extraction from EXIF data</li>
                          <li>• Quality assessment and validation</li>
                          <li>• Duplicate detection and handling</li>
                        </ul>
                      </div>
                    )}

                    <Button
                      onClick={simulateUpload}
                      className="w-full"
                      disabled={processing || uploadedFiles.length === 0}
                    >
                      {processing ? `Uploading... ${uploadProgress}%` : 'Start Upload'}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Upload Statistics & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">847</p>
                    <p className="text-sm text-gray-600">Files This Month</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">2.4TB</p>
                    <p className="text-sm text-gray-600">Data Processed</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('dataExplorer')}>
                  <Database className="w-4 h-4 mr-2" />
                  Browse Uploaded Data
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('otolithViewer')}>
                  <Image className="w-4 h-4 mr-2" />
                  Analyze Otoliths
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('ednaLab')}>
                  <Dna className="w-4 h-4 mr-2" />
                  Process eDNA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}