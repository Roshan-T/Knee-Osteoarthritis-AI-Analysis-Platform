import React from 'react';
import { Award, Image } from 'lucide-react';

const MOCK_CONTRIBUTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    institution: 'Mayo Clinic',
    contributionCount: 156
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    institution: 'Johns Hopkins Hospital',
    contributionCount: 124
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    institution: 'Cleveland Clinic',
    contributionCount: 98
  }
];

export function ContributorsList() {
  return (
    <section id="contributors" className="py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Top Contributors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CONTRIBUTORS.map((contributor) => (
            <div key={contributor.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{contributor.name}</h3>
                  <p className="text-gray-600">{contributor.institution}</p>
                </div>
                <Award className="text-yellow-500" size={24} />
              </div>
              <div className="mt-4 flex items-center text-gray-700">
                <Image size={20} className="mr-2" />
                <span>{contributor.contributionCount} contributions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}