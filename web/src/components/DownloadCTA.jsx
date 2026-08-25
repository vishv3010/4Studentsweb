import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { isFormConfigured, submitToWeb3Forms, isPlayStoreLive, PLAY_STORE_URL } from '../config';

const EASE = [0.22, 1, 0.36, 1];

const live = isPlayStoreLive();

/* The Google Play triangle, drawn inline so the button stays self-contained
   and themable rather than pulling a raster badge off Google's CDN. */
function PlayMark({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 1.8a1.5 1.5 0 0 0-.5 1.15v18.1a1.5 1.5 0 0 0 .5 1.15l.1.08L13.8 12v-.24L3.7 1.72l-.1.08Z" fill="#00D3FF" />
      <path d="m17.1 15.4-3.3-3.3v-.24l3.3-3.3.08.05 3.94 2.24c1.12.64 1.12 1.68 0 2.32l-3.94 2.24-.08-.01Z" fill="#FFCE00" />
      <path d="M17.18 15.35 13.8 12 3.6 22.2a1.22 1.22 0 0 0 1.56.05l12.02-6.9Z" fill="#FF3A44" />
      <path d="M17.18 8.65 5.16 1.75A1.22 1.22 0 0 0 3.6 1.8L13.8 12l3.38-3.35Z" fill="#00F076" />
    </svg>
  );
}

export default function DownloadCTA() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (!isFormConfigured()) {
      setErrorMessage(
        "The waitlist isn't connected yet — email 4studentshub@gmail.com and we'll add you manually."
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      await submitToWeb3Forms({
        subject: '4Students — new waitlist signup',
        from_name: '4Students waitlist',
        email: fields.email,
        college: fields.college || '(not given)',
      });
      setStatus('success');
    } catch (err) {
      setErrorMessage(
        err.message || 'Could not add you to the waitlist. Please try again in a moment.'
      );
      setStatus('error');
    }
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

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-[1] mb-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-900/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-900/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-900/70" />
              </span>
              {live ? 'Live on Google Play' : 'Closed testing'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-serif text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.1] tracking-[-0.015em] text-gray-900 mb-5 relative z-[1]"
          >
            {live ? <>Your campus,<br />in one app</> : <>Be first on<br />your campus</>}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="text-[15px] text-gray-700 max-w-md mx-auto mb-8 relative z-[1]"
          >
            {live
              ? "Free to download, free to use. Sign in with your college email and you're in — verified students only."
              : "4Students is in closed testing on Google Play. Join the waitlist and we'll send you an invite as we open up more colleges."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="relative z-[1] mx-auto w-full max-w-lg"
          >
            {live ? (
              <div className="flex flex-col items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-gray-900 px-7 py-3.5 text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-accent-green"
                >
                  <PlayMark className="h-6 w-6" />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/70">
                      Get it on
                    </span>
                    <span className="mt-1 text-[17px] font-semibold tracking-tight">
                      Google Play
                    </span>
                  </span>
                </a>
                <p className="text-[13px] text-gray-700">
                  Free download · Android · Verified college email required
                </p>
              </div>
            ) : status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white/70 px-6 py-8"
              >
                <CheckCircle2 className="h-8 w-8 text-emerald-700" strokeWidth={2.25} />
                <p className="text-[17px] font-semibold text-gray-900">You&apos;re on the list</p>
                <p className="text-sm text-gray-700">
                  We&apos;ll email you an invite when 4Students opens up on your campus.
                </p>
              </motion.div>
            ) : (
              <>
                {status === 'error' && (
                  <div
                    role="alert"
                    className="mb-4 flex items-start gap-3 rounded-xl bg-white/80 p-4 text-left"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-700" />
                    <p className="text-sm leading-relaxed text-red-900">{errorMessage}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="waitlist-email" className="sr-only">
                    Your email address
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@college.edu"
                    className="min-w-0 flex-1 rounded-full bg-white/90 px-5 py-3 text-[15px] text-gray-900 placeholder-gray-500 outline-none ring-gray-900/10 transition focus-visible:ring-2 focus-visible:ring-gray-900/40"
                  />
                  <label htmlFor="waitlist-college" className="sr-only">
                    Your college (optional)
                  </label>
                  <input
                    id="waitlist-college"
                    name="college"
                    type="text"
                    placeholder="Your college"
                    className="min-w-0 rounded-full bg-white/90 px-5 py-3 text-[15px] text-gray-900 placeholder-gray-500 outline-none ring-gray-900/10 transition focus-visible:ring-2 focus-visible:ring-gray-900/40 sm:max-w-[36%]"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex min-w-[150px] items-center justify-center rounded-full bg-gray-900 px-7 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {status === 'submitting' ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      'Join waitlist'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
