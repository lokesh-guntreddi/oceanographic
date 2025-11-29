import React, { useState, useRef } from 'react';
import { Layout } from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Camera, 
  Upload, 
  Image as ImageIcon, 
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Download,
  Eye,
  Ruler,
  Database,
  Target,
  Brain,
  Info
} from 'lucide-react';
import { useTranslation } from '../utils/translations';
import { toast } from "sonner";
import { RouteName } from "../routes-maps";
interface FishImageIdentificationProps {
  user: any;
  onNavigate: (page: RouteName) => void;
  onLogout: () => void;
  language: 'en' | 'ml';
}

export function FishImageIdentification({ user, onNavigate, onLogout, language }: FishImageIdentificationProps) {
  const t = useTranslation(language);
 
const [uploadedImage, setUploadedImage] = useState<string | null>(null);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [analysisResults, setAnalysisResults] = useState<any>(null);
const fileInputRef = useRef<HTMLInputElement>(null);


  // Mock analysis results
  // const mockResults = {
  //   species: "Rastrelliger kanagurta",
  //   commonName: "Indian Mackerel",
  //   confidence: 94.7,
  //   family: "Scombridae",
  //   habitat: "Pelagic, Coastal Waters",
  //   characteristics: [
  //     "Streamlined body with metallic blue-green back",
  //     "Silver sides with dark wavy lines",
  //     "Deeply forked tail fin",
  //     "Small mouth with sharp teeth"
  //   ],
  //   measurements: {
  //     estimatedLength: "18.5 cm",
  //     estimatedWeight: "125 g",
  //     bodyDepth: "4.2 cm"
  //   },
  //   distribution: "Indo-Pacific: Red Sea and East Africa to Samoa",
  //   conservationStatus: "Least Concern (LC)",
  //   commercialValue: "High - Important commercial species",
  //   similarSpecies: [
  //     { name: "Chub Mackerel", confidence: 15.2 },
  //     { name: "Spanish Mackerel", confidence: 8.7 },
  //     { name: "King Mackerel", confidence: 3.4 }
  //   ]
  // };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please select a valid image file");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    toast.error("Image size should be less than 10MB");
    return;
  }

  setSelectedFile(file);

  const reader = new FileReader();
  reader.onload = (e) => {
    setUploadedImage(e.target?.result as string);
    setAnalysisResults(null);
  };
  reader.readAsDataURL(file);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


 const analyzeImage = async () => {
  if (!selectedFile) {
    toast.error("Please upload an image first");
    return;
  }

  setIsAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await fetch("http://localhost:5000/api/fish/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("📥 Backend response:", data);

    if (!data.success) {
      toast.error("Backend error: " + (data.error || "Unknown error"));
      setIsAnalyzing(false);
      return;
    }

    setAnalysisResults(data.analysis);
    toast.success("Image analysis completed!");
  } catch (err) {
    console.error("❌ React Fetch Error:", err);
    toast.error("Something went wrong while analyzing the image");
  }

  setIsAnalyzing(false);
};


    // const data = await res.json();

//     if (data.success) {
//       setAnalysisResults(data.analysis); // JSON structured results
//       toast.success("Image analysis completed successfully!");
//     } else {
//       toast.error("AI could not identify this fish");
//     }

//   } catch (err) {
//     console.error(err);
//     toast.error("Something went wrong while analyzing the image");
//   }

