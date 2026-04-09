import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* Brand/college logos strip */
const logos = [
  'MIT WPU', 'VIT Pune', 'COEP Tech', 'Symbiosis', 'SIT Pune', 'DY Patil', 'Sinhgad', 'PICT'
];

export default function Stats() {
  // Duplicate logos for seamless infinite marquee
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="py-10 border-t border-border overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="marquee-track-fast">
            {doubledLogos.map((name, i) => (
              <span 
                key={i}
                className="flex-shrink-0 text-sm sm:text-base font-bold text-text-subtle/60 tracking-wide whitespace-nowrap select-none mx-8"
                style={{ 
                  fontFamily: i % 3 === 0 ? 'Georgia, serif' : i % 3 === 1 ? '"Inter", sans-serif' : 'system-ui',
                  fontStyle: i % 2 === 0 ? 'normal' : 'italic',
                  letterSpacing: i % 2 === 0 ? '0.05em' : '0.02em',
                  textTransform: i % 3 === 2 ? 'uppercase' : 'none',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
