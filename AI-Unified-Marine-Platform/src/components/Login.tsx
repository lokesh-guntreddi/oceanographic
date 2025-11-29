import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

import { ArrowLeft, Mail, Lock, Shield, Users, BarChart3, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../utils/translations';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from "sonner";
import { navigateTo, RouteName } from "../routes-maps";
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface LoginProps {
  onLogin: (user: any) => void;
  onNavigate: (page: RouteName) => void;
  language: 'en' | 'ml';
}

type UserRole = 'researcher' | 'policymaker' | 'conservationist' | 'admin';

export function Login({ onLogin, onNavigate, language }: LoginProps) {
  const t = useTranslation(language);
  const [step, setStep] = useState<'role' | 'credentials'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole>('researcher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordless, setIsPasswordless] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: 'researcher' as UserRole,
      title: t('researcher_title'),
      description: t('researcher_desc'),
      icon: BarChart3,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'policymaker' as UserRole,
      title: t('policymaker_title'),
      description: t('policymaker_desc'),
      icon: FileText,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'conservationist' as UserRole,
      title: t('conservationist_title'),
      description: t('conservationist_desc'),
      icon: Shield,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'admin' as UserRole,
      title: 'Administrator',
      description: 'System administration and user management',
      icon: Users,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('credentials');
  };

  const handleLogin = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!isPasswordless && !password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      // Direct authentication - simplified for government portal
      // Accept any email for demonstration purposes
      
      const user = {
        id: 'user-' + Date.now(),
        email: email,
        role: selectedRole
      };
      
      onLogin(user);
      toast.success('Login successful! Welcome to CMLRE Marine Data Platform');
      onNavigate('researcher'); // Redirect to a default dashboard after login
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('select_role')}</h2>
        <p className="text-gray-600">Choose your role to continue</p>
      </div>
      
      <div className="grid gap-4">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <Card 
              key={role.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${role.color} ${
                selectedRole === role.id ? 'ring-2 ring-[#003366]' : ''
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardContent className="flex items-center space-x-4 p-4">
                <div className="p-2 rounded-lg bg-white">
                  <IconComponent className={`h-6 w-6 ${role.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('login')}</h2>
        <p className="text-gray-600">
          Logging in as {roles.find(r => r.id === selectedRole)?.title}
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          variant={!isPasswordless ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPasswordless(false)}
        >
          <Lock className="h-4 w-4 mr-2" />
          Password
        </Button>
        <Button
          variant={isPasswordless ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPasswordless(true)}
        >
          <Mail className="h-4 w-4 mr-2" />
          {t('passwordless_login')}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="mt-1"
          />
        </div>

        {!isPasswordless && (
          <div>
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
            />
          </div>
        )}

        <Button 
          onClick={handleLogin}
          disabled={loading || !email || (!isPasswordless && !password)}
          className="w-full bg-[#003366] hover:bg-[#004080]"
        >
          {loading ? 'Logging in...' : t('login')}
        </Button>
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep('role')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Change Role
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739460677746-7aec1b70a3f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBnb3Zlcm5tZW50JTIwZW1ibGVtfGVufDF8fHx8MTc1ODM3NDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Government of India Emblem"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold">{t('cmlre')}</h1>
                <p className="text-sm text-blue-100">{t('marine_data_backbone')}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700"
              onClick={() => onNavigate('landing')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Panel - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center relative">
          <div className="absolute inset-0 bg-black/20" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1611232473412-a1be94fe5835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYXJpbmUlMjBmaXNoJTIwc3BlY2llcyUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzU4Mzc0NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Marine Life"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 text-center text-white px-8">
            <h3 className="text-3xl font-bold mb-4">Welcome to CMLRE backbone</h3>
            <p className="text-lg opacity-90">
              Secure access to India's marine data infrastructure
            </p>
            <Badge variant="secondary" className="mt-4 bg-white/20 text-white">
              Government Platform
            </Badge>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-[#003366]" />
              </div>
            </CardHeader>
            <CardContent>
              {/* Demo Banner */}
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-blue-800 font-medium">Quick Access</p>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Use any email to access the platform
                </p>
              </div>
              
              {step === 'role' && renderRoleSelection()}
              {step === 'credentials' && renderCredentials()}
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  );
}