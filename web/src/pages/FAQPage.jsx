import { motion } from 'framer-motion';
import { HelpCircle, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import DownloadCTA from '../components/DownloadCTA';
import { isPlayStoreLive } from '../config';

const EASE = [0.22, 1, 0.36, 1];
const live = isPlayStoreLive();

const faqCategories = [
  {
    category: 'Account & Verification',
    items: [
      {
        q: 'Who can join 4Students?',
        a: 'Any enrolled college or university student. Sign up with your email or Google account and pick your college, year and branch. Every account is authenticated, ensuring you only trade and communicate with real peers.',
      },
      {
        q: 'Do I need a college email address to sign up?',
        a: 'No. Any email address or Google account works. You choose your college from the list when you create your account. If your college is not listed yet, reach out through our Support page and we will add it.',
      },
      {
        q: 'Is my personal phone number or email visible to other students?',
        a: 'No. Your phone number and private contact info are never displayed. All communication happens through 4Students in-app messaging to preserve student privacy.',
      },
    ],
  },
  {
    category: 'Marketplace & Safety',
    items: [
      {
        q: 'Is 4Students free to use?',
        a: 'Yes — 100% free to download and use. We do not charge listing fees, and we take zero commission on any items you buy or sell.',
      },
      {
        q: 'How do payments work for marketplace items?',
        a: 'Trades are peer-to-peer. When you meet the buyer or seller on campus to inspect the item, you pay directly via UPI, cash, or your preferred payment method.',
      },
      {
        q: 'How do you prevent scams and ensure safety?',
        a: 'All accounts require student verification, all chats are monitored for suspicious keywords, and transactions happen in-person on campus grounds where security is present.',
      },
    ],
  },
  {
    category: 'Colleges & Availability',
    items: [
      {
        q: 'Which colleges are currently supported?',
        a: 'We are expanding across Gujarat and premier universities, starting around Gandhinagar and Ahmedabad — including PDEU, DAIICT, GNLU, IAR, Nirma University, and more.',
      },
      {
        q: 'How can I get my college added to the platform?',
        a: 'Email us directly at 4studentshub@gmail.com or send a note through our Support page. We prioritize campuses where student demand is highest.',
      },
      {
        q: 'When can I download the mobile application?',
        a: live
          ? '4Students is live on the Google Play Store right now! Download it to start connecting with your campus.'
          : 'The app is currently in active testing on Google Play. You can sign up on the waitlist to receive immediate early access as your campus unlocks.',
      },
    ],
  },
  {
    category: 'Community & Arena',
    items: [
      {
        q: 'What can I post under the Community section?',
        a: 'You can post to find roommates or flatmates, recruit teammates for upcoming hackathons, organize study groups, or look for startup co-founders.',
      },
      {
        q: 'How does the College Arena work?',
        a: 'The Arena lets your college challenge rival universities in sports like cricket, football, basketball, and chess. Record match outcomes and defend your college pride on the regional leaderboard.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ — 4Students | Frequently Asked Questions"
        description="Answers to common questions about 4Students, signing up, safe student meetups, supported universities, and more."
        canonical="https://4students.in/faq"
      />

      <div className="pt-[120px] pb-16 px-5 sm:px-8 max-w-[1000px] mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 bg-primary/10 text-primary border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Help & Knowledge Base
          </div>
          <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] text-text-main mb-6 leading-[1.12] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[1.1rem] sm:text-[1.25rem] text-text-secondary leading-relaxed">
            Everything you need to know about joining 4Students, trading gear safely, and connecting with your campus.
          </p>
        </motion.div>

        {/* Categorized FAQs */}
        <div className="space-y-14 mb-20">
          {faqCategories.map((group) => (
            <div key={group.category} className="space-y-6">
              <h2 className="font-serif text-2xl text-text-main pb-2 border-b border-border">
                {group.category}
              </h2>
              <div className="grid gap-4">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-bg-soft border border-border space-y-2 hover:border-border-dark transition-colors"
                  >
                    <h3 className="font-semibold text-text-main text-base sm:text-lg">
                      {item.q}
                    </h3>
                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Support Box */}
        <div className="bg-bg-soft border border-border rounded-2xl p-8 sm:p-10 mb-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent-pink/20 flex items-center justify-center text-pink-600 dark:text-pink-400 flex-shrink-0 mt-1">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-main mb-1">Didn't find your answer?</h3>
              <p className="text-text-muted text-sm">Our support team is here to assist college students with any questions or account issues.</p>
            </div>
          </div>
          <Link
            to="/support"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Contact Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <DownloadCTA />
    </>
  );
}
