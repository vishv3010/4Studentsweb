import { motion } from 'framer-motion';

export default function Guidelines() {
  return (
    <div className="pt-[120px] pb-24 lg:pb-32 px-5 sm:px-8 max-w-[800px] mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-[2.5rem] sm:text-[3rem] text-text-main mb-6 leading-tight">Community Guidelines</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
          <p>
            4Students is built for students, by students. To keep our campus marketplaces and forums safe, 
            respectful, and useful, we require all users to adhere to these Community Guidelines.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">1. Be Respectful</h2>
          <p>
            Treat your fellow students with respect. Hate speech, bullying, harassment, and discrimination 
            based on race, ethnicity, national origin, religion, sex, gender identity, or disability will 
            result in immediate account termination.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">2. Safe Trading Practices</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Whenever possible, meet in public, well-lit areas on campus (like the library or student union).</li>
            <li>If a deal sounds too good to be true, it probably is.</li>
            <li>Do not request payment outside the platform via unsecure methods before meeting.</li>
          </ul>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">3. Honest Listings</h2>
          <p>
            Describe your items accurately. Do not use misleading photos or hide significant damage. 
            If selling electronics, demonstrate that they work when meeting up.
          </p>

          <h2 className="text-xl font-bold text-text-main mt-10 mb-4">4. No Spam or Self-Promotion</h2>
          <p>
            Keep your posts relevant to the campus community. Do not spam forums or marketplaces with 
            links to external surveys, unrelated businesses, or multi-level marketing schemes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
