import React from "react";
import { Hero } from "../../components/home/Hero"; // Assuming this already exists
import { KneeOAInfo } from "../../components/home/KneeOAInfo";
import { KneeOALevels } from "../../components/home/KneeOALevels";
import { TreatmentOptions } from "../../components/home/TreatmentOptions";
import { CallToAction } from "../../components/home/CallToAction";

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero /> {/* Keeping your existing hero component */}
      <KneeOAInfo />
      <KneeOALevels />
      <TreatmentOptions />
      <CallToAction />
    </div>
  );
};
