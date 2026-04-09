import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.22, 1, 0.36, 1];

export default function DownloadCTA() {
  const [showToast, setShowToast] = useState(false);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section id="download" className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: EASE }}
          className="bg-accent-green rounded-[2rem] px-8 py-20 sm:px-16 sm:py-24 text-center relative overflow-hidden"
        >
          {/* Animated decorative elements with continuous float */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 180, 360] }}
            transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
            className="absolute top-6 left-8 text-4xl opacity-30 select-none"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, -180, -360] }}
            transition={{ y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 10, repeat: Infinity, ease: 'linear' } }}
            className="absolute bottom-6 right-8 text-4xl opacity-30 select-none"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 right-[15%] text-2xl opacity-20 select-none hidden sm:block"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[30%] left-[12%] text-2xl opacity-20 select-none hidden sm:block"
          >
            ✦
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] tracking-[-0.015em] text-gray-900 mb-5"
          >
            Ready to start<br />trading on campus?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="text-[15px] text-gray-700 max-w-md mx-auto mb-8"
          >
            Download 4Students for free and join thousands of students at your college.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <a
              href="/download"
              onClick={handleDownloadClick}
              className="btn-shimmer btn-glow bg-text-main text-white px-6 py-3 rounded-full text-[14px] font-medium
                hover:scale-[var(--hover-scale)] hover:shadow-[var(--hover-shadow)] transition-all duration-300"
            >
              Download Free App
            </a>
            <a
              href="/download"
              onClick={handleDownloadClick}
              className="bg-white text-gray-900 px-6 py-3 rounded-full text-[14px] font-medium border border-border
                hover:bg-gray-50 hover:scale-[var(--hover-scale)] hover:shadow-[var(--hover-shadow)] transition-all duration-300"
            >
              Get Started Free
            </a>
          </motion.div>

          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, x: "-50%" }}
                className="absolute bottom-8 left-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-[0_8px_30px_rgba(0,0,0,0.12)] pointer-events-none"
              >
                App launching soon! Stay tuned.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
