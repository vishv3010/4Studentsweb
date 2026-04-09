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
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-2"
          >
            {/* App Store Button */}
            <a
              href="#download"
              onClick={handleDownloadClick}
              className="flex items-center bg-gray-900 text-white px-5 py-2.5 rounded-xl
                hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg viewBox="0 0 384 512" className="w-7 h-7 mr-3 fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="text-left flex flex-col justify-center">
                <span className="text-[10px] uppercase font-semibold leading-tight opacity-80" style={{ letterSpacing: '0.02em' }}>Download on the</span>
                <span className="text-[17px] font-bold leading-tight -mt-0.5">App Store</span>
              </div>
            </a>

            {/* Google Play Button */}
            <a
              href="#download"
              onClick={handleDownloadClick}
              className="flex items-center bg-gray-900 text-white px-5 py-2.5 rounded-xl
                hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg viewBox="0 0 512 512" className="w-7 h-7 mr-3 fill-current">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              <div className="text-left flex flex-col justify-center">
                <span className="text-[10px] uppercase font-semibold leading-tight opacity-80" style={{ letterSpacing: '0.02em' }}>GET IT ON</span>
                <span className="text-[17px] font-bold leading-tight -mt-0.5">Google Play</span>
              </div>
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
