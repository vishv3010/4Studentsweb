import { motion } from 'framer-motion';
import { FileQuestion, ArrowLeft } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-5 relative overflow-hidden h-[80vh]">
      {/* Animated background glow */}
      <motion.div 
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, var(--color-text-main) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[600px] w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-20 h-20 bg-bg-soft rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-border"
        >
          <FileQuestion className="w-10 h-10 text-text-muted" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="font-serif text-[4rem] sm:text-[5rem] leading-[1] tracking-[-0.02em] text-text-main mb-6"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-[1.1rem] text-text-secondary mb-10 max-w-md mx-auto"
        >
          It looks like this page was dropped from the curriculum. Let's get you back to campus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <a 
            href="/"
            className="inline-flex items-center gap-2 bg-text-main text-bg-main px-6 py-3 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--hover-shadow)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </a>
        </motion.div>
      </div>
    </main>
  );
}
