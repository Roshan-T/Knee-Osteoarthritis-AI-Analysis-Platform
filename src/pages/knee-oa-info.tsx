import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaStethoscope,
  FaHeartbeat,
  FaClipboardList,
  FaChartLine,
  FaUserMd,
  FaRegLightbulb,
  FaRegQuestionCircle,
  FaAngleDown,
  FaAngleUp,
  FaRegFileAlt,
  FaRegHospital,
  FaRunning,
  FaRegChartBar,
} from "react-icons/fa";
import { FaBone } from "react-icons/fa"; // Example from FontAwesome
import { MdOutlineHealthAndSafety } from "react-icons/md";
// import kneeAnatomyImage from "../assets/knee-anatomy.jpg"; // Add this image to your assets

export function KneeOAInfoPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('../assets/knee-background.jpg')] bg-cover bg-center opacity-20"></div>
        <motion.div
          className="container mx-auto px-6 z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FaBone className="mx-auto text-white text-6xl mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Understanding Knee Osteoarthritis
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Comprehensive guidance for diagnosis, treatment, and living well
            with knee OA
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Take Assessment
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              Find Specialists
            </motion.button>
          </div>
        </motion.div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Statistics Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <StatCard number="32.5M" label="Americans Affected" />
          <StatCard number="80%" label="Patients Experience Pain Relief" />
          <StatCard number="45%" label="Risk Reduction with Exercise" />
          <StatCard number="10+" label="Treatment Options" />
        </motion.div>

        {/* Main Info Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Content Column (70%) */}
          <div className="lg:w-7/10">
            {/* What is Knee OA Section with Anatomy */}
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-8 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-center mb-6">
                    <FaInfoCircle className="text-blue-600 text-3xl mr-3" />
                    <h2 className="text-3xl font-bold text-gray-800">
                      Understanding Knee OA
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-4">
                    Knee osteoarthritis (OA) is a degenerative joint disease
                    characterized by the progressive breakdown of articular
                    cartilage in the knee joint, leading to pain, stiffness, and
                    decreased mobility.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    The condition develops when the protective cartilage that
                    cushions the ends of the bones wears down over time. As
                    cartilage deteriorates, the bones begin to rub against each
                    other, causing pain, swelling, and reduced range of motion.
                  </p>
                  <p className="text-lg text-gray-700">
                    OA is the most common form of arthritis, affecting millions
                    worldwide, and the knee is one of the most commonly affected
                    joints due to its weight-bearing responsibility and complex
                    structure.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      // src={kneeAnatomyImage}
                      alt="Knee Anatomy"
                      className="w-full h-auto"
                    />
                    <div className="bg-blue-50 p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Anatomy of the Knee
                      </h4>
                      <p className="text-sm text-gray-700">
                        The knee joint consists of the femur (thigh bone), tibia
                        (shin bone), and patella (kneecap). In knee OA, the
                        cartilage covering these bones deteriorates, affecting
                        the joint's function.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 mb-8">
              <TabButton
                active={activeTab === "overview"}
                onClick={() => setActiveTab("overview")}
                label="Overview"
                icon={<FaRegLightbulb />}
              />
              <TabButton
                active={activeTab === "symptoms"}
                onClick={() => setActiveTab("symptoms")}
                label="Symptoms & Stages"
                icon={<FaStethoscope />}
              />
              <TabButton
                active={activeTab === "diagnosis"}
                onClick={() => setActiveTab("diagnosis")}
                label="Diagnosis"
                icon={<FaRegFileAlt />}
              />
              <TabButton
                active={activeTab === "treatment"}
                onClick={() => setActiveTab("treatment")}
                label="Treatment"
                icon={<FaUserMd />}
              />
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Knee OA Overview
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InfoCard
                      icon={<FaHeartbeat className="text-red-500" size={24} />}
                      title="Risk Factors"
                      content={
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          <li>Age (most common in adults over 50)</li>
                          <li>
                            Obesity (excess weight puts additional stress on
                            joints)
                          </li>
                          <li>Gender (more common in women than men)</li>
                          <li>Previous knee injuries or surgeries</li>
                          <li>
                            Repetitive stress from certain occupations or sports
                          </li>
                          <li>Genetics and family history of OA</li>
                          <li>Bone deformities or alignment issues</li>
                          <li>Metabolic diseases (diabetes, gout)</li>
                        </ul>
                      }
                    />
                    <InfoCard
                      icon={
                        <FaRegChartBar className="text-blue-500" size={24} />
                      }
                      title="Prevalence & Impact"
                      content={
                        <div className="text-gray-700">
                          <p className="mb-3">
                            Knee OA affects approximately 10% of men and 13% of
                            women aged 60 years and older worldwide.
                          </p>
                          <p className="mb-3">
                            In the United States alone, over 32 million adults
                            are affected by osteoarthritis.
                          </p>
                          <p>
                            Knee OA is a leading cause of disability and reduced
                            quality of life, resulting in significant economic
                            burden with an estimated annual cost of $136.8
                            billion.
                          </p>
                        </div>
                      }
                    />
                  </div>
                </div>
              )}

              {activeTab === "symptoms" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Symptoms & Stages
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Common Symptoms
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Primary Symptoms
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Pain during or after movement</li>
                        <li>
                          Joint stiffness, especially in the morning or after
                          inactivity
                        </li>
                        <li>Tenderness when light pressure is applied</li>
                        <li>Loss of flexibility and reduced range of motion</li>
                        <li>
                          Grating sensation or popping sounds during movement
                        </li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Advanced Symptoms
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Bone spurs (osteophytes) around the joint</li>
                        <li>Joint instability or buckling of the knee</li>
                        <li>
                          Visible deformity or change in appearance of the knee
                        </li>
                        <li>Persistent inflammation and swelling</li>
                        <li>Pain even when at rest</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Stages of Knee OA
                  </h3>
                  <div className="space-y-4">
                    <StageCard
                      stage="Stage 1: Minor"
                      description="Minor wear and tear and bone spur growth. Minimal to no pain or discomfort."
                      characteristics={[
                        "Minimal cartilage damage",
                        "No joint space narrowing",
                        "No observable symptoms for most patients",
                      ]}
                    />
                    <StageCard
                      stage="Stage 2: Mild"
                      description="More noticeable bone spurs, but cartilage is still of adequate thickness. Patients begin experiencing symptoms."
                      characteristics={[
                        "Joint stiffness, especially after sitting for long periods",
                        "Tenderness when kneeling or bending",
                        "Possible discomfort after long days of activity",
                      ]}
                    />
                    <StageCard
                      stage="Stage 3: Moderate"
                      description="Cartilage begins showing clear damage and the space between bones narrows."
                      characteristics={[
                        "Frequent pain during movement",
                        "Joint stiffness after periods of inactivity",
                        "Inflammation and swelling",
                        "Popping or cracking sounds",
                      ]}
                    />
                    <StageCard
                      stage="Stage 4: Severe"
                      description="Advanced cartilage loss resulting in bone-on-bone friction, inflammation, and bone spur formation."
                      characteristics={[
                        "Chronic pain, including at rest",
                        "Significant stiffness",
                        "Limited range of motion",
                        "Difficulty walking, climbing stairs, or standing",
                      ]}
                    />
                  </div>
                </div>
              )}

              {activeTab === "diagnosis" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Diagnosis & Assessment
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Diagnostic Approaches
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                          <FaUserMd className="mr-2" /> Clinical Evaluation
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>
                            <span className="font-medium">
                              Medical History Assessment:
                            </span>{" "}
                            Reviewing symptoms, previous injuries, family
                            history, and activity level
                          </li>
                          <li>
                            <span className="font-medium">
                              Physical Examination:
                            </span>{" "}
                            Checking for tenderness, swelling, range of motion,
                            stability, and crepitus (cracking sounds)
                          </li>
                          <li>
                            <span className="font-medium">
                              Pain Assessment:
                            </span>{" "}
                            Evaluating pain patterns, triggers, and relief
                            factors
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                          <FaRegHospital className="mr-2" /> Imaging Studies
                        </h4>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          <li>
                            <span className="font-medium">X-rays:</span> Show
                            joint space narrowing, bone spurs, and alignment
                            issues
                          </li>
                          <li>
                            <span className="font-medium">MRI:</span> Provides
                            detailed images of soft tissues including cartilage,
                            ligaments, and menisci
                          </li>
                          <li>
                            <span className="font-medium">CT Scan:</span> Can
                            show detailed bone structure when necessary
                          </li>
                          <li>
                            <span className="font-medium">Ultrasound:</span>{" "}
                            Helpful for visualizing soft tissue inflammation
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Classification Systems
                    </h3>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">
                        Kellgren-Lawrence Grading Scale
                      </h4>
                      <p className="text-gray-700 mb-4">
                        The most widely used classification system for knee OA
                        based on radiographic findings:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-blue-100">
                              <th className="border border-blue-200 py-2 px-4">
                                Grade
                              </th>
                              <th className="border border-blue-200 py-2 px-4">
                                Classification
                              </th>
                              <th className="border border-blue-200 py-2 px-4">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-blue-200 py-2 px-4">
                                Grade 0
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Normal
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                No radiographic features of OA
                              </td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-blue-200 py-2 px-4">
                                Grade 1
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Doubtful
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Doubtful joint space narrowing, possible
                                osteophytes
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 py-2 px-4">
                                Grade 2
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Minimal
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Definite osteophytes, possible joint space
                                narrowing
                              </td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="border border-blue-200 py-2 px-4">
                                Grade 3
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Moderate
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Moderate osteophytes, definite joint space
                                narrowing, some sclerosis, possible deformity
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-blue-200 py-2 px-4">
                                Grade 4
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Severe
                              </td>
                              <td className="border border-blue-200 py-2 px-4">
                                Large osteophytes, marked joint space narrowing,
                                severe sclerosis, definite bone deformity
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Advanced Diagnostic Techniques
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white border-l-4 border-blue-500 p-5 shadow-sm">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Joint Fluid Analysis
                        </h4>
                        <p className="text-gray-700">
                          Synovial fluid extracted from the knee joint can be
                          analyzed to rule out infection or other conditions
                          like gout. In OA, the fluid is typically clear and has
                          normal viscosity.
                        </p>
                      </div>
                      <div className="bg-white border-l-4 border-blue-500 p-5 shadow-sm">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Arthroscopy
                        </h4>
                        <p className="text-gray-700">
                          A minimally invasive procedure allowing direct
                          visualization of the joint surfaces. Though less
                          common for diagnosis alone, it can be used for both
                          diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "treatment" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Treatment Options
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Non-Surgical Approaches
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <TreatmentCard
                        title="Medications"
                        icon={<FaRegFileAlt className="text-purple-500" />}
                        items={[
                          "Acetaminophen for mild pain relief",
                          "NSAIDs to reduce pain and inflammation",
                          "Duloxetine (Cymbalta) for chronic pain",
                          "Topical NSAIDs and capsaicin creams",
                          "Corticosteroid injections for inflammation",
                          "Hyaluronic acid injections to improve lubrication",
                        ]}
                      />

                      <TreatmentCard
                        title="Physical Therapy"
                        icon={<FaRunning className="text-green-500" />}
                        items={[
                          "Targeted strengthening exercises for quadriceps and hamstrings",
                          "Range-of-motion activities to improve flexibility",
                          "Aquatic therapy for low-impact conditioning",
                          "Balance and proprioception training",
                          "Gait training for improved walking mechanics",
                          "Manual therapy techniques",
                        ]}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Lifestyle Modifications
                    </h3>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold text-green-800 mb-2">
                            Weight Management
                          </h4>
                          <p className="text-gray-700">
                            Even modest weight loss can significantly reduce
                            knee pain and improve function. Each pound lost
                            reduces pressure on the knees by approximately 4
                            pounds.
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold text-green-800 mb-2">
                            Exercise Regimen
                          </h4>
                          <p className="text-gray-700">
                            Low-impact activities like swimming, cycling, and
                            walking help maintain joint health without excessive
                            stress. Aim for 150 minutes per week.
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="font-semibold text-green-800 mb-2">
                            Joint Protection
                          </h4>
                          <p className="text-gray-700">
                            Using assistive devices like braces, canes, or
                            orthotic shoe inserts can improve stability and
                            reduce pain during daily activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Surgical Options
                    </h3>
                    <div className="space-y-4">
                      <SurgeryOption
                        name="Arthroscopy"
                        description="Minimally invasive procedure to remove loose cartilage, smooth damaged cartilage, and wash out the joint."
                        suitability="Best for mild to moderate OA with mechanical symptoms like locking or catching."
                        recovery="1-2 weeks for basic activities, 6-8 weeks for full recovery."
                      />
                      <SurgeryOption
                        name="Osteotomy"
                        description="Reshapes the bone to shift weight from the damaged part of the knee to the healthier area."
                        suitability="Ideal for younger patients with OA on only one side of the knee joint."
                        recovery="3-6 months for full recovery with physical therapy."
                      />
                      <SurgeryOption
                        name="Partial Knee Replacement"
                        description="Only the damaged portion of the knee is replaced with artificial components."
                        suitability="For patients with damage limited to one compartment of the knee."
                        recovery="4-6 weeks for basic activities, 3-6 months for full recovery."
                      />
                      <SurgeryOption
                        name="Total Knee Replacement (TKR)"
                        description="The entire knee joint is replaced with an artificial joint made of metal and plastic."
                        suitability="For advanced OA with significant pain and disability not responsive to other treatments."
                        recovery="3 months for basic function, 6-12 months for full recovery."
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Emerging Treatments
                    </h3>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-3">
                        Cutting-Edge Approaches
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex">
                          <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <MdOutlineHealthAndSafety className="text-purple-600" />
                          </div>
                          <div>
                            <span className="font-medium text-purple-900">
                              Stem Cell Therapy
                            </span>
                            <p className="text-gray-700 text-sm">
                              Involves injecting stem cells into the knee to
                              potentially repair damaged cartilage and reduce
                              inflammation.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <MdOutlineHealthAndSafety className="text-purple-600" />
                          </div>
                          <div>
                            <span className="font-medium text-purple-900">
                              Platelet-Rich Plasma (PRP)
                            </span>
                            <p className="text-gray-700 text-sm">
                              Injections of concentrated platelets from the
                              patient's own blood to promote healing and tissue
                              regeneration.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <MdOutlineHealthAndSafety className="text-purple-600" />
                          </div>
                          <div>
                            <span className="font-medium text-purple-900">
                              MACI (Matrix-Induced Autologous Chondrocyte
                              Implantation)
                            </span>
                            <p className="text-gray-700 text-sm">
                              A procedure where cartilage cells are harvested,
                              grown in a lab, and reimplanted into the damaged
                              area.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <MdOutlineHealthAndSafety className="text-purple-600" />
                          </div>
                          <div>
                            <span className="font-medium text-purple-900">
                              Genicular Artery Embolization
                            </span>
                            <p className="text-gray-700 text-sm">
                              A minimally invasive procedure that reduces blood
                              flow to inflamed areas of the knee to decrease
                              pain.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 mb-10">
              <div className="flex items-center mb-6">
                <FaRegQuestionCircle className="text-indigo-600 text-3xl mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                <FAQ
                  question="Can knee OA be completely cured?"
                  answer="While there is no complete cure for knee osteoarthritis, the condition can be effectively managed through various treatments. These include lifestyle modifications, physical therapy, medications, and in advanced cases, surgical interventions. The goal of treatment is to reduce pain, improve function, and slow the progression of the disease."
                />
                <FAQ
                  question="Is exercise good or bad for knee OA?"
                  answer="Exercise is generally beneficial for people with knee OA when done properly. Low-impact activities like swimming, cycling, and walking can strengthen the muscles around the knee, increase flexibility, and reduce pain. It's important to work with a healthcare professional to develop an appropriate exercise program and avoid high-impact activities that may worsen symptoms."
                />
                <FAQ
                  question="What are the best dietary supplements for knee OA?"
                  answer="Some dietary supplements may help manage knee OA symptoms, including glucosamine, chondroitin, omega-3 fatty acids, and turmeric. However, it's important to consult with a healthcare provider before starting any new supplement regimen, as their effectiveness can vary and they may interact with other medications."
                />
                <FAQ
                  question="How can I prevent knee OA from getting worse?"
                  answer="To prevent knee OA from worsening, maintain a healthy weight, stay active with low-impact exercises, avoid activities that put excessive stress on the knees, use proper joint protection techniques, and follow your healthcare provider's recommendations for managing symptoms and treatment."
                />
              </div>
            </section>
          </div>

          {/* Right Sidebar (30%) */}
          <div className="lg:w-3/10">
            {/* Resources Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Additional Resources
              </h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FaClipboardList className="mr-2" /> Clinical Guidelines for
                    Knee OA Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FaChartLine className="mr-2" /> Latest Research on Knee
                    Osteoarthritis
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FaRegLightbulb className="mr-2" /> Self-Management
                    Strategies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FaRegQuestionCircle className="mr-2" /> Frequently Asked
                    Questions
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or need further assistance, please
                feel free to contact us.
              </p>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, content }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-gray-700">{content}</p>
    </motion.div>
  );
}

function DetailSection({ title, content }) {
  return (
    <div className="border-l-4 border-blue-500 pl-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="text-gray-700">{content}</div>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-4xl font-bold text-blue-600 mb-2">{number}</h3>
      <p className="text-gray-700">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 border-b-2 ${
        active ? "border-blue-600 text-blue-600" : "border-transparent"
      } hover:text-blue-600 hover:border-blue-600 transition-all`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
}

function StageCard({ stage, description, characteristics }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{stage}</h4>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {characteristics.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TreatmentCard({ title, icon, items }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
        {icon} {title}
      </h4>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SurgeryOption({ name, description, suitability, recovery }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{name}</h4>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Suitability:</span> {suitability}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Recovery:</span> {recovery}
      </p>
    </div>
  );
}

function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold text-gray-800">{question}</h4>
        {isOpen ? (
          <FaAngleUp className="text-gray-600" />
        ) : (
          <FaAngleDown className="text-gray-600" />
        )}
      </div>
      {isOpen && <p className="text-gray-700 mt-4">{answer}</p>}
    </div>
  );
}
