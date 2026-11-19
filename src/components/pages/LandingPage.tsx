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
  PhoneCall
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

      {/* 3. SEQUENTIAL PRODUCT ARCHITECTURE: Four Color-Coded Clean Deliverables */}
      <section className="space-y-8">
        
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Sequential Product Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-[-0.03em] leading-[1.22]">
            From Confusion to Formal Employment in Four Stages
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-[1.6]">
            Most vocational candidates abandon long government forms. Kaushal Setu is structured into four distinct, sequential deliverables that build momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Deliverable 1: Blue Theme */}
          <div
            onClick={() => onNavigate('assessment')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 smooth-card space-y-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-mono-data font-bold text-xs flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-blue-700 transition-colors">
              Practical Skill Diagnostic
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              3-minute visual test tailored to your trade. Evaluates real tool troubleshooting and procedural knowledge, not textbook memorization.
            </p>
            <div className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>Start diagnostic</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Deliverable 2: Emerald Theme */}
          <div
            onClick={() => onNavigate('gap-report')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 smooth-card space-y-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-mono-data font-bold text-xs flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-emerald-700 transition-colors">
              Personalized Gap Report
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              Explicitly charts your score against current Lucknow & Kanpur hiring standards, showing the exact monthly wage boost for closing each gap.
            </p>
            <div className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>View sample report</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Deliverable 3: Amber Theme */}
          <div
            onClick={() => onNavigate('courses')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-500/10 smooth-card space-y-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-mono-data font-bold text-xs flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-amber-700 transition-colors">
              Free Government Modules
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              Short 12h–40h targeted practical workshops certified by MSME, NISE, and PM Surya Ghar with government-backed credentials.
            </p>
            <div className="text-xs font-bold text-amber-700 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>Browse courses</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Deliverable 4: Indigo Theme */}
          <div
            onClick={() => onNavigate('jobs')}
            className="cursor-pointer p-6 rounded-xl bg-white border border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 smooth-card space-y-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-mono-data font-bold text-xs flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-[-0.025em] group-hover:text-indigo-700 transition-colors">
              Hyperlocal Job Board
            </h3>
            <p className="text-xs text-slate-600 leading-[1.6]">
              Openings filtered by physical distance from your residence (≤25 km). Guaranteed stipends with direct one-tap WhatsApp employer contact.
            </p>
            <div className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1 pt-1 tracking-tight">
              <span>Explore jobs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </section>

      {/* 4. KAUSHAL SETU 2.0: 5 PILLARS SUPER APP ARCHITECTURE */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-blue-900 shadow-xl space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/80 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-data text-amber-300 font-bold uppercase tracking-wider">
              <span>ACADEMIC SENATE PROPOSAL · 2ND-YEAR DEPLOYABLE ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              The 5 Pillars Powering the Kaushal Setu 2.0 Super App
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl">
              Transforming college education from 7th-semester placement anxiety into organic 2nd-year continuous growth, verifiable code proof-of-work, and daily campus utility.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('mobility')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Smart Mobility
            </button>
            <button
              onClick={() => onNavigate('opportunities')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Opportunity Hub
            </button>
            <button
              onClick={() => onNavigate('skill-score')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Live Skill Score
            </button>
          </div>
        </div>

        {/* 5 Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => onNavigate('mobility')}
            className="p-5 rounded-2xl bg-blue-900/40 border border-blue-700/60 hover:border-blue-400 hover:bg-blue-900/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="text-amber-400 font-mono-data font-bold text-xs uppercase">Pillar 1</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Smart Traffic Control
            </h3>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              Live gate congestion sensors & college bus GPS telemetry eliminating 9:00 AM lecture bottlenecks.
            </p>
          </div>

          <div
            onClick={() => onNavigate('opportunities')}
            className="p-5 rounded-2xl bg-blue-900/40 border border-blue-700/60 hover:border-blue-400 hover:bg-blue-900/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="text-amber-400 font-mono-data font-bold text-xs uppercase">Pillar 2</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Opportunity Hub
            </h3>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              2nd-year friendly internships, intra-dept hackathons, and Smart India Hackathon (SIH 2026) team incubator.
            </p>
          </div>

          <div
            onClick={() => onNavigate('skill-score')}
            className="p-5 rounded-2xl bg-blue-900/40 border border-blue-700/60 hover:border-blue-400 hover:bg-blue-900/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="text-amber-400 font-mono-data font-bold text-xs uppercase">Pillar 3</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Live Skill Score
            </h3>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              Objective capability index (40% Code/DSA + 35% Project Audits + 25% Consistency) for visiting recruiters.
            </p>
          </div>

          <div
            onClick={() => onNavigate('resume')}
            className="p-5 rounded-2xl bg-blue-900/40 border border-blue-700/60 hover:border-blue-400 hover:bg-blue-900/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="text-amber-400 font-mono-data font-bold text-xs uppercase">Pillar 4</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              ATS-Boosting Studio
            </h3>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              Metric articulation rewriting bullets, jumping parser pass rates from 42% to 91% across Taleo & Workday.
            </p>
          </div>

          <div
            onClick={() => onNavigate('payouts')}
            className="p-5 rounded-2xl bg-blue-900/40 border border-blue-700/60 hover:border-blue-400 hover:bg-blue-900/60 transition-all cursor-pointer space-y-2 group"
          >
            <div className="text-amber-400 font-mono-data font-bold text-xs uppercase">Pillar 5</div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              PayPal Financial Rail
            </h3>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              Autonomous escrow milestone disbursements ($25-$45 USD) and instant global certification checkout.
            </p>
          </div>
        </div>

        {/* Competitive Benchmarking Matrix from Proposal */}
        <div className="pt-4 border-t border-blue-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase font-mono-data text-blue-300 tracking-wider">
              COMPETITIVE BENCHMARKING: WHY CONVENTIONAL PORTALS FAIL 2ND-YEAR STUDENTS
            </h3>
            <span className="text-[11px] font-mono-data text-emerald-400">Institutional Analysis</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-blue-800/80 rounded-xl overflow-hidden">
              <thead className="bg-blue-950/90 text-blue-300 font-mono-data text-[11px] uppercase">
                <tr>
                  <th className="p-3 border-b border-blue-800/80">Evaluation Metric</th>
                  <th className="p-3 border-b border-blue-800/80">LinkedIn</th>
                  <th className="p-3 border-b border-blue-800/80">Unstop</th>
                  <th className="p-3 border-b border-blue-800/80">Naukri.com</th>
                  <th className="p-3 border-b border-blue-800/80 bg-blue-800/60 text-white font-bold">Kaushal Setu 2.0</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-800/50 text-slate-200">
                <tr>
                  <td className="p-3 font-semibold text-white">Target Audience Fit</td>
                  <td className="p-3 text-slate-400">Senior corporate lateral hires</td>
                  <td className="p-3 text-slate-400">Generic national college pool</td>
                  <td className="p-3 text-slate-400">Experienced professionals</td>
                  <td className="p-3 font-bold text-emerald-400 bg-blue-900/30">Exclusively for 2nd-year college batches</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Skill Verification</td>
                  <td className="p-3 text-slate-400">Self-declared endorsements</td>
                  <td className="p-3 text-slate-400">Contest leaderboard only</td>
                  <td className="p-3 text-slate-400">Keywords on uploaded PDFs</td>
                  <td className="p-3 font-bold text-emerald-400 bg-blue-900/30">Dynamic Live Skill Score backed by code & tests</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Opportunity Relevance</td>
                  <td className="p-3 text-slate-400">Demands 3+ yrs exp on entry jobs</td>
                  <td className="p-3 text-slate-400">Lacks intra-college departmental tiers</td>
                  <td className="p-3 text-slate-400">Spam recruitment agency listings</td>
                  <td className="p-3 font-bold text-emerald-400 bg-blue-900/30">Curated 2nd-year internships & SIH sprints</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Daily Campus Utility</td>
                  <td className="p-3 text-rose-400">Zero daily campus utility</td>
                  <td className="p-3 text-rose-400">Zero daily utility (only contests)</td>
                  <td className="p-3 text-rose-400">Zero daily utility (dormant app)</td>
                  <td className="p-3 font-bold text-emerald-400 bg-blue-900/30">High DAU: Live Gate Traffic & Bus Telemetry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* 5. PERSONAS SECTION: Colorful Trade Badges */}
      <section className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Three Personas Who Set Our Usability Floor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Verified against Section 2 of the National Skill Ecosystem judging brief.
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
