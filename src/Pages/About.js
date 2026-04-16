import { useEffect, useRef, useState } from "react";
import STATS from "../data/stats";
import { PARAGRAPHS,IMAGES } from "../data/AboutData";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// ─── Scroll-progress hook (0 → 1 while element is in viewport) ───────────────
function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // 0 when top of el hits bottom of viewport, 1 when bottom of el hits top
      const raw = 1 - rect.bottom / (winH + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return [ref, progress];
}


// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedStat({ value, label, inView }) {
  return (
    <div
      style={{
        transition: "opacity 0.7s ease, transform 0.7s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 800,
          color: "#E8192C",
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginTop: "6px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const About = () => {
  const [sectionRef, progress] = useScrollProgress();
  const [headerRef, headerInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [isShortViewport, setIsShortViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight < 820 : false
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsShortViewport(window.innerHeight < 820);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isCompactDesktop = !isMobile && isShortViewport;

  // Which image to show (0–3) based on scroll progress across the section
  const activeImg = isMobile
    ? 0
    : Math.min(IMAGES.length - 1, Math.floor(progress * IMAGES.length));

  // Which paragraph to highlight
  const activePara = isMobile
    ? PARAGRAPHS.length - 1
    : Math.min(PARAGRAPHS.length - 1, Math.floor(progress * PARAGRAPHS.length));

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .about-img-slide {
          position: absolute;
          inset: 0;
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .about-img-slide.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }
        .about-img-slide.inactive {
          opacity: 0;
          transform: scale(1.04);
          z-index: 1;
        }

        .para-block {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .para-block.active {
          opacity: 1;
          transform: translateX(0);
        }
        .para-block.inactive {
          opacity: 0.22;
          transform: translateX(-8px);
        }

        .lm-cta {
          position: relative;
          overflow: hidden;
          background: #E8192C;
          color: #fff;
          border: none;
          padding: 14px 36px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lm-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .lm-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(232,25,44,0.45);
        }
        .lm-cta:hover::after { opacity: 1; }
        .lm-cta:active { transform: translateY(0); }

        .img-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          cursor: default;
        }
        .img-dot.active {
          width: 20px;
          border-radius: 3px;
          background: #E8192C;
        }

        .eyebrow-line {
          display: inline-block;
          width: 24px;
          height: 1.5px;
          background: #E8192C;
          margin-right: 10px;
          vertical-align: middle;
          margin-bottom: 2px;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 10;
          border-radius: inherit;
        }
      `}</style>

      {/*
        ── STICKY SCROLL SECTION ──────────────────────────────────────────────
        The section is tall (400vh) to create scroll real estate.
        The inner content is sticky so it stays in view while user scrolls.
      */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          height: isMobile ? "auto" : "400vh",
          minHeight: isMobile ? "100vh" : "auto",
          background: "#0A0A0A",
        }}
      >
        {/* Sticky wrapper */}
        <div
          style={{
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "auto" : 0,
            height: isMobile ? "auto" : "100vh",
            overflow: isMobile ? "visible" : "hidden",
            display: "flex",
            flexDirection: "column",

          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "-10%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,25,44,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── HEADER (fades in once) ── */}
          <div
            ref={headerRef}
            style={{
              padding: isMobile
                ? "104px 20px 0"
                : isCompactDesktop
                ? "36px clamp(20px, 4vw, 48px) 0"
                : "clamp(48px, 8vh, 80px) clamp(24px, 6vw, 80px) 0",
              transition: "opacity 0.9s ease, transform 0.9s ease",
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(232,25,44,0.1)",
                border: "0.5px solid rgba(232,25,44,0.3)",
                borderRadius: "100px",
                padding: "6px 16px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: "#E8192C",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#E8192C",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                About LM Advertising
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.1rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                color: "#FAFAFA",
                maxWidth: "520px",
              }}
            >
              A Vision That{" "}
              <span style={{ color: "#E8192C" }}>Builds Brands</span>
            </h2>
          </div>

          {/* ── MAIN CONTENT GRID ── */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isCompactDesktop ? "clamp(16px, 2vw, 28px)" : "clamp(24px, 4vw, 60px)",
              padding: isMobile
                ? "20px 20px 28px"
                : isCompactDesktop
                ? "16px clamp(20px, 4vw, 48px)"
                : "clamp(24px, 4vh, 40px) clamp(24px, 6vw, 80px)",
              alignItems: "center",
              minHeight: 0,
            }}
          >
            {/* ── LEFT: Scroll-driven image ── */}
            <div
              style={{
                position: "relative",
                height: isMobile
                  ? "clamp(260px, 46vh, 380px)"
                  : isCompactDesktop
                  ? "clamp(250px, 42vh, 410px)"
                  : "clamp(320px, 50vh, 520px)",
                borderRadius: "20px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div className="noise-overlay" />

              {IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`about-img-slide ${i === activeImg ? "active" : "inactive"}`}
                  style={isMobile && i !== activeImg ? { display: "none" } : undefined}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {/* Dark overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                    }}
                  />
                </div>
              ))}

              {/* Image label at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {IMAGES[activeImg].year}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FAFAFA",
                    }}
                  >
                    {IMAGES[activeImg].label}
                  </div>
                </div>

                {/* Dot indicators */}
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  {IMAGES.map((_, i) => (
                    <div
                      key={i}
                      className={`img-dot ${i === activeImg ? "active" : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Red left border accent */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: "3px",
                  background: "#E8192C",
                  borderRadius: "0 3px 3px 0",
                  zIndex: 10,
                }}
              />
            </div>

            {/* ── RIGHT: Scroll-driven paragraphs ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isCompactDesktop ? "clamp(10px, 1.3vh, 16px)" : "clamp(14px, 2.5vh, 24px)",
                minHeight: 0,
                justifyContent: "center",
              }}
            >
              {PARAGRAPHS.map((p, i) => (
                <div
                  key={i}
                  className={`para-block ${isMobile || i === activePara ? "active" : "inactive"}`}
                  style={{
                    borderLeft: `2px solid ${
                      isMobile || i === activePara ? "#E8192C" : "rgba(255,255,255,0.07)"
                    }`,
                    paddingLeft: isCompactDesktop ? "14px" : "20px",
                    transition:
                      "opacity 0.5s ease, transform 0.5s ease, border-color 0.4s ease",
                    transitionDelay: `${i * 0.04}s`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 500,
                      color:
                        isMobile || i === activePara
                          ? "#E8192C"
                          : "rgba(255,255,255,0.25)",
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {p.eyebrow}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isCompactDesktop
                        ? "clamp(12px, 1vw, 13px)"
                        : "clamp(13px, 1.4vw, 15px)",
                      fontWeight: isMobile || i === activePara ? 400 : 300,
                      lineHeight: isCompactDesktop ? 1.55 : 1.7,
                      color:
                        isMobile || i === activePara
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(255,255,255,0.3)",
                      margin: 0,
                      transition: "color 0.4s ease, font-weight 0.4s ease",
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}

              {/* CTA — visible when last para is active */}
              <div
                style={{
                  marginTop: "8px",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: isMobile || activePara === PARAGRAPHS.length - 1 ? 1 : 0,
                  transform:
                    isMobile || activePara === PARAGRAPHS.length - 1
                      ? "translateY(0)"
                      : "translateY(12px)",
                }}
              >
                <button
                  className="lm-cta"
                  style={isCompactDesktop ? { padding: "11px 24px", fontSize: "12px" } : undefined}
                >
                  Start Your Project →
                </button>
              </div>
            </div>
          </div>

          {/* ── STATS STRIP ── */}
          <div
            ref={statsRef}
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.06)",
              padding: isMobile
                ? "20px 20px 28px"
                : isCompactDesktop
                ? "10px clamp(20px, 4vw, 48px) 14px"
                : "clamp(16px, 3vh, 28px) clamp(24px, 6vw, 80px)",
              display: "flex",
              gap: isCompactDesktop ? "clamp(18px, 3vw, 38px)" : "clamp(32px, 6vw, 80px)",
              alignItems: "center",
              flexWrap: isMobile ? "wrap" : "nowrap",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                <AnimatedStat {...s} inView={statsInView} />
              </div>
            ))}

            <div
              style={{
                marginLeft: isMobile ? 0 : "auto",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                transition: "opacity 0.8s ease 0.5s",
                opacity: statsInView ? 1 : 0,
                width: isMobile ? "100%" : "auto",
              }}
            >
              {isMobile ? "LM Advertising" : "Scroll to explore ↓"}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
