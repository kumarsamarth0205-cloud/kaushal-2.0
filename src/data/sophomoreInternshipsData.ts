export interface SophomoreInternship {
  id: string;
  title: string;
  titleHi: string;
  company: string;
  location: string;
  locationHi: string;
  mode: 'Remote' | 'Hybrid' | 'On-Site';
  stipend: string;
  stipendAmount: number;
  duration: string;
  eligibility: string;
  eligibilityHi: string;
  experienceRequired: '0-1 Years (Sophomore Friendly)';
  skills: string[];
  openings: number;
  tpCellVerified: boolean;
  deadline: string;
  description: string;
  descriptionHi: string;
  officialPortalUrl?: string;
  ppoEligible: boolean;
}

export const SOPHOMORE_INTERNSHIPS_DATA: SophomoreInternship[] = [
  {
    id: 'INT-SOPH-01',
    title: 'Junior React & TypeScript Front-End Intern',
    titleHi: 'जूनियर रिएक्ट एवं टाइपस्क्रिप्ट फ्रंट-एंड इंटर्न',
    company: 'Tata Consultancy Services (TCS Innovation Labs)',
    location: 'Lucknow / Noida Hub',
    locationHi: 'लखनऊ / नोएडा हब',
    mode: 'Hybrid',
    stipend: '₹15,000 / Month + PPO FastTrack',
    stipendAmount: 15000,
    duration: '6 Months',
    eligibility: '2nd-Year B.Tech / BCA (3rd & 4th Sem) · Zero Experience Barrier',
    eligibilityHi: 'द्वितीय वर्ष बी.टेक / बीसीए (३रे व ४थे सेमेस्टर के छात्र)',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Git Workflow'],
    openings: 24,
    tpCellVerified: true,
    deadline: 'Dec 15, 2026',
    description: 'Work directly alongside senior architects developing citizen-facing UI portals with clean state management and micro-frontends.',
    descriptionHi: 'नागरिक सेवा पोर्टल्स के लिए स्वच्छ और रिस्पॉन्सिव वेब यूआई का विकास।',
    ppoEligible: true
  },
  {
    id: 'INT-SOPH-02',
    title: 'Node.js & PostgreSQL Backend Trainee',
    titleHi: 'नोड.जेएस एवं पोस्टग्रेसक्यूएल बैकएंड ट्रेनी',
    company: 'Kedia Logistics & Cold Chain Tech Lab',
    location: 'Transport Nagar, Lucknow',
    locationHi: 'ट्रांसपोर्ट नगर, लखनऊ',
    mode: 'On-Site',
    stipend: '₹12,500 / Month Fixed',
    stipendAmount: 12500,
    duration: '3 Months',
    eligibility: 'Sophomore CS/IT Students with solid database fundamentals',
    eligibilityHi: 'कंप्यूटर साइंस / आईटी के छात्र जिन्हें डेटाबेस का ज्ञान हो',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'RESTful APIs', 'JWT Auth'],
    openings: 12,
    tpCellVerified: true,
    deadline: 'Dec 10, 2026',
    description: 'Build real-time fleet telemetry APIs and cold-storage temperature monitoring services handling 50,000+ daily events.',
    descriptionHi: 'कोल्ड-स्टोरेज और वाहन ट्रैकिंग हेतु रीयल-टाइम एपीआई का निर्माण।',
    ppoEligible: true
  },
  {
    id: 'INT-SOPH-03',
    title: 'Clean Energy Telemetry & IoT Field Apprentice',
    titleHi: 'क्लीन एनर्जी टेलीमेट्री एवं आईओटी फील्ड अप्रेंटिस',
    company: 'Tata Power Solar Regional Engineering Cell',
    location: 'Panki Industrial Area, Kanpur',
    locationHi: 'पनकी औद्योगिक क्षेत्र, कानपुर',
    mode: 'Hybrid',
    stipend: '₹14,500 / Month + Safety Kit',
    stipendAmount: 14500,
    duration: '6 Months',
    eligibility: '2nd-Year Electrical, ECE, or Mechanical Diploma/Degree',
    eligibilityHi: 'द्वितीय वर्ष इलेक्ट्रिकल, ईसीई अथवा मैकेनिकल छात्र',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['Python 3', 'Modbus Protocols', 'Solar Inverter Diagnostics', 'Data Logging'],
    openings: 16,
    tpCellVerified: true,
    deadline: 'Dec 18, 2026',
    description: 'Monitor high-voltage rooftop PV grid health, configure inverter telemetry sensors, and write automated diagnostic scripts.',
    descriptionHi: 'सोलर पीवी ग्रिड स्वास्थ्य की निगरानी और स्वचालित डायग्नोस्टिक स्क्रिप्टिंग।',
    ppoEligible: true
  },
  {
    id: 'INT-SOPH-04',
    title: 'Operations Automation & Analytics Intern',
    titleHi: 'ऑपरेशंस ऑटोमेशन एवं डेटा एनालिटिक्स इंटर्न',
    company: 'Zomato Regional Logistics Tech Hub',
    location: 'Lucknow / Remote Support',
    locationHi: 'लखनऊ / रिमोट सहायता',
    mode: 'Remote',
    stipend: '₹16,000 / Month',
    stipendAmount: 16000,
    duration: '4 Months',
    eligibility: '2nd-Year Any Engineering / Science Graduate with Python',
    eligibilityHi: 'पायथन ज्ञान रखने वाले द्वितीय वर्ष के सभी छात्र',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['Python Pandas', 'SQL Queries', 'Data Cleansing', 'Automated Spreadsheets'],
    openings: 8,
    tpCellVerified: true,
    deadline: 'Dec 22, 2026',
    description: 'Analyze hyper-local delivery bottlenecks and build automated daily dispatch reports using Python and relational databases.',
    descriptionHi: 'डिलीवरी नेटवर्क के डेटा विश्लेषण हेतु स्वचालित स्क्रिप्ट्स और रिपोर्ट्स तैयार करना।',
    ppoEligible: false
  },
  {
    id: 'INT-SOPH-05',
    title: 'Junior Payment Gateway & Security Trainee',
    titleHi: 'पेमेंट गेटवे एवं सुरक्षा ट्रेनी',
    company: 'Paytm Financial Services (Tech Division)',
    location: 'Noida / Hybrid Corridor',
    locationHi: 'नोएडा / हाइब्रिड कॉरिडोर',
    mode: 'Hybrid',
    stipend: '₹18,000 / Month + Pre-Placement Offer',
    stipendAmount: 18000,
    duration: '6 Months',
    eligibility: '2nd-Year CSE/IT Batches with strong DSA problem solving',
    eligibilityHi: 'मजबूत डीएसए ज्ञान वाले द्वितीय वर्ष के कंप्यूटर साइंस छात्र',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['Java / Spring Boot', 'Webhooks', 'Cyber Security Basics', 'API Testing'],
    openings: 10,
    tpCellVerified: true,
    deadline: 'Dec 25, 2026',
    description: 'Assist fintech engineers in transaction reconciliation pipelines, cryptographic signature verification, and automated webhook audits.',
    descriptionHi: 'वित्तीय लेन-देन मिलान, क्रिप्टोग्राफिक सत्यापन और एपीआई टेस्टिंग में सहयोग।',
    ppoEligible: true
  },
  {
    id: 'INT-SOPH-06',
    title: 'Graph Algorithms & Dispatch Route Trainee',
    titleHi: 'ग्राफ एल्गोरिदम एवं रूट ऑप्टिमाइजेशन ट्रेनी',
    company: 'Swiggy Instamart Engineering',
    location: 'Regional Technology Hub',
    locationHi: 'क्षेत्रीय प्रौद्योगिकी केंद्र',
    mode: 'Remote',
    stipend: '₹15,000 / Month',
    stipendAmount: 15000,
    duration: '3 Months',
    eligibility: 'Sophomores with competitive coding / DSA coursework',
    eligibilityHi: 'कंप्यूटेटिव कोडिंग अथवा डीएसए में सक्रिय छात्र',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['Dijkstra Algorithm', 'C++ / Java', 'Graph Theory', 'Geo-Fencing'],
    openings: 6,
    tpCellVerified: true,
    deadline: 'Dec 12, 2026',
    description: 'Implement shortest-path algorithms and warehouse sorting simulations to shave minutes off 10-minute grocery fulfillment.',
    descriptionHi: 'त्वरित डिलीवरी हेतु शॉर्टेस्ट-पाथ एल्गोरिदम और वेयरहाउस रूटिंग का कार्यान्वयन।',
    ppoEligible: true
  },
  {
    id: 'INT-SOPH-07',
    title: 'Junior API Integrations Developer Intern',
    titleHi: 'जूनियर एपीआई इंटीग्रेशन डेवलपर इंटर्न',
    company: 'Razorpay Software Private Limited',
    location: 'Remote (India)',
    locationHi: 'रिमोट (अखिल भारतीय)',
    mode: 'Remote',
    stipend: '₹20,000 / Month Top Stipend',
    stipendAmount: 20000,
    duration: '6 Months',
    eligibility: '2nd-Year Tech Students with GitHub repositories of personal projects',
    eligibilityHi: 'गिटहब प्रोजेक्ट्स प्रदर्शित करने वाले द्वितीय वर्ष के छात्र',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['RESTful APIs', 'Postman Testing', 'Node.js', 'Documentation'],
    openings: 14,
    tpCellVerified: true,
    deadline: 'Dec 28, 2026',
    description: 'Build sample integration SDKs, developer documentation walkthroughs, and automated regression suites for incoming merchant integrations.',
    descriptionHi: 'मर्चेंट पार्टनर्स के लिए एसडीके और स्वचालित एपीआई टेस्ट सूट्स का निर्माण।',
    ppoEligible: true
  },
  {
    id: 'INT-SOPH-08',
    title: 'Cloud DevOps & Linux Infrastructure Apprentice',
    titleHi: 'क्लाउड डेवऑप्स एवं लिनक्स इंफ्रास्ट्रक्चर अप्रेंटिस',
    company: 'Infosys Springboard Cloud Lab',
    location: 'Virtual / Regional Development Center',
    locationHi: 'वर्चुअल / क्षेत्रीय केंद्र',
    mode: 'Remote',
    stipend: '₹14,000 / Month + Certifications Voucher',
    stipendAmount: 14000,
    duration: '6 Months',
    eligibility: '2nd-Year IT/CSE/ECE undergraduates',
    eligibilityHi: 'द्वितीय वर्ष आईटी, सीएस अथवा ईसीई छात्र',
    experienceRequired: '0-1 Years (Sophomore Friendly)',
    skills: ['Linux Bash Shell', 'Docker Containers', 'AWS Basics', 'CI/CD Pipelines'],
    openings: 30,
    tpCellVerified: true,
    deadline: 'Jan 05, 2027',
    description: 'Automate build artifacts, configure containerized test runners on Linux instances, and learn enterprise cloud infrastructure provisioning.',
    descriptionHi: 'लिनक्स वातावरण में कंटेनराइज्ड टेस्ट रनर्स और क्लाउड इंफ्रास्ट्रक्चर प्रबंधन।',
    ppoEligible: true
  }
];
