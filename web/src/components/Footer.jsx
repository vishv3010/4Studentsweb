import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from './Logo';

const EASE = [0.22, 1, 0.36, 1];

const columnContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const columnVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const iconContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const iconVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: EASE },
  },
};

export default function Footer() {
  return (
    <footer className="relative">
      {/* Animated gradient top border */}
      <div className="animated-divider" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14">
        <motion.div
          variants={columnContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
          className="flex flex-col md:flex-row justify-between gap-10"
        >

          <motion.div variants={columnVariant} className="max-w-xs">
            <div className="flex items-center gap-3 mb-5">
              <Logo className="w-8 h-8 text-indigo-600 dark:text-indigo-400 drop-shadow-sm" />
              <span className="text-[16px] font-semibold text-text-main tracking-tight">4Students</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              The campus marketplace — buy, sell, and connect with verified students.
            </p>
          </motion.div>

          <div className="flex gap-16">
            <motion.div variants={columnVariant}>
              <h4 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['Features', 'How It Works', 'Reviews'].map(item => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-[13px] text-text-secondary hover:text-text-main"
                      style={{ transition: 'color 300ms var(--anim-ease)' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={columnVariant}>
              <h4 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-4">Legal & Support</h4>
              <ul className="space-y-2.5">
                {['Privacy', 'Terms', 'Guidelines', 'Support'].map(item => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="text-[13px] text-text-secondary hover:text-text-main"
                      style={{ transition: 'color 300ms var(--anim-ease)' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={columnVariant}>
              <h4 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-4">Connect</h4>
              <motion.div
                variants={iconContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="flex gap-2.5"
              >
                {[
                  { Icon: Instagram, href: 'https://instagram.com/4studentshub' },
                  { Icon: Twitter, href: 'https://twitter.com/4studentshub' },
                  { Icon: Linkedin, href: 'https://linkedin.com/company/4students' },
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    variants={iconVariant}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2, ease: EASE },
                    }}
                    className="w-9 h-9 rounded-full bg-bg-muted flex items-center justify-center text-text-muted hover:text-text-main hover:bg-border"
                    style={{ transition: 'background-color 300ms var(--anim-ease), color 300ms var(--anim-ease)' }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-12 pt-6 border-t border-border flex justify-between items-center text-[12px] text-text-subtle"
        >
          <p>© {new Date().getFullYear()} 4Students. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
