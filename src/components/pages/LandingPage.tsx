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
  Navigation
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
      candidate: 'Priya Sharma, 22',
      location: 'Gomti Nagar, Lucknow',
      education: 'B.Com Graduate (Lucknow University)',
      targetRole: 'Junior GST & Accounts Executive',
      coreSkill: 'GSTR-2B Reconciliation & E-Way Portal',
      minMarketScore: 80,
      startingBase: 15000,
      maxUplift: 24500,
      courseModule: '24h Practical GST & TDS Workshop (Free under MSME)',
      nearestEmployer: 'Kedia Logistics & Cold Chain · Transport Nagar (8.5 km)',
      openings: '3 vacancies · Direct WhatsApp HR',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    rahul: {
      candidate: 'Rahul Verma, 20',
      location: 'Panki Industrial Area, Kanpur',
      education: 'ITI Electrical Diploma (Final Year)',
      targetRole: 'Rooftop Solar PV Grid Technician',
      coreSkill: 'Solar Inverter Diagnostics & Anti-Islanding',
      minMarketScore: 85,
      startingBase: 12500,
      maxUplift: 19000,
      courseModule: 'PM Surya Ghar 30h Weekend ITI Practical Lab',
      nearestEmployer: 'Tata Power Solar EPC Partner · Fazalganj (11.2 km)',
      openings: '8 vacancies · NATS Apprenticeship',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    sunita: {
      candidate: 'Sunita Devi, 19',
      location: 'Fatehpur Block, Barabanki',
      education: 'Intermediate (12th Pass) · 1st-Gen Mobile User',
      targetRole: 'Gram Panchayat CSC & Banking Operator',
      coreSkill: 'AePS Micro-ATM & Citizen Portal Processing',
      minMarketScore: 75,
      startingBase: 8000,
      maxUplift: 12000,
      courseModule: 'CSC Digital Village Facilitator Training (Free)',
      nearestEmployer: 'Bank of Baroda CSP Center · Block HQ (3.2 km)',
      openings: '6 slots · Local Village Posting',
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
              National Skill Ecosystem
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">NSQF & MSME Certified</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-[11px] font-mono-data">
              PayPal AI Verified Payouts
            </span>
          </div>

          {/* Calibrated Headline: Human, Direct, Authoritative Solid Ink */}
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.95rem] font-bold text-slate-900 tracking-[-0.035em] leading-[1.14] text-balance">
            {lang === 'en' ? (
              <>
                Where Uttar Pradesh’s college degrees turn into <span className="text-blue-700">verified factory careers</span>.
              </>
            ) : (
              <>
                उत्तर प्रदेश के युवाओं की डिग्री और उद्योगों की असली मांग के बीच का <span className="text-blue-700">सटीक सेतु</span>।
              </>
            )}
          </h1>

          {/* Subtitle with Real Regional Reality */}
          <p className="text-sm sm:text-base text-slate-600 leading-[1.6] max-w-xl">
            {lang === 'en'
              ? 'In 3 minutes, diagnose your exact practical deficit against live hiring standards across Lucknow, Kanpur, and Barabanki. Complete free government-funded NCVT modules and connect directly with local employers on WhatsApp.'
              : '३ मिनट में जानें कि लखनऊ, कानपुर व बाराबंकी के उद्योगों की मांग के मुकाबले आपके ज्ञान में क्या कमी है। निःशुल्क सरकारी प्रशिक्षण लें और २५ किमी के भीतर व्हाट्सएप पर सीधे नौकरी पाएं।'}
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
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold tracking-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Govt. MSME & NCVT Approved
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-blue-800 font-semibold tracking-tight">Hyperlocal (≤25 km)</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-amber-800 font-semibold tracking-tight bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">100% Free Training</span>
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
                  { id: 'priya', name: 'Priya', trade: 'B.Com Accounts' },
                  { id: 'rahul', name: 'Rahul', trade: 'ITI Solar PV' },
                  { id: 'sunita', name: 'Sunita', trade: 'CSC Banking' }
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

      {/* 2. PROOF & KPI STRIP: Colorful Metrics Grounding Every Claim */}
      <section className="border-y border-slate-200 py-8 bg-slate-50/60 rounded-2xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-blue-600 tracking-tight">85,420+</div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Verified Technical Vacancies</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">Active in Lucknow, Kanpur & Barabanki</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-emerald-600 tracking-tight">≤ 25 km</div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Commute Radius Guarantee</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">Zero forced relocation or hostel expenses</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-amber-600 tracking-tight">100% Free</div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Govt-Sponsored Training</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">MSME & NCVT certified short practical labs</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-data text-indigo-600 tracking-tight">
              +₹8,500<span className="text-xs text-indigo-400 font-normal">/mo</span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-1 tracking-tight">Average Starting Wage Uplift</div>
            <div className="text-xs text-slate-500 mt-0.5 leading-[1.6]">Immediate salary jump upon gap closure</div>
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

        {/* Feature Grid: 8 Functional Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
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
              {lang === 'en' ? 'Opportunities & Hackathons' : 'अवसर व हैकाथॉन हब'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Intra-college departmental sprints, Smart India Hackathon squad builder, and verified 2nd-year internships.'
                : 'विभाग-स्तरीय हैकाथॉन, स्मार्ट इंडिया हैकाथॉन टीम निर्माण और द्वितीय वर्ष के छात्रों हेतु इंटर्नशिप।'}
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
              {lang === 'en' ? 'Free Government Modules' : 'मुफ्त प्रमाणित कोर्स'}
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              {lang === 'en'
                ? 'Short 12h–40h targeted practical workshops certified by MSME, NISE, and PM Surya Ghar with govt credentials.'
                : 'एमएसएमई एवं सरकारी मान्यता प्राप्त १२ से ४० घंटे के शॉर्ट-टर्म प्रैक्टिकल वर्कशॉप्स।'}
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
              <span>National Skill Ecosystem</span>
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
