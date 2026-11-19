import React, { useState } from 'react';
import { Language, UserProfile } from '../../types';
import { 
  GitBranch, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Code2, 
  Terminal, 
  BookOpen, 
  Trophy, 
  Award, 
  Zap, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface BranchRoadmapPageProps {
  lang: Language;
  userProfile: UserProfile | null;
  onNavigate: (page: string) => void;
}

interface RoadmapMilestone {
  id: string;
  semester: string;
  title: string;
  category: string;
  estHours: number;
  skillScoreGain: number;
  description: string;
  recommendedMooc: string;
  completed: boolean;
  tasks: string[];
}

export const BranchRoadmapPage: React.FC<BranchRoadmapPageProps> = ({
  lang,
  userProfile,
  onNavigate,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<'CSE' | 'AIML' | 'ECE' | 'CORE'>('CSE');

  // Milestone checklists state with localStorage persistence
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ks_completed_milestones');
      return saved ? JSON.parse(saved) : {
        'cse-01': true,
        'cse-02': true,
        'aiml-01': true,
        'ece-01': true
      };
    } catch {
      return { 'cse-01': true, 'cse-02': true };
    }
  });

  const handleToggleMilestone = (id: string) => {
    const updated = { ...completedMilestones, [id]: !completedMilestones[id] };
    setCompletedMilestones(updated);
    try {
      localStorage.setItem('ks_completed_milestones', JSON.stringify(updated));
    } catch {}
  };

  const roadmapsByBranch: Record<string, {
    title: string;
    subtitle: string;
    targetRole: string;
    avgTier1Package: string;
    milestones: RoadmapMilestone[];
  }> = {
    CSE: {
      title: 'B.Tech Computer Science & Engineering (Software & Systems)',
      subtitle: 'Engineered for Tier-1 Product Companies, SDE-1 Internships, and Distributed Cloud Architecture.',
      targetRole: 'Software Development Engineer (SDE-1)',
      avgTier1Package: '₹8.5 – ₹18.0 LPA',
      milestones: [
        {
          id: 'cse-01',
          semester: 'Semester 1 & 2',
          title: 'Algorithmic Problem Solving & Object-Oriented C++',
          category: 'Core Foundations',
          estHours: 120,
          skillScoreGain: 50,
          description: 'Master time and space complexity, recursion, pointers, and memory management in C++17.',
          recommendedMooc: 'NPTEL: Problem Solving through Programming in C (IIT Kharagpur)',
          completed: true,
          tasks: [
            'Time & Space Complexity analysis (Big-O, Omega, Theta)',
            'Pointers, dynamic heap allocation and RAII in C++',
            'Solve first 50 Easy LeetCode problems'
          ]
        },
        {
          id: 'cse-02',
          semester: 'Semester 3 (Current 2nd-Year Focus)',
          title: 'Data Structures Mastery (450 Striver SDE Sheet)',
          category: 'Competitive Programming',
          estHours: 160,
          skillScoreGain: 75,
          description: 'Non-linear data structures: Trees, Binary Search Trees, Heaps, and Graph Traversal (BFS/DFS).',
          recommendedMooc: 'NPTEL: Data Structures and Algorithms using C++ (IIT Kharagpur — 3 Credits)',
          completed: true,
          tasks: [
            'Arrays, Sliding Window, and 2-Pointer Techniques',
            'Binary Trees, LCA, Diameter, and Graph BFS/DFS Algorithms',
            'Dynamic Programming 1D/2D memoization and tabulation',
            'Reach 130+ solved problems on LeetCode / GFG'
          ]
        },
        {
          id: 'cse-03',
          semester: 'Semester 3 & 4 (2nd-Year Peak)',
          title: 'Full-Stack Architecture & Microservices (React + Node.js)',
          category: 'Software Engineering',
          estHours: 140,
          skillScoreGain: 80,
          description: 'Construct high-throughput web applications with REST APIs, PostgreSQL relational schema, and Redis caching.',
          recommendedMooc: 'Skill India Digital: Modern Full Stack Web Development with React & Node',
          completed: false,
          tasks: [
            'Component lifecycles, custom hooks, and Tailwind CSS in React 19',
            'Express / Fastify RESTful API design with JWT auth',
            'PostgreSQL relational modeling, foreign keys, and indexes',
            'Deploy Redis caching reducing query response latency by > 40%'
          ]
        },
        {
          id: 'cse-04',
          semester: 'Semester 4 (Upcoming Sophomore Milestone)',
          title: 'Core CS Trio: Operating Systems, DBMS & Computer Networks',
          category: 'University & Senate Electives',
          estHours: 110,
          skillScoreGain: 65,
          description: 'OS process scheduling, virtual memory, ACID database transactions, and TCP/IP protocol internals.',
          recommendedMooc: 'SWAYAM: Database Management System (IIT Madras — 3 Credits)',
          completed: false,
          tasks: [
            'Process synchronization, Semaphores, Deadlocks, and Threading',
            'Transaction isolation levels, B+ Trees, and SQL query execution plans',
            'Socket programming, HTTP/2, DNS resolution, and TCP handshake'
          ]
        },
        {
          id: 'cse-05',
          semester: 'Semester 5 & 6 (Pre-Placement)',
          title: 'Cloud DevOps, Docker, Kubernetes & High-Level System Design',
          category: 'Production Infrastructure',
          estHours: 150,
          skillScoreGain: 90,
          description: 'Containerize microservices, implement CI/CD with GitHub Actions, and design rate-limited distributed systems.',
          recommendedMooc: 'AWS Academy: Cloud Foundations & Container Microservices (Voucher)',
          completed: false,
          tasks: [
            'Multi-stage Dockerfile builds and Docker-Compose orchestration',
            'GitHub Actions automated linting, testing, and deployment pipeline',
            'High-Level System Design: Load Balancers, CDN, Caching, and Message Queues (Kafka)'
          ]
        }
      ]
    },
    AIML: {
      title: 'B.Tech AI & Data Science (Machine Learning & Vision)',
      subtitle: 'Engineered for Applied AI Engineers, Computer Vision Researchers, and MLOps Pipeline Architects.',
      targetRole: 'Machine Learning & Vision Engineer',
      avgTier1Package: '₹9.0 – ₹20.0 LPA',
      milestones: [
        {
          id: 'aiml-01',
          semester: 'Semester 1 & 2',
          title: 'Mathematical Foundations for AI (Linear Algebra & Calculus)',
          category: 'Core Mathematics',
          estHours: 110,
          skillScoreGain: 45,
          description: 'Matrix decompositions, Eigenvalues/Eigenvectors, partial derivatives, and gradient descent optimization.',
          recommendedMooc: 'NPTEL: Essential Mathematics for Machine Learning (IIT Roorkee)',
          completed: true,
          tasks: [
            'Matrix operations, SVD, and PCA dimensionality reduction',
            'Probability distributions, Bayes Theorem, and maximum likelihood',
            'Python NumPy & Pandas high-speed vectorized computation'
          ]
        },
        {
          id: 'aiml-02',
          semester: 'Semester 3 (Current 2nd-Year Focus)',
          title: 'Deep Learning & PyTorch Tensor Programming',
          category: 'Deep Learning Frameworks',
          estHours: 150,
          skillScoreGain: 85,
          description: 'Build and train Multilayer Perceptrons, Convolutional Neural Networks (CNNs), and optimize loss functions.',
          recommendedMooc: 'NPTEL: Deep Learning for Computer Vision (IIT Madras — 4 Credits)',
          completed: false,
          tasks: [
            'Backpropagation, autograd computation graph in PyTorch',
            'CNN architectures: ResNet, VGG, MobileNet for edge devices',
            'Overfitting mitigation: Dropout, Data Augmentation, and L2 Decay'
          ]
        },
        {
          id: 'aiml-03',
          semester: 'Semester 4',
          title: 'Computer Vision & Object Detection (OpenCV & YOLO)',
          category: 'Vision Systems',
          estHours: 130,
          skillScoreGain: 75,
          description: 'Deploy real-time campus gate license plate OCR and transit vehicle detection models at 30 FPS.',
          recommendedMooc: 'Skill India Digital: Computer Vision Applications with Python & OpenCV',
          completed: false,
          tasks: [
            'Image thresholding, contour extraction, and spatial filters',
            'YOLOv8 fine-tuning on custom transit dataset',
            'Inference optimization using ONNX Runtime and TensorRT'
          ]
        },
        {
          id: 'aiml-04',
          semester: 'Semester 5',
          title: 'Generative AI, Large Language Models & Vector Databases',
          category: 'State-of-the-Art AI',
          estHours: 140,
          skillScoreGain: 90,
          description: 'Transformer architectures, Attention mechanisms, LangChain RAG pipelines, and Milvus/ChromaDB indexing.',
          recommendedMooc: 'Google Career Certificate: Applied Data Science & AI Foundations',
          completed: false,
          tasks: [
            'Transformer encoder-decoder self-attention mechanics',
            'Build RAG pipeline answering queries from AKTU syllabus PDFs',
            '4-bit / 8-bit model quantization with vLLM engine'
          ]
        }
      ]
    },
    ECE: {
      title: 'B.Tech Electronics & Communication (Embedded IoT & VLSI)',
      subtitle: 'Engineered for Embedded Firmware Engineers, Robotics System Integrators, and Chip Designers.',
      targetRole: 'Embedded Firmware & Hardware Engineer',
      avgTier1Package: '₹7.5 – ₹16.0 LPA',
      milestones: [
        {
          id: 'ece-01',
          semester: 'Semester 1 & 2',
          title: 'Digital Electronics & Circuit Simulation',
          category: 'Hardware Basics',
          estHours: 100,
          skillScoreGain: 40,
          description: 'Boolean algebra, combinational logic, flip-flops, state machines, and SPICE circuit simulation.',
          recommendedMooc: 'NPTEL: Digital Electronic Circuits (IIT Kharagpur — 3 Credits)',
          completed: true,
          tasks: [
            'K-maps, multiplexers, decoders, and ALU design',
            'Sequential circuits: synchronous counters and shift registers',
            'Proteus / LTSpice circuit transient analysis'
          ]
        },
        {
          id: 'ece-02',
          semester: 'Semester 3 (Current 2nd-Year Focus)',
          title: 'Microcontroller Interfacing (STM32 & ESP32) in Embedded C',
          category: 'Microcontrollers',
          estHours: 140,
          skillScoreGain: 80,
          description: 'Bare-metal register programming, GPIO, Timers, PWM, ADC, and hardware communication buses (UART/SPI/I2C).',
          recommendedMooc: 'NPTEL: Embedded System Design with ARM & FreeRTOS (IIT Delhi — 3 Credits)',
          completed: false,
          tasks: [
            'STM32 ARM Cortex-M bare-metal register manipulation',
            'Interrupt Service Routines (ISR) and circular DMA buffers',
            'Interface GPS, ultrasonic, and accelerometer sensors via I2C'
          ]
        },
        {
          id: 'ece-03',
          semester: 'Semester 4',
          title: 'Real-Time Operating Systems (FreeRTOS) & Low-Power Telemetry',
          category: 'Firmware Concurrency',
          estHours: 130,
          skillScoreGain: 85,
          description: 'Preemptive multitasking, task priorities, queues, semaphores, mutexes, and ultra-low power Deep Sleep.',
          recommendedMooc: 'Cisco Networking Academy: IoT Fundamentals & Sensor Telemetry',
          completed: false,
          tasks: [
            'Multi-threaded FreeRTOS task scheduling with priority inversion prevention',
            'ESP32 deep sleep modes with RTC timer wakeups',
            'Stream telemetry over MQTT broker with QoS-1 delivery'
          ]
        },
        {
          id: 'ece-04',
          semester: 'Semester 5 & 6',
          title: 'Robotics Kinematics (ROS2) & Digital VLSI Verilog',
          category: 'Robotics & Silicon',
          estHours: 150,
          skillScoreGain: 90,
          description: 'ROS2 robotics publisher-subscriber nodes, Gazebo simulation, and Verilog HDL RTL synthesis on FPGA.',
          recommendedMooc: 'SWAYAM: Digital VLSI System Design (IIT Roorkee — 4 Credits)',
          completed: false,
          tasks: [
            'ROS2 Humble node architecture, topics, and service actions',
            'Verilog finite state machine design for UART transceiver',
            'FPGA synthesis and timing constraint verification'
          ]
        }
      ]
    },
    CORE: {
      title: 'B.Tech Core Engineering (Mechatronics & Smart EV Powertrains)',
      subtitle: 'Engineered for Electric Vehicle System Engineers, Autonomous Rover Designers, and Industrial Automation.',
      targetRole: 'Smart Automation & EV Powertrain Engineer',
      avgTier1Package: '₹6.5 – ₹14.0 LPA',
      milestones: [
        {
          id: 'core-01',
          semester: 'Semester 1 & 2',
          title: 'Computer Aided Design (CAD) & Finite Element Analysis',
          category: 'Design Engineering',
          estHours: 110,
          skillScoreGain: 45,
          description: '3D parametric solid modeling, assembly constraints, and structural stress simulation in SolidWorks/ANSYS.',
          recommendedMooc: 'NPTEL: Fundamentals of CAD/CAM (IIT Guwahati)',
          completed: true,
          tasks: [
            'Parametric sketch constraints and complex feature lofts',
            'Static structural stress and von-Mises deformation analysis',
            'Rapid prototyping with 3D slicing for campus hardware'
          ]
        },
        {
          id: 'core-02',
          semester: 'Semester 3 (Current 2nd-Year Focus)',
          title: 'Electric Vehicle Powertrains & Battery Management Systems (BMS)',
          category: 'Clean Energy & EV',
          estHours: 140,
          skillScoreGain: 85,
          description: 'Li-ion cell chemistry, State-of-Charge (SoC) estimation, thermal runaway prevention, and CAN bus telemetry.',
          recommendedMooc: 'NPTEL: Electric Vehicles - Part 1 (IIT Madras — 3 Credits)',
          completed: false,
          tasks: [
            'Battery pack sizing and voltage-capacity calculations',
            'Coulomb counting and Kalman filter algorithms for SoC estimation',
            'Interface passive cell balancing circuitry and thermal cutoffs'
          ]
        },
        {
          id: 'core-03',
          semester: 'Semester 4 & 5',
          title: 'Industrial Automation (PLC, SCADA & Industrial IoT)',
          category: 'Smart Manufacturing',
          estHours: 130,
          skillScoreGain: 80,
          description: 'Ladder logic programming for PLCs, SCADA supervisory dashboards, and Modbus/OPC-UA factory sensors.',
          recommendedMooc: 'Skill India Digital: Industrial Automation & PLC Programming',
          completed: false,
          tasks: [
            'Ladder diagram logic for motor speed control and safety interlocks',
            'Design SCADA HMI graphical screen tracking factory telemetry',
            'Deploy Modbus TCP gateway streaming machine vibration data'
          ]
        }
      ]
    }
  };

  const activeRoadmap = roadmapsByBranch[selectedBranch];
  const totalMilestones = activeRoadmap.milestones.length;
  const completedCount = activeRoadmap.milestones.filter(m => completedMilestones[m.id]).length;
  const progressPct = Math.round((completedCount / totalMilestones) * 100);
  const totalScoreGained = activeRoadmap.milestones
    .filter(m => completedMilestones[m.id])
    .reduce((sum, m) => sum + m.skillScoreGain, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 sm:py-6 animate-in fade-in">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-blue-700 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>ADVANCED FEATURE 02</span>
            <span>·</span>
            <span>AICTE & AKTU ENGINEERING SKILL LADDERS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            {lang === 'en' ? 'B.Tech Engineering Specialization Roadmaps' : 'बी.टेक इंजीनियरिंग ब्रांच रोडमैप्स'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {lang === 'en'
              ? 'Semester-by-semester technical milestones, Striver 450 DSA trackers, NPTEL credit mapping, and Tier-1 placement milestones.'
              : 'सेमेस्टर-वार तकनीकी माइलस्टोन्स, 450 डीएसए शीट ट्रैकर और एनपीटीईएल क्रेडिट ट्रांसफर गाइड।'}
          </p>
        </div>

        {/* Live Progress Summary Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs font-mono-data">
            {progressPct}%
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-900 font-mono-data">
              {completedCount} of {totalMilestones} Milestones Cleared
            </div>
            <div className="text-[11px] text-emerald-700 font-bold font-mono-data">
              +{totalScoreGained} Skill Score Earned
            </div>
          </div>
        </div>
      </div>

      {/* 2. Branch Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'CSE', label: 'B.Tech CSE & IT', icon: Code2, desc: 'SDE-1 & Systems' },
          { id: 'AIML', label: 'B.Tech AI & Data Science', icon: Sparkles, desc: 'MLOps & Vision' },
          { id: 'ECE', label: 'B.Tech ECE & IoT', icon: Cpu, desc: 'Embedded Firmware' },
          { id: 'CORE', label: 'B.Tech Core / EV', icon: Zap, desc: 'Robotics & Clean Energy' }
        ].map(tab => {
          const isSelected = selectedBranch === tab.id;
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedBranch(tab.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 text-slate-800'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">{tab.label}</div>
                <div className={`text-[10.5px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {tab.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Branch Overview Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono-data uppercase tracking-wider text-blue-300 font-bold block mb-1">
            TARGET TIER-1 RECRUITMENT BENCHMARK
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            {activeRoadmap.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {activeRoadmap.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs">
            <span className="text-[10px] text-slate-300 block font-mono-data">TARGET ROLE</span>
            <strong className="text-white font-bold">{activeRoadmap.targetRole}</strong>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-xs">
            <span className="text-[10px] text-emerald-300 block font-mono-data">PACKAGE RANGE</span>
            <strong className="text-emerald-300 font-bold font-mono-data">{activeRoadmap.avgTier1Package}</strong>
          </div>
        </div>
      </div>

      {/* 4. Interactive Timeline Milestones */}
      <div className="space-y-4">
        {activeRoadmap.milestones.map((m, idx) => {
          const isDone = completedMilestones[m.id];
          return (
            <div
              key={m.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-white border-emerald-200/90 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10.5px] font-mono-data font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {m.semester}
                    </span>
                    <span className="text-[10.5px] font-mono-data text-slate-500 font-medium">
                      {m.category}
                    </span>
                    <span className="text-[10.5px] font-mono-data text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +{m.skillScoreGain} Skill Pts
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {idx + 1}. {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                {/* Mark Complete Checkbox Button */}
                <button
                  type="button"
                  onClick={() => handleToggleMilestone(m.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Milestone Verified</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-slate-400" />
                      <span>Mark Cleared</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sub-tasks and Recommended Course */}
              <div className="pt-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-1.5">
                  <span className="text-[10px] font-mono-data font-bold text-slate-400 uppercase tracking-wider block">
                    Engineering Tasks & Competencies:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {m.tasks.map((task, tidx) => (
                      <li key={tidx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-mono-data text-blue-700 font-bold block uppercase">
                    Recommended Senate MOOC:
                  </span>
                  <div className="text-[11px] font-semibold text-slate-900 leading-snug">
                    {m.recommendedMooc}
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('courses')}
                    className="text-[10.5px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-0.5 cursor-pointer"
                  >
                    <span>View in 24+ Course Hub</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
