import { motion } from 'framer-motion';
import { Shield, Sparkles, Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import About from '../components/About';
import Stats from '../components/Stats';
import DownloadCTA from '../components/DownloadCTA';

const EASE = [0.22, 1, 0.36, 1];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us — 4Students | The Campus Super App"
        description="Learn about 4Students — the verified student network connecting university campuses through trusted commerce, student communities, and sports."
        canonical="https://4students.in/about"
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
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission & Vision
          </div>
          <h1 className="font-serif text-[2.5rem] sm:text-[3.5rem] text-text-main mb-6 leading-[1.12] tracking-tight">
            Building the digital infrastructure for campus life
          </h1>
          <p className="text-[1.1rem] sm:text-[1.25rem] text-text-secondary leading-relaxed">
            University life is fast, vibrant, and packed with potential — but students were relying on disjointed chat groups and open marketplaces with zero verification. We built 4Students to fix that.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-text-main">
              Why 4Students exists
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Every college semester, seniors give away or sell textbooks, mini-fridges, cycle locks, and electronics, while juniors search frantically across messy WhatsApp groups to buy them. At the same time, students with great ideas struggle to find hackathon partners outside their immediate circle of friends.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Open marketplace platforms like OLX or Facebook Marketplace are filled with strangers and potential scams. Campuses need a private, safe space where every participant is a verified college student.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-bg-soft border border-border">
                <Shield className="w-6 h-6 text-accent-green mb-2" />
                <h4 className="font-semibold text-text-main text-sm mb-1">100% Verified</h4>
                <p className="text-xs text-text-muted">Every account is linked to a real college.</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-soft border border-border">
                <Target className="w-6 h-6 text-accent-pink mb-2" />
                <h4 className="font-semibold text-text-main text-sm mb-1">Hyperlocal</h4>
                <p className="text-xs text-text-muted">Campus-centric trades and inter-college rivalries.</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-bg-soft border border-border relative overflow-hidden">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-text-main">Our Core Values</h3>
              <div className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                  <div>
                    <h5 className="font-semibold text-text-main text-sm">Student Safety First</h5>
                    <p className="text-xs text-text-muted">In-person campus meetups and private messaging protect personal privacy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                  <div>
                    <h5 className="font-semibold text-text-main text-sm">Empowering Campus Economy</h5>
                    <p className="text-xs text-text-muted">Zero commission fees so students keep 100% of their trade value.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                  <div>
                    <h5 className="font-semibold text-text-main text-sm">Building Real Connections</h5>
                    <p className="text-xs text-text-muted">Bridging the gap between seniors, juniors, and neighbouring university campuses.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars component reuse */}
        <div className="mb-20">
          <About />
        </div>

        {/* Stats */}
        <div className="mb-24">
          <Stats />
        </div>

        {/* Bottom Banner */}
        <div className="bg-bg-soft border border-border rounded-2xl p-8 sm:p-10 mb-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-text-main mb-2">Read our Community Guidelines</h3>
            <p className="text-text-muted text-sm sm:text-base">Learn how we keep our campus spaces trusted and respectful.</p>
          </div>
          <Link
            to="/guidelines"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-opacity"
          >
            Guidelines <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <DownloadCTA />
    </>
  );
}
