import React, { useState } from 'react';
import { Language, UserProfile, LiveSkillScoreData } from '../../types';
import { 
  Award, 
  Code, 
  CheckCircle2, 
  Github, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  Activity, 
  Zap, 
  TrendingUp, 
  GitCommit, 
  FileCheck, 
  Building2, 
  ArrowRight,
  ExternalLink,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface SkillScorePageProps {
  lang: Language;
  userProfile: UserProfile | null;
  onNavigate: (page: string) => void;
}

export const SkillScorePage: React.FC<SkillScorePageProps> = ({ lang, userProfile, onNavigate }) => {
  const [githubUrl, setGithubUrl] = useState<string>('https://github.com/priya-sharma/tally-erp-pipeline');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Dynamic Proof-of-Work State (Calculated according to the 40/35/25 weight ratio in Proposal)
  const [scoreData, setScoreData] = useState<LiveSkillScoreData>({
    studentName: userProfile?.name || 'Priya Sharma',
    studentId: '2024-CSE-084',
    department: 'Computer Science & Information Technology',
    semester: '4th Semester (2nd Year)',
    overallScore: 89,
    percentileRank: 96.4,
    codeAlgorithmicScore: 92, // 40% weight
    projectAuditScore: 87,    // 35% weight
    consistencyScore: 88,     // 25% weight
    githubCommitsThisMonth: 46,
    dsaProblemsSolved: 128,
    facultyAuditStatus: 'Verified by Placement Cell',
    recruiterReadiness: 'Google / MS Ready',
  });

  const handleAuditRepo = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setScoreData(prev => ({
        ...prev,
        codeAlgorithmicScore: Math.min(100, prev.codeAlgorithmicScore + 2),
        overallScore: Math.min(99, prev.overallScore + 1),
        githubCommitsThisMonth: prev.githubCommitsThisMonth + 4,
        percentileRank: 97.2
      }));
      setIsAuditing(false);
      setAlertMsg(
        lang === 'en'
          ? 'GitHub repository parsed: 4 verified commits & clean modular architecture credited to your Live Skill Index.'
          : 'गिटहब रिपोजिटरी ऑडिट सफल: ४ सत्यापित कमिट्स एवं स्वच्छ कोड संरचना आपके स्किल स्कोर में जोड़ी गई।'
      );
      setTimeout(() => setAlertMsg(null), 4000);
    }, 1200);
  };

  const handleExportPlacementDossier = () => {
    setAlertMsg(
      lang === 'en'
        ? 'Verified Placement Cell Dossier generated. T&P Officer notified for upcoming corporate recruitment drive.'
        : 'सत्यापित प्लेसमेंट डोजियर तैयार! आगामी कैंपस प्लेसमेंट ड्राइव के लिए टीएंडपी सेल को भेजा गया।'
    );
    setTimeout(() => setAlertMsg(null), 4000);
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
        <div className="inline-flex items-center gap-2 text-xs font-mono-data text-blue-700 font-bold tracking-wider uppercase">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-100 text-blue-900">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            PILLAR 3: DYNAMIC LIVE SKILL SCORE
          </span>
          <span>·</span>
          <span>TAMPER-PROOF PROOF-OF-WORK INDEX</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          {lang === 'en' ? 'Continuous Proof-of-Work & Placement Index' : 'लाइव कौशल स्कोर एवं सत्यापित क्षमता सूचकांक'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {lang === 'en'
            ? 'Replace inflated static resume bullets and unverified CGPA with an objective capability index. Visiting recruiters (Google, Microsoft, TCS, Infosys) can filter students by verified day-one developer performance.'
            : 'पारंपरिक रिज्यूम और केवल किताबी सीजीपीए के स्थान पर वास्तविक कोड कमिट्स, लैब प्रोजेक्ट्स और तकनीकी निरंतरता का वस्तुनिष्ठ स्कोर — ताकि कैंपस आने वाली कंपनियों को मिले सत्यापित प्रतिभा।'}
        </p>
      </div>

      {/* Main Composite Score Hero Widget */}
      <div className="rounded-2xl border-2 border-blue-600/30 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left Student Info & Summary */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{scoreData.facultyAuditStatus}</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {scoreData.studentName} · {scoreData.department}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1 font-medium font-mono-data">
                <span>Student ID: {scoreData.studentId}</span>
                <span>·</span>
                <span>{scoreData.semester}</span>
                <span>·</span>
                <span className="text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded">
                  {scoreData.recruiterReadiness}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {lang === 'en'
                ? 'Your composite score places you in the top 3.6% of all 2nd-year engineering & vocational cohorts across Uttar Pradesh. Audited automatically via GitHub commits, automated DSA problem tests, and faculty capstone audits.'
                : 'आपका समग्र स्कोर आपको उत्तर प्रदेश के सभी द्वितीय वर्ष के छात्रों के शीर्ष ३.६% में रखता है। यह गिटहब कमिट्स, डीएसए टेस्ट एवं लैब प्रोजेक्ट्स के आधार पर स्वचालित रूप से गणना किया गया है।'}
            </p>
          </div>

          {/* Right Composite Gauge */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-md flex flex-col items-center justify-center w-full lg:w-64 shrink-0 space-y-2 text-center">
            <span className="text-[10px] font-mono-data text-slate-400 font-bold uppercase tracking-wider">
              DYNAMIC SKILL SCORE
            </span>
            <div className="text-5xl font-extrabold text-blue-700 font-mono-data">
              {scoreData.overallScore}
              <span className="text-lg text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Top {100 - scoreData.percentileRank}% Percentile Batch Rank
            </div>
            <button
              onClick={handleExportPlacementDossier}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export T&P Dossier</span>
            </button>
          </div>

        </div>
      </div>

      {/* The 3 Weighted Pillars Breakdown (40% / 35% / 25%) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase font-mono-data tracking-wider">
            THE 3-TIER CAPABILITY MATRIX (ACADEMIC SENATE PROPOSAL ARCHITECTURE)
          </h3>
          <span className="text-xs text-slate-500 font-mono-data">Weighted Formula</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Pillar 1: 40% Automated Code & DSA */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-mono-data font-bold text-xs border border-blue-200">
                40% WEIGHT
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Automated Code & Assessment Engine
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Evaluates algorithmic problem-solving speed, clean Git branch practices, and DSA test-case accuracy.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 font-mono-data text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Pillar Score:</span>
                <strong className="text-blue-700 font-bold text-base">{scoreData.codeAlgorithmicScore}/100</strong>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>DSA Problems Cleared:</span>
                <span className="font-bold">{scoreData.dsaProblemsSolved} Solved</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Monthly GitHub Commits:</span>
                <span className="font-bold">{scoreData.githubCommitsThisMonth} Commits</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: 35% Faculty & Peer Project Audits */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-mono-data font-bold text-xs border border-purple-200">
                35% WEIGHT
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Faculty & Peer-Reviewed Project Audits
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Objective scoring of semester mini-projects, capstone architectures, and intra-college hackathon demonstrations.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 font-mono-data text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Pillar Score:</span>
                <strong className="text-purple-700 font-bold text-base">{scoreData.projectAuditScore}/100</strong>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Verified Capstones:</span>
                <span className="font-bold">2 Microservices</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Faculty Lab Endorsement:</span>
                <span className="font-bold text-emerald-600">Grade A+ (Distinction)</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: 25% Consistency & Campus Engagement */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 font-mono-data font-bold text-xs border border-amber-200">
                25% WEIGHT
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Consistency & Technical Engagement
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tracks weekly coding habit streaks, IEEE/GDSC workshop attendance, and active participation in technical symposiums.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 font-mono-data text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Pillar Score:</span>
                <strong className="text-amber-800 font-bold text-base">{scoreData.consistencyScore}/100</strong>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Active Coding Streak:</span>
                <span className="font-bold text-blue-700">19 Days Running</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Technical Fests & Workshops:</span>
                <span className="font-bold">5 Attended</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Live GitHub Repository Audit Simulator */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Github className="w-4 h-4 text-blue-400" />
              <span>Connect & Audit Your 2nd-Year Project Repository</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste your public GitHub repo URL to credit new commits, tests, and documentation to your Live Skill Index.
            </p>
          </div>
          <span className="text-[10px] font-mono-data text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
            100% FREE GIT PARSER
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/your-username/your-repo"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono-data focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAuditRepo}
            disabled={isAuditing}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing Commits...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Run Live Code Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
