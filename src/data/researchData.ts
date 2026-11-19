import { Persona, SkillItem, JobListing, CourseRecommendation, ColorToken, TypographySpec, IconEmojiSpec } from '../types';

export const PERSONAS: Persona[] = [
  {
    id: 'priya', // Key retained for complete backward compatibility across existing routes
    name: 'Aman Sharma',
    age: 20,
    location: 'IET Campus, Sitapur Road, Lucknow',
    role: '2nd-Year B.Tech Computer Science (3rd Sem)',
    roleHi: 'द्वितीय वर्ष बी.टेक कंप्यूटर साइंस (तृतीय सेमेस्टर)',
    device: 'Linux / Windows ThinkPad + Android Phone',
    connectivity: 'Campus Gigabit Wi-Fi + High-Speed 5G',
    primaryGoal: 'Wants to crack Tier-1 SDE internship and verify if his DSA, React and Docker projects pass recruiter code audits',
    primaryGoalHi: 'टियर-1 एसडीई इंटर्नशिप पाना और यह जांचना कि क्या उनके डीएसए, रिएक्ट और डॉकर प्रोजेक्ट्स रिक्रूटर्स के मानकों पर खरे उतरते हैं',
    painPoint: 'Generic job portals mix B.Tech software roles with non-technical support jobs; lacks objective AST verification for his GitHub repos',
    painPointHi: 'सामान्य जॉब पोर्टल तकनीकी सॉफ्टवेयर रोल्स को गैर-तकनीकी नौकरियों के साथ मिला देते हैं; गिटहब कोड के लिए कोई निष्पक्ष सत्यापन उपलब्ध नहीं है',
    designRule: 'Requires rigorous code audit visualizations, time-complexity metrics, AICTE semester credit mappings, and Taleo/Workday ATS benchmarking.',
    baselineScore: 78,
    targetRole: 'Junior Software Development Engineer (SDE-1) / Cloud Backend'
  },
  {
    id: 'rahul', // Key retained for backward compatibility
    name: 'Rhea Verma',
    age: 20,
    location: 'KNIT Sultanpur / AKTU Affiliated Hub',
    role: '2nd-Year B.Tech AI & Data Science (3rd Sem)',
    roleHi: 'द्वितीय वर्ष बी.टेक आर्टिफिशियल इंटेलिजेंस व डेटा साइंस',
    device: 'MacBook Air M2 + 5G Mobile Hotspot',
    connectivity: 'Campus Lab High-Bandwidth LAN',
    primaryGoal: 'Wants hands-on PyTorch deep learning and computer vision research internships with verified academic credits',
    primaryGoalHi: 'सत्यापित क्रेडिट्स के साथ पायटॉर्च डीप लर्निंग और कंप्यूटर विज़न रिसर्च इंटर्नशिप प्राप्त करना',
    painPoint: 'Curriculum delays AI frameworks until 7th semester; needs 2nd-year exposure to MLOps, vector embeddings, and real datasets',
    painPointHi: 'कॉलेज सिलेबस में आधुनिक एआई देर से आता है; द्वितीय वर्ष में ही एमएलऑप्स, एआई पाइपलाइन और लाइव डेटा पर काम करने की आवश्यकता है',
    designRule: 'Demands scientific metric displays (F1-score, loss curves, model quantization specs), NPTEL IIT credit transfer tracking, and SIH team incubator.',
    baselineScore: 82,
    targetRole: 'Associate Machine Learning & Computer Vision Engineer'
  },
  {
    id: 'sunita', // Key retained for backward compatibility
    name: 'Arjun Patel',
    age: 20,
    location: 'BIET Jhansi / AKTU Technology Corridor',
    role: '2nd-Year B.Tech ECE & Embedded Systems (3rd Sem)',
    roleHi: 'द्वितीय वर्ष बी.टेक इलेक्ट्रॉनिक्स व एम्बेडेड सिस्टम्स',
    device: 'Dual-Boot Ubuntu Laptop + Logic Analyzer',
    connectivity: 'Hardware Lab Wi-Fi + 4G Mobile',
    primaryGoal: 'Wants firmware and edge IoT hardware internships in robotics, smart EV telemetry, and RTOS microcontrollers',
    primaryGoalHi: 'रोबोटिक्स, स्मार्ट ईवी टेलीमेट्री और आरटीओएस माइक्रोकंट्रोलर में फर्मवेयर व हार्डवेयर इंटर्नशिप प्राप्त करना',
    painPoint: 'Most campus drives focus solely on generic IT; lacks a dedicated platform testing hardware schematics, FreeRTOS, and MQTT sensors',
    painPointHi: 'अधिकांश कैंपस प्लेसमेंट केवल सामान्य आईटी तक सीमित रहते हैं; हार्डवेयर स्कीमेटिक्स, फ्री-आरटीओएस और आईओटी सेंसर्स के परीक्षण का अभाव',
    designRule: 'Highlights hardware pinouts, circuit diagram validation, oscilloscope telemetry, and AICTE credit-transferable embedded certifications.',
    baselineScore: 74,
    targetRole: 'Embedded Firmware & Edge AI Systems Engineer'
  }
];

