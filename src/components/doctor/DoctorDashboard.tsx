import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Users, Database, Award, ChevronRight, Loader2, PlusCircle, CheckCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { GRADES } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Contribution {
  id: string;
  imageUrl: string;
  grade: string;
  verificationStatus: 'pending' | 'verified';
  timestamp: string;
}

export function DoctorDashboard() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [uploadingImages, setUploadingImages] = useState<Array<{
    file: File;
    grade: string | null;
    uploading: boolean;
  }>>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map(file => ({
        file,
        grade: null,
        uploading: false
      }));
      setUploadingImages(prev => [...prev, ...newImages]);
      toast.success(`${acceptedFiles.length} image(s) added`);
    }
  });

  const contributionStats = {
    total: 156,
    pending: 12,
    verified: 144,
    accuracy: 98.5
  };

  const chartData = {
    labels: ['Normal', 'Doubtful', 'Minimal', 'Moderate', 'Severe'],
    datasets: [{
      data: [30, 25, 35, 40, 26],
      backgroundColor: [
        '#22c55e',
        '#3b82f6',
        '#eab308',
        '#f97316',
        '#ef4444'
      ]
    }]
  };

  const handleGradeSelection = (index: number, grade: string) => {
    setUploadingImages(prev =>
      prev.map((img, i) =>
        i === index ? { ...img, grade } : img
      )
    );
  };

  const handleUpload = async (index: number) => {
    const image = uploadingImages[index];
    if (!image.grade) {
      toast.error('Please select a grade first');
      return;
    }

    setUploadingImages(prev =>
      prev.map((img, i) =>
        i === index ? { ...img, uploading: true } : img
      )
    );

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newContribution: Contribution = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: URL.createObjectURL(image.file),
      grade: image.grade,
      verificationStatus: 'pending',
      timestamp: new Date().toISOString()
    };

    setContributions(prev => [newContribution, ...prev]);
    setUploadingImages(prev => prev.filter((_, i) => i !== index));
    toast.success('Image uploaded successfully');
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contributionStats.total}</p>
                <p className="text-sm text-gray-500">Total Contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contributionStats.pending}</p>
                <p className="text-sm text-gray-500">Pending Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contributionStats.verified}</p>
                <p className="text-sm text-gray-500">Verified Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contributionStats.accuracy}%</p>
                <p className="text-sm text-gray-500">Accuracy Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload New X-Rays</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm text-gray-600">
                Drag & drop X-ray images here, or click to select files
              </p>
            </div>

            {uploadingImages.length > 0 && (
              <div className="mt-6 space-y-4">
                {uploadingImages.map((img, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={URL.createObjectURL(img.file)}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium mb-2">Select Grade:</p>
                        <div className="flex flex-wrap gap-2">
                          {GRADES.map(grade => (
                            <button
                              key={grade}
                              onClick={() => handleGradeSelection(index, grade)}
                              className={`
                                px-3 py-1 rounded-full text-sm font-medium transition-colors
                                ${img.grade === grade
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                              `}
                            >
                              {grade}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleUpload(index)}
                        disabled={!img.grade || img.uploading}
                      >
                        {img.uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <PlusCircle className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contributions.map(contribution => (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={contribution.imageUrl}
                  alt="X-ray"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${contribution.grade === 'Severe'
                        ? 'bg-red-100 text-red-700'
                        : contribution.grade === 'Moderate'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                      }
                    `}>
                      {contribution.grade}
                    </span>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${contribution.verificationStatus === 'verified'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }
                    `}>
                      {contribution.verificationStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploaded {new Date(contribution.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}