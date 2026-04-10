import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Users, Trophy, User } from 'lucide-react';
import { useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1];

const pillars = [
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    desc: 'Buy & sell textbooks, electronics, lab gear, and dorm essentials with verified students on your campus.',
    bg: 'bg-accent-green',
    screenshot: '/4Studentsweb/screenshots/new1.png',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Find roommates, hackathon partners, study groups, and startup co-founders. Post or browse — it\'s your campus crew.',
    bg: 'bg-accent-lavender',
    screenshot: '/4Studentsweb/screenshots/new4.png',
  },
  {
    icon: Trophy,
    title: 'Arena',
    desc: 'Challenge rival colleges in cricket, football, chess, and more. Organize matches, track scores, defend your pride.',
    bg: 'bg-accent-yellow',
    screenshot: '/4Studentsweb/screenshots/new2.png',
  },
  {
    icon: User,
    title: 'Profile',
    desc: 'Your campus identity — track your trades, community posts, arena wins, and build your college reputation.',
    bg: 'bg-accent-pink',
    screenshot: '/4Studentsweb/screenshots/new3.png',
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

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Heading moves slightly slower (parallax depth)
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-24 lg:py-32" ref={sectionRef}>
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
            <p className="text-primary font-semibold text-[13px] tracking-widest uppercase mb-4">More than a marketplace</p>
            <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-[-0.015em] text-text-main mb-4">
              Four pillars of campus life
            </h2>
            <p className="text-[15px] text-text-muted max-w-md mx-auto">
              One app that covers everything — from trading gear to challenging rival colleges.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="group cursor-pointer"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3, ease: EASE },
              }}
            >
              {/* Screenshot preview */}
              <div className="bg-gray-900 rounded-[1.5rem] p-[3px] mb-4 overflow-hidden shadow-lg shadow-black/8
                group-hover:shadow-[var(--hover-shadow)] transition-shadow duration-500">
                <div className="w-full h-full overflow-hidden rounded-[1.35rem]">
                  <img src={p.screenshot} alt={p.title} className="w-full rounded-[1.35rem] block group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                </div>
              </div>

              {/* Label */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-8 h-8 ${p.bg} rounded-lg flex items-center justify-center`}>
                  <p.icon className="w-4 h-4 text-text-main" />
                </div>
                <h3 className="text-[15px] font-semibold text-text-main">{p.title}</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
