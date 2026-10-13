import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { FAQ_CATEGORIES } from '../src/data/faq.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const faqItems = FAQ_CATEGORIES.flatMap((group) => group.items);

// Built from the same data the /faq page renders, so the crawlable HTML and
// the FAQPage structured data always match what visitors actually see.
const faqContent = `
      <main class="static-content">
        <h1>Frequently Asked Questions</h1>
${FAQ_CATEGORIES.map((group) => `        <h2>${escapeHtml(group.category)}</h2>
${group.items.map((item) => `        <section>
          <h3>${escapeHtml(item.q)}</h3>
          <p>${escapeHtml(item.a)}</p>
        </section>`).join('\n')}`).join('\n')}
      </main>
    `;

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}, null, 2);

const routes = [
  {
    path: 'features',
    title: 'Features — 4Students | The Campus Super App',
    description: 'Explore 4Students features: peer-to-peer campus marketplace, finding roommates and hackathon teammates, and college sports rivalries.',
    canonical: 'https://4students.in/features',
    heading: 'Features Built Exclusively for College Life',
    content: `
      <main class="static-content">
        <h1>Features Built Exclusively for College Life</h1>
        <p>One platform that covers everything — from trading dorm gear to finding your hackathon crew and challenging rival universities.</p>
        <section>
          <h2>Campus Marketplace</h2>
          <p>Find textbooks, lab coats, calculators, dorm essentials, and electronics from students on your own campus. Zero platform commission, verified student sellers only, and safe in-person campus handoffs.</p>
        </section>
        <section>
          <h2>Campus Community</h2>
          <p>Find teammates, roommates, and your college crew. Post your requirements or browse student posts for hackathons, flatmates, and study groups.</p>
        </section>
        <section>
          <h2>College Arena</h2>
          <p>Challenge rival colleges in cricket, football, basketball, chess, and esports. Build your campus ranking and defend college pride.</p>
        </section>
        <section>
          <h2>Secure In-App Chat</h2>
          <p>Chat safely without giving out your personal phone number. Coordinate meetups and negotiate deals privately.</p>
        </section>
      </main>
    `,
  },
  {
    path: 'how-it-works',
    title: 'How It Works — 4Students | Campus Onboarding Guide',
    description: 'Get started with 4Students in 3 simple steps: sign up with your email or Google account, list or browse campus items, and meet safely on campus.',
    canonical: 'https://4students.in/how-it-works',
    heading: 'How 4Students Works',
    content: `
      <main class="static-content">
        <h1>How 4Students Works</h1>
        <p>Joining your campus network is simple, free, and takes under a minute.</p>
        <ol>
          <li><strong>01. Create your account</strong>: Sign up with your email or Google account, then pick your college, year and branch.</li>
          <li><strong>02. List or browse</strong>: Post what you are selling in 30 seconds, or browse verified listings right on your campus.</li>
          <li><strong>03. Meet and trade safely</strong>: Chat in-app, agree on a price, and meet in public campus locations like the cafeteria or library.</li>
        </ol>
      </main>
    `,
  },
  {
    path: 'about',
    title: 'About Us — 4Students | The Campus Super App',
    description: 'Learn about 4Students — the verified student network connecting university campuses through trusted commerce, student communities, and sports.',
    canonical: 'https://4students.in/about',
    heading: 'Building the Digital Infrastructure for Campus Life',
    content: `
      <main class="static-content">
        <h1>About 4Students — Campus Super App</h1>
        <p>University life is fast, vibrant, and packed with potential — but students were relying on messy, unverified chat groups. We built 4Students to give every college student a safe, dedicated digital home.</p>
        <section>
          <h2>Our Core Pillars</h2>
          <ul>
            <li><strong>Marketplace</strong>: Buy & sell textbooks, electronics, and dorm essentials with verified students on campus.</li>
            <li><strong>Community</strong>: Find roommates, hackathon partners, study groups, and startup co-founders.</li>
            <li><strong>Arena</strong>: Challenge rival colleges in sports and esports.</li>
            <li><strong>Profile</strong>: Your verified campus identity and student reputation.</li>
          </ul>
        </section>
      </main>
    `,
  },
  {
    path: 'faq',
    title: 'FAQ — 4Students | Frequently Asked Questions',
    description: 'Answers to common questions about 4Students, signing up, safe student meetups, supported universities, and more.',
    canonical: 'https://4students.in/faq',
    heading: 'Frequently Asked Questions',
    isFaq: true,
    content: faqContent,
  },
  {
    path: 'support',
    title: 'Support & Help Center — 4Students',
    description: 'Need help or want to report an issue? Contact the 4Students support team or get in touch with campus representatives.',
    canonical: 'https://4students.in/support',
    heading: '4Students Support & Help Center',
    content: `
      <main class="static-content">
        <h1>Support & Help Center</h1>
        <p>Whether you have a question about trades, need to report an issue, or want your college added — our team is here for you.</p>
        <p>Email: 4studentshub@gmail.com</p>
      </main>
    `,
  },
  {
    path: 'guidelines',
    title: 'Community Guidelines — 4Students',
    description: 'Our community rules for verified student safety, respect, authentic trading, and keeping university campuses trusted and secure.',
    canonical: 'https://4students.in/guidelines',
    heading: 'Community Guidelines',
    content: `
      <main class="static-content">
        <h1>Community Guidelines</h1>
        <p>To keep our campus marketplaces and forums safe, respectful, and useful, we require all users to adhere to our student safety and trading rules.</p>
      </main>
    `,
  },
  {
    path: 'privacy',
    title: 'Privacy Policy — 4Students',
    description: 'Learn how 4Students protects your personal data, university verification details, and student privacy.',
    canonical: 'https://4students.in/privacy',
    heading: 'Privacy Policy',
    content: `
      <main class="static-content">
        <h1>Privacy Policy</h1>
        <p>At 4Students, we take your privacy seriously. Learn how we collect, use, and protect your information when using our campus app.</p>
      </main>
    `,
  },
  {
    path: 'terms',
    title: 'Terms of Service — 4Students',
    description: 'Review the terms and conditions for using the 4Students campus marketplace and student community platform.',
    canonical: 'https://4students.in/terms',
    heading: 'Terms of Service',
    content: `
      <main class="static-content">
        <h1>Terms of Service</h1>
        <p>Review the terms and conditions for using the 4Students application, website, and campus services.</p>
      </main>
    `,
  },
];

