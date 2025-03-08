import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PredictionChartProps {
  classProbabilities: Record<string, number>;
  predictedClass: string;
}

export function PredictionChart({
  classProbabilities,
  predictedClass,
}: PredictionChartProps) {
  // Sort probabilities from highest to lowest
  const sortedEntries = Object.entries(classProbabilities).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Severity Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedEntries.map(([className, probability]) => (
            <div key={className} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      className === predictedClass
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {className}
                    {className === predictedClass && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Predicted
                      </span>
                    )}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {probability.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    className === predictedClass ? "bg-blue-600" : "bg-gray-400"
                  }`}
                  style={{ width: `${probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
