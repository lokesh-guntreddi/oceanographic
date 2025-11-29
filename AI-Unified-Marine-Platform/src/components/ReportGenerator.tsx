import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { 
  FileText, 
  Download, 
  Send, 
  User, 
  Calendar, 
  MapPin, 
  BarChart3,
  Fish,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  FileBarChart,
  Globe,
  Eye
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface ReportGeneratorProps {
  user: 'Known'|null;
  reportType?: string;
  onClose?: () => void;
}

interface ReportData {
  title: string;
  summary: string;
  reportType: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  region: string;
  dateRange: string;
  findings: string[];
  recommendations: string[];
  attachments: string[];
}

export function ReportGenerator({ user, reportType = '', onClose }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [reportData, setReportData] = useState<ReportData>({
    title: '',
    summary: '',
      reportType: reportType || ( 'research-findings' ),
      priority: 'medium',
    region: 'Arabian Sea',
    dateRange: '2024-Q1',
    findings: [''],
    recommendations: [''],
    attachments: []
  });

  const reportTypes = {
    researcher: [
      { value: 'research-findings', label: 'Research Findings Report', icon: BarChart3 },
      { value: 'species-analysis', label: 'Species Analysis Report', icon: Fish },
      { value: 'environmental-data', label: 'Environmental Data Report', icon: Globe },
      { value: 'survey-results', label: 'Survey Results Report', icon: FileBarChart }
    ],
    policymaker: [
      { value: 'policy-analysis', label: 'Policy Impact Analysis', icon: Target },
      { value: 'regulatory-assessment', label: 'Regulatory Assessment', icon: Shield },
      { value: 'compliance-report', label: 'Compliance Report', icon: CheckCircle },
      { value: 'stakeholder-briefing', label: 'Stakeholder Briefing', icon: Users }
    ],
    conservationist: [
      { value: 'conservation-assessment', label: 'Conservation Assessment', icon: Shield },
      { value: 'threat-analysis', label: 'Threat Analysis Report', icon: AlertTriangle },
      { value: 'habitat-monitoring', label: 'Habitat Monitoring Report', icon: MapPin },
      { value: 'species-protection', label: 'Species Protection Report', icon: Fish }
    ]
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReportTemplate = (type: string) => {
    const templates = {
      'research-findings': {
        title: 'Marine Research Findings Report',
        sections: ['Executive Summary', 'Methodology', 'Key Findings', 'Data Analysis', 'Conclusions', 'Recommendations'],
        defaultFindings: [
          `Species diversity analysis for {'unknown'.split('@')[0]} shows 15% increase in protected areas`,
          `User-tracked water temperature variations indicate seasonal patterns in ${reportData.region || 'Arabian Sea'}`,
          `Microplastic contamination detected in 68% of samples from user's research area`,
          `Fish population recovery observed in monitored no-take zones (${getCurrentDate()} analysis)`
        ],
        defaultRecommendations: [
          `Expand {'unknown'.split('@')[0]}'s monitoring programs to additional sites in ${reportData.region || 'Arabian Sea'}`,
          'Implement standardized sampling protocols for CMLRE backbone platform integration',
          `Increase funding allocation for {user.role} long-term studies`,
          'Enhance collaboration through CMLRE backbone with international research institutes'
        ]
      },
      'policy-analysis': {
        title: 'Marine Policy Impact Analysis',
        sections: ['Executive Summary', 'Policy Overview', 'Impact Assessment', 'Stakeholder Analysis', 'Recommendations', 'Implementation Timeline'],
        defaultFindings: [
          `Policy analysis by {'unknown'.split('@')[0]} shows fishing quotas reduced overfishing by 25%`,
          `${reportData.region || 'Arabian Sea'} marine protected areas showing positive biodiversity trends`,
          `Compliance monitoring through CMLRE backbone reveals regional variations`,
          `Economic impact assessment indicates fishing communities require targeted support`
        ],
        defaultRecommendations: [
          `Adjust ${reportData.region || 'regional'} fishing quotas based on CMLRE backbone stock assessments`,
          'Strengthen enforcement mechanisms using platform monitoring tools',
          `Provide alternative livelihood support for affected communities in ${reportData.region || 'target region'}`,
          'Enhance stakeholder consultation through CMLRE backbone platform'
        ]
      },
      'conservation-assessment': {
        title: 'Marine Conservation Assessment Report',
        sections: ['Executive Summary', 'Conservation Status', 'Threat Assessment', 'Protection Measures', 'Recommendations', 'Action Plan'],
        defaultFindings: [
          `Field assessment by {'unknown'.split('@')[0]} reveals critical habitat degradation in ${reportData.region || 'coastal areas'}`,
          `Endangered species monitoring shows slight recovery in user-tracked populations`,
          `CMLRE backbone surveillance detected illegal fishing activities in protected zones`,
          `Climate change impact analysis accelerating habitat loss in monitored areas`
        ],
        defaultRecommendations: [
          `Implement immediate protection measures for critical habitats in ${reportData.region || 'target region'}`,
          'Increase patrol frequency using CMLRE backbone monitoring systems',
          `Develop community-based conservation programs coordinated through platform`,
          'Establish wildlife corridors between protected areas using platform data'
        ]
      }
    };

    return templates[type as keyof typeof templates] || templates['research-findings'];
  };

  const addFinding = () => {
    setReportData(prev => ({
      ...prev,
      findings: [...prev.findings, '']
    }));
  };

  const addRecommendation = () => {
    setReportData(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, '']
    }));
  };

  const updateFinding = (index: number, value: string) => {
    const newFindings = [...reportData.findings];
    newFindings[index] = value;
    setReportData(prev => ({ ...prev, findings: newFindings }));
  };

  const updateRecommendation = (index: number, value: string) => {
    const newRecommendations = [...reportData.recommendations];
    newRecommendations[index] = value;
    setReportData(prev => ({ ...prev, recommendations: newRecommendations }));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = getReportTemplate(reportData.reportType);
      const reportId = `CMLRE-{user.role.toUpperCase()}-${Date.now()}`;
      
      // Create professional report content
      const reportContent = generateReportContent(template, reportId);
      
      // Save report to localStorage (simulating database)
      const savedReports = JSON.parse(localStorage.getItem('cmlre-reports') || '[]');
      const personalData = getPersonalizedData();
      const newReport = {
        id: reportId,
        title: reportData.title || template.title,
        content: reportContent,
        author: 'Unknown',
        authorId: 'Unknown',
        role:  'Unknown',
        type: reportData.reportType,
        priority: reportData.priority,
        region: reportData.region,
        dateGenerated: new Date().toISOString(),
        status: 'Generated',
        sessionData: personalData,
        userSpecific: true,
        platform: 'CMLRE backbone',
        version: '2025.1.0'
      };
      
      savedReports.push(newReport);
      localStorage.setItem('cmlre-reports', JSON.stringify(savedReports));
      
      // Download report as text file (simulating PDF)
      downloadReport(reportContent, reportId);
      
      toast.success('Report generated successfully!', {
        description: `Personalized report ${reportId} for ${'unknown'} has been generated and saved.`
      });
      
      if (onClose) onClose();
      
    } catch (error) {
      toast.error('Failed to generate report', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getPersonalizedData = () => {
    // Get user-specific session data
    const sessionStart = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random date within last week
    const totalSessions = Math.floor(Math.random() * 50) + 10;
    const dataAccessed = Math.floor(Math.random() * 1000) + 100;
    const reportsGenerated = Math.floor(Math.random() * 20) + 1;
    
    return {
      sessionStart: sessionStart.toLocaleDateString('en-IN'),
      totalSessions,
      dataAccessed,
      reportsGenerated,
      userSpecificMetrics: getUserSpecificMetrics()
    };
  };

  const getUserSpecificMetrics = () => {
    const baseMetrics = {
      researcher: {
        samplesAnalyzed: Math.floor(Math.random() * 500) + 200,
        speciesIdentified: Math.floor(Math.random() * 50) + 25,
        dataSetsuploaded: Math.floor(Math.random() * 15) + 5,
        collaborations: Math.floor(Math.random() * 8) + 3
      },
      policymaker: {
        policiesReviewed: Math.floor(Math.random() * 20) + 10,
        stakeholderMeetings: Math.floor(Math.random() * 15) + 5,
        regulationsAssessed: Math.floor(Math.random() * 30) + 15,
        impactAnalyses: Math.floor(Math.random() * 12) + 6
      },
      conservationist: {
        sitesMonitored: Math.floor(Math.random() * 25) + 10,
        threatsIdentified: Math.floor(Math.random() * 40) + 20,
        protectionMeasures: Math.floor(Math.random() * 18) + 8,
        communityEngagements: Math.floor(Math.random() * 30) + 15
      }
    };
    
    return  baseMetrics.researcher;
    //baseMetrics[user.role] || baseMetrics['researcher'
  };

  const generateReportContent = (template: any, reportId: string) => {
    const currentDate = getCurrentDate();
    const authorName = 'Unknown';
    const personalData = getPersonalizedData();
    
    return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                     GOVERNMENT OF INDIA                                      ║
║                 MINISTRY OF EARTH SCIENCES                                   ║
║                 CMLRE backbone - MARINE DATA PLATFORM                       ║
║                    GOVERNMENT DATA PLATFORM                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

${template.title}

Report ID: ${reportId}
Classification: OFFICIAL USE ONLY
Generated: ${currentDate}
Author: ${authorName} 
User Email:''unknown''
Region: ${reportData.region}
Period: ${reportData.dateRange}
Priority Level: ${reportData.priority.toUpperCase()}

════════════════════════════════════════════════════════════════════════════════

USER SESSION SUMMARY
First Login: ${personalData.sessionStart}
Total Sessions: ${personalData.totalSessions}
Data Points Accessed: ${personalData.dataAccessed}
Reports Generated: ${personalData.reportsGenerated}

${'researcher'=== 'researcher'|| null ? `
RESEARCH ACTIVITY METRICS
• Samples Analyzed: ${personalData.userSpecificMetrics.samplesAnalyzed}
• Species Identified: ${personalData.userSpecificMetrics.speciesIdentified}
• Datasets Uploaded: ${personalData.userSpecificMetrics.dataSetsuploaded}
• Active Collaborations: ${personalData.userSpecificMetrics.collaborations}` :

'policymaker' === 'policymaker' ? `
POLICY DEVELOPMENT METRICS
• Policies Reviewed: {personalData.userSpecificMetrics.policiesReviewed}
• Stakeholder Meetings: {personalData.userSpecificMetrics.stakeholderMeetings}
• Regulations Assessed: {personalData.userSpecificMetrics.regulationsAssessed}
• Impact Analyses Completed: {personalData.userSpecificMetrics.impactAnalyses}` :

`CONSERVATION ACTIVITY METRICS
• Monitoring Sites: {personalData.userSpecificMetrics.sitesMonitored}
• Threats Identified: {personalData.userSpecificMetrics.threatsIdentified}
• Protection Measures Implemented: {personalData.userSpecificMetrics.protectionMeasures}
• Community Engagements: {personalData.userSpecificMetrics.communityEngagements}`}

════════════════════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
${reportData.summary || 'This report presents comprehensive analysis of marine data accessed through CMLRE backbone platform, providing actionable insights for sustainable ocean management and conservation efforts based on user-specific data interactions and research activities.'}

════════════════════════════════════════════════════════════════════════════════

PERSONALIZED DATA INSIGHTS

Current Session Analysis:
• Platform Access Level: AUTHENTICATED
• Primary Research Focus: ${reportData.region} Marine Ecosystem
• Data Integration Points: ${Math.floor(Math.random() * 15) + 8}
• Real-time Monitoring Status: ACTIVE

User-Specific Findings Based on Platform Usage:
${reportData.findings.filter(f => f.trim()).map((finding, index) => 
  `${index + 1}. ${finding} [User Data: ${'unknown'}]`
).join('\n')}

════════════════════════════════════════════════════════════════════════════════

ACTIONABLE RECOMMENDATIONS

Personalized Recommendations for ${authorName}:
${reportData.recommendations.filter(r => r.trim()).map((rec, index) => 
  `${index + 1}. ${rec} [Priority: ${reportData.priority.toUpperCase()}]`
).join('\n')}

Next Steps fortoUpperCase()} Role:
• Continue monitoring ${reportData.region} region data trends
• Schedule follow-up analysis in 30 days
• Coordinate with === 'researcher' ? 'Policy and Conservation teams' : 
                   user.role === 'policymaker' ? 'Research and Field teams' : 
                   'Research and Policy teams'}
• Update data access permissions as required

════════════════════════════════════════════════════════════════════════════════

TECHNICAL SPECIFICATIONS

Data Sources: CMLRE backbone Marine Data Platform
User Authentication: ${'unknown'} [VERIFIED]
Analysis Framework: CMLRE Data Platform
Session ID: ${reportId.split('-').pop()}
Quality Assurance: Government Standards Compliant
Review Status:  'policymaker' ? 'Ministerial Review Required' : 
                'Field Validation Required'}

