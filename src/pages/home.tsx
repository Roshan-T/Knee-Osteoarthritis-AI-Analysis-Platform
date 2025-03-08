// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, ArrowRight, Activity } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ImageAnalysis } from '@/components/analysis/ImageAnalysis';
// import { useAdminStore } from '@/lib/store';
// import { FileSystem } from '@/lib/fileSystem';
// import toast from 'react-hot-toast';

// // Simulated analysis function
// const analyzeImage = async (file: File) => {
//   // Simulate processing delay
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   // Create heatmap overlay
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   const img = new Image();

//   await new Promise(resolve => {
//     img.onload = resolve;
//     img.src = URL.createObjectURL(file);
//   });

//   canvas.width = img.width;
//   canvas.height = img.height;
//   ctx?.drawImage(img, 0, 0);

//   // Add simulated heatmap effect
//   if (ctx) {
//     ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
//     ctx.fillRect(img.width * 0.3, img.height * 0.4, img.width * 0.2, img.height * 0.2);
//   }

//   return {
//     grade: 'Severe',
//     confidence: 92.5,
//     heatmapUrl: canvas.toDataURL(),
//     annotations: [
//       {
//         x: 0.4,
//         y: 0.5,
//         label: 'Joint Space Narrowing',
//         description: 'Significant reduction in joint space indicating severe cartilage loss'
//       },
//       {
//         x: 0.6,
//         y: 0.45,
//         label: 'Osteophytes',
//         description: 'Bone spurs visible at joint margins'
//       },
//       {
//         x: 0.5,
//         y: 0.7,
//         label: 'Subchondral Sclerosis',
//         description: 'Increased bone density beneath the cartilage'
//       }
//     ]
//   };
// };

// export function HomePage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [result, setResult] = useState<{
//     grade: string;
//     confidence: number;
//     heatmapUrl: string;
//     annotations: Array<{
//       x: number;
//       y: number;
//       label: string;
//       description: string;
//     }>;
//   } | null>(null);

//   const { addPendingImage } = useAdminStore();

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       'image/*': ['.jpg', '.jpeg', '.png']
//     },
//     maxFiles: 1,
//     onDrop: (acceptedFiles) => {
//       if (acceptedFiles.length > 0) {
//         setImage(acceptedFiles[0]);
//         toast.success('Image uploaded successfully!');
//       }
//     }
//   });

//   const handleAnalysis = async () => {
//     if (!image) return;

//     setAnalyzing(true);
//     try {
//       const analysis = await analyzeImage(image);
//       setResult(analysis);

//       // Save to pending images
//       const newImage = {
//         id: Math.random().toString(36).substr(2, 9),
//         file: image,
//         preview: URL.createObjectURL(image),
//         grade: analysis.grade,
//         confidence: analysis.confidence,
//         status: 'pending' as const,
//         uploadedBy: 'User',
//         uploadedAt: new Date().toISOString(),
//         annotations: analysis.annotations,
//         heatmapUrl: analysis.heatmapUrl
//       };

//       addPendingImage(newImage);
//       FileSystem.savePending(newImage);

//     } catch (error) {
//       toast.error('Analysis failed. Please try again.');
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
//       <div className="relative isolate">
//         <div
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//           aria-hidden="true"
//         >
//           <div
//             className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//           />
//         </div>

//         <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
//               AI-Powered Knee OA Analysis
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Upload your knee X-ray for instant analysis using our advanced AI model.
//               Get detailed severity assessment and personalized recommendations.
//             </p>
//           </motion.div>

//           <div className="mt-12 max-w-5xl mx-auto">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Upload X-Ray Image</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div
//                   {...getRootProps()}
//                   className={`
//                     relative border-2 border-dashed rounded-xl p-8 transition-colors
//                     ${isDragActive
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-300 hover:border-blue-400'
//                     }
//                   `}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-4 text-sm text-gray-600">
//                       Drag & drop your X-ray image here, or{' '}
//                       <span className="text-blue-600 font-medium">browse files</span>
//                     </p>
//                   </div>
//                 </div>

//                 {image && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                   >
//                     <Button
//                       onClick={handleAnalysis}
//                       disabled={analyzing}
//                       className="w-full py-6 text-lg"
//                     >
//                       {analyzing ? (
//                         <>
//                           <Activity className="mr-2 h-5 w-5 animate-spin" />
//                           Analyzing...
//                         </>
//                       ) : (
//                         <>
//                           Analyze X-Ray
//                           <ArrowRight className="ml-2 h-5 w-5" />
//                         </>
//                       )}
//                     </Button>
//                   </motion.div>
//                 )}

