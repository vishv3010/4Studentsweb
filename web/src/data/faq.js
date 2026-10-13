import { isPlayStoreLive } from '../config.js';

/**
 * The full FAQ shown on /faq. This is the single source for that page: the
 * build script (scripts/generate-routes.js) reads it too, to write the
 * pre-rendered /faq HTML and its FAQPage structured data. Google expects that
 * structured data to match what the page actually shows, so edit answers
 * here rather than in the script.
 *
 * Plain JS with an explicit .js import so Node can load it without Vite.
 */
const live = isPlayStoreLive();

export const FAQ_CATEGORIES = [
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
