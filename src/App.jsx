import { useState, useEffect, useRef } from "react";
import aleksPhoto from "./assets/Aleks Photo.jpg";
import tfsLogo from "./assets/ToyotaFinancialServicesLogo.jpg";
import mtwLogo from "./assets/myToyotaWallet Logo.png";

/* ── Toyota palette ── */
const C = {
  red: "#EB0A1E",
  redDark: "#B50016",
  navy: "#0A1628",
  navyMid: "#112240",
  slate: "#1E3A5F",
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  white: "#FFFFFF",
  offWhite: "#F5F5F0",
  muted: "#8A9BB0",
  border: "rgba(201,168,76,0.25)",
};

/* ── Toyota Type via Google Fonts closest match ── */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Barlow+Condensed:wght@400;600;700;800&display=swap');
`;

const GLOBAL_CSS = `
${FONT_IMPORT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Barlow', sans-serif;
  background: ${C.navy};
  color: ${C.white};
  overflow-x: hidden;
}
::selection { background: ${C.red}; color: #fff; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: ${C.navyMid}; }
::-webkit-scrollbar-thumb { background: ${C.red}; border-radius: 3px; }

/* Animated gradient background */
.bg-mesh {
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(235,10,30,0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%),
    ${C.navy};
}

/* Section fade-in */
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* Typewriter cycling */
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.cursor { animation: blink 1s infinite; color: ${C.red}; }

/* Card hover */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${C.gold};
  border-color: ${C.gold} !important;
}

/* Nav active underline */
.nav-link { position: relative; }
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 100%;
  height: 2px;
  background: ${C.red};
  transition: right 0.3s ease;
}
.nav-link:hover::after, .nav-link.active::after { right: 0; }

/* Red accent line */
.accent-line {
  width: 48px; height: 4px;
  background: linear-gradient(90deg, ${C.red}, ${C.gold});
  border-radius: 2px;
  margin: 12px 0 24px;
}

/* Gold shimmer badge */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.gold-badge {
  background: linear-gradient(90deg, ${C.gold}, ${C.goldLight}, ${C.gold});
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}

/* Timeline */
.timeline-item::before {
  content: '';
  position: absolute;
  left: -25px; top: 8px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: ${C.red};
  box-shadow: 0 0 0 3px rgba(235,10,30,0.2);
}
.timeline-line {
  position: absolute;
  left: -20px; top: 20px; bottom: -20px;
  width: 2px;
  background: linear-gradient(to bottom, ${C.red}, transparent);
}

/* Pill tag */
.pill {
  display: inline-flex; align-items: center;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px; font-weight: 600; letter-spacing: 0.05em;
  border: 1px solid ${C.border};
  background: rgba(201,168,76,0.08);
  color: ${C.goldLight};
  text-transform: uppercase;
}

/* Logo placeholder */
.logo-box {
  display: flex; align-items: center; justify-content: center;
  border: 2px dashed rgba(255,255,255,0.2);
  border-radius: 12px;
  font-size: 11px; color: ${C.muted};
  text-align: center; padding: 8px;
  background: rgba(255,255,255,0.03);
  letter-spacing: 0.05em; text-transform: uppercase;
}

/* Photo placeholder */
.photo-placeholder {
  width: 400px; height: 400px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${C.slate}, ${C.navyMid});
  border: 3px solid ${C.red};
  display: flex; align-items: center; justify-content: center;
  text-transform: uppercase; letter-spacing: 0.05em;
  box-shadow: 0 0 40px rgba(235,10,30,0.2);
}

/* Hero text cycle */
@keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideOut { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-20px); opacity: 0; } }
.cycle-in { animation: slideIn 0.4s ease forwards; }
.cycle-out { animation: slideOut 0.4s ease forwards; }

/* Grid pattern overlay */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Scrolling strip */
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-inner { animation: marquee 20s linear infinite; display: flex; white-space: nowrap; }

