import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { isPlayStoreLive } from '../config';

const EASE = [0.22, 1, 0.36, 1];

const live = isPlayStoreLive();

const faqs = [
  {
    q: 'Who can join 4Students?',
    a: 'Any student with a valid college email. Every account is verified, so you are only ever trading and teaming up with real students from real campuses.',
  },
  {
    q: 'Is it free?',
    a: 'Yes — free to download and free to use. We do not take a commission on anything you buy or sell.',
  },
  {
    q: 'When can I download it?',
    a: live
      ? 'Right now — 4Students is live on Google Play. Grab it from the button above and sign in with your college email.'
      : 'The app is in closed testing on Google Play right now. Join the waitlist and we will send you an invite as we open up more colleges.',
  },
  {
    q: 'Which colleges are supported?',
    a: 'We are starting around Gandhinagar and Ahmedabad — PDEU, DAIICT, GNLU, IAR, Nirma and more — and adding campuses as we grow.',
  },
  {
    q: 'How do I get my college added?',
    a: live
      ? 'Email us at 4studentshub@gmail.com and tell us where you study. We prioritise the campuses where students are already asking for it.'
      : 'Join the waitlist and tell us where you study. We prioritise the campuses where students are already asking for it.',
  },
  {
    q: 'How do you keep trades safe?',
    a: 'Verified student accounts, in-app chat so you never share a personal number, and meetups on your own campus.',
    link: { to: '/guidelines', label: 'Read the community guidelines' },
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function FAQ() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="faq" className="py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div style={{ y: headingY }} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="text-primary font-semibold text-[13px] tracking-widest uppercase mb-4">
              Questions
            </p>
            <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] leading-[1.12] tracking-[-0.015em] text-text-main">
              Everything you
              <br />
              might be wondering
            </h2>
          </motion.div>
        </motion.div>

        <motion.dl
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
          className="grid gap-x-10 gap-y-9 md:grid-cols-2"
        >
          {faqs.map((faq) => (
            <motion.div key={faq.q} variants={item}>
              <dt className="text-[16px] font-semibold text-text-main mb-2">{faq.q}</dt>
              <dd className="text-[15px] leading-relaxed text-text-muted">
                {faq.a}
                {faq.link && (
                  <>
                    {' '}
                    <Link
                      to={faq.link.to}
                      className="font-medium text-text-secondary underline underline-offset-4 hover:text-text-main"
                      style={{ transition: 'color 300ms var(--anim-ease)' }}
                    >
                      {faq.link.label}
                    </Link>
                    .
                  </>
                )}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
