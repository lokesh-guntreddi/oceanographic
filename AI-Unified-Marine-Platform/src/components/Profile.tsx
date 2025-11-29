import React, { useState } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  User,
  Mail,
  Calendar,
  MapPin,
  Award,
  BarChart3,
  FileText,
  Download,
  Edit,
  Camera,
  Star,
  TrendingUp,
  Database,
  Image as ImageIcon,
  Dna
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RouteName, navigateTo } from '../routes-maps';
interface ProfileProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function Profile({ user, onNavigate, onLogout, language }: ProfileProps) {
  const t = useTranslation(language);
  const [isEditing, setIsEditing] = useState(false);

  const profileStats = [
    {
      label: 'Datasets Created',
      value: '47',
      icon: Database,
      color: 'text-blue-600'
    },
    {
      label: 'Analysis Jobs',
      value: '156',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      label: 'Reports Generated',
      value: '23',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      label: 'Species Identified',
      value: '342',
      icon: Dna,
      color: 'text-orange-600'
    }
  ];

  const achievements = [
    {
      id: 'first_analysis',
      title: 'First Analysis',
      description: 'Completed your first data analysis',
      icon: BarChart3,
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 'data_explorer',
      title: 'Data Explorer',
      description: 'Used 5 different datasets',
      icon: Database,
      earned: true,
      date: '2024-02-20'
    },
    {
      id: 'report_master',
      title: 'Report Master',
      description: 'Generated 10 research reports',
      icon: FileText,
      earned: true,
      date: '2024-03-10'
    },
    {
      id: 'species_hunter',
      title: 'Species Hunter',
      description: 'Identified 100+ unique species',
      icon: Star,
      earned: true,
      date: '2024-04-05'
    },
    {
      id: 'otolith_expert',
      title: 'Otolith Expert',
      description: 'Analyzed 500+ otolith images',
      icon: ImageIcon,
      earned: false,
      date: null
    },
    {
      id: 'edna_specialist',
      title: 'eDNA Specialist',
      description: 'Processed 1000+ eDNA sequences',
      icon: Dna,
      earned: false,
      date: null
    }
  ];

  const recentActivity = [
    {
      type: 'analysis',
      title: 'Completed biodiversity analysis for Arabian Sea dataset',
      date: '2024-12-20 15:30',
      icon: BarChart3
    },
    {
      type: 'upload',
      title: 'Uploaded new otolith image collection',
      date: '2024-12-19 11:20',
      icon: ImageIcon
    },
    {
      type: 'report',
      title: 'Generated species distribution report',
      date: '2024-12-18 09:45',
      icon: FileText
    },
    {
      type: 'edna',
      title: 'Processed eDNA sample from Bay of Bengal',
      date: '2024-12-17 14:15',
      icon: Dna
    },
    {
      type: 'analysis',
      title: 'Started correlation analysis on coastal data',
      date: '2024-12-16 16:00',
      icon: BarChart3
    }
  ];

  const researchInterests = [
    'Marine Biodiversity',
    'Fish Population Dynamics',
    'eDNA Metabarcoding',
    'Otolith Morphometry',
    'Ecosystem Modeling',
    'Conservation Biology'
  ];

  const collaborations = [
    {
      name: 'Dr. Sarah Marine',
      institution: 'National Institute of Oceanography',
      projects: 3,
      status: 'Active'
    },
    {
      name: 'Prof. Ocean Research',
      institution: 'Indian Institute of Science',
      projects: 1,
      status: 'Completed'
    },
    {
      name: 'Marine Lab Team',
      institution: 'CMLRE Research Group',
      projects: 5,
      status: 'Active'
    }
  ];

  return (
    <Layout
      user={user}
      currentPage="profile"
      onNavigate={onNavigate as any}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('profile')}</h1>
            <p className="text-gray-600 mt-1">
              Manage your profile and view your research activity
            </p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            <Button size="sm" className="bg-[#003366] hover:bg-[#004080]">
              <Download className="h-4 w-4 mr-2" />
              Export CV
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-[#003366] rounded-full flex items-center justify-center mx-auto">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full p-2 h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <Input defaultValue="Dr. Marine Researcher" />
                    <Input defaultValue="Senior Research Scientist" />
                    <Textarea 
                      defaultValue="Marine biologist specializing in fish population dynamics and ecosystem modeling."
                      rows={3}
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold">Dr. Marine Researcher</h2>
                    <p className="text-gray-600">Senior Research Scientist</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Marine biologist specializing in fish population dynamics and ecosystem modeling.
                    </p>
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>Kochi, Kerala, India</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Joined January 2024</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#003366]">A+</div>
                      <div className="text-xs text-gray-600">Research Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#003366]">98%</div>
                      <div className="text-xs text-gray-600">Profile Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profileStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <IconComponent className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Tabs defaultValue="activity" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              </TabsList>

              {/* Recent Activity */}
              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-[#003366]" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => {
                        const IconComponent = activity.icon;
                        return (
                          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <IconComponent className="h-4 w-4 text-[#003366]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements */}
              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-[#003366]" />
                      Achievements & Badges
                    </CardTitle>
                    <CardDescription>
                      Track your progress and unlock achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => {
                        const IconComponent = achievement.icon;
                        return (
                          <div 
                            key={achievement.id} 
                            className={`p-4 rounded-lg border ${
                              achievement.earned 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                achievement.earned 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                {achievement.earned && achievement.date && (
                                  <p className="text-xs text-green-600 mt-1">
                                    Earned on {achievement.date}
                                  </p>
                                )}
                              </div>
                              {achievement.earned && (
                                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Research Interests */}
              <TabsContent value="research" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Research Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-3">
                        <Label>Research Interests (comma-separated)</Label>
                        <Textarea 
                          defaultValue={researchInterests.join(', ')}
                          rows={3}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {researchInterests.map((interest, index) => (
                          <Badge key={index} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Research Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#003366]">15</div>
                        <div className="text-sm text-gray-600">Publications</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#003366]">342</div>
                        <div className="text-sm text-gray-600">Citations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#003366]">8.7</div>
                        <div className="text-sm text-gray-600">H-Index</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Research Profile Completion</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Collaborations */}
              <TabsContent value="collaboration" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Collaborations</CardTitle>
                    <CardDescription>
                      Research partnerships and team projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {collaborations.map((collab, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">{collab.name}</h4>
                              <p className="text-sm text-gray-600">{collab.institution}</p>
                              <p className="text-xs text-gray-500">{collab.projects} projects</p>
                            </div>
                          </div>
                          <Badge 
                            variant={collab.status === 'Active' ? 'default' : 'secondary'}
                            className={collab.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {collab.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#003366] hover:bg-[#004080]"
              onClick={() => setIsEditing(false)}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}