/* Section divider */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, ${C.border}, transparent);
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .photo-placeholder { width: 140px; height: 140px; font-size: 11px; }
  .hero-title { font-size: clamp(2.5rem, 8vw, 4rem) !important; }
}
`;

/* ── Typed text cycling hook ── */
function useTypedCycle(words, interval = 2800) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx((i) => (i + 1) % words.length);
        setPhase("in");
      }, 400);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return { word: words[idx], phase };
}

/* ── Intersection observer hook ── */
function useVisible(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ── Reusable FadeSection ── */
function FadeSection({ children, className = "" }) {
  const ref = useRef(null);
  const visible = useVisible(ref);
  return (
    <div ref={ref} className={`fade-in ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div className="pill" style={{ marginBottom: 12 }}>{label}</div>
      <h2 style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 800, lineHeight: 1.1,
        textTransform: "uppercase", letterSpacing: "0.02em",
      }}>{title}</h2>
      <div className="accent-line" />
      {subtitle && <p style={{ color: C.muted, maxWidth: 560, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

/* ── Logos ── */
function Logos() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <div className="logo-box" style={{ width: 160, height: 52 }}>
        <img src={tfsLogo} alt="Services PH" height="100%" />
      </div>
      <div style={{ color: C.muted, fontSize: 12 }}>×</div>
      <div className="logo-box" style={{ width: 160, height: 52, borderColor: C.gold + "55" }}>
        <img src={mtwLogo} alt="myToyota Wallet" height="100%" />
      </div>
    </div>
  );
}

/* ── NAV ── */
const NAV_ITEMS = [
  { id: "profile", label: "Profile" },
  { id: "company", label: "Company" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills & Tools" },
  { id: "reflection", label: "Reflection" },
];

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s ease",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", color: C.offWhite }}>
            Aleks' OJT E-Portfolio
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {NAV_ITEMS.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className={`nav-link ${active === n.id ? "active" : ""}`}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === n.id ? C.white : C.muted,
                fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}>
              {n.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", cursor: "pointer", color: C.white,
          fontSize: 22, display: "none",
        }} className="hamburger">☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: C.navyMid, borderTop: `1px solid ${C.border}`,
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12,
        }}>
          {NAV_ITEMS.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.white, textAlign: "left",
                fontFamily: "'Barlow', sans-serif", fontWeight: 600,
                fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "8px 0",
              }}>{n.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const roles = ["Project Management Intern", "BSIT 4th Year Student", "Digital Problem Solver", "Team Player", "Lifelong Learner", "Accidentally became important at work"];
  const { word, phase } = useTypedCycle(roles, 3000);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", paddingTop: 64,
    }} className="bg-mesh grid-pattern">

      {/* Background decorative shapes */}
      <div style={{
        position: "absolute", right: -100, top: "10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(235,10,30,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: -50, bottom: "5%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Big background "TFS" text */}
      <div style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(8rem, 20vw, 18rem)",
        fontWeight: 900, color: "rgba(255,255,255,0.02)",
        letterSpacing: "-0.02em", userSelect: "none",
        lineHeight: 1, textTransform: "uppercase",
      }}>TFS</div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>

          {/* Text content */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <Logos />
            <div style={{ marginTop: 32 }}>
              <div className="pill" style={{ marginBottom: 16 }}>OJT E-Portfolio · S.Y. 2025–2026</div>
              <h1 className="hero-title" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900, lineHeight: 1.0,
                textTransform: "uppercase", letterSpacing: "0.01em",
              }}>
                <span style={{ display: "block", color: C.offWhite }}>Hi, I'm</span>
                <span style={{ display: "block", color: C.red }}>{"Alexander Fabian Guarin"}</span>
              </h1>

              {/* Cycling role */}
              <div style={{
                marginTop: 16, height: 36, overflow: "hidden",
                display: "flex", alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  fontWeight: 600, color: C.goldLight,
                  letterSpacing: "0.05em",
                }}
                  className={`cycle-${phase}`}
                >{word}</span>
              </div>

              <p style={{
                marginTop: 20, color: C.muted, lineHeight: 1.8,
                maxWidth: 500, fontSize: 15,
              }}>
                {"{A punchy one-liner about yourself — something like: 'Turning confusion into clarity, one Gantt chart at a time.'}"}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: C.red, color: "#fff", border: "none",
                    padding: "12px 28px", borderRadius: 6, cursor: "pointer",
                    fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                    fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                    transition: "background 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = C.redDark}
                  onMouseLeave={e => e.target.style.background = C.red}
                >See My Work</button>
                <button onClick={() => document.getElementById("reflection")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "transparent", color: C.goldLight,
                    border: `1px solid ${C.gold}`, padding: "12px 28px",
                    borderRadius: 6, cursor: "pointer",
                    fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                    fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.target.style.background = C.gold + "20"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; }}
                >My Takeaways</button>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div className="photo-placeholder">
              <img src={aleksPhoto} alt="Alexander Fabian Guarin" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Hrs Rendered", val: "{500+}" },
                { label: "Projects", val: "{3}" },
                { label: "Deliverables", val: "{10+}" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: C.red }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        color: C.muted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        <span>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.muted}, transparent)` }} />
      </div>
    </section>
  );
}

/* ── Marquee strip ── */
function MarqueeStrip() {
  const items = ["Project Management", "myToyota Wallet", "Toyota Financial Services", "Agile", "BSIT", "OJT 2025", "Innovation"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: C.red, padding: "10px 0", overflow: "hidden" }}>
      <div className="marquee-inner" style={{ gap: 48 }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", marginRight: 48,
            color: "rgba(255,255,255,0.85)",
          }}>
            ◆ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── SECTION: Student Profile ── */
function ProfileSection() {
  return (
    <section id="profile" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <SectionHeader
            label="01 · Who Am I"
            title="Student Profile"
            subtitle="The person behind the portfolio — no stock photos, just the real deal."
          />
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

          {/* Bio card */}
          <FadeSection>
            <div className="card-hover" style={{
              gridColumn: "span 2",
              background: C.navyMid, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 36,
            }}>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "0.05em",
                color: C.goldLight, marginBottom: 20,
              }}>About Me</h3>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <p style={{ color: C.muted, lineHeight: 1.85, marginBottom: 16 }}>
                    {"{Paragraph 1: Introduce yourself — your name, where you're from, what you're studying, and a fun fact that makes you memorable. Keep it warm and a little witty.}"}
                  </p>
                  <p style={{ color: C.muted, lineHeight: 1.85, marginBottom: 16 }}>
                    {"{Paragraph 2: Talk about your academic background — your course, relevant subjects you've taken, projects you've done in school, and what drew you to Information Technology.}"}
                  </p>
                  <p style={{ color: C.muted, lineHeight: 1.85 }}>
                    {"{Paragraph 3: Share your career aspirations — where you see yourself in 5 years, what kind of work excites you, and how this OJT fits into that bigger picture.}"}
                  </p>
                </div>
                <div style={{ minWidth: 180 }}>
                  {[
                    ["Full Name", "Alexander Fabian Guarin"],
                    ["Course", "BSIT — 4th Year"],
                    ["School", "{Your University}"],
                    ["Email", "{your@email.com}"],
                    ["OJT Period", "{Month Year – Month Year}"],
                    ["Location", "Metro Manila, PH"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 2 }}>{k}</div>
                      <div style={{ fontWeight: 600, color: C.offWhite, fontSize: 14 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

        </div>
      </div>
    </section>
  );
}

/* ── SECTION: Company Profile ── */
function CompanySection() {
  return (
    <section id="company" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <SectionHeader
            label="02 · Where I Worked"
            title="Company Profile"
            subtitle="Toyota Financial Services PH + the myToyota Wallet team — where the magic happened."
          />
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

          <FadeSection>
            <div className="card-hover" style={{
              background: C.navyMid, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 36,
            }}>
              <div style={{ marginBottom: 20 }}>
                <div className="logo-box" style={{ width: "100%", height: 72, marginBottom: 20 }}>
                  Toyota Financial Services Philippines Corp.<br />— Logo Placeholder —
                </div>
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 16 }}>
                Toyota Financial Services PH
              </h3>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                {"{Brief company overview: industry (financial services/automotive financing), size, year founded, location (e.g., BGC, Taguig), and primary services — auto loans, lease, insurance, etc.}"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Financial Services", "Automotive", "Philippines", "BGC Taguig"].map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
          </FadeSection>

          <FadeSection>
            <div className="card-hover" style={{
              background: C.navyMid, border: `1px solid ${C.gold}44`,
              borderRadius: 16, padding: 36,
            }}>
              <div style={{ marginBottom: 20 }}>
                <div className="logo-box" style={{ width: "100%", height: 72, marginBottom: 20, borderColor: C.gold + "55" }}>
                  myToyota Wallet<br />— Logo Placeholder —
                </div>
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 16 }}>
                myToyota Wallet
              </h3>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                {"{Brief description of the myToyota Wallet unit/department — what it does, its role within TFSPH, and what digital/fintech products it handles. Think: the team you called home.}"}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Digital Wallet", "Fintech", "Project Mgmt", "My Department"].map(t => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* Role card */}
          <FadeSection>
            <div className="card-hover" style={{
              background: `linear-gradient(135deg, ${C.red}11, ${C.navyMid})`,
              border: `1px solid ${C.red}44`, borderRadius: 16, padding: 36,
              gridColumn: "span 2",
            }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.white, marginBottom: 24 }}>
                My Role Within the Organization
              </h3>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 6 }}>Position</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: C.red }}>Project Management Intern</div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 6 }}>Department / Unit</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: C.goldLight }}>myToyota Wallet</div>
                </div>
                <div style={{ flex: 2, minWidth: 280 }}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 6 }}>Role Summary</div>
                  <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14 }}>
                    {"{Describe what your day-to-day looked like as a PM Intern — meetings you attended, tasks you owned, who you worked with, and how you fit into the team structure. Don't be shy; you did real work!}"}
                  </p>
                </div>
              </div>
            </div>
          </FadeSection>

        </div>
      </div>
    </section>
  );
}

/* ── SECTION: Projects + Deliverables (combined) ── */
function ProjectsSection() {
  const deliverables = [
    { icon: "📋", title: "{Deliverable 1 Title}", type: "Report / Document", desc: "{Describe this deliverable — what it was, why it mattered, and how it contributed to the project.}", impact: "{Specific impact or outcome}" },
    { icon: "📊", title: "{Deliverable 2 Title}", type: "Presentation / Deck", desc: "{Describe this deliverable — what it was, why it mattered, and how it contributed to the project.}", impact: "{Specific impact or outcome}" },
    { icon: "🗂️", title: "{Deliverable 3 Title}", type: "Research / Analysis", desc: "{Describe this deliverable — what it was, why it mattered, and how it contributed to the project.}", impact: "{Specific impact or outcome}" },
    { icon: "⚙️", title: "{Deliverable 4 Title}", type: "Process / Workflow", desc: "{Describe this deliverable — what it was, why it mattered, and how it contributed to the project.}", impact: "{Specific impact or outcome}" },
  ];

  return (
    <section id="projects" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <SectionHeader
            label="03 · What I Did"
            title="Projects & Deliverables"
            subtitle="The stuff I actually worked on — not just coffee runs and Zoom calls (well, mostly)."
          />
        </FadeSection>

        {/* Project Background */}
        <FadeSection>
          <div style={{
            background: C.navyMid, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: 36, marginBottom: 32,
          }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 20 }}>
              Training Background & Project Involvement
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 8 }}>The Project(s)</div>
                <p style={{ color: C.offWhite, lineHeight: 1.8, fontSize: 14 }}>
                  {"{Describe the main project(s) you were involved in. What was being built or improved? What problem was it solving? Keep it clear — imagine explaining it to your lola.}"}
                </p>
              </div>
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 8 }}>Objectives & Company Alignment</div>
                <p style={{ color: C.offWhite, lineHeight: 1.8, fontSize: 14 }}>
                  {"{What were the main objectives of the project? How did they align with TFSPH's or myToyota Wallet's business goals? Connect the dots here.}"}
                </p>
              </div>
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 8 }}>My Specific Responsibilities</div>
                <ul style={{ color: C.offWhite, lineHeight: 2, fontSize: 14, paddingLeft: 18 }}>
                  <li>{"{Responsibility / Task 1}"}</li>
                  <li>{"{Responsibility / Task 2}"}</li>
                  <li>{"{Responsibility / Task 3}"}</li>
                  <li>{"{Responsibility / Task 4}"}</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Deliverables grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {deliverables.map((d, i) => (
            <FadeSection key={i}>
              <div className="card-hover" style={{
                background: C.navyMid, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 28, height: "100%",
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{d.icon}</div>
                <div className="pill" style={{ marginBottom: 12, alignSelf: "flex-start" }}>{d.type}</div>
                <h4 style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  fontSize: "1.1rem", color: C.white, marginBottom: 10,
                }}>{d.title}</h4>
                <p style={{ color: C.muted, lineHeight: 1.7, fontSize: 13, flex: 1, marginBottom: 16 }}>{d.desc}</p>
                <div style={{ background: `${C.red}18`, borderLeft: `3px solid ${C.red}`, padding: "8px 12px", borderRadius: "0 6px 6px 0" }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: C.red, marginBottom: 2 }}>Impact</div>
                  <div style={{ fontSize: 13, color: C.offWhite }}>{d.impact}</div>
                </div>
                <button style={{
                  marginTop: 16, background: "transparent",
                  border: `1px solid ${C.border}`, color: C.goldLight,
                  padding: "8px 0", borderRadius: 6, cursor: "pointer",
                  fontFamily: "'Barlow', sans-serif", fontSize: 12,
                  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                  transition: "all 0.2s",
                }}>
                  View Work Sample →
                </button>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Discipline-related solutions */}
        <FadeSection>
          <div style={{
            background: `linear-gradient(135deg, ${C.gold}0A, ${C.navyMid})`,
            border: `1px solid ${C.gold}33`, borderRadius: 16, padding: 36, marginTop: 32,
          }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 8 }}>
              How My BSIT Degree Actually Came in Handy
            </h3>
            <div className="accent-line" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})` }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
              {[
                { q: "The Challenge", a: "{What specific problem or gap did the company have that your IT knowledge helped address?}" },
                { q: "The Solution You Provided", a: "{What did you do — process improvement, system suggestion, documentation, automation, etc.? Be specific!}" },
                { q: "How It Was Integrated", a: "{Was your solution actually used? How did the team adopt it? What changed in their workflow because of you?}" },
              ].map(({ q, a }) => (
                <div key={q}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.gold, marginBottom: 8 }}>{q}</div>
                  <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

/* ── SECTION: Skills, Tools, Learning (combined) ── */
function SkillsSection() {
  const tools = [
    { cat: "Project Management", items: ["{Tool/Framework 1}", "{Tool/Framework 2}", "{Tool/Framework 3}"] },
    { cat: "Productivity & Docs", items: ["{Microsoft Office}", "{Google Workspace}", "{Tool 3}"] },
    { cat: "Communication", items: ["{Teams / Slack}", "{Zoom}", "{Other}"] },
    { cat: "Technical Skills", items: ["{Tool 1}", "{Tool 2}", "{Tool 3}"] },
  ];

  const softSkills = [
    { icon: "🗣️", skill: "Communication", desc: "{How you applied this during OJT}" },
    { icon: "🧩", skill: "Problem-Solving", desc: "{How you applied this during OJT}" },
    { icon: "🤝", skill: "Teamwork", desc: "{How you applied this during OJT}" },
    { icon: "⏰", skill: "Time Management", desc: "{How you applied this during OJT}" },
    { icon: "🔍", skill: "Attention to Detail", desc: "{How you applied this during OJT}" },
    { icon: "💡", skill: "Critical Thinking", desc: "{How you applied this during OJT}" },
  ];

  return (
    <section id="skills" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <SectionHeader
            label="04 · What I Gained"
            title="Skills, Tools & Growth"
            subtitle="The tech I touched, the soft skills I leveled up, and the professional glow-up in between."
          />
        </FadeSection>

        {/* Professional Learning summary */}
        <FadeSection>
          <div style={{
            background: C.navyMid, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: 36, marginBottom: 32,
          }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 16 }}>
              Professional Learning & Development
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 14 }}>
                {"{Summarize the skills, knowledge, and professional behaviors you developed. What did you learn that school couldn't teach? What was your biggest aha moment?}"}
              </p>
              <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 14 }}>
                {"{How did the OJT help you grow professionally? Talk about the workplace environment, corporate culture, industry practices, and what surprised you (good or bad).}"}
              </p>
            </div>
          </div>
        </FadeSection>

        {/* Tools grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
          {tools.map((t) => (
            <FadeSection key={t.cat}>
              <div className="card-hover" style={{
                background: C.navyMid, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: 24,
              }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.red, marginBottom: 12, fontWeight: 700 }}>{t.cat}</div>
                {t.items.map((item) => (
                  <div key={item} style={{
                    padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                    color: C.offWhite, fontSize: 14, fontWeight: 500,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Techniques banner */}
        <FadeSection>
          <div style={{
            background: `linear-gradient(135deg, ${C.red}15, ${C.slate}80)`,
            border: `1px solid ${C.red}33`, borderRadius: 16, padding: 32, marginBottom: 32,
          }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", textTransform: "uppercase", color: C.white, marginBottom: 16 }}>
              Modern Techniques & Methodologies
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                "{Agile / Scrum}", "{Project Management Framework}", "{Digital Documentation}",
                "{Stakeholder Management}", "{Risk Management}", "{Process Mapping}",
                "{Another Technique}", "{One More}",
              ].map(t => (
                <span key={t} className="pill" style={{ background: `${C.red}15`, borderColor: `${C.red}44`, color: C.offWhite }}>{t}</span>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Soft skills */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {softSkills.map((s) => (
            <FadeSection key={s.skill}>
              <div className="card-hover" style={{
                background: C.navyMid, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: 24,
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: C.white, marginBottom: 8 }}>{s.skill}</div>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SECTION: Reflection ── */
function ReflectionSection() {
  const reflections = [
    { emoji: "🏔️", title: "Biggest Challenges", content: "{What were the hardest parts of the OJT? Technical struggles? Fitting into corporate culture? Navigating adult life 9-to-5? Be real about it.}" },
    { emoji: "🏆", title: "Biggest Wins", content: "{What are you most proud of? A deliverable that got praised? A problem you solved on your own? That one moment you felt like a real professional?}" },
    { emoji: "🌱", title: "Personal Growth", content: "{How did you grow as a person — not just professionally, but as an individual? Did your confidence change? Your communication style? Your work ethic?}" },
    { emoji: "💼", title: "Key Takeaways", content: "{What are the top 3–5 things you're taking away from this OJT that will actually stick with you in your career?}" },
    { emoji: "🎓", title: "Understanding My Field Better", content: "{How did this OJT change or deepen your understanding of Information Technology — specifically in the context of project management and fintech?}" },
    { emoji: "🚀", title: "What's Next", content: "{How do you plan to use this experience moving forward — in your last year of school, job hunting, or in the career path you're building for yourself?}" },
  ];

  return (
    <section id="reflection" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <SectionHeader
            label="05 · Looking Back"
            title="OJT Reflection"
            subtitle="The unfiltered, honest, kinda sentimental wrap-up of the whole journey."
          />
        </FadeSection>

        {/* Timeline-style layout */}
        <div style={{ position: "relative", paddingLeft: 32 }}>
          {reflections.map((r, i) => (
            <FadeSection key={r.title}>
              <div style={{ position: "relative", marginBottom: 36 }} className="timeline-item">
                {i < reflections.length - 1 && <div className="timeline-line" />}
                <div className="card-hover" style={{
                  background: C.navyMid, border: `1px solid ${C.border}`,
                  borderRadius: 16, padding: 28,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ fontSize: 28, flexShrink: 0 }}>{r.emoji}</div>
                    <div>
                      <h4 style={{
                        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                        fontSize: "1.1rem", textTransform: "uppercase",
                        color: C.goldLight, marginBottom: 10, letterSpacing: "0.05em",
                      }}>{r.title}</h4>
                      <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 14 }}>{r.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Closing quote */}
        <FadeSection>
          <div style={{
            marginTop: 32, textAlign: "center", padding: 48,
            background: `linear-gradient(135deg, ${C.red}10, ${C.gold}08, ${C.navyMid})`,
            border: `1px solid ${C.border}`, borderRadius: 20,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
            <blockquote style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700, fontStyle: "italic",
              color: C.offWhite, lineHeight: 1.4,
              maxWidth: 600, margin: "0 auto 16px",
            }}>
              "{"{Insert your personal closing quote or motto that sums up your OJT journey — something that's genuinely you.}"}"
            </blockquote>
            <div style={{ fontSize: 13, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              — {"{Your Name}"}, Project Management Intern · myToyota Wallet
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{
      background: C.navyMid, borderTop: `1px solid ${C.border}`,
      padding: "48px 24px 32px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
              <span style={{ color: C.red }}>OJT</span> E-Portfolio
            </div>
            <p style={{ color: C.muted, fontSize: 13, maxWidth: 260, lineHeight: 1.7 }}>
              Made with <span style={{ color: C.red }}>♥</span> and a lot of late nights.<br />
              {"Alexander Fabian Guarin"} · BSIT 4th Year
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 12 }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {NAV_ITEMS.map(n => (
                <button key={n.id} onClick={() => document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: C.muted, textAlign: "left", fontSize: 13,
                    fontFamily: "'Barlow', sans-serif", fontWeight: 500,
                    transition: "color 0.2s", padding: 0,
                  }}
                  onMouseEnter={e => e.target.style.color = C.white}
                  onMouseLeave={e => e.target.style.color = C.muted}
                >{n.label}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 12 }}>Contact</div>
            <div style={{ color: C.offWhite, fontSize: 13, marginBottom: 6 }}>{"{your@email.com}"}</div>
            <div style={{ color: C.muted, fontSize: 12 }}>Metro Manila, Philippines</div>
            <Logos />
          </div>
        </div>

        <div className="divider" />
        <div style={{
          marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
          fontSize: 12, color: C.muted,
        }}>
          <span>© 2025 {"Alexander Fabian Guarin"}. OJT @ Toyota Financial Services Philippines Corp.</span>
          <span style={{ color: C.muted }}>Built with React + Tailwind · Designed with too much caffeine</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Active section tracker ── */
function useActiveSection() {
  const [active, setActive] = useState("profile");
  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ── APP ── */
export default function App() {
  const active = useActiveSection();

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .timeline-item::before { left: -20px; }
          .timeline-line { left: -15px; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }
      `}</style>
      <Navbar active={active} />
      <main>
        <Hero />
        <MarqueeStrip />
        <ProfileSection />
        <div className="divider" style={{ maxWidth: 1200, margin: "0 auto" }} />
        <CompanySection />
        <div className="divider" style={{ maxWidth: 1200, margin: "0 auto" }} />
        <ProjectsSection />
        <div className="divider" style={{ maxWidth: 1200, margin: "0 auto" }} />
        <SkillsSection />
        <div className="divider" style={{ maxWidth: 1200, margin: "0 auto" }} />
        <ReflectionSection />
      </main>
      <Footer />
    </>
  );
}