//                 <AnimatePresence>
//                   {result && image && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                     >
//                       <ImageAnalysis
//                         originalImage={URL.createObjectURL(image)}
//                         heatmapImage={result.heatmapUrl}
//                         grade={result.grade}
//                         confidence={result.confidence}
//                         annotations={result.annotations}
//                       />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ArrowRight, Activity } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageAnalysis } from "@/components/analysis/ImageAnalysis";
import { useAdminStore } from "@/lib/store";
import { FileSystem } from "@/lib/fileSystem";
import toast from "react-hot-toast";

// Backend API integration
const API_URL = "http://localhost:8000"; // Update this to your server address

// Real analysis function connecting to backend
const analyzeImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // Transform backend response to the format expected by frontend
    return {
      grade: data.prediction,
      confidence: data.confidence,
      heatmapUrl: `data:image/png;base64,${data.gradcam_image}`,
      // Create annotations based on class probabilities
      annotations: Object.entries(data.class_probabilities)
        .filter(([grade]) => grade !== data.prediction) // Don't include the predicted class in annotations
        .sort((a, b) => (b[1] as number) - (a[1] as number)) // Sort by probability
        .slice(0, 3) // Take top 3
        .map(([grade, probability], index) => {
          // Calculate positions for annotations (spread them out)
          const x = 0.3 + index * 0.2;
          const y = 0.4 + index * 0.1;

          return {
            x,
            y,
            label: grade,
            description: `${probability}% probability of ${grade} arthrosis`,
          };
        }),
    };
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
};

export function HomePage() {
  const [image, setImage] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    grade: string;
    confidence: number;
    heatmapUrl: string;
    annotations: Array<{
      x: number;
      y: number;
      label: string;
      description: string;
    }>;
  } | null>(null);

  const { addPendingImage } = useAdminStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setImage(acceptedFiles[0]);
        setResult(null); // Clear previous result
        toast.success("Image uploaded successfully!");
      }
    },
  });

  const handleAnalysis = async () => {
    if (!image) return;

    setAnalyzing(true);
    try {
      // Show loading toast
      const loadingToast = toast.loading("Analyzing X-ray...");

      const analysis = await analyzeImage(image);
      setResult(analysis);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(
        `Analysis complete: ${analysis.grade} (${analysis.confidence.toFixed(
          1
        )}% confidence)`
      );

      // Save to pending images
      const newImage = {
        id: Math.random().toString(36).substr(2, 9),
        file: image,
        preview: URL.createObjectURL(image),
        grade: analysis.grade,
        confidence: analysis.confidence,
        status: "pending" as const,
        uploadedBy: "User",
        uploadedAt: new Date().toISOString(),
        annotations: analysis.annotations,
        heatmapUrl: analysis.heatmapUrl,
      };

      addPendingImage(newImage);
      FileSystem.savePending(newImage);
    } catch (error) {
      toast.error(
        "Analysis failed. Please ensure the backend server is running."
      );
      console.error("Analysis error:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  // Simple health check to verify backend connection
  React.useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === "healthy") {
            toast.success("Connected to analysis server");
          } else {
            toast.error(`Server status: ${data.message || "Warning"}`);
          }
        } else {
          throw new Error("Health check failed");
        }
      } catch (error) {
        console.error("Backend health check failed:", error);
        toast.error(
          "Cannot connect to analysis server. Please ensure it is running."
        );
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="relative isolate">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              AI-Powered Knee OA Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your knee X-ray for instant analysis using our advanced AI
              model. Get detailed severity assessment and personalized
              recommendations.
            </p>
          </motion.div>

          <div className="mt-12 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upload X-Ray Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  {...getRootProps()}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 transition-colors
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-sm text-gray-600">
                      Drag & drop your X-ray image here, or{" "}
                      <span className="text-blue-600 font-medium">
                        browse files
                      </span>
                    </p>
                  </div>
                </div>

                {image && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Button
                      onClick={handleAnalysis}
                      disabled={analyzing}
                      className="w-full py-6 text-lg"
                    >
                      {analyzing ? (
                        <>
                          <Activity className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze X-Ray
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                <AnimatePresence>
                  {result && image && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <ImageAnalysis
                        originalImage={URL.createObjectURL(image)}
                        heatmapImage={result.heatmapUrl}
                        grade={result.grade}
                        confidence={result.confidence}
                        annotations={result.annotations}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