export const SKILLS_DATA: Record<string, SkillItem[]> = {
  priya: [
    { id: 's1', name: 'Data Structures & Algorithms (C++/Java)', nameHi: 'डेटा स्ट्रक्चर्स एवं एल्गोरिदम (C++/Java)', category: 'Core CS', requiredLevel: 90, currentLevel: 74, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 16, wageUplift: '+₹18,000/mo' },
    { id: 's2', name: 'Full-Stack Architecture (React & Node.js)', nameHi: 'फुल-स्टैक आर्किटेक्चर (React व Node.js)', category: 'Software', requiredLevel: 88, currentLevel: 70, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 18, wageUplift: '+₹14,000/mo' },
    { id: 's3', name: 'PostgreSQL & Database Indexing', nameHi: 'पोस्टग्रेएसक्यूएल व डेटाबेस इंडेक्सिंग', category: 'Databases', requiredLevel: 82, currentLevel: 62, marketDemand: 'High', marketDemandHi: 'उच्च मांग', gap: 20, wageUplift: '+₹10,000/mo' },
    { id: 's4', name: 'Docker & Containerization', nameHi: 'डॉकर व कंटेनर आर्किटेक्चर', category: 'DevOps', requiredLevel: 80, currentLevel: 45, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 35, wageUplift: '+₹12,500/mo' },
    { id: 's5', name: 'System Design & Redis Distributed Cache', nameHi: 'सिस्टम डिज़ाइन एवं रेडिस कैशिंग', category: 'Architecture', requiredLevel: 78, currentLevel: 38, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 40, wageUplift: '+₹16,000/mo' }
  ],
  rahul: [
    { id: 's6', name: 'Deep Learning & PyTorch Framework', nameHi: 'डीप लर्निंग व पायटॉर्च फ्रेमवर्क', category: 'AI & ML', requiredLevel: 90, currentLevel: 68, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 22, wageUplift: '+₹20,000/mo' },
    { id: 's7', name: 'Computer Vision with OpenCV & YOLO', nameHi: 'कंप्यूटर विज़न (OpenCV व YOLO)', category: 'Vision AI', requiredLevel: 85, currentLevel: 60, marketDemand: 'High', marketDemandHi: 'उच्च मांग', gap: 25, wageUplift: '+₹15,000/mo' },
    { id: 's8', name: 'Fast-API & MLOps Model Serving', nameHi: 'फास्ट-एपीआई व एमएल मॉडल सर्विंग', category: 'MLOps', requiredLevel: 82, currentLevel: 48, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 34, wageUplift: '+₹14,000/mo' },
    { id: 's9', name: 'Vector Embeddings & RAG Architectures', nameHi: 'वेक्टर एम्बेडिंग व आरएजी आर्किटेक्चर', category: 'Generative AI', requiredLevel: 85, currentLevel: 40, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 45, wageUplift: '+₹18,000/mo' },
    { id: 's10', name: 'Applied Mathematics & Linear Algebra', nameHi: 'लीनियर अलजेब्रा व प्रायिकता सिद्धांत', category: 'Math Foundations', requiredLevel: 85, currentLevel: 75, marketDemand: 'Moderate', marketDemandHi: 'मध्यम', gap: 10, wageUplift: '+₹8,000/mo' }
  ],
  sunita: [
    { id: 's11', name: 'Embedded C & FreeRTOS Concurrency', nameHi: 'एम्बेडेड सी एवं फ्री-आरटीओएस', category: 'Firmware', requiredLevel: 88, currentLevel: 58, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 30, wageUplift: '+₹15,000/mo' },
    { id: 's12', name: 'STM32 / ESP32 Hardware Interfacing', nameHi: 'STM32 व ESP32 माइक्रोकंट्रोलर', category: 'Hardware', requiredLevel: 85, currentLevel: 62, marketDemand: 'Critical', marketDemandHi: 'अति आवश्यक', gap: 23, wageUplift: '+₹12,000/mo' },
    { id: 's13', name: 'IoT Protocols (MQTT, CoAP, BLE, CAN)', nameHi: 'आईओटी प्रोटोकॉल्स (MQTT, CAN, BLE)', category: 'Protocols', requiredLevel: 82, currentLevel: 50, marketDemand: 'High', marketDemandHi: 'उच्च मांग', gap: 32, wageUplift: '+₹11,000/mo' },
    { id: 's14', name: 'Digital Circuit Design & Verilog HDL', nameHi: 'डिजिटल सर्किट डिज़ाइन व वेरिलॉग', category: 'VLSI', requiredLevel: 80, currentLevel: 40, marketDemand: 'High', marketDemandHi: 'उच्च मांग', gap: 40, wageUplift: '+₹14,000/mo' }
  ]
};

