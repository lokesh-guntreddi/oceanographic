import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Globe2,
  Users,
  BarChart3,
  FileText,
  Shield,
  ExternalLink,
  Menu,
  Languages,
  Brain,
  Database,
  Activity,
  LogIn,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "../utils/translations";
import { RouteName } from "../routes-maps";
interface LandingProps {
  onNavigate: (page: RouteName) => void;
  language: "en" | "ml";
}
export function Landing({
  onNavigate,
  language,
}: LandingProps) {
  const t = useTranslation(language);

  const roleCards = [
    {
      id: "researcher",
      title: t("researcher_title"),
      description: t("researcher_desc"),
      icon: BarChart3,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: "policymaker",
      title: t("policymaker_title"),
      description: t("policymaker_desc"),
      icon: FileText,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
      iconColor: "text-green-600",
    },
    {
      id: "conservationist",
      title: t("conservationist_title"),
      description: t("conservationist_desc"),
      icon: Shield,
      color:
        "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      iconColor: "text-emerald-600",
    },
  ];

  const statsData = [
    { label: "Total Surveys", value: "1,247", change: "+12%" },
    {
      label: "Species Catalogued",
      value: "8,943",
      change: "+8%",
    },
    { label: "eDNA Samples", value: "3,156", change: "+24%" },
    { label: "Research Papers", value: "234", change: "+6%" },
  ];

  const handleLoginClick = () => {
    console.log(
      "Login button clicked, navigating to login page",
    );
    onNavigate("login");
  };

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
                <h1 className="text-xl font-semibold">
                  CMLRE backbone
                </h1>
                <p className="text-sm text-blue-100">
                  Marine Data Backbone for Smart India
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700"
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === "en" ? "English" : "മലയാളം"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-black hover:bg-white hover:text-[#003366] font-medium px-6 py-2"
                onClick={handleLoginClick}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t("login")} / Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Prominent Login */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Text Content Section */}
          <div className="text-center lg:text-left mb-16">
            <Badge variant="secondary" className="mb-4">
              {t("government_of_india")}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Driven Unified Data Platform for Ocean &
              Biodiversity Insights
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto lg:mx-0">
              Advanced AI-powered platform for oceanographic
              research, fisheries analysis, and molecular
              biodiversity insights.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Real-time Analysis
                    </h3>
                    <p className="text-sm text-blue-700">
                      Oceanographic data
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center space-x-3">
                  <Brain className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">
                      AI-Powered
                    </h3>
                    <p className="text-sm text-green-700">
                      Species identification
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-purple-50 border-purple-200">
                <div className="flex items-center space-x-3">
                  <Database className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-purple-900">
                      Comprehensive
                    </h3>
                    <p className="text-sm text-purple-700">
                      Biodiversity insights
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="lg"
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white shadow-lg px-8 py-3 text-lg font-semibold"
                onClick={handleLoginClick}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Get Started - Access Platform
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-3 text-lg"
              >
                Documentation
              </Button>
            </div>
          </div>

          {/* Image Section - Always on New Line */}
          <div className="relative max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581922819772-1cb6451adfc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmUlMjBkYXRhJTIwcmVzZWFyY2glMjBvY2VhbnxlbnwxfHx8fDE3NTgzNzQ1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Marine Research"
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">
                  Indian Ocean Research Initiative
                </p>
                <p className="text-xs opacity-90">
                  Advancing Marine Conservation
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t("select_role")}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your role to access tailored tools and
              insights for marine data analysis and decision
              making.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roleCards.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${role.color}`}
                  onClick={handleLoginClick}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-white shadow-sm">
                        <IconComponent
                          className={`h-8 w-8 ${role.iconColor}`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      {role.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 mb-4">
                      {role.description}
                    </CardDescription>
                    <Button
                      variant="outline"
                      className="w-full border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                      size="sm"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login as {role.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Data Snapshot */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t("latest_data")}
            </h3>
            <p className="text-lg text-gray-600">
              Real-time insights from our marine data collection
              network
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-[#003366] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {stat.label}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 text-green-800"
                  >
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#003366] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Explore Marine Data?
          </h3>
          <p className="text-lg text-blue-100 mb-6">
            Join researchers, policymakers, and conservationists
            in advancing marine science through data
            intelligence.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-black hover:bg-white hover:text-[#003366] px-8 py-3 text-lg"
            onClick={handleLoginClick}
          >
            <LogIn className="h-5 w-5 mr-2" />
            Access Platform Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("cmlre")}
              </h4>
              <p className="text-gray-300 text-sm">
                Central Marine Living Resources and Ecology
                Research Institute, advancing marine science
                through innovative data solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                Quick Links
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300 hover:text-white cursor-pointer">
                  {t("api_documentation")}
                </p>
                <p className="text-gray-300 hover:text-white cursor-pointer">
                  {t("privacy_policy")}
                </p>
                <p className="text-gray-300 hover:text-white cursor-pointer">
                  Terms of Service
                </p>
                <p className="text-gray-300 hover:text-white cursor-pointer">
                  Contact Support
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Kochi, Kerala, India</p>
                <p>Email: info@cmlre.gov.in</p>
                <p>Phone: +91-484-2394367</p>
              </div>
            </div>
          </div>

          <Separator className="mb-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              © 2025 CMLRE backbone, Ministry of Earth
              Sciences, Government of India. All rights
              reserved.
            </p>
            <p className="mt-2 md:mt-0">{t("powered_by")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}