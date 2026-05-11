/* global React, SWAPPI, SwappiAtoms */
const { useState } = React;
const { Avatar, Reveal, Placeholder, ReviewCard, SkillCard } = window.SwappiAtoms;

// ============================================================
//  PROFILE — share/save/calendar all functional
// ============================================================

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const AVAIL = {
  "May 2026":    [4,7,9,11,14,16,18,21,23,25,28],
  "June 2026":   [2,5,9,12,16,19,23,26,30],
  "April 2026":  [1,3,7,10,14,17,21,24,28],
};

function ProfilePage({ onBook }) {
  const [tab, setTab] = useState("offered");
  const [saved, setSaved] = useState(false);
  const [monthIdx, setMonthIdx] = useState(4); // May = index 4
  const [year, setYear] = useState(2026);

  const monthName = `${MONTHS[monthIdx]} ${year}`;
  const availDays = AVAIL[monthName] || [3,7,11,15,19,23,27];

  const prevMonth = () => {
    if (monthIdx === 0) { setMonthIdx(11); setYear(y => y-1); }
    else setMonthIdx(m => m-1);
  };
  const nextMonth = () => {
    if (monthIdx === 11) { setMonthIdx(0); setYear(y => y+1); }
    else setMonthIdx(m => m+1);
  };

  const offered = SWAPPI.skills.filter(s =>
    ["Yasmin H.", "Mara T.", "Reem A."].includes(s.provider)
  ).slice(0, 3);

  const share = () => {
    navigator.clipboard?.writeText(window.location.href + "#yasmin-hafez").catch(()=>{});
    window.showToast("Profile link copied to clipboard!", "🔗");
  };

  const toggleSave = () => {
    setSaved(s => !s);
    window.showToast(saved ? "Removed from saved" : "Saved to your list!", saved ? "—" : "♡");
  };

  return (
    <main data-screen-label="Profile" style={{background:"var(--cream)", paddingBottom:120}}>
      {/* Cover */}
      <section style={{position:"relative"}}>
        <div style={{position:"relative", height:300, overflow:"hidden"}}>
          <img src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1400&h=360&q=80&auto=format&fit=crop" alt="Cairo golden hour" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 60%"}} />
          <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, var(--cream) 100%)"}}></div>
        </div>

        <div className="wrap" style={{position:"relative", marginTop:-80}}>
          <div className="row gap-24" style={{alignItems:"flex-end", flexWrap:"wrap"}}>
            <div style={{
              width:160, height:160, borderRadius:24,
              background:"linear-gradient(135deg, oklch(0.78 0.13 60), oklch(0.55 0.18 38))",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontFamily:"var(--f-serif)", fontSize:64,
              border:"6px solid var(--cream)", boxShadow:"var(--shadow-3)", position:"relative"
            }}>
              YH
              <div style={{position:"absolute", right:-8, bottom:-8, background:"var(--blue)", color:"#fff", width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"3px solid var(--cream)", fontSize:14}}>✓</div>
            </div>

            <div style={{flex:1, minWidth:300}}>
              <div className="row gap-8 center">
                <span className="pill pill-orange">★ Top rated</span>
                <span className="pill">Responds in ~1h</span>
                <span className="pill">Speaks EN · AR · FR</span>
              </div>
              <h1 className="display" style={{fontSize:"clamp(40px,5vw,64px)", margin:"12px 0 0"}}>Yasmin Hafez</h1>
              <p style={{color:"var(--ink-3)", margin:"6px 0 0", fontSize:17}}>Arabic teacher & translator · Cairo, Egypt</p>
            </div>

            <div className="row gap-8">
              <button className="btn btn-ghost" onClick={share}>↗ Share</button>
              <button className="btn btn-ghost" onClick={toggleSave} style={{color: saved ? "var(--danger)" : undefined}}>
                {saved ? "♥ Saved" : "♡ Save"}
              </button>
              <button className="btn btn-primary" onClick={() => onBook && onBook(SWAPPI.skills[0])}>Request a session</button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, marginTop:48, border:"1px solid var(--line)", borderRadius:20, overflow:"hidden", background:"var(--paper)"}}>
            {[
              {label:"Swaps completed", val:"312", sub:"since 2023"},
              {label:"Average rating",  val:"4.9★", sub:"142 reviews"},
              {label:"Response time",   val:"<1 hr", sub:"morning + evening"},
              {label:"Repeat learners", val:"68%",  sub:"come back for more"},
            ].map((s, i) => (
              <div key={i} style={{padding:"28px 32px", borderRight:i<3?"1px solid var(--line)":"none"}}>
                <div className="display" style={{fontSize:36}}>{s.val}</div>
                <div style={{fontSize:12, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em", marginTop:6}}>{s.label}</div>
                <div style={{fontSize:13, color:"var(--ink-3)", marginTop:8}}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div style={{marginTop:64, display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:48}}>
            <div>
              <h2 className="display" style={{fontSize:36, fontWeight:400, margin:0}}>About me</h2>
              <p style={{fontSize:17, lineHeight:1.7, color:"var(--ink-2)", marginTop:16}}>
                I grew up between Cairo and Marseille, which means I spent half my childhood translating for my grandmother and the other half being translated for. Teaching Arabic is how I give that gift forward.
              </p>
              <p style={{fontSize:17, lineHeight:1.7, color:"var(--ink-2)", marginTop:12}}>
                I focus on Egyptian dialect — the version you actually hear in cafés, songs, and on the phone. We'll talk more than we'll drill grammar. Bring your own pace.
              </p>
              <p style={{fontSize:17, lineHeight:1.7, color:"var(--ink-2)", marginTop:12}}>
                Outside of Swappi I work as a freelance translator and would happily swap lessons for help with your website, photography portfolio, or anything thoughtfully designed.
              </p>
            </div>
            <aside>
              <div className="card" style={{padding:24}}>
                <h3 style={{margin:0, fontSize:14, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--ink-3)"}}>Open to swap for</h3>
                <div className="row gap-8" style={{flexWrap:"wrap", marginTop:14}}>
                  {["Web design","Photography","Brand strategy","UX writing","Sourdough"].map(t =>
                    <span key={t} className="pill pill-blue" style={{cursor:"default"}}>{t}</span>
                  )}
                </div>
                <h3 style={{margin:"28px 0 0", fontSize:14, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"var(--ink-3)"}}>Languages</h3>
                <div className="col gap-8 mt-16">
                  <LangRow lang="Arabic"  level="Native"           pct={100}/>
                  <LangRow lang="English" level="Fluent"           pct={92}/>
                  <LangRow lang="French"  level="Conversational"   pct={68}/>
                </div>
              </div>
            </aside>
          </div>

          {/* Tabs */}
          <div style={{marginTop:80}}>
            <div className="row gap-4" style={{borderBottom:"1px solid var(--line)", marginBottom:32}}>
              {[["offered","Skills offered","3"],["reviews","Reviews","142"],["availability","Availability","Next: Tue"]].map(([id,label,sub]) => (
                <button key={id} onClick={() => setTab(id)} style={{
                  background:"none", border:"none", padding:"16px 20px",
                  fontSize:15, fontWeight:600,
                  color: tab===id ? "var(--ink)" : "var(--ink-3)",
                  borderBottom: tab===id ? "2px solid var(--orange)" : "2px solid transparent",
                  marginBottom:-1, cursor:"pointer"
                }}>
                  {label} <span style={{fontSize:12, color:"var(--ink-4)", marginLeft:6, fontWeight:400}}>{sub}</span>
                </button>
              ))}
            </div>

            {tab === "offered" && (
              <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24}}>
                {offered.map(s => <SkillCard key={s.id} s={s} onBook={onBook}/>)}
              </div>
            )}

            {tab === "reviews" && (
              <div>
                <div className="row gap-32 center" style={{marginBottom:32, paddingBottom:32, borderBottom:"1px solid var(--line)"}}>
                  <div>
                    <div className="display" style={{fontSize:80, lineHeight:1}}>4.9</div>
                    <div style={{color:"var(--orange)", fontSize:18, marginTop:6}}>★★★★★</div>
                    <div style={{color:"var(--ink-3)", fontSize:13, marginTop:6}}>142 reviews</div>
                  </div>
                  <div style={{flex:1, maxWidth:320}}>
                    {[5,4,3,2,1].map(n => {
                      const pct = n===5?92:n===4?6:n===3?1:n===2?0.5:0.5;
                      return (
                        <div key={n} className="row center gap-12" style={{marginBottom:6}}>
                          <span style={{fontSize:12, color:"var(--ink-3)", width:14}}>{n}★</span>
                          <div style={{flex:1, height:8, background:"var(--cream-2)", borderRadius:99, overflow:"hidden"}}>
                            <div style={{width:pct+"%", height:"100%", background:n>=4?"var(--orange)":"var(--ink-4)"}}></div>
                          </div>
                          <span style={{fontSize:12, color:"var(--ink-3)", width:32}}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20}}>
                  {SWAPPI.reviews.map((r,i) => <ReviewCard key={i} r={r}/>)}
                </div>
              </div>
            )}

            {tab === "availability" && (
              <div className="card" style={{padding:32}}>
                <div className="row between center" style={{marginBottom:24}}>
                  <div>
                    <h3 style={{margin:0, fontFamily:"var(--f-serif)", fontWeight:400, fontSize:28}}>{monthName}</h3>
                    <p style={{margin:"4px 0 0", color:"var(--ink-3)", fontSize:14}}>All times in Cairo (GMT+2). Click a slot to request.</p>
                  </div>
                  <div className="row gap-8">
                    <button className="btn btn-sm btn-ghost" onClick={prevMonth}>‹ Prev</button>
                    <button className="btn btn-sm btn-ghost" onClick={nextMonth}>Next ›</button>
                  </div>
                </div>
                <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8}}>
                  {["S","M","T","W","T","F","S"].map((d,i) => (
                    <div key={i} style={{textAlign:"center", fontSize:12, color:"var(--ink-3)", padding:8}}>{d}</div>
                  ))}
                  {Array.from({length:35}, (_,i) => {
                    const day = i - 3;
                    const has = availDays.includes(day);
                    const off = day < 1 || day > 31;
                    return (
                      <button key={i} disabled={off || !has}
                        onClick={() => !off && has && window.showToast(`Requested slot: ${monthName} ${day} — Yasmin will confirm shortly!`, "📅")}
                        style={{
                          aspectRatio:"1", borderRadius:10,
                          border: has ? "1px solid var(--orange-soft)" : "1px solid transparent",
                          background: off ? "transparent" : has ? "color-mix(in oklch, var(--orange) 12%, var(--paper))" : "var(--cream-2)",
                          color: off ? "transparent" : has ? "var(--orange-deep)" : "var(--ink-4)",
                          cursor: has ? "pointer" : "default",
                          fontSize:14, fontWeight:has?700:400,
                          position:"relative", padding:8, textAlign:"left", verticalAlign:"top"
                        }}>
                        {!off && day}
                        {has && <span style={{position:"absolute", bottom:4, left:6, fontSize:9, color:"var(--orange-deep)"}}>3 slots</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function LangRow({ lang, level, pct }) {
  return (
    <div className="row between center gap-12">
      <span style={{fontSize:14, fontWeight:600, width:80}}>{lang}</span>
      <div style={{flex:1, height:6, background:"var(--cream-2)", borderRadius:99, overflow:"hidden"}}>
        <div style={{width:pct+"%", height:"100%", background:"var(--ink)"}}></div>
      </div>
      <span style={{fontSize:12, color:"var(--ink-3)", width:100, textAlign:"right"}}>{level}</span>
    </div>
  );
}

window.ProfilePage = ProfilePage;
