/* global React */
const { useState, useRef, useEffect, useCallback } = React;

// ============================================================
//  SWAPPY THE FOX — ported from swappi2, vanilla CDN version
// ============================================================

/* ── Constants ── */
const FOX_W       = 65;
const FOX_H       = 78;
const MARGIN      = 10;
const SPEED_MIN   = 1.0;
const SPEED_MAX   = 2.4;
const IDLE_MIN    = 2000;
const IDLE_MAX    = 4500;
const WALK_MIN    = 1400;
const WALK_MAX    = 3000;
const JUMP_EVERY  = [9000, 18000];
const SLEEP_AFTER = 24000;
const Y_SPRING    = 0.055;
const Y_MAX       = 0.42;

const WIDGET_SEL = '.card, .metric-card, .skill-card';

const PAGE_GREETINGS = {
  home:      ["Welcome! 👋", "Swap skills free! 🔄", "Click 'Get Started'! 🦊"],
  browse:    ["Find your match! 🔍", "Top rated picks! ⭐", "Swap or pay! 🔄"],
  dashboard: ["Keep swapping! 🏆", "Check your rank! 🎉", "Level up! 🥈"],
  profile:   ["Looks amazing! 🌟", "Check reviews! ⭐", "Request a swap! 🦊"],
  workshops: ["Grab a spot! 📅", "Some are FREE! 🎊"],
  pricing:   ["Swapping is free! 🎉", "Save with swaps! 💸"],
  auth:      ["Any email works! 😄", "Just click Sign in! 🚀"],
};

const SCROLL_HELP = ["Click me! 🦊", "Need help? 💬", "Ask me! 🔍"];
const SIT_MESSAGES = ["Nice view! 🦊", "My spot! 😄", "Good vibes! ✨"];

