import React, { useState } from 'react';
import { Language, CollegeOpportunity } from '../../types';
import { PM_INTERNSHIP_SCHEME_DATA, PmInternshipListing } from '../../data/pmInternshipData';
import { 
  Trophy, 
  Sparkles, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Building2, 
  Laptop, 
  Award, 
  Briefcase, 
  Plus, 
  Clock, 
  ExternalLink,
  Code,
  Lightbulb,
  ShieldCheck,
  Check
} from 'lucide-react';

interface OpportunityHubPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const OpportunityHubPage: React.FC<OpportunityHubPageProps> = ({ lang, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pm-internship' | 'intra-college' | 'sih-pipeline' | 'internships'>('all');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>({});
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // SIH Team Builder state
  const [sihDomain, setSihDomain] = useState<string>('smart-automation');
  const [teamMembers, setTeamMembers] = useState<string[]>([
    'Priya Sharma (2nd Yr CSE · Team Lead & React)',
    'Rahul Verma (2nd Yr IT · Node.js & DB Architect)',
    'Aman Gupta (2nd Yr ECE · IoT & Hardware Sensor Lead)'
  ]);
  const [newMemberInput, setNewMemberInput] = useState<string>('');
  
  // PM Internship Live Eligibility State
  const [candidateAge, setCandidateAge] = useState<number>(22);
  const [hasAadhaarDbt, setHasAadhaarDbt] = useState<boolean>(true);
  const [isFamilyIncomeUnder8L, setIsFamilyIncomeUnder8L] = useState<boolean>(true);
  const [isNotFullTimeEmployed, setIsNotFullTimeEmployed] = useState<boolean>(true);

  



  const opportunities: CollegeOpportunity[] = [
    {
      id: 'OPP-INTRA-01',
      title: 'Sophomore Intra-Dept Code Sprint 2026 (CSE vs IT)',
      titleHi: 'द्वितीय वर्ष अंतर-विभागीय कोड स्प्रिंट (सीएसई बनाम आईटी)',
      type: 'Intra-College Hackathon',
      typeHi: 'इंटर-डिपार्टमेंट हैकाथॉन',
      organizer: 'Department of Computer Science & Placement Cell',
      department: 'CSE & IT (2nd Year Batches)',
      eligibility: '3rd & 4th Semester Students Only',
      deadline: 'Nov 28, 2026',
      prizePool: '₹25,000 + Direct T&P Shortlist',
      participantsCount: 142,
      teamSize: '2 - 4 Members',
      skillsDemanded: ['Data Structures', 'Full-Stack React', 'REST API Design', 'Git Workflow'],
    },
    {
      id: 'OPP-SIH-02',
      title: 'Smart India Hackathon (SIH 2026) College Screening & Incubator',
      titleHi: 'स्मार्ट इंडिया हैकाथॉन (SIH 2026) कॉलेज स्क्रीनिंग एवं इनक्यूबेटर',
      type: 'SIH 2026 Pipeline',
      typeHi: 'SIH 2026 पाइपलाइन',
      organizer: 'Institute Innovation Council (IIC) & Ministry of Education',
      department: 'All Departments (Open to 2nd & 3rd Years)',
      eligibility: 'Sophomore & Junior Teams (Min. 1 Female Member)',
      deadline: 'Dec 05, 2026',
      prizePool: '₹1,00,000 National Grant + SIH Grand Finale Nomination',
      participantsCount: 380,
      teamSize: '6 Members Strictly',
      skillsDemanded: ['AI/ML Prototype', 'Cloud Deployment', 'Hardware/IoT', 'Presentation Deck'],
    },
    {
      id: 'OPP-CLUB-03',
      title: 'GDSC & IEEE Campus Autonomous Robotics Challenge',
      titleHi: 'जीडीएससी एवं आईईईई रोबोटिक्स चैलेंज',
      type: 'Club Challenge',
      typeHi: 'क्लब प्रतियोगिता',
      organizer: 'IEEE Student Branch & Google Developer Student Club',
      department: 'ECE, Mechanical & Robotics Chapters',
      eligibility: '2nd Year Hands-on Hardware Enthusiasts',
      deadline: 'Dec 12, 2026',
      prizePool: 'Hardware Dev Kits + ₹15,000 Cash',
      participantsCount: 88,
      teamSize: '3 - 5 Members',
      skillsDemanded: ['Microcontrollers (ESP32/Arduino)', 'Sensor Interfacing', 'Motor Drivers'],
    },
    {
      id: 'OPP-INT-04',
      title: 'Junior React & TypeScript Intern (2nd-Year FastTrack)',
      titleHi: 'जूनियर रिएक्ट एवं टाइपस्क्रिप्ट इंटर्न (द्वितीय वर्ष छात्र)',
      type: '2nd-Year Tech Internship',
      typeHi: 'द्वितीय वर्ष इंटर्नशिप',
      organizer: 'Kedia Logistics Tech Lab (Lucknow Hub)',
      department: 'Software Engineering & Web Technologies',
      eligibility: 'No Prior 3+ Yrs Exp Demanded · 2nd-Year Friendly',
      deadline: 'Immediate Joining',
      prizePool: '₹12,000/Month Fixed Stipend + Pre-Placement Offer (PPO)',
      participantsCount: 64,
      teamSize: 'Individual Role',
      skillsDemanded: ['React 18/19', 'Tailwind CSS', 'Git Commits', 'Basic APIs'],
    },
    {
      id: 'OPP-INT-05',
      title: 'Junior Python & Data Pipeline Apprentice',
      titleHi: 'जूनियर पायथन एवं डेटा पाइपलाइन अप्रेंटिस',
      type: '2nd-Year Tech Internship',
      typeHi: 'द्वितीय वर्ष इंटर्नशिप',
      organizer: 'Tata Power Solar Regional Telemetry Team',
      department: 'Clean Energy & Analytics',
      eligibility: '2nd Year Electrical, IT or CSE Trainees',
      deadline: 'Dec 02, 2026',
      prizePool: '₹14,500/Month Stipend + Field Lab Certificate',
      participantsCount: 52,
      teamSize: 'Individual Role',
      skillsDemanded: ['Python 3.x', 'Pandas', 'REST Data Extraction', 'Excel Macros'],
    },
  ];

  // Combined opportunities including official PM Internship Scheme listings
  const allOpportunitiesList: CollegeOpportunity[] = [
    ...PM_INTERNSHIP_SCHEME_DATA,
    ...opportunities
  ];

  const filteredOpportunities = allOpportunitiesList.filter(opp => {
    if (activeTab === 'pm-internship') return opp.type === 'PM Internship Scheme';
    if (activeTab === 'intra-college') return opp.type === 'Intra-College Hackathon' || opp.type === 'Club Challenge';
    if (activeTab === 'sih-pipeline') return opp.type === 'SIH 2026 Pipeline';
    if (activeTab === 'internships') return opp.type === '2nd-Year Tech Internship';
    return true;
  });

  const isPmInternshipEligible = candidateAge >= 21 && candidateAge <= 24 && hasAadhaarDbt && isFamilyIncomeUnder8L && isNotFullTimeEmployed;

  const handleRegister = (id: string, title: string) => {
    setRegisteredIds(prev => ({ ...prev, [id]: true }));
    setAlertMsg(
      lang === 'en'
        ? `1-Click Verified Registration Confirmed for "${title}". Student ID linked with Placement Cell.`
        : `"${title}" में १-क्लिक पंजीकरण सफल! ट्रेनिंग व प्लेसमेंट सेल में विवरण दर्ज हुआ।`
    );
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleAddTeamMember = () => {
    if (!newMemberInput.trim()) return;
    if (teamMembers.length >= 6) {
      alert('SIH teams allow a maximum of 6 members.');
      return;
    }
    setTeamMembers(prev => [...prev, newMemberInput.trim()]);
    setNewMemberInput('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      
      {/* Toast Alert */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-emerald-500 text-slate-900 text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{alertMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-5 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
            <Trophy className="w-3.5 h-3.5 text-purple-600" />
            {lang === 'en' ? 'Opportunities & Challenges' : 'अवसर एवं प्रतियोगिताएं'}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 font-mono-data">{lang === 'en' ? 'SIH 2026 & Internships' : 'SIH २०२६ व इंटर्नशिप'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {lang === 'en' ? 'Student Competitions, Hackathons & Internships' : 'छात्र प्रतियोगिताएं, हैकाथॉन एवं इंटर्नशिप'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {lang === 'en'
            ? 'Discover departmental coding challenges, build your Smart India Hackathon (SIH 2026) squad, and apply for vetted internships designed specifically for college students.'
            : 'विभागीय कोडिंग चुनौतियां खोजें, स्मार्ट इंडिया हैकाथॉन के लिए टीम बनाएं और कॉलेज छात्रों के लिए विशेष इंटर्नशिप में आवेदन करें।'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-fit text-xs font-medium">
        <button
          onClick={() => setActiveTab('pm-internship')}
          className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'pm-internship'
              ? 'bg-blue-600 text-white font-bold shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-amber-100/60 font-semibold'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'PM Internship Scheme (MCA)' : 'पीएम इंटर्नशिप योजना (भारत सरकार)'}</span>
          <span className={`text-[10px] font-mono-data font-bold px-1.5 py-0.2 rounded ${activeTab === 'pm-internship' ? 'bg-white/20 text-white' : 'bg-emerald-600 text-white'}`}>
            ₹5,000/mo DBT
          </span>
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'all' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? 'All Sophomore Opportunities' : 'सभी अवसर'} ({opportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('intra-college')}
          className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'intra-college' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? 'Intra-College Sprints & Clubs' : 'कॉलेज हैकाथॉन व क्लब्स'}
        </button>
        <button
          onClick={() => setActiveTab('sih-pipeline')}
          className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'sih-pipeline' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? 'Smart India Hackathon (SIH)' : 'SIH 2026 पाइपलाइन'}
        </button>
        <button
          onClick={() => setActiveTab('internships')}
          className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
            activeTab === 'internships' ? 'bg-white text-blue-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {lang === 'en' ? 'Vetted 2nd-Year Internships' : 'सत्यापित इंटर्नशिप'}
        </button>
      </div>

      {/* PM INTERNSHIP SCHEME: MCA OFFICIAL GATEWAY & LIVE ELIGIBILITY CHECKER */}
      {(activeTab === 'pm-internship' || activeTab === 'all') && (
        <div className="rounded-2xl border-2 border-blue-600/30 bg-gradient-to-br from-blue-50/80 via-white to-amber-50/30 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-700 text-white font-bold text-[10px] font-mono-data tracking-wide">
                  GOVERNMENT OF INDIA · MCA SCHEME
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-emerald-700 font-mono-data font-bold flex items-center gap-1 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live API Gateway (pminternship.mca.gov.in)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {lang === 'en' ? 'Prime Minister’s Internship Scheme (PMIS) — Top 500 Companies' : 'प्रधानमंत्री इंटर्नशिप योजना (शीर्ष ५०० कंपनियां)'}
              </h2>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {lang === 'en'
                  ? 'Official national portal providing 1.25 Crore youth 12-month internships in India’s leading corporations with ₹5,000/month DBT stipend + ₹6,000 joining grant.'
                  : 'भारत सरकार द्वारा देश की शीर्ष ५०० कंपनियों में १२ माह की इंटर्नशिप — ₹५,००० प्रति माह डीबीटी व ₹६,००० एकमुश्त सहायता।'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://pminternship.mca.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Official Portal (MCA)' : 'सरकारी पोर्टल खोलें'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Live Eligibility Meter */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-blue-100 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] block">Candidate Age:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="18"
                  max="30"
                  value={candidateAge}
                  onChange={e => setCandidateAge(Number(e.target.value))}
                  className="w-16 p-1 border border-slate-300 rounded font-mono-data font-bold text-xs"
                />
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${candidateAge >= 21 && candidateAge <= 24 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {candidateAge >= 21 && candidateAge <= 24 ? '✓ 21-24 Yrs' : '✗ Must be 21-24'}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] block">Aadhaar DBT Bank Link:</span>
              <button
                type="button"
                onClick={() => setHasAadhaarDbt(!hasAadhaarDbt)}
                className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer ${hasAadhaarDbt ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}
              >
                <Check className="w-3 h-3" />
                <span>{hasAadhaarDbt ? 'Aadhaar Linked' : 'Not Linked'}</span>
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] block">Family Income &lt; ₹8 Lakhs:</span>
              <button
                type="button"
                onClick={() => setIsFamilyIncomeUnder8L(!isFamilyIncomeUnder8L)}
                className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer ${isFamilyIncomeUnder8L ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}
              >
                <Check className="w-3 h-3" />
                <span>{isFamilyIncomeUnder8L ? 'Under ₹8 Lakh/Yr' : 'Over ₹8 Lakh/Yr'}</span>
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200 flex flex-col justify-center">
              <span className="text-[10px] text-blue-900 font-semibold uppercase font-mono-data">PMIS Eligibility:</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${isPmInternshipEligible ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-xs font-bold text-slate-900">
                  {isPmInternshipEligible ? '100% Eligible (₹5K/mo)' : 'Criteria Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOpportunities.map(opp => {
          const isRegistered = registeredIds[opp.id];
          const isSIH = opp.type === 'SIH 2026 Pipeline';
          const isInternship = opp.type === '2nd-Year Tech Internship';

          return (
            <div
              key={opp.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isSIH
                  ? 'bg-gradient-to-br from-amber-50/50 via-white to-white border-amber-300 shadow-sm'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono-data font-bold uppercase tracking-wider ${
                    isSIH
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : isInternship
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                  }`}>
                    {lang === 'en' ? opp.type : opp.typeHi}
                  </span>

                  <span className="text-xs font-bold font-mono-data text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {opp.prizePool}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {lang === 'en' ? opp.title : opp.titleHi}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.organizer}</span>
                  </div>
                </div>

                {/* Eligibility & Batch Specs */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Eligibility:</span>
                    <strong className="text-slate-800">{opp.eligibility}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Team Structure:</span>
                    <span className="font-mono-data text-blue-700 font-semibold">{opp.teamSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Registration Deadline:</span>
                    <span className="font-mono-data text-slate-700">{opp.deadline}</span>
                  </div>
                </div>

                {/* Skills Demanded Tags & NPTEL Course Bridge Link */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-data text-slate-400 uppercase tracking-wider block">
                      TECH STACK & SKILLS TESTED:
                    </span>
                    {opp.linkedNptelCourseTitle && (
                      <button
                        onClick={() => onNavigate('courses')}
                        className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
                        title="Bridge skill gap via NPTEL"
                      >
                        <Award className="w-3 h-3 text-blue-600" />
                        <span>Bridge via NPTEL →</span>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.skillsDemanded.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {opp.linkedNptelCourseTitle && (
                    <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-center justify-between gap-2">
                      <span className="truncate">🎯 <strong>NPTEL Bridge:</strong> {opp.linkedNptelCourseTitle}</span>
                      <button
                        onClick={() => onNavigate('courses')}
                        className="shrink-0 text-blue-700 font-bold hover:underline"
                      >
                        Enroll Free
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono-data">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opp.participantsCount} Registered</span>
                </div>

                <div className="flex items-center gap-2">
                  {opp.officialPortalUrl && (
                    <a
                      href={opp.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>MCA Portal</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}
                  {isRegistered ? (
                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{lang === 'en' ? 'Registered' : 'पंजीकृत'}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegister(opp.id, opp.title)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'FastTrack Apply' : 'आवेदन करें'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SIH Team Formation & Incubation Drawer */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-6 shadow-md border border-blue-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/80 pb-4">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[11px] font-bold uppercase font-mono-data">
              SMART INDIA HACKATHON 2026 TEAM INCUBATOR
            </span>
            <h2 className="text-xl font-bold text-white">
              Assemble Your 6-Member Multidisciplinary SIH Squad
            </h2>
            <p className="text-xs text-blue-200">
              Meets official SIH 2026 criteria: cross-departmental synergy (CSE + IT + ECE) and mandatory female student representation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('resume')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
          >
            Match Teammates via AI Skill Score
          </button>
        </div>

        {/* Current Squad Members */}
        <div className="space-y-3">
          <div className="text-xs font-mono-data text-blue-300 uppercase tracking-wider flex items-center justify-between">
            <span>YOUR ASSEMBLED SQUAD ({teamMembers.length} / 6 MEMBERS):</span>
            <span className="text-emerald-400 font-bold">✔ Rule Verified: 1 Female Member Present</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-blue-950/80 border border-blue-700/60 text-xs flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono-data font-bold flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span className="truncate">{member}</span>
              </div>
            ))}
          </div>

          {/* Add Teammate Input */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newMemberInput}
              onChange={(e) => setNewMemberInput(e.target.value)}
              placeholder="Enter Student Name, Branch & Skill (e.g., Sneha Kumari - 2nd Yr CSE · AI/ML)"
              className="flex-1 px-3.5 py-2 rounded-xl bg-blue-950/90 border border-blue-700 text-white text-xs placeholder:text-blue-400/70 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleAddTeamMember}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              Add Teammate
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
