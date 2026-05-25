/* global React, SWAPPI, SwappiAtoms */
const { useState, useMemo } = React;
const { Avatar, Placeholder } = window.SwappiAtoms;
const useIsMobile = window.useIsMobile || (() => false);

// ============================================================
//  WORKSHOPS — filter wired, all buttons functional
// ============================================================

function WorkshopsPage({ onBook, setPage }) {
  const [filter, setFilter] = useState("All");
  const [detail, setDetail] = useState(null);
  const isMobile = useIsMobile();

  const thisWeekTitles = new Set(["Intro to Sourdough", "Cairo Sketch Crawl"]);

  const filtered = useMemo(() => {
    return SWAPPI.workshops.filter(w => {
      if (filter === "All") return true;
      if (filter === "Online") return w.location.toLowerCase().includes("online");
      if (filter === "In-person") return !w.location.toLowerCase().includes("online");
      if (filter === "This week") return thisWeekTitles.has(w.title);
      return true;
    });
  }, [filter]);

  return (
    <main data-screen-label="Workshops" style={{background:"var(--cream)", paddingBottom:120}}>
      <section style={{padding:"56px 0 32px"}}>
        <div className="wrap">
          <span className="eyebrow">Workshops · weekly drops</span>
          <div className="row between" style={{flexWrap:"wrap", gap:24, marginTop:12}}>
            <h1 className="display" style={{fontSize:"clamp(40px,6vw,80px)", margin:0, maxWidth:900}}>
              Small groups. Real rooms. <span style={{color:"var(--orange)"}}>Done in a weekend.</span>
            </h1>
            <div className="row mob-wrap gap-8" style={{alignItems:"flex-end"}}>
              {["All","Online","In-person","This week"].map(f => (
                <button key={f} className="pill" onClick={() => setFilter(f)} style={{
                  cursor:"pointer", height:36, padding:"0 16px",
                  background: filter===f ? "var(--ink)" : "var(--paper)",
                  color: filter===f ? "var(--cream)" : "var(--ink-2)",
                  border:"1px solid " + (filter===f ? "var(--ink)" : "var(--line)")
                }}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {(filter === "All" || filter === "In-person" || filter === "This week") && (
        <section className="wrap">
          <div className="card" style={{padding:0, overflow:"hidden", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", minHeight: isMobile ? "auto" : 380}}>
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&h=420&q=80&auto=format&fit=crop" alt="Sourdough workshop" style={{width:"100%", aspectRatio: isMobile ? "3/2" : "auto", height: isMobile ? "auto" : "100%", objectFit:"cover", objectPosition:"center 50%", display:"block"}} />
            <div style={{padding: isMobile ? 24 : 48, display:"flex", flexDirection:"column", justifyContent:"center"}}>
              <span className="pill pill-orange">★ This weekend</span>
              <h2 className="display" style={{fontSize: isMobile ? 28 : 44, fontWeight:400, margin:"16px 0 12px", lineHeight:1.1}}>Intro to Sourdough — Sunday, Maadi</h2>
              <p style={{color:"var(--ink-3)", fontSize:16, lineHeight:1.6, margin:0}}>
                Three hours with Hana in a working kitchen. You'll leave with a starter, a loaf, and the confidence to keep going.
              </p>
              <div className="row mob-wrap gap-24 mt-24" style={{paddingTop:20, borderTop:"1px solid var(--line)"}}>
                <Meta label="When" val="Sun · 9am"/>
                <Meta label="Where" val="Maadi Kitchen Co-op"/>
                <Meta label="Seats" val="6 of 8 taken"/>
                <Meta label="Price" val="180 EGP"/>
              </div>
              <div className="row gap-8 mt-24">
                <button className="btn btn-primary" onClick={() => onBook && onBook({title:"Intro to Sourdough", provider:"Hana M.", initials:"HM", price:40, mode:"In-person · Maadi", cat:"Cooking", catColor:"orange", rating:4.8})}>Reserve a seat →</button>
                <button className="btn btn-ghost" onClick={() => setDetail(SWAPPI.workshops[1])}>Read full details</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="wrap" style={{marginTop:48}}>
        <div className="row between center" style={{marginBottom:32}}>
          <h2 className="display" style={{fontSize:40, fontWeight:400, margin:0}}>
            {filter === "All" ? "This month" : filter}
            <span style={{fontSize:18, color:"var(--ink-3)", fontFamily:"var(--f-sans)", fontWeight:400, marginLeft:12}}>{filtered.length} workshops</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="card" style={{padding:80, textAlign:"center"}}>
            <div style={{fontFamily:"var(--f-serif)", fontSize:48, color:"var(--ink-4)"}}>∅</div>
            <h3 style={{fontFamily:"var(--f-serif)", fontSize:28, fontWeight:400, marginTop:16}}>Nothing matches right now.</h3>
            <p style={{color:"var(--ink-3)", marginTop:8}}>Try a different filter — new workshops drop every week.</p>
            <button className="btn btn-primary mt-24" onClick={() => setFilter("All")}>Show all workshops</button>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map((w, i) => (
              <article key={i} className="card" style={{padding:0, overflow:"hidden"}}>
                {w.img
                  ? <img src={w.img} alt={w.title} style={{width:"100%", aspectRatio:"5/3", objectFit:"cover", display:"block", borderBottom:"1px solid var(--line)"}} loading="lazy" />
                  : <Placeholder label={w.title.toUpperCase()+" · IMAGERY"} style={{aspectRatio:"5/3", borderRadius:0, borderWidth:0, borderBottom:"1px solid var(--line)"}}/>
                }
                <div className="wc-body" style={{padding:20}}>
                  <div className="row gap-6">
                    <span className="pill pill-blue" style={{height:24, fontSize:11}}>{w.location.toLowerCase().includes("online") ? "Online" : "In-person"}</span>
                    <span className="pill" style={{height:24, fontSize:11}}>{w.seats - w.taken} left</span>
                  </div>
                  <h3 className="wc-title" style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:22, lineHeight:1.15, margin:"14px 0 6px"}}>{w.title}</h3>
                  <p className="wc-host" style={{fontSize:13, color:"var(--ink-3)", margin:0}}>Hosted by {w.host} · {w.location}</p>

                  <div className="row between center wc-bottom mt-24" style={{paddingTop:16, borderTop:"1px solid var(--line-soft)"}}>
                    <div>
                      <div style={{fontSize:13, fontWeight:600}}>{w.date}</div>
                      <div style={{fontSize:11, color:"var(--ink-3)"}}>{w.time}</div>
                    </div>
                    <div className="col" style={{alignItems:"flex-end"}}>
                      <div style={{fontSize:16, fontWeight:700}}>{w.price} EGP</div>
                      <div className="wc-seat-dots" style={{display:"flex", gap:2, marginTop:4}}>
                        {Array.from({length:w.seats}).map((_,j) => (
                          <span key={j} style={{width:6, height:6, borderRadius:1, background: j<w.taken ? "var(--orange)" : "var(--cream-3)"}}></span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="row wc-btns gap-8 mt-16">
                    <button className="btn btn-sm btn-ghost wc-btn-detail" style={{flex:1, justifyContent:"center"}} onClick={() => setDetail(w)}>Details</button>
                    <button className="btn btn-sm btn-primary wc-btn-reserve" style={{flex:1, justifyContent:"center"}}
                      onClick={() => onBook && onBook({title:w.title, provider:w.host, initials:w.host.split(" ").map(n=>n[0]).join(""), price:w.price, mode:w.location, cat:"Workshop", catColor:"orange", rating:4.8})}>
                      Reserve
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Host CTA */}
      <section className="wrap" style={{marginTop:80}}>
        <div className="card surface-dark" style={{padding:64, position:"relative", color:"#fff", borderRadius:24, overflow:"hidden"}}>
          <div className="mesh-bg" style={{opacity:.5}}></div>
          <div style={{position:"relative", maxWidth:640}}>
            <span className="eyebrow" style={{color:"var(--orange-soft)"}}>For experienced teachers</span>
            <h2 className="display" style={{fontSize:"clamp(36px,5vw,60px)", color:"#fff", margin:"12px 0 16px"}}>Host your own workshop.</h2>
            <p style={{color:"rgba(255,255,255,0.7)", fontSize:17, lineHeight:1.55, marginBottom:32}}>
              We handle the booking, payments, reminders, and refunds. You pick the topic, set the price, and show up to teach. Average host earns 340 EGP per Saturday.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setPage && setPage("auth")}>Apply to host →</button>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {detail && <WorkshopDetailModal w={detail} onClose={() => setDetail(null)} onBook={onBook}/>}
    </main>
  );
}

function WorkshopDetailModal({ w, onClose, onBook }) {
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:640}}>
        {w.img && <img src={w.img} alt={w.title} style={{width:"100%", height:240, objectFit:"cover", borderRadius:"20px 20px 0 0"}}/>}
        <div style={{padding:32}}>
          <div className="row gap-8" style={{marginBottom:16}}>
            <span className="pill pill-blue">{w.location.toLowerCase().includes("online")?"Online":"In-person"}</span>
            <span className="pill pill-orange">{w.seats - w.taken} seats left</span>
          </div>
          <h2 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:32, margin:"0 0 12px", lineHeight:1.1}}>{w.title}</h2>
          <p style={{color:"var(--ink-2)", fontSize:16, lineHeight:1.65, margin:"0 0 24px"}}>
            A hands-on session hosted by <strong>{w.host}</strong>. Small group format — maximum {w.seats} participants. All skill levels welcome.
          </p>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24}}>
            <InfoBox label="Date" val={w.date}/>
            <InfoBox label="Time" val={w.time}/>
            <InfoBox label="Location" val={w.location}/>
            <InfoBox label="Price" val={`${w.price} EGP per person`}/>
          </div>
          <div className="row gap-8">
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
            <button className="btn btn-primary btn-lg" style={{flex:1, justifyContent:"center"}}
              onClick={() => { onClose(); onBook && onBook({title:w.title, provider:w.host, initials:w.host.split(" ").map(n=>n[0]).join(""), price:w.price, mode:w.location, cat:"Workshop", catColor:"orange", rating:4.8}); }}>
              Reserve a seat →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, val }) {
  return (
    <div style={{padding:"14px 18px", borderRadius:10, background:"var(--cream-2)"}}>
      <div style={{fontSize:10, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".1em", fontWeight:700}}>{label}</div>
      <div style={{fontSize:15, fontWeight:600, marginTop:4}}>{val}</div>
    </div>
  );
}

function Meta({ label, val }) {
  return (
    <div>
      <div style={{fontSize:10, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".1em"}}>{label}</div>
      <div style={{fontSize:14, fontWeight:600, marginTop:2}}>{val}</div>
    </div>
  );
}

window.WorkshopsPage = WorkshopsPage;
