import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="pt-[120px] pb-24 lg:pb-32 px-5 sm:px-8 max-w-[800px] mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-[2.5rem] sm:text-[3rem] text-text-main mb-6 leading-tight">Privacy Policy</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
          <p>
            At 4Students, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website or use our mobile application.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide to us when you register on the App. 
            This includes your name, .edu email address, university affiliation, and profile picture.
            For marketplace transactions, we may store your listing details and chat history for safety purposes.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect or receive to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Facilitate account creation and logon process.</li>
            <li>Verify your student status using your .edu email.</li>
            <li>Enable user-to-user communications for trades and community posts.</li>
            <li>Protect our Services and prevent fraudulent transactions or harassment.</li>
          </ul>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">3. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal identification information to others. 
            We may share generic aggregated demographic information not linked to any personal 
            identification information with our business partners and trusted affiliates.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">4. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
            <br />
            <strong>privacy@4students.app</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