export const JOBS_DATA: Record<string, JobListing[]> = {
  priya: [
    {
      id: 'j1',
      title: 'Junior SDE Intern — Cloud Platforms',
      titleHi: 'जूनियर एसडीई इंटर्न — क्लाउड प्लेटफॉर्म्स',
      employer: 'TCS Innovation & Research Labs',
      location: 'Gomti Nagar, Lucknow',
      locationHi: 'गोमती नगर, लखनऊ',
      distanceKm: 6.2,
      stipend: '₹35,000 – ₹42,000 / mo',
      type: 'Direct Job',
      typeHi: 'सीधी नौकरी / इंटर्नशिप',
      skillsMatched: ['Data Structures & Algorithms', 'React & Node.js'],
      skillsMissing: ['Redis Distributed Cache', 'Docker'],
      contactMethod: 'WhatsApp',
      verifiedGovt: true,
      vacancies: 6
    },
    {
      id: 'j2',
      title: 'Backend Engineering Intern (Distributed Systems)',
      titleHi: 'बैकएंड इंजीनियरिंग इंटर्न (डिस्ट्रिब्यूटेड सिस्टम्स)',
      employer: 'Swiggy Engineering Hub',
      location: 'Lucknow Tech Corridor (Hybrid)',
      locationHi: 'लखनऊ टेक कॉरिडोर (हाइब्रिड)',
      distanceKm: 4.8,
      stipend: '₹32,000 / mo (PPO Guaranteed)',
      type: 'Apprenticeship',
      typeHi: 'प्री-प्लेसमेंट इंटर्नशिप (PPO)',
      skillsMatched: ['PostgreSQL', 'Full-Stack Architecture'],
      skillsMissing: ['System Design'],
      contactMethod: 'Direct Call',
      verifiedGovt: true,
      vacancies: 4
    },
    {
      id: 'j3',
      title: 'Cloud DevOps & Site Reliability Intern',
      titleHi: 'क्लाउड देवऑप्स व एसआरई इंटर्न',
      employer: 'Razorpay Infrastructure Labs',
      location: 'Noida / Lucknow Remote',
      locationHi: 'नोएडा / लखनऊ रिमोट',
      distanceKm: 12.0,
      stipend: '₹38,000 / mo + Laptop & Cloud Credits',
      type: 'Direct Job',
      typeHi: 'सीधी नौकरी',
      skillsMatched: ['Data Structures & Algorithms'],
      skillsMissing: ['Docker & Containerization'],
      contactMethod: 'WhatsApp',
      verifiedGovt: true,
      vacancies: 3
    }
  ],
  rahul: [
    {
      id: 'j4',
      title: 'Computer Vision & Deep Learning Intern',
      titleHi: 'कंप्यूटर विज़न व डीप लर्निंग इंटर्न',
      employer: 'Tata Elxsi Autonomous AI Hub',
      location: 'Lucknow R&D Corridor',
      locationHi: 'लखनऊ आरएंडडी कॉरिडोर',
      distanceKm: 8.5,
      stipend: '₹35,000 / mo + Compute Access',
      type: 'Apprenticeship',
      typeHi: 'रिसर्च इंटर्नशिप',
      skillsMatched: ['Deep Learning & PyTorch', 'Computer Vision'],
      skillsMissing: ['Fast-API Model Serving'],
      contactMethod: 'WhatsApp',
      verifiedGovt: true,
      vacancies: 5
    },
    {
      id: 'j5',
      title: 'Generative AI & LLM Systems Trainee',
      titleHi: 'जेनरेटिव एआई व एलएलएम सिस्टम्स प्रशिक्षु',
      employer: 'Infosys Springboard AI Innovation Hub',
      location: 'Kanpur Road Tech Park, Lucknow',
      locationHi: 'कानपुर रोड टेक पार्क, लखनऊ',
      distanceKm: 9.5,
      stipend: '₹30,000 / mo',
      type: 'Direct Job',
      typeHi: 'सीधी नौकरी',
      skillsMatched: ['Deep Learning & PyTorch', 'Applied Mathematics'],
      skillsMissing: ['Vector Embeddings & RAG'],
      contactMethod: 'Direct Call',
      verifiedGovt: true,
      vacancies: 4
    },
    {
      id: 'j6',
      title: 'Machine Learning Data Pipeline Intern',
      titleHi: 'एमएल डेटा पाइपलाइन इंटर्न',
      employer: 'Zomato Machine Learning Center',
      location: 'Remote / Lucknow Co-Working',
      locationHi: 'रिमोट / लखनऊ को-वर्किंग',
      distanceKm: 5.0,
      stipend: '₹28,000 / mo',
      type: 'Trainee',
      typeHi: 'प्रशिक्षु',
      skillsMatched: ['Applied Mathematics'],
      skillsMissing: ['Fast-API Model Serving'],
      contactMethod: 'In-Person',
      verifiedGovt: true,
      vacancies: 3
    }
  ],
  sunita: [
    {
      id: 'j7',
      title: 'Embedded Firmware & RTOS Engineer Intern',
      titleHi: 'एम्बेडेड फर्मवेयर व आरटीओएस इंजीनियर इंटर्न',
      employer: 'Havells R&D Center (IoT Systems)',
      location: 'Noida / Greater Noida (Hybrid)',
      locationHi: 'नोएडा / ग्रेटर नोएडा (हाइब्रिड)',
      distanceKm: 14.2,
      stipend: '₹28,000 / mo + Hardware Kit',
      type: 'Trainee',
      typeHi: 'प्रशिक्षु',
      skillsMatched: ['Embedded C', 'STM32 / ESP32'],
      skillsMissing: ['IoT Protocols (MQTT/CAN)'],
      contactMethod: 'In-Person',
      verifiedGovt: true,
      vacancies: 4
    },
    {
      id: 'j8',
      title: 'Robotics & Autonomous Rover Firmware Trainee',
      titleHi: 'रोबोटिक्स व ऑटोनॉमस रोवर फर्मवेयर प्रशिक्षु',
      employer: 'Tech Mahindra Defense & Robotics',
      location: 'Kanpur Industrial Corridor',
      locationHi: 'कानपुर इंडस्ट्रियल कॉरिडोर',
      distanceKm: 18.0,
      stipend: '₹30,000 / mo',
      type: 'Direct Job',
      typeHi: 'सीधी नौकरी',
      skillsMatched: ['STM32 / ESP32'],
      skillsMissing: ['Digital Circuit Design & Verilog'],
      contactMethod: 'WhatsApp',
      verifiedGovt: true,
      vacancies: 2
    }
  ]
};

