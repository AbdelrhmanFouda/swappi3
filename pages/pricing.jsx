/* global React */
const { useState } = React;

// ============================================================
//  PRICING
// ============================================================

function PricingPage({ setPage }) {
  const [annual, setAnnual] = useState(true);
  const tiers = [
    {
      name: "Free",
      tag: "For curious beginners",
      monthly: 0, annual: 0,
      features: [
        ["Up to 3 swap matches / month", true],
        ["Browse every public skill", true],
        ["Standard messaging", true],
        ["Verified ID badge", true],
        ["Workshop discounts", false],
        ["Priority match queue", false],
        ["Earnings dashboard", false],
      ],
      cta: "Start free",
      popular: false,
    },
    {
      name: "Pro",
      tag: "For people who're serious",
      monthly: 14, annual: 9,
      features: [
        ["Unlimited swap matches", true],
        ["Browse + filter by everything", true],
        ["Priority messaging", true],
        ["Verified ID badge", true],
        ["20% off all workshops", true],
        ["Priority match queue", true],
        ["Earnings dashboard", false],
      ],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Studio",
      tag: "For teachers running a practice",
      monthly: 39, annual: 29,
      features: [
        ["Everything in Pro", true],
        ["Custom storefront page", true],
        ["Recurring sessions + roster", true],
        ["Lower payment fees (2.5%)", true],
        ["Host workshops + co-teach", true],
        ["Priority match queue", true],
        ["Earnings + tax dashboard", true],
      ],
      cta: "Start Studio",
      popular: false,
    },
  ];

  return (
    <main data-screen-label="Pricing" style={{background:"var(--cream)", paddingBottom:120}}>
      <section style={{padding:"72px 0 32px", textAlign:"center"}}>
        <div className="wrap">
          <span className="eyebrow">Pricing</span>
          <h1 className="display" style={{fontSize:"clamp(44px,6vw,84px)", margin:"16px auto 0", maxWidth:880, lineHeight:1.05}}>
            Free to swap. Pay only when you outgrow it.
          </h1>
          <p style={{fontSize:18, color:"var(--ink-3)", marginTop:24, maxWidth:600, marginInline:"auto"}}>
            We make money when our most ambitious teachers do. Everyone else gets the full platform on us.
          </p>

          <div className="row gap-12 center" style={{marginTop:40, justifyContent:"center"}}>
            <span style={{fontSize:14, fontWeight: annual?400:600, color: annual?"var(--ink-3)":"var(--ink)"}}>Monthly</span>
            <button onClick={()=>setAnnual(a=>!a)} style={{
              width:56, height:32, borderRadius:99,
              background: annual ? "var(--orange)" : "var(--cream-3)",
              border:"none", position:"relative", cursor:"pointer",
              transition:"background .25s"
            }}>
              <span style={{position:"absolute", top:3, left:annual?27:3, width:26, height:26, borderRadius:"50%", background:"#fff", transition:"left .25s cubic-bezier(.2,.7,.2,1)", boxShadow:"var(--shadow-1)"}}></span>
            </button>
            <span style={{fontSize:14, fontWeight: annual?600:400, color: annual?"var(--ink)":"var(--ink-3)"}}>Annual</span>
            <span className="pill pill-blue" style={{marginLeft:4}}>Save 35%</span>
          </div>
        </div>
      </section>

      <section className="wrap" style={{marginTop:48}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24}}>
          {tiers.map(t => (
            <div key={t.name} className="card" style={{
              padding:36,
              position:"relative",
              border: t.popular ? "2px solid var(--orange)" : "1px solid var(--line)",
              boxShadow: t.popular ? "0 0 0 6px color-mix(in oklch, var(--orange) 14%, transparent), var(--shadow-2)" : "var(--shadow-1)",
              transform: t.popular ? "translateY(-8px)" : "none",
              background: "var(--paper)"
            }}>
              {t.popular && <span className="pill pill-orange" style={{position:"absolute", top:-12, left:36}}>★ Most popular</span>}
              <div style={{fontSize:14, color:"var(--ink-3)", letterSpacing:".02em"}}>{t.tag}</div>
              <h2 style={{fontFamily:"var(--f-serif)", fontSize:36, fontWeight:400, margin:"8px 0 16px"}}>{t.name}</h2>
              <div className="row" style={{alignItems:"baseline", gap:6}}>
                <span className="display" style={{fontSize:64, lineHeight:1, transition:"all .3s"}}>${annual ? t.annual : t.monthly}</span>
                <span style={{color:"var(--ink-3)", fontSize:15}}>/ mo{annual ? ", billed yearly":""}</span>
              </div>
              <button
                className={"btn " + (t.popular ? "btn-primary" : "btn-ghost") + " mt-24"}
                style={{width:"100%", justifyContent:"center", height:52}}
                onClick={()=>setPage("auth")}
              >{t.cta} →</button>

              <div className="col gap-12" style={{marginTop:32, paddingTop:24, borderTop:"1px solid var(--line-soft)"}}>
                {t.features.map(([f, on],i)=>(
                  <div key={i} className="row gap-12 center" style={{color: on ? "var(--ink)" : "var(--ink-4)", fontSize:14}}>
                    <span style={{
                      width:20, height:20, borderRadius:"50%",
                      background: on ? "var(--blue)" : "var(--cream-2)",
                      color: on ? "#fff" : "var(--ink-4)",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:11,
                      flexShrink:0
                    }}>{on ? "✓" : "—"}</span>
                    <span style={{textDecoration: on?"none":"line-through"}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap" style={{marginTop:120}}>
        <div className="row between" style={{flexWrap:"wrap", gap:48}}>
          <div style={{maxWidth:340}}>
            <span className="eyebrow">FAQ</span>
            <h2 className="display" style={{fontSize:48, margin:"12px 0 0"}}>Common questions, honest answers.</h2>
          </div>
          <div style={{flex:1, minWidth:480, maxWidth:760}}>
            {[
              ["Do I have to pay to use Swappi?", "No. The Free tier is forever free and includes swaps, messages, and verification. Pro is only for people who want unlimited matches or workshop discounts."],
              ["What's a 'swap'?", "Two people teach each other something. No money changes hands. Most of our best stories started as swaps."],
              ["How do payments work?", "Stripe. We hold session payments until 24 hours after the lesson so both sides are protected."],
              ["Can I cancel anytime?", "Yes. Cancel from your dashboard. Annual plans get prorated refunds for unused months."],
              ["What's your refund policy?", "Full refund if you don't connect with your teacher in the first session, no questions asked."],
            ].map(([q,a],i)=><FaqRow key={i} q={q} a={a}/>)}
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
        fontFamily:"var(--f-serif)", fontSize:22, fontWeight:400, color:"var(--ink)"
      }}>
        <span>{q}</span>
        <span style={{fontSize:24, color:"var(--ink-3)", transition:"transform .25s", transform: open?"rotate(45deg)":"rotate(0)"}}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0, overflow:"hidden",
        transition:"max-height .35s ease",
        color:"var(--ink-3)", fontSize:15, lineHeight:1.6
      }}>
        <p style={{margin:"12px 0 0"}}>{a}</p>
      </div>
    </div>
  );
}

window.PricingPage = PricingPage;
