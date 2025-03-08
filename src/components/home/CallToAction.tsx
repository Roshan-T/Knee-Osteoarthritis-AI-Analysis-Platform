import React from "react";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Take Control of Your Knee Health Today
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Join our community to track your knee health, contribute to research,
          and find personalized resources for managing your osteoarthritis.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contribute"
            className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            Contribute Your Data
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-colors"
          >
            Explore Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};