export const COURSES_DATA: Record<string, CourseRecommendation[]> = {
  priya: [
    {
      id: 'c1',
      title: 'NPTEL: Data Structures & Algorithms Using C++ (IIT Kharagpur)',
      titleHi: 'एनपीटीईएल: डेटा स्ट्रक्चर्स एवं एल्गोरिदम (आईआईटी खड़गपुर)',
      provider: 'NPTEL / SWAYAM (AICTE 3 Credits)',
      durationHours: 60,
      mode: 'Academic Mooc + Proctored Exam',
      modeHi: 'अकादमिक मूक + प्राक्टर्ड परीक्षा',
      cost: 'Free (Credit Transferrable)',
      costHi: 'निःशुल्क (क्रेडिट ट्रांसफर योग्य)',
      certification: 'Ministry of Education & IIT Kharagpur Certificate',
      skillsCovered: ['Data Structures & Algorithms', 'Time Complexity', 'Trees & Graphs', 'Dynamic Programming'],
      addressesGap: 'Closes 16% gap in DSA; directly transferable as 3 B.Tech semester credits on AKTU marksheet'
    },
    {
      id: 'c2',
      title: 'AWS Academy: Cloud Foundations & Container Microservices',
      titleHi: 'एडब्ल्यूएस एकेडमी: क्लाउड फाउंडेशन व माइक्रोसर्विसेज',
      provider: 'AWS Academy & Amazon Web Services',
      durationHours: 40,
      mode: 'Cloud Sandbox Labs + Projects',
      modeHi: 'क्लाउड सैंडबॉक्स लैब्स + प्रोजेक्ट्स',
      cost: '100% Free for College Students',
      costHi: 'छात्रों के लिए पूर्णतः निःशुल्क',
      certification: 'AWS Academy Cloud Graduate & Voucher',
      skillsCovered: ['Docker', 'AWS EC2', 'Microservices', 'System Design'],
      addressesGap: 'Closes 35% Docker and 40% System Design deficit; +₹16,000/mo package impact'
    }
  ],
  rahul: [
    {
      id: 'c3',
      title: 'NPTEL: Deep Learning for Computer Vision (IIT Madras)',
      titleHi: 'एनपीटीईएल: डीप लर्निंग एवं कंप्यूटर विज़न (आईआईटी मद्रास)',
      provider: 'NPTEL / SWAYAM (AICTE 4 Credits)',
      durationHours: 60,
      mode: 'Academic Lab + GPU Notebooks',
      modeHi: 'अकादमिक लैब + जीपीयू नोटबुक्स',
      cost: 'Free (College Credit Transfer)',
      costHi: 'निःशुल्क (कॉलेज क्रेडिट ट्रांसफर)',
      certification: 'NPTEL Elite Certificate (IIT Madras)',
      skillsCovered: ['PyTorch', 'Convolutional Networks', 'OpenCV', 'YOLO Object Detection'],
      addressesGap: 'Closes 22% PyTorch and 25% Vision gap; fulfills 4-credit professional elective requirement'
    }
  ],
  sunita: [
    {
      id: 'c4',
      title: 'NPTEL: Embedded System Design with ARM & FreeRTOS (IIT Delhi)',
      titleHi: 'एनपीटीईएल: एम्बेडेड सिस्टम डिज़ाइन (आईआईटी दिल्ली)',
      provider: 'NPTEL / SWAYAM (AICTE 3 Credits)',
      durationHours: 45,
      mode: 'Hardware Simulation + Firmware Lab',
      modeHi: 'हार्डवेयर सिमुलेशन + फर्मवेयर लैब',
      cost: 'Free (Credit Transferrable)',
      costHi: 'निःशुल्क (क्रेडिट ट्रांसफर योग्य)',
      certification: 'IIT Delhi & AICTE Joint Certification',
      skillsCovered: ['Embedded C', 'FreeRTOS', 'STM32 Microcontrollers', 'Hardware Interfacing'],
      addressesGap: 'Closes 30% FreeRTOS concurrency deficit; directly unlocks ₹30,000/mo robotics internships'
    }
  ]
};

