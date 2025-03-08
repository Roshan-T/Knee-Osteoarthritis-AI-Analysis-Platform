import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Brain, Users, TrendingUp } from 'lucide-react';
import { KneeModel } from '@/components/3d/KneeModel';

const stats = [
  {
    label: 'Total Analyses',
    value: '25,431',
    change: '+12.5%',
    icon: Activity,
    color: 'blue'
  },
  {
    label: 'AI Accuracy',
    value: '97.8%',
    change: '+2.1%',
    icon: Brain,
    color: 'purple'
  },
  {
    label: 'Active Doctors',
    value: '312',
    change: '+15',
    icon: Users,
    color: 'green'
  },
  {
    label: 'Weekly Growth',
    value: '34.2%',
    change: '+5.4%',
    icon: TrendingUp,
    color: 'yellow'
  }
];

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Platform Overview</h1>
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 rounded-lg border bg-white">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <span className="text-xs text-green-600">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>3D Knee Analysis Model</CardTitle>
              </CardHeader>
              <CardContent>
                <KneeModel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">New analysis completed</p>
                        <p className="text-sm text-gray-500">2 minutes ago</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">View Details</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}