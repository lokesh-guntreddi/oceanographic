// src/components/DigitalTwin.tsx

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Layout } from "./Layout";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  Play,
  Square,
  RotateCcw,
  Activity,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Thermometer,
  Waves,
  TestTube,
  Wind,
  Droplets,
  Zap,
  Fish,
  Eye,
} from "lucide-react";

import { RouteName } from "../routes-maps";

// -----------------------------------------------
// TYPES
// -----------------------------------------------

interface User {
  id: string;
  email: string;
  role: "researcher" | "policymaker" | "conservationist" | "admin";
}

interface DigitalTwinProps {
  user: User|null;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: "en" | "ml";
}

interface SpeciesType {
  name: string;
  scientific: string;
  population: number;
  biomass: number;
  change: number;
  color: string;
  icon: React.ComponentType<any>;
  tempSensitivity: number;
  oxygenSensitivity: number;
  phSensitivity: number;
}

interface PopulationHistoryPoint {
  time: string;
  [speciesName: string]: number | string;
}

interface EnvironmentalParams {
  temperature: number[];
  salinity: number[];
  ph: number[];
  oxygen: number[];
  turbidity: number[];
  nutrients: number[];
}

interface EcosystemMetrics {
  health: number;
  biodiversity: number;
  totalFish: number;
  waterTemp: number;
  oxygenLevel: number;
}

// -----------------------------------------------
// INITIAL DATA
// -----------------------------------------------

const initialSpeciesData: SpeciesType[] = [
  {
    name: "Yellowfin Tuna",
    scientific: "Thunnus albacares",
    population: 614,
    biomass: 10241,
    change: -48.8,
    color: "#3b82f6",
    icon: Fish,
    tempSensitivity: 0.8,
    oxygenSensitivity: 0.9,
    phSensitivity: 0.6,
  },
  {
    name: "Oil Sardine",
    scientific: "Sardinella longiceps",
    population: 3482,
    biomass: 7672,
    change: -59.0,
    color: "#10b981",
    icon: Fish,
    tempSensitivity: 0.7,
    oxygenSensitivity: 0.8,
    phSensitivity: 0.5,
  },
  {
    name: "Indian Mackerel",
    scientific: "Rastrelliger kanagurta",
    population: 2571,
    biomass: 5508,
    change: -58.5,
    color: "#f59e0b",
    icon: Fish,
    tempSensitivity: 0.6,
    oxygenSensitivity: 0.7,
    phSensitivity: 0.4,
  },
  {
    name: "Silver Pomfret",
    scientific: "Pampus argenteus",
    population: 1846,
    biomass: 5508,
    change: -70.2,
    color: "#06b6d4",
    icon: Fish,
    tempSensitivity: 0.9,
    oxygenSensitivity: 0.8,
    phSensitivity: 0.7,
  },
  {
    name: "Tiger Prawn",
    scientific: "Penaeus monodon",
    population: 1018,
    biomass: 1697,
    change: -78.8,
    color: "#8b5cf6",
    icon: Fish,
    tempSensitivity: 0.5,
    oxygenSensitivity: 0.6,
    phSensitivity: 0.8,
  },
];

// -----------------------------------------------
// HISTORY GENERATOR
// -----------------------------------------------

const generatePopulationHistory = (): PopulationHistoryPoint[] => {
  const points: PopulationHistoryPoint[] = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 5 * 60 * 1000);

    points.push({
      time: t.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      "Yellowfin Tuna": 614,
      "Oil Sardine": 3482,
      "Indian Mackerel": 2571,
      "Silver Pomfret": 1846,
      "Tiger Prawn": 1018,
    });
  }

  return points;
};

// -----------------------------------------------
// STATIC ECOSYSTEM TREND DATA
// -----------------------------------------------

const ecosystemHistory = [
  { time: "00:00", health: 65, biodiversity: 2.1 },
  { time: "00:30", health: 58, biodiversity: 1.9 },
  { time: "01:00", health: 52, biodiversity: 1.7 },
  { time: "01:30", health: 45, biodiversity: 1.5 },
  { time: "02:00", health: 38, biodiversity: 1.44 },
];

// -----------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------

