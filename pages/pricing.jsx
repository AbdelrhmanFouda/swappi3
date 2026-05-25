/* global React */
const { useState } = React;

// ============================================================
//  PRICING  — 2 tiers, priced in EGP
// ============================================================

function PricingPage({ setPage }) {
  const [annual, setAnnual] = useState(true);

  const MONTHLY_EGP = 299;
  const ANNUAL_EGP  = 199;   // per month, billed 2,388 EGP / year
  const price = annual ? ANNUAL_EGP : MONTHLY_EGP;

  const premiumFeatures = [
    {
      icon: "★",
      color: "orange",
      title: "Premium Visibility",
      body: "Your profile is shown first in search results and recommended to learners — on average 3× more views.",
    },
    {
      icon: "📦",
      color: "blue",
      title: "Course Bundle",
      body: "Buy or offer a group of skills as one bundle at a 20% discount. Great for full courses and multi-skill tracks.",
    },
    {
      icon: "🔔",
      color: "orange",
      title: "Early Access",
      body: "Get notified about new workshops and promos 48 hrs before everyone else. Priority registration — no more sold-out seats.",
    },
    {
      icon: "✓",
      color: "blue",
      title: "Verified ID Badge",
      body: "A trust badge on your public profile after ID confirmation. Converts browsers into bookers.",
    },
  ];

  const freeFeatures = [
    "Browse all 1,800+ public skills",
    "Up to 3 swap matches / month",
    "Basic messaging",
    "Public profile page",
    "Access to all workshop listings",
  ];

  return (
    <main data-screen-label="Pricing" style={{background:"var(--cream)", paddingBottom:120}}>

      {/* ── Hero ── */}
      <section style={{padding:"72px 0 40px", textAlign:"center"}}>
        <div className="wrap">
          <span className="eyebrow">Pricing</span>
          <h1 className="display" style={{fontSize:"clamp(40px,6vw,80px)", margin:"16px auto 0", maxWidth:820, lineHeight:1.05}}>
            Free to start.<br/>Premium when you're ready.
          </h1>
          <p style={{fontSize:18, color:"var(--ink-3)", marginTop:20, maxWidth:560, marginInline:"auto", lineHeight:1.6}}>
            Everything you need to swap skills is free — forever. Upgrade when you want to grow faster.
          </p>

          {/* Toggle */}
          <div className="row gap-12 center" style={{marginTop:36, justifyContent:"center"}}>
            <span style={{fontSize:14, fontWeight: annual?400:600, color: annual?"var(--ink-3)":"var(--ink)"}}>Monthly</span>
            <button onClick={()=>setAnnual(a=>!a)} style={{
              width:56, height:32, borderRadius:99,
              background: annual ? "var(--orange)" : "var(--cream-3)",
              border:"none", position:"relative", cursor:"pointer", transition:"background .25s"
            }}>
              <span style={{position:"absolute", top:3, left:annual?27:3, width:26, height:26, borderRadius:"50%", background:"#fff", transition:"left .25s cubic-bezier(.2,.7,.2,1)", boxShadow:"var(--shadow-1)"}}></span>
            </button>
            <span style={{fontSize:14, fontWeight: annual?600:400, color: annual?"var(--ink)":"var(--ink-3)"}}>Annual</span>
            <span className="pill pill-blue" style={{marginLeft:4}}>Save 33%</span>
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="wrap" style={{marginTop:16}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:24, alignItems:"start"}}
          className="grid-mob-1">

          {/* Free */}
          <div className="card" style={{padding:"clamp(20px,4vw,32px)"}}>
            <div style={{fontSize:13, color:"var(--ink-3)"}}>For curious beginners</div>
            <h2 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:36, margin:"8px 0 12px"}}>Free</h2>
            <div style={{display:"flex", alignItems:"baseline", gap:6}}>
              <span className="display" style={{fontSize:64, lineHeight:1}}>0</span>
              <span style={{color:"var(--ink-3)", fontSize:15}}>EGP / forever</span>
            </div>

            <button className="btn btn-ghost mt-24" style={{width:"100%", justifyContent:"center", height:50}} onClick={()=>setPage("auth")}>
              Start free →
            </button>

            <div className="col gap-12" style={{marginTop:28, paddingTop:24, borderTop:"1px solid var(--line-soft)"}}>
              {freeFeatures.map((f,i) => (
                <div key={i} className="row gap-12 center" style={{fontSize:14}}>
                  <span style={{width:20, height:20, borderRadius:"50%", background:"var(--cream-3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"var(--ink-3)", flexShrink:0}}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="card" style={{
            padding:"clamp(20px,4vw,36px)", position:"relative",
            border:"2px solid var(--orange)",
            boxShadow:"0 0 0 6px color-mix(in oklch, var(--orange) 12%, transparent), var(--shadow-2)",
            background:"var(--paper)"
          }}>
            <span className="pill pill-orange" style={{position:"absolute", top:-13, left:32}}>★ Most popular</span>
            <div style={{fontSize:13, color:"var(--ink-3)"}}>For people growing fast</div>
            <h2 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:36, margin:"8px 0 4px"}}>Premium</h2>

            <div style={{display:"flex", alignItems:"baseline", gap:6, marginBottom:4}}>
              <span className="display" style={{fontSize:64, lineHeight:1, transition:"all .3s"}}>{price}</span>
              <div>
                <div style={{color:"var(--ink-3)", fontSize:15}}>EGP / mo</div>
                {annual && <div style={{fontSize:11, color:"var(--ink-3)"}}>billed {(price*12).toLocaleString()} EGP / year</div>}
              </div>
            </div>
            {!annual && <div style={{fontSize:12, color:"var(--ink-3)", marginBottom:8}}>or {ANNUAL_EGP} EGP/mo billed annually — save {MONTHLY_EGP-ANNUAL_EGP} EGP/mo</div>}

            <button className="btn btn-primary mt-16" style={{width:"100%", justifyContent:"center", height:52, fontSize:16}} onClick={()=>setPage("auth")}>
              Start Premium →
            </button>

            {/* Feature cards */}
            <div className="col gap-14" style={{marginTop:28, paddingTop:24, borderTop:"1px solid var(--line-soft)"}}>
              <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"var(--ink-3)"}}>Everything in Free, plus:</div>
              {premiumFeatures.map((f,i) => (
                <div key={i} style={{display:"flex", gap:14, alignItems:"flex-start", padding:"14px 16px", borderRadius:12,
                  background: f.color==="orange" ? "var(--orange-soft)" : "var(--blue-soft)"}}>
                  <div style={{
                    width:36, height:36, borderRadius:10, flexShrink:0,
                    background: f.color==="orange" ? "var(--orange)" : "var(--blue)",
                    color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16
                  }}>{f.icon}</div>
                  <div>
                    <div style={{fontWeight:700, fontSize:14}}>{f.title}</div>
                    <div style={{fontSize:12, color:"var(--ink-3)", marginTop:3, lineHeight:1.5}}>{f.body}</div>
                  </div>
                </div>
              ))}
              {/* Extra bullets */}
              {["Unlimited swap matches", "Priority messaging"].map((f,i) => (
                <div key={i} className="row gap-12 center" style={{fontSize:14}}>
                  <span style={{width:20, height:20, borderRadius:"50%", background:"var(--blue)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:"#fff", flexShrink:0}}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Rank callout ── */}
      <section className="wrap" style={{marginTop:64}}>
        <div className="card" style={{padding:"clamp(24px,5vw,48px)", background:"var(--paper)", borderRadius:20}}>
          <div className="row between" style={{flexWrap:"wrap", gap:32, alignItems:"center"}}>
            <div style={{maxWidth:480}}>
              <span className="eyebrow">Rank system</span>
              <h2 className="display" style={{fontSize:"clamp(28px,4vw,44px)", margin:"12px 0 10px"}}>Earn your rank with every swap.</h2>
              <p style={{color:"var(--ink-3)", fontSize:15, lineHeight:1.6, margin:0}}>
                Every swap you complete moves you up a rank — visible on your public profile. No grades, no tests. Just real teaching and learning.
              </p>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:10, minWidth:220}}>
              {[
                {swaps:"0 – 9",  label:"Newcomer", icon:"🌱", bg:"var(--cream-3)",    color:"var(--ink-3)"},
                {swaps:"10 – 14",label:"Skilled",  icon:"⭐", bg:"var(--orange-soft)", color:"var(--orange-deep)"},
                {swaps:"15 – 19",label:"Expert",   icon:"💎", bg:"var(--blue-soft)",   color:"var(--blue)"},
                {swaps:"20+",    label:"Master",   icon:"👑", bg:"var(--blue-soft)",   color:"var(--blue)"},
              ].map((r,i) => (
                <div key={i} className="row gap-14 center" style={{padding:"10px 16px", borderRadius:10, background:r.bg}}>
                  <span style={{fontSize:20}}>{r.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700, fontSize:14, color:r.color}}>{r.label}</div>
                    <div style={{fontSize:11, color:"var(--ink-3)"}}>{r.swaps} swaps</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="wrap" style={{marginTop:96}}>
        <div className="row between" style={{flexWrap:"wrap", gap:48}}>
          <div style={{maxWidth:320, minWidth:200}}>
            <span className="eyebrow">FAQ</span>
            <h2 className="display" style={{fontSize:"clamp(32px,4vw,48px)", margin:"12px 0 0"}}>Honest answers.</h2>
          </div>
          <div style={{flex:1, minWidth:"min(480px,100%)", maxWidth:720}}>
            {[
              ["Do I have to pay to use Swappi?",    "No. Free is forever free — browse, swap, and message without spending a pound."],
              ["What's a 'swap'?",                   "Two people teach each other something. No money changes hands. Our best stories started as swaps."],
              ["How does Premium billing work?",     "We charge in EGP via card. Annual plans are charged once a year and save you 33%. Cancel any time from your dashboard."],
              ["Can I cancel my Premium anytime?",   "Yes. Cancel from your settings. Annual plans get prorated refunds for unused months."],
              ["What is the Verified ID Badge?",     "After a quick identity check, we show a ✓ badge on your profile. Learners book verified teachers 2× more often."],
              ["What is a Course Bundle?",           "A bundle groups 3 or more of your sessions into one purchasable offer at a 20% discount. Great for structured learning paths."],
            ].map(([q,a],i) => <FaqRow key={i} q={q} a={a}/>)}
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{borderBottom:"1px solid var(--line)", padding:"20px 0"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        background:"none", border:"none", width:"100%", textAlign:"left",
        display:"flex", justifyContent:"space-between", alignItems:"center", gap:24,
        cursor:"pointer", padding:0,
        fontFamily:"var(--f-serif)", fontSize:20, fontWeight:400, color:"var(--ink)"
      }}>
        <span>{q}</span>
        <span style={{fontSize:24, color:"var(--ink-3)", transition:"transform .25s", transform: open?"rotate(45deg)":"rotate(0)", flexShrink:0}}>+</span>
      </button>
      <div style={{maxHeight: open?300:0, overflow:"hidden", transition:"max-height .35s ease", color:"var(--ink-3)", fontSize:15, lineHeight:1.6}}>
        <p style={{margin:"12px 0 0"}}>{a}</p>
      </div>
    </div>
  );
}

window.PricingPage = PricingPage;
