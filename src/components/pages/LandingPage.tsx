import React, { useState } from 'react';
import { Language } from '../../types';
import { PERSONAS } from '../../data/researchData';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
  Building2,
  GraduationCap,
  Briefcase,
  Zap,
  PhoneCall,
  Bus,
  Trophy,
  FileText,
  Navigation,
  GitBranch,
  Terminal,
  FileCode2,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, onNavigate }) => {
  const [selectedTradeTab, setSelectedTradeTab] = useState<'priya' | 'rahul' | 'sunita'>('priya');
  const [skillSliderVal, setSkillSliderVal] = useState<number>(45);

  const tradeData = {
    priya: {
      candidate: 'Aman Sharma, 20 · Roll: 2024-CSE-084',
      location: 'IET Lucknow Campus · Sitapur Road',
      education: 'B.Tech Computer Science & Engineering (3rd Sem)',
      targetRole: 'Junior Software Development Engineer (SDE-1)',
      coreSkill: 'Data Structures & Distributed Backend (React, Node, PostgreSQL)',
      minMarketScore: 85,
      startingBase: 42000,
      maxUplift: 85000,
      courseModule: 'NPTEL 12-Week Advanced DSA in C++ (IIT Kharagpur — 3 Credits)',
      nearestEmployer: 'TCS Innovation Labs & Research Hub · Gomti Nagar (6.2 km)',
      openings: '14 openings · T&P Cell Direct Walk-In',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    rahul: {
      candidate: 'Rhea Verma, 20 · Roll: 2024-AIML-042',
      location: 'KNIT Sultanpur / AKTU Affiliated Hub',
      education: 'B.Tech Artificial Intelligence & Data Science (3rd Sem)',
      targetRole: 'Associate Machine Learning & Computer Vision Engineer',
      coreSkill: 'PyTorch Neural Networks & Fast-API MLOps Model Serving',
      minMarketScore: 88,
      startingBase: 48000,
      maxUplift: 95000,
      courseModule: 'NPTEL Deep Learning for Computer Vision (IIT Madras — 4 Credits)',
      nearestEmployer: 'Tata Elxsi Autonomous AI Center · Lucknow Hub (8.5 km)',
      openings: '9 openings · SIH Shortlist Fast-Track',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200'
    },
    sunita: {
      candidate: 'Arjun Patel, 20 · Roll: 2024-ECE-031',
      location: 'BIET Jhansi / AKTU Technology Corridor',
      education: 'B.Tech Electronics & Communication Engineering (3rd Sem)',
      targetRole: 'Embedded Firmware & Edge AI Systems Engineer',
      coreSkill: 'FreeRTOS Concurrency, STM32 Microcontrollers & MQTT',
      minMarketScore: 82,
      startingBase: 38000,
      maxUplift: 78000,
      courseModule: 'NPTEL Embedded System Design with ARM (IIT Delhi — 3 Credits)',
      nearestEmployer: 'Schneider Electric Embedded R&D · Kanpur Road (12.4 km)',
      openings: '11 openings · Hardware Hackathon Verified',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    }
  };

  const active = tradeData[selectedTradeTab];

  // Dynamic salary calculation based on user dragging the slider
  const dynamicScore = skillSliderVal;
  const isQualified = dynamicScore >= active.minMarketScore;
  const progressRatio = Math.min(1, dynamicScore / active.minMarketScore);
  const currentCalculatedSalary = Math.round(
    active.startingBase + (active.maxUplift - active.startingBase) * Math.pow(progressRatio, 1.4)
  );
  const monthlyUplift = currentCalculatedSalary - active.startingBase;

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 max-w-6xl mx-auto pt-2 sm:pt-6">
      
      {/* 1. HERO SECTION: Vibrant & Human-Crafted on Pure White Canvas */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Authoritative Editorial Proposition with Warm Accents */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Institutional Editorial Kicker (Structured Institutional Badges) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-bold uppercase tracking-wider text-[11px] font-mono-data">
              🏛️ AICTE & AKTU Model Curriculum Aligned
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-700 font-bold">Exclusive B.Tech Engineering Ecosystem</span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] font-mono-data">
              NPTEL 3-4 Credit Mooc Transfer
            </span>
          </div>

          {/* Calibrated Headline: Human, Direct, Authoritative Solid Ink */}
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.95rem] font-bold text-slate-900 tracking-[-0.035em] leading-[1.14] text-balance">
            {lang === 'en' ? (
              <>
                Where Uttar Pradesh’s B.Tech Engineers turn code and hardware labs into <span className="text-blue-700">Tier-1 tech careers</span>.
              </>
            ) : (
              <>
                बी.टेक इंजीनियरिंग छात्रों की कोडिंग व लैब्स को ग्लोबल टेक कंपनियों के <span className="text-blue-700">सत्यापित करियर</span> में बदलने का सुपर सेतु।
              </>
            )}
          </h1>

          {/* Subtitle with Real Regional Reality */}
          <p className="text-sm sm:text-base text-slate-600 leading-[1.6] max-w-xl">
            {lang === 'en'
              ? 'Engineered exclusively for 2nd-year B.Tech undergraduates across CSE, AI/DS, ECE, IT, and Core Engineering. Diagnose practical coding deficits, earn NPTEL/SWAYAM credit transfers, and push verified GitHub proof-of-work directly to recruiting directors.'
              : 'विशेष रूप से द्वितीय वर्ष बी.टेक (CSE, AI/ML, ECE, IT) इंजीनियरिंग छात्रों के लिए तैयार। लाइव कोडिंग असेसमेंट, एनपीटीईएल क्रेडिट ट्रांसफर, और सीधे टेक रिक्रूटर्स के पास गिटहब कोड पोर्टफोलियो।'}
          </p>

          {/* Dual Action Buttons: Luminous Royal Blue + Crisp Outlined White */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <button
              onClick={() => onNavigate('resume')}
              className="h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm tracking-tight transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-[0.99] whitespace-nowrap shrink-0"
            >
              <span>{lang === 'en' ? 'Build AI Resume & Send to HR' : 'एआई रेज़्यूमे बनाएं व एचआर को भेजें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('jobs')}
              className="h-11 px-5 rounded-lg bg-white border border-blue-200 hover:border-blue-300 text-blue-900 hover:bg-blue-50/50 font-bold text-sm tracking-tight transition-all shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] whitespace-nowrap shrink-0"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Browse 85,000+ Verified Jobs' : '८५,०००+ स्थानीय नौकरियां देखें'}</span>
            </button>
          </div>

          {/* Trust Tokens (Vibrant Emerald & Amber Badges) */}
          <div className="pt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold tracking-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              AICTE Model Curriculum Verified
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-purple-800 font-semibold tracking-tight bg-purple-50 px-2 py-0.5 rounded border border-purple-200">B.Tech CSE · AI/DS · ECE · IT · Core</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-emerald-800 font-semibold tracking-tight bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">SIH 2026 Screening</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">English & हिंदी</span>
          </div>

        </div>

        {/* Right Column: Live Interactive Benchmark Instrument (Tactile with Rich Accents) */}
        <div className="md:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-blue-600 p-5 sm:p-6 shadow-sm space-y-4">

            {/* Widget Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 pt-1">
              <div>
                <div className="text-xs font-bold text-slate-900 tracking-[-0.02em] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Empirical Hiring Diagnostic</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Live UP factory hiring benchmarks</div>
              </div>
              <span className="text-[10px] font-mono-data text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full font-bold border border-blue-200">
                Live Simulator
              </span>
            </div>

            {/* Persona Segmented Buttons: Colorful Active States */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 tracking-tight block mb-1.5">
                Select Candidate Persona:
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/90 rounded-lg text-xs">
                {[
                  { id: 'priya', name: 'Aman', trade: 'B.Tech CSE (SDE)' },
                  { id: 'rahul', name: 'Rhea', trade: 'B.Tech AI & DS' },
                  { id: 'sunita', name: 'Arjun', trade: 'B.Tech ECE (IoT)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedTradeTab(tab.id as any);
                      setSkillSliderVal(45);
                    }}
                    className={`py-1.5 px-2 rounded-md transition-all text-left ${
                      selectedTradeTab === tab.id
                        ? 'bg-white text-blue-900 shadow-xs font-bold border border-blue-200/80 ring-1 ring-blue-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
                    }`}
                  >
                    <div className="font-bold text-xs leading-none tracking-tight">{tab.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5 truncate">{tab.trade}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Context Snippet */}
            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 text-xs flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-xs tracking-tight truncate">{active.targetRole}</div>
                <div className="text-[11px] text-slate-600 truncate">{active.nearestEmployer}</div>
              </div>
              <span className="shrink-0 text-[10px] font-mono-data font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                {active.openings.split('·')[0].trim()}
              </span>
            </div>

            {/* Interactive Slider Area */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 text-xs tracking-tight truncate pr-2">
                  {active.coreSkill}
                </span>
                <span className="font-mono-data font-bold text-blue-700 text-xs shrink-0">
                  {skillSliderVal}% <span className="text-slate-400 font-normal">/ {active.minMarketScore}% req</span>
                </span>
              </div>

              {/* Slider Control with Vibrant Blue Accent */}
              <input
                type="range"
                min="20"
                max="100"
                value={skillSliderVal}
                onChange={e => setSkillSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex items-center justify-between text-[10px] font-mono-data text-slate-500">
                <span>Baseline (20%)</span>
                <span className="text-blue-700 font-bold">Employer Bar ({active.minMarketScore}%)</span>
                <span>Mastery (100%)</span>
              </div>
            </div>

            {/* Real-Time Outcome Calculation Box with Saffron & Emerald Surfaces */}
            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 block uppercase tracking-wider">Hiring Status</span>
                <div className={`text-xs font-bold font-mono-data mt-0.5 ${isQualified ? 'text-emerald-700' : 'text-amber-800'}`}>
                  {isQualified ? '✓ Qualified for Interview' : 'Gap: Needs 24h Training'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 block uppercase tracking-wider">Projected Wage</span>
                <div className="text-sm font-bold font-mono-data text-emerald-900 mt-0.5 flex items-baseline gap-1">
                  <span>₹{currentCalculatedSalary.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-normal text-emerald-700">/mo</span>
                  {monthlyUplift > 0 && (
                    <span className="text-[10px] text-emerald-700 font-bold ml-auto">
                      (+₹{monthlyUplift.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Action Button: 100% Visible Above Fold in Royal Blue */}
            <button
              onClick={() => onNavigate('assessment')}
              className="w-full h-9 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs tracking-tight flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-blue-500/20"
            >
              <span>Test Your Readiness for This Trade</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

      </section>

      {/* 2. PROOF & KPI STRIP: B.Tech Engineering Metrics */}
      <section className="border-y border-slate-200 py-8 bg-slate-50/60 rounded-2xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-blue-600 tracking-tight">48,500+</div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">B.Tech Engineering Roles</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">Active across Tier-1 Tech & EPC Partners</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-emerald-600 tracking-tight">3–4 Credits</div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Automated NPTEL Credit Transfer</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">Directly mapped into AKTU semester marksheet</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-amber-600 tracking-tight">100% Free</div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Govt Sponsored IIT/IISc MOOCs</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">SWAYAM, NPTEL & PM Internship Scheme</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-indigo-600 tracking-tight">
              +₹28,000<span className="text-xs text-indigo-400 font-normal">/mo</span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Average Starting Package Leap</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">Accelerating 2nd-year placement readiness</div>
          </div>
        </div>
      </section>

      {/* 3. INTEGRATED CAMPUS & CAREER PLATFORM FEATURES */}
      <section className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="max-w-2xl space-y-1.5">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono-data">
              {lang === 'en' ? 'Core Platform Features' : 'प्लेटफॉर्म की मुख्य सुविधाएं'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.22]">
              {lang === 'en' ? 'Everything Students & Job Seekers Need in One App' : 'छात्रों और नौकरी चाहने वालों के लिए संपूर्ण समाधान'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'From morning campus bus tracking to live code verification, ATS resume building, and verified local employment.'
                : 'सुबह कॉलेज बस ट्रैकिंग से लेकर लाइव कोड सत्यापन, एटीएस रेज़्यूमे और स्थानीय रोजगार तक।'}
            </p>
          </div>
        </div>

        {/* Feature Grid: Advanced B.Tech Engineering Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Advanced Tool 1: AI Template Studio */}
          <div
            onClick={() => onNavigate('templates')}
            className="cursor-pointer p-6 rounded-xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 border border-indigo-200 hover:border-indigo-500 hover:shadow-lg transition-all smooth-card space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-500/25">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-[10px] font-mono-data font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded border border-indigo-200">
                5 AI Templates
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-indigo-700 transition-colors">
              {lang === 'en' ? 'AI Engineering Template Studio' : 'एआई इंजीनियरिंग टेम्पलेट स्टूडियो'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Generate Overleaf LaTeX resumes, B.Tech Capstone Project Proposals, SIH 2026 pitch decks, and GitHub README blueprints.'
                : 'बी.टेक कैपस्टोन प्रोजेक्ट, एसआईएच २०२६ पिच डेक और लेटेक्स रेज़्यूमे के लिए त्वरित एआई टेम्पलेट्स।'}
            </p>
            <div className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Open AI Templates' : 'टेम्पलेट स्टूडियो खोलें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Advanced Tool 2: B.Tech Specialization Roadmaps */}
          <div
            onClick={() => onNavigate('roadmap')}
            className="cursor-pointer p-6 rounded-xl bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 border border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all smooth-card space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-blue-500/25">
                <GitBranch className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono-data font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded border border-blue-200">
                AICTE Aligned
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-blue-700 transition-colors">
              {lang === 'en' ? 'B.Tech Specialization Roadmaps' : 'बी.टेक इंजीनियरिंग रोडमैप्स'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Semester 3 & 4 milestone ladders for CSE, AIML, ECE & Core Eng with Striver 450 DSA trackers and NPTEL credit mapping.'
                : 'सीएसई, एआई/डीएस, ईसीई के लिए सेमेस्टर-वार रोडमैप, 450 डीएसए शीट और एनपीटीईएल क्रेडिट ट्रांसफर।'}
            </p>
            <div className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Explore Roadmaps' : 'रोडमैप देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Advanced Tool 3: AI Mock Tech Interviewer */}
          <div
            onClick={() => onNavigate('interview')}
            className="cursor-pointer p-6 rounded-xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 border border-emerald-200 hover:border-emerald-500 hover:shadow-lg transition-all smooth-card space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-emerald-500/25">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono-data font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                SDE-1 Simulator
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-emerald-700 transition-colors">
              {lang === 'en' ? 'AI SDE Mock Interview & System Design' : 'एआई टेक्निकल इंटरव्यू सिमुलेटर'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Live coding rounds on LRU Cache, Distributed Redis System Design, and Concurrency with instant AI code evaluation.'
                : 'डीएसए, सिस्टम डिज़ाइन और ऑपरेटिंग सिस्टम्स पर लाइव कोडिंग राउंड और एआई कोड रिव्यू।'}
            </p>
            <div className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Start Mock Interview' : 'इंटरव्यू शुरू करें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 1: Campus Transit */}
          <div
            onClick={() => onNavigate('mobility')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-blue-700 transition-colors">
              {lang === 'en' ? 'Campus Transit & Bus Radar' : 'कैंपस बस व गेट रडार'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Live campus entry gate sensors, 4 college bus corridors with GPS telemetry, and commute time estimator.'
                : 'कॉलेज मुख्य द्वारों पर लाइव भीड़ सेंसर, ४ बस रूट की जीपीएस ट्रैकिंग और समय पर पहुंचने के लिए सुझाव।'}
            </p>
            <div className="text-xs font-bold text-sky-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Check gate traffic' : 'ट्रैफिक स्थिति देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 2: Opportunities & Hackathons */}
          <div
            onClick={() => onNavigate('opportunities')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-purple-700 transition-colors">
              {lang === 'en' ? 'PM Internship & Hackathons' : 'पीएम इंटर्नशिप व हैकाथॉन'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Official PM Internship Scheme (₹5,000/mo DBT + ₹6,000 grant) across Top 500 corporations, SIH 2026, and tech sprints.'
                : 'भारत सरकार की पीएम इंटर्नशिप योजना (₹५,०००/माह डीबीटी), स्मार्ट इंडिया हैकाथॉन व कॉलेज कोडिंग स्प्रिंट्स।'}
            </p>
            <div className="text-xs font-bold text-purple-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Explore opportunities' : 'अवसर देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 3: Live Skill Score */}
          <div
            onClick={() => onNavigate('skill-score')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-emerald-700 transition-colors">
              {lang === 'en' ? 'Live Skill Score' : 'लाइव कौशल स्कोर'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Objective capability index based on code commits, automated DSA problem tests, and exportable recruiter dossiers.'
                : 'गिटहब कोड ऑडिट, स्वचालित कोडिंग टेस्ट और कंपनियों के लिए सत्यापन योग्य कौशल रिपोर्ट।'}
            </p>
            <div className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'View my score' : 'अपना स्कोर देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 4: AI Resume Studio */}
          <div
            onClick={() => onNavigate('resume')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-blue-700 transition-colors">
              {lang === 'en' ? 'AI Resume & ATS Optimizer' : 'एआई रेज़्यूमे व एटीएस'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Convert passive bullets into quantified metric achievements and clear corporate ATS filters with 90%+ confidence.'
                : 'कमजोर बुलेट पॉइंट्स को मजबूत मेट्रिक्स में बदलें और कॉरपोरेट एटीएस स्क्रीनिंग को आसानी से पार करें।'}
            </p>
            <div className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Optimize resume' : 'रेज़्यूमे बनाएं'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 5: Skill Diagnostic */}
          <div
            onClick={() => onNavigate('assessment')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-blue-700 transition-colors">
              {lang === 'en' ? 'Practical Skill Diagnostic' : 'व्यावहारिक कौशल टेस्ट'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? '3-minute visual test tailored to your trade. Evaluates real tool troubleshooting and procedural knowledge.'
                : 'अपने ट्रेड अनुसार ३ मिनट का व्यावहारिक टेस्ट दें और वास्तविक टूल ज्ञान का मूल्यांकन करें।'}
            </p>
            <div className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Start diagnostic' : 'टेस्ट शुरू करें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 6: Gap Report */}
          <div
            onClick={() => onNavigate('gap-report')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-emerald-700 transition-colors">
              {lang === 'en' ? 'Personalized Gap Report' : 'कौशल अंतर रिपोर्ट'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Explicitly charts your score against current hiring standards, showing the exact monthly wage boost for closing gaps.'
                : 'स्थानीय उद्योगों के मानकों के मुकाबले अपने स्कोर की तुलना करें और वेतन वृद्धि की संभावना समझें।'}
            </p>
            <div className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'View gap report' : 'रिपोर्ट देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 7: Government Courses */}
          <div
            onClick={() => onNavigate('courses')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md hover:shadow-amber-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-amber-700 transition-colors">
              {lang === 'en' ? 'NPTEL & Govt Certifications' : 'एनपीटीईएल व सरकारी कोर्स'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Valid IIT-accredited NPTEL / SWAYAM courses with AICTE credit transfer, plus MSME & PM Surya Ghar certifications.'
                : 'आईआईटी मद्रास, दिल्ली, कानपुर द्वारा एनपीटीईएल कोर्स (क्रेडिट ट्रांसफर), एवं एमएसएमई प्रमाणित कार्यशालाएं।'}
            </p>
            <div className="text-xs font-bold text-amber-700 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Browse courses' : 'कोर्स देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tool 8: Hyperlocal Job Board */}
          <div
            onClick={() => onNavigate('jobs')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 smooth-card space-y-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-indigo-700 transition-colors">
              {lang === 'en' ? 'Hyperlocal Job Board' : 'स्थानीय रोजगार बोर्ड'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Openings filtered by physical distance from your residence (≤25 km) with direct one-tap WhatsApp contact.'
                : '२५ किमी के भीतर सत्यापित स्थानीय नौकरियां और सीधे नियोक्ता से व्हाट्सएप पर संपर्क।'}
            </p>
            <div className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>{lang === 'en' ? 'Explore jobs' : 'नौकरियां देखें'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </section>

      {/* 5. PERSONAS SECTION: Colorful Trade Badges */}
      <section className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {lang === 'en' ? 'Designed for Real Student & Job Seeker Journeys' : 'वास्तविक छात्रों एवं युवाओं के लिए निर्मित'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {lang === 'en'
                ? 'Tailored workflows calibrated for college students, ITI technicians, and rural candidates.'
                : 'कॉलेज छात्रों, आईटीआई तकनीशियनों एवं ग्रामीण युवाओं के लिए विशेष रूप से डिज़ाइन किया गया।'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('onboarding')}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
          >
            <span>Select your persona</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PERSONAS.map(p => (
            <div
              key={p.id}
              onClick={() => onNavigate('onboarding')}
              className="cursor-pointer p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">{p.name} ({p.age})</span>
                <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">{p.location.split('(')[0]}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{p.role}</div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                <strong className="text-slate-800">Primary Goal:</strong> {p.primaryGoal}
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                {p.device} · {p.connectivity.split('(')[0]}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. INSTITUTIONAL CALLOUT: Grounded, Prestigious Deep Slate Card */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono-data font-semibold text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/60">
              <span>NSQF & MSME Certified</span>
              <span>·</span>
              <span>PM Internship Scheme & NPTEL Partnered</span>
              <span>·</span>
              <span className="text-amber-300">PayPal AI Verified Payouts</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to test your trade readiness and connect with verified local employers?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-[1.6] max-w-2xl">
              100% free for all students, ITI trainees, and first-generation job seekers across Lucknow, Kanpur, and Barabanki. Backed by MSME, NCVT, and regional industrial associations.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => onNavigate('assessment')}
              className="h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
            >
              <span>Start 3-Minute Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('specs')}
              className="h-10 px-5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 flex items-center justify-center cursor-pointer"
            >
              Inspect Design Tokens & Usability Data
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
