import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Landing } from './components/Landing';
import { Login } from './components/Login';

import { ResearcherDashboard } from './components/ResearcherDashboard';
import { PolicymakerDashboard } from './components/PolicymakerDashboard';
import { ConservationistDashboard } from './components/ConservationistDashboard';
import { AdminDashboard } from './components/AdminDashboard';

import { DataExplorer } from './components/DataExplorer';
import { UnifiedAnalytics } from './components/UnifiedAnalytics';
import { Reports } from './components/Reports';
import { OtolithViewer } from './components/OtolithViewer';
import { EdnaLab } from './components/EdnaLab';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { AIQuery } from './components/AIQuery';
import { ExploreFeatures } from './components/ExploreFeatures';
import { EnvironmentalFishPrediction } from './components/EnvironmentalFishPrediction';
import { FishImageIdentification } from './components/FishImageIdentification';
import { OtolithImageComparison } from './components/OtolithImageComparison';
import { PolicyTools } from './components/PolicyTools';
import { ConservationTools } from './components/ConservationTools';
import { MarineCrimeDetection } from './components/MarineCrimeDetection';
import { MarineAI } from './components/MarineAI';
import { MLPredictions } from './components/MLPredictions';
import { ReportGenerator } from './components/ReportGenerator';
import { DigitalTwin } from './components/DigitalTwin';
import { DynamicAnalytics } from './components/DynamicAnalytics';
import  MarineMap  from './components/MarineMap';
import { DataUpload } from './components/DataUpload';

import { RouteName } from "./routes-maps";
import Surveys from './components/Surveys';

interface User {
  id: string;
  email: string;
  role: 'researcher' | 'policymaker' | 'conservationist' | 'admin';
}

interface AppRoutesProps {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onNavigate: (route: RouteName) => void;
  language: 'en' | 'ml';
}

export function AppRoutes({
  user,
  onLogin,
  onLogout,
  onNavigate,
  language
}: AppRoutesProps) {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={<Landing language={language} onNavigate={onNavigate} />}
      />

      <Route
        path="/login"
        element={<Login onLogin={onLogin} language={language} onNavigate={onNavigate} />}
      />

      {/* DASHBOARDS */}
      <Route path="/researcher-dashboard"
        element={<ResearcherDashboard user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/policymaker-dashboard"
        element={<PolicymakerDashboard user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/conservationist-dashboard"
        element={<ConservationistDashboard user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/admin-dashboard"
        element={<AdminDashboard user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      {/* CORE TOOLS */}
      <Route path="/data-explorer"
        element={<DataExplorer user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/analytics"
        element={<UnifiedAnalytics user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/reports"
        element={<Reports user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/otolith-viewer"
        element={<OtolithViewer user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/edna-lab"
        element={<EdnaLab user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/settings"
        element={<Settings user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/profile"
        element={<Profile user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      {/* AI TOOLS */}
      <Route path="/ai-query"
        element={<AIQuery user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/explore-features"
        element={<ExploreFeatures user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/environmental-fish-prediction"
        element={<EnvironmentalFishPrediction user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/fish-image-identification"
        element={<FishImageIdentification user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/otolith-image-comparison"
        element={<OtolithImageComparison user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      {/* ROLE-SPECIFIC */}
      <Route path="/policy-tools"
        element={<PolicyTools user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/conservation-tools"
        element={<ConservationTools user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/marine-crime-detection"
        element={<MarineCrimeDetection user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      {/* ADVANCED TOOLS */}
      <Route path="/digital-twin"
        element={<DigitalTwin user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/dynamic-analytics"
        element={<DynamicAnalytics user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/marine-map"
        element={<MarineMap user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/data-upload"
        element={<DataUpload user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} currentPage="dataUpload" />}
      />

      <Route path="/marine-ai"
        element={<MarineAI user={user} onNavigate={(page: string) => onNavigate(page as RouteName)} currentPage="marineAi" />}
      />

      <Route path="/ml-predictions"
        element={<MLPredictions user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />

      <Route path="/report-generator"
        element={<ReportGenerator user={user ? 'Known' : null} />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* SURVEYS , SPE , oto ,*/}
      <Route path="/surveys"
        element={<Surveys user={user} onLogout={onLogout} language={language} onNavigate={onNavigate} />}
      />
    </Routes>
  );
}
