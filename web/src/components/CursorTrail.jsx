import { useEffect, useRef } from 'react';

/**
 * Simple professional cursor dot — a small circle that smoothly
 * follows the mouse with a subtle lag. No trail, no colors, no glow.
 */
export default function CursorTrail() {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const animRef = useRef(null);
  const visible = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = '1';
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = '0';
    };

    const onEnter = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      visible.current = true;
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    const lerp = 0.15; // smooth follow speed

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * lerp;
      pos.current.y += (target.current.y - pos.current.y) * lerp;
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary, #2bb5a0)',
        opacity: 0,
        transition: 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease',
        willChange: 'transform',
      }}
    />
  );
}
