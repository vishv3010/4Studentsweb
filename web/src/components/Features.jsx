import { MapPin, MessageSquare, Swords, Users } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1];

const features = [
  {
    name: 'Campus Marketplace',
    desc: 'Find items a 5-minute walk from your dorm. Meet on campus, trade in person.',
    icon: MapPin,
    bg: '#B8E986',
    textColor: '#1a2e05',
  },
  {
    name: 'College Rivalries',
    desc: 'Challenge rival colleges in cricket, football, chess. Organize inter-college matches.',
    icon: Swords,
    bg: '#F5A0C0',
    textColor: '#3d0f1f',
  },
  {
    name: 'Find Your Crew',
    desc: 'Post for hackathon teammates, roommates, study groups, or startup co-founders.',
    icon: Users,
    bg: '#C4F0D5',
    textColor: '#0d3320',
  },
  {
    name: 'In-App Messaging',
    desc: 'Chat privately to negotiate trades, coordinate teams, or plan matches.',
    icon: MessageSquare,
    bg: '#FFF5EB',
    textColor: '#3d2e1a',
  },
];

const FAN = [
  { rotate: -18, x: -280, y: 40 },
  { rotate: -6,  x: -95,  y: -5 },
  { rotate:  6,  x:  95,  y: -5 },
  { rotate: 18,  x: 280,  y: 40 },
];

function FanCard({ feature, index, scrollProgress }) {
  const fan = FAN[index];

  const start = index * 0.22;
  const end   = Math.min(start + 0.35, 1);

  const x      = useTransform(scrollProgress, [start, end], [0, fan.x]);
  const y      = useTransform(scrollProgress, [start, end], [0, fan.y]);
  const rotate = useTransform(scrollProgress, [start, end], [0, fan.rotate]);
  const scale  = useTransform(scrollProgress, [start, end], [0.92, 1]);
  const opacity = useTransform(scrollProgress, [start, start + 0.08], [0, 1]);

  const Icon = feature.icon;

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        backgroundColor: feature.bg,
        zIndex: index + 1,
        transformOrigin: 'bottom center',
        position: 'absolute',
      }}
      whileHover={{
        y: fan.y - 28,
        scale: 1.05,
        rotate: fan.rotate * 0.4,
        zIndex: 20,
        boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
        transition: { duration: 0.3, ease: EASE },
      }}
      className="w-[220px] h-[320px] md:w-[240px] md:h-[340px] rounded-3xl p-7 flex flex-col justify-between
        shadow-[0_12px_40px_rgba(0,0,0,0.12)] cursor-pointer"
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.45)' }}
      >
        <Icon size={22} style={{ color: feature.textColor }} strokeWidth={2.2} />
      </div>
      <div>
        <h3
          className="text-[1.25rem] font-extrabold uppercase leading-tight tracking-tight mb-2"
          style={{ color: feature.textColor }}
        >
          {feature.name}
        </h3>
        <p
          className="text-[12.5px] leading-relaxed font-medium"
          style={{ color: feature.textColor, opacity: 0.75 }}
        >
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

const mobileContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const mobileCard = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Features() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 22,
    mass: 1.5,
    restDelta: 0.001,
  });

  return (
    <section id="features" className="bg-bg-soft">
      <div ref={containerRef} style={{ height: '300vh' }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 text-center pt-20 pb-0 z-30 flex-shrink-0"
          >
            <p className="text-primary font-semibold text-[12px] tracking-[0.15em] uppercase mb-3">
              Features
            </p>
            <h2 className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.1]
              tracking-[-0.02em] text-text-main">
              Everything you need,
              <br />
              nothing you don't
            </h2>
          </motion.div>

          <div
            className="relative flex-1 w-full flex items-center justify-center"
            style={{ marginTop: '40px' }}
          >
            {/* Desktop fan */}
            <div className="hidden md:block relative" style={{ width: '240px', height: '340px' }}>
              {features.map((f, i) => (
                <FanCard key={i} feature={f} index={i} scrollProgress={smooth} />
              ))}
            </div>

            {/* Mobile: staggered reveal */}
            <motion.div
              variants={mobileContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="md:hidden flex flex-col gap-5 px-5 w-full items-center"
            >
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    variants={mobileCard}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      transition: { duration: 0.3, ease: EASE },
                    }}
                    className="w-full max-w-[340px] rounded-3xl p-7 min-h-[180px]
                      shadow-[0_4px_24px_rgba(0,0,0,0.07)] cursor-pointer"
                    style={{ backgroundColor: f.bg }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(255,255,255,0.45)' }}
                    >
                      <Icon size={20} style={{ color: f.textColor }} strokeWidth={2.2} />
                    </div>
                    <h3
                      className="text-lg font-extrabold uppercase tracking-tight mb-1"
                      style={{ color: f.textColor }}
                    >
                      {f.name}
                    </h3>
                    <p className="text-xs leading-relaxed font-medium" style={{ color: f.textColor, opacity: 0.75 }}>
                      {f.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