const WIDGET_REACTIONS = {
  swap:    ["+5 pts! 🎉", "Level up! 🚀", "Nice swap! 🔥"],
  badge:   ["Badge unlocked! 🏆", "Trophy! 🥇"],
  filter:  ["Searching! 🔍", "Good pick! 👌"],
  profile: ["Nice choice! 👀", "Check reviews! ⭐"],
};

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ── AI knowledge base ── */
const KB = [
  { keys: ['hello','hi','hey','sup','yo','howdy'], replies: ["Hey hey! 🦊 I'm Swappy! What can I help you with?", "Hi there! 👋 Ready to learn something awesome today?", "Woof woof! 🦊 (That's fox for hello!)"] },
  { keys: ['what is swappi','about','explain','how does this work'], replies: ["Swappi is Egypt's skill-exchange platform! 🎉 Teach what you know, learn what you don't!", "Think of Swappi as a talent marketplace where you trade skills. Teach guitar, learn coding! 🔄"] },
  { keys: ['how to swap','swap','exchange','trade skill','skill swap'], replies: ["Easy! Browse skills → find one you like → click Book → offer your skill back. Done! 🤝", "To swap: 1️⃣ Browse  2️⃣ Find a provider  3️⃣ Book  4️⃣ Offer your skill. Simple!"] },
  { keys: ['price','cost','pricing','free','how much','money','pay','egp'], replies: ["Swapping is always FREE! 🎊 Sessions start from 150 EGP if you prefer to pay.", "Skills swaps = free forever! 🦊✨ Only pay EGP if you want to buy a session without swapping."] },
  { keys: ['badge','rank','score','points','achievement','level','master','skilled','expert'], replies: ["Complete swaps to earn your rank! 🏆 10 swaps → Skilled ⭐, 15 → Expert 💎, 20+ → Master 👑!", "Every swap moves you up a rank. Keep going!"] },
  { keys: ['workshop','event','class','live','course'], replies: ["Check the Workshops tab! 📅 Live expert sessions — grab a spot before they fill up!", "Workshops are community sessions hosted by experts. Reserve your spot 🙌"] },
  { keys: ['browse','find','search','skill','category','explore'], replies: ["Hit Browse at the top! 🔍 Filter by category, sort by rating, find your perfect match.", "Head to Browse → pick a category → sort by popularity or price. Easy peasy 🦊"] },
  { keys: ['login','sign in','sign up','account','join','password'], replies: ["Click Sign In at the top-right! 🚀 Try aleyasalemm@gmail.com / 2003 to see a real account.", "To see a full account, log in with aleyasalemm@gmail.com and password 2003! 🦊"] },
  { keys: ['egypt','cairo','egp','egyptian','arabic'], replies: ["Swappi is built for Egypt 🇪🇬 — priced in EGP, community in Cairo and beyond. Yalla swap! 🦊", "100% Egyptian-made and proud! All transactions in EGP 🚀"] },
  { keys: ['who are you','what are you','swappy','mascot','fox','name'], replies: ["I'm Swappy! 🦊 Swappi's friendly fox mascot. I run around keeping things fun!", "They call me Swappy 🧡 An orange fox who loves skill exchanges almost as much as chasing my tail!"] },
  { keys: ['help','support','stuck','confused'], replies: ["I'm here to help! 🦊 Ask me about: swapping, pricing, ranks, workshops, or browsing.", "No worries! Tell me what you're stuck on — I've got you covered 🧡"] },
  { keys: ['bye','goodbye','later','cya','good night'], replies: ["Bye bye! 🦊💨 Come back anytime — I'll be running laps around the page!", "See ya! 👋 Remember: swap skills, earn ranks, be awesome! 🌟"] },
  { keys: ['thanks','thank you','thx','helpful','great'], replies: ["Aww, you're so welcome! 🧡 That makes my tail wag!", "Happy to help! 🦊✨ Any other questions?"] },
];
const FALLBACKS = [
  "Hmm, I'm not sure! 🤔 Try asking about swapping, pricing, ranks, or workshops!",
  "Ooh, that one's tricky for a fox 🦊 Ask me about skills, swaps, or how Swappi works!",
  "I'm still learning! 🐾 Try: 'how do I swap?', 'what are ranks?', or 'pricing'.",
];
function mascotReply(input) {
  const lower = (input || '').toLowerCase().trim();
  if (!lower) return pickRandom(FALLBACKS);
  for (const entry of KB) {
    if (entry.keys.some(k => lower.includes(k))) return pickRandom(entry.replies);
  }
  return pickRandom(FALLBACKS);
}

