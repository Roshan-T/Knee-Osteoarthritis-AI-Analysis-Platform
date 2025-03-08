import React from "react";

type OALevelProps = {
  grade: string;
  title: string;
  description: string;
  characteristics: string[];
  color: string;
};

const OALevel = ({
  grade,
  title,
  description,
  characteristics,
  color,
}: OALevelProps) => (
  <div className={`rounded-lg p-6 shadow-md border-l-4 ${color} bg-white`}>
    <div className="flex items-center mb-3">
      <span className="text-xl font-bold mr-2">Grade {grade}:</span>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div>
      <h4 className="font-semibold mb-2">Characteristics:</h4>
      <ul className="list-disc pl-5 text-gray-600 space-y-1">
        {characteristics.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export const KneeOALevels = () => {
  const levels = [
    {
      grade: "0",
      title: "Normal",
      description:
        "No signs of osteoarthritis. The knee joint shows no symptoms or structural changes.",
      characteristics: [
        "No pain or discomfort",
        "Normal function",
        "No visible changes on X-rays",
      ],
      color: "border-green-500",
    },
    {
      grade: "1",
      title: "Minor",
      description: "Very early stage of OA with minimal changes to the joint.",
      characteristics: [
        "Minor bone spurs",
        "Minimal to no symptoms",
        "Occasional pain after extensive activity",
        "No significant joint space narrowing on X-rays",
      ],
      color: "border-blue-500",
    },
    {
      grade: "2",
      title: "Mild",
      description:
        "Mild OA with more noticeable changes to the joint structure.",
      characteristics: [
        "More significant bone spurs visible on X-rays",
        "Normal joint space width",
        "Pain after walking or standing for extended periods",
        "Stiffness in the morning or after rest",
      ],
      color: "border-yellow-500",
    },
    {
      grade: "3",
      title: "Moderate",
      description:
        "Moderate OA with significant cartilage loss and joint changes.",
      characteristics: [
        "Multiple bone spurs",
        "Visible joint space narrowing on X-rays",
        "Frequent pain during activities and sometimes at rest",
        "Morning stiffness lasting 30 minutes or longer",
        "Possible joint deformity becoming visible",
      ],
      color: "border-orange-500",
    },
    {
      grade: "4",
      title: "Severe",
      description:
        "Advanced stage OA with severe joint damage and significant symptoms.",
      characteristics: [
        "Large bone spurs",
        "Severe joint space narrowing or complete loss",
        "Chronic pain, including at rest",
        "Significant joint deformity",
        "Major limitations in daily activities",
      ],
      color: "border-red-500",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Grades of Knee Osteoarthritis
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Knee OA is categorized into five grades based on severity, from Grade
          0 (normal) to Grade 4 (severe). Understanding your OA grade helps
          determine the most appropriate treatment options.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, idx) => (
            <OALevel key={idx} {...level} />
          ))}
        </div>
      </div>
    </section>
  );
};
