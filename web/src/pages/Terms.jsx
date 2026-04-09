import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="pt-[120px] pb-24 lg:pb-32 px-5 sm:px-8 max-w-[800px] mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-[2.5rem] sm:text-[3rem] text-text-main mb-6 leading-tight">Terms of Service</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
          <p>
            Welcome to 4Students! These Terms of Service ("Terms") govern your access to and use of 
            the 4Students website, application, and services. By using our Services, you agree to comply 
            with and be bound by these Terms.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">1. Eligibility</h2>
          <p>
            You must be a current student or alumni of an accredited higher education institution with a valid 
            .edu email address to register for an account. By registering, you represent and warrant that you 
            meet this requirement.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">2. User Accounts</h2>
          <p>
            When you create an account, you agree to provide accurate, current, and complete information. 
            You are responsible for safeguarding your password and for all activities that occur under your account.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">3. Prohibited Conduct</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Posting illegal, fraudulent, or hazardous items.</li>
            <li>Harassing, abusing, or harming another person.</li>
            <li>Using the Service for any commercial solicitation purposes outside the context of the campus marketplace.</li>
            <li>Attempting to bypass security measures or access data not intended for you.</li>
          </ul>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">4. Content Ownership</h2>
          <p>
            You retain your rights to any content you submit, post or display. By posting content, you grant 
            us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, and display such content.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