/* ── MascotSVG ── */
function MascotSVG({ state = 'idle' }) {
  const isSleep   = state === 'sleep';
  const isExcited = state === 'excited';
  const isHappy   = state === 'sit' || state === 'chat';

  const eyes = isSleep ? (
    <g className="eye-group">
      <path d="M 32 46 Q 39 40 46 46" stroke="#1C0806" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M 54 46 Q 61 40 68 46" stroke="#1C0806" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <line x1="32" y1="46" x2="30" y2="50" stroke="#1C0806" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="46" y1="46" x2="48" y2="50" stroke="#1C0806" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="54" y1="46" x2="52" y2="50" stroke="#1C0806" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="68" y1="46" x2="70" y2="50" stroke="#1C0806" strokeWidth="1.3" strokeLinecap="round"/>
    </g>
  ) : isExcited ? (
    <g className="eye-group">
      <text x="39" y="51" fontSize="13" textAnchor="middle" fill="#F97316" fontFamily="sans-serif" fontWeight="900">★</text>
      <text x="61" y="51" fontSize="13" textAnchor="middle" fill="#F97316" fontFamily="sans-serif" fontWeight="900">★</text>
    </g>
  ) : isHappy ? (
    <g className="eye-group">
      <path d="M 32 48 Q 39 42 46 48" stroke="#1C0806" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M 54 48 Q 61 42 68 48" stroke="#1C0806" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <line x1="32" y1="48" x2="30" y2="51.5" stroke="#1C0806" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="46" y1="48" x2="48" y2="51.5" stroke="#1C0806" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="54" y1="48" x2="52" y2="51.5" stroke="#1C0806" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="68" y1="48" x2="70" y2="51.5" stroke="#1C0806" strokeWidth="1.2" strokeLinecap="round"/>
    </g>
  ) : (
    <g className="eye-group">
      <ellipse cx="39" cy="45" rx="6.8" ry="6.4" fill="#1C0806"/>
      <ellipse cx="37.2" cy="42.8" rx="2.6" ry="2.4" fill="white" opacity="0.9"/>
      <circle  cx="41.2" cy="47.4" r="1.1" fill="white" opacity="0.38"/>
      <ellipse cx="61" cy="45" rx="6.8" ry="6.4" fill="#1C0806"/>
      <ellipse cx="59.2" cy="42.8" rx="2.6" ry="2.4" fill="white" opacity="0.9"/>
      <circle  cx="63.2" cy="47.4" r="1.1" fill="white" opacity="0.38"/>
    </g>
  );

  const mouth = isSleep ? (
    <path d="M 47 56 Q 50 58 53 56" stroke="#1C0806" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  ) : isHappy || isExcited ? (
    <path d="M 43 56 Q 50 63 57 56" stroke="#1C0806" strokeWidth="2" fill="none" strokeLinecap="round"/>
  ) : (
    <path d="M 45 56 Q 50 61.5 55 56" stroke="#1C0806" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  );

  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className="swappy-svg" overflow="visible">
      <defs>
        <radialGradient id="sg-body" cx="36%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#FFAD48"/><stop offset="100%" stopColor="#D85C06"/>
        </radialGradient>
        <radialGradient id="sg-head" cx="38%" cy="30%" r="66%">
          <stop offset="0%" stopColor="#FFB84C"/><stop offset="100%" stopColor="#E16210"/>
        </radialGradient>
        <linearGradient id="sg-iris" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C8D4"/>
          <stop offset="25%" stopColor="#7C3AED"/>
          <stop offset="50%" stopColor="#2563EB"/>
          <stop offset="75%" stopColor="#06B6D4"/>
          <stop offset="100%" stopColor="#8B5CF6"/>
        </linearGradient>
        <filter id="sg-drop" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#7B2C00" floodOpacity="0.18"/>
        </filter>
      </defs>

      {/* Tail */}
      <g className="tail-group">
        <path d="M 33 92 C 10 83 -6 60 2 38 C 6 25 18 20 21 32 C 25 46 28 68 35 84 Z"
              fill="#E07018" stroke="#B34800" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M 6 54 Q 2 60 1 68" stroke="#C05C10" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.7"/>
        <ellipse cx="10" cy="30" rx="15.5" ry="12" fill="#FFF7E8" stroke="#E8D0A0" strokeWidth="1.2" transform="rotate(-24 10 30)"/>
        <ellipse cx="8.5" cy="29" rx="11.5" ry="8.8" fill="white" transform="rotate(-24 8.5 29)"/>
        <ellipse cx="7" cy="27.5" rx="7" ry="5.5" fill="white" opacity="0.7" transform="rotate(-24 7 27.5)"/>
      </g>

      {/* Body */}
      <ellipse cx="50" cy="91" rx="21" ry="23" fill="url(#sg-body)" stroke="#B34800" strokeWidth="1.8" filter="url(#sg-drop)"/>
      <ellipse cx="50" cy="94" rx="13" ry="16" fill="#F5E6CC" opacity="0.96"/>

      {/* Left arm */}
      <ellipse cx="30" cy="88" rx="9" ry="6.5" fill="#D86008" stroke="#B34800" strokeWidth="1.6" transform="rotate(-32 30 88)"/>
      <ellipse cx="26" cy="93" rx="7" ry="4.5" fill="#F5E6CC" transform="rotate(-32 26 93)"/>

      {/* Bag strap */}
      <path d="M 42 67 Q 55 72 64 83" stroke="#0A1E5E" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      <path d="M 42 67 Q 55 72 64 83" stroke="#1E3A8A" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

      {/* Head */}
      <circle cx="50" cy="40" r="30" fill="url(#sg-head)" stroke="#B34800" strokeWidth="1.8"/>

      {/* Ears */}
      <path d="M 19 23 L 12 -2 L 38 17" fill="#D86008" stroke="#B34800" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M 21 21 L 16  7 L 35 18" fill="#F5E6CC"/>
      <path d="M 81 23 L 88 -2 L 62 17" fill="#D86008" stroke="#B34800" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M 79 21 L 84  7 L 65 18" fill="#F5E6CC"/>

      {/* Muzzle */}
      <ellipse cx="50" cy="51.5" rx="15.5" ry="11" fill="#F5E6CC"/>

      {eyes}

      {/* Nose */}
      <ellipse cx="50" cy="50" rx="3.6" ry="2.6" fill="#1C0806"/>
      <ellipse cx="49" cy="49.2" rx="1.2" ry="0.8" fill="white" opacity="0.36"/>

      {mouth}

      {/* Cheeks */}
      <ellipse cx="34" cy="52" rx="6.5" ry="4.5" fill="#FF9999" opacity={isHappy || isExcited ? 0.65 : 0.42} className="cheek-group"/>
      <ellipse cx="66" cy="52" rx="6.5" ry="4.5" fill="#FF9999" opacity={isHappy || isExcited ? 0.65 : 0.42} className="cheek-group"/>

      {/* Bag */}
      <rect x="61" y="82" width="17" height="16" rx="3.5" fill="#1E3A8A" stroke="#0A1E5E" strokeWidth="1.5"/>
      <rect x="63" y="84" width="13" height="8.5" rx="2" fill="#2B4FC0"/>
      <rect x="64" y="85" width="5.5" height="2.5" rx="1.2" fill="#6B8FFF" opacity="0.55"/>
      <line x1="61" y1="90.5" x2="78" y2="90.5" stroke="#0A1E5E" strokeWidth="1"/>
      <rect x="61" y="90.5" width="17" height="7.5" rx="3.5" fill="url(#sg-iris)" className="iridescent-strip" opacity="0.92"/>
      <rect x="65.5" y="88.5" width="7" height="4" rx="2" fill="#7AA8FF"/>
      <rect x="67" y="89.8" width="4" height="1.5" rx="0.8" fill="#4D7FEF"/>

      {/* Right arm */}
      <ellipse cx="69" cy="86" rx="9" ry="6.5" fill="#D86008" stroke="#B34800" strokeWidth="1.6" transform="rotate(26 69 86)"/>
      <ellipse cx="74" cy="91" rx="7" ry="4.5" fill="#F5E6CC" transform="rotate(26 74 91)"/>

      {/* Feet */}
      <ellipse cx="40" cy="112" rx="11.5" ry="7" fill="#D86008" stroke="#B34800" strokeWidth="1.6"/>
      <ellipse cx="38" cy="113" rx="8" ry="4.5" fill="#F5E6CC"/>
      <ellipse cx="62" cy="112" rx="11.5" ry="7" fill="#D86008" stroke="#B34800" strokeWidth="1.6"/>
      <ellipse cx="60" cy="113" rx="8" ry="4.5" fill="#F5E6CC"/>

      {/* Head gloss */}
      <ellipse cx="38" cy="26" rx="8" ry="5" fill="white" opacity="0.12" transform="rotate(-35 38 26)"/>
    </svg>
  );
}

