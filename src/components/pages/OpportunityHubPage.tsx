import React, { useState } from 'react';
import { Language } from '../../types';
import { SOPHOMORE_INTERNSHIPS_DATA, SophomoreInternship } from '../../data/sophomoreInternshipsData';
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
  ShieldCheck, 
  Check, 
  UserCheck, 
  MapPin,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface OpportunityHubPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

interface IntraCollegeSprint {
  id: string;
  title: string;
  titleHi: string;
  type: 'Intra-College Hackathon' | 'Campus Club Challenge' | 'SIH 2026 Screening Pipeline';
  department: string;
  organizer: string;
  eligibility: string;
  deadline: string;
  prizePool: string;
  participantsCount: number;
  teamSize: string;
  techStack: string[];
  isSIH?: boolean;
}

export const OpportunityHubPage: React.FC<OpportunityHubPageProps> = ({ lang, onNavigate }) => {
  // Two clean primary sub-tabs matching specification
  const [primaryTab, setPrimaryTab] = useState<'sih-arena' | 'sophomore-internships'>('sih-arena');
  
  // Filter within Internships: all, remote/hybrid, pmis
  const [internshipFilter, setInternshipFilter] = useState<'all' | 'pm-scheme' | 'corporate-vetted'>('all');

  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ks_registered_opportunities');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [registrationModalItem, setRegistrationModalItem] = useState<{ id: string; title: string; type: string } | null>(null);

  // SIH 6-Member Multidisciplinary Squad state
  const [sihDomain, setSihDomain] = useState<string>('smart-automation');
  const [teamMembers, setTeamMembers] = useState<string[]>([
    'Aman Sharma (2nd Yr CSE · Team Lead & Distributed Systems)',
    'Priya Verma (2nd Yr CSE · React Frontend & UI Lead)',
    'Rahul K. Gupta (2nd Yr IT · Node.js & Database Architect)',
    'Neha Singh (2nd Yr ECE · Embedded IoT & Hardware Lead)',
    'Aditya Srivastava (2nd Yr Mech · CAD Robotics & Sensor Enclosures)'
  ]);
  const [newMemberInput, setNewMemberInput] = useState<string>('');

  // Intra-College & SIH Arena Dataset (Departmental Sprints, Club Challenges, SIH Pipeline)
  const intraCollegeChallenges: IntraCollegeSprint[] = [
    {
      id: 'SPRINT-CSE-01',
      title: 'Sophomore Departmental Code Sprint (CSE vs IT Tech Derby)',
      titleHi: 'द्वितीय वर्ष अंतर-विभागीय कोड स्प्रिंट (सीएसई बनाम आईटी)',
      type: 'Intra-College Hackathon',
      department: 'CSE & IT Departments',
      organizer: 'Institute Placement Cell & Dept. of Computer Science',
      eligibility: '3rd & 4th Semester Regular Students Only',
      deadline: 'Dec 08, 2026',
      prizePool: '₹25,000 Cash + Direct T&P Corporate Shortlist',
      participantsCount: 164,
      teamSize: '2 - 4 Members',
      techStack: ['Data Structures', 'React / TypeScript', 'REST APIs', 'Git Pull Requests']
    },
    {
      id: 'SIH-SCREEN-02',
      title: 'Smart India Hackathon (SIH 2026) Institutional Incubator & Screening',
      titleHi: 'स्मार्ट इंडिया हैकाथॉन (SIH 2026) कॉलेज स्क्रीनिंग एवं इनक्यूबेटर',
      type: 'SIH 2026 Screening Pipeline',
      department: 'All Engineering Disciplines (Multidisciplinary)',
      organizer: 'Institution Innovation Council (IIC) & Ministry of Education',
      eligibility: 'Sophomore & Junior Teams (Mandatory 1 Female Teammate)',
      deadline: 'Dec 15, 2026',
      prizePool: '₹1,00,000 National Grant + SIH Grand Finale Nomination',
      participantsCount: 420,
      teamSize: '6 Members Strictly',
      techStack: ['AI/ML Architecture', 'Cloud Services', 'Hardware Prototype', 'Pitch Presentation'],
      isSIH: true
    },
    {
      id: 'CLUB-IEEE-03',
      title: 'IEEE & GDSC Campus Autonomous Robotics & IoT Challenge',
      titleHi: 'आईईईई एवं जीडीएससी रोबोटिक्स व आईओटी चैलेंज',
      type: 'Campus Club Challenge',
      department: 'ECE, Mechanical & Robotics Clubs',
      organizer: 'IEEE Student Branch & Google Developer Student Club',
      eligibility: '2nd-Year Hands-on Hardware & Firmware Builders',
      deadline: 'Dec 20, 2026',
      prizePool: 'Hardware Development Kits + ₹15,000 Cash',
      participantsCount: 92,
      teamSize: '3 - 5 Members',
      techStack: ['ESP32 / Arduino', 'C++ Embedded', 'Sensor Interfacing', 'MQTT Telemetry']
    },
    {
      id: 'SPRINT-MECH-04',
      title: 'CAD SolidWorks 3D Rapid Prototyping Sprint',
      titleHi: 'सॉलिडवर्क्स 3D प्रोटोटाइपिंग स्प्रिंट',
      type: 'Intra-College Hackathon',
      department: 'Mechanical & Civil Engineering',
      organizer: 'Makerspace Lab & Department of Mechanical Engineering',
      eligibility: '2nd-Year Engineering Diploma / Degree Students',
      deadline: 'Dec 22, 2026',
      prizePool: '3D Printer Access + ₹10,000 Cash',
      participantsCount: 58,
      teamSize: '2 - 3 Members',
      techStack: ['SolidWorks', 'AutoCAD', 'Finite Element Analysis', '3D Slicing']
    }
  ];

  const handleOpenRegistration = (item: { id: string; title: string; type: string }) => {
    setRegistrationModalItem(item);
  };

  const handleConfirmRegistration = () => {
    if (!registrationModalItem) return;
    const updated = { ...registeredIds, [registrationModalItem.id]: true };
    setRegisteredIds(updated);
    try {
      localStorage.setItem('ks_registered_opportunities', JSON.stringify(updated));
    } catch {}

    setAlertMsg(`1-Click Registration Confirmed for "${registrationModalItem.title}". Student ID linked with T&P Cell.`);
    setRegistrationModalItem(null);
    setTimeout(() => setAlertMsg(null), 4500);
  };

  const handleAddTeamMember = () => {
    if (!newMemberInput.trim()) return;
    if (teamMembers.length >= 6) {
      alert('SIH official regulations permit a maximum of 6 members.');
      return;
    }
    setTeamMembers(prev => [...prev, newMemberInput.trim()]);
    setNewMemberInput('');
  };

  // Gender diversity check for SIH Squad: checks for female first names
  const hasFemaleMember = teamMembers.some(m => 
    m.toLowerCase().includes('priya') || 
    m.toLowerCase().includes('neha') || 
    m.toLowerCase().includes('sunita') || 
    m.toLowerCase().includes('shreya') || 
    m.toLowerCase().includes('pooja') || 
    m.toLowerCase().includes('female')
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      
      {/* Toast Alert */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{alertMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
              <Trophy className="w-3.5 h-3.5 text-purple-600" />
              <span>2nd-Year Verified Opportunity Ecosystem</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono-data">Zero 3+ Yrs Experience Barriers</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Student Opportunity & Hackathon Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Curated specifically for 3rd and 4th semester engineering students: intra-college departmental code sprints, Smart India Hackathon squad builder, and verified corporate internships.
          </p>
        </div>

        {/* 1-Click FastTrack Seal */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div className="text-xs">
            <span className="text-slate-500 block">Registration Flow:</span>
            <span className="font-bold text-purple-900 font-mono-data text-sm">1-Click Student ID Verified</span>
          </div>
        </div>
      </div>

      {/* PRIMARY SUB-TABS NAVIGATION (MATCHING SPECIFICATION) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setPrimaryTab('sih-arena')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            primaryTab === 'sih-arena'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Intra-College & SIH Arena</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-mono-data ${primaryTab === 'sih-arena' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {intraCollegeChallenges.length}
          </span>
        </button>

        <button
          onClick={() => setPrimaryTab('sophomore-internships')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            primaryTab === 'sophomore-internships'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>2nd-Year Vetted Internships</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-mono-data ${primaryTab === 'sophomore-internships' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {SOPHOMORE_INTERNSHIPS_DATA.length + PM_INTERNSHIP_SCHEME_DATA.length}
          </span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: INTRA-COLLEGE & SIH ARENA                    */}
      {/* ======================================================== */}
      {primaryTab === 'sih-arena' && (
        <div className="space-y-8">
          
          {/* SIH 6-MEMBER MULTIDISCIPLINARY SQUAD INCUBATOR */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white space-y-6 shadow-md border border-blue-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/80 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10.5px] font-bold uppercase font-mono-data">
                  SMART INDIA HACKATHON (SIH 2026) TEAM INCUBATOR
                </span>
                <h2 className="text-xl font-bold text-white">
                  Assemble Your 6-Member Multidisciplinary SIH Squad
                </h2>
                <p className="text-xs text-blue-200">
                  Meets official SIH regulations: 6 students strictly, cross-departmental synergy (CSE + IT + ECE + Mech), and mandatory female member representation.
                </p>
              </div>

              {/* Diversity Indicator Pill */}
              <div className="flex items-center gap-2 shrink-0">
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono-data flex items-center gap-1.5 ${
                  hasFemaleMember 
                    ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' 
                    : 'bg-rose-900/60 border-rose-500 text-rose-300'
                }`}>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{hasFemaleMember ? 'Female Representation: Verified' : 'Add 1 Female Member (Mandatory)'}</span>
                </div>
              </div>
            </div>

            {/* Squad Members List */}
            <div className="space-y-2">
              <div className="text-xs font-mono-data text-blue-300 font-bold uppercase tracking-wider flex justify-between">
                <span>Current Squad Roster ({teamMembers.length} / 6 members):</span>
                <span>{6 - teamMembers.length} slots remaining</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/60 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-mono-data font-bold text-[10px] shrink-0">
                        0{idx + 1}
                      </div>
                      <span className="truncate text-slate-200">{member}</span>
                    </div>
                    {idx >= 3 && (
                      <button
                        type="button"
                        onClick={() => setTeamMembers(prev => prev.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400 font-bold text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add Member Input Bar */}
            {teamMembers.length < 6 && (
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <input
                  type="text"
                  value={newMemberInput}
                  onChange={e => setNewMemberInput(e.target.value)}
                  placeholder="Enter teammate name & branch (e.g. 'Shreya Das - 2nd Yr IT · Cloud Dev')..."
                  className="flex-1 p-2.5 rounded-xl bg-blue-900/40 border border-blue-700 text-white text-xs placeholder:text-blue-300/50 focus:outline-none focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={handleAddTeamMember}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Squad Member</span>
                </button>
              </div>
            )}
          </div>

          {/* INTRA-COLLEGE CHALLENGES GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase font-mono-data tracking-wider">
                Active Departmental Sprints & Hackathons
              </h2>
              <span className="text-xs text-slate-500 font-mono-data">Zero External Forms Required</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {intraCollegeChallenges.map(sprint => {
                const isRegistered = registeredIds[sprint.id];

                return (
                  <div
                    key={sprint.id}
                    className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      sprint.isSIH
                        ? 'bg-gradient-to-br from-amber-50/40 via-white to-white border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10.5px] font-mono-data font-bold uppercase tracking-wider ${
                          sprint.isSIH
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-blue-100 text-blue-900 border border-blue-200'
                        }`}>
                          {sprint.type}
                        </span>
                        <span className="text-xs font-bold font-mono-data text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                          {sprint.prizePool}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {sprint.title}
                        </h3>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sprint.organizer}</span>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Eligibility:</span>
                          <strong className="text-slate-900">{sprint.eligibility}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Team Size:</span>
                          <span className="font-mono-data text-blue-700 font-bold">{sprint.teamSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Registration Deadline:</span>
                          <span className="font-mono-data text-slate-700">{sprint.deadline}</span>
                        </div>
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono-data text-slate-400 uppercase font-bold tracking-wider">
                          TECH SKILLS TESTED:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sprint.techStack.map((tech, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-100">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Registration Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono-data">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sprint.participantsCount} Registered</span>
                      </div>

                      {isRegistered ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Student ID Verified</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenRegistration({ id: sprint.id, title: sprint.title, type: sprint.type })}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>1-Click ID Register</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: 2ND-YEAR VETTED INTERNSHIPS (8 CORPORATE + PMIS) */}
      {/* ======================================================== */}
      {primaryTab === 'sophomore-internships' && (
        <div className="space-y-6">
          
          {/* Sub-Filters Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                onClick={() => setInternshipFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  internshipFilter === 'all'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Sophomore Opportunities ({SOPHOMORE_INTERNSHIPS_DATA.length + PM_INTERNSHIP_SCHEME_DATA.length})
              </button>

              <button
                onClick={() => setInternshipFilter('corporate-vetted')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  internshipFilter === 'corporate-vetted'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Corporate Sophomore Roles ({SOPHOMORE_INTERNSHIPS_DATA.length})
              </button>

              <button
                onClick={() => setInternshipFilter('pm-scheme')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  internshipFilter === 'pm-scheme'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <span>PM Internship Scheme (₹5K/mo DBT)</span>
                <span className="text-[10px] font-mono-data bg-white/20 px-1.5 py-0.2 rounded">
                  {PM_INTERNSHIP_SCHEME_DATA.length}
                </span>
              </button>
            </div>

            <div className="text-xs font-mono-data text-emerald-700 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Vetted for 0-1 Yr Experience</span>
            </div>
          </div>

          {/* INTERNSHIP CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Corporate Sophomore Roles */}
            {(internshipFilter === 'all' || internshipFilter === 'corporate-vetted') && 
              SOPHOMORE_INTERNSHIPS_DATA.map(intern => {
                const isRegistered = registeredIds[intern.id];

                return (
                  <div
                    key={intern.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[10.5px] font-mono-data font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {intern.mode} · 2nd-Year Tech Role
                        </span>
                        <span className="text-xs font-mono-data font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                          {intern.stipend}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {intern.title}
                        </h3>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-semibold text-slate-800">{intern.company}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {intern.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {intern.description}
                      </p>

                      {/* Specs Strip */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Eligibility:</span>
                          <span className="font-medium text-slate-900">{intern.eligibility}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Duration:</span>
                          <span className="font-mono-data text-slate-800">{intern.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">T&P Cell Verification:</span>
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified for 2026 Batch</span>
                          </span>
                        </div>
                      </div>

                      {/* Skills Chips */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono-data text-slate-400 uppercase font-bold tracking-wider">
                          REQUIRED SKILLS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {intern.skills.map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-100">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <span className="text-xs text-slate-500 font-mono-data">
                        {intern.openings} Openings Available
                      </span>

                      {isRegistered ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Application Submitted</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenRegistration({ id: intern.id, title: intern.title, type: 'Sophomore Internship' })}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>1-Click Apply via ID</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            }

            {/* 2. Official PM Internship Scheme Offerings */}
            {(internshipFilter === 'all' || internshipFilter === 'pm-scheme') &&
              PM_INTERNSHIP_SCHEME_DATA.map(pmis => {
                const isRegistered = registeredIds[pmis.id];

                return (
                  <div
                    key={pmis.id}
                    className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/40 via-white to-blue-50/30 border-2 border-emerald-500/40 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[10.5px] font-mono-data font-bold uppercase tracking-wider bg-emerald-700 text-white">
                          PM INTERNSHIP SCHEME (MCA)
                        </span>
                        <span className="text-xs font-mono-data font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                          {pmis.prizePool.split('+')[0].trim()}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {pmis.title}
                        </h3>
                        <div className="text-xs text-slate-600 flex items-center gap-2 mt-1">
                          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                          <strong className="text-slate-900">{pmis.pmSchemeCompany}</strong>
                          <span>·</span>
                          <span className="text-slate-500">{pmis.department}</span>
                        </div>
                      </div>

                      {/* Benefits & Grants */}
                      <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Govt DBT Stipend:</span>
                          <strong className="text-emerald-800">{pmis.dbtStipend}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Incident Grant:</span>
                          <span className="font-mono-data text-blue-700 font-bold">{pmis.oneTimeGrant}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Eligibility:</span>
                          <span className="text-slate-800">{pmis.eligibility}</span>
                        </div>
                      </div>

                      {/* NPTEL Bridge Link */}
                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
                        <span className="truncate">
                          🎯 <strong>Bridge Skill Gap via:</strong> {pmis.linkedNptelCourseTitle}
                        </span>
                        <button
                          onClick={() => onNavigate('courses')}
                          className="shrink-0 text-blue-700 font-bold hover:underline"
                        >
                          View NPTEL →
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <a
                        href={pmis.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1"
                      >
                        <span>MCA Portal</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>

                      {isRegistered ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>FastTrack Applied</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenRegistration({ id: pmis.id, title: pmis.title, type: 'PM Internship Scheme' })}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>1-Click FastTrack</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>

        </div>
      )}

      {/* 1-CLICK VERIFIED REGISTRATION MODAL */}
      {registrationModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-data font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {registrationModalItem.type}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Confirm 1-Click FastTrack Registration
                </h3>
              </div>
              <button
                onClick={() => setRegistrationModalItem(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div className="font-bold text-slate-900">
                {registrationModalItem.title}
              </div>
              <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Student Name:</span>
                  <strong>Aman Sharma</strong>
                </div>
                <div className="flex justify-between">
                  <span>College Roll ID:</span>
                  <span className="font-mono-data font-bold text-blue-700">2024-CSE-084</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic Standing:</span>
                  <span>B.Tech CSE — 3rd Sem (2nd Year)</span>
                </div>
                <div className="flex justify-between">
                  <span>Dynamic Skill Score:</span>
                  <span className="font-mono-data font-bold text-emerald-700">785 / 1000 (Top 4%)</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              By confirming, your verified student capability index and GitHub repository proof-of-work are directly transmitted to the Placement Officer & Evaluation Committee. Zero external Google Forms needed.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setRegistrationModalItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRegistration}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Confirm & Submit Registration</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
