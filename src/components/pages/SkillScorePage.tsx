import React, { useState, useEffect } from 'react';
import { Language, UserProfile } from '../../types';
import { 
  Award, 
  Code, 
  GitCommit, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  Building2, 
  Sparkles, 
  Terminal,
  Activity,
  AlertTriangle,
  ArrowRight,
  Zap,
  Calendar,
  Flame,
  UserCheck
} from 'lucide-react';

interface SkillScorePageProps {
  lang: Language;
  userProfile?: UserProfile | null;
  onNavigate: (page: string) => void;
}

export const SkillScorePage: React.FC<SkillScorePageProps> = ({ lang, userProfile, onNavigate }) => {
  const [githubUrl, setGithubUrl] = useState<string>('https://github.com/aman-sharma/campus-distributed-kv');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Exact 785 / 1000 dynamic score state with 40/35/25 meritocratic breakdown
  const [scoreState, setScoreState] = useState({
    overallScore: 785,
    maxScore: 1000,
    percentileRank: 96.4,
    codeEngineScore: 314, // 40% of 1000 (max 400) -> 78.5%
    codeEngineMax: 400,
    projectAuditScore: 275, // 35% of 1000 (max 350) -> 78.5%
    projectAuditMax: 350,
    consistencyScore: 196, // 25% of 1000 (max 250) -> 78.5%
    consistencyMax: 250,
    githubCommitsMonth: 48,
    dsaSolvedCount: 134,
    streakDays: 19,
    facultyStatus: 'Verified by Placement Cell (T&P Cell)',
    targetRole: 'Junior Systems & Distributed Backend Trainee',
    verifiedDsaTestsPassed: 42,
  });

  const handleAuditRepo = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setScoreState(prev => {
        const newCode = Math.min(prev.codeEngineMax, prev.codeEngineScore + 12);
        const newTotal = newCode + prev.projectAuditScore + prev.consistencyScore;
        return {
          ...prev,
          codeEngineScore: newCode,
          overallScore: newTotal,
          githubCommitsMonth: prev.githubCommitsMonth + 4,
          verifiedDsaTestsPassed: prev.verifiedDsaTestsPassed + 3,
          percentileRank: 97.1,
        };
      });
      setIsAuditing(false);
      setAlertMsg(
        lang === 'en'
          ? 'GitHub repository parsed: 4 verified commits, modular Rust/C++ architecture, and 3 unit tests credited (+12 pts).'
          : 'गिटहब रिपॉजिटरी ऑडिट सफल: ४ कमिट्स और यूनिट टेस्ट्स सत्यापित (+१२ अंक जुड़े)।'
      );
      setTimeout(() => setAlertMsg(null), 4500);
    }, 1200);
  };

  const handleExportPlacementDossier = () => {
    setAlertMsg(
      lang === 'en'
        ? 'Official T&P Cell Placement Dossier PDF generated with cryptographic verification hash.'
        : 'सत्यापित प्लेसमेंट डॉसियर पीडीएफ तैयार किया गया।'
    );
    setTimeout(() => setAlertMsg(null), 4500);
  };

  // SVG Gauge calculations for animated semi-circle / radial gauge
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreState.overallScore / scoreState.maxScore) * circumference;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      
      {/* Toast Alert */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{alertMsg}</span>
        </div>
      )}

      {/* TOP LIVE CAMPUS ALERT BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/80 p-4 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <div className="text-xs">
              <span className="font-bold text-amber-300 font-mono-data mr-2">LIVE CAMPUS RADAR:</span>
              <span className="text-slate-200">
                <strong>Main Highway Gate: 85% Congestion (Heavy)</strong> — Reroute via <strong>Gate 2 North</strong> to save <strong>18 mins</strong> before 9:00 AM labs.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-data shrink-0">
            <button
              onClick={() => onNavigate('mobility')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
            >
              View Gate Radar →
            </button>
            <button
              onClick={() => onNavigate('opportunities')}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors cursor-pointer"
            >
              SIH 2026 Arena →
            </button>
          </div>
        </div>
      </div>

      {/* 2ND-YEAR STUDENT PROFILE HEADER & EXECUTIVE OVERVIEW */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Profile Lockup Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-blue-500/20 shrink-0">
              AS
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Aman Sharma
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Placement Cell Verified</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-mono-data text-xs font-semibold">
                  Roll: 2024-CSE-084
                </span>
              </div>

              <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold text-slate-800">B.Tech Computer Science & Engineering — 3rd Semester (2nd Year)</span>
                <span className="text-slate-300">·</span>
                <span>Institute of Engineering & Technology (IET)</span>
                <span className="text-slate-300">·</span>
                <span className="text-emerald-700 font-semibold font-mono-data">Batch 2024–2028</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportPlacementDossier}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-300" />
              <span>Export Placement Cell Dossier</span>
            </button>
            <button
              onClick={() => onNavigate('resume')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Run ATS Resume Studio</span>
            </button>
          </div>
        </div>

        {/* HERO GAUGE & COMPOSITE KPI SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Animated SVG Radial Gauge Column (Score 785 / 1000) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 border border-blue-100 text-center space-y-3">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Track */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  className="text-slate-100"
                  strokeWidth="14"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Animated Value Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  className="text-blue-600 transition-all duration-1000 ease-out"
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono-data uppercase tracking-wider text-slate-500 font-bold">
                  DYNAMIC SKILL SCORE
                </span>
                <div className="text-4xl font-extrabold text-slate-900 font-mono-data tracking-tight">
                  {scoreState.overallScore}
                  <span className="text-sm font-normal text-slate-400"> / {scoreState.maxScore}</span>
                </div>
                <div className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  Top {100 - scoreState.percentileRank}% Percentile
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900">
                Corporate Recruiter Readiness Index
              </div>
              <p className="text-[11px] text-slate-500 max-w-xs">
                Audited against verified GitHub commits, automated DSA problem executions, and faculty capstone audits.
              </p>
            </div>
          </div>

          {/* EXACT MERITOCRATIC 3-TIER BREAKDOWN (40% / 35% / 25%) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-xs font-bold text-slate-900 font-mono-data uppercase tracking-wider">
                Meritocratic Breakdown (Senate Formula)
              </h3>
              <span className="text-xs font-mono-data text-blue-700 font-bold">
                Total Composite: {scoreState.overallScore} pts
              </span>
            </div>

            {/* Pillar A: 40% Automated Code & Assessment Engine */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">40% Automated Code & Assessment Engine</span>
                    <span className="block text-[11px] text-slate-500">GitHub commits & DSA algorithmic test cases</span>
                  </div>
                </div>
                <div className="text-right font-mono-data">
                  <span className="font-bold text-blue-700 text-sm">{scoreState.codeEngineScore}</span>
                  <span className="text-slate-400 text-xs"> / {scoreState.codeEngineMax} pts</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                  style={{ width: `${(scoreState.codeEngineScore / scoreState.codeEngineMax) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-600 pt-0.5">
                <span>{scoreState.dsaSolvedCount} DSA Problems Solved</span>
                <span>{scoreState.verifiedDsaTestsPassed} LeetCode/CodeChef Test Suites Passed</span>
              </div>
            </div>

            {/* Pillar B: 35% Faculty & Peer-Reviewed Project Audits */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">35% Faculty & Peer-Reviewed Project Audits</span>
                    <span className="block text-[11px] text-slate-500">Capstone demos, hackathons & code reviews</span>
                  </div>
                </div>
                <div className="text-right font-mono-data">
                  <span className="font-bold text-purple-700 text-sm">{scoreState.projectAuditScore}</span>
                  <span className="text-slate-400 text-xs"> / {scoreState.projectAuditMax} pts</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div 
                  className="h-full bg-purple-600 rounded-full transition-all duration-500" 
                  style={{ width: `${(scoreState.projectAuditScore / scoreState.projectAuditMax) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-600 pt-0.5">
                <span>Lab Demonstration: Grade O (Outstanding)</span>
                <span>SIH College Nominee Review: Approved</span>
              </div>
            </div>

            {/* Pillar C: 25% Consistency & Campus Engagement */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">25% Consistency & Campus Engagement</span>
                    <span className="block text-[11px] text-slate-500">Weekly coding streaks & tech symposiums</span>
                  </div>
                </div>
                <div className="text-right font-mono-data">
                  <span className="font-bold text-emerald-700 text-sm">{scoreState.consistencyScore}</span>
                  <span className="text-slate-400 text-xs"> / {scoreState.consistencyMax} pts</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                  style={{ width: `${(scoreState.consistencyScore / scoreState.consistencyMax) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-600 pt-0.5">
                <span>{scoreState.streakDays}-Day Active Coding Streak</span>
                <span>4 Club Workshops Attended</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* LIVE GITHUB REPO AUDIT SIMULATOR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Automated GitHub Codebase Telemetry & Audit</span>
            </h3>
            <p className="text-xs text-slate-500">
              Paste your public repository URL to run automated AST parsing, test coverage analysis, and code hygiene evaluation.
            </p>
          </div>
          <span className="text-[11px] font-mono-data text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold shrink-0">
            Real-Time Engine
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username/project-repo"
            className="flex-1 w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono-data text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
          <button
            onClick={handleAuditRepo}
            disabled={isAuditing}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Parsing AST & Commits...' : 'Run Automated Audit'}</span>
          </button>
        </div>

        {/* Audit Evidence Micro-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono-data text-slate-400 font-bold uppercase">COMMITS THIS MONTH</span>
            <div className="text-lg font-bold font-mono-data text-blue-700">{scoreState.githubCommitsMonth} verified commits</div>
            <div className="text-[11px] text-slate-500">Zero force-pushes or commit squashes</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono-data text-slate-400 font-bold uppercase">DSA TEST SUITE CLEARANCE</span>
            <div className="text-lg font-bold font-mono-data text-emerald-700">{scoreState.dsaSolvedCount} test cases passing</div>
            <div className="text-[11px] text-slate-500">LeetCode Medium / CodeChef 3★ equivalence</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono-data text-slate-400 font-bold uppercase">T&P CELL REPUTATION</span>
            <div className="text-lg font-bold font-mono-data text-indigo-700">Tier-1 Cleared</div>
            <div className="text-[11px] text-slate-500">Shortlisted for Google, TCS Digital & Infosys</div>
          </div>
        </div>
      </div>

    </div>
  );
};
