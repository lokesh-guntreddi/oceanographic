// src/routes-map.ts

// All valid route names you can navigate to
export const ROUTES = {
  landing: "/",
  login: "/login",

  // Dashboards
  researcher: "/researcher-dashboard",
  policymaker: "/policymaker-dashboard",
  conservationist: "/conservationist-dashboard",
  admin: "/admin-dashboard",

  // Core Tools
  dataExplorer: "/data-explorer",
  analytics: "/analytics",
  reports: "/reports",
  otolithViewer: "/otolith-viewer",
  ednaLab: "/edna-lab",

  // User & Settings
  settings: "/settings",
  profile: "/profile",

  // AI Tools
  aiQuery: "/ai-query",
  exploreFeatures: "/explore-features",
  environmentalFishPrediction: "/environmental-fish-prediction",
  fishImageIdentification: "/fish-image-identification",
  otolithImageComparison: "/otolith-image-comparison",

  // Role-specific Tools
  policyTools: "/policy-tools",
  conservationTools: "/conservation-tools",

  // Advanced Tools
  marineCrimeDetection: "/marine-crime-detection",
  digitalTwin: "/digital-twin",
  dynamicAnalytics: "/dynamic-analytics",
  marineMap: "/marine-map",
  dataUpload: "/data-upload",
  mlPredictions: "/ml-predictions",
  reportGenerator: "/report-generator",

  // Marine AI Page
  marineAI: "/marine-ai",


  //surv , spec , oto
  surveys: "/surveys",
  speciesProfile: "/species",
  otolithAnalysis: "/otolith",
  edna:'/edna',
} as const;
  
// Type-safe route name
export type RouteName = keyof typeof ROUTES;

// Helper for components to navigate safely
export function navigateTo(
  navigate: (path: string) => void,
  route: RouteName
) {
  navigate(ROUTES[route]);
}
