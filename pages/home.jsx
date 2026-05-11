/* global React, SWAPPI, SwappiAtoms */
const { useState, useEffect, useRef, useMemo } = React;
const { Brand, Avatar, Rating, Reveal, Placeholder, SkillCard, ProviderCard, ReviewCard } = window.SwappiAtoms;

// ============================================================
//  HOME
// ============================================================

function HomePage({ setPage, onBook }) {
  return (
    <main data-screen-label="Home">
      <HomeHero setPage={setPage} />
      <SocialProof />
      <HowItWorks />
      <FeaturedSkills onBook={onBook} setPage={setPage} />
      <FeaturedProviders />
      <TrustSection />
      <CtaBand setPage={setPage} />
    </main>
  );
}

function HomeHero({ setPage }) {
  return (
    <section className="surface-dark" style={{paddingTop:80, paddingBottom:120, position:"relative"}}>
      <div className="mesh-bg"></div>
      <div className="wrap" style={{position:"relative", zIndex:3}}>
        <div style={{maxWidth: 980, margin:"40px auto 0", textAlign:"center"}}>
          <Reveal>
            <span className="pill pill-dark" style={{marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:99,background:"var(--orange)"}}></span>
              Welcoming our 12,400th member this week
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display" style={{fontSize:"clamp(56px, 9vw, 132px)", margin:"0", color:"#fff"}}>
              Swap skills.<br/>
              <span className="grad-text">Learn anything.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{fontSize:20, lineHeight:1.5, color:"rgba(255,255,255,0.7)", maxWidth:620, margin:"32px auto 0"}}>
              I traded my web design for Arabic lessons, then sourdough for pottery. Swappi is how people I'd never have met taught me things I'd never have learned.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="row mob-col gap-12 center" style={{justifyContent:"center", marginTop:40}}>
              <button className="btn btn-lg btn-primary mob-full" onClick={() => setPage("browse")}>Find a skill to learn →</button>
              <button className="btn btn-lg btn-ghost mob-full" onClick={() => setPage("auth")}>I want to teach</button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <div style={{marginTop:80, position:"relative"}}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=600&q=80&auto=format&fit=crop"
              alt="People learning together"
              style={{width:"100%", aspectRatio:"21/9", objectFit:"cover", objectPosition:"center 30%", borderRadius:24, display:"block"}}
            />
            <FloatingStat style={{top:24, left:24}} top="12,400+" label="curious members" className="mob-hide"/>
            <FloatingStat style={{top:60, right:32}} top="8,210" label="successful swaps" className="mob-hide"/>
            <FloatingStat style={{bottom:32, left:"38%"}} top="4.8 ★" label="across 6,400 reviews" className="mob-hide"/>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatingStat({ top, label, style, className = "" }) {
  return (
    <div className={className} style={{
      position:"absolute", ...style,
      background:"rgba(255,255,255,0.06)",
      backdropFilter:"blur(16px) saturate(1.4)",
      WebkitBackdropFilter:"blur(16px) saturate(1.4)",
      border:"1px solid rgba(255,255,255,0.14)",
      borderRadius:16,
      padding:"14px 18px",
      color:"#fff",
      animation:"drift 12s ease-in-out infinite alternate",
    }}>
      <div style={{fontFamily:"var(--f-serif)", fontSize:28, lineHeight:1}}>{top}</div>
      <div style={{fontSize:12, color:"rgba(255,255,255,0.65)", marginTop:6, letterSpacing:".02em"}}>{label}</div>
    </div>
  );
}

function SocialProof() {
  const all = [...SWAPPI.partners, ...SWAPPI.partners];
  return (
    <section style={{padding:"40px 0", background:"var(--cream)", borderBottom:"1px solid var(--line)"}}>
      <div className="wrap">
        <div className="row between center" style={{marginBottom:24, flexWrap:"wrap", gap:16}}>
          <span className="eyebrow">As featured in / partnered with</span>
          <span style={{fontSize:13, color:"var(--ink-3)"}}>Press kit →</span>
        </div>
      </div>
      <div className="marquee-wrap">
        <div className="marquee">
          {all.map((p, i) => (
            <div key={i} style={{fontFamily:"var(--f-serif)", fontSize:32, color:"var(--ink-3)", opacity:.6, letterSpacing:"-0.02em"}}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" style={{background: "linear-gradient(180deg, var(--char) 0%, var(--char) 50%, var(--cream) 50%, var(--cream) 100%)", padding:0}}>
      <div className="surface-dark" style={{padding:"clamp(80px, 11vw, 140px) 0 80px", background:"transparent"}}>
        <div className="wrap">
          <div style={{maxWidth:760}}>
            <Reveal><span className="eyebrow" style={{color:"var(--orange-soft)"}}>How it works</span></Reveal>
            <Reveal delay={80}><h2 className="display" style={{fontSize:"clamp(40px, 6vw, 76px)", color:"#fff", margin:"16px 0 0"}}>Four steps, one afternoon, then you're off.</h2></Reveal>
          </div>
        </div>
      </div>
      <div className="wrap" style={{paddingBottom:"clamp(64px,8vw,120px)"}}>
        <div style={{
          background:"var(--paper)",
          borderRadius:24,
          padding:"clamp(32px,5vw,64px)",
          marginTop:-60,
          position:"relative",
          zIndex:2,
          boxShadow:"var(--shadow-3)",
          border:"1px solid var(--line)",
        }}>
          <div className="grid-steps">
            {SWAPPI.steps.map((s, i) => (
              <Reveal key={s.n} delay={i*80}>
                <div style={{position:"relative"}}>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:12, color:"var(--orange-deep)", letterSpacing:".12em"}}>{s.n}</div>
                  <div style={{width:48, height:48, borderRadius:14, background: i%2===0 ? "var(--orange)" : "var(--blue)", marginTop:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"var(--f-serif)", fontSize:22}}>
                    {["✎","◎","↔","★"][i]}
                  </div>
                  <h3 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:24, lineHeight:1.15, margin:"20px 0 10px"}}>{s.title}</h3>
                  <p style={{margin:0, color:"var(--ink-3)", fontSize:14.5, lineHeight:1.55}}>{s.body}</p>
                  {i < 3 && <div style={{position:"absolute", top:36, right:-22, width:24, height:1, background:"var(--line)"}}></div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedSkills({ onBook, setPage }) {
  const featured = SWAPPI.skills.slice(0, 6);
  return (
    <section className="section">
      <div className="wrap">
        <div className="row between center" style={{flexWrap:"wrap", gap:24, marginBottom:48}}>
          <div>
            <Reveal><span className="eyebrow">Featured this week</span></Reveal>
            <Reveal delay={80}><h2 className="display" style={{fontSize:"clamp(40px, 5vw, 64px)", margin:"12px 0 0"}}>Skills people are loving right now.</h2></Reveal>
          </div>
          <button className="btn btn-ghost mob-full mob-center" onClick={() => setPage("browse")}>Browse all 1,800+ →</button>
        </div>
        <div className="grid-3">
          {featured.map((s, i) => (
            <Reveal key={s.id} delay={i*60}><SkillCard s={s} onBook={onBook} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProviders() {
  return (
    <section className="section" style={{background:"var(--cream-2)"}}>
      <div className="wrap">
        <div className="row between center" style={{marginBottom:48, flexWrap:"wrap", gap:24}}>
          <div>
            <Reveal><span className="eyebrow">Top providers</span></Reveal>
            <Reveal delay={80}><h2 className="display" style={{fontSize:"clamp(40px, 5vw, 64px)", margin:"12px 0 0"}}>Teachers worth showing up for.</h2></Reveal>
          </div>
        </div>
        <div className="grid-4">
          {SWAPPI.providers.map((p, i) => (
            <Reveal key={p.name} delay={i*60}><ProviderCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="surface-dark section">
      <div className="wrap">
        <div style={{maxWidth:720}}>
          <Reveal><span className="eyebrow" style={{color:"var(--orange-soft)"}}>Built on trust</span></Reveal>
          <Reveal delay={80}><h2 className="display" style={{fontSize:"clamp(40px, 6vw, 76px)", color:"#fff", margin:"16px 0 0"}}>Real people, verified, reviewed, and held accountable.</h2></Reveal>
        </div>
        <div className="grid-trust" style={{marginTop:64}}>
          {SWAPPI.trustPillars.map((p, i) => (
            <Reveal key={i} delay={i*70}>
              <div>
                <div style={{width:44, height:44, borderRadius:12, background: i%2===0 ? "var(--orange)" : "var(--blue)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"var(--f-serif)", fontSize:20}}>
                  {["✓","★","⟲","◎"][i]}
                </div>
                <div className="display" style={{fontSize:"clamp(40px, 4vw, 56px)", color:"#fff", marginTop:24}}>{p.stat}</div>
                <div style={{fontSize:13, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:".1em", marginTop:8}}>{p.label}</div>
                <p style={{fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.55, marginTop:14}}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ setPage }) {
  const [confetti, setConfetti] = useState([]);
  const burst = () => {
    const arr = Array.from({length:24}, (_,i)=>({
      id: Date.now()+i,
      tx: (Math.random()-0.5)*420 + "px",
      ty: (Math.random()-1.1)*340 + "px",
      bg: ["var(--orange)","var(--blue)","#fff","var(--char)"][i%4],
      l: Math.random()*100 + "%",
    }));
    setConfetti(arr);
    setTimeout(()=>setConfetti([]), 1000);
  };
  return (
    <section style={{padding:"clamp(80px,10vw,120px) 0", background:"linear-gradient(135deg, var(--orange) 0%, var(--orange-deep) 60%, oklch(0.5 0.16 35) 100%)", position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, opacity:0.12, background:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><circle cx='50' cy='50' r='1' fill='white'/></svg>\")", backgroundSize:"24px 24px"}}></div>
      <div className="wrap" style={{position:"relative", textAlign:"center"}}>
        <Reveal>
          <h2 className="display" style={{fontSize:"clamp(48px, 8vw, 108px)", color:"#1a0e00", margin:0, lineHeight:0.95}}>
            What will you<br/>trade first?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{fontSize:18, color:"rgba(26,14,0,0.7)", maxWidth:560, margin:"24px auto 40px"}}>
            Free to join. Free to swap. We're only along for the ride.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div style={{position:"relative", display:"inline-block"}}>
            <button className="btn btn-lg" onClick={() => { burst(); setPage("auth"); }} onMouseEnter={burst}
              style={{background:"var(--char)", color:"#fff", height:64, padding:"0 36px", fontSize:17}}>
              Get started — it's free →
            </button>
            <div className="confetti">
              {confetti.map(c => <span key={c.id} style={{ left:c.l, top:0, background:c.bg, "--tx":c.tx, "--ty":c.ty }}/>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.HomePage = HomePage;
