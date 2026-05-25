/* global React */
const { useState } = React;
const useIsMobile = window.useIsMobile || (() => false);

// ============================================================
//  AUTH (Login / Signup)
// ============================================================

function AuthPage({ setPage }) {
  const isMobile = useIsMobile();
  const [mode, setMode] = useState("signup");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email:"", password:"", name:"", teach:"", learn:"" });
  const [errs, setErrs] = useState({});

  const valid = () => {
    const e = {};
    if (step === 1) {
      if (!form.email.includes("@")) e.email = "That doesn't look right.";
      if (mode === "signup" && form.password.length < 6) e.password = "At least 6 characters.";
    }
    if (step === 2 && mode === "signup") {
      if (!form.name.trim()) e.name = "What should we call you?";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!valid()) return;

    if (mode === "login") {
      const email = form.email.trim().toLowerCase();
      const known = window.SWAPPI?.users?.[email];
      if (known && form.password === known.password) {
        window.SWAPPI.currentUser = known;
      } else {
        // Unknown credentials → brand-new account
        const def = window.SWAPPI?.defaultNewUser || {};
        const rawName = email.split("@")[0].replace(/[._]/g," ");
        const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        const initials = name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2) || "NM";
        window.SWAPPI.currentUser = { ...def, name, initials, email };
      }
      setPage("dashboard");
      return;
    }

    if (step < 3) { setStep(step + 1); return; }

    // Final signup step → build a fresh user
    const def = window.SWAPPI?.defaultNewUser || {};
    const name = form.name.trim() || form.email.split("@")[0];
    const initials = name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2) || "NM";
    window.SWAPPI.currentUser = { ...def, name, initials, email: form.email };
    setPage("dashboard");
  };

  return (
    <main data-screen-label="Auth" style={{minHeight:"calc(100vh - 65px)", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", background:"var(--cream)"}}>
      {/* Left: brand panel — hidden on mobile */}
      {!isMobile && <section className="surface-dark" style={{padding:48, display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden"}}>
        <div className="mesh-bg"></div>
        <div style={{position:"relative", zIndex:2}}>
          <div className="row gap-8 center">
            <div className="brand-mark"></div>
            <span style={{fontFamily:"var(--f-serif)", fontSize:24, color:"#fff"}}>swappi</span>
          </div>
        </div>
        <div style={{position:"relative", zIndex:2}}>
          <span className="eyebrow" style={{color:"var(--orange-soft)"}}>Quote of the week</span>
          <p className="display" style={{fontSize:"clamp(32px,4vw,52px)", color:"#fff", lineHeight:1.05, margin:"16px 0 32px", letterSpacing:"-0.015em"}}>
            "I came for Arabic. I stayed for the eight people I never would have met. Swappi found me a community before it found me a teacher."
          </p>
          <div className="row gap-12 center">
            <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg, var(--orange), var(--blue))",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"var(--f-serif)",fontSize:18}}>SA</div>
            <div style={{color:"#fff"}}>
              <div style={{fontSize:15, fontWeight:500}}>Salma Aboul</div>
              <div style={{fontSize:13, color:"rgba(255,255,255,0.6)"}}>Member since Jan '25 · 9 swaps</div>
            </div>
          </div>
        </div>
        <div style={{position:"relative", zIndex:2, display:"flex", gap:24, fontSize:12, color:"rgba(255,255,255,0.5)", fontFamily:"var(--f-mono)"}}>
          <span>EN · AR · FR</span>
          <span>©2026</span>
        </div>
      </section>}

      {/* Right: form */}
      <section style={{padding: isMobile ? "40px 24px" : "48px clamp(48px,8vw,120px)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative"}}>
        <div style={{marginBottom:24, fontSize:13, color:"var(--ink-3)", textAlign: isMobile ? "center" : "right"}}>
          {mode === "signup" ? "Already a member?" : "New to Swappi?"}{" "}
          <a onClick={()=>{ setMode(mode==="signup"?"login":"signup"); setStep(1); }} style={{color:"var(--blue)", fontWeight:600, cursor:"pointer"}}>
            {mode === "signup" ? "Sign in" : "Create account"}
          </a>
        </div>

        <div style={{maxWidth:440}}>
          {mode === "signup" && (
            <div className="row gap-4" style={{marginBottom:24}}>
              {[1,2,3].map(s=>(
                <div key={s} style={{flex:1, height:3, borderRadius:99, background: s<=step ? "var(--orange)" : "var(--cream-3)", transition:"background .3s"}}></div>
              ))}
            </div>
          )}

          <h1 className="display" style={{fontSize:"clamp(36px,4.5vw,54px)", margin:0, lineHeight:1}}>
            {mode === "login" ? "Welcome back." :
             step === 1 ? "Let's get you started." :
             step === 2 ? "Tell us your name." :
             "What will you swap?"}
          </h1>
          <p style={{color:"var(--ink-3)", fontSize:16, marginTop:12}}>
            {mode === "login" ? "Pick up where you left off." :
             step === 1 ? "Two minutes. Then you're inside." :
             step === 2 ? "And a tiny bit more about you." :
             "Sketch it out — you can change it any time."}
          </p>

          <div className="col gap-16" style={{marginTop:32}}>
            {(step === 1) && (
              <>
                <div className="field">
                  <label>Email</label>
                  <input className={"input" + (errs.email?" error":"")} value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@example.com"/>
                  {errs.email && <span className="err">{errs.email}</span>}
                </div>
                <div className="field">
                  <label>Password</label>
                  <input className={"input" + (errs.password?" error":"")} type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="••••••••"/>
                  {errs.password && <span className="err">{errs.password}</span>}
                </div>
              </>
            )}
            {(mode === "signup" && step === 2) && (
              <>
                <div className="field">
                  <label>Your name</label>
                  <input className={"input" + (errs.name?" error":"")} value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Whatever feels like you"/>
                  {errs.name && <span className="err">{errs.name}</span>}
                </div>
                <div className="field">
                  <label>Where are you?</label>
                  <input className="input" placeholder="City, country"/>
                </div>
              </>
            )}
            {(mode === "signup" && step === 3) && (
              <>
                <div className="field">
                  <label>I can teach</label>
                  <input className="input" value={form.teach} onChange={e=>setForm({...form, teach:e.target.value})} placeholder="e.g. Web design, French, sourdough"/>
                </div>
                <div className="field">
                  <label>I want to learn</label>
                  <input className="input" value={form.learn} onChange={e=>setForm({...form, learn:e.target.value})} placeholder="e.g. Arabic, photography, public speaking"/>
                </div>
              </>
            )}

            <button className="btn btn-lg btn-primary" onClick={submit} style={{justifyContent:"center"}}>
              {mode === "login" ? "Sign in →" :
               step < 3 ? "Continue →" :
               "Finish — find my matches →"}
            </button>

            {mode === "signup" && step > 1 && (
              <button className="btn btn-ghost" onClick={()=>setStep(s=>s-1)} style={{justifyContent:"center", border:"none", background:"none", color:"var(--ink-3)"}}>← Back</button>
            )}

            {step === 1 && (
              <>
                <div className="row gap-12 center" style={{margin:"12px 0", color:"var(--ink-4)", fontSize:12}}>
                  <div style={{flex:1, height:1, background:"var(--line)"}}></div>
                  <span>OR</span>
                  <div style={{flex:1, height:1, background:"var(--line)"}}></div>
                </div>
                <button className="btn btn-ghost" style={{justifyContent:"center", height:48}} onClick={() => window.showToast && window.showToast("Google sign-in coming soon — use email for now", "🔒")}>
                  <span style={{
                    width:18, height:18, borderRadius:"50%",
                    background:"conic-gradient(from 0deg, #ea4335, #fbbc04, #34a853, #4285f4, #ea4335)",
                    display:"inline-block"
                  }}></span>
                  Continue with Google
                </button>
              </>
            )}

            <p style={{fontSize:12, color:"var(--ink-4)", textAlign:"center", marginTop:8}}>
              By continuing you agree to our Terms and Privacy. We won't email you anything we wouldn't want to read ourselves.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

window.AuthPage = AuthPage;
