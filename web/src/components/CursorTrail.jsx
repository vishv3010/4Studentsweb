import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Staggered springs to create a true "liquid trail" or "comet" effect
  // 1: Leader dot (fastest, sharpest, follows cursor closely)
  const leaderX = useSpring(cursorX, { damping: 25, stiffness: 450, mass: 0.1 });
  const leaderY = useSpring(cursorY, { damping: 25, stiffness: 450, mass: 0.1 });

  // 2: Mid tail (medium delay, larger but more transparent)
  const midX = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.3 });
  const midY = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.3 });

  // 3: End of tail (slowest, largest, very faint)
  const endX = useSpring(cursorX, { damping: 35, stiffness: 100, mass: 0.6 });
  const endY = useSpring(cursorY, { damping: 35, stiffness: 100, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* End tail */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-text-main rounded-full pointer-events-none hidden md:block z-[9997]"
        style={{ x: endX, y: endY, translateX: '-50%', translateY: '-50%', opacity: isVisible ? 0.15 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />
      {/* Mid tail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-text-main rounded-full pointer-events-none hidden md:block z-[9998]"
        style={{ x: midX, y: midY, translateX: '-50%', translateY: '-50%', opacity: isVisible ? 0.4 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />
      {/* Leader dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-text-main rounded-full pointer-events-none hidden md:block z-[9999]"
        style={{ x: leaderX, y: leaderY, translateX: '-50%', translateY: '-50%', opacity: isVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </>
  );
}