//   setIsAnalyzing(false);
// };
const exportPDF = async () => {
  if (!analysisResults) {
    toast.error("No analysis to export");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/fish/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analysis: analysisResults })
    });

    const data = await res.json();

    if (data.success) {
      window.open(`http://localhost:5000${data.url}`, "_blank");
      toast.success("PDF Exported Successfully!");
    } else {
      toast.error("Failed to export PDF");
    }

  } catch (error) {
    toast.error("Something went wrong generating PDF");
  }
};


  const clearImage = () => {
    setUploadedImage(null);
    setAnalysisResults(null);
  };

  return (
    <Layout
      user={user}
      currentPage="fishImageIdentification"
      onNavigate={onNavigate}
      onLogout={onLogout}
      language={language}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('exploreFeatures')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Features
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Camera className="h-8 w-8 mr-3 text-[#003366]" />
                Fish Image Identification
              </h1>
              <p className="text-gray-600 mt-1">
                AI-powered species identification from photographs
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Brain className="h-4 w-4 mr-2" />
            Computer Vision AI
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-[#003366]" />
                Image Upload & Analysis
              </CardTitle>
              <CardDescription>Upload a fish image for AI-powered species identification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="space-y-4">
                {!uploadedImage ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#003366] hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Fish Image</h3>
                    <p className="text-gray-600 mb-4">
                      Click to select or drag and drop your fish image here
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded fish" 
                        className="w-full max-h-80 object-contain rounded-lg border"
                      />
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={clearImage}
                      >
                        Clear
                      </Button>
                    </div>
                    
                    {!analysisResults && (
                      <Button 
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="w-full bg-[#003366] hover:bg-[#004080]"
                      >
                        {isAnalyzing ? (
                          <>
                            <Zap className="h-4 w-4 mr-2 animate-pulse" />
                            Analyzing Image...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Analyze with AI
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-blue-600 animate-pulse" />
                        <span className="text-sm font-medium text-blue-800">AI Analysis in Progress</span>
                      </div>
                      <Progress value={66} className="h-2" />
                      <div className="text-xs text-blue-700 space-y-1">
                        <div>✓ Image preprocessing completed</div>
                        <div>✓ Feature extraction in progress...</div>
                        <div>⏳ Species classification running...</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Upload Guidelines */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Best Results Tips
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use clear, well-lit images</li>
                      <li>• Show the full fish from the side</li>
                      <li>• Avoid blurry or low-resolution photos</li>
                      <li>• Ensure fish fills most of the frame</li>
                      <li>• Support formats: JPG, PNG, TIFF</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-[#003366]" />
                Identification Results
              </CardTitle>
              <CardDescription>AI analysis results and species information</CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResults ? (
                <div className="text-center py-12">
                  <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Yet</h3>
                  <p className="text-gray-600">Upload and analyze a fish image to see identification results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Primary Identification */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">Species Identified</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{analysisResults.commonName}</h3>
                        <p className="text-sm text-gray-600 italic">{analysisResults.species}</p>
                        <p className="text-sm text-gray-600">Family: {analysisResults.family}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{analysisResults.confidence}%</div>
                        <div className="text-xs text-green-700">Confidence</div>
                      </div>
                    </div>
                  </div>

                  {/* Measurements */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Ruler className="h-4 w-4 mr-2" />
                      Estimated Measurements
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-800">{analysisResults.measurements.estimatedLength}</div>
                        <div className="text-xs text-blue-600">Length</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-800">{analysisResults.measurements.estimatedWeight}</div>
                        <div className="text-xs text-purple-600">Weight</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="font-bold text-orange-800">{analysisResults.measurements.bodyDepth}</div>
                        <div className="text-xs text-orange-600">Body Depth</div>
                      </div>
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Key Characteristics</h4>
                    <ul className="space-y-2">
                      {analysisResults.characteristics.map((char: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#003366] mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">Habitat</div>
                      <div className="text-sm text-gray-700">{analysisResults.habitat}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">Conservation Status</div>
                      <div className="text-sm text-gray-700">{analysisResults.conservationStatus}</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900 mb-1">Commercial Value</div>
                      <div className="text-sm text-gray-700">{analysisResults.commercialValue}</div>
                    </div>
                  </div>

                  {/* Similar Species */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Similar Species Considered</h4>
                    <div className="space-y-2">
                      {analysisResults.similarSpecies.map((species: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{species.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {species.confidence}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
  variant="outline"
  className="flex-1"
  onClick={exportPDF}
>
  <Download className="h-4 w-4 mr-2" />
  Export Report
</Button>

                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View in Database
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Model Information */}
        <Card className="bg-gradient-to-r from-[#003366] to-[#004080] text-white">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Brain className="h-8 w-8 text-blue-200 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Advanced Computer Vision Model</h3>
                <p className="text-blue-100 mb-4">
                  Our fish identification system uses a deep convolutional neural network trained on over 100,000 
                  fish images from Indian marine waters. The model achieves 94.7% accuracy across 500+ species.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-200">Model Architecture</div>
                    <div>ResNet-152 + Attention</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-200">Training Dataset</div>
                    <div>100K+ Labeled Images</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-200">Species Coverage</div>
                    <div>500+ Marine Species</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}