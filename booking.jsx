/* global React, SwappiAtoms */
const { useState } = React;
const { Avatar, Placeholder } = window.SwappiAtoms;

// ============================================================
//  BOOKING FLOW — modal with steps, ends with confirmation
// ============================================================

function BookingModal({ skill, onClose, onComplete }) {
  const [step, setStep] = useState(1); // 1 = choose slot, 2 = mode/details, 3 = review/pay, 4 = confirmed
  const [slot, setSlot] = useState(null);
  const [mode, setMode] = useState("pay"); // "pay" or "swap"
  const [offering, setOffering] = useState("");
  const [note, setNote] = useState("");

  if (!skill) return null;

  const slots = [
    { day: "Tue", date: "May 12", time: "6:00 PM" },
    { day: "Wed", date: "May 13", time: "7:30 PM" },
    { day: "Thu", date: "May 14", time: "10:00 AM" },
    { day: "Sat", date: "May 16", time: "11:00 AM" },
    { day: "Sun", date: "May 17", time: "4:00 PM" },
    { day: "Tue", date: "May 19", time: "6:00 PM" },
  ];

  const next = () => {
    if (step === 1 && !slot) return;
    if (step < 4) setStep(step + 1);
  };

  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth: step === 4 ? 480 : 580}}>
        {step !== 4 && (
          <div style={{padding:"22px 28px 0"}}>
            <div className="row between center">
              <span className="eyebrow">Step {step} of 3</span>
              <button onClick={onClose} style={{background:"none", border:"none", fontSize:22, color:"var(--ink-3)", cursor:"pointer"}}>×</button>
            </div>
            <div className="row gap-4 mt-16">
              {[1,2,3].map(n => (
                <div key={n} style={{flex:1, height:3, borderRadius:99, background: n<=step ? "var(--orange)" : "var(--cream-3)", transition:"background .3s"}}></div>
              ))}
            </div>
          </div>
        )}

        <div style={{padding:"24px 28px 28px"}}>
          {/* Skill summary */}
          {step !== 4 && (
            <div className="row gap-12 center" style={{padding:14, borderRadius:12, background:"var(--cream-2)", marginBottom:24}}>
              <Avatar initials={skill.initials} size="md" color={skill.catColor}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600, lineHeight:1.2}}>{skill.title}</div>
                <div style={{fontSize:12, color:"var(--ink-3)", marginTop:2}}>with {skill.provider} · {skill.mode}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:16, fontWeight:600}}>{skill.price} EGP</div>
                <div style={{fontSize:11, color:"var(--ink-3)"}}>per session</div>
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontWeight:400, fontSize:28}}>Pick a time that works.</h2>
              <p style={{color:"var(--ink-3)", fontSize:14, marginTop:6}}>{skill.provider} typically responds within an hour.</p>
              <div className="grid-3" style={{gap:10, marginTop:20}}>
                {slots.map((sl,i) => {
                  const id = sl.date+sl.time;
                  const sel = slot === id;
                  return (
                    <button key={i} onClick={()=>setSlot(id)} style={{
                      padding:14, borderRadius:12, textAlign:"left",
                      background: sel ? "var(--ink)" : "var(--paper)",
                      color: sel ? "var(--cream)" : "var(--ink)",
                      border: "1.5px solid " + (sel ? "var(--ink)" : "var(--line)"),
                      cursor:"pointer", transition:"all .15s"
                    }}>
                      <div style={{fontSize:11, opacity:.7, textTransform:"uppercase", letterSpacing:".1em"}}>{sl.day}</div>
                      <div style={{fontFamily:"var(--f-serif)", fontSize:20, marginTop:2}}>{sl.date.split(" ")[1]}</div>
                      <div style={{fontSize:12, marginTop:4, opacity:.8}}>{sl.time}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontWeight:400, fontSize:28}}>How are you paying?</h2>
              <p style={{color:"var(--ink-3)", fontSize:14, marginTop:6}}>Two options. Both are equally welcome here.</p>

              <div className="col gap-10 mt-24">
                <ModeOption
                  selected={mode==="pay"}
                  onClick={()=>setMode("pay")}
                  title={`Pay ${skill.price} EGP`}
                  body="Standard session, money up front. Held until 24 hours after."
                  icon="E£"
                  color="orange"
                />
                <ModeOption
                  selected={mode==="swap"}
                  onClick={()=>setMode("swap")}
                  title="Swap a skill"
                  body="Offer something of yours in return. Yasmin loves: web design, photography, sourdough."
                  icon="↔"
                  color="blue"
                />
              </div>

              {mode === "swap" && (
                <div className="field mt-24">
                  <label>What are you offering?</label>
                  <input className="input" placeholder="e.g. 2 hours of UX feedback" value={offering} onChange={e=>setOffering(e.target.value)}/>
                </div>
              )}

              <div className="field mt-16">
                <label>A short note (optional)</label>
                <textarea className="input" rows="3" style={{height:"auto", padding:14, resize:"vertical"}} placeholder="What do you want to focus on?" value={note} onChange={e=>setNote(e.target.value)}/>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{margin:0, fontFamily:"var(--f-serif)", fontWeight:400, fontSize:28}}>One last look.</h2>
              <p style={{color:"var(--ink-3)", fontSize:14, marginTop:6}}>You won't be charged until {skill.provider.split(" ")[0]} accepts.</p>
              <div className="col gap-12 mt-24">
                <Review row="When" val={slot}/>
                <Review row="With" val={skill.provider}/>
                <Review row="Format" val={skill.mode}/>
                <Review row="Payment" val={mode === "pay" ? `${skill.price} EGP (held by Stripe)` : `Swap — ${offering || "skill TBD"}`}/>
                {note && <Review row="Note" val={`"${note}"`}/>}
              </div>
              <div style={{padding:14, borderRadius:12, background:"var(--blue-soft)", marginTop:20, fontSize:13, color:"var(--ink)", lineHeight:1.5}}>
                <strong>Reminder:</strong> If you don't connect in the first session, we refund the full amount — no questions.
              </div>
            </>
          )}

          {step === 4 && (
            <div style={{padding:"20px 0", textAlign:"center"}}>
              <div style={{
                width:88, height:88, borderRadius:"50%", margin:"0 auto",
                background:"radial-gradient(circle, var(--orange), var(--orange-deep))",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontSize:40,
                animation: "pop .5s cubic-bezier(.2,1.6,.3,1)"
              }}>✓</div>
              <h2 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:36, margin:"24px 0 8px"}}>Request sent!</h2>
              <p style={{color:"var(--ink-3)", margin:0, fontSize:15}}>
                {skill.provider} will get back to you within a few hours. We'll ping you the moment they do.
              </p>
              <div style={{margin:"28px 0 8px", padding:16, borderRadius:12, background:"var(--cream-2)", textAlign:"left"}}>
                <div style={{fontSize:11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em"}}>Requested</div>
                <div style={{fontWeight:600, marginTop:4}}>{skill.title}</div>
                <div style={{fontSize:13, color:"var(--ink-3)", marginTop:2}}>{slot} · {mode==="pay"?`${skill.price} EGP`:"Skill swap"}</div>
              </div>
              <div className="row gap-8" style={{marginTop:24, justifyContent:"center"}}>
                <button className="btn btn-ghost" onClick={onClose}>Keep browsing</button>
                <button className="btn btn-primary" onClick={onComplete}>Go to dashboard →</button>
              </div>
            </div>
          )}

          {step !== 4 && (
            <div className="row between" style={{marginTop:28, paddingTop:20, borderTop:"1px solid var(--line)"}}>
              {step > 1 ? (
                <button className="btn btn-ghost" onClick={()=>setStep(step-1)}>← Back</button>
              ) : <span/>}
              <button
                className="btn btn-primary"
                onClick={next}
                disabled={step===1 && !slot}
                style={{opacity: (step===1 && !slot) ? .5 : 1, pointerEvents: (step===1 && !slot) ? "none" : "auto"}}
              >
                {step === 3 ? "Send request →" : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModeOption({ selected, onClick, title, body, icon, color }) {
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"flex-start", gap:14, padding:16,
      borderRadius:12, background:"var(--paper)",
      border: "1.5px solid " + (selected ? (color==="orange"?"var(--orange)":"var(--blue)") : "var(--line)"),
      boxShadow: selected ? `0 0 0 4px ${color==="orange"?"color-mix(in oklch, var(--orange) 14%, transparent)":"color-mix(in oklch, var(--blue) 14%, transparent)"}` : "none",
      cursor:"pointer", textAlign:"left", transition:"all .15s"
    }}>
      <div style={{
        width:40, height:40, borderRadius:10,
        background: color==="orange"?"var(--orange)":"var(--blue)",
        color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0, fontSize:18
      }}>{icon}</div>
      <div style={{flex:1}}>
        <div style={{fontWeight:600, fontSize:15}}>{title}</div>
        <div style={{fontSize:13, color:"var(--ink-3)", marginTop:4, lineHeight:1.5}}>{body}</div>
      </div>
      <span style={{
        width:20, height:20, borderRadius:"50%",
        border: "1.5px solid " + (selected ? (color==="orange"?"var(--orange)":"var(--blue)") : "var(--line)"),
        background: selected ? (color==="orange"?"var(--orange)":"var(--blue)") : "transparent",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"#fff", fontSize:11
      }}>{selected ? "✓" : ""}</span>
    </button>
  );
}

function Review({ row, val }) {
  return (
    <div className="row between" style={{padding:"12px 14px", background:"var(--cream-2)", borderRadius:10}}>
      <span style={{fontSize:12, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em"}}>{row}</span>
      <span style={{fontSize:14, fontWeight:500, textAlign:"right"}}>{val}</span>
    </div>
  );
}

window.BookingModal = BookingModal;
