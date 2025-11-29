import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { RouteName, ROUTES, navigateTo } from "./routes-maps";

import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { ResearcherDashboard } from "./components/ResearcherDashboard";
import { PolicymakerDashboard } from "./components/PolicymakerDashboard";
import { ConservationistDashboard } from "./components/ConservationistDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { DataExplorer } from "./components/DataExplorer";
import { UnifiedAnalytics } from "./components/UnifiedAnalytics";
import { Reports } from "./components/Reports";
import { OtolithViewer } from "./components/OtolithViewer";
import { EdnaLab } from "./components/EdnaLab";
import { Settings } from "./components/Settings";
import { Profile } from "./components/Profile";
import { AIQuery } from "./components/AIQuery";
import { ExploreFeatures } from "./components/ExploreFeatures";
import { EnvironmentalFishPrediction } from "./components/EnvironmentalFishPrediction";
import { FishImageIdentification } from "./components/FishImageIdentification";
import { OtolithImageComparison } from "./components/OtolithImageComparison";
import { PolicyTools } from "./components/PolicyTools";
import { ConservationTools } from "./components/ConservationTools";
import { MarineCrimeDetection } from "./components/MarineCrimeDetection";
import { MarineAI } from "./components/MarineAI";
import { MLPredictions } from "./components/MLPredictions";
import { ReportGenerator } from "./components/ReportGenerator";
import { DigitalTwin } from "./components/DigitalTwin";
import { DynamicAnalytics } from "./components/DynamicAnalytics";
import  MarineMap  from "./components/MarineMap";
import { DataUpload } from "./components/DataUpload";
import Surveys from "./components/Surveys";

// ---------- TYPES ----------
interface User {
  id: string;
  email: string;
  role: "researcher" | "policymaker" | "conservationist" | "admin";
}

interface AppRoutesProps {
  // The user prop can be User or null (correct)
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  language: "en" | "ml";
}

// ---------- ROUTES ----------
export const AppRoutes: React.FC<AppRoutesProps> = ({
  user,
  onLogin,
  onLogout,
  language
}) => {

const navigate = useNavigate();

  // new safe navigation helper
  const go = (route: RouteName) => navigateTo(navigate, route);

  return (
    <Routes>

      {/* PUBLIC ROUTES (Landing and Login remain public) */}
      <Route path={ROUTES.landing} element={<Landing language={language} onNavigate={go} />} />
      <Route path={ROUTES.login} element={<Login onLogin={onLogin} onNavigate={go} language={language} />} />

      {/* DASHBOARDS - NOW PUBLIC (Removed role checks and Navigate redirects) */}
      <Route
        path={ROUTES.researcher}
        element={
          <ResearcherDashboard user={user} onLogout={onLogout} onNavigate={go} language={language} />
        }
      />

      <Route
        path={ROUTES.policymaker}
        element={
          <PolicymakerDashboard user={user} onLogout={onLogout} onNavigate={go} language={language} />
        }
      />

      <Route
        path={ROUTES.conservationist}
        element={
          <ConservationistDashboard user={user} onLogout={onLogout} onNavigate={go} language={language} />
        }
      />

      <Route
        path={ROUTES.admin}
        element={
          <AdminDashboard user={user} onLogout={onLogout} onNavigate={go} language={language} />
        }
      />

      {/* CORE TOOLS - NOW PUBLIC (Removed 'user ? ... : <Navigate>' checks) */}
      <Route path={ROUTES.dataExplorer} element={
        <DataExplorer user={user} onNavigate={go} onLogout={onLogout} language={language} />
      } />

      <Route path={ROUTES.analytics} element={
        <UnifiedAnalytics user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.reports} element={
        <Reports user={user} onNavigate={go} onLogout={onLogout} language={language} />
      } />

      <Route path={ROUTES.otolithViewer} element={
        <OtolithViewer user={user} onNavigate={go} onLogout={onLogout} language={language} />
      } />

      <Route path={ROUTES.ednaLab} element={
        <EdnaLab user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.settings} element={
        <Settings user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.profile} element={
        <Profile user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      {/* AI TOOLS - NOW PUBLIC */}
      <Route path={ROUTES.aiQuery} element={
        <AIQuery user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.exploreFeatures} element={
        <ExploreFeatures user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.environmentalFishPrediction} element={
        <EnvironmentalFishPrediction user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.fishImageIdentification} element={
        <FishImageIdentification user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.otolithImageComparison} element={
        <OtolithImageComparison user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      {/* ROLE-SPECIFIC TOOLS - NOW PUBLIC (Removed role checks and Navigate redirects) */}
      <Route path={ROUTES.policyTools} element={
        <PolicyTools user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.conservationTools} element={
        <ConservationTools user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      {/* ADVANCED TOOLS - NOW PUBLIC */}
      <Route path={ROUTES.marineCrimeDetection} element={
        <MarineCrimeDetection user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.digitalTwin} element={
        <DigitalTwin user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.dynamicAnalytics} element={
        <DynamicAnalytics user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.marineMap} element={
        <MarineMap user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.dataUpload} element={
        // NOTE: Keeping the required 'currentPage' prop for DataUpload as per your original file structure
        <DataUpload currentPage='dataUpload' user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.mlPredictions} element={
        <MLPredictions user={user} onNavigate={go} onLogout={onLogout} language={language}/>
      } />

      <Route path={ROUTES.reportGenerator} element={
        // NOTE: The MarineAI and ReportGenerator components don't seem to pass onLogout/onNavigate in your original code
        <ReportGenerator user={user ? 'Known' : null}/>
      } />

      {/* MARINE AI PAGE - NOW PUBLIC */}
      <Route path={ROUTES.marineAI} element={
        <MarineAI user={user}/>
      } />

      {/* FALLBACK (sends unhandled routes to landing page) */}
      <Route path="*" element={<Navigate to={ROUTES.landing}/>}/>
      {/* SURVEYS , SPE , oto ,*/}
            <Route path="/surveys"
              element={<Surveys user={user} onLogout={onLogout} language={language} onNavigate={go} />}
            />
    </Routes>
  );
};