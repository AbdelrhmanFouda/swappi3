/* =========================================================
   SWAPPI — mock data
   ========================================================= */

window.SWAPPI = (() => {
  const skills = [
    { id: 1, title: "Conversational Arabic — Egyptian Dialect", cat: "Language", catColor: "orange",
      provider: "Yasmin H.", initials: "YH", price: 180, swap: "Web design", rating: 4.9, reviews: 142, mode: "Online · 1:1",
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 2, title: "Film photography on a budget", cat: "Creative", catColor: "blue",
      provider: "Karim S.", initials: "KS", price: 200, swap: "Excel modeling", rating: 4.8, reviews: 88, mode: "In-person · Cairo",
      img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 3, title: "Build your first Figma plugin", cat: "Tech", catColor: "blue",
      provider: "Mara T.", initials: "MT", price: 250, swap: "Anything design", rating: 5.0, reviews: 64, mode: "Online · Small group",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 4, title: "Pottery wheel — beginner basics", cat: "Craft", catColor: "orange",
      provider: "Omar L.", initials: "OL", price: 175, swap: "Cooking lessons", rating: 4.7, reviews: 211, mode: "In-person · Studio",
      img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 5, title: "Public speaking that doesn't feel fake", cat: "Career", catColor: "blue",
      provider: "Reem A.", initials: "RA", price: 280, swap: null, rating: 4.9, reviews: 173, mode: "Online · 1:1",
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 6, title: "Bread-baking from scratch", cat: "Cooking", catColor: "orange",
      provider: "Hana M.", initials: "HM", price: 150, swap: "Yoga", rating: 4.8, reviews: 96, mode: "In-person · Kitchen",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 7, title: "Intro to product strategy", cat: "Career", catColor: "blue",
      provider: "Dina F.", initials: "DF", price: 300, swap: "Copywriting", rating: 4.9, reviews: 58, mode: "Online · 1:1",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 8, title: "Watercolor portraits", cat: "Creative", catColor: "orange",
      provider: "Nour B.", initials: "NB", price: 190, swap: "Spanish lessons", rating: 4.7, reviews: 124, mode: "In-person · Studio",
      img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 9, title: "SQL for analysts who hate SQL", cat: "Tech", catColor: "blue",
      provider: "Sami R.", initials: "SR", price: 230, swap: "Marketing", rating: 4.8, reviews: 41, mode: "Online · Small group",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 10, title: "Mindful running, no garmin needed", cat: "Wellness", catColor: "orange",
      provider: "Lina K.", initials: "LK", price: 160, swap: "French lessons", rating: 4.9, reviews: 187, mode: "In-person · Park",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 11, title: "Pitch decks that land funding", cat: "Career", catColor: "blue",
      provider: "Tarek Z.", initials: "TZ", price: 300, swap: null, rating: 5.0, reviews: 36, mode: "Online · 1:1",
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=450&q=80&auto=format&fit=crop" },
    { id: 12, title: "Beginner DJ — Ableton & beatmatching", cat: "Music", catColor: "orange",
      provider: "Adam P.", initials: "AP", price: 220, swap: "Video editing", rating: 4.8, reviews: 72, mode: "In-person · Studio",
      img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=450&q=80&auto=format&fit=crop" },
  ];

  const providers = [
    { name: "Yasmin Hafez", initials: "YH", title: "Arabic teacher & translator", swaps: 312, rating: 4.9, badge: "Top rated", color: "orange" },
    { name: "Karim Saad", initials: "KS", title: "Film photographer", swaps: 178, rating: 4.8, badge: "Rising", color: "blue" },
    { name: "Mara Tawfik", initials: "MT", title: "Senior product designer", swaps: 256, rating: 5.0, badge: "Top rated", color: "blue" },
    { name: "Reem Abdou", initials: "RA", title: "Speaking coach", swaps: 401, rating: 4.9, badge: "Top rated", color: "orange" },
  ];

  const reviews = [
    { name: "Salma A.", initials: "SA", rating: 5, days: 4,
      quote: "I'd been putting off learning Arabic for years. Two weeks with Yasmin and I'm actually texting my mom in Arabic. She made it feel like a conversation, not a class." },
    { name: "James O.", initials: "JO", rating: 5, days: 11,
      quote: "Swapped my web design help for Arabic lessons. The match made sense from minute one — we just got each other. This is what skill exchange should feel like." },
    { name: "Priya R.", initials: "PR", rating: 5, days: 23,
      quote: "Patient, generous, and clearly cares. I came in nervous and left with a study plan I'm actually following." },
    { name: "Tomek W.", initials: "TW", rating: 4, days: 41,
      quote: "Great teacher — only thing is the time zones took some figuring out. Once we landed on Sundays, it clicked." },
  ];

  const categories = [
    "All", "Language", "Tech", "Creative", "Career", "Cooking", "Craft", "Wellness", "Music"
  ];

  const steps = [
    { n: "01", title: "Tell us what you know", body: "List the skills you'd love to teach — formally trained or just self-taught. Five minutes, no resume required." },
    { n: "02", title: "Tell us what you want", body: "Pick what you're hungry to learn. We match you with people whose skills line up with yours." },
    { n: "03", title: "Meet your match", body: "Browse mutual matches or pay-only sessions. Read reviews, see availability, book in a tap." },
    { n: "04", title: "Trade & grow", body: "Meet online or in person. Rate each other after. The more you swap, the better your matches get." },
  ];

  const trustPillars = [
    { stat: "12,400+", label: "Verified members", body: "Every profile is ID-verified before they can teach or swap." },
    { stat: "98%", label: "Sessions rated 4★+", body: "Real reviews from real swaps. We don't let people game it." },
    { stat: "<2hr", label: "Avg. match response", body: "Most messages get a reply the same morning. Real humans, not bots." },
    { stat: "0₪", label: "Cost to start", body: "Free forever to browse, swap, and meet. We only charge for premium tooling." },
  ];

  const sessions = [
    { day: "TUE", date: "12", time: "6:00 PM", title: "Arabic conversation — week 3", with: "Yasmin H.", initials: "YH", mode: "Online", status: "confirmed" },
    { day: "THU", date: "14", time: "7:30 PM", title: "Watercolor portraits — fundamentals", with: "Nour B.", initials: "NB", mode: "Studio · Zamalek", status: "confirmed" },
    { day: "SAT", date: "16", time: "10:00 AM", title: "Public speaking — practice run", with: "Reem A.", initials: "RA", mode: "Online", status: "pending" },
  ];

  const activity = [
    { who: "Yasmin H.", initials: "YH", action: "left you a 5★ review", when: "2h ago", color: "orange" },
    { who: "Karim S.", initials: "KS", action: "accepted your swap proposal", when: "5h ago", color: "blue" },
    { who: "Reem A.", initials: "RA", action: "sent a message", when: "yesterday", color: "orange" },
    { who: "System", initials: "SW", action: "your profile was verified ✓", when: "2 days ago", color: "blue" },
  ];

  const workshops = [
    { title: "Cairo Sketch Crawl", host: "Nour B.", date: "Sat, May 18", time: "10am–1pm", seats: 12, taken: 9, price: 150, location: "Downtown Cairo",
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&h=420&q=80&auto=format&fit=crop" },
    { title: "Intro to Sourdough", host: "Hana M.", date: "Sun, May 19", time: "9am–12pm", seats: 8, taken: 6, price: 180, location: "Maadi Kitchen Co-op",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&h=420&q=80&auto=format&fit=crop" },
    { title: "Negotiation for Designers", host: "Dina F.", date: "Wed, May 22", time: "7pm–9pm", seats: 30, taken: 14, price: 160, location: "Online",
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&h=420&q=80&auto=format&fit=crop" },
    { title: "Vinyl DJ basics", host: "Adam P.", date: "Fri, May 24", time: "8pm–11pm", seats: 10, taken: 7, price: 250, location: "Garden City Studio",
      img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700&h=420&q=80&auto=format&fit=crop" },
    { title: "Pitch your side project", host: "Tarek Z.", date: "Sat, May 25", time: "2pm–5pm", seats: 20, taken: 11, price: 200, location: "Online",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=420&q=80&auto=format&fit=crop" },
    { title: "Pottery for total beginners", host: "Omar L.", date: "Sun, May 26", time: "11am–2pm", seats: 6, taken: 5, price: 220, location: "Heliopolis Studio",
      img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=700&h=420&q=80&auto=format&fit=crop" },
  ];

  const partners = [
    "GUC", "AUC", "Flat6Labs", "Instabug", "Vezeeta", "Swvl", "Rabbit", "MoneyFellows", "Trella", "Almentor"
  ];

  // ── Registered accounts ────────────────────────────────────────
  const users = {
    "aleyasalemm@gmail.com": {
      name: "Aleya Salem",
      initials: "AS",
      email: "aleyasalemm@gmail.com",
      password: "2003",
      color: "blue",
      memberSince: "Jan '25",
      swaps: 22,
      rating: 4.9,
      streak: "8w",
      verified: true,
      bio: "Digital illustrator and French tutor based in Cairo. I believe learning should feel like discovery, not work.",
      location: "Cairo, Egypt",
      skills: [
        { id:101, title:"Digital illustration — iPad & Procreate", cat:"Creative", catColor:"blue",
          provider:"Aleya S.", initials:"AS", price:210, swap:"Arabic lessons", rating:4.9, reviews:34, mode:"Online · 1:1",
          img:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=450&q=80&auto=format&fit=crop" },
        { id:102, title:"French for complete beginners", cat:"Language", catColor:"orange",
          provider:"Aleya S.", initials:"AS", price:175, swap:"Photography tips", rating:5.0, reviews:18, mode:"Online · 1:1",
          img:"https://images.unsplash.com/photo-1549737221-bef65e2604a6?w=600&h=450&q=80&auto=format&fit=crop" },
      ],
      sessions: [
        { day:"WED", date:"28", time:"7:00 PM",  title:"Arabic conversation — session 5",  with:"Yasmin H.", initials:"YH", mode:"Online",              status:"confirmed" },
        { day:"SAT", date:"31", time:"11:00 AM", title:"Pottery wheel basics",              with:"Omar L.",   initials:"OL", mode:"Studio · Heliopolis", status:"confirmed" },
        { day:"TUE", date:"3",  time:"6:30 PM",  title:"Film photography walk",             with:"Karim S.",  initials:"KS", mode:"In-person · Zamalek", status:"pending"   },
      ],
      pastSessions: [
        { day:"MON", date:"19", time:"6:00 PM",  title:"Digital illustration — session 4", with:"Nour B.",  initials:"NB", mode:"Online", status:"completed" },
        { day:"FRI", date:"15", time:"7:30 PM",  title:"French — session 8",               with:"Sara K.",  initials:"SK", mode:"Online", status:"completed" },
        { day:"MON", date:"11", time:"10:00 AM", title:"Procreate brushes masterclass",    with:"Mia L.",   initials:"ML", mode:"Online", status:"completed" },
      ],
      activity: [
        { who:"Nour B.",   initials:"NB", action:"left you a 5★ review",          when:"1h ago",     color:"orange" },
        { who:"Yasmin H.", initials:"YH", action:"confirmed your booking for Wed", when:"3h ago",     color:"orange" },
        { who:"Karim S.",  initials:"KS", action:"accepted your swap proposal",    when:"yesterday",  color:"blue"   },
        { who:"System",    initials:"SW", action:"you reached Master rank 👑",      when:"3 days ago", color:"blue"   },
      ],
      messages: [
        ["Yasmin H.","YH","Excited for Wednesday! Bring the article.","5m","orange"],
        ["Omar L.",  "OL","Studio confirmed for the 31st — see you then!","2h","blue"],
        ["Karim S.", "KS","Zamalek walk sounds perfect. Saturday?","Yesterday","blue"],
      ],
      earnings: {
        thisMonth:"1,200", thisMonthDelta:"+340 EGP vs last",
        allTime:"8,400",   allTimeDelta:"since Jan '25",
        avgSession:"120",  sessionCount:"34 sessions",
        payouts:[
          { date:"May 1, 2026",  sessions:6, amount:"1,200", status:"paid"    },
          { date:"Apr 1, 2026",  sessions:5, amount:"860",   status:"paid"    },
          { date:"Mar 1, 2026",  sessions:4, amount:"780",   status:"paid"    },
          { date:"May 10, 2026", sessions:2, amount:"400",   status:"pending" },
        ],
      },
      overviewMetrics: {
        sessions:"8",        sessionsDelta:"+3 vs last",
        pending:"2",         pendingDelta:"1 to approve",
        earnings:"1,200 EGP",earningsDelta:"+340 EGP wk",
        views:"412",         viewsDelta:"+24% wk",
      },
    },
  };

  // ── Default profile for new / unknown logins ───────────────────
  const defaultNewUser = {
    name: "New Member",
    initials: "NM",
    email: "",
    color: "blue",
    memberSince: "May '26",
    swaps: 0,
    rating: null,
    streak: "0w",
    verified: false,
    bio: "",
    location: "",
    skills: [],
    sessions: [],
    pastSessions: [],
    activity: [
      { who:"System", initials:"SW", action:"welcome to Swappi 🎉 — add your first skill to get started!", when:"just now", color:"orange" },
    ],
    messages: [],
    earnings: {
      thisMonth:"0", thisMonthDelta:"—",
      allTime:"0",   allTimeDelta:"get started",
      avgSession:"0",sessionCount:"0 sessions",
      payouts:[],
    },
    overviewMetrics: {
      sessions:"0",  sessionsDelta:"get started!",
      pending:"0",   pendingDelta:"—",
      earnings:"0 EGP", earningsDelta:"—",
      views:"0",     viewsDelta:"—",
    },
  };

  return { skills, providers, reviews, categories, steps, trustPillars, sessions, activity, workshops, partners, users, defaultNewUser };
})();
