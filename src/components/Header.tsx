import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity size={32} className="text-blue-200" />
          <h1 className="text-2xl font-bold">Knee OA Analysis Platform</h1>
        </div>
        <nav className="flex space-x-6">
          <a href="#analysis" className="hover:text-blue-200 transition-colors">Analysis</a>
          <a href="#contribute" className="hover:text-blue-200 transition-colors">Contribute</a>
          <a href="#contributors" className="hover:text-blue-200 transition-colors">Contributors</a>
        </nav>
      </div>
    </header>
  );
}