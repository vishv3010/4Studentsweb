import { motion } from 'framer-motion';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const EASE = [0.22, 1, 0.36, 1];

export default function Support() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
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
              <a href="mailto:support@4students.app" className="text-xs font-semibold text-text-main mt-3 inline-block hover:underline">support@4students.app</a>
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
            className="bg-accent-green/10 border border-accent-green/30 text-accent-green rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-accent-green/80">We've received your request and will get back to you within 24 hours.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 px-6 py-2 bg-accent-green text-bg-main rounded-full font-medium text-sm hover:scale-105 transition-transform"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-text-main">Your Name</label>
                <input 
                  type="text" 
                  id="name"
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
        )}
      </motion.div>
    </div>
  );
}
