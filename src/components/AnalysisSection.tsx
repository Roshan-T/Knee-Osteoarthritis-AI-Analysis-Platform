import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export function AnalysisSection() {
  const [image, setImage] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    }
  });

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    // TODO: Implement actual analysis
    setTimeout(() => {
      setAnalysis({
        grade: 'Severe',
        probability: 92.5,
        recommendations: [
          'Consult an orthopedic specialist immediately',
          'Consider physical therapy',
          'Maintain a healthy weight',
          'Use assistive devices when needed'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <section id="analysis" className="py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Knee X-Ray Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-4 text-blue-500" size={48} />
              <p className="text-gray-600">Drag & drop an X-ray image here, or click to select</p>
            </div>

            {image && (
              <div className="mt-6">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded X-ray"
                  className="max-w-full rounded-lg shadow-md"
                />
                <button
                  onClick={analyzeImage}
                  disabled={loading}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Analyze X-Ray'}
                </button>
              </div>
            )}
          </div>

          {analysis && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">Analysis Results</h3>
              
              <div className="mb-6">
                <p className="text-lg">
                  Severity Grade: <span className="font-bold text-red-600">{analysis.grade}</span>
                </p>
                <p className="text-gray-600">
                  Confidence: {analysis.probability}%
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <AlertCircle className="mr-2 text-yellow-500" size={20} />
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}