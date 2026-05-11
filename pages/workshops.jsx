/* global React, SWAPPI, SwappiAtoms */
const { useState } = React;
const { Avatar, Placeholder } = window.SwappiAtoms;

// ============================================================
//  WORKSHOPS
// ============================================================

function WorkshopsPage({ onBook }) {
  const [filter, setFilter] = useState("All");
  return (
    <main data-screen-label="Workshops" style={{background:"var(--cream)", paddingBottom:120}}>
      <section style={{padding:"56px 0 32px"}}>
        <div className="wrap">
          <span className="eyebrow">Workshops · weekly drops</span>
          <div className="row between" style={{flexWrap:"wrap", gap:24, marginTop:12}}>
            <h1 className="display" style={{fontSize:"clamp(40px,6vw,80px)", margin:0, maxWidth:900}}>
              Small groups. Real rooms. <span style={{color:"var(--orange)"}}>Done in a weekend.</span>
            </h1>
            <div className="row gap-8" style={{alignItems:"flex-end"}}>
              {["All","Online","In-person","This week"].map(f=>(
                <button key={f} className="pill" onClick={()=>setFilter(f)} style={{
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
      <section className="wrap">
        <div className="card" style={{padding:0, overflow:"hidden", display:"grid", gridTemplateColumns:"1.1fr 1fr", minHeight:380}}>
          <img src="https://images.unsplash.com/photo-1574781625673-7e4aa09c47af?w=700&q=80&auto=format&fit=crop" alt="Sourdough workshop" style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}} />
          <div style={{padding:48, display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <span className="pill pill-orange">★ This weekend</span>
            <h2 className="display" style={{fontSize:44, fontWeight:400, margin:"16px 0 12px", lineHeight:1.05}}>Intro to Sourdough — Sunday, Maadi</h2>
            <p style={{color:"var(--ink-3)", fontSize:16, lineHeight:1.6, margin:0}}>
              Three hours with Hana in a working kitchen. You'll leave with a starter, a loaf, and the confidence to keep going.
            </p>
            <div className="row gap-24 mt-24" style={{paddingTop:20, borderTop:"1px solid var(--line)"}}>
              <Meta label="When" val="Sun · 9am"/>
              <Meta label="Where" val="Maadi Kitchen Co-op"/>
              <Meta label="Seats" val="6 of 8 taken"/>
              <Meta label="Price" val="$40"/>
            </div>
            <div className="row gap-8 mt-24">
              <button className="btn btn-primary" onClick={()=>onBook && onBook({title:"Intro to Sourdough", provider:"Hana M.", initials:"HM", price:40, mode:"In-person · Maadi", cat:"Cooking", catColor:"orange", rating:4.8})}>Reserve a seat →</button>
              <button className="btn btn-ghost">Read full details</button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="wrap" style={{marginTop:48}}>
        <h2 className="display" style={{fontSize:40, fontWeight:400, margin:"0 0 32px"}}>This month</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24}}>
          {SWAPPI.workshops.map((w,i) => (
            <article key={i} className="card" style={{padding:0, overflow:"hidden"}}>
              {w.img
                ? <img src={w.img} alt={w.title} style={{width:"100%", aspectRatio:"5/3", objectFit:"cover", display:"block", borderBottom:"1px solid var(--line)"}} loading="lazy" />
                : <Placeholder label={w.title.toUpperCase()+" · IMAGERY"} style={{aspectRatio:"5/3", borderRadius:0, borderWidth:0, borderBottom:"1px solid var(--line)"}}/>
              }
              <div style={{padding:24}}>
                <div className="row gap-8">
                  <span className="pill pill-blue">{w.location.startsWith("Online") ? "Online" : "In-person"}</span>
                  <span className="pill">{w.seats - w.taken} seats left</span>
                </div>
                <h3 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:24, lineHeight:1.15, margin:"16px 0 8px"}}>{w.title}</h3>
                <p style={{fontSize:13, color:"var(--ink-3)", margin:0}}>Hosted by {w.host} · {w.location}</p>

                <div className="row between center mt-24" style={{paddingTop:18, borderTop:"1px solid var(--line-soft)"}}>
                  <div>
                    <div style={{fontSize:13, fontWeight:600}}>{w.date}</div>
                    <div style={{fontSize:11, color:"var(--ink-3)"}}>{w.time}</div>
                  </div>
                  <div className="col" style={{alignItems:"flex-end"}}>
                    <div style={{fontSize:18, fontWeight:600}}>${w.price}</div>
                    <div style={{display:"flex", gap:2, marginTop:4}}>
                      {Array.from({length:w.seats}).map((_,j)=>(
                        <span key={j} style={{width:6, height:6, borderRadius:1, background: j<w.taken ? "var(--orange)" : "var(--cream-3)"}}></span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="btn btn-sm btn-ghost mt-16" style={{width:"100%", justifyContent:"center"}} onClick={()=>onBook && onBook({title:w.title, provider:w.host, initials:w.host.split(" ").map(n=>n[0]).join(""), price:w.price, mode:w.location, cat:"Workshop", catColor:"orange", rating:4.8})}>Reserve a seat</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Host CTA */}
      <section className="wrap" style={{marginTop:80}}>
        <div className="card surface-dark" style={{padding:64, position:"relative", color:"#fff", borderRadius:24, overflow:"hidden"}}>
          <div className="mesh-bg" style={{opacity:.5}}></div>
          <div style={{position:"relative", maxWidth:640}}>
            <span className="eyebrow" style={{color:"var(--orange-soft)"}}>For experienced teachers</span>
            <h2 className="display" style={{fontSize:"clamp(36px,5vw,60px)", color:"#fff", margin:"12px 0 16px"}}>Host your own workshop.</h2>
            <p style={{color:"rgba(255,255,255,0.7)", fontSize:17, lineHeight:1.55, marginBottom:32}}>
              We handle the booking, payments, reminders, and refunds. You pick the topic, set the price, and show up to teach. Average host earns $340 per Saturday.
            </p>
            <button className="btn btn-primary btn-lg">Apply to host →</button>
          </div>
        </div>
      </section>
    </main>
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
