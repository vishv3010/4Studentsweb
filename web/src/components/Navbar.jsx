import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useSectionNav, sectionHref } from '../hooks/useSectionNav';

/* ═══════════════════════════════════════════════════════
   Hand-drawn SVG underline paths — organic squiggles.
   Each path is drawn inside a viewBox of "0 0 200 12".
   ═══════════════════════════════════════════════════════ */
const UNDERLINE_PATHS = [
  // gentle sine wave
  "M0 6 C15 2, 30 10, 50 6 C70 2, 85 10, 100 6 C115 2, 130 10, 150 6 C165 2, 185 10, 200 6",
  // tight squiggle
  "M0 5 Q10 1, 20 6 Q30 11, 40 5 Q50 -1, 60 6 Q70 12, 80 5 Q90 -1, 100 6 Q110 11, 120 5 Q130 0, 140 6 Q150 11, 160 5 Q170 0, 180 6 Q190 11, 200 5",
  // double bump
  "M0 7 C20 2, 45 10, 65 4 C85 -2, 110 12, 135 5 C155 -1, 180 10, 200 6",
  // sketchy zigzag
  "M0 5 L15 8 L28 3 L42 9 L55 4 L70 8 L82 3 L98 9 L110 4 L125 8 L140 3 L155 9 L168 4 L182 8 L200 5",
  // smooth S-curves
  "M0 8 C25 1, 50 11, 75 5 C100 -1, 125 12, 150 6 C175 0, 190 9, 200 5",
  // rapid micro-wiggle
  "M0 6 Q7 3, 14 6 Q21 9, 28 6 Q35 3, 42 6 Q49 9, 56 6 Q63 3, 70 6 Q77 9, 84 6 Q91 3, 98 6 Q105 9, 112 6 Q119 3, 126 6 Q133 9, 140 6 Q147 3, 154 6 Q161 9, 168 6 Q175 3, 182 6 Q189 9, 196 6 L200 6",
  // organic hand-drawn feel
  "M0 4 C12 8, 22 2, 35 7 C48 12, 58 1, 72 6 C86 11, 95 2, 108 7 C122 12, 132 1, 145 6 C158 11, 170 3, 182 7 C192 10, 198 4, 200 5",
  // loose loopy
  "M0 6 C10 1, 25 11, 40 6 C55 1, 65 11, 80 6 C95 1, 110 11, 125 6 C140 1, 155 11, 170 6 C185 1, 195 8, 200 6",
  // asymmetric wobble
  "M0 7 C18 3, 32 9, 50 5 C62 2, 78 10, 95 4 C108 0, 128 11, 148 6 C162 2, 178 9, 200 5",
  // scribble-ish
  "M0 5 L8 8 L18 3 L25 7 L35 4 L45 9 L52 3 L62 8 L72 4 L80 7 L90 3 L100 8 L108 4 L118 7 L128 3 L138 8 L145 5 L155 7 L165 4 L175 8 L185 3 L195 7 L200 5",
];

/**
 * NavLink with randomized SVG underline drawing animation.
 * On hover: picks a random hand-drawn path, draws it left→right in 0.5s.
 * On leave: erases the line smoothly.
 */
