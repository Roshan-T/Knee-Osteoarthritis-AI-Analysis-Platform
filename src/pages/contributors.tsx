import React from 'react';
import { motion } from 'framer-motion';
import { Award, Image, Star, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MOCK_CONTRIBUTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    institution: 'Mayo Clinic',
    specialization: 'Orthopedic Surgery',
    contributionCount: 156,
    accuracy: 98.5,
    verified: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    institution: 'Johns Hopkins Hospital',
    specialization: 'Radiology',
    contributionCount: 124,
    accuracy: 97.8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    institution: 'Cleveland Clinic',
    specialization: 'Rheumatology',
    contributionCount: 98,
    accuracy: 96.9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const STATISTICS = [
  {
    label: 'Total Contributors',
    value: '150+',
    icon: Users,
    description: 'Medical professionals worldwide'
  },
  {
    label: 'X-Rays Analyzed',
    value: '25,000+',
    icon: Image,
    description: 'High-quality knee X-rays'
  },
  {
    label: 'Average Accuracy',
    value: '97.8%',
    icon: TrendingUp,
    description: 'Consistent diagnostic precision'
  }
];

export function ContributorsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Expert Contributors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated medical professionals who contribute their expertise
            to improve our AI-powered knee osteoarthritis analysis system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {STATISTICS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CONTRIBUTORS.map((contributor, index) => (
            <motion.div
              key={contributor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={contributor.image}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {contributor.name}
                        {contributor.verified && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{contributor.institution}</p>
                      <p className="text-sm text-gray-500">{contributor.specialization}</p>
                    </div>
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Contributions</span>
                      <span className="font-medium text-gray-900">
                        {contributor.contributionCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Accuracy Rate</span>
                      <span className="font-medium text-gray-900">
                        {contributor.accuracy}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}