/* global React, SWAPPI, SwappiAtoms */
const { useState } = React;
const { Avatar, Placeholder } = window.SwappiAtoms;

// ============================================================
//  DASHBOARD
// ============================================================

function DashboardPage({ setPage, onBook }) {
  const [section, setSection] = useState("overview");
  return (
    <main data-screen-label="Dashboard" style={{background:"var(--cream-2)", minHeight:"calc(100vh - 64px)"}}>
      <div style={{display:"grid", gridTemplateColumns:"260px 1fr", minHeight:"calc(100vh - 64px)"}}>
        {/* Sidebar */}
        <aside style={{background:"var(--paper)", borderRight:"1px solid var(--line)", padding:"32px 20px"}}>
          <div className="card" style={{padding:16, background:"var(--cream-2)", border:"none"}}>
            <div className="row gap-12 center">
              <Avatar initials="YO" size="md" color="orange" verified />
              <div>
                <div style={{fontSize:14, fontWeight:600}}>You</div>
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
            {[
              ["overview","Overview","◎"],
              ["sessions","Sessions","☷"],
              ["messages","Messages","✉"],
              ["earnings","Earnings","$"],
              ["skills","My skills","✎"],
              ["settings","Settings","⚙"],
            ].map(([id,label,icon]) => (
              <button key={id} onClick={()=>setSection(id)} style={{
                background: section===id ? "var(--ink)" : "transparent",
                color: section===id ? "var(--cream)" : "var(--ink-2)",
                border:"none", textAlign:"left",
                padding:"10px 12px", borderRadius:10, fontSize:14, fontWeight:500,
                cursor:"pointer", display:"flex", alignItems:"center", gap:10
              }}>
                <span style={{width:18, textAlign:"center", opacity:.7}}>{icon}</span>{label}
              </button>
            ))}
          </nav>

          <div style={{marginTop:24, padding:18, borderRadius:12, background:"linear-gradient(135deg, var(--orange-soft), var(--blue-soft))"}}>
            <div style={{fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-2)"}}>Upgrade</div>
            <div style={{fontFamily:"var(--f-serif)", fontSize:19, lineHeight:1.2, marginTop:8}}>Unlimited swaps with&nbsp;Pro</div>
            <button className="btn btn-sm btn-primary" style={{marginTop:14, width:"100%", justifyContent:"center"}} onClick={()=>setPage("pricing")}>See Pro →</button>
          </div>
        </aside>

        {/* Main */}
        <section style={{padding:"40px 48px"}}>
          <div className="row between center" style={{marginBottom:32}}>
            <div>
              <span className="eyebrow">Good evening</span>
              <h1 className="display" style={{fontSize:48, margin:"8px 0 0"}}>Welcome back, friend.</h1>
            </div>
            <div className="row gap-8">
              <button className="btn btn-ghost">↗ Invite a friend</button>
              <button className="btn btn-primary" onClick={()=>setPage("browse")}>Find a swap →</button>
            </div>
          </div>

          {/* metric strip */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:32}}>
            <MetricCard label="Sessions this month" val="6" delta="+2 vs last" color="orange"/>
            <MetricCard label="Pending requests" val="3" delta="2 to approve" color="blue"/>
            <MetricCard label="Earnings" val="$540" delta="+$120 wk" color="orange"/>
            <MetricCard label="Profile views" val="284" delta="+18% wk" color="blue"/>
          </div>

          <div style={{display:"grid", gridTemplateColumns:"1.7fr 1fr", gap:24}}>
            {/* Upcoming sessions */}
            <div className="card" style={{padding:0, overflow:"hidden"}}>
              <div style={{padding:"20px 24px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontSize:24, fontWeight:400}}>Upcoming sessions</h2>
                <button className="btn btn-sm btn-ghost">View all</button>
              </div>
              <div className="col">
                {SWAPPI.sessions.map((s,i) => (
                  <div key={i} className="row center gap-16" style={{padding:"18px 24px", borderTop: i?"1px solid var(--line-soft)":"none"}}>
                    <div style={{width:56, textAlign:"center", padding:"8px 0", borderRadius:10, background:"var(--cream-2)"}}>
                      <div style={{fontSize:10, color:"var(--ink-3)", letterSpacing:".1em"}}>{s.day}</div>
                      <div style={{fontFamily:"var(--f-serif)", fontSize:24}}>{s.date}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15, fontWeight:600}}>{s.title}</div>
                      <div style={{fontSize:13, color:"var(--ink-3)"}}>{s.time} · {s.mode} · with {s.with}</div>
                    </div>
                    <Avatar initials={s.initials} size="sm"/>
                    <span className={"pill " + (s.status==="confirmed"?"pill-blue":"pill-orange")}>{s.status}</span>
                    <button className="btn btn-sm btn-ghost">Open</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="card" style={{padding:0}}>
              <div style={{padding:"20px 24px", borderBottom:"1px solid var(--line)"}}>
                <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontSize:24, fontWeight:400}}>Activity</h2>
              </div>
              <div className="col">
                {SWAPPI.activity.map((a,i) => (
                  <div key={i} className="row gap-12 center" style={{padding:"16px 24px", borderTop:i?"1px solid var(--line-soft)":"none"}}>
                    <Avatar initials={a.initials} size="sm" color={a.color}/>
                    <div style={{flex:1, fontSize:13.5}}>
                      <strong>{a.who}</strong> <span style={{color:"var(--ink-3)"}}>{a.action}</span>
                      <div style={{fontSize:11, color:"var(--ink-4)", marginTop:2}}>{a.when}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Messages preview + earnings chart */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:24, marginTop:24}}>
            <div className="card" style={{padding:0}}>
              <div style={{padding:"20px 24px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between"}}>
                <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontSize:24, fontWeight:400}}>Messages</h2>
                <span className="pill pill-orange">3 new</span>
              </div>
              <div className="col">
                {[
                  ["Yasmin H.","YH","Looking forward to Tuesday — bring the article you wanted to discuss.","2m"],
                  ["Karim S.","KS","Sounds good, let's swap! Are you free Thursday evening?","1h"],
                  ["Reem A.","RA","Here's the prep doc I promised, take your time with it.","Yesterday"],
                ].map(([who,init,msg,time],i)=>(
                  <div key={i} className="row gap-12" style={{padding:"16px 24px", borderTop:i?"1px solid var(--line-soft)":"none", cursor:"pointer"}}>
                    <Avatar initials={init} size="md" color={i%2?"blue":"orange"}/>
                    <div style={{flex:1, minWidth:0}}>
                      <div className="row between"><strong style={{fontSize:14}}>{who}</strong><span style={{fontSize:11, color:"var(--ink-4)"}}>{time}</span></div>
                      <div style={{fontSize:13, color:"var(--ink-3)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{msg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{padding:24}}>
              <div className="row between">
                <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontSize:24, fontWeight:400}}>Earnings · last 12 weeks</h2>
                <div className="row gap-4">
                  <span className="pill pill-orange">$1,840</span>
                </div>
              </div>
              <div style={{display:"flex", alignItems:"flex-end", gap:8, height:160, marginTop:24}}>
                {[24,32,28,40,36,52,44,68,60,82,74,96].map((h,i)=>(
                  <div key={i} style={{flex:1, position:"relative"}}>
                    <div style={{height:h+"%", background:`linear-gradient(180deg, var(--orange) 0%, var(--orange-deep) 100%)`, borderRadius:"6px 6px 0 0", transition:"height .6s"}}></div>
                  </div>
                ))}
              </div>
              <div className="row between" style={{marginTop:10, fontSize:11, color:"var(--ink-3)"}}>
                <span>Mar</span><span>Apr</span><span>May</span>
              </div>
              <div style={{marginTop:20, padding:14, borderRadius:12, background:"var(--cream-2)", display:"flex", alignItems:"center", gap:12}}>
                <div style={{width:36,height:36,borderRadius:10,background:"var(--blue)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>↗</div>
                <div style={{flex:1, fontSize:13}}>You're trending <strong>+34% vs. last quarter</strong>. Two more sessions hits your monthly best.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, val, delta, color }) {
  return (
    <div className="card" style={{padding:20, position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", top:0, right:0, width:80, height:80, borderRadius:"50%", background:color==="orange"?"var(--orange-soft)":"var(--blue-soft)", opacity:.4, transform:"translate(30%,-30%)"}}></div>
      <div style={{fontSize:11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em", fontWeight:600}}>{label}</div>
      <div className="display" style={{fontSize:40, marginTop:8}}>{val}</div>
      <div style={{fontSize:12, color:"var(--ink-3)", marginTop:4}}>{delta}</div>
    </div>
  );
}

function Mini({ label, val }) {
  return (
    <div>
      <div style={{fontSize:16, fontWeight:600}}>{val}</div>
      <div style={{fontSize:10, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".08em"}}>{label}</div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
