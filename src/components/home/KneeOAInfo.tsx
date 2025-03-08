import React from "react";
import Image from "next/image";

export const KneeOAInfo = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Understanding Knee Osteoarthritis
            </h2>
            <p className="text-gray-600 mb-4">
              Knee osteoarthritis (OA) is a degenerative joint disease that
              affects millions of people worldwide. It occurs when the
              protective cartilage that cushions the ends of your bones wears
              down over time, leading to pain, stiffness, and reduced mobility.
            </p>
            <p className="text-gray-600 mb-6">Common symptoms include:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Pain during or after movement</li>
              <li>Stiffness, especially in the morning or after sitting</li>
              <li>Tenderness when applying light pressure</li>
              <li>Loss of flexibility and reduced range of motion</li>
              <li>Bone spurs around the affected joint</li>
              <li>Swelling caused by soft tissue inflammation</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/knee-anatomy.jpg"
                alt="Knee Anatomy"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x400?text=Knee+Anatomy";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
