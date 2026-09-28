import { motion } from 'framer-motion';
import { ShoppingBag, Swords, Users, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import DownloadCTA from '../components/DownloadCTA';

const EASE = [0.22, 1, 0.36, 1];

const detailedFeatures = [
  {
    icon: ShoppingBag,
    badge: 'Campus Marketplace',
    title: 'Buy & sell gear within a 5-minute walk',
    description: 'No shipping fees, no waiting days for delivery. Find textbooks, lab coats, calculators, dorm essentials, and electronics from students on your own campus. Meet in the library or cafeteria, inspect in person, and pay directly.',
    highlights: ['Zero platform commission', 'Verified student sellers only', 'In-person campus handoffs'],
    accent: 'bg-accent-green/20 text-accent-green border-accent-green/30',
    screenshot: '/screenshots/new1.webp',
  },
  {
    icon: Users,
    badge: 'Campus Community',
    title: 'Find teammates, roommates, and your college crew',
    description: 'Stop struggling to find hackathon partners or reliable roommates on messy WhatsApp groups. Post your requirements or browse student posts filtered by your university, branch, and interests.',
    highlights: ['Hackathon & project teams', 'Roommate & flatmate matching', 'Study circles & startup founders'],
    accent: 'bg-accent-lavender/20 text-indigo-400 border-accent-lavender/30',
    screenshot: '/screenshots/new4.webp',
  },
  {
    icon: Swords,
    badge: 'College Arena',
    title: 'Challenge rival colleges & claim campus bragging rights',
    description: 'Take inter-college competition to the next level. Challenge rival colleges in cricket, football, basketball, chess, and esports. Organize matches, record official scores, and build your campus ranking.',
    highlights: ['Inter-college match booking', 'Campus leaderboards', 'Multi-sport and gaming support'],
    accent: 'bg-accent-pink/20 text-pink-500 border-accent-pink/30',
    screenshot: '/screenshots/new2.webp',
  },
  {
    icon: MessageSquare,
    badge: 'Secure Chat',
    title: 'Chat safely without giving out your personal number',
    description: 'Negotiate deals, coordinate meetup spots, and discuss projects using built-in end-to-end messaging. Your phone number stays private, and only verified students can message you.',
    highlights: ['Privacy-first messaging', 'No phone number sharing required', 'Spam & harassment filters'],
    accent: 'bg-accent-yellow/20 text-yellow-600 dark:text-yellow-400 border-accent-yellow/30',
    screenshot: '/screenshots/new3.webp',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <SEO
        title="Features — 4Students | The Campus Super App"
        description="Explore 4Students features: peer-to-peer campus marketplace, finding roommates & hackathon teammates, secure chat, and college sports rivalries."
        canonical="https://4students.in/features"
      />

      <div className="pt-[120px] pb-16 px-5 sm:px-8 max-w-[1200px] mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Core Capabilities
          </div>
          <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] text-text-main mb-6 leading-[1.12] tracking-tight">
            Features built exclusively for college life
          </h1>
          <p className="text-[1.1rem] sm:text-[1.25rem] text-text-secondary leading-relaxed">
            One platform that covers everything — from trading dorm gear to finding your hackathon crew and challenging rival universities.
          </p>
        </motion.div>

        {/* Feature Blocks */}
        <div className="space-y-24 mb-24">
          {detailedFeatures.map((feat, index) => {
            const isReversed = index % 2 === 1;
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.badge}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${feat.accent}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {feat.badge}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-text-main font-normal tracking-tight">
                    {feat.title}
                  </h2>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                    {feat.description}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {feat.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm sm:text-base text-text-main">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual / Screenshot */}
                <div className="flex-1 w-full max-w-sm sm:max-w-md mx-auto">
                  <div className="bg-gray-900 rounded-[2rem] p-2 sm:p-2.5 shadow-2xl shadow-indigo-950/20 border border-white/10 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src={feat.screenshot}
                      alt={feat.title}
                      width={700}
                      height={1550}
                      className="w-full rounded-[1.6rem] block"
                      style={{ aspectRatio: '700 / 1550' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links Banner */}
        <div className="bg-bg-soft border border-border rounded-2xl p-8 sm:p-10 mb-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-text-main mb-2">Want to see how it works in 3 steps?</h3>
            <p className="text-text-muted text-sm sm:text-base">Check our simple onboarding guide for college students.</p>
          </div>
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-opacity"
          >
            How It Works <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <DownloadCTA />
    </>
  );
}
