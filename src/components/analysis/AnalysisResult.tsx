import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Stethoscope, Activity, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Grade, getGradeColor, getRecommendations, getUrgencyLevel } from '@/lib/utils';
import { KneeModel } from '@/components/3d/KneeModel';

interface AnalysisResultProps {
  grade: Grade;
  confidence: number;
  heatmap: string;
  keyPoints: Array<{x: number; y: number; label: string}>;
}

export function AnalysisResult({ grade, confidence, heatmap, keyPoints }: AnalysisResultProps) {
  const recommendations = getRecommendations(grade);
  const urgency = getUrgencyLevel(grade);
  const gradeColor = getGradeColor(grade);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Main Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Analysis Results</h3>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${gradeColor}`}>
              {grade}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>AI Confidence</span>
              <span>{confidence}%</span>
            </div>
            <Progress value={confidence} className="h-2" />
          </div>

          {/* 3D Model Visualization */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h4 className="text-lg font-semibold mb-4">3D Knee Visualization</h4>
            <KneeModel />
          </div>
        </div>

        {/* Heatmap Analysis */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">X-Ray Analysis Heatmap</h4>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
            <img 
              src={heatmap} 
              alt="Analysis Heatmap" 
              className="w-full h-full object-contain"
            />
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm whitespace-nowrap">{point.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical Attention Alert */}
      {grade !== 'Normal' && (
        <div className={`
          p-6 rounded-xl flex items-start gap-4
          ${urgency === 'high' 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : urgency === 'medium'
            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
          }
        `}>
          <Stethoscope className="h-6 w-6 mt-1" />
          <div>
            <h4 className="text-lg font-semibold mb-2">Medical Attention Recommended</h4>
            <p className="opacity-90">
              Based on the analysis, we recommend consulting with an orthopedic specialist
              {urgency === 'high' ? ' as soon as possible' : ' at your earliest convenience'}.
              The severity of your condition requires professional medical evaluation.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Recommended Actions
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-gray-50"
            >
              <ArrowRight className="h-5 w-5 text-blue-500 mt-0.5" />
              <p className="text-gray-700">{rec}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Tracking */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Treatment Progress Tracking
          </h4>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View Full History
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Physical Therapy Sessions</span>
            <span className="font-medium">12/24 completed</span>
          </div>
          <Progress value={50} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Pain Management</span>
            <span className="font-medium">Improving</span>
          </div>
          <Progress value={75} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Mobility Range</span>
            <span className="font-medium">65% of normal</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
      </div>
    </motion.div>
  );
}