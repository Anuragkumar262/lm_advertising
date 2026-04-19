import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useOutletContext } from "react-router";
import STATS from "../data/stats";
import { IMAGES, PARAGRAPHS ,CEO_PROFILE} from "../data/AboutData";

const STEPS = PARAGRAPHS.map((item, index) => ({
  ...item,
  image: IMAGES[index % IMAGES.length],
}));



const About = () => {
  const outletContext = useOutletContext();
  const theme = outletContext?.theme ?? "light";
  const isDark = theme === "dark";
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const nextStep = Math.min(
        STEPS.length - 1,
        Math.floor(value * STEPS.length)
      );
      setActiveStep(nextStep);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          height: `${Math.max(STEPS.length * 100, 260)}vh`,
          background: isDark ? "#0f1014" : "#f4f5f8",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100svh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={STEPS[activeStep].image.src}
              src={STEPS[activeStep].image.src}
              alt={STEPS[activeStep].image.label}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </AnimatePresence>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                isDark
                  ? "linear-gradient(180deg, rgba(8,10,16,0.45) 0%, rgba(8,10,16,0.3) 42%, rgba(8,10,16,0.72) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(245,246,250,0.26) 42%, rgba(15,16,20,0.52) 100%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: isMobile
                ? "104px 14px 16px"
                : "116px clamp(24px, 6vw, 80px) 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "760px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "999px",
                  padding: "8px 14px",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.24)"
                    : "1px solid rgba(17,17,20,0.2)",
                  background: isDark
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(255,255,255,0.52)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background: "#E8192C",
                  }}
                />
                <span
                  style={{
                    color: isDark ? "rgba(255,255,255,0.92)" : "rgba(17,17,20,0.88)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  About LM Advertising
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    marginTop: "14px",
                    background: isDark ? "rgba(7,9,14,0.42)" : "rgba(255,255,255,0.58)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.18)"
                      : "1px solid rgba(17,17,20,0.12)",
                    borderRadius: "18px",
                    padding: isMobile ? "14px" : "20px 22px",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#FF7A86",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "2.2px",
                      textTransform: "uppercase",
                      fontSize: "11px",
                    }}
                  >
                    {STEPS[activeStep].eyebrow}
                  </p>
                  <h2
                    style={{
                      margin: "10px 0 10px",
                      color: isDark ? "#ffffff" : "#12131a",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(1.9rem, 5vw, 4.2rem)",
                      lineHeight: 1.03,
                      letterSpacing: "-1px",
                      maxWidth: "650px",
                    }}
                  >
                    {STEPS[activeStep].image.label}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: isDark ? "rgba(255,255,255,0.9)" : "rgba(17,17,20,0.86)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(14px, 1.5vw, 18px)",
                      lineHeight: 1.75,
                      maxWidth: "680px",
                    }}
                  >
                    {STEPS[activeStep].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              style={{
                display: "grid",
                gap: isMobile ? "10px" : "12px",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  gridColumn: isMobile ? "1 / -1" : "1 / -1",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "2px",
                }}
              >
                {STEPS.map((_, i) => (
                  <motion.span
                    key={`progress-${i}`}
                    animate={{
                      width: i === activeStep ? 28 : 8,
                      opacity: i === activeStep ? 1 : 0.45,
                      backgroundColor: i === activeStep ? "#E8192C" : isDark ? "#ffffff" : "#111111",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      height: "8px",
                      borderRadius: "999px",
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>

              {STATS.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    borderRadius: "14px",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(17,17,20,0.14)",
                    background: isDark ? "rgba(8,10,16,0.5)" : "rgba(255,255,255,0.54)",
                    backdropFilter: "blur(8px)",
                    padding: isMobile ? "10px 12px" : "12px 14px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: isDark ? "#ffffff" : "#111319",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: isDark ? "rgba(255,255,255,0.72)" : "rgba(17,17,20,0.65)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "1.6px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
      </section>
      <section
        style={{
          padding: isMobile ? "42px 14px 56px" : "72px clamp(24px, 6vw, 80px) 96px",
          background: isDark ? "#0b0d12" : "#ffffff",
          borderTop: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(17,17,20,0.08)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(270px, 0.85fr) minmax(360px, 1.15fr)",
            gap: isMobile ? "16px" : "24px",
            alignItems: "stretch",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.015 }}
            style={{
              position: "relative",
              borderRadius: "18px",
              overflow: "hidden",
              minHeight: isMobile ? "280px" : "360px",
              boxShadow: "0 14px 36px rgba(0,0,0,0.16)",
            }}
          >
            <motion.div
              animate={{
                opacity: [0.35, 0.6, 0.35],
                scale: [1, 1.06, 1],
              }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "48%",
                height: "48%",
                right: "-10%",
                top: "-12%",
                borderRadius: "999px",
                background: "radial-gradient(circle, rgba(232,25,44,0.32), rgba(232,25,44,0))",
                pointerEvents: "none",
              }}
            />
            <motion.img
              src={CEO_PROFILE.image}
              alt={CEO_PROFILE.name}
              initial={{ scale: 1.08, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            style={{
              position: "relative",
              borderRadius: "18px",
              padding: isMobile ? "16px" : "22px 24px",
              border: isDark
                ? "1px solid rgba(255,255,255,0.16)"
                : "1px solid rgba(17,17,20,0.12)",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.68)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 0.18, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              style={{
                position: "absolute",
                right: isMobile ? "12px" : "18px",
                top: isMobile ? "4px" : "8px",
                fontFamily: "'Syne', sans-serif",
                fontSize: isMobile ? "58px" : "76px",
                color: "#E8192C",
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              "
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
              style={{
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#E8192C",
                fontWeight: 700,
              }}
            >
              Know Your CEO
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.48, ease: "easeOut", delay: 0.18 }}
              style={{
                margin: "8px 0 6px",
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.5px",
                color: isDark ? "#ffffff" : "#111319",
              }}
            >
              {CEO_PROFILE.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.48, ease: "easeOut", delay: 0.24 }}
              style={{
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.4px",
                color: isDark ? "rgba(255,255,255,0.8)" : "rgba(17,17,20,0.72)",
              }}
            >
              {CEO_PROFILE.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
              style={{
                margin: "16px 0 0",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(14px, 1.25vw, 16px)",
                lineHeight: 1.8,
                color: isDark ? "rgba(255,255,255,0.88)" : "rgba(17,17,20,0.86)",
              }}
            >
              {CEO_PROFILE.message}
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
