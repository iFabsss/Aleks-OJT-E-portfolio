import { useState, useEffect, useRef } from "react";
import aleksPhoto from "./assets/Aleks Photo.jpg";
import tfsLogo from "./assets/ToyotaFinancialServicesLogo.jpg";
import mtwLogo from "./assets/myToyotaWallet Logo.png";
import aleksPogiPhoto from "./assets/candidpogi.jpg";
import companyVisitPhoto from "./assets/companyvisit.jpg";
import mtwTeamLunchPhoto from "./assets/mtw teamlunch.jpg";
import internsGroupPhoto from "./assets/internpic.jpg";

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
  { id: "documentation", label: "Documentation" },
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
                {"I like to get stoned in a mile -> Milestone"}
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
              <img src={aleksPogiPhoto} alt="Alexander Fabian Guarin" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Project", val: "mTW" },
                { label: "Deliverables", val: "Too many to count" },
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
  const items = ["Project Management", "myToyota Wallet", "Toyota Financial Services", "Agile/SCRUM", "BSIT", "Intern", "Innovation"];
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
            //subtitle="The one and only."
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
                    {"I’m Alexander Fabian Guarin, a BSIT student from Pasay City, and someone who’s been competitive since high school, whether in academics, " + 
                    "hackathons, or even the occasional game. Outside of tech, I keep things balanced with hobbies like gaming, sports, playing musical instruments, " + 
                    "and watching documentaries. If there’s one thing that makes me memorable, it’s that I don’t just stick to one lane—I like exploring different interests " + 
                    "while still aiming to excel in what I do."}
                  </p>
                  <p style={{ color: C.muted, lineHeight: 1.85, marginBottom: 16 }}>
                    {"I graduated with honors from Pasay City National Science High School for both junior and senior high school, and I’m currently taking up Bachelor " + 
                    "of Science in Information Technology at Technological Institute of the Philippines Manila. Throughout my academic journey, I’ve consistently earned " + 
                    "Dean’s and VPAA List honors, reflecting my commitment to learning and growth. I’ve worked on various school projects and joined competitive environments " + 
                    "like hackathons, which strengthened both my technical and problem-solving skills. My interest in Information Technology grew from the challenge of building " +
                    "solutions and the opportunity to create something impactful from scratch."}
                  </p>
                  <p style={{ color: C.muted, lineHeight: 1.85 }}>
                    {"Looking ahead, I see myself in five years as either a Senior Developer, a Software Engineer, a Project Manager, or even someone who has launched a "+
                    "startup. I’m most excited by work that aligns with my strengths—where I can build, lead, and continuously improve. My experience as a Project Management "+
                    "Intern has already expanded my perspective, allowing me to develop not just technical skills but also leadership, communication, and strategic thinking. "+
                    "This OJT is a key step toward my long-term goals, helping me bridge the gap between academic knowledge and real-world application."}
                  </p>
                </div>
                <div style={{ minWidth: 180, maxWidth: 400, textAlign: "center" }}>
                  <img src={aleksPhoto} alt="Alexander Fabian Guarin" style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 24 }} />
                  <div style={{ textAlign: "left" }}>
                    {[
                    ["Full Name", "Alexander Fabian Guarin"],
                    ["Course", "BSIT — 4th Year"],
                    ["School", "Technological Institute of the Philippines - Manila"],
                    ["Email", "guarinfabian7@gmail.com | mafguarin@tip.edu.ph"],
                    //["OJT Period", "{Month Year – Month Year}"],
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
            subtitle="Toyota Financial Services PH + the myToyota Wallet team."
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
                  <img src={tfsLogo} alt="Toyota Financial Services PH" height="100%" />
                </div>
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 16 }}>
                Toyota Financial Services PH
              </h3>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                {"Toyota Financial Services Philippines Corporation (TFSPH) is a company in the financial services and automotive financing industry, primarily focused "+
                "on supporting vehicle ownership and dealership operations. Established in 2002 and headquartered in Taguig City (notably within the Bonifacio Global City "+
                "business district), TFSPH operates as part of the global network of Toyota Financial Services Corporation, which serves customers in over 37 countries. "+
                "In the Philippines, the company provides a range of services including auto loans, leasing, insurance, and inventory financing for Toyota dealers, helping "+
                "both individual customers and businesses access reliable financial solutions. Backed by its strong global affiliation and local partnership with GT Capital "+
                "Holdings Inc., TFSPH continues to grow as a key player in enabling accessible and flexible vehicle financing in the country."}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Financial Services", "Automotive", "Philippines", "Salcedo Village"].map(t => (
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
                  <img src={mtwLogo} alt="myToyota Wallet" height="100%" />
                </div>
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", textTransform: "uppercase", color: C.goldLight, marginBottom: 16 }}>
                myToyota Wallet
              </h3>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
                {"myTOYOTA Wallet is a digital money app brought to you by Toyota Financial Services Philippines Corporation. It brings together a range of "+
                "payment options in a single app which is connected to the entire Toyota ecosystem that now accepts mobile payments. ​"}
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
                    {"As a DTID – Payments Platform Intern, my day-to-day role progressed from observation and support in the early stages to more active involvement in coordination and documentation as I became more familiar with the team’s workflows. At the start, I mainly attended meetings, took notes, and learned how different units such as Treasury, IT, and business stakeholders collaborate on systems like MyToyotaWallet. Over time, I began contributing more by helping review and organize requirements, assisting in validating information, and supporting the preparation and refinement of documentation and test scripts. I also helped track updates from discussions and ensured that information shared across teams remained consistent and properly recorded. Overall, my role placed me within the project management structure as a support and coordination layer, helping bridge communication between technical and business teams while gaining hands-on experience in how complex payment platform projects are managed in a corporate environment."}
                  </p>
                  <br></br>
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
    { icon: "", 
      title: "myTOYOTA Wallet UI/UX Design Review Tracker", 
      type: "myTOYOTA Wallet", 
      desc: "This deliverable is a centralized tracker used to monitor UI/UX design review items for the myTOYOTA Wallet project. It lists pending tasks, assigned stakeholders, deadlines, and status updates to ensure that all teams (design, development, and business units) are aligned. It matters because UI/UX reviews often involve multiple revisions and approvals, and without proper tracking, delays and miscommunication can occur. This tracker helped maintain visibility and accountability across all stakeholders, ensuring that deliverables were completed on time and aligned with project requirements.", 
      impact: "Improved coordination among stakeholders, reduced delays in design approvals, and ensured timely completion of UI/UX deliverables, helping keep the myTOYOTA Wallet project on schedule.",
    },
    { icon: "", 
      title: "Dynamic WBS Gantt Chart", 
      type: "Gantt Chart", 
      desc: "This is a department-wide tool that combines a Work Breakdown Structure (WBS) and Gantt Chart into a single dynamic Excel file. I spearheaded its development using advanced formulas and formatting to automatically visualize task timelines, dependencies, and progress. It matters because project planning and tracking are critical in managing multiple initiatives, and having a dynamic, automated tool reduces manual effort and errors. This deliverable allowed teams to clearly break down tasks, assign responsibilities, and monitor deadlines efficiently.", 
      impact: "Enhanced project planning and monitoring across the department, improved task visibility, and enabled more efficient tracking of timelines, leading to better on-time delivery of projects." },
    { icon: "", 
      title: "Enhanced Dynamic Test Script", 
      type: "Test Script", 
      desc: "This deliverable is an improved version of the department’s test script template, designed to be dynamic and user-friendly. I spearheaded its development to include structured formatting, automated tracking, and built-in analytics. It also features mechanisms (listeners) that capture failed test cases and link them to the issue tracking system for faster resolution. This matters because testing is a critical phase in system development, and poorly managed test scripts can lead to missed issues and inefficiencies. This enhancement ensured that test cases are organized, easier to execute, and properly monitored.", 
      impact: "Improved testing efficiency and accuracy, faster identification and reporting of issues, and better collaboration between testers and developers, resulting in higher quality system outputs." },
    { icon: "", 
      title: "Project Prioritization Matrix", 
      type: "Prioritization Matrix", 
      desc: "This is a decision-making tool used across the department to evaluate and prioritize projects based on factors such as impact, effort, and resource requirements. I spearheaded its development to help the team objectively assess which projects should be prioritized. It matters because departments often handle multiple projects simultaneously, and without proper prioritization, resources may be misallocated. This matrix provided a structured approach to decision-making, ensuring that high-impact projects receive appropriate focus.", 
      impact: "Enabled better resource allocation and strategic planning, improved decision-making on project priorities, and ensured that high-value projects were addressed efficiently." },
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
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 8 }}>The Project</div>
                <p style={{ color: C.offWhite, lineHeight: 1.8, fontSize: 14 }}>
                  {"During my internship at Toyota Financial Services Philippines Corporation, I was involved in the myTOYOTA Wallet Payments Platform project. The goal of the project was to improve how customers pay for their Toyota-related transactions (such as financing and services) using a digital wallet."}
                </p>
                <br></br>
                <p style={{ color: C.offWhite, lineHeight: 1.8, fontSize: 14 }}>
                  {"In simple terms, the team was building and improving a system that makes payments faster, more convenient, and more secure—so instead of going through manual or complicated processes, customers can easily pay through their phones. It also helped the company reduce delays, avoid errors, and better track transactions."}
                </p>
              </div>
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 8 }}>Objectives & Company Alignment</div>
                <p style={{ color: C.offWhite, lineHeight: 1.8, fontSize: 14 }}>
                  {"The main objectives of the project were to:"}
                  <br></br>
                  <br></br>
                  <ul style={{ color: C.offWhite, lineHeight: 2, fontSize: 14, paddingLeft: 18 }}>
                    <li>{"Streamline and digitize payment processes"}</li>
                    <li>{"Improve user experience for customers using the myTOYOTA Wallet"}</li>
                    <li>{"Ensure accurate and efficient handling of transactions"}</li>
                    <li>{"Strengthen coordination between departments involved in payments"}</li>
                  </ul>
                  <br></br>
                  {"These objectives directly support Toyota Financial Services Philippines Corporation’s goal of digital transformation and customer convenience. By improving the payment platform, the company can serve customers faster, reduce operational issues, and stay competitive in financial technology services."}
                </p>
              </div>
              <div>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 8 }}>My Specific Responsibilities</div>
                <ul style={{ color: C.offWhite, lineHeight: 2, fontSize: 14, paddingLeft: 18 }}>
                  <li>{"Created and maintained project schedules and timelines"}</li>
                  <li>{"Coordinated with multiple stakeholders (e.g., Treasury, MyToyota Wallet team)"}</li>
                  <li>{"Ensured processes and workflows were aligned across departments"}</li>
                  <li>{"Assisted in reviewing and refining business and system requirements"}</li>
                  <li>{"Followed up on pending cases, issues, and clarifications"}</li>
                  <li>{"Helped document processes, updates, and meeting discussions"}</li>
                  <li>{"Provided suggestions and fresh ideas to improve workflows and efficiency"}</li>
                  <li>{"Supported testing activities (e.g., reviewing test scripts and revisions)"}</li>
                  <li>{"Participated in meetings to clarify requirements and resolve concerns"}</li>
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
                <button 
                  onClick={() => 
                    d.link ? window.open(d.link, "_blank") : alert("REDACTED VIA NDA")
                  }
                style={{
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
                { q: "The Challenge", a: "The department handled multiple projects at the same time, particularly for the myTOYOTA Wallet Payments Platform, but there was a gap in having standardized, dynamic, and centralized tools for tracking progress, managing tasks, prioritizing projects, and handling testing processes. Many workflows relied on manual updates, scattered files, or static formats, which led to inefficiencies such as delayed updates, misalignment between stakeholders, difficulty in tracking progress, and slower issue resolution during testing." },
                { q: "The Solution You Provided", a: "To address these gaps, I contributed by developing and improving several IT-driven and process-oriented solutions:\n\n" +
                "- Designed a UI/UX Design Review Tracker to centralize and monitor pending items, ensuring alignment across stakeholders\n" + 
                "- Spearheaded a Dynamic WBS Gantt Chart in Excel with automated formulas to improve project scheduling, task breakdown, and progress tracking\n" + 
                "- Developed an Enhanced Dynamic Test Script with structured formatting, analytics, and failure-listening mechanisms to improve testing efficiency and issue reporting\n" +
                "- Created a Project Prioritization Matrix to help the department evaluate and prioritize projects based on impact, effort, and resource requirements\n\n" + 
                "These solutions focused on process improvement, automation, and better documentation, making workflows more organized, efficient, and data-driven."},
                { q: "How It Was Integrated", a: "The solutions were adopted by the department and integrated into their daily workflows:\n\n" +
                "- The UI/UX Design Review Tracker and Dynamic WBS Gantt Chart were actively used by teams as standard tools for tracking deliverables, timelines, and project progress, improving visibility and coordination across stakeholders\n" +
                "- The Enhanced Dynamic Test Script and Project Prioritization Matrix are currently under revision and continuous improvement, with feedback being gathered from stakeholders to further refine their functionality and usability before full implementation\n\n" +
                "Even at this stage, these tools contributed to improving discussions, planning approaches, and awareness of better systems, while laying the groundwork for more structured and efficient workflows once fully deployed"
                 },
              ].map(({ q, a }) => (
                <div key={q}>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: C.gold, marginBottom: 8 }}>{q}</div>
                  <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 14, whiteSpace: "pre-line" }}>{a}</p>
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
    { cat: "Project Management", items: ["SDLC", "Agile + Scrum"] },
    { cat: "Productivity & Docs", items: ["Microsoft Office", "Google Workspace"] },
    { cat: "Communication", items: ["Microsoft Teams", "Slack", "Outlook"] },
    
  ];

  const softSkills = [
    { icon: "🗣️", skill: "Communication", desc: "I applied communication by regularly coordinating with different stakeholders such as the Treasury team and the myTOYOTA Wallet team. I ensured that requirements, updates, and issues were clearly understood by all parties through meetings, follow-ups, and documentation." },
    { icon: "🧩", skill: "Problem-Solving", desc: "I used problem-solving when identifying gaps in existing workflows, such as inefficient tracking and unclear processes. I addressed these by proposing and developing improved tools like dynamic trackers, test scripts, and prioritization matrices." },
    { icon: "🤝", skill: "Teamwork", desc: "I practiced teamwork by collaborating with multiple departments and team members, ensuring alignment in tasks and deliverables. I supported team efforts by assisting in documentation, testing, and coordination to achieve shared project goals." },
    { icon: "⏰", skill: "Time Management", desc: "I applied time management by handling multiple tasks and deliverables simultaneously, such as maintaining trackers, updating documents, and following up on pending items, while ensuring deadlines were met." },
    { icon: "🔍", skill: "Attention to Detail", desc: "I demonstrated attention to detail when reviewing requirements, test scripts, and deliverables to ensure accuracy and completeness, minimizing errors that could affect project timelines and outputs." },
    { icon: "💡", skill: "Critical Thinking", desc: "I used critical thinking when analyzing project workflows and identifying areas for improvement. I evaluated different approaches and suggested structured, data-driven solutions to enhance efficiency and decision-making." },
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
                {"During my internship, I developed both technical and professional skills that go beyond what is typically taught in school. I improved my project management skills, particularly in scheduling, task tracking, and stakeholder coordination. I also enhanced my ability in process improvement and documentation, creating structured and dynamic tools such as trackers, Gantt charts, and test scripts. On the soft skills side, I strengthened my communication, teamwork, and initiative, especially when coordinating with different departments and following up on tasks. What I learned that school could not fully teach is how to navigate real-world ambiguity—requirements are not always clear, and you often need to ask the right questions, adapt quickly, and take initiative to move things forward. My biggest “aha” moment was realizing that success in projects is not just about technical skills, but about alignment and communication—even the best solution will fail if stakeholders are not aligned."}
              </p>
              <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 14 }}>
                {"The OJT helped me grow professionally by exposing me to an actual corporate environment at Toyota Financial Services Philippines Corporation, where structure, accountability, and collaboration are critical. I learned how corporate culture emphasizes professionalism, respect for timelines, and clear communication, especially when working with multiple teams. I was introduced to real industry practices such as stakeholder meetings, requirement validation, testing cycles, and continuous improvement of processes. One thing that surprised me was how fast-paced and detail-oriented the work environment is—small mistakes can have larger impacts, so accuracy and clarity are very important. On the positive side, I also observed how teams collaborate and support each other to achieve common goals, which showed me the importance of teamwork in a professional setting. Overall, the experience helped me transition from a student mindset to a more professional, responsible, and proactive individual."}
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, textAlign: "center", justifyContent: "center" }}>
              {[
                "Agile / Scrum", "Project Management Lifecycle (SDLC)", "Work Breakdown Structure (WBS)", "Gantt Chart Scheduling", 
                "Stakeholder Coordination & Management", "Process Improvement & Optimization", "Workflow / Process Mapping", 
                "Requirements Gathering & Validation", "Test Case Design & Management", "Data-Driven Decision Making (Project Prioritization)", 
                "Risk Identification & Monitoring", "Task Tracking & Progress Monitoring Systems", "Documentation Standardization",
              ].map(t => (
                <span key={t} className="pill" style={{ background: `${C.red}15`, borderColor: `${C.red}44`, color: C.offWhite }}>{t}</span>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Soft skills */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, textAlign: "center",  }}>
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
    { emoji: "🏔️", title: "Biggest Challenges", content: "One of the hardest parts of my OJT was adjusting to the corporate environment and expectations. Unlike school, tasks were not always clearly defined, and I had to learn how to ask the right questions and take initiative. Managing multiple deliverables at the same time while coordinating with different stakeholders was also challenging, especially when timelines were tight. There were moments where I had to step out of my comfort zone—speaking in meetings, following up with professionals, and making sure I was contributing value. It was also an adjustment to the 9-to-5 routine, where consistency, focus, and accountability are expected every day." },
    { emoji: "🏆", title: "Biggest Wins", content: "What I am most proud of is being able to spearhead department-wide deliverables such as the Dynamic WBS Gantt Chart, Enhanced Test Script, and Project Prioritization Matrix. Knowing that my work was not just for a single task but could potentially be used across the department made me feel like I was contributing something meaningful. There were also moments when my suggestions were acknowledged during discussions, and when stakeholders used the trackers I created, it made me feel like a real professional—not just an intern." },
    { emoji: "🌱", title: "Personal Growth", content: "This experience helped me grow not just professionally, but personally. I became more confident in communicating, especially when interacting with different teams and professionals. I also developed a stronger sense of responsibility and discipline, knowing that my work could affect actual projects and timelines. My mindset shifted from simply completing tasks to delivering value and thinking ahead. I became more proactive, more detail-oriented, and more aware of how I present myself in a professional setting." },
    { emoji: "💼", title: "Key Takeaways", content: "- Communication and alignment are just as important as technical skills\n" + 
    "- Initiative and proactiveness can set you apart, even as an intern\n" +
    "- Real-world projects require adaptability—things don’t always go as planned\n" +
    "- Structured processes and proper documentation make a huge difference\n" +
    "- Collaboration is key—no project succeeds alone"
    },
    { emoji: "🎓", title: "Understanding My Field Better", content: "This OJT deepened my understanding of Information Technology by showing me that IT is not just about coding—it’s also about managing systems, processes, and people. In the context of project management and fintech, I saw how important it is to ensure that systems are reliable, efficient, and aligned with business goals. I learned how different teams—business, technical, and operations—work together to deliver a single platform like the myTOYOTA Wallet, and how project management plays a critical role in keeping everything on track." },
    { emoji: "🚀", title: "What's Next", content: "Moving forward, I plan to use this experience to become more competitive and prepared for my future career. In my final year, I will apply what I learned in terms of project management, documentation, and teamwork in my academic projects. As I start job hunting, I will carry the confidence and professionalism I developed during my OJT. This experience also opened my eyes to the fintech industry and project management roles, and I am now more motivated to pursue opportunities where I can continue building systems, improving processes, and creating meaningful impact." },
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
                      <p style={{ color: C.muted, lineHeight: 1.85, fontSize: 14, whiteSpace: "pre-line" }}>{r.content}</p>
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
              "{"Internships are like alcohol, the slowly you ferment it, the better the taste."}"
            </blockquote>
            <div style={{ fontSize: 13, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              — {"Aleks"}, Project Management Intern · myToyota Wallet
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
              Made with a lot of ☕.<br />
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
            <div style={{ color: C.offWhite, fontSize: 13, marginBottom: 6 }}>{"guarinfabian7@gmail.com | mafguarin@tip.edu.ph"}</div>
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

/* ── SECTION: Documentation ── */
function DocumentationSection() {
  const docs = [
    {
      image: mtwTeamLunchPhoto,
      caption: "Payment Platform Team Lunch",
      description: "The first ever team lunch for the myTOYOTA Wallet Payments Platform team! This was a great opportunity for us to bond outside of work and get to know each other better. We shared stories, laughed over food, and strengthened our team camaraderie. It was a memorable moment that helped build stronger relationships among team members, which in turn improved our collaboration and communication during projects.",
    },
    {
      image: companyVisitPhoto,
      caption: "OJT Coordinator Company Visit",
      description: "The OJT coordinator visited our company to discuss the progress of the intern (me) and provide feedback on their performance. This visit was significant as it allowed us to address any concerns and ensure that the intern were on track with their learning objectives.",
    },
    {
      image: internsGroupPhoto,
      caption: "DTID Group Photo with Interns",
      description: "A group photo with the Digital Transformation and Innovation Department, mostly the interns. This photo captures the camaraderie and team spirit we shared during our internship journey. It was a great way to commemorate our time together and the friendships we built while working on various projects.",
    },
  ];
 
  return (
    <section id="documentation" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeSection>
          <SectionHeader
            label="06 · The Receipts"
            title="Documentation"
            subtitle="Because if there's no photo, did it even happen? Here's proof I actually showed up."
          />
        </FadeSection>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {docs.map((d, i) => (
            <FadeSection key={i}>
              <div className="card-hover" style={{
                background: C.navyMid, border: `1px solid ${C.border}`,
                borderRadius: 16, overflow: "hidden",
              }}>
                {/* Image placeholder */}
                <div style={{
                  width: "100%", aspectRatio: "16/9",
                  background: `linear-gradient(135deg, ${C.slate}, ${C.navyMid})`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 10,
                  borderBottom: `1px solid ${C.border}`,
                  position: "relative", overflow: "hidden",
                }}>
                  {d.image && <img src={d.image} alt={d.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: C.red, borderRadius: 4,
                    padding: "3px 8px", fontSize: 10,
                    fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  }}>
                    #{String(i + 1).padStart(2, "0")}
                  </div>
                </div>
 
                {/* Caption & description */}
                <div style={{ padding: 24 }}>
                  <p style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: "1rem",
                    color: C.goldLight, marginBottom: 10,
                    textTransform: "uppercase", letterSpacing: "0.04em",
                    lineHeight: 1.4,
                  }}>{d.caption}</p>
                  <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.8 }}>{d.description}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
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
        <div className="divider" style={{ maxWidth: 1200, margin: "0 auto" }} />
        <DocumentationSection />
      </main>
      <Footer />
    </>
  );
}