export const COLOR_TOKENS: ColorToken[] = [
  { name: 'Navy Deep Canvas', hex: '#0F172A', role: 'Institutional Anchor Surface' },
  { name: 'Royal Electric Blue', hex: '#2563EB', role: 'Primary Engineering Action' },
  { name: 'Emerald Verification', hex: '#10B981', role: 'Placement Cell & T&P Audit Status' },
  { name: 'Slate Neutral Card', hex: '#F8FAFC', role: 'Readable Elevated Surface' },
  { name: 'Amber Alert Accent', hex: '#F59E0B', role: 'Skill Gap & Deadline Alerts' }
];

export const TYPOGRAPHY_SPECS: TypographySpec[] = [
  { name: 'Display Heading', font: 'Plus Jakarta Sans', weight: 'Bold 700', size: '28px / 36px', usage: 'Institutional Hero Titles' },
  { name: 'Section Header', font: 'Plus Jakarta Sans', weight: 'Bold 600', size: '20px / 28px', usage: 'Pillar Dashboards & Tabs' },
  { name: 'Data / Code / Metrics', font: 'JetBrains Mono', weight: 'Medium 500 / Bold 700', size: '13px / 18px', usage: 'Skill Scores, Bus ETAs, API Payloads' },
  { name: 'Vernacular Devanagari', font: 'Noto Sans Devanagari', weight: 'Medium 500', size: '14px / 22px', usage: 'Bilingual Hindi Labels & Tooltips' }
];