Platform Integration:
• Marine Map Module: ${Math.random() > 0.5 ? 'ACCESSED' : 'NOT ACCESSED'}
• Species Analysis: ${Math.random() > 0.3 ? 'ACTIVE' : 'STANDBY'}
• eDNA Laboratory: ${Math.random() > 0.6 ? 'UTILIZED' : 'AVAILABLE'}
• Policy Tools:  === 'policymaker' ? 'ACTIVELY USED' : 'READ-ONLY ACCESS'}

════════════════════════════════════════════════════════════════════════════════

USER AUTHENTICATION & APPROVAL CHAIN

Generated By: ${authorName}
Email: ${'unknown'}
Role: 
Date: ${currentDate}
Digital Signature: [CMLRE-backbone-
Platform Session: AUTHENTICATED

Review Required By:  === 'policymaker' ? 'Policy Director' : 
                     'Conservation Field Coordinator'}

Final Approval Authority: Ministry of Earth Sciences
Report Status: GENERATED - AWAITING REVIEW

════════════════════════════════════════════════════════════════════════════════

DATA SECURITY & COMPLIANCE

User Access Level CLEARANCE
Data Classification: OFFICIAL USE ONLY
Platform Compliance: IS 27001:2013 Standards
Audit Trail: MAINTAINED
Data Retention: As per Government Guidelines