function NavLink({ item }) {
  const sectionNav = useSectionNav();
  const id = item.toLowerCase().replace(/\s+/g, '-');
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const lastIndex = useRef(-1);
  const animRef = useRef(null);

  const pickRandomPath = useCallback(() => {
    let idx;
    do {
      idx = Math.floor(Math.random() * UNDERLINE_PATHS.length);
    } while (idx === lastIndex.current && UNDERLINE_PATHS.length > 1);
    lastIndex.current = idx;
    return UNDERLINE_PATHS[idx];
  }, []);

  // Easing function — easeOutCubic for a natural pen-draw feel
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const handleEnter = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    // Cancel any running animation
    if (animRef.current) cancelAnimationFrame(animRef.current);

    // Pick a new random squiggle
    path.setAttribute('d', pickRandomPath());

    // Measure the full path length
    const len = path.getTotalLength();

    // Reset: fully hidden (offset = len means nothing drawn)
    path.style.transition = 'none';
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.opacity = '1';

    // Animate drawing left→right over 500ms
    const duration = 500;
    const start = performance.now();

    const draw = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      // strokeDashoffset goes from `len` (hidden) → 0 (fully drawn)
      path.style.strokeDashoffset = len * (1 - eased);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    animRef.current = requestAnimationFrame(draw);
  }, [pickRandomPath]);

  const handleLeave = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    // Cancel the draw-in animation if still running
    if (animRef.current) cancelAnimationFrame(animRef.current);

    // Animate fade out over 250ms
    const duration = 250;
    const start = performance.now();
    const startOpacity = parseFloat(path.style.opacity) || 1;

    const fade = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      path.style.opacity = startOpacity * (1 - progress);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(fade);
      } else {
        // Reset for next hover
        const len = path.getTotalLength();
        path.style.strokeDashoffset = len;
      }
    };

    animRef.current = requestAnimationFrame(fade);
  }, []);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <a
      ref={containerRef}
      href={sectionHref(id)}
      className="nav-link text-[14px] text-text-secondary hover:text-text-main"
      style={{ transition: 'color 300ms var(--anim-ease)' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={sectionNav(id)}
    >
      {item}
      <svg
        className="nav-underline-svg"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={UNDERLINE_PATHS[0]}
          stroke="var(--color-primary, #2bb5a0)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            opacity: 0,
          }}
        />
      </svg>
    </a>
  );
}

export default function Navbar() {
  const sectionNav = useSectionNav();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Read the theme up front rather than defaulting to light: if the
  // `dark` class is already on <html> when this mounts, no mutation
  // ever fires, so the observer below would leave this stuck on false
  // and paint a white navbar over a dark page.
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  // Listen for dark class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = scrolled
    ? isDark
      ? 'rgba(15, 17, 23, 0.82)'
      : 'rgba(255, 255, 255, 0.72)'
    : 'transparent';

  const navBorder = scrolled
    ? isDark
      ? '1px solid rgba(50, 54, 72, 0.5)'
      : '1px solid rgba(235, 235, 235, 0.6)'
    : '1px solid transparent';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 navbar-slide navbar-visible"
      style={{
        backgroundColor: navBg,
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        boxShadow: scrolled ? (isDark ? '0 1px 12px rgba(0, 0, 0, 0.4)' : '0 1px 12px rgba(0, 0, 0, 0.06)') : 'none',
        borderBottom: navBorder,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-[72px]">

          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <Logo className="w-8 h-8 text-indigo-600 dark:text-indigo-400 drop-shadow-sm" />
            <span className="text-[16px] font-semibold text-text-main tracking-tight">4Students</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {['Features', 'How It Works', 'FAQ'].map(item => (
              <NavLink key={item} item={item} />
            ))}
          </nav>

          {/* Right side: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href={sectionHref('download')}
              className="btn-shimmer text-[14px] font-medium bg-text-main text-white px-5 py-2 rounded-full
                hover:scale-[var(--hover-scale)] hover:shadow-[var(--hover-shadow)]"
              style={{ transition: 'all 300ms var(--anim-ease)' }}
              onClick={sectionNav('download')}
            >
              Download App
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="p-3 -m-1.5 text-text-main"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div
          className="md:hidden backdrop-blur-lg border-t"
          style={{
            backgroundColor: isDark ? 'rgba(15, 17, 23, 0.92)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'var(--color-border)' : 'var(--color-border)',
          }}
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {['Features', 'How It Works', 'FAQ'].map(item => (
              <a key={item} href={sectionHref(item.toLowerCase().replace(/\s+/g, '-'))} className="px-3 py-2.5 text-sm text-text-main rounded-lg hover:bg-bg-soft" onClick={sectionNav(item.toLowerCase().replace(/\s+/g, '-'), () => setIsOpen(false))}
                style={{ transition: 'background-color 300ms var(--anim-ease)' }}>
                {item}
              </a>
            ))}
            <a href={sectionHref('download')} className="btn-shimmer mt-3 text-center bg-text-main text-white font-medium px-4 py-2.5 rounded-full" onClick={sectionNav('download', () => setIsOpen(false))}>
              Download App
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
