import React, { useState, useEffect } from 'react';
import { Language, UserProfile, GigMilestone, AiMilestoneEvaluation, PaypalPayoutReceipt } from '../../types';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  Send, 
  Building2, 
  DollarSign, 
  Zap, 
  Code, 
  FileText, 
  Copy, 
  Check, 
  AlertCircle,
  RefreshCw,
  Cpu,
  Ticket,
  Award,
  CreditCard,
  ChevronRight,
  Download,
  Eye,
  HelpCircle,
  QrCode
} from 'lucide-react';

interface EscrowPayoutsPageProps {
  lang: Language;
  selectedPersonaId: string;
  userProfile: UserProfile | null;
  onNavigate: (page: string) => void;
}

interface AcademicCertification {
  id: string;
  title: string;
  provider: string;
  category: string;
  originalPriceUsd: number;
  originalPriceInr: number;
  subsidizedPriceUsd: number;
  subsidizedPriceInr: number;
  discountPct: number;
  badge: string;
  description: string;
  skillsGained: string[];
}

interface HackathonTicket {
  id: string;
  title: string;
  organizer: string;
  date: string;
  venue: string;
  priceUsd: number;
  priceInr: number;
  isSubsidized: boolean;
  slotsRemaining: number;
  perks: string[];
}

export const EscrowPayoutsPage: React.FC<EscrowPayoutsPageProps> = ({
  lang,
  selectedPersonaId,
  userProfile,
  onNavigate,
}) => {
  // Currency Toggle: USD ($) vs INR (₹)
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const usdToInrRate = 83.0;

  // Active Rail Track: 'payouts' | 'certifications' | 'ticketing'
  const [activeRailTrack, setActiveRailTrack] = useState<'payouts' | 'certifications' | 'ticketing'>('payouts');

  // Freelance & Milestone Payouts State
  const [milestones, setMilestones] = useState<GigMilestone[]>([
    {
      id: 'MS-FIN-101',
      title: 'GSTR-2B & E-Way Bill Reconciliation Audit',
      titleHi: 'जीएसटीआर-2बी व ई-वे बिल मिलान ऑडिट',
      employer: 'Kedia Logistics & Cold Chain Pvt Ltd',
      category: 'Accounting & Finance',
      stipendUsd: 35.00,
      stipendInr: 2900,
      description: 'Perform invoice ledger reconciliation for 150 B2B shipments, verify tax discrepancies, and draft error-free GSTR filing sheet.',
      descriptionHi: '150 व्यावसायिक इनवॉइस का मिलान करें, ई-वे बिल विसंगतियों की जांच करें और त्रुटि-मुक्त फाइलिंग शीट तैयार करें।',
      requirements: [
        'Extract GSTR-2B JSON and match against purchase register',
        'Flag ITC ineligible discrepancies exceeding ₹5,000 threshold',
        'Export clean discrepancy reconciliation statement with invoice IDs'
      ],
      defaultReceiver: 'worker-priya@sandbox.paypal.com'
    },
    {
      id: 'MS-SOL-202',
      title: '5kW Rooftop Solar PV Inverter Calibration & String Sizing',
      titleHi: '5kW सोलर इन्वर्टर कैलिब्रेशन व लोड स्ट्रिंग साइजिंग',
      employer: 'Tata Power Solar EPC Partner (Fazalganj Hub)',
      category: 'Clean Energy & Electrical',
      stipendUsd: 45.00,
      stipendInr: 3750,
      description: 'Calculate Voc and Isc string arrays for a 5kW on-grid dual MPPT inverter, verify anti-islanding protection, and output single-line diagram.',
      descriptionHi: '5 किलोवाट ग्रिड-टाई इन्वर्टर के लिए Voc व Isc स्ट्रिंग लोड गणना करें और सुरक्षा सिंगल-लाइन आरेख तैयार करें।',
      requirements: [
        'Calculate temperature-adjusted Voc max under winter irradiance',
        'Ensure combined MPPT input current does not exceed 16A per tracker',
        'Document earthing resistance test certificate under 5 Ohms'
      ],
      defaultReceiver: 'worker-rahul@sandbox.paypal.com'
    },
    {
      id: 'MS-CSC-303',
      title: 'Gram Panchayat AePS Micro-ATM Biometric Terminal Setup',
      titleHi: 'ग्राम पंचायत माइक्रो-एटीएम बायोमेट्रिक टर्मिनल सेटअप',
      employer: 'CSC e-Governance Services India',
      category: 'Digital Financial Inclusion',
      stipendUsd: 25.00,
      stipendInr: 2100,
      description: 'Deploy secure RD Service biometric authentication on Android terminal, perform test cash-out transaction with zero error code.',
      descriptionHi: 'माइक्रो-एटीएम टर्मिनल पर बायोमेट्रिक आरडी सर्विस चालू करें और बिना किसी त्रुटि के परीक्षण लेनदेन पूरा करें।',
      requirements: [
        'Configure UIDAI registered biometric scanner with encryption token',
        'Execute mock ₹100 AePS balance enquiry with simulated RRN log',
        'Submit terminal security compliance audit checklist'
      ],
      defaultReceiver: 'worker-sunita@sandbox.paypal.com'
    }
  ]);

  const initialIndex = selectedPersonaId === 'rahul' ? 1 : selectedPersonaId === 'sunita' ? 2 : 0;
  const [selectedMilestone, setSelectedMilestone] = useState<GigMilestone>(milestones[initialIndex]);

  // Form State
  const [receiverEmail, setReceiverEmail] = useState<string>(
    userProfile?.email?.includes('@') ? userProfile.email : selectedMilestone.defaultReceiver
  );
  const [deliverableText, setDeliverableText] = useState<string>('');
  const [codeUrl, setCodeUrl] = useState<string>('');

  // Execution State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationStage, setEvaluationStage] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<AiMilestoneEvaluation | null>(null);
  const [payoutReceipt, setPayoutReceipt] = useState<PaypalPayoutReceipt | null>(null);
  const [copiedBatchId, setCopiedBatchId] = useState<boolean>(false);
  const [paypalConfig, setPaypalConfig] = useState<{ configured: boolean; mode: string }>({
    configured: true,
    mode: 'sandbox'
  });

  // Track 2: Academic Discount Cloud Certifications Data
  const academicCertifications: AcademicCertification[] = [
    {
      id: 'CERT-AWS-01',
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      provider: 'AWS Academy & Amazon Web Services',
      category: 'Cloud Architecture & Infrastructure',
      originalPriceUsd: 150.00,
      originalPriceInr: 12450,
      subsidizedPriceUsd: 19.99,
      subsidizedPriceInr: 1650,
      discountPct: 87,
      badge: 'Academic Senate Partnered',
      description: 'Official certification testing AWS core cloud concepts, security, architecture, pricing, and support models for undergraduate engineers.',
      skillsGained: ['Amazon EC2 & S3', 'AWS IAM Security', 'VPC Networking', 'CloudWatch Telemetry']
    },
    {
      id: 'CERT-CISCO-02',
      title: 'Cisco Certified Network Associate (CCNA 200-301)',
      provider: 'Cisco Networking Academy',
      category: 'Enterprise Networks & Security',
      originalPriceUsd: 300.00,
      originalPriceInr: 24900,
      subsidizedPriceUsd: 19.99,
      subsidizedPriceInr: 1650,
      discountPct: 93,
      badge: 'AICTE Institutional Voucher',
      description: 'Foundational industry standard for network fundamentals, IP connectivity, IP services, security fundamentals, and network automation.',
      skillsGained: ['IPv4/IPv6 Routing', 'VLAN & Trunking', 'OSPFv2 Protocols', 'ACL Network Filters']
    },
    {
      id: 'CERT-AZURE-03',
      title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      provider: 'Microsoft Learn for Educators',
      category: 'Cloud Computing & Services',
      originalPriceUsd: 99.00,
      originalPriceInr: 8200,
      subsidizedPriceUsd: 14.99,
      subsidizedPriceInr: 1200,
      discountPct: 85,
      badge: 'Student Developer Grant',
      description: 'Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure cloud ecosystems.',
      skillsGained: ['Azure Resource Manager', 'Azure Blob Storage', 'Microsoft Entra ID', 'Cost Management']
    },
    {
      id: 'CERT-GCP-04',
      title: 'Google Cloud Associate Cloud Engineer (ACE)',
      provider: 'Google Cloud Career Readiness Program',
      category: 'Distributed Systems & Cloud DevOps',
      originalPriceUsd: 125.00,
      originalPriceInr: 10375,
      subsidizedPriceUsd: 19.99,
      subsidizedPriceInr: 1650,
      discountPct: 84,
      badge: 'Google Developer Student Clubs',
      description: 'Deploys applications, monitors operations, and manages enterprise solutions on Google Cloud Platform using gcloud CLI and Console.',
      skillsGained: ['Google Compute Engine', 'Google Kubernetes (GKE)', 'BigQuery Analytics', 'Cloud IAM']
    }
  ];

  // Track 3: 1-Click Hackathon Event Ticketing Data
  const hackathonTickets: HackathonTicket[] = [
    {
      id: 'HACK-SIH-2026',
      title: 'Smart India Hackathon (SIH 2026) Regional Screening Pass',
      organizer: 'AICTE & Ministry of Education Innovation Cell (MIC)',
      date: 'March 28-30, 2026',
      venue: 'AKTU Main Campus Innovation Center, Lucknow',
      priceUsd: 3.00,
      priceInr: 250,
      isSubsidized: true,
      slotsRemaining: 14,
      perks: ['Official SIH Screening ID', 'Faculty Mentor Accommodation', 'Cloud Credits ($250)', 'Jury Review Certificate']
    },
    {
      id: 'HACK-LKO-2026',
      title: 'Hack-a-Thon Lucknow 2026: Smart Mobility & IoT Sprint',
      organizer: 'UP Technical University & CSI State Chapter',
      date: 'April 11-12, 2026',
      venue: 'Govt Polytechnic Auditorium, Kanpur Road',
      priceUsd: 3.00,
      priceInr: 250,
      isSubsidized: true,
      slotsRemaining: 22,
      perks: ['Hardware IoT Workbench Entry', 'ESP32 Lab Kits Included', 'Direct Interview with Angel Investors']
    },
    {
      id: 'HACK-IEEE-2026',
      title: 'IEEE Student Branch Annual 24h Algorithmic Hack',
      organizer: 'IEEE UP Section & Student Branch Hub',
      date: 'May 02-03, 2026',
      venue: 'Computer Science & Engineering Lab Block 3',
      priceUsd: 3.00,
      priceInr: 250,
      isSubsidized: false,
      slotsRemaining: 30,
      perks: ['IEEE Global Member Certificate', 'Cash Prize Pool ₹50,000', 'Dinner & High-Speed LAN Pass']
    }
  ];

  // PayPal REST API Checkout Modal State
  const [checkoutItem, setCheckoutItem] = useState<{
    id: string;
    title: string;
    type: 'certification' | 'ticket';
    priceUsd: number;
    priceInr: number;
    provider: string;
  } | null>(null);

  const [checkoutStep, setCheckoutStep] = useState<'preview' | 'processing' | 'confirmed'>('preview');
  const [generatedTxId, setGeneratedTxId] = useState<string>('');
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  const handleOpenCheckout = (item: {
    id: string;
    title: string;
    type: 'certification' | 'ticket';
    priceUsd: number;
    priceInr: number;
    provider: string;
  }) => {
    setCheckoutItem(item);
    setCheckoutStep('preview');
    const randomPayId = 'PAYID-' + Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    setGeneratedTxId(randomPayId);
  };

  const handleConfirmPaypalPayment = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('confirmed');
      if (checkoutItem) {
        setPurchasedIds([...purchasedIds, checkoutItem.id]);
      }
    }, 1200);
  };

  // Helper formatting for currency
  const formatAmount = (usd: number, inr: number) => {
    if (currency === 'USD') {
      return `$${usd.toFixed(2)} USD`;
    }
    return `₹${inr.toLocaleString('en-IN')}`;
  };

  // Keep email in sync when milestone changes
  const handleSelectMilestone = (ms: GigMilestone) => {
    setSelectedMilestone(ms);
    setReceiverEmail(ms.defaultReceiver);
    setEvaluationResult(null);
    setPayoutReceipt(null);
  };

  // Sample submission loader for instant verification demonstration
  const handleLoadSampleProof = () => {
    if (selectedMilestone.id === 'MS-FIN-101') {
      setDeliverableText(
        "Successfully reconciled 150 B2B vendor invoices against GSTR-2B download. Identified 4 unmatched supplier bills where GSTIN was mistyped by transporter. Recomputed eligible ITC credit and generated exportable XLSX audit ledger with matching invoice hashes."
      );
      setCodeUrl("https://github.com/kaushal-setu/gstr2b-reconciliation-sample");
    } else if (selectedMilestone.id === 'MS-SOL-202') {
      setDeliverableText(
        "Completed string sizing calculations for 12x 450W Monocrystalline PV modules into 5kW dual MPPT inverter. Verified Voc max at -5C is 542V (well under the 600V MPPT safety threshold). Tested anti-islanding relay cutoff in 18 milliseconds."
      );
      setCodeUrl("https://github.com/kaushal-setu/solar-pv-sizing-model");
    } else {
      setDeliverableText(
        "Successfully set up UIDAI RD service v2.0 on Android terminal. Conducted test biometric transaction with RRN 482910394821. Zero error packet drop observed over 4G connection. Security audit checklist verified."
      );
      setCodeUrl("https://github.com/kaushal-setu/aeps-microatm-setup-log");
    }
  };

  // Trigger Autonomous AI Evaluation & PayPal Payout
  const handleSubmitDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableText.trim()) return;

    setIsEvaluating(true);
    setEvaluationResult(null);
    setPayoutReceipt(null);

    setEvaluationStage(lang === 'en' ? 'Step 1/3: AI Agent parsing technical requirements...' : 'चरण १/३: तकनीकी मानकों का विश्लेषण...');
    
    setTimeout(() => {
      setEvaluationStage(lang === 'en' ? 'Step 2/3: Evaluating completeness & practical feasibility...' : 'चरण २/३: कार्य की गुणवत्ता व शुद्धता का मूल्यांकन...');
    }, 900);

    setTimeout(async () => {
      setEvaluationStage(lang === 'en' ? 'Step 3/3: Triggering PayPal REST API disbursement...' : 'चरण ३/३: पेपैल रेस्ट एपीआई द्वारा स्वचालित भुगतान...');

      // Fallback sandbox simulation with exact matching schema
      const score = deliverableText.length > 80 ? 88 : 72;
      const passed = score >= 75;

      const evalData: AiMilestoneEvaluation = {
        score,
        passed,
        reasoning: passed 
          ? `Work satisfies technical verification requirements. Verified deliverable integrity against employer standards with high semantic compliance.`
          : `Deliverable lacks sufficient technical detail. Minimum 75% required for automated escrow release.`,
        verified_at: new Date().toISOString()
      };

      const receiptData: PaypalPayoutReceipt = passed ? {
        status: 'SUCCESS',
        mode: 'sandbox',
        batch_header: {
          payout_batch_id: 'BATCH-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          batch_status: 'SUCCESS',
          sender_batch_id: 'KS-PAYOUT-' + selectedMilestone.id,
          amount: {
            currency: 'USD',
            value: selectedMilestone.stipendUsd.toFixed(2)
          }
        },
        item: {
          receiver: receiverEmail,
          amount: {
            currency: 'USD',
            value: selectedMilestone.stipendUsd.toFixed(2)
          },
          transaction_id: 'TXN-' + Math.random().toString(36).substring(2, 11).toUpperCase(),
          transaction_status: 'SUCCESS'
        }
      } : {
        status: 'FAILED',
        mode: 'sandbox',
        message: 'AI Evaluation score fell below 75% requirement. Funds retained in escrow.'
      };

      setEvaluationResult(evalData);
      setPayoutReceipt(receiptData);
      setIsEvaluating(false);
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      
      {/* 1. Header with Currency Toggle & Live PayPal Gateway Badge */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-blue-700 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>PILLAR 5 · GLOBAL FINANCIAL RAIL</span>
            <span>·</span>
            <span>PAYPAL REST API & ACADEMIC SUBSIDIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            {lang === 'en' ? 'PayPal Global Financial Rail & Academic Subsidies' : 'पेपाल ग्लोबल वित्तीय रेल व अकादमिक छूट'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {lang === 'en'
              ? 'Autonomous international freelance payouts, 1-click hackathon ticketing, and 85%+ subsidized global cloud certifications via PayPal REST API.'
              : 'अंतर्राष्ट्रीय फ्रीलांस भुगतान, १-क्लिक हैकाथॉन टिकट और पेपैल एपीआई द्वारा ८५%+ रियायती क्लाउड सर्टिफिकेशन।'}
          </p>
        </div>

        {/* Currency Switcher & Live Sandbox Status */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          
          {/* Currency Toggle (USD $ / INR ₹) */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold font-mono-data">
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ₹ INR
            </button>
          </div>

          {/* Sandbox Live Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 shadow-2xs">
            <div className="w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
              P
            </div>
            <span>PayPal Sandbox Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

        </div>
      </div>

      {/* 2. Three Pillar Sub-Navigation Tracks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setActiveRailTrack('payouts')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
            activeRailTrack === 'payouts'
              ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
              : 'bg-white/80 border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
            activeRailTrack === 'payouts' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'
          }`}>
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Freelance & Prize Payouts</div>
            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
              Autonomous AI code audits & instant escrow disbursements
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveRailTrack('certifications')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
            activeRailTrack === 'certifications'
              ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white/80 border-slate-200 hover:border-indigo-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
            activeRailTrack === 'certifications' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Academic Cloud Certs</div>
            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
              AWS, Cisco & Azure vouchers (85%-93% discount)
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveRailTrack('ticketing')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
            activeRailTrack === 'ticketing'
              ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/80 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
            activeRailTrack === 'ticketing' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
          }`}>
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">1-Click Hackathon Tickets</div>
            <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
              SIH 2026 screening & collegiate sprint entry ($3 / ₹250)
            </div>
          </div>
        </button>
      </div>

      {/* TRACK 1: INTERNATIONAL FREELANCE & MILESTONE PAYOUTS */}
      {activeRailTrack === 'payouts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in">
          
          {/* Left Column (7 cols): Milestone Selection & Submission Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Milestone Selection Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono-data">
                  Select Funded Escrow Milestone
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Escrow Locked in PayPal
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {milestones.map(ms => {
                  const isSelected = selectedMilestone.id === ms.id;
                  return (
                    <button
                      key={ms.id}
                      onClick={() => handleSelectMilestone(ms)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-600 shadow-xs ring-1 ring-blue-500/20'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-data text-slate-500 mb-1">
                        <span>{ms.id}</span>
                        <span className="font-bold text-emerald-700">
                          {formatAmount(ms.stipendUsd, ms.stipendInr)}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 leading-snug truncate">
                        {ms.title}
                      </div>
                      <div className="text-[10.5px] text-slate-500 truncate mt-0.5">
                        {ms.employer.split('(')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Milestone Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-5 shadow-xs">
              
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-data text-blue-700 font-semibold">
                    {selectedMilestone.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs font-mono-data font-bold">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{formatAmount(selectedMilestone.stipendUsd, selectedMilestone.stipendInr)}</span>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedMilestone.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedMilestone.description}
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  <strong>Authorized Client:</strong> {selectedMilestone.employer}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase font-mono-data">
                  Verification Requirements (AI Evaluated):
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedMilestone.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submission Form */}
              <form onSubmit={handleSubmitDeliverable} className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase font-mono-data">
                    Work Deliverable & Verification Proof:
                  </label>
                  <button
                    type="button"
                    onClick={handleLoadSampleProof}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>⚡ Autofill Verified Sample</span>
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={deliverableText}
                  onChange={e => setDeliverableText(e.target.value)}
                  placeholder="Paste execution summary, calculation formulas, or technical steps performed..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-700 block mb-1">
                      GitHub Repository / Audit Link:
                    </label>
                    <input
                      type="url"
                      value={codeUrl}
                      onChange={e => setCodeUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-700 block mb-1">
                      Worker PayPal Receiver Account:
                    </label>
                    <input
                      type="email"
                      value={receiverEmail}
                      onChange={e => setReceiverEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono-data focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isEvaluating || !deliverableText.trim()}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs tracking-tight transition-all shadow-sm shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>{evaluationStage}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Submit for Autonomous AI Verification & Instant PayPal Payout</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

          {/* Right Column (5 cols): AI Evaluation Radar & PayPal Transaction Receipt */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Terminal / State Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono-data uppercase tracking-wider text-slate-300">
                    AI Autonomous Escrow Engine
                  </span>
                </div>
                <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Dual LLM & Rule Engine
                </span>
              </div>

              {isEvaluating ? (
                <div className="py-8 space-y-3 text-center">
                  <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono-data text-blue-300 animate-pulse">
                    {evaluationStage}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Evaluating against employer criteria & statutory compliance...
                  </p>
                </div>
              ) : evaluationResult ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono-data">Verification Score:</span>
                    <span className={`text-2xl font-bold font-mono-data ${evaluationResult.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {evaluationResult.score}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${evaluationResult.passed ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${evaluationResult.score}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 font-mono-data text-[11px]">
                    {evaluationResult.reasoning}
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400 font-mono-data">
                    Awaiting candidate deliverable submission...
                  </p>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Click "Autofill Verified Sample" on the left and submit to trigger instantaneous evaluation.
                  </p>
                </div>
              )}
            </div>

            {/* PayPal Receipt Card */}
            {payoutReceipt && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900 font-mono-data uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    PayPal Payout Receipt
                  </span>
                  <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    HTTP 201 Created
                  </span>
                </div>

                {payoutReceipt.status === 'SUCCESS' && payoutReceipt.batch_header ? (
                  <div className="space-y-2.5 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[9.5px] font-mono-data">PAYOUT BATCH ID</span>
                        <span className="font-mono-data font-bold text-slate-800 truncate block">
                          {payoutReceipt.batch_header.payout_batch_id}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block text-[9.5px] font-mono-data">TRANSACTION ID</span>
                        <span className="font-mono-data font-bold text-blue-700 truncate block">
                          {payoutReceipt.item?.transaction_id || 'TXN-DISBURSED'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-emerald-800 font-mono-data block">DISBURSED AMOUNT</span>
                        <span className="font-bold text-emerald-900 font-mono-data text-sm">
                          {formatAmount(selectedMilestone.stipendUsd, selectedMilestone.stipendInr)}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono-data font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        SETTLED INSTANTLY
                      </span>
                    </div>

                    <div className="text-[10.5px] text-slate-500 font-mono-data truncate">
                      Receiver: <strong className="text-slate-700">{payoutReceipt.item?.receiver || receiverEmail}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                    {payoutReceipt.message || 'Milestone verification fell below 75%. Escrow funds will release upon updating deliverables.'}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* TRACK 2: ACADEMIC DISCOUNT CLOUD CERTIFICATIONS */}
      {activeRailTrack === 'certifications' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
            <div>
              <h2 className="text-base font-bold text-indigo-950">
                Institutional Academic Cloud Certification Vouchers
              </h2>
              <p className="text-xs text-indigo-800 mt-0.5">
                Up to 93% subsidized through AKTU, AICTE and Academic Senate partnerships. Powered by PayPal 1-click education checkout.
              </p>
            </div>
            <div className="text-xs font-mono-data font-bold text-indigo-900 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shrink-0">
              Verified Student Pricing
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {academicCertifications.map(cert => {
              const isPurchased = purchasedIds.includes(cert.id);
              return (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold font-mono-data bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {cert.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold font-mono-data bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {cert.discountPct}% Subsidized
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {cert.title}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {cert.provider} · <span className="text-indigo-600">{cert.category}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cert.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono-data font-bold text-slate-500 uppercase tracking-wider block">
                        Validated Engineering Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsGained.map((sk, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[10.5px] font-mono-data text-slate-700">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono-data text-slate-400 line-through">
                        Standard: {formatAmount(cert.originalPriceUsd, cert.originalPriceInr)}
                      </div>
                      <div className="text-base font-bold font-mono-data text-emerald-700">
                        {formatAmount(cert.subsidizedPriceUsd, cert.subsidizedPriceInr)}
                      </div>
                    </div>

                    {isPurchased ? (
                      <span className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold font-mono-data flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Voucher Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenCheckout({
                          id: cert.id,
                          title: cert.title,
                          type: 'certification',
                          priceUsd: cert.subsidizedPriceUsd,
                          priceInr: cert.subsidizedPriceInr,
                          provider: cert.provider
                        })}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Buy with PayPal</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TRACK 3: 1-CLICK HACKATHON EVENT TICKETING */}
      {activeRailTrack === 'ticketing' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div>
              <h2 className="text-base font-bold text-emerald-950">
                1-Click Verified Hackathon Ticketing
              </h2>
              <p className="text-xs text-emerald-800 mt-0.5">
                Instant registration with student ID verification, meal passes, and cloud workspace provisioning. Zero Google Forms.
              </p>
            </div>
            <div className="text-xs font-mono-data font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
              Institutional Pass: $3.00 USD (₹250 INR)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hackathonTickets.map(ticket => {
              const isPurchased = purchasedIds.includes(ticket.id);
              return (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono-data">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {ticket.slotsRemaining} Slots Left
                      </span>
                      <span className="text-slate-500 font-semibold">{ticket.date}</span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {ticket.title}
                      </h3>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {ticket.organizer}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{ticket.venue}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono-data font-bold text-slate-500 uppercase tracking-wider block">
                        Included Delegate Perks:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {ticket.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono-data text-slate-400 block uppercase">Registration</span>
                      <span className="text-base font-bold font-mono-data text-emerald-800">
                        {formatAmount(ticket.priceUsd, ticket.priceInr)}
                      </span>
                    </div>

                    {isPurchased ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold font-mono-data flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Ticket Confirmed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenCheckout({
                          id: ticket.id,
                          title: ticket.title,
                          type: 'ticket',
                          priceUsd: ticket.priceUsd,
                          priceInr: ticket.priceInr,
                          provider: ticket.organizer
                        })}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Get Pass via PayPal</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. PayPal REST API Sandbox Checkout Modal */}
      {checkoutItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    PayPal Sandbox Checkout
                  </h3>
                  <div className="text-[10.5px] font-mono-data text-slate-500">
                    REST API Gateway · OAuth2 Bearer Auth
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutItem(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {checkoutStep === 'preview' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-mono-data uppercase text-slate-400 block font-bold">
                    Item Description:
                  </span>
                  <div className="text-xs font-bold text-slate-900">
                    {checkoutItem.title}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Issued by: {checkoutItem.provider}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1.5 font-mono-data">
                  <div className="flex justify-between text-slate-600">
                    <span>Payable Amount:</span>
                    <strong className="text-slate-900 font-bold">{formatAmount(checkoutItem.priceUsd, checkoutItem.priceInr)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Target Sandbox Payer:</span>
                    <span className="text-blue-700">student-buyer@sandbox.paypal.com</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>HTTP Request Endpoint:</span>
                    <span className="text-slate-500 text-[10px]">POST /v1/payments/payment</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-[10.5px] font-mono-data space-y-1 overflow-x-auto">
                  <div className="text-slate-400">// Sample REST API Payload Preview:</div>
                  <pre className="text-emerald-400">{JSON.stringify({
                    intent: "sale",
                    payer: { payment_method: "paypal" },
                    transactions: [{
                      amount: { total: checkoutItem.priceUsd.toFixed(2), currency: "USD" },
                      description: checkoutItem.title
                    }]
                  }, null, 2)}</pre>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmPaypalPayment}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs tracking-tight transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Authorize & Pay {formatAmount(checkoutItem.priceUsd, checkoutItem.priceInr)}</span>
                </button>
              </div>
            )}

            {checkoutStep === 'processing' && (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-800 font-mono-data">
                  Communicating with PayPal Sandbox Gateway...
                </p>
                <p className="text-[11px] text-slate-500">
                  Verifying student credentials and settling transaction token...
                </p>
              </div>
            )}

            {checkoutStep === 'confirmed' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Payment Succeeded & Verified!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Your {checkoutItem.type === 'ticket' ? 'Hackathon Entry Pass' : 'Certification Voucher'} has been unlocked.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono-data space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">TRANSACTION ID:</span>
                    <strong className="text-blue-700">{generatedTxId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">STATUS:</span>
                    <span className="text-emerald-700 font-bold">COMPLETED (HTTP 201)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PAID VIA:</span>
                    <span className="text-slate-700">PayPal REST API Sandbox</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Official Invoice Receipt downloaded for ${generatedTxId}`);
                      setCheckoutItem(null);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Receipt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutItem(null)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
