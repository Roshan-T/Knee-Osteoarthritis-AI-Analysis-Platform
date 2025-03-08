import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export const GRADES = ['Normal', 'Doubtful', 'Minimal', 'Moderate', 'Severe'] as const;
export type Grade = typeof GRADES[number];

export function getRecommendations(grade: Grade): string[] {
  switch (grade) {
    case 'Normal':
      return [
        'Maintain regular physical activity',
        'Continue healthy weight management',
        'Schedule routine check-ups'
      ];
    case 'Doubtful':
      return [
        'Incorporate low-impact exercises',
        'Monitor any changes in symptoms',
        'Consider glucosamine supplements',
        'Schedule follow-up in 6 months'
      ];
    case 'Minimal':
      return [
        'Start physical therapy exercises',
        'Use joint protection techniques',
        'Consider weight management program',
        'Schedule follow-up in 3 months',
        'Monitor pain levels'
      ];
    case 'Moderate':
      return [
        'Consult with orthopedic specialist',
        'Begin structured physical therapy',
        'Consider assistive devices',
        'Implement pain management strategies',
        'Regular monitoring required'
      ];
    case 'Severe':
      return [
        'Immediate orthopedic consultation',
        'Discuss surgical options',
        'Use mobility assistance devices',
        'Pain management is crucial',
        'Consider lifestyle modifications',
        'Regular specialist monitoring'
      ];
  }
}

export function getUrgencyLevel(grade: Grade): 'low' | 'medium' | 'high' {
  switch (grade) {
    case 'Normal':
    case 'Doubtful':
      return 'low';
    case 'Minimal':
    case 'Moderate':
      return 'medium';
    case 'Severe':
      return 'high';
  }
}

export function getGradeColor(grade: Grade): string {
  switch (grade) {
    case 'Normal':
      return 'bg-green-100 text-green-700';
    case 'Doubtful':
      return 'bg-blue-100 text-blue-700';
    case 'Minimal':
      return 'bg-yellow-100 text-yellow-700';
    case 'Moderate':
      return 'bg-orange-100 text-orange-700';
    case 'Severe':
      return 'bg-red-100 text-red-700';
  }
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return 'bg-green-600';
  if (confidence >= 70) return 'bg-yellow-600';
  return 'bg-red-600';
}

// Simulated analysis function (replace with actual ML model integration)
export async function analyzeXRay(image: File): Promise<{
  grade: Grade;
  confidence: number;
  heatmap: string;
  keyPoints: Array<{x: number; y: number; label: string}>;
}> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate analysis result
  return {
    grade: 'Severe',
    confidence: 92.5,
    heatmap: URL.createObjectURL(image), // In real implementation, this would be the processed heatmap
    keyPoints: [
      { x: 0.3, y: 0.4, label: 'Joint Space Narrowing' },
      { x: 0.6, y: 0.5, label: 'Osteophytes' },
      { x: 0.4, y: 0.7, label: 'Subchondral Sclerosis' }
    ]
  };
}