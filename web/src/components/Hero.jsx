import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* ─── Timing for the initial word reveal ─── */
const WORD_DELAY_BASE = 0.15;
const WORD_STAGGER = 0.12;
const WORD_DURATION = 0.55;

/* ─── Floating card bob presets (smoother, subtler) ─── */
const floatConfigs = [
  { y: [0, -8, 0], duration: 4.5, delay: 0 },
  { y: [0, -6, 0], duration: 5.2, delay: 0.5 },
  { y: [0, -5, 0], duration: 4.0, delay: 1.0 },
  { y: [0, -7, 0], duration: 4.8, delay: 0.3 },
  { y: [0, -6, 0], duration: 5.5, delay: 0.8 },
];

/* ─── Smooth spring config ─── */
const SMOOTH = { stiffness: 100, damping: 25, mass: 0.6 };

export default function Hero() {
  const [headingReady, setHeadingReady] = useState(false);
  const containerRef = useRef(null);

  const line1Words = ['Your', 'Campus,'];
  const line2Words = ['One', 'Super', 'App'];
  const totalWords = line1Words.length + line2Words.length;

  const lastWordFinishMs =
    (WORD_DELAY_BASE + (totalWords - 1) * WORD_STAGGER + WORD_DURATION) * 1000;

  useEffect(() => {
    const t = setTimeout(() => setHeadingReady(true), lastWordFinishMs + 200);
    return () => clearTimeout(t);
  }, [lastWordFinishMs]);

  /* ─── Scroll-linked progress ───
     The outer container is 200vh tall.
     The inner sticky viewport is 100vh.
     As the user scrolls the extra 100vh, progress goes 0 → 1.
  */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothed scroll progress
  const p = useSpring(scrollYProgress, SMOOTH);

  // ── Headline transforms ──
  const line1X = useTransform(p, [0, 0.5], ['0%', '30%']);
  const line2X = useTransform(p, [0, 0.5], ['0%', '-30%']);
  const headingScale = useTransform(p, [0, 0.5], [1, 0.85]);

  // Professional depth of field effect
  const headingOpacity = useTransform(p, [0.1, 0.45], [1, 0]);
  const headingBlur = useTransform(p, [0.1, 0.45], ['blur(0px)', 'blur(12px)']);

  // ── Subtitle fade ──
  const subtitleOpacity = useTransform(p, [0, 0.25], [1, 0]);
  const subtitleY = useTransform(p, [0, 0.25], [0, -15]);

  // ── Phone transforms ──
  const phoneScale = useTransform(p, [0.2, 0.6], [0.25, 1]);
  const phoneOpacity = useTransform(p, [0.15, 0.45], [0, 1]);
  const phoneY = useTransform(p, [0.2, 0.6], [200, 0]);

  // ── Cards transforms ──
  const cardsOpacity = useTransform(p, [0.45, 0.7], [0, 1]);
  const cardsScale = useTransform(p, [0.45, 0.7], [0.75, 1]);

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(p, [0, 0.1], [0.5, 0]);

  return (
    /* Outer scroll container — 200vh for the scroll animation space */
    <div ref={containerRef} className="hero-scroll-container">
      {/* Sticky inner viewport — stays pinned while scrolling */}
      <div className="hero-sticky-viewport">
        <section className="relative w-full h-full flex flex-col overflow-hidden">
          {/* Animated orbs background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
            <div className="hero-orb hero-orb-4" />
          </div>

          {/* ─── Content ─── */}
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center items-center relative w-full pt-[88px]">
            {/* ════════ HEADLINE ════════ */}
            <div style={{ position: 'relative', zIndex: 15, textAlign: 'center' }}>
              {/* Line 1 → slides RIGHT */}
              <motion.div style={{ x: line1X, scale: headingScale, opacity: headingOpacity, filter: headingBlur }}>
                <h1 className="font-serif text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[1.08] tracking-[-0.02em] text-text-main text-center whitespace-nowrap">
                  {line1Words.map((w, i) => (
                    <motion.span
                      key={`l1-${i}`}
                      initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: WORD_DURATION,
                        delay: WORD_DELAY_BASE + i * WORD_STAGGER,
                        ease: EASE,
                      }}
                      className="inline-block mr-[0.3em]"
                    >
                      {w}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>

              {/* Line 2 → slides LEFT */}
              <motion.div style={{ x: line2X, scale: headingScale, opacity: headingOpacity, filter: headingBlur }}>
                <h1 className="font-serif text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[1.08] tracking-[-0.02em] text-text-main text-center whitespace-nowrap">
                  {line2Words.map((w, i) => {
                    const globalIdx = line1Words.length + i;
                    return (
                      <motion.span
                        key={`l2-${i}`}
                        initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: WORD_DURATION,
                          delay: WORD_DELAY_BASE + globalIdx * WORD_STAGGER,
                          ease: EASE,
                        }}
                        className="inline-block mr-[0.3em]"
                      >
                        {w}
                      </motion.span>
                    );
                  })}
                </h1>
              </motion.div>
            </div>

            {/* Subtitle + CTA */}
            <motion.div
              className="text-center mt-3 mb-4"
              style={{
                opacity: subtitleOpacity,
                y: subtitleY,
                position: 'relative',
                zIndex: 14,
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
                className="text-[15px] sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed mb-5"
              >
                Marketplace to trade gear. Community to find roommates & teams.
                Arena to challenge rival colleges. All verified. All on campus.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
                className="flex justify-center"
              >
                <a
                  href="#download"
                  className="btn-shimmer bg-text-main text-white px-7 py-2.5 rounded-full text-[14px] font-medium
                    hover:scale-[var(--hover-scale)] hover:shadow-[var(--hover-shadow)] transition-all duration-300 ease-[var(--anim-ease)]"
                >
                  Download Free App
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ════════ PHONE OVERLAY ════════ */}
          <motion.div
            className="hero-phone-overlay"
            style={{ opacity: phoneOpacity }}
          >
            <motion.div
              className="hero-phone-stage"
              style={{
                scale: phoneScale,
                y: phoneY,
              }}
            >
              {/* Glow */}
              <div className="hero-phone-glow" />

              {/* Phone shell */}
              <div className="hero-phone-device">
                <img
                  src="/screenshots/Screenshot_20260319-155227.png"
                  alt="4Students Marketplace"
                  className="w-full rounded-[2.2rem]"
                />
              </div>

              {/* ─── Floating Feature Cards ─── */}

              {/* Top Left: Find Friends */}
              <motion.div
                className="hero-card hero-card-tl"
                style={{ opacity: cardsOpacity, scale: cardsScale }}
              >
                <motion.div
                  animate={{ y: floatConfigs[0].y }}
                  transition={{
                    duration: floatConfigs[0].duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatConfigs[0].delay,
                  }}
                >
                  <div className="hero-card-inner bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-border/40 p-3 w-[155px]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">👥</span>
                      <span className="text-[11px] font-semibold text-text-main">Find Friends</span>
                    </div>
                    <p className="text-[10px] text-text-muted leading-snug mb-2">
                      Find roommates, hackathon teams & study groups
                    </p>
                    <div className="flex gap-1">
                      <span className="text-[9px] bg-accent-lavender/60 text-text-secondary px-1.5 py-0.5 rounded font-medium">Hackathon</span>
                      <span className="text-[9px] bg-accent-lavender/60 text-text-secondary px-1.5 py-0.5 rounded font-medium">Startup</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Left: Campus Rivals */}
              <motion.div
                className="hero-card hero-card-bl"
                style={{ opacity: cardsOpacity, scale: cardsScale }}
              >
                <motion.div
                  animate={{ y: floatConfigs[1].y }}
                  transition={{
                    duration: floatConfigs[1].duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatConfigs[1].delay,
                  }}
                >
                  <div className="hero-card-inner bg-accent-yellow rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-3 w-[150px]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">⚔️</span>
                      <span className="text-[11px] font-semibold text-text-main">Campus Rivals</span>
                    </div>
                    <p className="text-[10px] text-text-secondary leading-snug mb-1.5">
                      Challenge any college. Defend your pride.
                    </p>
                    <div className="flex gap-1">
                      <span className="text-[9px] bg-white/60 text-text-secondary px-1.5 py-0.5 rounded font-semibold">Cricket</span>
                      <span className="text-[9px] bg-white/60 text-text-secondary px-1.5 py-0.5 rounded font-semibold">Football</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Top Right: Marketplace stats */}
              <motion.div
                className="hero-card hero-card-tr"
                style={{ opacity: cardsOpacity, scale: cardsScale }}
              >
                <motion.div
                  animate={{ y: floatConfigs[3].y }}
                  transition={{
                    duration: floatConfigs[3].duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatConfigs[3].delay,
                  }}
                >
                  <div className="hero-card-inner bg-accent-green rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-3 w-[140px]">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-2xl font-serif font-bold text-text-main leading-none">8</p>
                        <p className="text-[11px] text-text-secondary">items sold</p>
                      </div>
                      <span className="text-lg">🛒</span>
                    </div>
                    <p className="text-[10px] text-text-secondary">This week on campus</p>
                    <div className="mt-1 bg-white/60 rounded-md px-2 py-0.5 inline-block">
                      <span className="text-[11px] font-semibold text-text-main">₹2,400 earned</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom Right: Live match */}
              <motion.div
                className="hero-card hero-card-br"
                style={{ opacity: cardsOpacity, scale: cardsScale }}
              >
                <motion.div
                  animate={{ y: floatConfigs[4].y }}
                  transition={{
                    duration: floatConfigs[4].duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatConfigs[4].delay,
                  }}
                >
                  <div className="hero-card-inner bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-border/40 p-3 w-[148px]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-semibold text-red-500">LIVE</span>
                    </div>
                    <p className="text-[12px] font-semibold text-text-main mb-0.5">COEP vs VIT</p>
                    <p className="text-[10px] text-text-muted mb-1.5">Cricket • Semi Final</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-text-main">127/4</span>
                      <span className="text-[10px] text-text-muted">15.2 overs</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Star rating pill */}
              <motion.div
                className="hero-card hero-card-stars"
                style={{ opacity: cardsOpacity, scale: cardsScale }}
              >
                <motion.div
                  animate={{ y: floatConfigs[2].y }}
                  transition={{
                    duration: floatConfigs[2].duration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatConfigs[2].delay,
                  }}
                >
                  <div className="bg-accent-pink rounded-full px-4 py-2 shadow-[0_6px_24px_rgba(0,0,0,0.08)] flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-text-main" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[11px] font-semibold text-text-main ml-1">4.9</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            style={{ zIndex: 5, opacity: scrollIndicatorOpacity }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 border-2 border-text-muted/40 rounded-full flex justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 bg-text-muted/60 rounded-full" />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
