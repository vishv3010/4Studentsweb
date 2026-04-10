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
                className="flex-shrink-0 text-sm sm:text-[1.1rem] font-extrabold text-gray-400 uppercase tracking-[0.15em] whitespace-nowrap select-none mx-10 opacity-60 hover:opacity-100 transition-opacity duration-300 font-sans"
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