CONFIDENTIALITY NOTICE
This document contains information that may be confidential and/or legally 
privileged. It is intended only for ${authorName} (${'unknown'}) and 
authorized personnel within the scope of marine conservation and sustainable 
ocean management initiatives.

Generated through CMLRE backbone Platform
Government Marine Data System
User Session: ${new Date().toISOString()}

END OF REPORT
    `;
  };

  const downloadReport = (content: string, reportId: string) => {
    // Create a more PDF-like format with better structure
    const pdfLikeContent = content.replace(/\n/g, '\r\n'); // Windows line endings for better compatibility
    
    const blob = new Blob([pdfLikeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Create personalized filename
    const userInitials = 'unknown'.split('@')[0].replace(/[._]/g, '').substring(0, 3).toUpperCase();
    const reportTypeShort = reportData.reportType.split('-')[0].toUpperCase();
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    
    a.download = `CMLRE_${userInitials}_${reportTypeShort}_${timestamp}_${reportId.split('-').pop()}.pdf.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePreview = () => {
    const template = getReportTemplate(reportData.reportType);
    const reportId = `PREVIEW-RESEARCHER -${Date.now()}`;
    const content = generateReportContent(template, reportId);
    setPreviewContent(content);
    setShowPreview(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentReportTypes =  reportTypes.researcher;
  const currentTemplate = getReportTemplate(reportData.reportType);

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-[#003366] to-[#004080] text-white">
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-3" />
            Professional Report Generator
          </CardTitle>
          <CardDescription className="text-blue-100">
            Generate comprehensive marine data reports with government-standard formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                Author: {'unknown'}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Date: {getCurrentDate()}
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                {'UNKNOWN'} REPORT
              </Badge>
              <Badge variant="secondary" className={getPriorityColor(reportData.priority)}>
                {reportData.priority.toUpperCase()} PRIORITY
              </Badge>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>Ministry of Earth Sciences</div>
              <div>CMLRE Marine Data Backbone</div>
              <div>Government Marine Platform</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Configure report parameters and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Type</label>
              <Select 
                value={reportData.reportType} 
                onValueChange={(value:string) => setReportData(prev => ({ ...prev, reportType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currentReportTypes.map((type : any) => {
                    const IconComponent = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Report Title</label>
              <Input
                value={reportData.title}
                onChange={(e) => setReportData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={currentTemplate.title}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Priority Level</label>
                <Select 
                  value={reportData.priority} 
                  onValueChange={(value: any) => setReportData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="critical">Critical Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <Select 
                  value={reportData.region} 
                  onValueChange={(value:any) => setReportData(prev => ({ ...prev, region: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arabian Sea">Arabian Sea</SelectItem>
                    <SelectItem value="Bay of Bengal">Bay of Bengal</SelectItem>
                    <SelectItem value="Indian Ocean">Indian Ocean</SelectItem>
                    <SelectItem value="Coastal Waters">Coastal Waters</SelectItem>
                    <SelectItem value="All Regions">All Regions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Executive Summary</label>
              <Textarea
                value={reportData.summary}
                onChange={(e) => setReportData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Provide a comprehensive summary of the report contents..."
                className="min-h-24"
              />
            </div>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Report Structure</CardTitle>
            <CardDescription>Expected sections for {currentTemplate.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTemplate.sections.map((section: string, index: number) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{section}</div>
                    <div className="text-sm text-gray-600">
                      {section === 'Executive Summary' ? 'High-level overview and key insights' :
                       section === 'Key Findings' ? 'Primary research outcomes and discoveries' :
                       section === 'Recommendations' ? 'Actionable suggestions and next steps' :
                       'Detailed analysis and supporting data'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Key Findings</span>
            <Button onClick={addFinding} variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Add Finding
            </Button>
          </CardTitle>
          <CardDescription>Document important discoveries and observations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportData.findings.map((finding, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                {index + 1}
              </div>
              <Textarea
                value={finding}
                onChange={(e) => updateFinding(index, e.target.value)}
                placeholder={currentTemplate.defaultFindings[index] || "Enter key finding..."}
                className="flex-1"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recommendations</span>
            <Button onClick={addRecommendation} variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Add Recommendation
            </Button>
          </CardTitle>
          <CardDescription>Provide actionable recommendations based on findings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportData.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                {index + 1}
              </div>
              <Textarea
                value={recommendation}
                onChange={(e) => updateRecommendation(index, e.target.value)}
                placeholder={currentTemplate.defaultRecommendations[index] || "Enter recommendation..."}
                className="flex-1"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Generation Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Report will be generated with government-standard formatting</p>
              <p>Saved reports can be accessed from the Reports dashboard</p>
            </div>
            <div className="flex space-x-3">
              {onClose && (
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              )}
              <Button 
                onClick={generateReport} 
                disabled={isGenerating}
                className="bg-[#003366] hover:bg-[#004080]"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Generate & Download Report
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Report Preview - {'unknown'}</h2>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Close Preview
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {previewContent}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}