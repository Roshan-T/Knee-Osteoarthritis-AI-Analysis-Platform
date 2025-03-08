import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
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
  FaBone,
  FaArrowRight,
  FaCheck,
  FaXRay,
  FaWalking,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";

// High-quality medical images
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=2000",
  kneeAnatomy:
    "https://images.unsplash.com/photo-1589279003513-467d320f47eb?auto=format&fit=crop&q=80&w=1000",
  xray: "https://images.unsplash.com/photo-1583323722465-5546c8fb6d0a?auto=format&fit=crop&q=80&w=1000",
  treatment:
    "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&q=80&w=1000",
  doctor:
    "https://images.unsplash.com/photo-1584467735867-4297ae2a8a0a?auto=format&fit=crop&q=80&w=1000",
  exercise:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000",
  physicalTherapy:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
  surgery:
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=1000",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export function KneeOAInfoPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Medical background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/60" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div variants={fadeInUp}>
            <FaBone className="mx-auto text-blue-300 text-6xl mb-8" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Understanding
            <br />
            Knee Osteoarthritis
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
          >
            Comprehensive guidance for diagnosis, treatment, and managing knee
            OA effectively
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <ScrollLink
              to="overview"
              smooth={true}
              duration={500}
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors cursor-pointer flex items-center"
            >
              Learn More <FaArrowRight className="ml-2" />
            </ScrollLink>
            <ScrollLink
              to="treatment"
              smooth={true}
              duration={500}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              Treatment Options
            </ScrollLink>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <FaAngleDown className="text-white text-4xl" />
        </motion.div>
      </section>

      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {[
                { id: "overview", label: "Overview", icon: <FaInfoCircle /> },
                { id: "symptoms", label: "Symptoms", icon: <FaStethoscope /> },
                { id: "diagnosis", label: "Diagnosis", icon: <FaXRay /> },
                { id: "treatment", label: "Treatment", icon: <FaUserMd /> },
                { id: "faq", label: "FAQ", icon: <FaRegQuestionCircle /> },
              ].map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={500}
                  onSetActive={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 cursor-pointer transition-colors ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </ScrollLink>
              ))}
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center">
              <FaUserMd className="mr-2" />
              Get Help
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Statistics */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24"
        >
          <StatCard
            number="32.5M"
            label="Americans Affected"
            icon={<FaChartLine />}
            description="People living with knee OA in the US"
          />
          <StatCard
            number="80%"
            label="Treatment Success"
            icon={<FaCheck />}
            description="Patients showing improvement with proper care"
          />
          <StatCard
            number="45%"
            label="Risk Reduction"
            icon={<FaRunning />}
            description="Through regular exercise and management"
          />
          <StatCard
            number="10+"
            label="Treatment Options"
            icon={<FaUserMd />}
            description="Comprehensive care approaches available"
          />
        </motion.div>

        {/* Overview Section */}
        <section id="overview" className="mb-24">
          <SectionTitle
            icon={<FaInfoCircle />}
            title="What is Knee Osteoarthritis?"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Knee osteoarthritis (OA) is a degenerative joint disease that
                occurs when the protective cartilage that cushions the ends of
                your bones wears down over time. This progressive condition
                primarily affects the knee joint, one of the most commonly
                affected areas due to its weight-bearing responsibilities.
              </p>
              <ul className="space-y-4">
                {[
                  "Progressive breakdown of joint cartilage",
                  "Formation of bone spurs (osteophytes)",
                  "Changes in the bones under the cartilage",
                  "Deterioration of tendons and ligaments",
                  "Inflammation of the joint lining",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center text-gray-700"
                  >
                    <FaCheck className="text-green-500 mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={IMAGES.kneeAnatomy}
                alt="Knee Anatomy"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Knee Anatomy</h3>
                <p className="text-sm opacity-90">
                  Understanding the structure helps comprehend how OA affects
                  the joint
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section id="symptoms" className="mb-24">
          <SectionTitle icon={<FaStethoscope />} title="Symptoms & Stages" />
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Common Symptoms
              </h3>
              <div className="space-y-6">
                <SymptomCard
                  title="Pain and Discomfort"
                  description="Pain during or after movement, tenderness when applying pressure"
                  severity="Varies by stage"
                  icon={<FaExclamationTriangle />}
                />
                <SymptomCard
                  title="Stiffness"
                  description="Joint stiffness most noticeable in the morning or after inactivity"
                  severity="Common in all stages"
                  icon={<FaWalking />}
                />
                <SymptomCard
                  title="Reduced Mobility"
                  description="Decreased range of motion and difficulty with daily activities"
                  severity="Progressive"
                  icon={<FaRunning />}
                />
                <SymptomCard
                  title="Swelling"
                  description="Inflammation around the knee joint, especially after activity"
                  severity="Moderate to Severe"
                  icon={<FaHeartbeat />}
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Stages of OA
              </h3>
              <div className="space-y-4">
                <StageCard
                  stage="Stage 1: Minor"
                  description="Early signs of bone spur growth with minimal to no pain"
                  color="border-green-500"
                  symptoms={[
                    "Minimal joint pain",
                    "No visible swelling",
                    "Normal daily activities",
                  ]}
                />
                <StageCard
                  stage="Stage 2: Mild"
                  description="More noticeable bone spurs with occasional pain"
                  color="border-yellow-500"
                  symptoms={[
                    "Pain after long activities",
                    "Mild stiffness",
                    "Some activity limitations",
                  ]}
                />
                <StageCard
                  stage="Stage 3: Moderate"
                  description="Significant cartilage loss and frequent pain"
                  color="border-orange-500"
                  symptoms={[
                    "Regular pain during activities",
                    "Joint stiffness",
                    "Reduced mobility",
                  ]}
                />
                <StageCard
                  stage="Stage 4: Severe"
                  description="Advanced cartilage loss with chronic pain"
                  color="border-red-500"
                  symptoms={[
                    "Chronic pain",
                    "Significant stiffness",
                    "Major activity limitations",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Diagnosis Section */}
        <section id="diagnosis" className="mb-24">
          <SectionTitle icon={<FaXRay />} title="Diagnosis & Assessment" />
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Diagnostic Approaches
              </h3>
              <div className="space-y-6">
                <DiagnosticCard
                  title="Physical Examination"
                  description="Comprehensive evaluation of knee joint mobility, stability, and pain patterns"
                  steps={[
                    "Range of motion testing",
                    "Stability assessment",
                    "Pain pattern evaluation",
                    "Muscle strength testing",
                  ]}
                />
                <DiagnosticCard
                  title="Imaging Studies"
                  description="Various imaging techniques to visualize joint damage and changes"
                  steps={[
                    "X-rays for bone changes",
                    "MRI for soft tissue damage",
                    "CT scans for detailed bone structure",
                    "Ultrasound for inflammation",
                  ]}
                />
                <DiagnosticCard
                  title="Laboratory Tests"
                  description="Blood tests and joint fluid analysis when needed"
                  steps={[
                    "Inflammatory markers",
                    "Rheumatoid factor",
                    "Joint fluid analysis",
                    "Other relevant blood tests",
                  ]}
                />
              </div>
            </div>
            <div>
              <div className="sticky top-24 bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={IMAGES.xray}
                  alt="Knee X-ray"
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-4">
                    X-ray Classification
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        grade: "Grade 0",
                        description: "Normal joint space, no visible changes",
                      },
                      {
                        grade: "Grade 1",
                        description:
                          "Minimal osteophytes, possible joint space narrowing",
                      },
                      {
                        grade: "Grade 2",
                        description:
                          "Definite osteophytes, joint space narrowing",
                      },
                      {
                        grade: "Grade 3",
                        description:
                          "Multiple osteophytes, definite joint space narrowing",
                      },
                      {
                        grade: "Grade 4",
                        description:
                          "Large osteophytes, severe joint space narrowing",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 text-gray-700"
                      >
                        <span className="font-semibold min-w-[80px]">
                          {item.grade}:
                        </span>
                        <span>{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Section */}
        <section id="treatment" className="mb-24">
          <SectionTitle icon={<FaUserMd />} title="Treatment Options" />
          <div className="space-y-12">
            {/* Conservative Treatment */}
            <div className="grid md:grid-cols-3 gap-8">
              <TreatmentCard
                title="Lifestyle Modifications"
                description="Simple changes to daily activities and habits"
                image={IMAGES.exercise}
                recommendations={[
                  "Weight management",
                  "Low-impact exercises",
                  "Activity modification",
                  "Proper footwear",
                ]}
              />
              <TreatmentCard
                title="Physical Therapy"
                description="Targeted exercises and manual therapy"
                image={IMAGES.physicalTherapy}
                recommendations={[
                  "Strengthening exercises",
                  "Range of motion exercises",
                  "Manual therapy",
                  "Gait training",
                ]}
              />
              <TreatmentCard
                title="Medications"
                description="Pain relief and inflammation control"
                image={IMAGES.doctor}
                recommendations={[
                  "NSAIDs",
                  "Acetaminophen",
                  "Topical medications",
                  "Corticosteroid injections",
                ]}
              />
            </div>

            {/* Surgical Options */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Surgical Options
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={IMAGES.surgery}
                      alt="Knee Surgery"
                      className="rounded-xl mb-6"
                    />
                    <p className="text-gray-700">
                      Surgical intervention may be recommended when conservative
                      treatments don't provide adequate relief. The choice of
                      procedure depends on various factors including age,
                      activity level, and severity of OA.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Arthroscopy",
                        description:
                          "Minimally invasive procedure for minor repairs",
                      },
                      {
                        name: "Osteotomy",
                        description:
                          "Realignment of the joint to reduce pressure",
                      },
                      {
                        name: "Partial Knee Replacement",
                        description: "Replacement of only the damaged portion",
                      },
                      {
                        name: "Total Knee Replacement",
                        description: "Complete replacement of the knee joint",
                      },
                    ].map((surgery, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {surgery.name}
                        </h4>
                        <p className="text-gray-700">{surgery.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-24">
          <SectionTitle
            icon={<FaRegQuestionCircle />}
            title="Frequently Asked Questions"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Can knee OA be completely cured?",
                answer:
                  "While there is no complete cure for knee OA, the condition can be effectively managed through various treatments. The goal is to reduce pain, improve function, and slow the progression of the disease.",
              },
              {
                question: "Is exercise good for knee OA?",
                answer:
                  "Yes, appropriate exercise is beneficial for knee OA. Low-impact activities like swimming, cycling, and walking can help strengthen muscles, improve flexibility, and reduce pain.",
              },
              {
                question: "What are the best supplements for knee OA?",
                answer:
                  "Common supplements include glucosamine, chondroitin, and omega-3 fatty acids. However, it's important to consult with a healthcare provider before starting any supplement regimen.",
              },
              {
                question: "When should I consider surgery?",
                answer:
                  "Surgery may be considered when conservative treatments fail to provide adequate relief, and pain significantly affects daily activities. The decision should be made in consultation with your healthcare team.",
              },
            ].map((faq, index) => (
              <FAQCard
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ number, label, icon, description }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">{icon}</div>
        <h3 className="text-3xl font-bold text-gray-900">{number}</h3>
      </div>
      <p className="font-medium text-gray-800 mb-2">{label}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center mb-12">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function SymptomCard({ title, description, severity, icon }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{title}</h4>
          <p className="text-gray-600 mb-2">{description}</p>
          <span className="text-sm font-medium text-blue-600">
            Severity: {severity}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function StageCard({ stage, description, color, symptoms }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`bg-white rounded-xl p-6 shadow-md border-l-4 ${color}`}
    >
      <h4 className="text-lg font-semibold mb-2">{stage}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {symptoms.map((symptom, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <FaCheck className="text-green-500 mr-2" />
            {symptom}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DiagnosticCard({ title, description, steps }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <FaCheck className="text-green-500 mr-2" />
            {step}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TreatmentCard({ title, description, image, recommendations }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <FaCheck className="text-green-500 mr-2" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FAQCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <button
        className="w-full text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold">{question}</h4>
        {isOpen ? (
          <FaAngleUp className="text-gray-500" />
        ) : (
          <FaAngleDown className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 text-gray-600"
        >
          {answer}
        </motion.p>
      )}
    </motion.div>
  );
}