/* ── ChatBubble ── */
const QUICK_REPLIES = ['How do I swap?', 'What are ranks?', 'Is it free?', 'Show workshops'];
const GREETING = "Hey! I'm Swappy 🦊 Your Swappi buddy! Ask me anything!";

function ChatBubble({ onClose, xPos }) {
  const [messages, setMessages] = useState([{ from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 120); }, []);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: mascotReply(trimmed) }]);
    }, 600 + Math.random() * 400);
  };

  const flipRight = xPos > window.innerWidth - 200;

  return (
    <div className="swappy-chat-bubble"
         style={flipRight ? { left: 'auto', right: '50%', transform: 'translateX(50%)' } : {}}
         onClick={e => e.stopPropagation()}>
      <div className="swappy-chat-header">
        <div className="swappy-chat-header-title">💬 Ask Swappy</div>
        <button className="swappy-chat-close" onClick={onClose}>✕</button>
      </div>
      <div className="swappy-chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`swappy-msg swappy-msg-${m.from}`}>{m.text}</div>
        ))}
        {typing && <div className="swappy-typing"><span/><span/><span/></div>}
        <div ref={endRef}/>
      </div>
      <div className="swappy-quick-replies">
        {QUICK_REPLIES.map(q => (
          <button key={q} className="swappy-quick-btn" onClick={() => sendMessage(q)}>{q}</button>
        ))}
      </div>
      <div className="swappy-chat-input-row">
        <input ref={inputRef} className="swappy-chat-input" placeholder="Ask me anything…"
               value={input} onChange={e => setInput(e.target.value)}
               onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); }}}
               maxLength={200}/>
        <button className="swappy-chat-send" onClick={() => sendMessage()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Mascot (main component) ── */
function getVisibleWidgets() {
  return Array.from(document.querySelectorAll(WIDGET_SEL))
    .map(el => ({ el, rect: el.getBoundingClientRect() }))
    .filter(({ rect }) => rect.width > 80 && rect.height > 60 && rect.top > 60 && rect.top < window.innerHeight - 40);
}

const Mascot = ({ currentPage = 'home' }) => {
  const [vis,           setVis]        = useState('idle');
  const [dir,           setDir]        = useState(1);
  const [chatOpen,      setChatOpen]   = useState(false);
  const [foxVisible,    setFoxVisible] = useState(() => {
    try { return localStorage.getItem('swappy_visible') !== 'false'; } catch { return true; }
  });
  const [autoBubble,    setAutoBubble]    = useState(null);
  const [bubbleFadeOut, setBubbleFadeOut] = useState(false);

  const xRef             = useRef(120);
  const yRef             = useRef(0);
  const yTargetRef       = useRef(0);
  const speedRef         = useRef(1.6);
  const dirRef           = useRef(1);
  const moveTimerRef     = useRef(null);
  const jumpTimerRef     = useRef(null);
  const sleepTimerRef    = useRef(null);
  const scrollTimerRef   = useRef(null);
  const bubbleTimerRef   = useRef(null);
  const elRef            = useRef(null);
  const chatOpenRef      = useRef(false);
  const walkingToRef     = useRef(false);
  const onWidgetRef      = useRef(false);
  const currentWidgetRef = useRef(null);
  const syncYIntervalRef = useRef(null);
  const visRef           = useRef('idle');
  const tickRef          = useRef(null);
  const prevPageRef      = useRef(null);
  const scheduleDecisionRef = useRef(null);

  useEffect(() => { chatOpenRef.current = chatOpen; }, [chatOpen]);
  useEffect(() => { visRef.current = vis; },           [vis]);
  useEffect(() => { dirRef.current = dir; },           [dir]);

  const applyPos = useCallback(() => {
    if (elRef.current) {
      elRef.current.style.left   = `${xRef.current}px`;
      elRef.current.style.bottom = `${yRef.current}px`;
    }
  }, []);

  const showBubble = useCallback((text, duration = 2500) => {
    clearTimeout(bubbleTimerRef.current);
    setBubbleFadeOut(false);
    setAutoBubble(text);
    bubbleTimerRef.current = setTimeout(() => {
      setBubbleFadeOut(true);
      setTimeout(() => setAutoBubble(null), 380);
    }, duration);
  }, []);

  const dismissFox = (e) => {
    e.stopPropagation();
    setFoxVisible(false);
    setChatOpen(false);
    try { localStorage.setItem('swappy_visible', 'false'); } catch {}
  };
  const reviveFox = () => {
    setFoxVisible(true);
    try { localStorage.setItem('swappy_visible', 'true'); } catch {}
    setTimeout(() => showBubble("I'm back! 🦊 Miss me?"), 400);
  };

  const walkToX = useCallback((tx) => {
    if (!elRef.current) return;
    const clamped = Math.max(MARGIN, Math.min(window.innerWidth - FOX_W - MARGIN, tx));
    walkingToRef.current = true;
    setDir(clamped > xRef.current ? 1 : -1);
    setVis('walk');
    elRef.current.style.transition = 'left 1.5s cubic-bezier(0.16,1,0.3,1)';
    elRef.current.style.left = `${clamped}px`;
    xRef.current = clamped;
    setTimeout(() => { if (elRef.current) elRef.current.style.transition = ''; walkingToRef.current = false; }, 1600);
  }, []);

  const doJump = useCallback(() => {
    if (chatOpenRef.current || walkingToRef.current) return;
    setVis('jump');
    clearTimeout(moveTimerRef.current);
    moveTimerRef.current = setTimeout(() => { setVis('idle'); scheduleDecisionRef.current?.(); }, 950);
  }, []);

  const startWalking = useCallback(() => {
    if (chatOpenRef.current || walkingToRef.current) return;
    const newDir = Math.random() > 0.5 ? 1 : -1;
    speedRef.current = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    yTargetRef.current = 0;
    setDir(newDir);
    setVis('walk');
    clearTimeout(moveTimerRef.current);
    moveTimerRef.current = setTimeout(() => { setVis('idle'); scheduleDecisionRef.current?.(); },
      WALK_MIN + Math.random() * (WALK_MAX - WALK_MIN));
  }, []);

  const jumpToWidget = useCallback(() => {
    const candidates = getVisibleWidgets();
    if (!candidates.length) { scheduleDecisionRef.current?.(); return; }
    const chosen = pickRandom(candidates);
    const el = chosen.el;
    const getCardY = () => {
      const r = el.getBoundingClientRect();
      return Math.min(window.innerHeight * 0.55, window.innerHeight - r.top + 2);
    };
    const rect    = chosen.rect;
    const targetX = Math.max(MARGIN, Math.min(window.innerWidth - FOX_W - MARGIN, rect.left + rect.width / 2 - FOX_W / 2));
    clearTimeout(moveTimerRef.current);
    clearInterval(syncYIntervalRef.current);
    yTargetRef.current = getCardY();
    walkToX(targetX);
    moveTimerRef.current = setTimeout(() => {
      if (chatOpenRef.current) { scheduleDecisionRef.current?.(); return; }
      onWidgetRef.current      = true;
      currentWidgetRef.current = el;
      setVis('sit');
      showBubble(pickRandom(SIT_MESSAGES), 3200);
      syncYIntervalRef.current = setInterval(() => {
        if (!onWidgetRef.current) { clearInterval(syncYIntervalRef.current); return; }
        yTargetRef.current = getCardY();
      }, 160);
      const walkTimer = setTimeout(() => {
        if (!onWidgetRef.current) return;
        const freshRect = el.getBoundingClientRect();
        const minX = freshRect.left + MARGIN;
        const maxX = freshRect.right - FOX_W - MARGIN;
        const walkDir = Math.random() > 0.5 ? 1 : -1;
        const newX = Math.max(minX, Math.min(maxX, xRef.current + walkDir * (20 + Math.random() * 30)));
        setVis('walk');
        walkToX(newX);
        setTimeout(() => { if (onWidgetRef.current) setVis('sit'); }, 1500);
      }, 1200);
      const sitDuration = 3000 + Math.random() * 2000;
      moveTimerRef.current = setTimeout(() => {
        clearInterval(syncYIntervalRef.current);
        clearTimeout(walkTimer);
        onWidgetRef.current      = false;
        currentWidgetRef.current = null;
        yTargetRef.current       = 0;
        setVis('jump');
        moveTimerRef.current = setTimeout(() => { setVis('idle'); scheduleDecisionRef.current?.(); }, 850);
      }, sitDuration);
    }, 1900);
  }, [walkToX, showBubble]);

  const scheduleDecision = useCallback(() => {
    clearTimeout(moveTimerRef.current);
    if (walkingToRef.current) return;
    const delay = IDLE_MIN + Math.random() * (IDLE_MAX - IDLE_MIN);
    moveTimerRef.current = setTimeout(() => {
      if (chatOpenRef.current || walkingToRef.current) { scheduleDecision(); return; }
      const roll = Math.random();
      if      (roll < 0.18) doJump();
      else if (roll < 0.52) jumpToWidget();
      else                  startWalking();
    }, delay);
  }, [doJump, jumpToWidget, startWalking]);

  useEffect(() => { scheduleDecisionRef.current = scheduleDecision; }, [scheduleDecision]);

  const resetSleep = useCallback(() => {
    clearTimeout(sleepTimerRef.current);
    sleepTimerRef.current = setTimeout(() => {
      if (!chatOpenRef.current) { setVis('sleep'); yTargetRef.current = 0; }
    }, SLEEP_AFTER);
  }, []);

  /* rAF loop */
  useEffect(() => {
    let rafId;
    const step = () => { tickRef.current?.(); rafId = requestAnimationFrame(step); };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  tickRef.current = () => {
    let changed = false;
    if (visRef.current === 'walk' && !walkingToRef.current) {
      const maxX = window.innerWidth - FOX_W - MARGIN;
      let nx = xRef.current + dirRef.current * speedRef.current;
      if (nx < MARGIN) { nx = MARGIN; dirRef.current = 1; }
      if (nx > maxX)   { nx = maxX;   dirRef.current = -1; }
      xRef.current = nx;
      changed = true;
    }
    const dy = yTargetRef.current - yRef.current;
    if (Math.abs(dy) > 0.3) { yRef.current += dy * Y_SPRING; changed = true; }
    if (changed) applyPos();
  };

  /* Spontaneous jump timer */
  useEffect(() => {
    const schedule = () => {
      jumpTimerRef.current = setTimeout(() => {
        if (!chatOpenRef.current && !walkingToRef.current && visRef.current !== 'jump') doJump();
        schedule();
      }, JUMP_EVERY[0] + Math.random() * (JUMP_EVERY[1] - JUMP_EVERY[0]));
    };
    schedule();
    return () => clearTimeout(jumpTimerRef.current);
  }, [doJump]);

  /* Scroll detection */
  useEffect(() => {
    let isScrolling = false;
    const onScroll = () => {
      if (chatOpenRef.current) return;
      resetSleep();
      if (!isScrolling) {
        isScrolling = true;
        if (onWidgetRef.current) { onWidgetRef.current = false; yTargetRef.current = 0; }
        if (visRef.current !== 'walk' && visRef.current !== 'jump') {
          yTargetRef.current = 0;
          setVis('walk');
          setDir(xRef.current < window.innerWidth / 2 ? 1 : -1);
        }
      }
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isScrolling = false;
        if (!chatOpenRef.current) {
          setVis('idle');
          if (Math.random() < 0.35) showBubble(pickRandom(SCROLL_HELP), 2500);
          scheduleDecisionRef.current?.();
        }
      }, 4000);
    };
    window.addEventListener('scroll',    onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('touchmove', onScroll); clearTimeout(scrollTimerRef.current); };
  }, [showBubble, resetSleep]);

  /* Bootstrap */
  useEffect(() => {
    xRef.current = MARGIN + Math.random() * (window.innerWidth * 0.45);
    yRef.current = 0;
    applyPos();
    scheduleDecisionRef.current?.();
    resetSleep();
    const wake = () => {
      if (visRef.current === 'sleep') { setVis('idle'); scheduleDecisionRef.current?.(); }
      resetSleep();
    };
    window.addEventListener('mousemove',  wake, { passive: true });
    window.addEventListener('touchstart', wake, { passive: true });
    return () => {
      clearTimeout(moveTimerRef.current);
      clearTimeout(jumpTimerRef.current);
      clearTimeout(sleepTimerRef.current);
      clearTimeout(scrollTimerRef.current);
      clearTimeout(bubbleTimerRef.current);
      clearInterval(syncYIntervalRef.current);
      window.removeEventListener('mousemove',  wake);
      window.removeEventListener('touchstart', wake);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => scheduleDecisionRef.current?.(), 800);
    return () => clearTimeout(t);
  }, []);

  /* Page greeting */
  useEffect(() => {
    if (!foxVisible) return;
    if (prevPageRef.current === currentPage) return;
    prevPageRef.current = currentPage;
    const msgs = PAGE_GREETINGS[currentPage];
    if (!msgs) return;
    const t = setTimeout(() => {
      if (!chatOpenRef.current && Math.random() < 0.5) showBubble(pickRandom(msgs));
    }, 3500);
    return () => clearTimeout(t);
  }, [currentPage, foxVisible, showBubble]);

  /* Widget event listener */
  useEffect(() => {
    const handler = (e) => {
      if (!foxVisible) return;
      const { type, message, targetX } = e.detail || {};
      const msgs = WIDGET_REACTIONS[type] || [];
      const text = message || (msgs.length ? pickRandom(msgs) : null);
      clearTimeout(moveTimerRef.current);
      if (onWidgetRef.current) { onWidgetRef.current = false; yTargetRef.current = 0; }
      if (targetX != null) walkToX(targetX - FOX_W / 2);
      const doReact = () => {
        setVis('excited');
        if (text) showBubble(text, 4800);
        setTimeout(() => { setVis('idle'); scheduleDecisionRef.current?.(); }, 1300);
      };
      setTimeout(doReact, targetX != null ? 1700 : 0);
    };
    window.addEventListener('swappy', handler);
    return () => window.removeEventListener('swappy', handler);
  }, [foxVisible, showBubble, walkToX]);

  /* Click handler */
  const handleClick = (e) => {
    e.stopPropagation();
    resetSleep();
    if (onWidgetRef.current) { onWidgetRef.current = false; yTargetRef.current = 0; }
    if (vis === 'sleep') { setVis('idle'); scheduleDecisionRef.current?.(); return; }
    if (chatOpen) { setChatOpen(false); setVis('idle'); scheduleDecisionRef.current?.(); return; }
    clearTimeout(moveTimerRef.current);
    setVis('excited');
    setChatOpen(true);
    setAutoBubble(null);
    setTimeout(() => setVis('chat'), 900);
  };

  const closeChat = () => { setChatOpen(false); setVis('idle'); scheduleDecisionRef.current?.(); resetSleep(); };

  if (!foxVisible) {
    return (
      <button className="swappy-revive-btn" onClick={reviveFox} title="Bring back Swappy 🦊">🐾</button>
    );
  }

  const foxIsHigh = yRef.current > window.innerHeight * 0.3;

  return (
    <div
      ref={elRef}
      className={`swappy-wrapper state-${vis} facing-${dir > 0 ? 'right' : 'left'}${foxIsHigh ? ' bubble-below' : ''}`}
      style={{ left: `${xRef.current}px`, bottom: `${yRef.current}px` }}
    >
      <button className="swappy-dismiss-btn" onClick={dismissFox} title="Hide Swappy">×</button>

      {autoBubble && !chatOpen && (
        <div className={`swappy-auto-bubble${bubbleFadeOut ? ' fade-out' : ''}`}>{autoBubble}</div>
      )}

      {chatOpen && <ChatBubble onClose={closeChat} xPos={xRef.current}/>}

      {vis === 'sleep' && (
        <div className="swappy-zzz"><span>z</span><span>z</span><span>Z</span></div>
      )}
      {vis === 'excited' && (
        <div className="swappy-stars">
          <span className="swappy-star">⭐</span>
          <span className="swappy-star">✨</span>
          <span className="swappy-star">🌟</span>
        </div>
      )}
      {vis === 'sit' && (
        <div className="swappy-sit-sparkles"><span>✦</span><span>·</span><span>✦</span></div>
      )}

      <div className="swappy-flip" onClick={handleClick} role="button"
           aria-label={vis === 'sleep' ? 'Wake Swappy up' : 'Chat with Swappy'}
           style={{ cursor: 'pointer' }}>
        <div className="swappy-bounce">
          <MascotSVG state={vis}/>
        </div>
      </div>

      <div className="swappy-shadow"/>
    </div>
  );
};

window.Mascot = Mascot;