function generateRoutes() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  for (const route of routes) {
    const routeDir = path.join(distDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    let pageHtml = baseHtml;

    // Replace Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

    // Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // Replace OpenGraph & Twitter tags
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:description" content="${route.description}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s,
      `<meta property="og:url" content="${route.canonical}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // Breadcrumb Schema
    const breadcrumbSchema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://4students.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "${route.heading}",
            "item": "${route.canonical}"
          }
        ]
      }
    </script>
    `;

    let additionalSchema = '';
    if (route.isFaq) {
      additionalSchema = `
    <script type="application/ld+json">
${faqSchema}
    </script>
`;
    } else if (route.path === 'support') {
      additionalSchema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "4Students Support & Help Center",
        "description": "Contact the 4Students support team or get in touch with campus representatives.",
        "url": "https://4students.in/support"
      }
    </script>
      `;
    }

    pageHtml = pageHtml.replace('</head>', `${breadcrumbSchema}\n${additionalSchema}\n  </head>`);

    // Add static crawlable fallback inside root before JS mounts
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${route.content}</div>`
    );

    const outPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outPath, pageHtml, 'utf8');

    // Also write clean route.html for direct URL hits without trailing slash
    const cleanPath = path.join(distDir, `${route.path}.html`);
    fs.writeFileSync(cleanPath, pageHtml, 'utf8');

    console.log(`Generated: ${path.relative(distDir, outPath)} & ${path.relative(distDir, cleanPath)}`);
  }

  console.log(`Successfully generated static HTML pages for ${routes.length} routes.`);
}

generateRoutes();
