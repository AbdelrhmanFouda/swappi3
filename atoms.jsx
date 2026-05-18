/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
//  Shared atoms
// ============================================================

// — mobile detection hook (shared across all pages via window)
function useIsMobile(bp = 768) {
  const [mob, setMob] = useState(window.innerWidth <= bp);
  useEffect(() => {
    const h = () => setMob(window.innerWidth <= bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mob;
}
window.useIsMobile = useIsMobile;

// Global imperative toast — callable from any button handler
window.showToast = function(text, emoji) {
  const existing = document.querySelectorAll(".toast");
  existing.forEach(t => t.remove());
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span style="margin-right:8px;color:var(--orange)">${emoji||"✓"}</span>${text}`;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .4s"; setTimeout(() => el.remove(), 400); }, 3000);
};

function Brand() {
  return (
    <div className="brand">
      <img src="logo.png" alt="swappi" style={{height:38, objectFit:"contain", mixBlendMode:"multiply"}}/>
    </div>
  );
}

function Avatar({ initials, size = "md", color, verified }) {
  const palette = {
    orange: "linear-gradient(135deg, oklch(0.82 0.13 60), oklch(0.65 0.18 42))",
    blue:   "linear-gradient(135deg, oklch(0.62 0.16 250), oklch(0.42 0.18 258))",
    cream:  "linear-gradient(135deg, oklch(0.92 0.04 70), oklch(0.78 0.06 60))",
  };
  const auto = ["orange","blue","cream"][(initials.charCodeAt(0) + initials.charCodeAt(1)) % 3];
  const bg = palette[color || auto];
  return (
    <span className={"av av-" + size + (verified ? " av-verified" : "")}
      style={{ background: bg, color: color === "cream" ? "var(--ink)" : "#fff", borderColor: "var(--paper)" }}>
      {initials}
    </span>
  );
}

function Rating({ value }) {
  return <span className="rating">{value.toFixed(1)}</span>;
}

function Reveal({ children, delay = 0, as: As = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.disconnect();
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <As ref={ref} className="reveal" {...rest}>{children}</As>;
}

function Placeholder({ label, dark, style, className = "", src }) {
  if (src) {
    return (
      <div className={className} style={{ ...style, overflow: "hidden", position: "relative" }}>
        <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={"ph " + (dark ? "ph-dark " : "") + className} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

// ============================================================
//  Nav (top) + Footer
// ============================================================

function Nav({ page, setPage, dark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { id: "home",      label: "Home" },
    { id: "browse",    label: "Browse" },
    { id: "workshops", label: "Workshops" },
    { id: "pricing",   label: "Pricing" },
  ];
  const go = (id) => { setPage(id); setMenuOpen(false); };

  return (
    <>
      <header className={"nav-shell" + (dark ? " dark" : "")}>
        <div className="nav-inner">
          <a onClick={() => go("home")} style={{cursor:"pointer", flexShrink:0}}><Brand /></a>

          {/* Desktop nav links — hidden on mobile via CSS */}
          <nav className="nav-links">
            {items.map(i => (
              <a key={i.id} className={page === i.id ? "active" : ""} onClick={() => go(i.id)}>{i.label}</a>
            ))}
          </nav>

          {/* Desktop user row — hidden on mobile via CSS */}
          <div className="row gap-12 center nav-user-row">
            <a onClick={() => go("dashboard")} className="row gap-8 center" style={{cursor:"pointer", fontSize:14, fontWeight:500}}>
              <Avatar initials="YO" size="sm" color="orange" />
              <span style={{opacity:.8}}>Dashboard</span>
            </a>
            <button className="btn btn-sm btn-primary" onClick={() => go("auth")}>Sign in</button>
          </div>

          {/* Hamburger — shown only on mobile via CSS */}
          <button
            className="nav-mob-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              display:"none", background:"none",
              border:"1px solid var(--line)", borderRadius:10,
              width:40, height:40, alignItems:"center", justifyContent:"center",
              cursor:"pointer", fontSize:18, flexShrink:0,
              color: dark ? "#fff" : "var(--ink)"
            }}
          >{menuOpen ? "✕" : "☰"}</button>
        </div>
      </header>

      {/* Mobile menu overlay — rendered OUTSIDE header so backdrop-filter doesn't trap it */}
      {menuOpen && (
        <div style={{
          position:"fixed", inset:0, zIndex:500,
          background:"var(--paper)",
          display:"flex", flexDirection:"column",
          overflowY:"auto",
          paddingTop:61,
        }}>
          {/* Close bar */}
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderBottom:"1px solid var(--line)"}}>
            <Brand />
            <button onClick={() => setMenuOpen(false)} style={{background:"none", border:"1px solid var(--line)", borderRadius:10, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, cursor:"pointer", color:"var(--ink)"}}>✕</button>
          </div>

          {/* Nav links */}
          <div style={{padding:"12px 16px", flex:1}}>
            {items.map(i => (
              <a key={i.id} onClick={() => go(i.id)} style={{
                display:"block", padding:"14px 16px", fontSize:20,
                fontWeight: page === i.id ? 700 : 500,
                borderRadius:12, marginBottom:4, cursor:"pointer",
                background: page === i.id ? "var(--cream-2)" : "transparent",
                color: page === i.id ? "var(--ink)" : "var(--ink-2)",
                borderLeft: page === i.id ? "3px solid var(--orange)" : "3px solid transparent",
              }}>{i.label}</a>
            ))}
          </div>

          {/* Auth buttons at the bottom */}
          <div style={{padding:"20px 16px", borderTop:"1px solid var(--line)", display:"flex", gap:10}}>
            <button className="btn btn-ghost" style={{flex:1, justifyContent:"center"}} onClick={() => go("dashboard")}>Dashboard</button>
            <button className="btn btn-primary" style={{flex:1, justifyContent:"center"}} onClick={() => go("auth")}>Sign in</button>
          </div>
        </div>
      )}
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="foot surface-dark">
      <div className="wrap">
        <div className="foot-cols" style={{display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr", gap:48}}>
          <div className="foot-brand">
            <Brand />
            <p className="muted" style={{maxWidth: 320, marginTop: 16, fontSize: 14, lineHeight: 1.6}}>
              A peer-to-peer platform for trading what you know. Teach a little, learn a lot.
            </p>
            <div className="row gap-8 mt-24">
              {[["x","Twitter/X"],["ig","Instagram"],["in","LinkedIn"],["yt","YouTube"]].map(([n, name]) =>
                <div key={n} onClick={() => window.showToast && window.showToast(`Follow us on ${name} — coming soon`, "📣")} style={{width:36,height:36,borderRadius:10,border:"1px solid var(--line-dark)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontFamily:"var(--f-mono)",color:"rgba(255,255,255,0.7)",cursor:"pointer"}}>{n}</div>
              )}
            </div>
          </div>
          <FootCol title="Product" items={[
            ["Browse skills", "browse"],
            ["Workshops", "workshops"],
            ["Pricing", "pricing"],
            ["Dashboard", "dashboard"],
          ]} setPage={setPage}/>
          <FootCol title="Company" items={[
            ["About", null], ["Press", null], ["Careers", null], ["Contact", null]
          ]} />
          <FootCol title="Trust" items={[
            ["Community guidelines", null], ["Safety", null], ["Privacy", null], ["Terms", null]
          ]} />
        </div>
        <div className="row between" style={{marginTop:64, paddingTop:24, borderTop:"1px solid var(--line-dark)", fontSize:12, color:"rgba(255,255,255,0.5)"}}>
          <span>© 2026 Swappi, Inc. — Made with care.</span>
          <span style={{fontFamily:"var(--f-mono)"}}>v3.0.0</span>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, items, setPage }) {
  return (
    <div>
      <div style={{fontSize:12, letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", marginBottom:16}}>{title}</div>
      <div className="col gap-12">
        {items.map(([label, target], i) =>
          <a key={i} onClick={() => target ? (setPage && setPage(target)) : window.showToast && window.showToast(`${label} — coming soon`, "📌")} style={{cursor:"pointer", fontSize:14}}>{label}</a>
        )}
      </div>
    </div>
  );
}

// ============================================================
//  Cards used across pages
// ============================================================

function SkillCard({ s, onBook }) {
  return (
    <article className="card" style={{padding: 0, overflow:"hidden", position:"relative"}}>
      <div style={{position:"relative"}}>
        <Placeholder label={s.cat.toUpperCase() + " · LESSON IMAGERY"} src={s.img} style={{aspectRatio:"4/3", borderRadius:0, borderWidth:0, borderBottom:"1px solid var(--line)"}}/>
        <div style={{position:"absolute", top:10, left:10, display:"flex", gap:5}}>
          <span className={"pill pill-" + s.catColor} style={{height:24, fontSize:11}}>{s.cat}</span>
          {s.swap && <span className="pill sc-swap-pill" style={{background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)", height:24, fontSize:11}}>↔ Swap</span>}
        </div>
      </div>
      <div className="sc-body" style={{padding: 18}}>
        <h3 className="sc-title" style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:22, lineHeight:1.15, margin:"0 0 14px", letterSpacing:"-0.01em"}}>{s.title}</h3>
        <div className="row between center sc-meta" style={{marginTop:8}}>
          <div className="row gap-8 center">
            <Avatar initials={s.initials} size="sm" />
            <div className="col">
              <span style={{fontSize:13, fontWeight:500}}>{s.provider}</span>
              <span style={{fontSize:11, color:"var(--ink-3)"}}>{s.mode}</span>
            </div>
          </div>
          <div className="col" style={{alignItems:"flex-end"}}>
            <Rating value={s.rating} />
            <span style={{fontSize:11, color:"var(--ink-3)"}}>{s.reviews} reviews</span>
          </div>
        </div>
        <div className="row between center" style={{marginTop:14, paddingTop:12, borderTop:"1px solid var(--line-soft)"}}>
          <div>
            <span className="sc-price-from" style={{fontSize:11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em"}}>From</span>
            <div className="sc-price" style={{fontSize:18, fontWeight:600}}>${s.price}<span className="sc-per-session" style={{fontSize:13, color:"var(--ink-3)", fontWeight:400}}> / session</span></div>
          </div>
          <button className="btn btn-sm btn-primary" onClick={() => onBook && onBook(s)}>Book →</button>
        </div>
      </div>
    </article>
  );
}

function ProviderCard({ p }) {
  return (
    <article className="card" style={{padding:24, position:"relative", overflow:"hidden"}}>
      <div style={{position:"absolute", inset:0, opacity:0.08, background:`radial-gradient(circle at 30% 0%, ${p.color === "orange" ? "var(--orange)" : "var(--blue)"}, transparent 60%)`}}></div>
      <div style={{position:"relative"}}>
        <div className="row between">
          <Avatar initials={p.initials} size="lg" color={p.color} verified />
          <span className="pill pill-orange">★ {p.badge}</span>
        </div>
        <h3 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:24, lineHeight:1.1, margin:"22px 0 6px"}}>{p.name}</h3>
        <p style={{color:"var(--ink-3)", fontSize:14, margin:0}}>{p.title}</p>
        <div className="row gap-24 mt-24" style={{paddingTop:18, borderTop:"1px solid var(--line-soft)"}}>
          <div>
            <div style={{fontFamily:"var(--f-serif)", fontSize:26}}>{p.swaps}</div>
            <div style={{fontSize:11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em"}}>swaps</div>
          </div>
          <div>
            <div style={{fontFamily:"var(--f-serif)", fontSize:26}}>{p.rating.toFixed(1)}<span style={{color:"var(--orange)"}}> ★</span></div>
            <div style={{fontSize:11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em"}}>rating</div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ReviewCard({ r }) {
  return (
    <article className="card" style={{padding:24}}>
      <div className="row gap-12 center">
        <Avatar initials={r.initials} size="md" />
        <div className="col">
          <span style={{fontSize:14, fontWeight:600}}>{r.name}</span>
          <span style={{fontSize:12, color:"var(--ink-3)"}}>{r.days} days ago</span>
        </div>
        <span style={{marginLeft:"auto", color:"var(--orange)"}}>{"★".repeat(r.rating)}<span style={{color:"var(--cream-3)"}}>{"★".repeat(5-r.rating)}</span></span>
      </div>
      <p style={{margin:"16px 0 0", fontSize:15, lineHeight:1.55, color:"var(--ink-2)"}}>"{r.quote}"</p>
    </article>
  );
}

window.SwappiAtoms = { Brand, Avatar, Rating, Reveal, Placeholder, Nav, Footer, SkillCard, ProviderCard, ReviewCard, useIsMobile };
