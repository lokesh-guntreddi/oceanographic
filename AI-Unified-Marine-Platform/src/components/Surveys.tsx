import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Layout } from "./Layout";
import { AspectRatio } from "./ui/aspect-ratio";
import { RouteName } from "../routes-maps";


interface SurveyProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}
export default function Surveys({ user, onNavigate, onLogout, language }: SurveyProps) {

  return (
    <Layout
      user={user}
      currentPage="surveys"
      onNavigate={onNavigate}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-8">

       <div className="relative w-full h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden rounded-xl">

  {/* Background Image with Animation */}
  <img
    src="https://www.cmlre.gov.in/sites/default/files/sagarsampada.jpeg"
    alt="FORV Sagar Sampada"
    className="
      absolute inset-0 w-full h-full object-cover
      scale-110 animate-heroZoom
    "
  />

  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

  {/* Text Content */}
  <div className="
    absolute inset-0 flex flex-col items-center justify-center 
    text-center px-6
    animate-fadeInUp
  ">
    <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
      Indian Ocean Surveys
    </h1>

    <p className="text-lg md:text-2xl mt-4 text-gray-200 max-w-3xl drop-shadow-lg">
      Comprehensive Research Across the Arabian Sea, Bay of Bengal & Indian Ocean
    </p>
  </div>
</div>


        {/* Survey blocks */}
        <div className="space-y-6">

          {/* 1. Sagar Sampada Survey */}
          <Card>
            <CardHeader>
              <CardTitle>FORV Sagar Sampada (CMLRE MLR Cruises)</CardTitle>
              <CardDescription>1984 – Present · Arabian Sea · Bay of Bengal · Southern Ocean</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <p><strong>Objective:</strong> Multi-disciplinary fishery & oceanography (nutrients, plankton, acoustics)</p>
              
              <p>
                <strong>Key Insights:</strong> Completed 343 cruises collecting CTD profiles, nutrient analyses and plankton/fish samples.  
                IndOBIS archives ~110,000 occurrence records; several new deep-sea taxa discovered.
              </p>

              <p>
                <strong>Research Value:</strong> Long-term baselines for physical & biogeochemical fields, stock assessments (MSY),  
                and climate/ecosystem modelling.
              </p>

              <Button 
                variant="outline"
                onClick={() => window.open("https://www.cmlre.gov.in/data-center")}
              >
                Open Dataset
              </Button>
            </CardContent>
          </Card>

          {/* 2. Argo Float */}
          <Card>
            <CardHeader>
              <CardTitle>Argo Float Program (INCOIS)</CardTitle>
              <CardDescription>2002 – Present · Indian Ocean</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p><strong>Objective:</strong> Autonomous profiling of temperature & salinity (0–2000 m)</p>
              <p><strong>Insights:</strong> Synoptic heat & salinity datasets used in GODAS & monsoon models.</p>
              <p><strong>Value:</strong> Critical for climate state, heat budgets, model assimilation.</p>

              <Button variant="outline">
                NOAA Argo Data
              </Button>
            </CardContent>
          </Card>

          {/* 3. OMNI Moorings */}
          <Card>
            <CardHeader>
              <CardTitle>OMNI Mooring Array (NIOT/INCOIS)</CardTitle>
              <CardDescription>2012 – Present · Bay of Bengal & Arabian Sea</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p><strong>Objective:</strong> Real-time T/S, currents, meteorology</p>
              <p><strong>Insights:</strong> 12 buoys give high-frequency upper-ocean dynamics.</p>
              <p><strong>Value:</strong> Improves monsoon/ocean forecasts and ecosystem response modelling.</p>
            </CardContent>
          </Card>

          {/* ADD MORE survey cards... */}
        </div>
      </div>
    </Layout>
  );
}
