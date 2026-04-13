import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/* ─── All Gandhinagar Colleges ─── */
const colleges = [
  { name: 'PDEU', full: 'Pandit Deendayal Energy University' },
  { name: 'DAIICT', full: 'DA-IICT' },
  { name: 'GNLU', full: 'Gujarat National Law University' },
  { name: 'IIIT Vadodara', full: 'IIIT Vadodara – ICD' },
  { name: 'Gift University', full: 'GIFT University' },
  { name: 'IAR', full: 'Institute of Advanced Research' },
  { name: 'NIRMA', full: 'Nirma University' },
  { name: 'NFSU', full: 'National Forensic Sciences University' },
  { name: 'CEPT', full: 'CEPT University' },
  { name: 'GLS', full: 'GLS University' },
  { name: 'LDCE', full: 'L.D. College of Engineering' },
  { name: 'DDU', full: 'Dharmsinh Desai University' },
  { name: 'VGEC', full: 'Vishwakarma Govt. Engg. College' },
  { name: 'Silver Oak', full: 'Silver Oak University' },
  { name: 'GCET', full: 'G.H. Patel College of Engg.' },
  { name: 'Ganpat Uni', full: 'Ganpat University' },
  { name: 'Charusat', full: 'Charotar Uni. of Sci. & Tech.' },
  { name: 'SVNIT', full: 'SVNIT Surat' },
  { name: 'LDRP-ITR', full: 'LDRP-ITR' },
  { name: 'Adani University', full: 'Adani University' },
];

/* Split into two rows — both scroll left */
const row1 = colleges.slice(0, Math.ceil(colleges.length / 2));
const row2 = colleges.slice(Math.ceil(colleges.length / 2));

function CollegePill({ college }) {
  return (
    <div className="flex-shrink-0 mx-3 sm:mx-5 group cursor-default select-none">
      <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/60 bg-bg-soft hover:border-border-dark hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300">
        {/* Monogram circle */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wide flex-shrink-0 bg-bg-muted text-text-secondary transition-all duration-300">
          {college.name.slice(0, 2).toUpperCase()}
        </div>

        {/* Text */}
        <div className="flex flex-col leading-none">
          <span className="text-[13px] font-bold tracking-wide whitespace-nowrap text-text-main transition-colors duration-300">
            {college.name}
          </span>
          <span className="text-[9px] text-text-muted whitespace-nowrap mt-0.5 tracking-wide uppercase">
            {college.full}
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, speed = 'normal' }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max ${speed === 'slow' ? 'marquee-track-slow' : 'marquee-track'}`}>
        {doubled.map((college, i) => (
          <CollegePill key={`${college.name}-${i}`} college={college} />
        ))}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-8 sm:py-10 overflow-hidden bg-bg-main relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-bg-main to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-bg-main to-transparent z-10 pointer-events-none" />

      {/* Row 1 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-3"
      >
        <MarqueeRow items={row1} />
      </motion.div>

      {/* Row 2 — slightly slower for depth */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      >
        <MarqueeRow items={row2} speed="slow" />
      </motion.div>
    </section>
  );
}
