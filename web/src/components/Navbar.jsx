import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const lastScrollY = useRef(0);

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
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      // Hide navbar on scroll down, show on scroll up (only after 80px)
      if (currentY > 80) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
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
      className={`fixed top-0 left-0 right-0 z-50 navbar-slide ${hidden && !isOpen ? 'navbar-hidden' : 'navbar-visible'}`}
      style={{
        backgroundColor: navBg,
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        boxShadow: scrolled ? '0 1px 12px rgba(0, 0, 0, 0.06)' : 'none',
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
            {['Features', 'How It Works', 'Reviews'].map(item => (
              <a
                key={item}
                href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[14px] text-text-secondary hover:text-text-main"
                style={{ transition: 'color 300ms var(--anim-ease)' }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right side: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="/#download"
              className="btn-shimmer text-[14px] font-medium bg-text-main text-white px-5 py-2 rounded-full
                hover:scale-[var(--hover-scale)] hover:shadow-[var(--hover-shadow)]"
              style={{ transition: 'all 300ms var(--anim-ease)' }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 text-text-main">
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
            {['Features', 'How It Works', 'Reviews'].map(item => (
              <a key={item} href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-2.5 text-sm text-text-main rounded-lg hover:bg-bg-soft" onClick={() => setIsOpen(false)}
                style={{ transition: 'background-color 300ms var(--anim-ease)' }}>
                {item}
              </a>
            ))}
            <a href="/#download" className="btn-shimmer mt-3 text-center bg-text-main text-white font-medium px-4 py-2.5 rounded-full" onClick={() => setIsOpen(false)}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
