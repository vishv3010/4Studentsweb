import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 28;
const BASE_SIZE = 3.5;
const HUE_SPREAD = 60;

/* Brand palette converted to HSL bases for smooth hue cycling */
const PALETTE = [
  { h: 174, s: 82, l: 48 }, // teal / primary
  { h: 255, s: 90, l: 80 }, // lavender
  { h: 340, s: 85, l: 72 }, // pink
  { h: 85,  s: 65, l: 72 }, // green
];

function lerpColor(t) {
  const total = PALETTE.length;
  const scaled = (t % 1) * total;
  const idx = Math.floor(scaled);
  const frac = scaled - idx;
  const a = PALETTE[idx % total];
  const b = PALETTE[(idx + 1) % total];
  return {
    h: a.h + (b.h - a.h) * frac,
    s: a.s + (b.s - a.s) * frac,
    l: a.l + (b.l - a.l) * frac,
  };
}

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: -200, y: -200 });
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    // Don't run on touch devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Initialize trail points
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      points.current.push({ x: -200, y: -200 });
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onMouseLeave = () => {
      mouse.current.x = -200;
      mouse.current.y = -200;
    };
    const onMouseEnter = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Animation loop
    const draw = () => {
      timeRef.current += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update trail positions — each point chases the previous
      const pts = points.current;
      pts[0].x += (mouse.current.x - pts[0].x) * 0.35;
      pts[0].y += (mouse.current.y - pts[0].y) * 0.35;

      for (let i = 1; i < pts.length; i++) {
        const ease = 0.28 - (i * 0.006);
        pts[i].x += (pts[i - 1].x - pts[i].x) * Math.max(ease, 0.04);
        pts[i].y += (pts[i - 1].y - pts[i].y) * Math.max(ease, 0.04);
      }

      // Only draw if cursor is on-screen
      if (mouse.current.x < -100) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw trail from tail to head for correct layering
      for (let i = pts.length - 1; i >= 0; i--) {
        const t = i / pts.length;
        const progress = 1 - t; // 0 = tail, 1 = head

        // Size: tapers from head to tail
        const size = BASE_SIZE * (0.15 + progress * 0.85);

        // Opacity: fades out toward tail
        const opacity = 0.06 + progress * 0.85;

        // Color: cycles through brand palette over time
        const color = lerpColor(timeRef.current + t * 0.5);

        // Glow layer (larger, softer)
        if (progress > 0.3) {
          const glowSize = size * 3;
          const glowOpacity = opacity * 0.15;
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${glowOpacity})`;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity})`;
        ctx.fill();
      }

      // Bright center dot at cursor head
      const headColor = lerpColor(timeRef.current);
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, BASE_SIZE * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${headColor.h}, ${headColor.s}%, 95%, 0.95)`;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