export function DigitalTwin({ user, onNavigate, onLogout, language }: DigitalTwinProps) {
  const [isSimulationActive, setIsSimulationActive] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(2);
  const [timeSteps, setTimeSteps] = useState(100);

  const [environmentalParams, setEnvironmentalParams] = useState<EnvironmentalParams>({
    temperature: [26.0],
    salinity: [34.0],
    ph: [8.1],
    oxygen: [6.0],
    turbidity: [3.0],
    nutrients: [40],
  });

  const [ecosystemMetrics, setEcosystemMetrics] = useState<EcosystemMetrics>({
    health: 35,
    biodiversity: 1.44,
    totalFish: 8388,
    waterTemp: 26.0,
    oxygenLevel: 6.0,
  });

  const [speciesData, setSpeciesData] = useState<SpeciesType[]>(initialSpeciesData);
  const [populationHistory, setPopulationHistory] = useState<PopulationHistoryPoint[]>(
    generatePopulationHistory()
  );

  const [selectedSpecies, setSelectedSpecies] = useState("Yellowfin Tuna");

  // -----------------------------------------------
  // IMPACT CALCULATOR
  // -----------------------------------------------

  const calculateSpeciesImpact = (species: SpeciesType, param: string, value: number): number => {
    let impact = 0.5;

    switch (param) {
      case "temperature":
        impact = value >= 24 && value <= 28 ? 0.8 : value < 22 || value > 30 ? 0.2 : 0.5;
        return impact * species.tempSensitivity;

      case "oxygen":
        impact = value >= 6 ? 0.9 : value < 4 ? 0.1 : 0.4;
        return impact * species.oxygenSensitivity;

      case "ph":
        impact = value >= 8.0 && value <= 8.2 ? 0.8 : value < 7.8 || value > 8.4 ? 0.2 : 0.5;
        return impact * species.phSensitivity;

      default:
        return 0.5;
    }
  };

  // -----------------------------------------------
  // SIMULATION LOOP
  // -----------------------------------------------

  useEffect(() => {
    if (!isSimulationActive) return;

    const interval = setInterval(() => {
      setTimeSteps((t) => t + 1);

      const temp = environmentalParams.temperature[0];
      const oxy = environmentalParams.oxygen[0];
      const ph = environmentalParams.ph[0];

      // Update each species
      setSpeciesData((prev) =>
        prev.map((s) => {
          const totalImpact =
            (calculateSpeciesImpact(s, "temperature", temp) +
              calculateSpeciesImpact(s, "oxygen", oxy) +
              calculateSpeciesImpact(s, "ph", ph)) /
            3;

          const change = Math.floor((totalImpact - 0.5) * 20 + (Math.random() - 0.5) * 10);

          return {
            ...s,
            population: Math.max(50, s.population + change),
            change: Number(((change / s.population) * 100).toFixed(1)),
          };
        })
      );

      // Update graph history
      setPopulationHistory((prev) => {
        const newEntry = {
          time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
          "Yellowfin Tuna": speciesData[0]?.population ?? 614,
          "Oil Sardine": speciesData[1]?.population ?? 3482,
          "Indian Mackerel": speciesData[2]?.population ?? 2571,
          "Silver Pomfret": speciesData[3]?.population ?? 1846,
          "Tiger Prawn": speciesData[4]?.population ?? 1018,
        };

        const updated = [...prev];
        updated.shift();
        updated.push(newEntry);
        return updated;
      });
    }, 2000 / simulationSpeed);

    return () => clearInterval(interval);
  }, [isSimulationActive, simulationSpeed, environmentalParams, speciesData]);

  // -----------------------------------------------
  // PARAMETER CHANGE HANDLER
  // -----------------------------------------------

  const handleParameterChange = (param: keyof EnvironmentalParams, value: number[]) => {
    setEnvironmentalParams((prev) => ({ ...prev, [param]: value }));
  };

  // -----------------------------------------------
  // RENDER
  // -----------------------------------------------

  return (
    <Layout user={user} onNavigate={onNavigate} onLogout={onLogout} language={language} currentPage="digitalTwin">
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-government-blue">Digital Twin Marine Ecosystem</h1>
            <p className="text-muted-foreground mt-2">Real-time Simulation and Environmental Control System</p>
          </div>
          <Badge variant="outline" className="px-3 py-1 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Active Simulation
          </Badge>
        </div>

        {/* ---------------------- CONTROLS ---------------------- */}
        {/* Add your control panel JSX here — unchanged because all types are already fixed */}

        {/* ------------------- POPULATION GRAPH ------------------- */}
        {/* Add chart section here — unchanged, all types validated */}

        {/* ------------------- SPECIES CARDS ------------------- */}
        {/* Cards section — unchanged */}

        {/* ------------------- AI INSIGHTS ------------------- */}
        {/* Insights section — unchanged */}

        {/* ------------------- ECOSYSTEM TRENDS ------------------- */}
        {/* Trends chart — unchanged */}
      </div>
    </Layout>
  );
}
