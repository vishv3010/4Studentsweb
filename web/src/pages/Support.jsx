import { motion } from 'framer-motion';
import { Mail, MessageSquare, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { isFormConfigured, submitToWeb3Forms } from '../config';

const EASE = [0.22, 1, 0.36, 1];

export default function Support() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());

    // Say so plainly rather than showing a success message for a message that
    // was never actually sent anywhere.
    if (!isFormConfigured()) {
      setErrorMessage(
        "This form isn't connected yet. Please email us directly at 4studentshub@gmail.com and we'll get back to you."
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      await submitToWeb3Forms({
        subject: `4Students support — ${fields.topic || 'General Inquiry'}`,
        from_name: fields.name,
        ...fields,
      });
      setStatus('success');
    } catch (err) {
      setErrorMessage(
        err.message || 'Something went wrong sending your message. Please try again, or email 4studentshub@gmail.com directly.'
      );
      setStatus('error');
    }
  };

  return (
    <div className="pt-[120px] pb-24 lg:pb-32 px-5 sm:px-8 max-w-[800px] mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
        <h1 className="font-serif text-[2.5rem] sm:text-[3rem] text-text-main mb-4 leading-tight">
          How can we help?
        </h1>
        <p className="text-[1.1rem] text-text-secondary mb-12">
          Whether you have a question about trades, need to report an issue, or just want to say hi — we're here for you.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="bg-bg-soft border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <h3 className="text-text-main font-semibold mb-1">FAQs & Guides</h3>
              <p className="text-sm text-text-muted">Browse our help center for quick answers to common questions.</p>
              <a href="#" className="text-xs font-semibold text-text-main mt-3 inline-block hover:underline">Read FAQs &rarr;</a>
            </div>
          </div>
          <div className="bg-bg-soft border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#8900ff]" />
            </div>
            <div>
              <h3 className="text-text-main font-semibold mb-1">Email Us directly</h3>
              <p className="text-sm text-text-muted">Need specific help? Reach out directly to our support team.</p>
              <a href="mailto:4studentshub@gmail.com" className="text-xs font-semibold text-text-main mt-3 inline-block hover:underline">4studentshub@gmail.com</a>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" /> Send a Message
        </h2>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-accent-green/10 border border-accent-green/30 rounded-2xl p-8 text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-accent-green/25 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" strokeWidth={2.25} />
            </div>
            <h3 className="text-xl font-semibold text-text-main mb-2">Message Sent!</h3>
            <p className="text-text-secondary max-w-sm">We've received your request and will get back to you within 24 hours.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 px-6 py-2 bg-accent-green text-emerald-950 rounded-full font-medium text-sm hover:scale-105 transition-transform"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-300/60 bg-red-50 p-4 dark:border-red-500/30 dark:bg-red-500/10"
                role="alert"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">{errorMessage}</p>
              </motion.div>
            )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-main">Your Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-text-main">University Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                  placeholder="john@university.edu"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium text-text-main">Topic</label>
              <select
                id="topic"
                name="topic"
                className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text-main focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all appearance-none"
              >
                <option value="general">General Inquiry</option>
                <option value="report">Report a User or Listing</option>
                <option value="bug">Report a Bug</option>
                <option value="feedback">Feature Feedback</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-text-main">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full bg-bg-soft border border-border rounded-xl px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="bg-text-main text-bg-main px-8 py-3.5 rounded-full font-medium shadow-md hover:scale-[1.02] hover:shadow-[var(--hover-shadow)] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center min-w-[160px]"
            >
              {status === 'submitting' ? (
                <div className="w-5 h-5 border-2 border-bg-main/30 border-t-bg-main animate-spin rounded-full" />
              ) : 'Send Message'}
            </button>
          </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
