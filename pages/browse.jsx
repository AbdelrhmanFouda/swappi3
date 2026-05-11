/* global React, SWAPPI, SwappiAtoms */
const { useState, useEffect, useMemo } = React;
const { Avatar, Reveal, Placeholder, SkillCard } = window.SwappiAtoms;

// ============================================================
//  BROWSE
// ============================================================

function BrowsePage({ onBook, setPage }) {
  const [cat, setCat] = useState("All");
  const [price, setPrice] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [modes, setModes] = useState({ online: true, inperson: true });
  const [swapOnly, setSwapOnly] = useState(false);
  const [sort, setSort] = useState("Recommended");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(()=>setLoading(false), 350);
    return ()=>clearTimeout(t);
  }, [cat, price, minRating, modes, swapOnly, sort, query]);

  const filtered = useMemo(() => {
    let r = SWAPPI.skills.filter(s => {
      if (cat !== "All" && s.cat !== cat) return false;
      if (s.price > price) return false;
      if (s.rating < minRating) return false;
      if (swapOnly && !s.swap) return false;
      if (!modes.online && s.mode.startsWith("Online")) return false;
      if (!modes.inperson && s.mode.startsWith("In-person")) return false;
      if (query && !s.title.toLowerCase().includes(query.toLowerCase()) && !s.provider.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "Top rated") r = [...r].sort((a,b)=>b.rating - a.rating);
    if (sort === "Price · Low") r = [...r].sort((a,b)=>a.price - b.price);
    if (sort === "Price · High") r = [...r].sort((a,b)=>b.price - a.price);
    return r;
  }, [cat, price, minRating, modes, swapOnly, sort, query]);

  return (
    <main data-screen-label="Browse" style={{background:"var(--cream)", paddingBottom:120}}>
      <section style={{padding:"56px 0 32px"}}>
        <div className="wrap">
          <span className="eyebrow">Browse · 1,832 skills</span>
          <h1 className="display" style={{fontSize:"clamp(40px, 6vw, 80px)", margin:"12px 0 0"}}>
            What do you want to learn today?
          </h1>
          <div style={{display:"flex", gap:12, marginTop:32, maxWidth:680}}>
            <input className="input" placeholder="Search skills, teachers, or topics…" value={query} onChange={(e)=>setQuery(e.target.value)} style={{height:56, fontSize:16, paddingLeft:48, backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'><circle cx='11' cy='11' r='7'/><path d='m20 20-3-3'/></svg>\")", backgroundRepeat:"no-repeat", backgroundPosition:"16px 50%"}}/>
            <button className="btn btn-lg btn-primary" onClick={() => window.showToast && window.showToast(`Showing results for "${query || "all skills"}"`, "🔍")}>Search</button>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{display:"grid", gridTemplateColumns:"280px 1fr", gap:40}}>
          {/* Filters */}
          <aside style={{position:"sticky", top:96, alignSelf:"flex-start", height:"fit-content"}}>
            <div className="card" style={{padding:24}}>
              <div className="row between center" style={{marginBottom:20}}>
                <strong style={{fontSize:14}}>Filters</strong>
                <button className="btn btn-sm btn-ghost" style={{fontSize:12}} onClick={()=>{
                  setCat("All"); setPrice(150); setMinRating(0); setModes({online:true,inperson:true}); setSwapOnly(false); setQuery("");
                }}>Reset</button>
              </div>

              <FilterGroup title="Category">
                <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                  {SWAPPI.categories.map(c => (
                    <button key={c} onClick={()=>setCat(c)} className="pill" style={{
                      cursor:"pointer", background: cat===c?"var(--ink)":"var(--cream-2)", color: cat===c?"var(--cream)":"var(--ink-2)", border:"1px solid transparent"
                    }}>{c}</button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title={`Max price · $${price}`}>
                <input type="range" min={20} max={200} value={price} onChange={(e)=>setPrice(+e.target.value)} style={{width:"100%", accentColor:"oklch(0.62 0.18 42)"}}/>
                <div className="row between" style={{fontSize:11, color:"var(--ink-3)", marginTop:4}}><span>$20</span><span>$200</span></div>
              </FilterGroup>

              <FilterGroup title="Min rating">
                <div className="row gap-4">
                  {[0,3.5,4,4.5,4.8].map(r => (
                    <button key={r} onClick={()=>setMinRating(r)} className="pill" style={{
                      cursor:"pointer", background: minRating===r?"var(--ink)":"var(--cream-2)", color: minRating===r?"var(--cream)":"var(--ink-2)", border:"1px solid transparent"
                    }}>{r===0?"Any":r+"★"}</button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Format">
                <CheckRow label="Online" checked={modes.online} onChange={()=>setModes(m=>({...m, online:!m.online}))}/>
                <CheckRow label="In-person" checked={modes.inperson} onChange={()=>setModes(m=>({...m, inperson:!m.inperson}))}/>
                <CheckRow label="Swap-friendly only" checked={swapOnly} onChange={()=>setSwapOnly(s=>!s)}/>
              </FilterGroup>

              <FilterGroup title="Availability" last>
                <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4}}>
                  {Array.from({length:21}, (_,i) => (
                    <div key={i} style={{aspectRatio:"1", borderRadius:6, background: [3,7,9,11,14,16,18].includes(i) ? "var(--orange-soft)" : "var(--cream-2)", fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--ink-3)", cursor:"pointer"}}>{i+1}</div>
                  ))}
                </div>
                <div className="row gap-8" style={{marginTop:8, fontSize:11, color:"var(--ink-3)"}}>
                  <span><span style={{display:"inline-block",width:10,height:10,background:"var(--orange-soft)",borderRadius:3,verticalAlign:"middle",marginRight:4}}></span>Has openings</span>
                </div>
              </FilterGroup>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="row between center" style={{marginBottom:24}}>
              <span style={{fontSize:14, color:"var(--ink-3)"}}>{loading?"Updating…":`${filtered.length} results`}</span>
              <div className="row gap-8 center">
                <span style={{fontSize:13, color:"var(--ink-3)"}}>Sort</span>
                <select value={sort} onChange={(e)=>setSort(e.target.value)} className="input" style={{height:38, width:180, fontSize:13}}>
                  <option>Recommended</option>
                  <option>Top rated</option>
                  <option>Price · Low</option>
                  <option>Price · High</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24}}>
                {Array.from({length:6}).map((_,i)=>(
                  <div key={i} className="card" style={{padding:0, overflow:"hidden"}}>
                    <div className="skel" style={{aspectRatio:"4/3", borderRadius:0}}></div>
                    <div style={{padding:18}}>
                      <div className="skel" style={{height:18, width:"80%"}}></div>
                      <div className="skel" style={{height:14, width:"50%", marginTop:12}}></div>
                      <div className="skel" style={{height:30, width:"100%", marginTop:18}}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="card" style={{padding:80, textAlign:"center"}}>
                <div style={{fontFamily:"var(--f-serif)", fontSize:48, color:"var(--ink-4)"}}>∅</div>
                <h3 style={{fontFamily:"var(--f-serif)", fontSize:28, fontWeight:400, marginTop:16}}>Nothing matches just yet.</h3>
                <p style={{color:"var(--ink-3)", marginTop:8}}>Try widening your filters or saving this search — we'll ping you when someone joins.</p>
                <button className="btn btn-primary mt-24" onClick={()=>{ setCat("All"); setPrice(200); setMinRating(0); }}>Reset filters</button>
              </div>
            ) : (
              <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24}}>
                {filtered.map(s => <SkillCard key={s.id} s={s} onBook={onBook} />)}
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div style={{marginTop:48, padding:32, textAlign:"center", borderRadius:20, background:"linear-gradient(135deg, var(--blue-soft) 0%, var(--orange-soft) 100%)", border:"1px solid var(--line)"}}>
                <h3 style={{fontFamily:"var(--f-serif)", fontWeight:400, fontSize:28, margin:0}}>Want us to find your perfect match?</h3>
                <p style={{color:"var(--ink-2)", marginTop:8}}>Tell us what you can teach. We'll find the people who want it.</p>
                <button className="btn btn-primary mt-16" onClick={() => setPage && setPage("auth")}>Try Quick Match →</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterGroup({ title, children, last }) {
  return (
    <div style={{paddingBottom:16, marginBottom:16, borderBottom: last ? "none" : "1px solid var(--line-soft)"}}>
      <div style={{fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"var(--ink-3)", marginBottom:10, fontWeight:600}}>{title}</div>
      {children}
    </div>
  );
}

function CheckRow({ label, checked, onChange }) {
  return (
    <label className="row gap-8 center" style={{cursor:"pointer", padding:"4px 0", fontSize:13}}>
      <span style={{
        width:18, height:18, borderRadius:5,
        border:"1.5px solid " + (checked ? "var(--blue)" : "var(--line)"),
        background: checked ? "var(--blue)" : "transparent",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"#fff", fontSize:12,
        transition:"all .15s"
      }}>{checked ? "✓" : ""}</span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{display:"none"}}/>
      <span>{label}</span>
    </label>
  );
}

window.BrowsePage = BrowsePage;
