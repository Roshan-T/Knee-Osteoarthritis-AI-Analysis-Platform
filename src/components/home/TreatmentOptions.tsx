import React from "react";

type TreatmentCardProps = {
  title: string;
  description: string;
  suitable: string[];
  icon: string;
};

const TreatmentCard = ({
  title,
  description,
  suitable,
  icon,
}: TreatmentCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
    <div className="flex justify-center mb-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <i className={icon}></i>
        {/* You can replace with actual icons or images */}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-center mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div>
      <h4 className="font-medium mb-2 text-gray-700">Best for:</h4>
      <ul className="text-gray-600 space-y-1">
        {suitable.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span> {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const TreatmentOptions = () => {
  const treatments = [
    {
      title: "Lifestyle Modifications",
      description:
        "Simple changes to daily activities and habits that can help manage OA symptoms.",
      suitable: ["Grade 1-2", "Early intervention", "Preventive care"],
      icon: "fas fa-walking",
    },
    {
      title: "Physical Therapy",
      description:
        "Targeted exercises to strengthen muscles around the knee and improve flexibility.",
      suitable: ["Grade 1-3", "Post-injury recovery", "Pre/post surgery"],
      icon: "fas fa-dumbbell",
    },
    {
      title: "Weight Management",
      description:
        "Reducing excess weight to decrease stress on knee joints and reduce symptoms.",
      suitable: ["All grades", "Especially effective for BMI > 25"],
      icon: "fas fa-weight",
    },
    {
      title: "Medications",
      description:
        "Pain relievers and anti-inflammatory drugs to manage pain and reduce inflammation.",
      suitable: ["Grade 2-4", "Acute flare-ups", "Chronic pain management"],
      icon: "fas fa-pills",
    },
    {
      title: "Injections",
      description:
        "Corticosteroid or hyaluronic acid injections to reduce inflammation and improve lubrication.",
      suitable: ["Grade 2-3", "When other treatments haven't helped"],
      icon: "fas fa-syringe",
    },
    {
      title: "Surgical Options",
      description:
        "Various surgical procedures from minimally invasive to total knee replacement.",
      suitable: [
        "Grade 3-4",
        "Severe joint damage",
        "Failed conservative treatment",
      ],
      icon: "fas fa-hospital",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Treatment Options
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Treatment for knee OA depends on the severity of your condition.
          Options range from conservative approaches for early stages to more
          invasive procedures for advanced cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, idx) => (
            <TreatmentCard key={idx} {...treatment} />
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-center mb-4">
            Personalized Treatment Plan
          </h3>
          <p className="text-gray-600 text-center">
            The most effective approach to managing knee OA is a personalized
            treatment plan developed with healthcare professionals. Your plan
            should consider your specific OA grade, symptoms, lifestyle, and
            overall health status.
          </p>
        </div>
      </div>
    </section>
  );
};
