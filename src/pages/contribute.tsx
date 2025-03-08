import React, { useState } from 'react';
import { DoctorAuth } from '@/components/doctor/DoctorAuth';
import { DoctorDashboard } from '@/components/doctor/DoctorDashboard';

export function ContributePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {!isAuthenticated ? (
          <DoctorAuth onAuthenticated={() => setIsAuthenticated(true)} />
        ) : (
          <DoctorDashboard />
        )}
      </div>
    </div>
  );
}