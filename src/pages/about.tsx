import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Activity, Shield, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">About Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revolutionizing knee osteoarthritis diagnosis through advanced AI technology
            and collaborative medical expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-blue-100">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-600">
                    Our advanced machine learning algorithms provide accurate and rapid analysis
                    of knee X-rays, helping doctors make informed decisions quickly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-purple-100">
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Real-time Processing</h3>
                  <p className="text-gray-600">
                    Get instant results with our real-time processing capabilities,
                    complete with detailed analysis and recommendations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-green-100">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                  <p className="text-gray-600">
                    Your data is protected with enterprise-grade security measures,
                    ensuring patient privacy and confidentiality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-yellow-100">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expert Community</h3>
                  <p className="text-gray-600">
                    Join a growing community of medical professionals contributing to
                    and benefiting from our collaborative platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">25,000+</p>
              <p className="text-gray-600 mt-2">X-Rays Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">97.8%</p>
              <p className="text-gray-600 mt-2">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">300+</p>
              <p className="text-gray-600 mt-2">Contributing Doctors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}