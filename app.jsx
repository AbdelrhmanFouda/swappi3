/* global React, ReactDOM, SwappiAtoms, HomePage, BrowsePage, ProfilePage, DashboardPage, WorkshopsPage, PricingPage, AuthPage, BookingModal, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor */
const { useState, useEffect } = React;
const { Nav, Footer } = window.SwappiAtoms;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#f5a623",
  "blue": "#3756e8",
  "font": "Editorial serif",
  "density": "Dense",
  "darkNav": false
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = useState("home");
  const [booking, setBooking] = useState(null);
  const [toast, setToast] = useState(null);
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--orange", tw.accent);
    root.style.setProperty("--orange-deep", shade(tw.accent, -0.12));
    root.style.setProperty("--orange-soft", tint(tw.accent, 0.78));
    root.style.setProperty("--blue", tw.blue);
    root.style.setProperty("--blue-deep", shade(tw.blue, -0.15));
    root.style.setProperty("--blue-soft", tint(tw.blue, 0.82));

    const fontMap = {
      "Editorial serif": ["Instrument Serif", "DM Sans"],
      "Geometric serif": ["Cormorant Garamond", "DM Sans"],
      "All grotesque":   ["DM Sans", "DM Sans"],
    };
    const [serif, sans] = fontMap[tw.font] || fontMap["Editorial serif"];
    root.style.setProperty("--f-serif", `"${serif}", Georgia, serif`);
    root.style.setProperty("--f-sans", `"${sans}", "Helvetica Neue", system-ui, sans-serif`);

    root.style.setProperty("--max", tw.density === "Dense" ? "1180px" : "1320px");
  }, [tw]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const openBooking = (skill) => setBooking(skill);
  const closeBooking = () => setBooking(null);
  const completeBooking = () => {
    setBooking(null);
    setToast("Request sent — we'll let you know when they respond.");
    setPage("dashboard");
    setTimeout(()=>setToast(null), 3800);
  };

  const renderPage = () => {
    switch(page) {
      case "home": return <HomePage setPage={setPage} onBook={openBooking}/>;
      case "browse": return <BrowsePage onBook={openBooking}/>;
      case "profile": return <ProfilePage onBook={openBooking}/>;
      case "dashboard": return <DashboardPage setPage={setPage} onBook={openBooking}/>;
      case "workshops": return <WorkshopsPage onBook={openBooking}/>;
      case "pricing": return <PricingPage setPage={setPage}/>;
      case "auth": return <AuthPage setPage={setPage}/>;
      default: return <HomePage setPage={setPage} onBook={openBooking}/>;
    }
  };

  const darkNav = page === "home" || page === "auth";
  const showFooter = page !== "dashboard" && page !== "auth";

  return (
    <>
      {page !== "auth" && <Nav page={page} setPage={setPage} dark={darkNav && tw.darkNav} />}
      {page === "auth" && (
        <div style={{position:"fixed", top:24, left:24, zIndex:50}}>
          <a onClick={() => setPage("home")} style={{cursor:"pointer", color:"#fff", fontFamily:"var(--f-serif)", fontSize:22}}>← swappi</a>
        </div>
      )}

      {/* Sub-nav showing profile entry */}
      {page === "profile" && (
        <div style={{background:"var(--cream-2)", borderBottom:"1px solid var(--line)", fontSize:13, color:"var(--ink-3)"}}>
          <div className="wrap" style={{padding:"10px 32px"}}>
            <a onClick={() => setPage("browse")} style={{cursor:"pointer"}}>Browse</a> · <a onClick={() => setPage("browse")} style={{cursor:"pointer"}}>Language</a> · <span style={{color:"var(--ink)"}}>Yasmin Hafez</span>
          </div>
        </div>
      )}

      {renderPage()}
      {showFooter && <Footer setPage={setPage}/>}

      {/* Profile entry button (since profile isn't in nav) */}
      {page === "browse" && (
        <button onClick={() => setPage("profile")} style={{
          position:"fixed", bottom:24, left:24, zIndex:50,
          padding:"12px 18px", borderRadius:999, border:"none",
          background:"var(--ink)", color:"var(--cream)",
          fontSize:13, fontWeight:500, cursor:"pointer",
          boxShadow:"var(--shadow-3)",
          display:"flex", gap:8, alignItems:"center"
        }}>
          <span style={{width:8, height:8, borderRadius:99, background:"var(--orange)"}}></span>
          Preview a sample profile (Yasmin H.) →
        </button>
      )}

      {booking && <BookingModal skill={booking} onClose={closeBooking} onComplete={completeBooking}/>}

      {toast && (
        <div className="toast">
          <span style={{marginRight:8, color:"var(--orange)"}}>✓</span>{toast}
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color"/>
        <TweakColor
          label="Primary"
          value={tw.accent}
          options={["#ff8a3d", "#f5a623", "#e85d50", "#d97757", "#c2410c"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakColor
          label="Secondary"
          value={tw.blue}
          options={["#3756e8", "#1e40af", "#0c7ec2", "#2563eb", "#7c3aed"]}
          onChange={(v) => setTweak("blue", v)}
        />
        <TweakSection label="Typography"/>
        <TweakRadio
          label="Pairing"
          value={tw.font}
          options={["Editorial serif", "Geometric serif", "All grotesque"]}
          onChange={(v) => setTweak("font", v)}
        />
        <TweakSection label="Layout"/>
        <TweakRadio
          label="Density"
          value={tw.density}
          options={["Spacious", "Dense"]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </>
  );
}

// — color utility helpers (work for hex)
function hexToRgb(hex) {
  const h = hex.replace("#","");
  const f = h.length === 3 ? h.split("").map(c=>c+c).join("") : h;
  return [parseInt(f.slice(0,2),16), parseInt(f.slice(2,4),16), parseInt(f.slice(4,6),16)];
}
function rgbToHex([r,g,b]) {
  return "#" + [r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
}
function shade(hex, amt) { // amt negative = darker
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex([r*(1+amt), g*(1+amt), b*(1+amt)]);
}
function tint(hex, amt) { // amt 0..1, larger = lighter
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex([r + (255-r)*amt, g + (255-g)*amt, b + (255-b)*amt]);
}

ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