export const ICON_EMOJI_SPECS: IconEmojiSpec[] = [
  { name: 'Code Proof-of-Work', lucideIcon: 'Code2', semanticRole: 'GitHub AST code audits' },
  { name: 'Campus Bus Telemetry', lucideIcon: 'Bus', semanticRole: 'Real-time GPS bus radar' },
  { name: 'SIH Hackathon Arena', lucideIcon: 'Trophy', semanticRole: 'Smart India Hackathon 2026' },
  { name: 'ATS Resume Engine', lucideIcon: 'FileText', semanticRole: 'Taleo/Workday optimization' },
  { name: 'PayPal REST Rail', lucideIcon: 'CreditCard', semanticRole: 'Instant international disbursements' }
];


export const ICON_EMOJI_MATRIX = [
  {
    trade: 'Full-Stack Software Engineering',
    tradeHi: 'सॉफ्टवेयर इंजीनियरिंग व सिस्टम्स',
    emoji: '💻',
    svgIconName: 'Code2 / Terminal',
    semioticMeaning: 'Source code, AST static analysis, high-throughput microservices.',
    comprehensionRate: '99.2% across engineering students',
    avoidCliché: 'Avoid abstract gears; use terminal brackets and code syntax.'
  },
  {
    trade: 'AI, Machine Learning & Vision',
    tradeHi: 'आर्टिफिशियल इंटेलिजेंस व विज़न',
    emoji: '🧠',
    svgIconName: 'BrainCircuit / Sparkles',
    semioticMeaning: 'Neural networks, PyTorch tensors, computer vision.',
    comprehensionRate: '98.5% across B.Tech AI students',
    avoidCliché: 'Avoid magic wands; use neural nodes and data tensors.'
  },
  {
    trade: 'Embedded IoT & Robotics',
    tradeHi: 'एम्बेडेड आईओटी व रोबोटिक्स',
    emoji: '⚡',
    svgIconName: 'Cpu / Zap',
    semioticMeaning: 'Microcontrollers, FreeRTOS, MQTT sensors, robotics.',
    comprehensionRate: '97.8% across ECE engineers',
    avoidCliché: 'Avoid generic green leaves; use silicon chips and circuit traces.'
  }
];

export const BENCHMARK_COMPARISON = [
  {
    dimension: 'Target Demographic & Curriculum',
    existingPortals: 'General graduates, vocational diplomas, manual labor.',
    genericAiSlop: 'Generic chatbots with zero university syllabus context.',
    kaushalSetuNextGen: 'Exclusively B.Tech engineering undergraduates (CSE, AIML, ECE, IT, Core) with AICTE 3-4 MOOC credit mapping.'
  },
  {
    dimension: 'Proof of Work & Code Verification',
    existingPortals: 'Static text resumes on PDFs; zero verifiable code proof-of-work.',
    genericAiSlop: 'Hallucinated arbitrary ratings with no AST code analysis.',
    kaushalSetuNextGen: 'Automated GitHub AST commit auditing, 134 DSA test case validation, and Taleo ATS 91% score.'
  },
  {
    dimension: 'Campus Mobility & Utility',
    existingPortals: 'Disconnected job search apps with zero campus day-to-day utility.',
    genericAiSlop: 'Theoretical dashboards never used by real students.',
    kaushalSetuNextGen: 'Live Highway Gate congestion meters (85% rerouting) and 6 campus bus routes with ETAs for 9:00 AM labs.'
  }
];
