import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    text: 'Sold my engineering textbooks within hours. Met the buyer at the library — couldn\'t be simpler.',
    name: 'Priya S.',
    school: 'IAR, Gandhinagar',
    accent: 'border-l-accent-green',
  },
  {
    text: 'Furnished my entire dorm for half the price. Desk, chair, mini-fridge — all from graduating seniors.',
    name: 'Arjun P.',
    school: 'PDEU, Gandhinagar',
    accent: 'border-l-accent-yellow',
  },
  {
    text: 'Found my exact semester lab manual in 10 seconds with the search filters. This is how it should be.',
    name: 'Sneha K.',
    school: 'DAIICT, Gandhinagar',
    accent: 'border-l-accent-pink',
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: heading moves slower
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="reviews" className="py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          style={{ y: headingY }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-primary font-semibold text-[13px] tracking-widest uppercase mb-4">Testimonials</p>
            <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-[-0.015em] text-text-main">
              Loved by students<br />across campuses
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              variants={cardVariant}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                transition: { duration: 0.3, ease: EASE },
              }}
              className={`bg-bg-soft rounded-2xl p-7 border-l-4 ${t.accent} cursor-pointer`}
            >
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6">"{t.text}"</p>
              <footer>
                <p className="text-sm font-semibold text-text-main">{t.name}</p>
                <p className="text-xs text-text-muted">{t.school}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
