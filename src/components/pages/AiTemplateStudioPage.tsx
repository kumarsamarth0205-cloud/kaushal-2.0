import React, { useState } from 'react';
import { Language } from '../../types';
import { 
  Sparkles, 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Layers, 
  Trophy, 
  FileText, 
  Code2, 
  GraduationCap, 
  CheckCircle2, 
  Cpu, 
  Terminal,
  Zap,
  Bookmark
} from 'lucide-react';

interface AiTemplateStudioPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

interface TemplateOption {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  badge: string;
  format: 'LaTeX (.tex)' | 'Markdown (.md)' | 'SRS Document (.md)';
  description: string;
  icon: any;
}

export const AiTemplateStudioPage: React.FC<AiTemplateStudioPageProps> = ({
  lang,
  onNavigate,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('template-capstone');
  const [selectedBranch, setSelectedBranch] = useState<'CSE' | 'AIML' | 'ECE' | 'CORE'>('CSE');
  const [projectTitle, setProjectTitle] = useState<string>('Kaushal Setu: Distributed Campus Mobility & AST Code Verification Mesh');
  const [authorName, setAuthorName] = useState<string>('Aman Sharma (Roll: 2024-CSE-084)');
  const [collegeName, setCollegeName] = useState<string>('Institute of Engineering & Technology (IET) Lucknow, AKTU');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const templates: TemplateOption[] = [
    {
      id: 'template-capstone',
      title: 'B.Tech Major/Minor Capstone Proposal & SRS',
      titleHi: 'बी.टेक मेजर/माइनर प्रोजेक्ट प्रपोजल व एसआरएस',
      category: 'Academic Senate & HOD Review',
      badge: 'AICTE Annexure-III Aligned',
      format: 'SRS Document (.md)',
      description: 'Comprehensive software requirements specification: Architecture ASCII, Functional Specs, ERD Schema, and Sprints.',
      icon: Layers
    },
    {
      id: 'template-sih',
      title: 'Smart India Hackathon (SIH 2026) Winning 1-Pager',
      titleHi: 'स्मार्ट इंडिया हैकाथॉन २०२६ विनिंग पिच डेक',
      category: 'National Hackathons',
      badge: 'MIC AICTE Jury Verified',
      format: 'Markdown (.md)',
      description: 'Jury-tested 1-page pitch template: Problem Statement ID, Novelty, System Flowchart, Budget, and Social Impact.',
      icon: Trophy
    },
    {
      id: 'template-latex-resume',
      title: 'Tier-1 SDE Single-Column LaTeX Resume',
      titleHi: 'टियर-१ एसडीई सिंगल-कॉलम लेटेक्स रेज़्यूमे',
      category: 'Campus Placements & Off-Campus',
      badge: '98% Taleo/Workday ATS Pass',
      format: 'LaTeX (.tex)',
      description: 'Overleaf-ready single-column LaTeX code using Google XYZ framework with zero-table OCR readability.',
      icon: FileText
    },
    {
      id: 'template-github-readme',
      title: 'Production GitHub README.md Engineering Blueprint',
      titleHi: 'प्रोडक्शन गिटहब रीडमी इंजीनियरिंग ब्लूप्रिंट',
      category: 'Open Source & Proof-of-Work',
      badge: 'Tier-1 Recruiter Ready',
      format: 'Markdown (.md)',
      description: 'Industry-standard README with architecture badges, Docker quickstart, API Swagger table, and benchmark charts.',
      icon: Code2
    },
    {
      id: 'template-ieee-paper',
      title: 'IEEE Conference Research Paper Draft',
      titleHi: 'आईईईई कॉन्फ्रेंस रिसर्च पेपर ड्राफ्ट',
      category: 'Research & Publications',
      badge: 'IEEE 2-Column Standard',
      format: 'LaTeX (.tex)',
      description: 'Pre-formatted IEEE transactions template with Abstract, System Methodology, Mathematical Formulations, and BibTeX.',
      icon: GraduationCap
    }
  ];

  // Template Content Generator
  const generateTemplateContent = () => {
    if (selectedTemplateId === 'template-capstone') {
      return `# B.Tech Engineering Major/Minor Project Proposal & SRS Document
**Department:** ${selectedBranch === 'CSE' ? 'Computer Science & Engineering' : selectedBranch === 'AIML' ? 'Artificial Intelligence & Machine Learning' : selectedBranch === 'ECE' ? 'Electronics & Communication Engineering' : 'Mechanical & Smart Mechatronics'}
**Institution:** ${collegeName}
**Academic Year:** 2025-2026 (Semester 3 / 4 Sophomore Submission)
**Author / Team Lead:** ${authorName}

---

## 1. Executive Summary & Problem Formulation
Traditional higher education suffers from a disconnect between academic curriculum and high-throughput industry demands. This project, **"${projectTitle}"**, provides an automated proof-of-work engineering infrastructure solving high-frequency campus utility and placement readiness.

### 1.1 Objectives
- **System Telemetry:** Real-time event streaming with < 100ms end-to-end latency.
- **Verification Engine:** Automated Abstract Syntax Tree (AST) code quality and test case parsing.
- **Institutional Integration:** Direct mapping into AKTU & AICTE 3-4 MOOC semester marksheet credits.

---

## 2. System Architecture & Block Diagram
\`\`\`
[ Student Client / Mobile Webview ]
                 │
                 ▼ (TLS 1.3 / HTTP/2)
    [ Edge Gateway / Nginx Reverse Proxy ]
                 │
                 ├──► [ REST / WebSocket Gateway (Node.js & Vite) ]
                 │          │
                 │          ▼
                 │     [ In-Memory Distributed Cache (Redis 7.2) ]
                 │          │
                 │          ▼
                 │     [ Relational Data Store (PostgreSQL 16 with ACID) ]
                 │
                 └──► [ Autonomous AI Evaluation Pipeline (AST Analyzer) ]
                            │
                            ▼
                       [ PayPal REST Global Financial Disbursement API ]
\`\`\`

---

## 3. Functional Requirements (IEEE-830 Standard)
- **FR-01 (Telemetry Ingestion):** Ingest 2,400 concurrent bus & gate transit records without dropped packets.
- **FR-02 (AST Audit):** Recursively scan student GitHub repositories, extracting cyclomatic complexity and unit test ratios.
- **FR-03 (ATS Synchronization):** Reconstruct student resumes into single-column LaTeX format, ensuring ≥ 90% score on Taleo.

---

## 4. Database Schema (PostgreSQL DDL)
\`\`\`sql
CREATE TABLE btech_students (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roll_number VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    branch VARCHAR(64) NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),
    github_handle VARCHAR(64),
    skill_score INT DEFAULT 785 CHECK (skill_score BETWEEN 0 AND 1000),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transit_telemetry (
    record_id BIGSERIAL PRIMARY KEY,
    vehicle_id VARCHAR(32) NOT NULL,
    current_stop VARCHAR(128) NOT NULL,
    eta_seconds INT NOT NULL,
    occupancy_pct INT CHECK (occupancy_pct BETWEEN 0 AND 100),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## 5. Milestone & Sprint Timeline
| Sprint | Duration | Deliverables | Milestone Verification |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | Weeks 1–3 | Architecture Design, PostgreSQL Schema, UI Wireframing | HOD Departmental Sign-off |
| **Sprint 2** | Weeks 4–7 | WebSocket Transit Telemetry, Gate Sensor Integration | Live Hardware Lab Demo |
| **Sprint 3** | Weeks 8–11| AST Code Audit Engine, Taleo ATS Optimizer, PayPal Rail | Faculty Review & Plagiarism Check |
| **Sprint 4** | Weeks 12–14| Load Testing (5,000 req/s), Docker Deployment, Final Thesis | Academic Senate Final Viva |
`;
    }

    if (selectedTemplateId === 'template-sih') {
      return `# Smart India Hackathon (SIH 2026) — Executive 1-Page Pitch
**Problem Statement ID:** SIH-1428 / AKTU-MOB-02
**Category:** Smart Automation, Campus Mobility & Technical Education
**Team Name:** Team Kaushal Vanguard (6-Member Squad · 2 Female Developers)
**Team Lead:** ${authorName}
**College:** ${collegeName}

---

### 1. The Core Bottleneck
In Tier-2/3 technical colleges across Uttar Pradesh, over 12,000 students lose 25–40 minutes every morning at campus entry highway gates, leading to missed 9:00 AM laboratory hours. Simultaneously, 78% of 2nd-year B.Tech students lack verifiable code proof-of-work, causing high anxiety during 7th-semester placement drives.

### 2. Our Proposed Solution: "${projectTitle}"
An integrated dual-utility ecosystem:
1. **Physical Radar:** Real-time IoT sensor telemetry and bus GPS tracking that reroutes student commuters to reduce gate transit latency by 64%.
2. **Digital Proof-of-Work:** Automated GitHub commit auditing and NPTEL credit mapping transforming sophomore college labs into verifiable recruitment dossiers.

### 3. Innovation & Technical USP
- **Zero Google Forms:** 1-Click biometric student ID verification with instant ticket issuing.
- **Autonomous Escrow:** PayPal REST API disbursement releasing academic subsidies upon AI milestone evaluation.
- **Hardware-Software Mesh:** ESP32 telemetry nodes streaming via lightweight MQTT to a Redis distributed memory store.

### 4. Feasibility & Budget Breakdown
| Component | Open-Source / Hardware Cost | Subsidy / Sponsor | Student Cost |
| :--- | :--- | :--- | :--- |
| **Cloud Hosting (Vercel + Supabase)** | $0.00 (Student Developer Pack) | GitHub Education Pack | ₹0 |
| **IoT Telemetry Nodes (6 Buses)** | ₹4,200 (ESP32 + GPS Modules) | College Innovation Fund | ₹0 |
| **NPTEL / AICTE MOOC Registration** | 100% Free Audit | Ministry of Education (SWAYAM) | ₹0 |

### 5. Alignment with AICTE & UN SDGs
- **SDG 4:** Quality Technical Education (Meritocratic code verification).
- **SDG 9:** Industry, Innovation & Infrastructure (Smart campus transit).
- **SDG 11:** Sustainable Cities & Communities (Zero-idle vehicle congestion).
`;
    }

    if (selectedTemplateId === 'template-latex-resume') {
      return `%-------------------------
% Tier-1 SDE Single-Column Resume Template (Overleaf Ready)
% Calibrated for 2nd-Year B.Tech Students · 98% ATS Pass Rate
%-------------------------

\\documentclass[letterpaper,10.8pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins for high data-density
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Section formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Aman Sharma} \\\\ \\vspace{2pt}
    \\small 2nd-Year B.Tech Computer Science \\quad $|$ \\quad IET Lucknow (AKTU) \\\\
    \\small +91 9839048261 \\quad $|$ \\quad \\href{mailto:aman.sharma.cse24@ietlucknow.ac.in}{aman.sharma.cse24@ietlucknow.ac.in} \\quad $|$ \\quad \\href{https://github.com/kumarsamarth0205-cloud}{github.com/kumarsamarth0205-cloud} \\quad $|$ \\quad \\href{https://linkedin.com}{linkedin.com/in/aman-cse}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\textbf{Institute of Engineering \\& Technology (IET), AKTU} \\hfill Lucknow, UP \\\\
\\textit{Bachelor of Technology in Computer Science \\& Engineering (3rd Semester)} \\hfill \\textbf{CGPA: 8.74 / 10.0} \\\\
\\small Coursework: Data Structures \\& Algorithms, Operating Systems, Database Management Systems, Computer Networks.

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}: C++, Python, TypeScript, JavaScript, SQL (PostgreSQL), Go (Basics) \\\\
     \\textbf{Frameworks \\& Libraries}: React 19, Node.js, Express, Vite, Tailwind CSS, PyTorch, Fast-API \\\\
     \\textbf{Developer Tools \\& Cloud}: Git, GitHub Actions, Docker, Redis, AWS (EC2, S3), Linux (Ubuntu), Nginx \\\\
     \\textbf{Competitive Programming}: LeetCode (Rating: 1780+, 134 Problems Solved), Codeforces (Specialist)
    }}
\\end{itemize}

%-----------PROJECTS-----------
\\section{Featured Engineering Projects}
\\textbf{Kaushal Setu 2.0: Distributed Campus Transit \\& Code Audit Engine} \\hfill \\href{https://github.com/kumarsamarth0205-cloud/kaushal-2.0}{GitHub Link} \\\\
\\textit{React 19, TypeScript, Node.js, Redis, PostgreSQL, Docker, Tailwind CSS} \\hfill \\textit{Oct 2025 -- Present}
\\begin{itemize}[leftmargin=0.15in]
    \\item Architected high-throughput campus transit radar processing 2,400+ concurrent telemetry points with $<80\\text{ms}$ query latency using Redis caching.
    \\item Implemented AST-based static code analyzer calculating cyclomatic complexity and test coverage across 50+ sophomore student repositories.
    \\item Integrated PayPal REST API Sandbox rail enabling autonomous milestone disbursements and instant verifiable QR ticketing.
\\end{itemize}

\\vspace{2pt}
\\textbf{Distributed In-Memory Key-Value Store with Raft Consensus} \\hfill \\href{https://github.com}{GitHub Link} \\\\
\\textit{C++, POSIX Threads, Sockets, gRPC} \\hfill \\textit{Aug 2025 -- Sep 2025}
\\begin{itemize}[leftmargin=0.15in]
    \\item Developed multi-threaded key-value storage engine in C++17 handling $15,000+\\text{ operations/sec}$ with crash recovery via Write-Ahead Log (WAL).
    \\item Implemented leader election and log replication adhering to the Raft consensus protocol across a 3-node distributed cluster.
\\end{itemize}

%-----------CERTIFICATIONS & HONORS-----------
\\section{Certifications \\& Academic Honors}
\\begin{itemize}[leftmargin=0.15in]
    \\item \\textbf{NPTEL Elite Certificate}: Data Structures \\& Algorithms using C++ (IIT Kharagpur) -- 3 AICTE Marksheet Credits.
    \\item \\textbf{AWS Academy Graduate}: Cloud Foundations \\& Container Microservices (Voucher Verified).
    \\item \\textbf{Smart India Hackathon (SIH 2026)}: Institute Round Rank 1 Nominee out of 64 participating departmental teams.
\\end{itemize}

\\end{document}
`;
    }

    if (selectedTemplateId === 'template-github-readme') {
      return `# ${projectTitle}

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge&logo=githubactions)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-amber?style=for-the-badge)](LICENSE)

> **Autonomous Campus-to-Corporate & Engineering Mobility Ecosystem** engineered exclusively for 2nd-year B.Tech undergraduates across AKTU and AICTE-affiliated engineering institutions.

---

## 🏛️ System Architecture
\`\`\`
   ┌─────────────────────────────────────────────────────────────┐
   │                  Client: React 19 + TypeScript              │
   └───────────────┬─────────────────────────────┬───────────────┘
                   │                             │
        (Telemetry Events)               (REST & Auth)
                   ▼                             ▼
   ┌─────────────────────────────┐  ┌────────────────────────────┐
   │     Campus Transit Radar    │  │   Live Skill Score Engine  │
   │  6 Bus Corridors + Gates    │  │ 40% Code / 35% Audits / 25%│
   └───────────────┬─────────────┘  └────────────┬───────────────┘
                   │                             │
                   ▼                             ▼
   ┌─────────────────────────────────────────────────────────────┐
   │       PayPal REST API Global Financial Sandbox Rail         │
   │        Autonomous Escrow Payouts & Subsidized Vouchers      │
   └─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 🚀 Key Engineering Pillars
1. **Dynamic Live Skill Score (785/1000):** Objective capability index weighting automated GitHub commits, 134 DSA test cases, and academic capstone audits.
2. **Smart Campus Mobility Radar:** Real-time gate telemetry (Highway Gate 85% heavy rerouting) and 6 campus bus routes with ETAs for 9:00 AM labs.
3. **24+ Verified Courses Hub:** NPTEL, SWAYAM, AWS Academy, and Cisco NetAcad courses pre-approved for 3–4 AICTE semester credits.
4. **SIH 2026 Arena & Sophomore Internships:** 1-Click verified student ID registration without Google Forms.
5. **ATS Resume Studio & PayPal Rail:** Google XYZ bullet rewriting (42% -> 91% parser leap) with instant PayPal sandbox checkout.

---

## ⚡ Quickstart (Local Development)

### Prerequisites
- Node.js \`>= 20.x\`
- npm \`>= 10.x\`

\`\`\`bash
# 1. Clone repository
git clone https://github.com/kumarsamarth0205-cloud/kaushal-2.0.git
cd kaushal-2.0

# 2. Install dependencies
npm install

# 3. Start local Vite development server
npm run dev -- --host --port 3000
\`\`\`

Open \`http://localhost:3000\` in your browser.

---

## 🧪 Production Verification
\`\`\`bash
npm run build
# Output: ✓ 1883 modules transformed, 0 errors.
\`\`\`

---

## 👨‍💻 Engineering Author
- **Lead Developer:** ${authorName}
- **Institution:** ${collegeName}
- **Repository:** [\`kumarsamarth0205-cloud/kaushal-2.0\`](https://github.com/kumarsamarth0205-cloud/kaushal-2.0)
`;
    }

    return `% IEEE Transactions on Education / Computing Standard Draft
\\documentclass[conference]{IEEEtran}
\\IEEEoverridecommandlockouts
\\usepackage{cite}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{algorithmic}
\\usepackage{graphicx}
\\usepackage{textcomp}
\\usepackage{xcolor}

\\begin{document}

\\title{${projectTitle}: A Decentralized Proof-of-Work Architecture for Undergraduate Engineering Mobility}

\\author{\\IEEEauthorblockN{${authorName}}
\\IEEEauthorblockA{\\textit{Department of Computer Science \\& Engineering} \\\\
\\textit{${collegeName}} \\\\
Email: aman.sharma.cse24@ietlucknow.ac.in}
}

\\maketitle

\\begin{abstract}
Undergraduate engineering education in emerging economies faces severe placement asymmetry, where curriculum completion does not reliably signal practical software production competence. We propose Kaushal Setu 2.0, a unified campus architecture integrating real-time IoT transit telemetry with automated GitHub Abstract Syntax Tree (AST) code verification. By weighting code commits (40%), peer audits (35%), and engagement streaks (25%), our pipeline creates an ungameable capability index (785/1000). Empirical testing across 2,400 daily student day-scholars demonstrates a 64% reduction in commute delay and a 49-point leap in applicant tracking system (ATS) parser shortlisting.
\\end{abstract}

\\begin{IEEEkeywords}
Engineering Education, ATS Optimization, Real-Time Telemetry, AST Verification, Cloud Microservices, SIH 2026.
\\end{IEEEkeywords}

\\section{Introduction}
Higher technical education in India hosts over 1.5 million engineering graduates annually, yet industry employability metrics consistently identify a critical practical execution deficit...

\\section{System Architecture}
Our architecture separates data ingestion into two primary subsystems: (a) physical sensor telemetry streaming via MQTT, and (b) digital AST code verification executing against standardized test suites...

\\section{Experimental Results}
Benchmarking our ATS parser against Taleo and Workday enterprise filters demonstrated an increase in baseline parsing success from 42\\% to 91\\%...

\\bibliographystyle{IEEEtran}
\\begin{thebibliography}{00}
\\bibitem{b1} AICTE, ``Model Curriculum for Undergraduate Degree in Engineering,'' All India Council for Technical Education, 2024.
\\end{thebibliography}

\\end{document}
`;
  };

  const handleCopy = () => {
    const textToCopy = generateTemplateContent();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const current = templates.find(t => t.id === selectedTemplateId) || templates[0];
    const ext = current.format.includes('LaTeX') ? 'tex' : 'md';
    const blob = new Blob([generateTemplateContent()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedTemplateId}_${selectedBranch}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 sm:py-6 animate-in fade-in">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-blue-700 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>ADVANCED FEATURE 01</span>
            <span>·</span>
            <span>AI B.TECH TEMPLATE STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            {lang === 'en' ? 'AI Engineering Template Studio' : 'एआई इंजीनियरिंग टेम्पलेट स्टूडियो'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {lang === 'en'
              ? 'Instant, production-ready AI templates for B.Tech Capstone Proposals, SIH 2026 pitch decks, Overleaf LaTeX resumes, and GitHub READMEs.'
              : 'बी.टेक कैपस्टोन प्रोजेक्ट, स्मार्ट इंडिया हैकाथॉन, लेटेक्स रेज़्यूमे और गिटहब के लिए उच्च-स्तरीय एआई टेम्पलेट्स।'}
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/25 cursor-pointer active:scale-95 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download ({currentTemplate.format.split(' ')[0]})</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Template Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {templates.map(tpl => {
          const isSelected = selectedTemplateId === tpl.id;
          const IconComp = tpl.icon;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => setSelectedTemplateId(tpl.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono-data font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {tpl.format.split(' ')[0]}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                  {tpl.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono-data truncate">
                  {tpl.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Customization Controls Drawer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 uppercase font-mono-data flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            AI Engineering Parameters & Customization
          </span>
          <span className="text-[11px] font-mono-data text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Real-Time Code Sync
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Branch Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              B.Tech Engineering Discipline:
            </label>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white"
            >
              <option value="CSE">B.Tech CSE / IT (Software & Systems)</option>
              <option value="AIML">B.Tech AI & Data Science (MLOps/Vision)</option>
              <option value="ECE">B.Tech ECE & IoT (Embedded/Robotics)</option>
              <option value="CORE">B.Tech Core (Mechanical / Smart EV)</option>
            </select>
          </div>

          {/* Project Title */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Project Title / Repository:
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={e => setProjectTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Student Author / Lead:
            </label>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          {/* College Name */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              University / Institute:
            </label>
            <input
              type="text"
              value={collegeName}
              onChange={e => setCollegeName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 4. Live Code & Template Terminal Viewer */}
      <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono-data text-slate-400 pl-2">
              {currentTemplate.title} — {currentTemplate.format}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-data">
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-2.5 py-1 rounded bg-blue-600/80 hover:bg-blue-600 text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono-data text-xs leading-relaxed overflow-x-auto max-h-[580px]">
          <pre className="text-slate-200 whitespace-pre font-mono">
            {generateTemplateContent()}
          </pre>
        </div>
      </div>

    </div>
  );
};
