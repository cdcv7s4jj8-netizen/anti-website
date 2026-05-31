import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  ListTodo, 
  PlayCircle, 
  FileVideo, 
  Download, 
  Bot, 
  MessageSquare, 
  Send,
  Sparkles,
  Settings,
  ChevronRight,
  CheckSquare,
  Square,
  Search,
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [lightboxImg, setLightboxImg] = useState(null);

  // --- TAB 1: ANALYTICS OVERVIEW STATE ---
  const [ledgerSearch, setLedgerSearch] = useState('');
  const [ledgerFilter, setLedgerFilter] = useState('all');

  const balances = [
    { name: 'Snip Society (Stripe)', balance: '$1,119.23', sub: '+100% Growth all-time', img: '/earnings/IMG_0330.jpg', type: 'stripe' },
    { name: 'First Dollar Club', balance: '$336.23', sub: 'Extracted this month', img: '/earnings/IMG_0331.jpg', type: 'stripe' },
    { name: 'Binance Exchange Account', balance: '562.95 USDT', sub: '≈ $562.14 USD', img: '/earnings/IMG_0333.jpg', type: 'crypto' },
  ];

  const transactions = [
    { date: 'Jan 13, 2026 9:12 AM', amount: '$22.46', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0332.jpg' },
    { date: 'Dec 19, 2025 1:59 AM', amount: '$650.00', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0332.jpg' },
    { date: 'Dec 17, 2025 11:00 AM', amount: '$350.00', source: 'Bitget 2nd', status: 'failed', img: '/earnings/IMG_0332.jpg' },
    { date: 'Nov 3, 2025 12:18 AM', amount: '$50.00', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0332.jpg' },
    { date: 'Sep 28, 2025 1:51 AM', amount: '$771.75', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0335.jpg' },
    { date: 'Sep 23, 2025 2:28 AM', amount: '$500.00', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0335.jpg' },
    { date: 'Sep 17, 2025 9:17 AM', amount: '$200.00', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0335.jpg' },
    { date: 'Sep 17, 2025 3:59 AM', amount: '$20.00', source: 'Babar Amjad Khan', status: 'completed', img: '/earnings/IMG_0335.jpg' },
    { date: 'Sep 17, 2025 1:12 AM', amount: '$54.00', source: 'Bitget 2nd', status: 'completed', img: '/earnings/IMG_0335.jpg' },
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.source.toLowerCase().includes(ledgerSearch.toLowerCase()) || 
                          tx.amount.includes(ledgerSearch);
    const matchesFilter = ledgerFilter === 'all' || 
                          (ledgerFilter === 'completed' && tx.status === 'completed') ||
                          (ledgerFilter === 'failed' && tx.status === 'failed');
    return matchesSearch && matchesFilter;
  });

  // --- TAB 2: MASTERCLASS EDUCATION STATE ---
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([0, 1]); // indexes of completed lessons
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35); // simulated percent
  const videoIntervalRef = useRef(null);

  const modules = [
    {
      title: 'Phase 01 // Digital Infiltration',
      lessons: [
        { title: 'The Hook-Gap Framework: Bypassing Filters', duration: '12:45', videoUrl: '#' },
        { title: 'Scroll-Stop Logic: First 3 Seconds Science', duration: '18:22', videoUrl: '#' },
        { title: 'Metadata Hijacking: Forcing Algorithmic Indexing', duration: '14:10', videoUrl: '#' },
      ],
      checklist: [
        'Analyze 10 scroll-stop hooks in your niche',
        'Configure your metadata file sequence',
        'Set up 3 secret channels on TikTok/YT Shorts'
      ],
      assets: [
        { name: 'Hook-Gap Cheat Sheet.pdf', size: '1.2 MB' },
        { name: 'Metadata Template Config.json', size: '4.5 KB' }
      ]
    },
    {
      title: 'Phase 02 // Dopamine Splicing',
      lessons: [
        { title: 'Subconscious Anchoring: retention locks', duration: '22:15', videoUrl: '#' },
        { title: 'Rhythm Editing: High intensity pacing cuts', duration: '16:40', videoUrl: '#' },
        { title: 'Micro-Sound Effects: psychological loops', duration: '20:05', videoUrl: '#' },
        { title: 'Subtitles & Visual Styling: retention booster', duration: '15:30', videoUrl: '#' },
      ],
      checklist: [
        'Cut a video keeping silence under 15ms per block',
        'Incorporate 3 subtitle micro-animations',
        'Export using Clipper High-Bitrate preset'
      ],
      assets: [
        { name: 'Clipper Cyber Font pack.zip', size: '24.1 MB' },
        { name: 'Dopamine Sound FX library.zip', size: '115.8 MB' }
      ]
    },
    {
      title: 'Phase 03 // Monetization Extraction',
      lessons: [
        { title: 'High-Ticket Bridging: Views into Capital', duration: '25:12', videoUrl: '#' },
        { title: 'Referral Architecture: Automated CRM triggers', duration: '19:40', videoUrl: '#' },
        { title: 'Scaling Operations: Hiring clone editors', duration: '21:05', videoUrl: '#' },
      ],
      checklist: [
        'Map out your digital funnel landing page',
        'Configure your referral bridge triggers',
        'Submit first payout request'
      ],
      assets: [
        { name: 'Elite Bridge Funnel Templates.json', size: '450 KB' },
        { name: 'Scale Blueprint.pdf', size: '3.4 MB' }
      ]
    }
  ];

  const handleLessonSelect = (modIdx, lesIdx) => {
    setCurrentModule(modIdx);
    setCurrentLesson(lesIdx);
    setVideoPlaying(false);
    setVideoProgress(0);
  };

  const handleTogglePlay = () => {
    setVideoPlaying(prev => !prev);
  };

  useEffect(() => {
    if (videoPlaying) {
      videoIntervalRef.current = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            // mark lesson complete!
            const lessonKey = currentModule * 10 + currentLesson;
            if (!completedLessons.includes(lessonKey)) {
              setCompletedLessons(curr => [...curr, lessonKey]);
            }
            setVideoPlaying(false);
            return 100;
          }
          return prev + 1.5;
        });
      }, 500);
    } else {
      clearInterval(videoIntervalRef.current);
    }
    return () => clearInterval(videoIntervalRef.current);
  }, [videoPlaying, currentModule, currentLesson]);

  // --- TAB 3: VIRAL HOOK ANALYZER STATE ---
  const [niche, setNiche] = useState('wealth');
  const [hookText, setHookText] = useState('');
  const [styleType, setStyleType] = useState('high-intensity');
  const [analyzerLogs, setAnalyzerLogs] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const triggerAnalysis = () => {
    if (!hookText.trim()) return;
    setAnalyzing(true);
    setAnalysisResult(null);
    setAnalyzerLogs([]);

    const logSteps = [
      'INITIALIZING SCANNER...',
      'PARSING SYNTAX AND HOOK FREQUENCY...',
      'MATCHING WITH DATABASE (2.4M IMPRESSIONS)...',
      'CALCULATING ATTENTION GRADIENT...',
      'TESTING RETENTION LOCK MATRIX...',
      'ANALYSIS COMPLETE // GENERATING REPORT.'
    ];

    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        setAnalyzerLogs(prev => [...prev, step]);
        if (idx === logSteps.length - 1) {
          // Generate customized outputs
          const score = Math.floor(Math.random() * 20) + 76; // 76-95
          const dopamine = score > 88 ? 'HIGH (CRITICAL RETENTION)' : 'MEDIUM';
          const viralPotential = Math.floor(score * 1.05);

          const alternates = {
            wealth: [
              `The military uses this exact $12/hr trick to print cash...`,
              `Do NOT scroll if you have less than $5,000 in your bank...`,
              `I quit my 9-5 job because of this 10-second automation...`
            ],
            motivation: [
              `Stop working hard. You are playing a losing game...`,
              `Your friends want you to stay poor. Here is the proof...`,
              `If you feel lost right now, you need to hear this...`
            ],
            tech: [
              `This underground AI website feels illegal to know...`,
              `Your iPhone is secretly tracking this. Turn it off...`,
              `ChatGPT is obsolete. Here is what elite programmers use...`
            ]
          };

          setAnalysisResult({
            score,
            dopamine,
            viralPotential,
            feedback: `Your hook "${hookText.slice(0, 30)}..." contains decent attention triggers, but lacks immediate psychological friction. Replace passive terms with high-leverage power hooks.`,
            suggestions: alternates[niche] || alternates.wealth
          });
          setAnalyzing(false);
        }
      }, (idx + 1) * 800);
    });
  };

  // --- TAB 4: MASTERMIND STRATEGIST CHAT FEED ---
  const chatBottomRef = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ClipperElite', text: 'Just hit 1.2M views on my tech channel using the Phase 2 subtitles hack!', time: '10:04 AM', role: 'Moderator', avatarColor: 'bg-emerald-500' },
    { id: 2, sender: 'MatrixBreaker', text: 'Anyone else seeing high CPMs on wealth topics in Germany? Payouts are insane right now.', time: '10:08 AM', role: 'Pro Creator', avatarColor: 'bg-indigo-500' },
    { id: 3, sender: 'Admin_Dexter', text: 'Important alert: TikTok updated metadata filters. Check the new guide in Phase 1 assets to patch your settings.', time: '10:12 AM', role: 'Staff Strategist', avatarColor: 'bg-rose-500' }
  ]);

  const botResponses = [
    "Check your hook-gap index. If views drop off at second 2, you need scroll-stop sound overlays.",
    "德國 CPM is around $14 right now. Target finance keywords if you want high payouts.",
    "Make sure your export format matches standard 1080x1920 HEVC. Any compression will kill reach.",
    "Just secured $1,200 payout from Bitget today. Clipper's Edge strategy works flawlessly.",
    "Use the custom font pack from Module 2. Bold yellow titles increase CTR by 24%."
  ];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      id: chatMessages.length + 1,
      sender: user ? user.username : 'Operative',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'Operative',
      avatarColor: 'bg-primary-container text-black'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Trigger simulated mastermind bot replies
    setTimeout(() => {
      const randomBot = ['ClipperElite', 'MatrixBreaker', 'ApexClipper', 'Alpha_01'][Math.floor(Math.random() * 4)];
      const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: randomBot,
        text: `@${userMsg.sender} ${randomReply}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: 'Mastermind member',
        avatarColor: 'bg-blue-500'
      }]);
    }, 1500);
  };

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Panel */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        {/* User Card */}
        <div className="glass-card p-6 rounded-xl flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-primary-container" />
          <div className="w-12 h-12 rounded-full bg-primary-container/20 border border-primary-container flex items-center justify-center text-primary-container font-black uppercase text-lg">
            {user ? user.username.slice(0, 2) : 'OP'}
          </div>
          <div>
            <p className="font-label text-[10px] text-primary-container font-bold tracking-wider uppercase">ELITE ACCESS ACTIVE</p>
            <h3 className="font-display font-bold text-white leading-tight uppercase truncate max-w-[150px]">
              {user ? user.username : 'Operative'}
            </h3>
            <p className="text-[10px] font-mono text-on-surface-variant">Tier: {user ? user.tier : 'Operative'}</p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="glass-card p-2 rounded-xl flex flex-col gap-1 font-label text-xs uppercase tracking-wider font-bold">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full py-4 px-4 rounded text-left flex items-center gap-3 transition-colors ${
              activeTab === 'analytics' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
            }`}
          >
            <TrendingUp size={16} /> Analytics & Ledger
          </button>
          
          <button 
            onClick={() => setActiveTab('masterclass')}
            className={`w-full py-4 px-4 rounded text-left flex items-center gap-3 transition-colors ${
              activeTab === 'masterclass' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileVideo size={16} /> Course Masterclass
          </button>
          
          <button 
            onClick={() => setActiveTab('analyzer')}
            className={`w-full py-4 px-4 rounded text-left flex items-center gap-3 transition-colors ${
              activeTab === 'analyzer' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
            }`}
          >
            <Bot size={16} /> Hook Analyzer
          </button>

          <button 
            onClick={() => setActiveTab('chat')}
            className={`w-full py-4 px-4 rounded text-left flex items-center gap-3 transition-colors ${
              activeTab === 'chat' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageSquare size={16} /> Strategist Chat
          </button>
        </div>

        {/* System Logs Stats decoration */}
        <div className="hidden lg:block glass-card p-6 rounded-xl text-[10px] font-mono text-on-surface-variant space-y-2 select-none opacity-60">
          <p className="text-white uppercase font-bold tracking-wider font-label text-[9px] mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-primary-container rounded-full animate-ping" /> System Logs
          </p>
          <p>LOC_TIME: {new Date().toLocaleTimeString()}</p>
          <p>LATENCY: 42ms // PORT: 443</p>
          <p>SYS_STATUS: ACTIVE</p>
          <p>CRYPT: AES-256-GCM</p>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="lg:col-span-3 flex flex-col min-h-[60vh]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: ANALYTICS & LEDGER */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6 flex flex-col h-full"
            >
              <div className="glass-card p-6 rounded-xl flex justify-between items-center relative overflow-hidden">
                <div>
                  <h2 className="font-display font-black italic text-2xl text-white uppercase tracking-tight">Verified Extractions Overview</h2>
                  <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Real-time ledger analytics & verification screenshots</p>
                </div>
                <div className="text-primary-container"><DollarSign size={24} /></div>
              </div>

              {/* Balances grids */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {balances.map((b, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setLightboxImg({ src: b.img, title: b.name })}
                    className="glass-card p-6 rounded-xl relative hover:border-primary-container/30 transition-all group cursor-pointer"
                  >
                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-primary-container transition-colors">
                      <ExternalLink size={14} />
                    </div>
                    <span className="font-label text-[9px] text-on-surface-variant uppercase tracking-widest font-bold block mb-1">{b.name}</span>
                    <h3 className="font-display text-2xl font-black text-white italic tracking-tight">{b.balance}</h3>
                    <p className="text-[10px] text-primary-container/70 font-semibold mt-1 uppercase tracking-wider">{b.sub}</p>
                  </div>
                ))}
              </div>

              {/* Transactions Ledger */}
              <div className="glass-card p-6 rounded-xl flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-5">
                  <h3 className="font-display font-bold uppercase text-sm tracking-widest text-white flex items-center gap-2">
                    <Wallet size={16} className="text-primary-container" /> Transaction Ledger
                  </h3>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                      <input 
                        type="text"
                        placeholder="Search ledger..."
                        value={ledgerSearch}
                        onChange={(e) => setLedgerSearch(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-primary-container font-mono"
                      />
                    </div>
                    <select 
                      value={ledgerFilter}
                      onChange={(e) => setLedgerFilter(e.target.value)}
                      className="bg-surface border border-white/10 rounded py-1.5 px-3 text-xs text-on-surface-variant font-label focus:outline-none focus:border-primary-container"
                    >
                      <option value="all">All States</option>
                      <option value="completed">Completed Only</option>
                      <option value="failed">Failed Only</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/5 font-label uppercase text-[10px] tracking-widest text-on-surface-variant font-bold">
                        <th className="pb-3">Timestamp</th>
                        <th className="pb-3">System Gate</th>
                        <th className="pb-3 text-right">Yield Value</th>
                        <th className="pb-3 text-center">Status</th>
                        <th className="pb-3 text-center">Proof File</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredTransactions.map((tx, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 text-on-surface-variant">{tx.date}</td>
                          <td className="py-3.5 text-white font-bold">{tx.source}</td>
                          <td className="py-3.5 text-right font-black text-white">{tx.amount}</td>
                          <td className="py-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-label ${
                              tx.status === 'completed' 
                                ? 'bg-primary-container/10 text-primary-container border border-primary-container/20' 
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <button 
                              onClick={() => setLightboxImg({ src: tx.img, title: `Proof Transaction: ${tx.amount} (${tx.date})` })}
                              className="text-primary-container hover:text-white transition-colors"
                            >
                              <ExternalLink size={12} className="inline" /> View Screen
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MASTERCLASS LESSONS */}
          {activeTab === 'masterclass' && (
            <motion.div
              key="masterclass"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Video Player + Checklist Left */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Cyber HTML5 Video Player Mock */}
                <div className="glass-card rounded-xl overflow-hidden bg-black/60 relative border border-white/10 group">
                  <div className="aspect-video w-full relative flex items-center justify-center">
                    
                    {/* Video Content Poster */}
                    <img 
                      src="/results/Screenshot_20260531_165048_Video Player.jpg" 
                      alt="Lesson poster" 
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        videoPlaying ? 'opacity-25' : 'opacity-70'
                      }`}
                    />

                    {/* Ambient Play Overlay */}
                    {!videoPlaying && (
                      <button 
                        onClick={handleTogglePlay}
                        className="absolute w-20 h-20 rounded-full bg-primary-container/95 text-on-primary-container flex items-center justify-center bloom-primary shadow-2xl transition-all hover:scale-105 active:scale-95 z-20"
                      >
                        <PlayCircle size={40} className="stroke-[2.5]" />
                      </button>
                    )}

                    {/* Cyber overlay telemetry lines */}
                    <div className="absolute inset-0 border border-white/5 pointer-events-none p-4 flex flex-col justify-between font-mono text-[9px] text-primary-container opacity-60">
                      <div className="flex justify-between">
                        <span>Lsn_ID // 0{currentModule+1}_0{currentLesson+1}</span>
                        <span>RES // 1080p_60FPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>REC // ENGAGEMENT_MATRIX</span>
                        <span>BUFF // OK</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Control Bar */}
                  <div className="p-4 bg-surface border-t border-white/5 flex flex-col gap-2.5">
                    
                    {/* Progress Slider */}
                    <div className="w-full bg-white/5 h-[3px] rounded cursor-pointer relative" onClick={() => setVideoProgress(p => (p+20)%100)}>
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary-container shadow-[0_0_8px_#00ff41]" 
                        style={{ width: `${videoProgress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={handleTogglePlay}
                          className="text-white hover:text-primary-container transition-colors"
                        >
                          {videoPlaying ? 'PAUSE' : 'RUN_STREAM'}
                        </button>
                        <span className="text-on-surface-variant/70">
                          {Math.floor(videoProgress * 0.15)}m : {Math.floor((videoProgress % 10) * 6)}s / {modules[currentModule].lessons[currentLesson].duration}
                        </span>
                      </div>
                      <span className="text-primary-container font-bold">
                        {completedLessons.includes(currentModule * 10 + currentLesson) ? 'COMPLETE' : 'IN_PROGRESS'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lesson Description */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight mb-2">
                    {modules[currentModule].lessons[currentLesson].title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                    Analyze the psychological factors involved in retaining high attention levels. In this video, we dissect raw algorithms to explain hook gaps and pacing algorithms, detailing where and when viewers drop off.
                  </p>

                  {/* Assets and Worksheets downloads */}
                  <div className="border-t border-white/5 pt-6">
                    <h4 className="font-label text-[10px] uppercase tracking-widest text-white font-bold mb-4 flex items-center gap-1.5">
                      <Download size={12} className="text-primary-container" /> Resource Assets File
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {modules[currentModule].assets.map((as, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/5">
                          <div className="flex items-center gap-2 overflow-hidden mr-2">
                            <FileText size={16} className="text-primary-container flex-shrink-0" />
                            <span className="font-mono text-xs text-white truncate">{as.name}</span>
                          </div>
                          <button 
                            onClick={() => alert(`Downloading: ${as.name}`)}
                            className="bg-primary-container text-on-primary-container hover:bg-white transition-colors py-1 px-2.5 font-label text-[9px] uppercase font-bold rounded flex items-center gap-1"
                          >
                            Get
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Curriculum Right */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Course Syllabus */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-6 flex items-center gap-1.5">
                    <ListTodo size={14} className="text-primary-container" /> Course Curriculum
                  </h3>
                  <div className="space-y-4">
                    {modules.map((mod, modIdx) => (
                      <div key={modIdx} className="space-y-2">
                        <h4 className="font-display font-bold text-xs uppercase tracking-tight text-white border-b border-white/5 pb-2">
                          {mod.title}
                        </h4>
                        <div className="space-y-1">
                          {mod.lessons.map((les, lesIdx) => {
                            const lessonKey = modIdx * 10 + lesIdx;
                            const isActive = currentModule === modIdx && currentLesson === lesIdx;
                            const isDone = completedLessons.includes(lessonKey);

                            return (
                              <button
                                key={lesIdx}
                                onClick={() => handleLessonSelect(modIdx, lesIdx)}
                                className={`w-full py-2.5 px-3 rounded text-left text-xs font-mono transition-all flex justify-between items-center ${
                                  isActive 
                                    ? 'bg-primary-container/10 text-primary-container border-l-2 border-primary-container pl-4' 
                                    : 'text-on-surface-variant hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <span className="truncate pr-2">{les.title}</span>
                                <span className="text-[10px] opacity-50 flex-shrink-0">
                                  {isDone ? '✓' : les.duration}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Checklist */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-label text-[10px] uppercase tracking-widest text-white font-bold mb-4">
                    MODULE COMPLETION CHECKLIST
                  </h3>
                  <div className="space-y-3.5 font-mono text-xs">
                    {modules[currentModule].checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-on-surface-variant">
                        <CheckSquare size={16} className="text-primary-container flex-shrink-0 mt-0.5" />
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: VIRAL HOOK ANALYZER */}
          {activeTab === 'analyzer' && (
            <motion.div
              key="analyzer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6 rounded-xl flex justify-between items-center">
                <div>
                  <h2 className="font-display font-black italic text-2xl text-white uppercase tracking-tight">Viral Hook-Gap Analyzer</h2>
                  <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Diagnose script parameters & output alternate virus sequences</p>
                </div>
                <div className="text-primary-container"><Bot size={24} /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs Left */}
                <div className="glass-card p-8 rounded-xl space-y-6">
                  <div>
                    <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                      Target Audience Category (Niche)
                    </label>
                    <select 
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container font-mono"
                    >
                      <option value="wealth">Wealth & Automated Systems</option>
                      <option value="motivation">High-Performance Psychology</option>
                      <option value="tech">Artificial Intelligence & Tech Secrets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                      Video Title / Hook Text Script (First 3s)
                    </label>
                    <textarea 
                      placeholder="e.g. Stop wasting hours watching videos on Netflix and start doing this..."
                      rows={4}
                      value={hookText}
                      onChange={(e) => setHookText(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container font-mono resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                      Psychological Editing Presets
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setStyleType('high-intensity')}
                        className={`py-3 rounded font-label text-[10px] uppercase font-bold border transition-all ${
                          styleType === 'high-intensity'
                            ? 'bg-primary-container/10 border-primary-container text-primary-container'
                            : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-white'
                        }`}
                      >
                        High Intensity Pacing
                      </button>
                      <button 
                        type="button"
                        onClick={() => setStyleType('hook-gap')}
                        className={`py-3 rounded font-label text-[10px] uppercase font-bold border transition-all ${
                          styleType === 'hook-gap'
                            ? 'bg-primary-container/10 border-primary-container text-primary-container'
                            : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-white'
                        }`}
                      >
                        Hook-Gap Loops
                      </button>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={triggerAnalysis}
                    disabled={analyzing || !hookText.trim()}
                    className="w-full bg-primary-container text-on-primary-container py-4 font-display font-black uppercase tracking-wider bloom-primary transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {analyzing ? 'RUNNING RETENTION DIAGNOSTICS...' : 'DIAGNOSE HOOK SEQUENCE'}
                    <Sparkles size={16} className="fill-current" />
                  </button>
                </div>

                {/* Outputs Right */}
                <div className="glass-card p-8 rounded-xl flex flex-col min-h-[400px]">
                  
                  {/* Idle/Initial State */}
                  {!analyzing && !analysisResult && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-on-surface-variant space-y-3 opacity-60">
                      <Bot size={48} className="stroke-[1]" />
                      <h4 className="font-label text-[10px] uppercase tracking-widest font-bold">ANALYZER DISENGAGED</h4>
                      <p className="font-mono text-xs max-w-xs">Input script hooks on the left to initialize code simulations.</p>
                    </div>
                  )}

                  {/* Calculating Loader state */}
                  {analyzing && (
                    <div className="flex-grow flex flex-col justify-center font-mono text-xs text-primary-container space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2.5 h-2.5 bg-primary-container rounded-full animate-ping" />
                        <span className="font-label text-[10px] uppercase font-bold">ENGINE DECRYPTING DATA STREAM</span>
                      </div>
                      {analyzerLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-white/20">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Results state */}
                  {!analyzing && analysisResult && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-grow flex flex-col space-y-6"
                    >
                      <h3 className="font-label text-[10px] uppercase tracking-widest text-primary-container font-bold border-b border-white/5 pb-3">
                        DIAGNOSTIC REPORT // GENERATED
                      </h3>

                      {/* Radial score panel */}
                      <div className="flex items-center justify-around bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="text-center">
                          <span className="font-label text-[9px] opacity-50 uppercase tracking-wider block">Scroll-Stop Index</span>
                          <span className="font-display font-black text-3xl text-white italic">{analysisResult.score}/100</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="text-center">
                          <span className="font-label text-[9px] opacity-50 uppercase tracking-wider block">Viral Potential</span>
                          <span className="font-display font-black text-3xl text-primary-container italic">{analysisResult.viralPotential}%</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">Psychological feedback</h4>
                        <p className="font-mono text-xs text-white/80 leading-relaxed bg-black/30 p-4 rounded border border-white/5">
                          {analysisResult.feedback}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-label text-[9px] uppercase tracking-widest text-secondary-container font-bold mb-3 flex items-center gap-1">
                          <Sparkles size={12} /> ALTERNATIVE HIGH-RETENTION FORMULAS
                        </h4>
                        <div className="space-y-2">
                          {analysisResult.suggestions.map((sug, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white/5 hover:bg-primary-container/10 p-3 rounded border border-white/5 group transition-colors">
                              <span className="font-mono text-xs text-white truncate mr-2">{sug}</span>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(sug);
                                  alert('Copied to clipboard!');
                                }}
                                className="text-[10px] font-label uppercase text-primary-container opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Copy
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: STRATEGIST CHAT */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-xl flex flex-col h-[70vh]"
            >
              {/* Chat Header */}
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-primary-container rounded-full animate-ping" />
                  <div>
                    <h3 className="font-display font-bold uppercase text-sm tracking-widest text-white">Mastermind Strategy Feed</h3>
                    <p className="font-label text-[9px] text-on-surface-variant uppercase mt-0.5">Live mastermind connection // Operative Chat</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-primary-container/70">{chatMessages.length} connected</span>
              </div>

              {/* Chat Messages Logs */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
                {chatMessages.map((msg, idx) => (
                  <div key={msg.id} className="flex items-start gap-4">
                    {/* User profile abbreviation */}
                    <div className={`w-9 h-9 rounded-full ${msg.avatarColor} flex items-center justify-center text-xs font-black uppercase flex-shrink-0`}>
                      {msg.sender.slice(0, 2)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-xs text-white font-bold">{msg.sender}</span>
                        <span className={`text-[9px] font-label uppercase px-1.5 py-0.2 rounded font-bold ${
                          msg.role === 'Moderator' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : msg.role === 'Staff Strategist'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-white/5 text-on-surface-variant'
                        }`}>
                          {msg.role}
                        </span>
                        <span className="font-mono text-[9px] opacity-40">{msg.time}</span>
                      </div>
                      <p className="font-mono text-xs text-white/80 max-w-2xl bg-white/5 py-2 px-3 rounded border border-white/5 leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Field form */}
              <form onSubmit={handleSendChat} className="p-4 border-t border-white/5 flex gap-3">
                <input 
                  type="text"
                  placeholder="Share a strategy or ask operatives..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-xs text-white placeholder-white/20 font-mono focus:outline-none focus:border-primary-container"
                />
                <button 
                  type="submit"
                  className="bg-primary-container text-on-primary-container p-3 rounded-lg hover:bg-white transition-colors active:scale-95"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Dynamic Lightbox for Balances/Screensheets */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-surface-container-low rounded-2xl border border-white/10 p-4 shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setLightboxImg(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white font-label text-xs uppercase tracking-widest font-bold"
              >
                Close X
              </button>
              <div className="overflow-hidden rounded-xl bg-black/45 border border-white/5 h-[65vh] flex items-center justify-center">
                <img 
                  src={lightboxImg.src} 
                  alt={lightboxImg.title} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-4">
                <p className="font-label text-[9px] text-primary-container uppercase font-bold tracking-widest mb-0.5">Ledger proof image</p>
                <h4 className="font-display text-xs text-white font-bold uppercase tracking-tight">{lightboxImg.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
