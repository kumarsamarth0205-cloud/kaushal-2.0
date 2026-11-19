import React, { useState } from 'react';
import { Language } from '../../types';
import { PERSONAS } from '../../data/researchData';
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap, HelpCircle, FileText, Code2, Cpu, BrainCircuit } from 'lucide-react';

interface AssessmentPageProps {
  lang: Language;
  selectedPersonaId: string;
  onNavigate: (page: string) => void;
  onAssessmentComplete: (scores: Record<string, number>) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  lang,
  selectedPersonaId,
  onNavigate,
  onAssessmentComplete,
}) => {
  const currentPersona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // 3 Rigorous Engineering Scenario Diagnostic Questions per B.Tech Specialization
  const questionsByPersona: Record<string, Array<{
    qEn: string;
    qHi: string;
    contextEn: string;
    contextHi: string;
    options: Array<{ labelEn: string; labelHi: string; score: number }>;
  }>> = {
    // 1. Aman Sharma (B.Tech CSE - Software Engineering & SDE-1)
    priya: [
      {
        qEn: 'When querying 50,000 student transit records, an O(N²) nested loop takes 8.4 seconds. How do you optimize it to O(N)?',
        qHi: '५०,००० छात्र ट्रांजिट रिकॉर्ड को सर्च करते समय O(N²) लूप ८.४ सेकंड लेता है। इसे O(N) में ऑप्टिमाइज़ करने के लिए क्या करेंगे?',
        contextEn: 'Data Structures & Algorithmic Time Complexity',
        contextHi: 'डेटा स्ट्रक्चर्स व टाइम कॉम्प्लेक्सिटी',
        options: [
          { labelEn: 'Run the same loop on a faster multi-core CPU server', labelHi: 'तेज मल्टी-कोर सीपीयू पर वही लूप चलाना', score: 30 },
          { labelEn: 'Sort the array with QuickSort O(N log N) and use Binary Search', labelHi: 'क्विक-सॉर्ट O(N log N) करके बाइनरी सर्च लगाना', score: 70 },
          { labelEn: 'Use an in-memory Hash Map / Set with O(1) amortized lookup', labelHi: 'O(1) लुकअप के लिए हैश मैप / सेट डेटा स्ट्रक्चर का उपयोग', score: 95 },
        ]
      },
      {
        qEn: 'During 8:50 AM morning peak, 2,400 students hit the bus radar API concurrently. How do you prevent DB connection exhaustion?',
        qHi: 'सुबह ८:५० बजे २,४०० छात्र एक साथ बस रडार एपीआई कॉल करते हैं। डेटाबेस क्रैश रोकने के लिए क्या करेंगे?',
        contextEn: 'Distributed Systems & High-Throughput Caching',
        contextHi: 'डिस्ट्रिब्यूटेड सिस्टम्स व हाई-थ्रूपुट कैशिंग',
        options: [
          { labelEn: 'Restart the backend Node.js process every 5 minutes', labelHi: 'हर ५ मिनट में बैकएंड सर्वर को रीस्टार्ट करना', score: 25 },
          { labelEn: 'Increase max database connection pool to 5,000 connections', labelHi: 'डेटाबेस कनेक्शन पूल को बढ़ाकर ५,००० कर देना', score: 60 },
          { labelEn: 'Deploy Redis in-memory cache with 5s TTL + connection pooling & rate limiter', labelHi: '५ सेकंड टीटीएल के साथ रेडिस इन-मेमोरी कैश, कनेक्शन पूलिंग व रेट लिमिटर लगाना', score: 95 },
        ]
      },
      {
        qEn: 'How do you guarantee ACID consistency when registering 6-member teams for SIH 2026 across relational tables?',
        qHi: 'स्मार्ट इंडिया हैकाथॉन टीम रजिस्ट्रेशन के दौरान रिलेशनल टेबल्स में डेटा संगति (ACID) कैसे सुनिश्चित करेंगे?',
        contextEn: 'Database Transactions & Schema Integrity',
        contextHi: 'डेटाबेस ट्रांजैक्शन व स्कीमा अखंडता',
        options: [
          { labelEn: 'Insert members one-by-one with asynchronous try-catch blocks', labelHi: 'एसिंक्रोनस ट्राई-कैच के साथ एक-एक करके इंसर्ट करना', score: 40 },
          { labelEn: 'Wrap insertions in an atomic DB transaction block (BEGIN...COMMIT / ROLLBACK)', labelHi: 'एटॉमिक ट्रांजैक्शन ब्लॉक (BEGIN...COMMIT / ROLLBACK) का उपयोग करना', score: 95 },
          { labelEn: 'Store registrations as plain unindexed JSON files on server disk', labelHi: 'सर्वर डिस्क पर अनइंडेक्स्ड JSON फाइलों में सेव करना', score: 20 },
        ]
      }
    ],

    // 2. Rhea Verma (B.Tech AI & Data Science - Machine Learning & Computer Vision)
    rahul: [
      {
        qEn: 'Your PyTorch deep neural network scores 99% training accuracy but only 64% on validation gate camera frames. How do you fix this?',
        qHi: 'आपका पायटॉर्च मॉडल ट्रेनिंग में ९९% लेकिन वैलिडेशन में केवल ६४% एक्यूरेसी दे रहा है। इसे कैसे ठीक करेंगे?',
        contextEn: 'Deep Learning Overfitting & Regularization',
        contextHi: 'डीप लर्निंग ओवरफिटिंग व रेगुलराइजेशन',
        options: [
          { labelEn: 'Train for 200 more epochs on the exact same training set', labelHi: 'समान डेटा पर २०० और एपॉक्स तक ट्रेन करना', score: 25 },
          { labelEn: 'Apply Dropout (p=0.4), Data Augmentation, L2 weight decay, and Early Stopping', labelHi: 'ड्रॉपआउट (p=0.4), डेटा ऑग्मेंटेशन, L2 वेट डीके और अर्ली स्टॉपिंग लागू करना', score: 95 },
          { labelEn: 'Increase model parameters by adding 4 more dense hidden layers', labelHi: 'मॉडल में ४ और हिडन लेयर्स जोड़कर पैरामीटर्स बढ़ाना', score: 35 },
        ]
      },
      {
        qEn: 'To serve a 7B parameter LLM on college lab GPUs with under 150ms latency, what optimization is essential?',
        qHi: 'कॉलेज लैब जीपीयू पर १५० मिलीसेकंड से कम लेटेंसी में ७B एलएलएम चलाने के लिए कौन सा ऑप्टिमाइज़ेशन अनिवार्य है?',
        contextEn: 'MLOps & Inference Model Quantization',
        contextHi: 'एमएलऑप्स व मॉडल क्वांटाइजेशन',
        options: [
          { labelEn: 'Load model in uncompressed FP32 floating point precision', labelHi: 'अनकंप्रेस्ड FP32 फ्लोटिंग पॉइंट में मॉडल लोड करना', score: 35 },
          { labelEn: 'Use 4-bit / 8-bit quantization (AWQ/GPTQ) with vLLM PagedAttention', labelHi: 'vLLM पेज्ड-अटेंशन के साथ ४-बिट / ८-बिट क्वांटाइजेशन (AWQ/GPTQ)', score: 95 },
          { labelEn: 'Send raw audio waveforms directly into text embedding models', labelHi: 'टेक्स्ट मॉडल में सीधे रॉ ऑडियो भेजना', score: 20 },
        ]
      },
      {
        qEn: 'When training an AI model on student commute logs, how do you prevent data leakage?',
        qHi: 'छात्र आवागमन डेटा पर मॉडल ट्रेन करते समय डेटा लीकेज से कैसे बचा जाए?',
        contextEn: 'Data Engineering & Pipeline Integrity',
        contextHi: 'डेटा पाइपलाइन व अखंडता',
        options: [
          { labelEn: 'Normalize the whole dataset before splitting into train/test sets', labelHi: 'ट्रेन/टेस्ट स्प्लिट करने से पहले पूरे डेटा को नॉर्मलाइज़ करना', score: 30 },
          { labelEn: 'Perform time-based / stratified train-test split before computing scaling statistics', labelHi: 'स्केलिंग स्टैटिस्टिक्स निकालने से पहले टाइम-बेस्ड / स्ट्रैटिफाइड स्प्लिट करना', score: 95 },
          { labelEn: 'Include student target test labels as input training features', labelHi: 'टारगेट टेस्ट लेबल्स को इनपुट फीचर्स में शामिल करना', score: 15 },
        ]
      }
    ],

    // 3. Arjun Patel (B.Tech ECE & Embedded IoT)
    sunita: [
      {
        qEn: 'In an ESP32 campus bus telemetry node, GPS reading blocks sensor I2C communication. How do you design the firmware?',
        qHi: 'ESP32 बस ट्रैकर में जीपीएस रीडिंग सेंसर संचार को ब्लॉक कर रही है। फर्मवेयर कैसे डिज़ाइन करेंगे?',
        contextEn: 'Real-Time Operating Systems (FreeRTOS Concurrency)',
        contextHi: 'फ्री-आरटीओएस समवर्ती मल्टीटास्किंग',
        options: [
          { labelEn: 'Put a 5000ms delay() call inside the main Arduino loop()', labelHi: 'मेन लूप में ५००० मिलीसेकंड का delay() लगा देना', score: 25 },
          { labelEn: 'Create separate FreeRTOS preemptive tasks with queues & mutex locks for shared buses', labelHi: 'म्यूटेक्स व कतारों के साथ अलग-अलग फ्री-आरटीओएस प्रीएम्प्टिव टास्क्स बनाना', score: 95 },
          { labelEn: 'Increase CPU clock frequency to maximum without thread separation', labelHi: 'बिना थ्रेड अलग किए केवल सीपीयू क्लॉक बढ़ाना', score: 45 },
        ]
      },
      {
        qEn: 'To allow an outdoor solar-powered gate congestion sensor to run for 6 months on a 18650 cell, what is required?',
        qHi: 'सौर-संचालित गेट सेंसर को ६ महीने तक सिंगल बैटरी पर चलाने के लिए क्या आवश्यक है?',
        contextEn: 'Ultra-Low Power Embedded Architecture',
        contextHi: 'अल्ट्रा-लो पावर एम्बेडेड आर्किटेक्चर',
        options: [
          { labelEn: 'Keep Wi-Fi transmitter active continuously at full 20dBm power', labelHi: 'वाई-फाई को लगातार २०dBm फुल पावर पर चालू रखना', score: 20 },
          { labelEn: 'Utilize ESP32 Deep Sleep mode with RTC timer wakeups and ULP coprocessor monitoring', labelHi: 'RTC टाइमर व ULP को-प्रोसेसर के साथ डीप स्लीप मोड का उपयोग करना', score: 95 },
          { labelEn: 'Use an incandescent light bulb as an indicator for sensor status', labelHi: 'सेंसर स्थिति के लिए इनकैंडेसेंट बल्ब लगाना', score: 15 },
        ]
      },
      {
        qEn: 'Why is MQTT preferred over HTTP for transmitting live bus GPS coordinates over fluctuating 4G networks?',
        qHi: 'खराब मोबाइल नेटवर्क पर बस जीपीएस डेटा भेजने के लिए HTTP के मुकाबले MQTT को क्यों प्राथमिकता दी जाती है?',
        contextEn: 'IoT Network Protocols & Packet Overhead',
        contextHi: 'आईओटी प्रोटोकॉल व पैकेट ओवरहेड',
        options: [
          { labelEn: 'HTTP has smaller packet headers than MQTT', labelHi: 'HTTP के पैकेट हेडर MQTT से छोटे होते हैं', score: 30 },
          { labelEn: 'MQTT uses lightweight 2-byte fixed headers, Keep-Alive pings, and configurable QoS levels', labelHi: 'MQTT में हल्का २-बाइट हेडर, कीप-अलाइव पिंग और कॉन्फ़िगर करने योग्य QoS स्तर होते हैं', score: 95 },
          { labelEn: 'MQTT does not require any TCP/IP network connection', labelHi: 'MQTT को किसी नेटवर्क कनेक्शन की आवश्यकता नहीं होती', score: 20 },
        ]
      }
    ]
  };

  const questions = questionsByPersona[selectedPersonaId] || questionsByPersona.priya;
  const currentQ = questions[currentStep];

  const handleSelectOption = (score: number) => {
    setAnswers({ ...answers, [currentStep]: score });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate average score
      const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
      const avgScore = Math.round(totalScore / questions.length);
      onAssessmentComplete({ [selectedPersonaId]: avgScore });
      onNavigate('gap-report');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPct = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 sm:py-8">
      
      {/* Top Banner with Engineering Credential */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-blue-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>AICTE ENGINEERING MODEL CURRICULUM</span>
            <span>·</span>
            <span>B.TECH SCENARIO DIAGNOSTIC</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {lang === 'en' ? 'B.Tech Practical Engineering Assessment' : 'बी.टेक व्यावहारिक इंजीनियरिंग असेसमेंट'}
          </h1>
          <p className="text-xs text-slate-600">
            Evaluating candidate: <strong className="text-slate-900">{currentPersona.name}</strong> ({currentPersona.role})
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end shrink-0">
          <span className="text-[10px] font-mono-data text-slate-400 uppercase">Benchmark Level</span>
          <span className="text-xs font-bold text-emerald-700 font-mono-data bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Tier-1 SDE / Tech Standards
          </span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono-data text-slate-500">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span className="font-bold text-blue-700">{progressPct}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in">
        
        <div className="space-y-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-mono-data text-blue-700 font-semibold">
            <Code2 className="w-4 h-4 text-blue-600" />
            <span>{lang === 'en' ? currentQ.contextEn : currentQ.contextHi}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {lang === 'en' ? currentQ.qEn : currentQ.qHi}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers[currentStep] === opt.score;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(opt.score)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-600 shadow-xs ring-1 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                  {lang === 'en' ? opt.labelEn : opt.labelHi}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={answers[currentStep] === undefined}
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs tracking-tight transition-all shadow-sm shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>{currentStep === questions.length - 1 ? 'Complete & View Gap Report' : 'Next Question'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
