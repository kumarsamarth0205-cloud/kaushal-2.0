import React, { useState, useRef, useEffect } from 'react';
import { Language, UserProfile } from '../types';
import { VERIFIED_COURSES_DATABASE } from '../data/coursesDatabase';
import { SOPHOMORE_INTERNSHIPS_DATA } from '../data/sophomoreInternshipsData';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Building2, 
  FileText, 
  HelpCircle,
  Code2,
  GraduationCap,
  Bus,
  Trophy,
  CreditCard,
  ChevronRight,
  Database
} from 'lucide-react';

interface ChatbotWidgetProps {
  lang: Language;
  userProfile: UserProfile | null;
  selectedPersonaId: string;
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  ragSources?: string[];
  quickActions?: Array<{ label: string; action: () => void }>;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  lang,
  userProfile,
  selectedPersonaId,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const candidateName = userProfile?.name || 'Aman Sharma';
  const targetRole = userProfile?.targetRole || 'Junior Software Development Engineer (SDE-1)';

  const initialBotMessage = lang === 'en'
    ? `Hello ${candidateName}! 🎓 I am **Kaushal Saarthi RAG Copilot**, your B.Tech Engineering Academic & Placement Assistant. I am directly indexed on the **AICTE 2026 Model Curriculum**, **24+ NPTEL/SWAYAM IIT courses**, **SIH 2026 problem statements**, and **live campus bus telemetry**. What can I assist you with today?`
    : `नमस्ते ${candidateName}! 🎓 मैं हूँ **कौशल सारथी RAG कोपायलट**, आपका बी.टेक इंजीनियरिंग शैक्षणिक एवं प्लेसमेंट साथी। मैं **AICTE मॉडल सिलेबस**, **24+ IIT NPTEL/SWAYAM कोर्सेज**, **एसआईएच 2026 प्रॉब्लम स्टेटमेंट्स** और **लाइव बस रडार** से सीधे कनेक्टेड हूँ। आज मैं आपकी क्या मदद करूँ?`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: initialBotMessage,
      timestamp: 'Just now',
      ragSources: ['AICTE B.Tech Model Curriculum 2026', 'AKTU Credit Transfer Regulations', 'NPTEL Syllabus Index'],
      quickActions: [
        { label: '🎓 NPTEL Credit Transfer', action: () => onNavigate('courses') },
        { label: '🤖 AI Engineering Templates', action: () => onNavigate('templates') },
        { label: '🏆 SIH 2026 Registration', action: () => onNavigate('opportunities') }
      ]
    }
  ]);

  const quickPrompts = lang === 'en' ? [
    { label: '🎓 How to transfer NPTEL credits to AKTU marksheet?', query: 'How does NPTEL and SWAYAM credit transfer work for B.Tech semester exams?' },
    { label: '📄 How to jump ATS score from 42% to 91%?', query: 'How does the ATS Resume optimizer rewrite bullets using Google XYZ?' },
    { label: '🚌 Check Highway Gate & bus delay status', query: 'What is the current traffic at Main Highway Gate and bus arrival time?' },
    { label: '🏆 How to build a winning SIH 2026 team?', query: 'What are the rules and diversity requirements for Smart India Hackathon 2026?' },
    { label: '💻 SDE-1 Mock Interview & Striver 450 DSA', query: 'Where should 2nd year B.Tech students start for Tier-1 SDE interview preparation?' }
  ] : [
    { label: '🎓 NPTEL क्रेडिट मार्कशीट में कैसे ट्रांसफर करें?', query: 'बी.टेक सेमेस्टर में NPTEL और SWAYAM क्रेडिट ट्रांसफर कैसे होता है?' },
    { label: '📄 ATS स्कोर 42% से 91% कैसे बढ़ाएं?', query: 'गूगल XYZ फॉर्मूले से रेज़्यूमे बुलेट्स कैसे बेहतर बनते हैं?' },
    { label: '🚌 मुख्य गेट पर ट्रैफिक व बस की स्थिति क्या है?', query: 'मेन हाईवे गेट पर जाम की स्थिति और कॉलेज बस का समय क्या है?' },
    { label: '🏆 SIH 2026 के लिए टीम कैसे बनाएं?', query: 'स्मार्ट इंडिया हैकाथॉन 2026 के लिए टीम और नियम क्या हैं?' },
    { label: '💻 SDE-1 इंटरव्यू व 450 डीएसए की तैयारी कैसे करें?', query: 'द्वितीय वर्ष के छात्रों को टियर-1 टेक कंपनियों की तैयारी कैसे करनी चाहिए?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // RAG KNOWLEDGE RETRIEVAL ENGINE
  const retrieveKnowledgeAndRespond = (query: string) => {
    const q = query.toLowerCase();

    // 1. NPTEL / SWAYAM / Academic Mooc Credits Query
    if (q.includes('credit') || q.includes('nptel') || q.includes('swayam') || q.includes('क्रेडिट') || q.includes('mooc')) {
      const topCourses = VERIFIED_COURSES_DATABASE.slice(0, 3).map(c => `• **${c.title}** (${c.platform}) — *${c.aicteCredits} AICTE Credits*`).join('\n');
      return {
        text: lang === 'en'
          ? `🎓 **RAG Retrieved: Academic Senate & AICTE Credit Transfer Policy (Annexure-IV)**\n\nUnder the National Education Policy (NEP 2020) and AKTU regulations, 2nd-year B.Tech students can earn up to **20 credits** through approved online MOOCs:\n\n${topCourses}\n\n**Transfer Process:**\n1. Enroll in the NPTEL/SWAYAM course and clear the proctored exam with $\\ge 40\\%$.\n2. Submit the certificate to your Departmental HOD.\n3. The 3–4 credits transfer directly into your semester marksheet as a **Professional Elective**, with zero university examination fee!`
          : `🎓 **RAG खोज परिणाम: एकेटीयू एवं AICTE क्रेडिट ट्रांसफर नीति**\n\nNEP 2020 और एकेटीयू नियमों के अनुसार, द्वितीय वर्ष बी.टेक छात्र अनुमोदित ऑनलाइन कोर्सेज से **20 क्रेडिट्स** तक हासिल कर सकते हैं:\n\n${topCourses}\n\n**प्रक्रिया:**\n1. NPTEL/SWAYAM कोर्स में इनरोल करें और परीक्षा पास करें।\n2. HOD को सर्टिफिकेट जमा करें।\n3. यह 3–4 क्रेडिट आपकी मार्कशीट में इलेक्टिव विषय के रूप में सीधे जुड़ जाएंगे!`,
        sources: ['AICTE Model Curriculum 2026 §4.2', 'AKTU Senate Notification Ref: 2024/71', 'SWAYAM MOOC Credit Framework'],
        quickActions: [
          { label: 'View 24+ Approved Courses', action: () => onNavigate('courses') },
          { label: 'Check Branch Roadmaps', action: () => onNavigate('roadmap') }
        ]
      };
    }

    // 2. ATS Resume & Google XYZ Formula
    if (q.includes('ats') || q.includes('resume') || q.includes('रेज़्यूमे') || q.includes('xyz') || q.includes('taleo')) {
      return {
        text: lang === 'en'
          ? `📄 **RAG Retrieved: ATS Metric Articulation & Taleo/Workday Parsing Ontology**\n\nAutomated Applicant Tracking Systems (ATS) reject 74% of 2nd-year resumes due to passive task descriptions and multi-column formatting.\n\n**The Solution (Google XYZ Framework):**\n• *Weak Bullet:* "Made campus transit web app using React and Node.js."\n• *ATS-Boosted (91% Score):* "Architected high-throughput React & Redis campus transit radar processing 2,400+ daily student records with 42% latency reduction."\n\n**Formatting Rules:**\n1. **Single-Column LaTeX:** Zero tables or graphics that drop text in OCR.\n2. **Targeted Tech Tokens:** Include \`Docker\`, \`Redis\`, \`PostgreSQL\`, \`RESTful APIs\`, \`CI/CD\`.\n3. **Quantifiable Metrics:** Include percentages, throughput numbers, and user volume.`
          : `📄 **RAG खोज परिणाम: एटीएस रेज़्यूमे ऑप्टिमाइज़ेशन एवं गूगल XYZ फॉर्मूला**\n\nअधिकांश छात्र रेज़्यूमे में केवल साधारण लाइनें लिखते हैं जिससे एटीएस सॉफ्टवेयर उन्हें रिजेक्ट कर देता है।\n\n**गूगल XYZ फॉर्मूला:**\n• *साधारण:* "कॉलेज फेस्ट के लिए रिएक्ट में वेबसाइट बनाई।"\n• *एटीएस-बूस्टेड (91% स्कोर):* "2,400+ छात्रों के लिए रिएक्ट व रेडिस पोर्टल बनाया, जिसने लेटेंसी को 42% कम किया।"\n\n**मुख्य नियम:**\n1. सिंगल-कॉलम लेआउट रखें।\n2. तकनीकी शब्द (Docker, Redis, PostgreSQL) शामिल करें।\n3. अपने प्रोजेक्ट में संख्याएं और परिणाम दर्ज करें!`,
        sources: ['Google XYZ Hiring Guidelines', 'Taleo/Workday Semantic Parsing Rules 2026', 'Kaushal Setu ATS Engine'],
        quickActions: [
          { label: 'Launch ATS Resume Studio', action: () => onNavigate('resume') },
          { label: 'Generate LaTeX Resume Template', action: () => onNavigate('templates') }
        ]
      };
    }

    // 3. Campus Transit & Highway Gate Delay
    if (q.includes('gate') || q.includes('bus') || q.includes('traffic') || q.includes('बस') || q.includes('गेट') || q.includes('radar')) {
      return {
        text: lang === 'en'
          ? `🚌 **RAG Retrieved: Real-Time Campus Transit & IoT Gate Telemetry**\n\n**Live Gate Status (Morning Commute):**\n• **Main Highway Gate:** 🔴 **85% Congestion** — Severe vehicle queue. Reroute via Gate 2 North to save 18 minutes.\n• **Gate 2 North:** 🟡 **48% Moderate** — Recommended alternate entry for 2-wheelers and day-scholars.\n• **Gate 3 Express:** 🟢 **15% Smooth** — Open for faculty, EV shuttles, and bicycle commuters.\n\n**Bus Fleet Telemetry:** 6 active routes tracked with GPS telemetry (Bus 04, 08, 12, 16, 21, 27) arriving before 8:52 AM for morning laboratories.`
          : `🚌 **RAG खोज परिणाम: लाइव कैंपस बस व गेट ट्रैफिक रडार**\n\n**गेट की वर्तमान स्थिति:**\n• **मेन हाईवे गेट:** 🔴 **85% भारी भीड़** — गेट 2 नॉर्थ से जाएं और 18 मिनट बचाएं।\n• **गेट 2 नॉर्थ:** 🟡 **48% सामान्य** — छात्रों और दोपहिया वाहनों के लिए अनुशंसित।\n• **गेट 3 एक्सप्रेस:** 🟢 **15% सुगम** — फैकल्टी व ईवी वाहनों के लिए खुला है।\n\n**बस टेलीमेट्री:** 6 बस रूट्स लाइव ट्रैक हो रहे हैं जो 8:52 AM तक कैंपस पहुंचेंगे।`,
        sources: ['Campus Gate IoT Sensor Mesh (Node-A1)', 'College Bus GPS Corridors Telemetry', 'AKTU Transit Advisory'],
        quickActions: [
          { label: 'Open Live Transit Radar', action: () => onNavigate('mobility') }
        ]
      };
    }

    // 4. Smart India Hackathon (SIH 2026)
    if (q.includes('sih') || q.includes('hackathon') || q.includes('हैकाथॉन') || q.includes('टीम')) {
      return {
        text: lang === 'en'
          ? `🏆 **RAG Retrieved: Smart India Hackathon (SIH 2026) Institutional Pipeline**\n\n**Official Rules & Diversity Mandate:**\n• **Team Size:** Exactly 6 members per team.\n• **Mandatory Female Representation:** Minimum 1 female student developer in every squad.\n• **Inter-disciplinary Bonus:** Teams combining CSE/IT coders with ECE/Core hardware engineers receive a 15% jury score boost.\n\n**Direct 1-Click Registration:** No Google Forms needed. Register in 1 click using verified Student ID in the **Opportunities & SIH** tab!`
          : `🏆 **RAG खोज परिणाम: स्मार्ट इंडिया हैकाथॉन (SIH 2026) नियम व टीम गाइड**\n\n**नियम व पात्रता:**\n• **टीम साइज:** 6 सदस्य अनिवार्य।\n• **महिला प्रतिनिधित्व:** टीम में कम से कम 1 छात्रा का होना अनिवार्य है।\n• **डिपार्टमेंट कॉम्बिनेशन:** CSE और ECE/हार्डवेयर का मिश्रण रखने वाली टीमों को वरीयता मिलती है।\n\nहमारे ऐप में बिना किसी गूगल फॉर्म के 1-क्लिक स्टूडेंट आईडी वेरिफिकेशन से सीधे रजिस्ट्रेशन करें!`,
        sources: ['Ministry of Education Innovation Cell (MIC) Guidelines', 'SIH 2026 Screening Criteria', 'AICTE Hackathon Protocol'],
        quickActions: [
          { label: 'SIH 2026 Squad Arena', action: () => onNavigate('opportunities') },
          { label: 'Generate SIH 1-Pager Pitch', action: () => onNavigate('templates') }
        ]
      };
    }

    // 5. Default B.Tech Engineering Roadmap
    return {
      text: lang === 'en'
        ? `💡 **RAG Knowledge Assistant:** Based on your **${targetRole}** path:\n\n1. **2nd-Year Priority:** Complete **DSA in C++ (Striver 450 Sheet)** and build 2 full-stack projects using React, Node.js, and Redis caching.\n2. **Credit Transfers:** Enroll in 1 NPTEL course (IIT Kharagpur/Madras) to bank 3–4 semester credits early.\n3. **Proof-of-Work:** Connect your GitHub to verify your commits and boost your Skill Score to 800+!\n\nWhat specific technical topic would you like to explore?`
        : `💡 **RAG करियर गाइड:** आपके **${targetRole}** लक्ष्य के अनुसार:\n\n1. **द्वितीय वर्ष प्राथमिकता:** C++ में **डेटा स्ट्रक्चर्स (450 डीएसए शीट)** पूरी करें और रिएक्ट, नोड और रेडिस पर 2 मजबूत प्रोजेक्ट्स बनाएं।\n2. **क्रेडिट ट्रांसफर:** 3–4 सेमेस्टर क्रेडिट पाने के लिए 1 NPTEL कोर्स पूरा करें।\n3. **प्रूफ ऑफ वर्क:** अपने गिटहब को कनेक्ट करें ताकि आपका स्किल स्कोर 800+ हो सके!`,
      sources: ['AKTU B.Tech Placement Dossier 2026', 'Tier-1 Engineering Hiring Index'],
      quickActions: [
        { label: 'Explore B.Tech Roadmaps', action: () => onNavigate('roadmap') },
        { label: 'Start SDE Mock Interview', action: () => onNavigate('interview') }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = retrieveKnowledgeAndRespond(text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragSources: response.sources,
        quickActions: response.quickActions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button with Mascot Avatar */}
      <div className="fixed bottom-5 right-5 z-50 no-print flex flex-col items-end gap-2">
        {!isOpen && (
          <div 
            className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-xl border border-blue-200 text-xs font-semibold text-slate-800 flex items-center gap-2 animate-bounce cursor-pointer hover:border-blue-400 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>{lang === 'en' ? 'Ask Kaushal Saarthi RAG AI' : 'कौशल सारथी RAG से पूछें'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative group cursor-pointer ${
            isOpen 
              ? 'bg-slate-900 text-white rotate-90' 
              : 'bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 text-white hover:scale-105 shadow-blue-500/35 ring-4 ring-blue-500/20'
          }`}
          aria-label="Toggle Kaushal Saarthi Chatbot"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Bot className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[92vw] sm:w-[440px] max-h-[82vh] h-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 no-print">
          
          {/* Chat Window Header with RAG Indicator */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">Kaushal Saarthi</span>
                  <span className="text-[9.5px] font-mono-data bg-blue-500/30 text-blue-300 px-1.5 py-0.2 rounded border border-blue-400/30 font-bold">
                    RAG Copilot
                  </span>
                </div>
                <div className="text-[10.5px] text-emerald-400 font-mono-data flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AICTE & NPTEL Knowledge Corpus Indexed</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll View */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/50">
            {messages.map(msg => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-start gap-2 max-w-[90%]">
                    {isBot && (
                      <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        AI
                      </div>
                    )}
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isBot
                          ? 'bg-white text-slate-900 border border-slate-200/90 shadow-2xs'
                          : 'bg-blue-600 text-white shadow-xs'
                      }`}
                    >
                      {msg.text}

                      {/* RAG Retrieved Sources Citation Pills */}
                      {msg.ragSources && msg.ragSources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                          <span className="text-[9.5px] font-mono-data font-bold text-slate-400 uppercase flex items-center gap-1">
                            <Database className="w-3 h-3 text-blue-500" />
                            RAG Citations & Verified Corpora:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {msg.ragSources.map((src, sidx) => (
                              <span
                                key={sidx}
                                className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono-data border border-slate-200"
                              >
                                {src}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 1-Click Interactive Quick Actions */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.quickActions.map((qa, qidx) => (
                            <button
                              key={qidx}
                              type="button"
                              onClick={() => {
                                setIsOpen(false);
                                qa.action();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-[10.5px] transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <span>{qa.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>

                  <span className="text-[9.5px] text-slate-400 mt-1 px-1 font-mono-data">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-white p-3 rounded-2xl border border-slate-200 max-w-[70%]">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span>RAG Engine searching AICTE & NPTEL corpus...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.query)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] whitespace-nowrap transition-colors border border-slate-200/80 cursor-pointer font-medium"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={lang === 'en' ? 'Ask about NPTEL credits, ATS resume, SIH, bus radar...' : 'NPTEL क्रेडिट, रेज़्यूमे, SIH, बस रडार के बारे में पूछें...'}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
