import React from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-blue-700 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90"></div>
      <div className="relative container mx-auto px-4 py-20 md:py-28 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
          Advancing Knee Osteoarthritis <br className="hidden md:block" />
          Research & Care
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-3xl mb-10 text-blue-50">
          A collaborative platform for patients, clinicians, and researchers to
          improve understanding and treatment of knee osteoarthritis.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contribute"
            className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            Contribute Data
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-colors"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-200 mb-3">
            Trusted by healthcare providers and researchers
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Placeholder for partner logos */}
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
            <div className="h-8 w-32 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
