import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const groups = [
  {
    label: 'Marketplace',
    screens: [
      { src: '/4Studentsweb/screenshots/new1.png', alt: 'Marketplace Home' },
    ],
  },
  {
    label: 'Community',
    screens: [
      { src: '/4Studentsweb/screenshots/new4.png', alt: 'Find Friends' },
    ],
  },
  {
    label: 'Arena',
    screens: [
      { src: '/4Studentsweb/screenshots/new2.png', alt: 'Campus Rivals' },
    ],
  },
  {
    label: 'Profile',
    screens: [
      { src: '/4Studentsweb/screenshots/new3.png', alt: 'Profile' },
    ],
  },
];

const allScreens = groups.flatMap((g) =>
  g.screens.map((s) => ({ ...s, label: g.label }))
);

// Duplicate for seamless loop
const doubledScreens = [...allScreens, ...allScreens];

export default function Screenshots() {
  return (
    <section id="screenshots" className="py-24 lg:py-32 bg-bg-muted overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-[13px] tracking-widest uppercase mb-4">App Preview</p>
          <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-[-0.015em] text-text-main">
            Every feature, one glance
          </h2>
        </motion.div>
      </div>

      {/* Full-width marquee carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="marquee-track">
          {doubledScreens.map((s, j) => (
            <div
              key={`${s.label}-${j}`}
              className="flex-shrink-0 w-[200px] sm:w-[230px] mx-2.5 cursor-pointer group"
            >
              <div className="rounded-[1.75rem] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                group-hover:shadow-[var(--hover-shadow)] group-hover:-translate-y-2 group-hover:scale-[1.03]
                transition-all duration-500">
                <div className="w-full h-full overflow-hidden rounded-[1.75rem]">
                  <img src={s.src} alt={s.alt} className="w-full rounded-[1.75rem] block" loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
