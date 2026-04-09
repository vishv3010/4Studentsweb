import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const steps = [
  {
    num: '01',
    title: 'Sign up with your .edu email',
    desc: 'Create an account using your university email. We verify it instantly.',
    accent: 'bg-accent-green',
  },
  {
    num: '02',
    title: 'List or browse',
    desc: 'Post what you\'re selling in 30 seconds, or browse campus listings.',
    accent: 'bg-accent-yellow',
  },
  {
    num: '03',
    title: 'Meet and trade',
    desc: 'Chat in-app, agree on a price, meet on campus. Done.',
    accent: 'bg-accent-pink',
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
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

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-bg-main relative z-10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-[13px] tracking-widest uppercase mb-4">How it works</p>
          <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-[-0.015em] text-text-main">
            Get connected in<br />under 60 seconds
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                transition: { duration: 0.3, ease: EASE },
              }}
              className="text-center bg-bg-soft border border-border rounded-2xl p-8 cursor-pointer"
              style={{ transition: 'box-shadow 300ms var(--anim-ease)' }}
            >
              <div className={`w-14 h-14 ${step.accent} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <span className="font-serif text-xl text-gray-900">{step.num}</span>
              </div>
              <h3 className="text-[16px] font-semibold text-text-main mb-2">{step.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
