/**
 * Title, description and canonical URL for every indexable page. The React
 * pages pass these to <SEO />, and the build script (scripts/generate-routes.js)
 * writes them into each page's pre-rendered HTML, so the two can never drift.
 *
 * Google builds the sitelinks under the main 4students.in result from these:
 * the title becomes the sitelink's label and the description the line under it.
 * Keep titles to "<Page> — 4Students" so the label reads as a clean page name
 * that matches the nav link, and front-load each description, because only its
 * first ~60 characters survive.
 *
 * Plain JS with an explicit .js import so Node can load it without Vite.
 */
const SITE = 'https://4students.in';

export const PAGES = {
  home: {
    title: '4Students — The Campus Super App',
    description: 'The ultimate college super-app. Buy and sell textbooks & gear, find teammates and roommates, and challenge rival colleges. Free for verified college students.',
    canonical: `${SITE}/`,
  },
  features: {
    label: 'Features',
    title: 'Features — 4Students',
    description: 'Campus marketplace, teammate and roommate finder, secure in-app chat, and inter-college sports — everything 4Students offers college students.',
    canonical: `${SITE}/features`,
  },
  howItWorks: {
    label: 'How It Works',
    title: 'How It Works — 4Students',
    description: 'Get started in 3 simple steps: sign up with your email or Google account, list or browse campus items, and meet safely on campus.',
    canonical: `${SITE}/how-it-works`,
  },
  about: {
    label: 'About',
    title: 'About Us — 4Students',
    description: 'The verified student network connecting college campuses through a trusted marketplace, student communities, and inter-college sports.',
    canonical: `${SITE}/about`,
  },
  faq: {
    label: 'FAQ',
    title: 'FAQ — 4Students',
    description: 'Answers to common questions about signing up, safe student meetups, supported colleges, and using the 4Students app.',
    canonical: `${SITE}/faq`,
  },
  support: {
    label: 'Support',
    title: 'Support & Contact — 4Students',
    description: 'Contact the 4Students team for help with your account or a trade, report an issue, or ask for your college to be added.',
    canonical: `${SITE}/support`,
  },
  guidelines: {
    label: 'Community Guidelines',
    title: 'Community Guidelines — 4Students',
    description: 'Our community rules for verified student safety, respect, authentic trading, and keeping university campuses trusted and secure.',
    canonical: `${SITE}/guidelines`,
  },
  privacy: {
    label: 'Privacy Policy',
    title: 'Privacy Policy — 4Students',
    description: 'Learn how 4Students protects your personal data, university verification details, and student privacy.',
    canonical: `${SITE}/privacy`,
  },
  terms: {
    label: 'Terms of Service',
    title: 'Terms of Service — 4Students',
    description: 'Review the terms and conditions for using the 4Students campus marketplace and student community platform.',
    canonical: `${SITE}/terms`,
  },
};
