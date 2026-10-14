import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PAGES } from '../data/pages';
import HowItWorks from '../components/HowItWorks';
import DownloadCTA from '../components/DownloadCTA';

const EASE = [0.22, 1, 0.36, 1];

const safetyTips = [
  {
    title: 'Meet in daylight in public campus spots',
    desc: 'Always arrange handoffs in familiar, high-traffic campus locations like the university library, cafeteria, or main quad.',
  },
  {
    title: 'Inspect items before completing payment',
    desc: 'Take your time testing electronics, browsing textbook pages, or inspecting gear before transferring funds.',
  },
  {
    title: 'Keep all conversations inside 4Students',
    desc: 'Using built-in chat keeps your phone number private and allows our moderation team to step in if issues arise.',
  },
  {
    title: 'Use direct UPI or cash during meetup',
    desc: 'Never send advance deposits or wire money to anyone before you have met in person and verified the item.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SEO {...PAGES.howItWorks} />

      <div className="pt-[120px] pb-16 px-5 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 bg-primary/10 text-primary border border-primary/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Simple 3-Step Process
          </div>
          <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] text-text-main mb-6 leading-[1.12] tracking-tight">
            How 4Students works
          </h1>
          <p className="text-[1.1rem] sm:text-[1.25rem] text-text-secondary leading-relaxed">
            Joining your campus network is simple, free, and takes under a minute. Here is exactly how trading and connecting works.
          </p>
        </motion.div>

        {/* Core Steps */}
        <div className="mb-20">
          <HowItWorks />
        </div>

        {/* Safety & Guidelines Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Safety First
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-main">
              Best practices for safe campus meetups
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {safetyTips.map((tip, i) => (
              <div key={i} className="p-6 rounded-2xl bg-bg-soft border border-border space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-text-main text-base">{tip.title}</h3>
                </div>
                <p className="text-text-muted text-sm leading-relaxed pl-11">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Quick Link */}
        <div className="bg-bg-soft border border-border rounded-2xl p-8 sm:p-10 mb-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-main mb-1">Still have questions?</h3>
              <p className="text-text-muted text-sm">Check our frequently asked questions about eligibility, supported colleges, and rules.</p>
            </div>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Visit FAQ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <DownloadCTA />
    </>
  );
}
