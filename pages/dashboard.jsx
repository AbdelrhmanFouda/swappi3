/* global React, SWAPPI, SwappiAtoms */
const { useState } = React;
const { Avatar, SkillCard } = window.SwappiAtoms;
const useIsMobile = window.useIsMobile || (() => false);

// ============================================================
//  DASHBOARD
// ============================================================

function DashboardPage({ setPage, onBook }) {
  const [section, setSection] = useState("overview");
  const isMobile = useIsMobile();

  const navItems = [
    ["overview", "Overview", "◎"],
    ["sessions", "Sessions", "☷"],
    ["messages", "Messages", "✉"],
    ["earnings", "Earnings", "$"],
    ["skills",   "My Skills","✎"],
    ["settings", "Settings", "⚙"],
  ];

  return (
    <main data-screen-label="Dashboard" style={{background:"var(--cream-2)", minHeight:"calc(100vh - 64px)"}}>
      <div style={{display:"grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", minHeight:"calc(100vh - 64px)"}}>

        {/* ── Sidebar (desktop only) ── */}
        {!isMobile && (
          <aside style={{background:"var(--paper)", borderRight:"1px solid var(--line)", padding:"32px 20px", position:"sticky", top:64, alignSelf:"flex-start", height:"calc(100vh - 64px)", overflowY:"auto"}}>
            <div className="card" style={{padding:16, background:"var(--cream-2)", border:"none"}}>
              <div className="row gap-12 center">
                <Avatar initials="YO" size="md" color="orange" verified />
                <div>
                  <div style={{fontSize:14, fontWeight:700}}>You</div>
                  <div style={{fontSize:11, color:"var(--ink-3)"}}>Member since '24</div>
                </div>
              </div>
              <div className="row gap-16" style={{marginTop:16, paddingTop:14, borderTop:"1px solid var(--line)"}}>
                <Mini label="Swaps" val="14" />
                <Mini label="Rating" val="4.8★" />
                <Mini label="Streak" val="6w" />
              </div>
            </div>
            <nav className="col gap-4" style={{marginTop:24}}>
              {navItems.map(([id, label, icon]) => (
                <button key={id} onClick={() => setSection(id)} style={{
                  background: section===id ? "var(--ink)" : "transparent",
                  color: section===id ? "var(--cream)" : "var(--ink-2)",
                  border:"none", textAlign:"left", padding:"10px 12px", borderRadius:10,
                  fontSize:14, fontWeight:600, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:10, transition:"background .15s, color .15s"
                }}>
                  <span style={{width:18, textAlign:"center", opacity:.7}}>{icon}</span>{label}
                  {id==="messages" && <span style={{marginLeft:"auto", background:"var(--orange)", color:"#fff", borderRadius:99, fontSize:10, fontWeight:700, padding:"1px 7px"}}>3</span>}
                </button>
              ))}
            </nav>
            <div style={{marginTop:24, padding:18, borderRadius:12, background:"linear-gradient(135deg, var(--orange-soft), var(--blue-soft))"}}>
              <div style={{fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-2)"}}>Upgrade</div>
              <div style={{fontFamily:"var(--f-serif)", fontSize:19, lineHeight:1.2, marginTop:8}}>Unlimited swaps with Pro</div>
              <button className="btn btn-sm btn-primary" style={{marginTop:14, width:"100%", justifyContent:"center"}} onClick={() => setPage("pricing")}>See Pro →</button>
            </div>
          </aside>
        )}

        {/* ── Mobile profile strip ── */}
        {isMobile && (
          <div style={{background:"var(--paper)", borderBottom:"1px solid var(--line)", padding:"14px 16px"}}>
            <div className="row gap-12 center">
              <Avatar initials="YO" size="md" color="orange" verified />
              <div style={{flex:1}}>
                <div style={{fontSize:15, fontWeight:700}}>You</div>
                <div style={{fontSize:12, color:"var(--ink-3)"}}>14 swaps · 4.8★ · 6-week streak</div>
              </div>
              <button className="btn btn-sm btn-primary" onClick={() => setPage("pricing")}>Go Pro</button>
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <section style={{padding: isMobile ? "20px 16px 110px" : "40px 48px", overflowY:"auto"}}>
          {section==="overview" && <OverviewSection  setPage={setPage} setSection={setSection} onBook={onBook} isMobile={isMobile}/>}
          {section==="sessions" && <SessionsSection  isMobile={isMobile}/>}
          {section==="messages" && <MessagesSection  isMobile={isMobile}/>}
          {section==="earnings" && <EarningsSection  isMobile={isMobile}/>}
          {section==="skills"   && <SkillsSection    onBook={onBook} setPage={setPage} isMobile={isMobile}/>}
          {section==="settings" && <SettingsSection  isMobile={isMobile}/>}
        </section>
      </div>

      {/* ── Mobile bottom tab bar ── */}
      {isMobile && (
        <nav style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:200,
          background:"var(--paper)", borderTop:"2px solid var(--line)",
          display:"flex", paddingBottom:"env(safe-area-inset-bottom, 6px)"
        }}>
          {navItems.map(([id, label, icon]) => (
            <button key={id} onClick={() => setSection(id)} style={{
              flex:1, display:"flex", flexDirection:"column", alignItems:"center",
              gap:2, padding:"9px 2px 6px", background:"none", border:"none",
              cursor:"pointer", fontSize:8.5, fontWeight:700, letterSpacing:".04em",
              textTransform:"uppercase", position:"relative",
              color: section===id ? "var(--orange)" : "var(--ink-4)",
              borderTop: section===id ? "2px solid var(--orange)" : "2px solid transparent",
              marginTop:-2
            }}>
              <span style={{fontSize:19, lineHeight:1}}>{icon}</span>
              {label.split(" ")[0]}
              {id==="messages" && (
                <span style={{position:"absolute", top:5, left:"50%", marginLeft:8,
                  background:"var(--orange)", color:"#fff", borderRadius:99,
                  fontSize:8, fontWeight:700, padding:"1px 5px", lineHeight:1.4}}>3</span>
              )}
            </button>
          ))}
        </nav>
      )}
    </main>
  );
}

// ── Overview ──────────────────────────────────────────────────
function OverviewSection({ setPage, setSection, onBook, isMobile }) {
  return (
    <>
      <div className="row mob-col between" style={{marginBottom:24, gap:12}}>
        <div>
          <span className="eyebrow">Good evening</span>
          <h1 className="display" style={{fontSize: isMobile ? 30 : 48, margin:"8px 0 0"}}>Welcome back, friend.</h1>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost" style={{fontSize:13}} onClick={() => {
            navigator.clipboard?.writeText(window.location.href).catch(()=>{});
            window.showToast("Invite link copied!", "🔗");
          }}>↗ Invite</button>
          <button className="btn btn-primary" style={{fontSize:13}} onClick={() => setPage("browse")}>Find a swap →</button>
        </div>
      </div>

      <div className="grid-4" style={{gap:12, marginBottom:24}}>
        <MetricCard label="Sessions this month" val="6"    delta="+2 vs last"  color="orange" onClick={() => setSection("sessions")}/>
        <MetricCard label="Pending requests"    val="3"    delta="2 to approve" color="blue"   onClick={() => setSection("sessions")}/>
        <MetricCard label="Earnings"            val="$540" delta="+$120 wk"    color="orange" onClick={() => setSection("earnings")}/>
        <MetricCard label="Profile views"       val="284"  delta="+18% wk"     color="blue" />
      </div>

      <div style={{display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.7fr 1fr", gap:20}}>
        <div className="card" style={{padding:0, overflow:"hidden"}}>
          <div style={{padding:"18px 20px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h2 style={{margin:0, fontSize:18, fontWeight:700}}>Upcoming sessions</h2>
            <button className="btn btn-sm btn-ghost" onClick={() => setSection("sessions")}>View all</button>
          </div>
          {SWAPPI.sessions.slice(0,3).map((s, i) => (
            <div key={i} className="row gap-12 center" style={{padding:"14px 20px", borderTop:i?"1px solid var(--line-soft)":"none"}}>
              <div style={{width:40, textAlign:"center", flexShrink:0}}>
                <div style={{fontSize:9, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".08em"}}>{s.day}</div>
                <div style={{fontSize:20, fontWeight:800}}>{s.date}</div>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{s.title}</div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>{s.time}</div>
              </div>
              <span className={"pill " + (s.status==="confirmed"?"pill-blue":"pill-orange")} style={{flexShrink:0}}>{s.status}</span>
            </div>
          ))}
        </div>

        <div className="card" style={{padding:0}}>
          <div style={{padding:"18px 20px", borderBottom:"1px solid var(--line)"}}>
            <h2 style={{margin:0, fontSize:18, fontWeight:700}}>Activity</h2>
          </div>
          {SWAPPI.activity.map((a, i) => (
            <div key={i} className="row gap-12 center" style={{padding:"14px 20px", borderTop:i?"1px solid var(--line-soft)":"none"}}>
              <Avatar initials={a.initials} size="sm" color={a.color}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13}}><strong>{a.who}</strong> <span style={{color:"var(--ink-3)"}}>{a.action}</span></div>
                <div style={{fontSize:11, color:"var(--ink-4)"}}>{a.when}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap:20, marginTop:20}}>
        <div className="card" style={{padding:0}}>
          <div style={{padding:"18px 20px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h2 style={{margin:0, fontSize:18, fontWeight:700}}>Messages</h2>
            <span className="pill pill-orange">3 new</span>
          </div>
          {[
            ["Yasmin H.","YH","Looking forward to Tuesday — bring the article.","2m","orange"],
            ["Karim S.", "KS","Sounds good, let's swap! Are you free Thursday?","1h","blue"],
            ["Reem A.",  "RA","Here's the prep doc I promised, take your time.","Yesterday","orange"],
          ].map(([who,init,msg,time,col], i) => (
            <div key={i} className="row gap-12" style={{padding:"14px 20px", borderTop:i?"1px solid var(--line-soft)":"none", cursor:"pointer"}}
              onClick={() => setSection("messages")}>
              <Avatar initials={init} size="md" color={col}/>
              <div style={{flex:1, minWidth:0}}>
                <div className="row between"><strong style={{fontSize:13}}>{who}</strong><span style={{fontSize:11, color:"var(--ink-4)"}}>{time}</span></div>
                <div style={{fontSize:12, color:"var(--ink-3)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{msg}</div>
              </div>
            </div>
          ))}
        </div>
        <EarningsChart mini />
      </div>
    </>
  );
}

// ── Sessions ──────────────────────────────────────────────────
function SessionsSection({ isMobile }) {
  const [tab, setTab] = useState("upcoming");
  const past = [
    { day:"MON", date:"5",  time:"6:00 PM", title:"Arabic conversation — week 2",     with:"Yasmin H.", initials:"YH", mode:"Online",           status:"completed" },
    { day:"WED", date:"7",  time:"7:30 PM", title:"Watercolor portraits — session 1",  with:"Nour B.",   initials:"NB", mode:"Studio · Zamalek", status:"completed" },
    { day:"FRI", date:"2",  time:"10:00 AM",title:"SQL for analysts — module 3",       with:"Sami R.",   initials:"SR", mode:"Online",           status:"completed" },
  ];
  const rows = tab==="upcoming" ? SWAPPI.sessions : past;

  return (
    <>
      <div className="row between center" style={{marginBottom:24}}>
        <h1 className="display" style={{fontSize: isMobile ? 28 : 40, margin:0}}>Sessions</h1>
        <button className="btn btn-sm btn-primary" onClick={() => window.showToast("Opening session scheduler…","📅")}>+ New</button>
      </div>
      <div className="row gap-4" style={{marginBottom:20, borderBottom:"1px solid var(--line)"}}>
        {["upcoming","past"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background:"none", border:"none", padding:"10px 16px",
            fontSize:14, fontWeight:600, cursor:"pointer", textTransform:"capitalize",
            color: tab===t ? "var(--ink)" : "var(--ink-3)",
            borderBottom: tab===t ? "2px solid var(--orange)" : "2px solid transparent",
            marginBottom:-1
          }}>{t}</button>
        ))}
      </div>

      {isMobile ? (
        /* Mobile: compact cards */
        <div className="col gap-12">
          {rows.map((s, i) => {
            const statusClass = s.status==="confirmed" ? "pill-blue" : s.status==="pending" ? "pill-orange" : "";
            return (
              <div key={i} className="card" style={{padding:14}}>
                <div className="row gap-12">
                  {/* Date block */}
                  <div style={{width:44, flexShrink:0, textAlign:"center", borderRadius:10, background:"var(--cream-2)", padding:"8px 4px", alignSelf:"flex-start"}}>
                    <div style={{fontSize:9, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".08em"}}>{s.day}</div>
                    <div style={{fontSize:22, fontWeight:800, lineHeight:1.1}}>{s.date}</div>
                  </div>
                  {/* Info */}
                  <div style={{flex:1, minWidth:0}}>
                    <div className="row between" style={{gap:8, alignItems:"flex-start"}}>
                      <div style={{fontSize:14, fontWeight:700, flex:1, lineHeight:1.3}}>{s.title}</div>
                      <span className={"pill " + statusClass} style={s.status==="completed"?{background:"var(--cream-2)",color:"var(--ink-3)",flexShrink:0}:{flexShrink:0}}>{s.status}</span>
                    </div>
                    <div style={{fontSize:12, color:"var(--ink-3)", marginTop:4}}>{s.time} · {s.mode}</div>
                    <div className="row between center" style={{marginTop:10}}>
                      <div className="row gap-6 center">
                        <Avatar initials={s.initials} size="sm"/>
                        <span style={{fontSize:13, fontWeight:500}}>{s.with}</span>
                      </div>
                      <button className="btn btn-sm btn-ghost" onClick={() => window.showToast(`Opening session with ${s.with}…`, "📹")}>Open</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Desktop: table */
        <div className="card" style={{padding:0, overflow:"hidden"}}>
          <div style={{display:"grid", gridTemplateColumns:"80px 1fr 160px 120px 120px 120px"}}>
            {["Date","Session","With","Format","Status",""].map((h,i) => (
              <div key={i} style={{padding:"12px 20px", fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-3)", borderBottom:"1px solid var(--line)", background:"var(--cream-2)"}}>{h}</div>
            ))}
          </div>
          {rows.map((s, i) => (
            <div key={i} style={{display:"grid", gridTemplateColumns:"80px 1fr 160px 120px 120px 120px", borderTop:"1px solid var(--line-soft)", alignItems:"center"}}>
              <div style={{padding:"16px 20px"}}>
                <div style={{fontSize:10, color:"var(--ink-4)", letterSpacing:".1em"}}>{s.day}</div>
                <div style={{fontSize:22, fontWeight:800}}>{s.date}</div>
              </div>
              <div style={{padding:"16px 20px"}}>
                <div style={{fontSize:14, fontWeight:600}}>{s.title}</div>
                <div style={{fontSize:12, color:"var(--ink-3)", marginTop:2}}>{s.time}</div>
              </div>
              <div style={{padding:"16px 20px"}} className="row gap-8 center">
                <Avatar initials={s.initials} size="sm"/>
                <span style={{fontSize:13, fontWeight:500}}>{s.with}</span>
              </div>
              <div style={{padding:"16px 20px", fontSize:13, color:"var(--ink-3)"}}>{s.mode}</div>
              <div style={{padding:"16px 20px"}}>
                <span className={"pill " + (s.status==="confirmed"?"pill-blue":s.status==="pending"?"pill-orange":"")}
                  style={s.status==="completed"?{background:"var(--cream-2)",color:"var(--ink-3)"}:{}}>
                  {s.status}
                </span>
              </div>
              <div style={{padding:"16px 20px"}}>
                <button className="btn btn-sm btn-ghost" onClick={() => window.showToast(`Opening session with ${s.with}…`, "📹")}>Open</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ── Messages ──────────────────────────────────────────────────
function MessagesSection({ isMobile }) {
  const [active, setActive]       = useState(0);
  const [showThread, setShowThread] = useState(false);
  const [draft, setDraft]         = useState("");

  const threads = [
    { name:"Yasmin H.", initials:"YH", color:"orange", preview:"Looking forward to Tuesday", time:"2m", unread:2,
      msgs:[
        { from:"them", text:"Looking forward to Tuesday — bring the article you wanted to discuss.", time:"2:14 PM" },
        { from:"them", text:"Also, I found a great Egyptian dialect playlist we can work through.", time:"2:16 PM" },
        { from:"me",   text:"Perfect! I'll have it printed. Should I bring the vocab sheet too?", time:"2:20 PM" },
      ]},
    { name:"Karim S.", initials:"KS", color:"blue", preview:"Sounds good, let's swap!", time:"1h", unread:1,
      msgs:[
        { from:"me",   text:"Hey Karim! I saw your film photography class — I'd love to swap my web design skills for a session.", time:"Yesterday" },
        { from:"them", text:"Sounds good, let's swap! Are you free Thursday evening?", time:"1h ago" },
      ]},
    { name:"Reem A.", initials:"RA", color:"orange", preview:"Here's the prep doc", time:"Yesterday", unread:0,
      msgs:[
        { from:"them", text:"Here's the prep doc I promised, take your time with it.", time:"Yesterday" },
        { from:"them", text:"We'll cover the first three chapters in our session.", time:"Yesterday" },
        { from:"me",   text:"Thank you! This is exactly what I needed.", time:"Yesterday" },
      ]},
  ];
  const thread = threads[active];

  const send = () => {
    if (!draft.trim()) return;
    window.showToast(`Message sent to ${thread.name}`, "✉");
    setDraft("");
  };

  /* — Thread list panel — */
  const ThreadList = () => (
    <div style={{overflow:"auto", borderRight: isMobile ? "none" : "1px solid var(--line)"}}>
      {threads.map((t, i) => (
        <div key={i} onClick={() => { setActive(i); if (isMobile) setShowThread(true); }} style={{
          padding:"16px 18px", cursor:"pointer", display:"flex", gap:12, alignItems:"center",
          background: active===i && !isMobile ? "var(--cream-2)" : "transparent",
          borderBottom:"1px solid var(--line-soft)"
        }}>
          <Avatar initials={t.initials} size="md" color={t.color}/>
          <div style={{flex:1, minWidth:0}}>
            <div className="row between">
              <strong style={{fontSize:14}}>{t.name}</strong>
              <span style={{fontSize:11, color:"var(--ink-4)", flexShrink:0}}>{t.time}</span>
            </div>
            <div style={{fontSize:12, color:"var(--ink-3)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{t.preview}</div>
          </div>
          {t.unread > 0 && <span style={{background:"var(--orange)", color:"#fff", borderRadius:99, fontSize:10, fontWeight:700, padding:"2px 7px", flexShrink:0}}>{t.unread}</span>}
        </div>
      ))}
    </div>
  );

  /* — Active chat panel — */
  const ChatPanel = () => (
    <div style={{display:"flex", flexDirection:"column", height: isMobile ? "calc(100vh - 220px)" : "100%"}}>
      <div style={{padding:"14px 18px", borderBottom:"1px solid var(--line)", display:"flex", gap:12, alignItems:"center", flexShrink:0}}>
        {isMobile && (
          <button onClick={() => setShowThread(false)} style={{background:"none", border:"none", fontSize:20, cursor:"pointer", color:"var(--ink-3)", paddingRight:4}}>←</button>
        )}
        <Avatar initials={thread.initials} size="sm" color={thread.color}/>
        <strong style={{fontSize:15, flex:1}}>{thread.name}</strong>
        <button className="btn btn-sm btn-ghost" onClick={() => window.showToast(`Video call with ${thread.name} starting…`, "📹")}>📹 Call</button>
      </div>
      <div style={{flex:1, padding:"16px 18px", overflowY:"auto", display:"flex", flexDirection:"column", gap:10}}>
        {thread.msgs.map((m, i) => (
          <div key={i} style={{display:"flex", justifyContent: m.from==="me" ? "flex-end" : "flex-start"}}>
            <div style={{
              maxWidth:"78%", padding:"10px 14px",
              borderRadius: m.from==="me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.from==="me" ? "var(--ink)" : "var(--cream-2)",
              color: m.from==="me" ? "var(--cream)" : "var(--ink)",
              fontSize:14, lineHeight:1.5
            }}>
              {m.text}
              <div style={{fontSize:10, opacity:.5, marginTop:4, textAlign: m.from==="me" ? "right" : "left"}}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px 16px", borderTop:"1px solid var(--line)", display:"flex", gap:10, flexShrink:0}}>
        <input className="input" placeholder={`Message ${thread.name}…`} value={draft}
          onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} style={{flex:1}}/>
        <button className="btn btn-primary" onClick={send}>→</button>
      </div>
    </div>
  );

  /* Mobile: single-pane (list OR chat) */
  if (isMobile) {
    return (
      <div className="card" style={{padding:0, overflow:"hidden"}}>
        <div style={{padding:"16px 18px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:700}}>
            {showThread ? thread.name : "Messages"}
          </h2>
          {!showThread && <span className="pill pill-orange">3 new</span>}
        </div>
        {showThread ? <ChatPanel /> : <ThreadList />}
      </div>
    );
  }

  /* Desktop: two-pane */
  return (
    <div style={{height:"calc(100vh - 180px)", display:"grid", gridTemplateColumns:"280px 1fr", border:"1px solid var(--line)", borderRadius:16, overflow:"hidden", background:"var(--paper)"}}>
      <ThreadList />
      <ChatPanel />
    </div>
  );
}

// ── Earnings ──────────────────────────────────────────────────
function EarningsSection({ isMobile }) {
  const payouts = [
    { date:"May 1",  amount:420, sessions:3, status:"paid" },
    { date:"Apr 24", amount:360, sessions:3, status:"paid" },
    { date:"Apr 17", amount:180, sessions:1, status:"paid" },
    { date:"Apr 10", amount:480, sessions:4, status:"paid" },
    { date:"May 10", amount:300, sessions:2, status:"pending" },
  ];
  return (
    <>
      <div className="row between center" style={{marginBottom:24}}>
        <h1 className="display" style={{fontSize: isMobile ? 28 : 40, margin:0}}>Earnings</h1>
        <button className="btn btn-sm btn-ghost" onClick={() => window.showToast("Downloading earnings report…","📄")}>CSV</button>
      </div>

      <div className="grid-3" style={{gap:12, marginBottom:20}}>
        {[
          {label:"This month",    val:"$540",  delta:"+$120 vs last"},
          {label:"All time",      val:"$4,820",delta:"since Jan '24"},
          {label:"Avg / session", val:"$86",   delta:"56 sessions"},
        ].map((c,i) => (
          <div key={i} className="card" style={{padding: isMobile ? 14 : 24}}>
            <div style={{fontSize:10, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em", fontWeight:700}}>{c.label}</div>
            <div className="display" style={{fontSize: isMobile ? 28 : 40, marginTop:6}}>{c.val}</div>
            <div style={{fontSize:11, color:"var(--ink-3)", marginTop:4}}>{c.delta}</div>
          </div>
        ))}
      </div>

      <EarningsChart />

      <div className="card" style={{padding:0, overflow:"hidden", marginTop:20}}>
        <div style={{padding:"18px 20px", borderBottom:"1px solid var(--line)"}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:700}}>Payout history</h2>
        </div>
        {payouts.map((p, i) => (
          <div key={i} className="row between center" style={{padding:"14px 20px", borderTop:i?"1px solid var(--line-soft)":"none"}}>
            <div>
              <div style={{fontSize:14, fontWeight:600}}>{p.date}</div>
              <div style={{fontSize:12, color:"var(--ink-3)"}}>{p.sessions} sessions</div>
            </div>
            <div style={{fontSize:16, fontWeight:700}}>${p.amount}</div>
            <span className={"pill " + (p.status==="paid" ? "pill-blue" : "pill-orange")}>{p.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ── My Skills ─────────────────────────────────────────────────
function SkillsSection({ onBook, setPage, isMobile }) {
  const mySkills = SWAPPI.skills.filter(s => s.provider === "Yasmin H.");
  const [paused, setPaused] = useState([]);
  return (
    <>
      <div className="row between center" style={{marginBottom:24}}>
        <h1 className="display" style={{fontSize: isMobile ? 28 : 40, margin:0}}>My Skills</h1>
        <button className="btn btn-sm btn-primary" onClick={() => window.showToast("Opening skill editor…","✎")}>+ Add</button>
      </div>

      <div className="grid-2" style={{gap:16}}>
        {mySkills.map((s, i) => {
          const off = paused.includes(s.id);
          return (
            <div key={s.id} className="card" style={{padding:0, overflow:"hidden", opacity: off ? .6 : 1}}>
              {s.img && <img src={s.img} alt={s.title} style={{width:"100%", height:140, objectFit:"cover"}}/>}
              <div style={{padding:16}}>
                <div className="row between center" style={{marginBottom:10}}>
                  <span className={"pill pill-" + s.catColor}>{s.cat}</span>
                  <span className={"pill " + (off ? "" : "pill-blue")}>{off ? "Paused" : "Active"}</span>
                </div>
                <h3 style={{fontWeight:700, fontSize:15, margin:"0 0 6px"}}>{s.title}</h3>
                <div style={{fontSize:12, color:"var(--ink-3)"}}>{s.reviews} reviews · ${s.price}/session</div>
                <div className="row gap-6 mt-16" style={{flexWrap:"wrap"}}>
                  <button className="btn btn-sm btn-primary" onClick={() => window.showToast(`Editing "${s.title}"…`, "✎")}>Edit</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => setPaused(p => p.includes(s.id) ? p.filter(x=>x!==s.id) : [...p,s.id])}>
                    {off ? "Unpause" : "Pause"}
                  </button>
                  <button className="btn btn-sm btn-ghost" style={{color:"var(--danger)", borderColor:"var(--danger)"}}
                    onClick={() => window.showToast(`Removed "${s.title}"`, "🗑")}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="card" style={{padding:32, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, cursor:"pointer", border:"2px dashed var(--line)", minHeight:180}}
          onClick={() => window.showToast("Opening skill editor…","✎")}>
          <div style={{width:48, height:48, borderRadius:14, background:"var(--cream-2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"var(--ink-3)"}}>+</div>
          <div style={{textAlign:"center"}}>
            <div style={{fontWeight:700, fontSize:15}}>Add a skill</div>
            <div style={{fontSize:12, color:"var(--ink-3)", marginTop:3}}>~3 minutes</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Settings ──────────────────────────────────────────────────
function SettingsSection({ isMobile }) {
  const [form, setForm] = useState({
    name:"Yasmin Hafez", bio:"Arabic teacher & translator based in Cairo.",
    location:"Cairo, Egypt", email:"yasmin@example.com",
    notify_sessions:true, notify_messages:true, notify_reviews:false, visible:true,
  });
  const upd = k => v => setForm(f => ({...f, [k]:v}));

  return (
    <>
      <div className="row between center" style={{marginBottom:24}}>
        <h1 className="display" style={{fontSize: isMobile ? 28 : 40, margin:0}}>Settings</h1>
        <button className="btn btn-sm btn-primary" onClick={() => window.showToast("Settings saved!", "✓")}>Save</button>
      </div>

      <div className="col gap-16">
        {/* Profile card */}
        <div className="card" style={{padding:24}}>
          <h2 style={{margin:"0 0 18px", fontSize:16, fontWeight:700}}>Profile</h2>
          <div className="grid-2" style={{gap:14}}>
            <div className="field">
              <label>Display name</label>
              <input className="input" value={form.name} onChange={e=>upd("name")(e.target.value)}/>
            </div>
            <div className="field">
              <label>Location</label>
              <input className="input" value={form.location} onChange={e=>upd("location")(e.target.value)}/>
            </div>
            <div className="field" style={{gridColumn:"1/-1"}}>
              <label>Bio</label>
              <textarea className="input" rows="3" value={form.bio} onChange={e=>upd("bio")(e.target.value)} style={{height:"auto", padding:14, resize:"vertical"}}/>
            </div>
          </div>
        </div>

        <div className="grid-2" style={{gap:16}}>
          {/* Account */}
          <div className="card" style={{padding:24}}>
            <h2 style={{margin:"0 0 18px", fontSize:16, fontWeight:700}}>Account</h2>
            <div className="field">
              <label>Email</label>
              <input className="input" value={form.email} onChange={e=>upd("email")(e.target.value)}/>
            </div>
            <div className="field" style={{marginTop:14}}>
              <label>Password</label>
              <input className="input" type="password" defaultValue="••••••••" readOnly/>
            </div>
            <button className="btn btn-ghost btn-sm" style={{marginTop:14}} onClick={() => window.showToast("Password reset email sent.", "✉")}>Change password</button>
          </div>

          {/* Notifications */}
          <div className="card" style={{padding:24}}>
            <h2 style={{margin:"0 0 18px", fontSize:16, fontWeight:700}}>Notifications</h2>
            <div className="col gap-14">
              {[
                ["notify_sessions","Session reminders"],
                ["notify_messages","New messages"],
                ["notify_reviews","Review requests"],
              ].map(([key, label]) => (
                <div key={key} className="row between center">
                  <span style={{fontSize:14}}>{label}</span>
                  <Toggle on={form[key]} onChange={() => upd(key)(!form[key])} color="orange"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visibility + danger */}
        <div className="card" style={{padding:24}}>
          <div className="row between center">
            <div>
              <div style={{fontWeight:700}}>Profile visibility</div>
              <div style={{fontSize:12, color:"var(--ink-3)", marginTop:3}}>When off, you won't appear in search results.</div>
            </div>
            <Toggle on={form.visible} onChange={() => upd("visible")(!form.visible)} color="blue"/>
          </div>
          <div style={{marginTop:20, paddingTop:20, borderTop:"1px solid var(--line)"}}>
            <button className="btn btn-sm" style={{background:"transparent", color:"var(--danger)", border:"1px solid var(--danger)"}}
              onClick={() => window.showToast("Account deletion request sent — we'll email you next steps.", "⚠")}>Delete account</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Shared helpers ────────────────────────────────────────────
function Toggle({ on, onChange, color="orange" }) {
  return (
    <button onClick={onChange} style={{
      width:44, height:24, borderRadius:99, border:"none", cursor:"pointer", flexShrink:0,
      background: on ? (color==="blue" ? "var(--blue)" : "var(--orange)") : "var(--cream-3)",
      position:"relative", transition:"background .2s"
    }}>
      <span style={{position:"absolute", top:3, left:on?20:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left .2s", boxShadow:"var(--shadow-1)"}}/>
    </button>
  );
}

function EarningsChart({ mini }) {
  const weeks = [24,32,28,40,36,52,44,68,60,82,74,96];
  return (
    <div className="card" style={{padding:20}}>
      <div className="row between center">
        <h2 style={{margin:0, fontSize:mini?18:22, fontWeight:700}}>Earnings{mini?" · 12 wks":""}</h2>
        <span className="pill pill-orange">$1,840</span>
      </div>
      <div style={{display:"flex", alignItems:"flex-end", gap:5, height: mini?130:190, marginTop:20}}>
        {weeks.map((h,i) => (
          <div key={i} style={{flex:1, cursor:"pointer"}} onClick={() => window.showToast(`Week ${i+1}: $${Math.round(h*19.2)}`, "💰")}>
            <div style={{height:h+"%", background:"linear-gradient(180deg, var(--orange) 0%, var(--orange-deep) 100%)", borderRadius:"5px 5px 0 0", transition:"height .6s", opacity:.85}}
              onMouseEnter={e=>{e.currentTarget.style.opacity="1"}} onMouseLeave={e=>{e.currentTarget.style.opacity=".85"}}/>
          </div>
        ))}
      </div>
      <div className="row between" style={{marginTop:8, fontSize:11, color:"var(--ink-3)"}}>
        <span>Mar</span><span>Apr</span><span>May</span>
      </div>
      {!mini && (
        <div style={{marginTop:16, padding:12, borderRadius:10, background:"var(--cream-2)", display:"flex", gap:10, alignItems:"center"}}>
          <div style={{width:32, height:32, borderRadius:8, background:"var(--blue)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>↗</div>
          <div style={{fontSize:13}}>Trending <strong>+34% vs. last quarter</strong>. Two more sessions hits your monthly best.</div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, val, delta, color, onClick }) {
  return (
    <div className="card" style={{padding:16, position:"relative", overflow:"hidden", cursor:onClick?"pointer":"default"}} onClick={onClick}>
      <div style={{position:"absolute", top:0, right:0, width:70, height:70, borderRadius:"50%", background:color==="orange"?"var(--orange-soft)":"var(--blue-soft)", opacity:.5, transform:"translate(30%,-30%)"}}/>
      <div style={{fontSize:10, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em", fontWeight:700}}>{label}</div>
      <div className="display" style={{fontSize:32, marginTop:6}}>{val}</div>
      <div style={{fontSize:11, color:"var(--ink-3)", marginTop:3}}>{delta}</div>
    </div>
  );
}

function Mini({ label, val }) {
  return (
    <div>
      <div style={{fontSize:16, fontWeight:700}}>{val}</div>
      <div style={{fontSize:10, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".08em"}}>{label}</div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
