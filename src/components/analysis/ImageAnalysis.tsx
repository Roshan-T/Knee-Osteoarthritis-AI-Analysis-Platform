// import React from 'react';
// import { motion } from 'framer-motion';
// import { Activity, AlertCircle } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';

// interface AnnotationPoint {
//   x: number;
//   y: number;
//   label: string;
//   description: string;
// }

// interface ImageAnalysisProps {
//   originalImage: string;
//   heatmapImage: string;
//   grade: string;
//   confidence: number;
//   annotations: AnnotationPoint[];
// }

// export function ImageAnalysis({
//   originalImage,
//   heatmapImage,
//   grade,
//   confidence,
//   annotations
// }: ImageAnalysisProps) {
//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Activity className="h-5 w-5" />
//             Analysis Results
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Original Image */}
//             <div className="space-y-4">
//               <h3 className="font-medium">Original X-Ray</h3>
//               <div className="relative aspect-square rounded-lg overflow-hidden bg-black/5">
//                 <img
//                   src={originalImage}
//                   alt="Original X-Ray"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             </div>

//             {/* Heatmap Analysis */}
//             <div className="space-y-4">
//               <h3 className="font-medium">AI Analysis Heatmap</h3>
//               <div className="relative aspect-square rounded-lg overflow-hidden bg-black/5">
//                 <img
//                   src={heatmapImage}
//                   alt="Analysis Heatmap"
//                   className="w-full h-full object-contain"
//                 />
//                 {annotations.map((point, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className="absolute w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
//                     style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
//                   >
//                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity min-w-[200px]">
//                       <p className="font-medium text-sm">{point.label}</p>
//                       <p className="text-xs text-gray-500 mt-1">{point.description}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Analysis Grade</p>
//                 <p className={`
//                   inline-flex px-3 py-1 rounded-full text-sm font-medium
//                   ${grade === 'Severe'
//                     ? 'bg-red-100 text-red-700'
//                     : grade === 'Moderate'
//                     ? 'bg-orange-100 text-orange-700'
//                     : 'bg-green-100 text-green-700'
//                   }
//                 `}>
//                   {grade}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-medium">AI Confidence</p>
//                 <p className="text-sm text-gray-500">{confidence}%</p>
//               </div>
//             </div>
//             <Progress value={confidence} />
//           </div>

//           <div className="mt-6">
//             <h3 className="font-medium flex items-center gap-2 mb-3">
//               <AlertCircle className="h-5 w-5" />
//               Key Findings
//             </h3>
//             <div className="grid gap-4 md:grid-cols-2">
//               {annotations.map((point, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="p-4 rounded-lg bg-gray-50"
//                 >
//                   <p className="font-medium text-sm">{point.label}</p>
//                   <p className="text-sm text-gray-600 mt-1">{point.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PredictionChart } from "./PredictionChart";

interface Annotation {
  x: number;
  y: number;
  label: string;
  description: string;
}

interface ImageAnalysisProps {
  originalImage: string;
  heatmapImage: string;
  grade: string;
  confidence: number;
  annotations: Annotation[];
  classProbabilities?: Record<string, number>;
}

export function ImageAnalysis({
  originalImage,
  heatmapImage,
  grade,
  confidence,
  annotations,
  classProbabilities = {},
}: ImageAnalysisProps) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);

  // If classProbabilities is empty but we have grade and confidence,
  // create a basic version with just the predicted class
  const probabilities =
    Object.keys(classProbabilities).length > 0
      ? classProbabilities
      : { [grade]: confidence };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={showHeatmap ? heatmapImage : originalImage}
                alt={showHeatmap ? "Heatmap analysis" : "Original X-ray"}
                className="w-full h-full object-cover"
              />

              {/* Annotation markers */}
              {showHeatmap &&
                annotations.map((annotation, i) => (
                  <button
                    key={i}
                    className={`absolute w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center
                    ${
                      selectedAnnotation?.label === annotation.label
                        ? "border-blue-500 text-blue-500"
                        : "border-gray-400 text-gray-600"
                    }`}
                    style={{
                      left: `${annotation.x * 100}%`,
                      top: `${annotation.y * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() =>
                      setSelectedAnnotation(
                        selectedAnnotation?.label === annotation.label
                          ? null
                          : annotation
                      )
                    }
                  >
                    {i + 1}
                  </button>
                ))}
            </div>

            {/* Toggle button */}
            <div className="absolute bottom-4 right-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                {showHeatmap ? "Show Original" : "Show Analysis"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-blue-900">
                    Diagnosis
                  </h3>
                  <p className="text-3xl font-bold text-blue-800 mt-1">
                    {grade}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-700">Confidence</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {confidence.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected annotation info */}
          {selectedAnnotation && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-gray-900">
                  {selectedAnnotation.label}
                </h3>
                <p className="text-gray-600 mt-1">
                  {selectedAnnotation.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Add the prediction chart component */}
          <PredictionChart
            classProbabilities={probabilities}
            predictedClass={grade}
          />
        </div>
      </div>
    </div>
  );
}
