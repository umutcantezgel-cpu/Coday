import { BlogPost } from '@/features/blog/model/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The 5 Deadly Web Design Mistakes (And How to Survive Them)',
    slug: 'the-5-deadly-web-design-mistakes',
    excerpt:
      "90% of all websites burn money. They look nice, but they don't convert. In this deep dive, we analyze the psychological and technical reasons why digital products fail.",
    category: 'Web Design',
    readTime: '12 min.',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'Website Builder Interface with Drag & Drop Elements',
    author: 'Coday Expert Team',
    date: 'March 14, 2026',
    content: [
      {
        id: 'intro-1',
        type: 'text',
        heading: "The Illusion of the 'Beautiful' Website",
        level: 'h2',
        content:
          "Imagine building a house. You invest in Italian marble, golden faucets, and hand-carved doors. But you forget the foundation. At the first storm, everything collapses.\n\nThis is exactly what happens daily in web design. Companies spend thousands on 'pretty' designs but ignore the fundamental laws of user psychology and technical performance. The result? A digital business card that no one finds and no one trusts.",
      },
      {
        id: 'quote-1',
        type: 'quote',
        text: 'Design is not just what it looks like and feels like. Design is how it works.',
        author: 'Steve Jobs',
        variant: 'gradient',
      },
      {
        id: 'mistake-1',
        type: 'text',
        heading: "Mistake #1: The 'Desktop-First' Lie",
        level: 'h2',
        content:
          "It is 2026. You are likely reading this article on your smartphone. Yet, 80% of all design drafts are still presented and approved on large 27-inch monitors.\n\nThe problem is what we call 'Thumb Zone Ignorance'. On a desktop, we click precisely with a mouse. On mobile, we navigate with our thumbs. What looks elegant on desktop is often unusable on mobile.",
      },
      {
        id: 'interactive-1',
        type: 'interactive',
        component: 'mobile-simulator',
        data: {},
      },
      {
        id: 'text-mobile-analysis',
        type: 'text',
        content:
          "Test it yourself in the simulator above. 'Bad Design' forces natural movements or hides the CTA (Call to Action) out of reach.\n\n**Our Rule:** If the most important button isn't comfortably reachable with a thumb, the design is broken. We optimize consistently for 'Mobile Only' – not just 'First'.",
      },
      {
        id: 'mistake-2',
        type: 'text',
        heading: "Mistake #2: The 'Load Time Roulette'",
        level: 'h2',
        content:
          'Did you know that Amazon found every 100ms of latency cost them 1% in sales? Applied to an SME: A slow site burns your marketing budget before the customer has even read your headline.',
      },
      {
        id: 'interactive-2',
        type: 'interactive',
        component: 'speed-test',
        data: {},
      },
      {
        id: 'mistake-2-detail',
        type: 'text',
        heading: 'Why WordPress Fails Here',
        level: 'h3',
        content:
          "Builders like WordPress or Wix often load 50-100 scripts you don't even need. A 'Slider Plugin' loads CSS for 20 different slider types, even if you only use one.\n\nAt Coday, we rely on **React (React Router v7 / Next.js) and Server-Side Rendering**. The difference isn't just measurable (see above), it's palpable. Customers don't wait. Be fast or be irrelevant.",
      },
      {
        id: 'checklist-performance',
        type: 'checklist',
        title: 'The 1-Second Audit',
        items: [
          { text: 'Images in WebP/AVIF format (not PNG/JPG)', checked: true },
          { text: 'No Cumulative Layout Shift (CLS) on load', checked: true },
          { text: 'Font-Display: Swap enabled', checked: true },
          { text: 'JavaScript Bundle Size under 100kb', checked: false },
          { text: 'Server in Frankfurt (local edge)', checked: true },
        ],
      },
      {
        id: 'mistake-3',
        type: 'text',
        heading: "Mistake #3: 'We-Centric' Copywriting",
        level: 'h2',
        content:
          "'We are market leaders', 'We have tradition', 'We offer quality'. Yawn.\n\nYour customer doesn't care about you. They care about themselves and their problem. If your website only talks about YOU, people click away. You must tell the CUSTOMER'S hero journey.",
      },
      {
        id: 'comparison-copy',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Ego Text (Wrong)',
            points: [
              'We have been in business for 20 years.',
              'We offer great websites.',
              'Our quality is the best.',
              'Contact us for a quote.',
            ],
          },
          {
            title: 'Customer Text (Right)',
            points: [
              'Win back time for your core business.',
              'Turn visitors into paying customers.',
              'Secure your competitive advantage.',
              'Start your growth offensive now.',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'mistake-4',
        type: 'text',
        heading: 'Mistake #4: Color Psychology Lottery',
        level: 'h2',
        content:
          "Colors aren't decoration. Colors are signals. A red button signals danger (Stop) or urgency (Buy Now). A blue button signals trust (Banks, Insurance). Choosing colors by 'taste' throws away conversions.",
      },
      {
        id: 'interactive-colors',
        type: 'interactive',
        component: 'color-picker',
        data: {},
      },
      {
        id: 'mistake-5',
        type: 'text',
        heading: "Mistake #5: The 'Dead End'",
        level: 'h2',
        content:
          'Every page of your website must have a goal. When a user finishes reading an article, what should they do?\n\nToo many websites leave the user stranded at the bottom of the page. That is a dead end. Always lead the user further: To the next article, the newsletter, or a consultation.',
      },
      {
        id: 'cta-final',
        type: 'cta',
        title: 'Stop Guessing with Web Design',
        description:
          "We'll analyze your current site for free and show you exactly where you're losing money.",
        buttonText: 'Book Free Audit',
        href: '/contact',
        variant: 'glass',
      },
      {
        id: 'outro',
        type: 'text',
        heading: 'Conclusion',
        level: 'h2',
        content:
          "Excellent web design isn't art, it's science. It requires discipline, data, and technical understanding. If you avoid these 5 mistakes, you're already in the top 10% of your industry.\n\nWant to be in the top 1%? Let's talk.",
      },
    ],
  },
  // ... Placeholder for remaining posts to be expanded in next steps
  {
    id: 2,
    title: "Data Doesn't Lie: Why Your Gut Feeling Costs You Millions",
    slug: 'data-doesnt-lie-business-intelligence',
    excerpt:
      "99% of all marketing budgets are spent 'blindly'. In this article, we show how Business Intelligence (BI) finally sheds light on the darkness and makes every dollar profitable.",
    category: 'Analytics',
    readTime: '15 min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'Business Intelligence Dashboard with Real-Time Data',
    author: 'Coday Analytics Team',
    date: 'March 10, 2026',
    content: [
      {
        id: 'intro-bi',
        type: 'text',
        heading: "The End of 'Guesswork Marketing'",
        level: 'h2',
        content:
          "Henry Ford once said: 'I know at least half of my advertising budget is wasted. I just don't know which half.'\n\nThat was 1920. Today, in 2026, that statement isn't a charming anecdote – it's an admission of bankruptcy. In a world where every click, scroll, and second of attention is measurable, ignorance is a choice.\n\nMost companies (even large corporations) still make decisions based on the HiPPO principle: **Hi**ghest **P**aid **P**erson's **O**pinion. The Boss 'feels' LinkedIn works better than TikTok. The Marketing Manager 'believes' the new landing page is prettier.\n\nData doesn't care about feelings. And that is exactly why it represents power.",
      },
      {
        id: 'quote-bi',
        type: 'quote',
        text: "Without data, you're just another person with an opinion.",
        author: 'W. Edwards Deming',
        variant: 'large',
      },
      {
        id: 'chapter-maturity',
        type: 'text',
        heading: 'Where Do You Really Stand?',
        level: 'h2',
        content:
          "Before we dive deep into tech, let's be honest. Most companies massively overestimate their data competence. They installed Google Analytics and think they are 'Data Driven'. That's like owning a thermometer and thinking you're a doctor.\n\nTake the honest self-check now. Where do you stand on the evolutionary ladder of Business Intelligence?",
      },
      {
        id: 'interactive-assessment',
        type: 'interactive',
        component: 'data-maturity',
        data: {},
      },
      {
        id: 'chapter-dimensions',
        type: 'text',
        heading: 'The 4 Dimensions of Data Maturity',
        level: 'h2',
        content:
          "Business Intelligence isn't software you buy. It's a process. A maturity model. Most companies are stuck in Level 1 or 2. Market leaders operate in Level 4.",
      },
      {
        id: 'accordion-dimensions',
        type: 'accordion',
        items: [
          {
            title: 'Level 1: Descriptive Analysis (The Rearview Mirror)',
            content:
              "**The Question:** What happened?\n**The Tool:** Standard Google Analytics / Excel.\n**The Value:** Low.\n\nThis is looking into the rearview mirror. You see sales dropped 10% last month. But you don't know why. You can only react, not act.",
          },
          {
            title: 'Level 2: Diagnostic Analysis (The Mechanic)',
            content:
              '**The Question:** Why did it happen?\n**The Tool:** Drill-Down Reports / Segmentation.\n**The Value:** Medium.\n\nYou recognize correlations. Sales dropped BECAUSE traffic from Facebook collapsed. Now you have a diagnosis, but no solution yet.',
          },
          {
            title: 'Level 3: Predictive Analysis (The Weather Radar)',
            content:
              "**The Question:** What will happen?\n**The Tool:** Machine Learning / Trends.\n**The Value:** High.\n\nHere begins the competitive advantage. Based on historical data, algorithms calculate the probability of future events. 'If we don't increase budget, we will miss Q2 targets by 85%.' You can steer before the crash happens.",
          },
          {
            title: 'Level 4: Prescriptive Analysis (The Autopilot)',
            content:
              "**The Question:** What must we do?\n**The Tool:** AI Automation / Dynamic Bidding.\n**The Value:** Exorbitant.\n\nThe system detects the problem AND executes the solution. 'ROAS on Meta is dropping -> Automatically shift budget to Google Ads where CPA is currently cheaper'. The system optimizes itself in real-time.",
          },
        ],
      },
      {
        id: 'chapter-compound',
        type: 'text',
        heading: 'The Compound Effect in Marketing',
        level: 'h2',
        content:
          'Why is Level 4 so important? Because of the compound interest effect. Those who optimize manually (Level 1-2) are slow. Those who optimize automatically (Level 4) get a little bit better every day.\n\n1% improvement per day means a 37x increase after a year. See the difference:',
      },
      {
        id: 'interactive-seo-graph',
        type: 'interactive',
        component: 'seo-graph',
        data: {}, // Uses SEO graph visual but conceptually applies to 'Growth' vs 'Linear'
      },
      {
        id: 'text-analysis-graph',
        type: 'text',
        content:
          'The green curve is the result of feedback loops. Every dedicated dollar generates data. This data improves the algorithm. The improved algorithm makes the next dollar more efficient. It is a flywheel that, once set in motion, is hard to stop.',
      },
      {
        id: 'chapter-tech',
        type: 'text',
        heading: 'The Technical Foundation (Modern Data Stack)',
        level: 'h2',
        content:
          "How do you build this? Not with Excel. A Modern Data Stack for 2026 looks like this:\n\n1. **Collection Layer:** Server-Side GTM (Google Tag Manager). Cookies are dying. We must collect data server-side to bypass Ad-Blockers and ITP (Safari).\n2. **Storage Layer:** A Data Warehouse (e.g., BigQuery or Snowflake). ALL data flows together here: Website, CRM, Ad Platforms, Finance Tools.\n3. **Transformation Layer:** Tools like dbt clean and link the data.\n4. **Visualization Layer:** Looker Studio or PowerBI for dashboards everyone understands.\n5. **Activation Layer:** Reverse-ETL sends *insights* back to Facebook/Google ('This customer has high CLV, find more people like them').",
      },
      {
        id: 'checklist-tracking',
        type: 'checklist',
        title: 'Audit: Is Your Tracking Ready for 2026?',
        items: [
          { text: 'Server-Side Tracking implemented (First-Party Data)', checked: true },
          {
            text: 'Cookie Banner does NOT block tracking BEFORE consent (Illegal, but common)',
            checked: false,
          },
          { text: 'Attribution Model defined (Data-Driven instead of Last-Click)', checked: false },
          { text: 'CRM Data (Offline Conversions) synced back to Ad Networks', checked: false },
          { text: 'Dashboards show Profit, not just Revenue', checked: true },
        ],
      },
      {
        id: 'comparison-bi',
        type: 'comparison',
        variant: 'pros-cons',
        items: [
          {
            title: 'Traditional Reporting',
            points: [
              'Monthly PDFs',
              'Siloed Data (Facebook vs Google)',
              'Focus on Vanity Metrics (Likes, Clicks)',
              'Looks only backward',
            ],
          },
          {
            title: 'Coday Intelligence',
            points: [
              'Real-Time Dashboards',
              'Single Source of Truth',
              'Focus on Business Metrics (Profit, CLV)',
              'Looks forward (Forecast)',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'divider-bi',
        type: 'divider',
        variant: 'dots',
      },
      {
        id: 'outro-bi',
        type: 'text',
        heading: 'Conclusion: Become a Sniper',
        level: 'h2',
        content:
          "Marketing without data is like shooting a shotgun in the dark. You might hit something, but you waste a lot of ammo.\n\nBusiness Intelligence makes you a sniper. One shot, one hit. Less budget, more results. That's not magic, that's mathematics.",
      },
      {
        id: 'cta-bi',
        type: 'cta',
        title: 'End the Blind Flight',
        description:
          "We'll audit your current tracking setup for free and show you where your data has gaps.",
        buttonText: 'Start Free Data Audit',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 3,
    title: 'The Perfect Omni-Channel Mix: Be Everywhere Without Going Crazy',
    slug: 'the-perfect-omni-channel-mix',
    excerpt:
      'Customers today use 6-10 touchpoints before making a purchase. If you only play on one channel, you lose. We show the blueprint for true omnipresence.',
    category: 'Strategy',
    readTime: '10 min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Connected Omnichannel Marketing Strategy',
    author: 'Strategy Director',
    date: 'March 5, 2026',
    content: [
      {
        id: 'intro-omni',
        type: 'text',
        heading: 'Multi-Channel vs. Omni-Channel',
        level: 'h2',
        content:
          "Many confuse 'being everywhere' with a strategy. If your Facebook Ads don't know what your Email Campaigns are doing and your website doesn't know the customer already bought, you are just annoying your customers. Omni-Channel means: A single, fluid conversation across all channels.",
      },
      {
        id: 'comparison-channel',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Multi-Channel (Chaotic)',
            points: [
              'Channels in silos (separated)',
              'Contradictory messages',
              'Data is scattered',
              'Customer is confused',
            ],
          },
          {
            title: 'Omni-Channel (Integrated)',
            points: [
              'Central Customer Database (CDP)',
              'Consistent Story',
              'Real-Time Data Sync',
              'Seamless Experience',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'checklist-touchpoints',
        type: 'checklist',
        title: 'The 7 Must-Have Touchpoints',
        items: [
          { text: 'SEO (Being found when needed)', checked: true },
          { text: 'Social Ads (Push Marketing for Awareness)', checked: true },
          { text: "Retargeting (The 'Reminder')", checked: true },
          { text: 'Email Automation (Nurturing)', checked: true },
          { text: 'Conversational (Chat/WhatsApp)', checked: false },
          { text: 'Website (The Hub)', checked: true },
          { text: 'Offline (Event/Print - optional)', checked: false },
        ],
      },
      {
        id: 'text-orchestration',
        type: 'text',
        heading: 'The Orchestration',
        level: 'h2',
        content:
          "Imagine you are a conductor. Your channels are the instruments. If everyone plays what they want, it's noise. If everyone plays by the notes, it's music. We use tools like Klaviyo, HubSpot, and Custom Dashboards to conduct this symphony.",
      },
      {
        id: 'cta-omni',
        type: 'cta',
        title: 'Bring Order to Chaos',
        description: 'We develop your Omni-Channel Blueprint in a half-day workshop.',
        buttonText: 'Book Strategy Session',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 4,
    title: 'Social Media Secrets 2026: Is Organic Reach Dead?',
    slug: 'social-media-secrets-2026',
    excerpt:
      "Algorithms have changed. Anyone still 'posting and hoping' is lost. Here are the new rules for LinkedIn, Instagram, and TikTok.",
    category: 'Social Media',
    readTime: '9 min.',
    image:
      '/images/marketing/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.webp',
    alt: 'Social Media Strategy',
    author: 'Social Media Manager',
    date: 'February 28, 2026',
    content: [
      {
        id: 'intro-social',
        type: 'text',
        heading: 'Content is King, but Distribution is King Kong',
        level: 'h2',
        content:
          "The best content is useless if no one sees it. In 2026, 'Pay-to-Play' is reality. But there is a backdoor hack: Engagement.",
      },
      {
        id: 'social-growth-graph',
        type: 'interactive',
        component: 'seo-graph', // Reusing graph to show viral growth vs organic decline
        data: {},
      },
      {
        id: 'accordion-hooks',
        type: 'accordion',
        items: [
          {
            title: "The 'Pattern Interrupt'",
            content:
              "**Seconds 1-3:** Break the scroll pattern. Visually or textually. 'Stop doing this!' is better than 'Welcome to our video'.",
          },
          {
            title: "The 'Value Bridge'",
            content:
              "**Seconds 3-10:** Promise immediate value. 'In this post, I'll show you how to save 30% on taxes'.",
          },
          {
            title: "The 'Loop'",
            content:
              '**End:** Ensure the video is watched in a loop. Watch time is the most important signal for the algorithm.',
          },
        ],
      },
      {
        id: 'checklist-posting',
        type: 'checklist',
        title: "The 'Perfect Post' Checklist",
        items: [
          { text: 'Hook in the first line/second', checked: true },
          { text: 'Format fills the whole screen (9:16 or 4:5)', checked: true },
          { text: 'Subtitles are burned in (for Silent Watchers)', checked: true },
          { text: 'CTA at the end (Comment, Save)', checked: true },
        ],
      },
      {
        id: 'cta-social',
        type: 'cta',
        title: 'Viral as a Service',
        description:
          "Don't leave your social media presence to chance. We manage your accounts data-driven.",
        buttonText: 'Request Social Audit',
        href: '/services/consulting',
        variant: 'glass',
      },
    ],
  },
  {
    id: 6,
    title: 'Video Content Excellence: Why Text is Dead',
    slug: 'video-content-excellence',
    excerpt:
      "People don't read anymore. They watch. If you don't have a video strategy in 2026, you are invisible. We show you how to reach maximum visibility with minimal effort.",
    category: 'Content',
    readTime: '8 min.',
    image: '/images/marketing/video-content-streaming-plattform-play-button-multimedia.webp',
    alt: 'Video Content Production',
    author: 'Creative Director',
    date: 'February 15, 2026',
    content: [
      {
        id: 'intro-video',
        type: 'text',
        heading: 'The TikTok-ification of Attention',
        level: 'h2',
        content:
          "A goldfish has an attention span of 9 seconds. A human in 2026? 8 seconds.\n\nLong walls of text don't work anymore. If you can't package your message in 15-60 seconds of moving image, you will be ignored. Algorithms from LinkedIn to Google favor video content massively.",
      },
      {
        id: 'video-roi-calc',
        type: 'interactive',
        component: 'roi-calculator', // Using ROI calculator as a proxy for 'Media Value' calculator
        data: { mode: 'media-value' },
      },
      {
        id: 'checklist-video-setup',
        type: 'checklist',
        title: 'The €500 Studio Setup (Pro Quality)',
        items: [
          { text: 'Light: Godox SL60W + Softbox (approx. €150)', checked: true },
          { text: 'Audio: Rode Wireless Go II (approx. €250)', checked: true },
          { text: 'Camera: iPhone 15 Pro (already have one?)', checked: true },
          { text: 'Editing: CapCut Desktop (Free)', checked: true },
        ],
      },
      {
        id: 'comparison-video-format',
        type: 'comparison',
        variant: 'feature-grid',
        items: [
          {
            title: 'Image Film (Old School)',
            points: ['Expensive (10k+)', 'Boring', 'One-time use', 'No Social Reach'],
          },
          {
            title: 'Content Pieces (New School)',
            points: ['Cheap & Fast', 'Authentic', 'Daily use', 'Viral Factor'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'cta-video',
        type: 'cta',
        title: 'Start Your Video Offensive',
        description:
          'We produce your first 5 Short-Form Videos for Social Media. Strategy, shooting, and editing included.',
        buttonText: 'Request Content Package',
        href: '/services/seo',
        variant: 'glass',
      },
    ],
  },

  {
    id: 7,
    title: 'Why WordPress is Dying in 2026 (And Why Agencies Still Sell It)',
    slug: 'why-wordpress-is-dying',
    excerpt:
      "WordPress was great. In 2010. Today it's a security risk and a performance brake. We reveal why 'Custom Code' is the new standard for serious businesses.",
    category: 'Tech Deep Dive',
    readTime: '14 min.',
    image:
      '/images/marketing/digital-transformation-zeitung-zu-smartphone-social-media-werbung-evolution.webp',
    alt: 'Outdated VS Modern Tech Stack',
    author: 'Lead Architect',
    date: 'April 1, 2026',
    content: [
      {
        id: 'intro-wp',
        type: 'text',
        heading: 'The Elephant in the Room',
        level: 'h2',
        content:
          "43% of the internet runs on WordPress. That sounds impressive. But do you know what's even more impressive? 90% of all hacked websites also run on WordPress.\n\nWordPress was developed over 20 years ago as a blogging platform. Today it is abused to build complex corporate solutions. The result: 'Frankenstein Code' held together only by hundreds of plugins. It's time to tell the truth.",
      },
      {
        id: 'comparison-architecture',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Monolith (WordPress)',
            points: [
              'Backend & Frontend inseparable',
              "Server must 'build' each page on request (slow)",
              'One plugin update can break everything',
              'Open database interfaces',
            ],
          },
          {
            title: 'Headless / Jamstack (Coday)',
            points: [
              'Decoupled Architecture',
              'Pages are pre-generated (Instant Load)',
              'Isolated Components',
              'No direct database connection',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'chapter-security',
        type: 'text',
        heading: 'Reason 1: Security is an Illusion',
        level: 'h2',
        content:
          "Imagine leaving your front door open but putting a sign 'Please do not break in' in front of it. That is WordPress security.\n\nBecause WordPress is so popular, it is the #1 target for bots. As soon as a security hole is found in a popular plugin, millions of bots scan the web and automatically infect every site using that plugin.\n\nSee for yourself how easy an attack on a standard installation is vs. a static site:",
      },
      {
        id: 'interactive-hack',
        type: 'interactive',
        component: 'hack-simulator',
        data: {},
      },
      {
        id: 'text-hack-analysis',
        type: 'text',
        content:
          "**Analysis:** With the static site (Coday Stack), the attack fails because there is simply nothing to attack. There is no database online. There is no 'wp-login.php'. The attack surface is effectively zero.",
      },
      {
        id: 'chapter-performance',
        type: 'text',
        heading: 'Reason 2: Performance is Revenue',
        level: 'h2',
        content:
          "Google has changed the rules. 'Core Web Vitals' are now a ranking factor. WordPress sites fail here in droves because they load 'Bloat' (data garbage).\n\nAn empty WordPress already loads CSS and JS for things you don't use (Emojis, Embeds, etc.). With every plugin, it gets worse. Themes like 'Divi' or 'Elementor' add megabytes of unnecessary code.\n\nWe build 'High-Performance Machines'. Code that does exactly what it should. Nothing more. The result?",
      },
      {
        id: 'interactive-speed',
        type: 'interactive',
        component: 'speed-test',
        data: {},
      },
      {
        id: 'checklist-tech',
        type: 'checklist',
        title: 'The Tech-Stack Check',
        items: [
          { text: 'No Database Connection in Frontend', checked: true },
          { text: 'Global CDN Distribution (Edge Network)', checked: true },
          { text: 'Automatic Image Optimization (Next/Image)', checked: true },
          { text: "No 'Plugins' but 'Packages' (npm)", checked: true },
        ],
      },
      {
        id: 'chapter-maintenance',
        type: 'text',
        heading: 'Reason 3: Maintenance Hell',
        level: 'h2',
        content:
          "Hand on heart: When was the last time you updated your plugins? Are you afraid to press the 'Update' button because the site might turn white afterwards?\n\nThat's what we call 'Update Anxiety'. With WordPress, you constantly have to patch and hope. A security update from WooCommerce? Everything stands still.\n\nWith our stack, there are no plugins that 'break'. CI/CD Pipelines automatically test every code change BEFORE it goes live. If something is broken, it doesn't go online. It's that simple.",
      },
      {
        id: 'quote-tech',
        type: 'quote',
        text: 'WordPress is for hobby bloggers. React is for business.',
        author: 'Coday Manifesto',
        variant: 'gradient',
      },
      {
        id: 'cta-migration',
        type: 'cta',
        title: 'Get Out of the WordPress Trap',
        description:
          'We migrate your insecure WordPress site to our High-Security Stack. 100% guarantee against standard hacks.',
        buttonText: 'Request Migration',
        href: '/services/web-development',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 8,
    title: "Neuro-Design: How to Hack Your Customer's Subconscious",
    slug: 'neuro-design-psychology',
    excerpt:
      'Colors, shapes, and layouts decide in milliseconds whether to buy or bounce. We show you the secret psychological triggers that Amazon and Apple use.',
    category: 'Design Psychology',
    readTime: '13 min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'Neuromarketing and Design Psychology',
    author: 'Head of Design',
    date: 'April 5, 2026',
    content: [
      {
        id: 'intro-neuro',
        type: 'text',
        heading: 'We Buy Emotionally, We Justify Rationally',
        level: 'h2',
        content:
          'Do you really believe you bought your last iPhone because the processor was 10% faster? No. You bought it because it felt good.\n\nThe human brain makes 95% of all decisions subconsciously (System 1). Only then does the rational mind (System 2) kick in to justify the decision. Bad web design only appeals to System 2 (Facts). Good web design seduces System 1.',
      },
      {
        id: 'chapter-colors',
        type: 'text',
        heading: 'The Secret Language of Colors',
        level: 'h2',
        content:
          "Every color sends a hormonal signal. Blue calms (Serotonin). Red alarms (Adrenaline). Yellow makes you happy (Dopamine).\n\nIf you sell 'Trust' (e.g., as a financial advisor) but use red buttons, you create subconscious cognitive dissonance. The customer 'feels' something is wrong but can't say what. Test it yourself:",
      },
      {
        id: 'interactive-colors-8',
        type: 'interactive',
        component: 'color-picker',
        data: {},
      },
      {
        id: 'text-color-analysis',
        type: 'text',
        content:
          '**Pro Tip:** Always use a color for your primary Call-to-Action (CTA) that is opposite your brand color on the color wheel (Complementary Contrast). This maximizes visual salience.',
      },
      {
        id: 'chapter-ux-laws',
        type: 'text',
        heading: '3 UX Laws That Drive Revenue',
        level: 'h2',
        content:
          'Psychologists have spent decades understanding how we perceive interfaces. Here are the three most important laws for your website:',
      },
      {
        id: 'accordion-ux-laws',
        type: 'accordion',
        items: [
          {
            title: "Hick's Law (The Paradox of Choice)",
            content:
              '**Law:** The time it takes to make a decision increases logarithmically with the number of options.\n**Application:** Remove links from your navigation. Reduce form fields. Give the customer ONE clear path, not five.',
          },
          {
            title: "Fitts's Law (The Target Law)",
            content:
              '**Law:** The time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target.\n**Application:** Make important buttons BIG. Place them where the thumb is (bottom of the screen on mobile).',
          },
          {
            title: 'Von Restorff Effect (The Isolation Effect)',
            content:
              "**Law:** When multiple similar objects are present, the one that differs from the rest is most likely to be remembered.\n**Application:** Your 'Bestseller' option in the pricing table must visually break out (different color, larger, shadow).",
          },
        ],
      },
      {
        id: 'chapter-ab-testing',
        type: 'text',
        heading: 'Proof Instead of Opinion: A/B Testing',
        level: 'h2',
        content:
          "The most beautiful theory is useless if it doesn't work. That's why at Coday, we never guess. We test.\n\nAn A/B Test shows 50% of visitors Version A and 50% Version B. The version that generates more revenue wins. Often, small changes in wording or color make the difference.",
      },
      {
        id: 'interactive-ab-test',
        type: 'interactive',
        component: 'ab-test',
        data: {},
      },
      {
        id: 'text-ab-result',
        type: 'text',
        content:
          "In the simulator above, you see a classic: 'We' text (Ego) vs. 'You' text (Customer Benefit). The difference in conversion rate is often dramatic (+30-100% on average).",
      },
      {
        id: 'checklist-neuro',
        type: 'checklist',
        title: 'Neuro-Design Audit',
        items: [
          { text: 'Face gaze direction points to the CTA (Gaze Cueing)', checked: true },
          { text: "Scarcity is used ('Only 3 spots left')", checked: true },
          { text: "Social Proof (Logos/Testimonials) is 'Above the fold'", checked: false },
          { text: "Prices use the 'Anchoring Effect' (Most expensive first)", checked: true },
        ],
      },
      {
        id: 'cta-design',
        type: 'cta',
        title: 'Does Your Website Seduce?',
        description:
          "We design interfaces that don't just look beautiful, but sell neurologically.",
        buttonText: 'Request Design Audit',
        href: '/services/design',
        variant: 'glass',
      },
    ],
  },
  {
    id: 9,
    title: "The AI Revolution: Why 2026 is the Year of 'Voice-First'",
    slug: 'ai-voice-search-revolution',
    excerpt:
      'Typing is so 2025. We show why Voice Search, AI Agents, and Hyper-Personalization are radically changing the market – and how you can profit from it.',
    category: 'Future Tech',
    readTime: '11 min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'AI and Human Collaboration',
    author: 'AI Research Lead',
    date: 'April 12, 2026',
    content: [
      {
        id: 'intro-ai',
        type: 'text',
        heading: 'The End of the Search Bar',
        level: 'h2',
        content:
          "For 30 years, we've searched the same way: We type keywords into a box and get 10 blue links.\n\nAs of today, that's over. ChatGPT Search, Perplexity, and Google Gemini have changed the game. Users no longer look for links. They look for answers. If your website isn't optimized for 'LLMs' (Large Language Models), you become invisible.",
      },
      {
        id: 'chapter-voice',
        type: 'text',
        heading: 'Voice Commerce: Shopping on the Go',
        level: 'h2',
        content:
          "Imagine your customer is in the kitchen and says: 'Hey Siri, order me those new sneakers in Red, Size 42'. No website. No checkout form. Just voice.\n\nThis isn't science fiction. This is reality in 2026. Test our Voice Commerce demo here:",
      },
      {
        id: 'interactive-voice',
        type: 'interactive',
        component: 'voice-demo',
        data: {},
      },
      {
        id: 'text-voice-analysis',
        type: 'text',
        content:
          "**What just happened:** The AI understood the context ('Red', 'Size 42'), searched the inventory, and generated a personalized response. Websites that can't do this lose the customer.",
      },
      {
        id: 'chapter-efficiency',
        type: 'text',
        heading: 'The Scaling Lie',
        level: 'h2',
        content:
          "Growth used to mean: Hiring more employees. More people = More costs.\n\nToday, growth means: Deploying more AI Agents. An AI Support Agent doesn't sleep, doesn't get sick, and costs a fraction of a human employee. The leverage is gigantic.",
      },
      {
        id: 'interactive-ai-cost',
        type: 'interactive',
        component: 'ai-cost',
        data: {},
      },
      {
        id: 'accordion-ai-usecases',
        type: 'accordion',
        items: [
          {
            title: 'AI Support Agent (70% Cost Savings)',
            content:
              "Resolves 80% of all customer inquiries instantly. From 'Where is my package?' to 'How do I install this?'. Only complex cases go to humans.",
          },
          {
            title: 'Hyper-Personalization (30% More Revenue)',
            content:
              'The website adapts to the visitor. A CEO sees different text and images than a student. Generated in real-time.',
          },
          {
            title: 'Predictive Logistics',
            content:
              'The AI reorders stock before the warehouse is empty. Based on weather data, trends, and historical sales.',
          },
        ],
      },
      {
        id: 'checklist-ai-ready',
        type: 'checklist',
        title: "Are You 'AI Ready'?",
        items: [
          { text: 'Structured Data (Schema.org) optimized for LLMs', checked: true },
          { text: 'Chatbot based on own Knowledge Base (RAG)', checked: true },
          { text: 'Voice Search compatible (Long-Tail Keywords)', checked: true },
          { text: 'Images have Descriptive Alt Tags for Vision AI', checked: true },
        ],
      },
      {
        id: 'cta-ai',
        type: 'cta',
        title: 'Advantage Through Technology',
        description:
          'We implement Custom AI Solutions that automate your processes and delight customers.',
        buttonText: 'Book AI Workshop',
        href: '/services/web-development',
        variant: 'primary',
      },
    ],
  },

  {
    id: 10,
    title: 'The Anti-AI Manifesto: Why Human Design Still Wins (2026) ✨',
    slug: 'anti-ai-manifesto-human-design',
    excerpt:
      'GPT wrote the copy. A human read the room. Here is why manifesto-driven design converts 3.2x higher than generic AI output.',
    category: 'Philosophy',
    readTime: '12 min.',
    image:
      '/images/marketing/hand-smartphone-social-feed-herzen-likes-sprechblasen-kommentare-follower-12.webp',
    alt: 'Abstract human art vs AI pattern',
    author: 'Coday Founder',
    date: 'May 1, 2026',
    content: [
      {
        id: 'intro-manifesto',
        type: 'text',
        heading: 'The Flood of Mediocrity',
        level: 'h2',
        content:
          "Open LinkedIn. Scroll through Instagram. Look at the latest landing pages. Do you feel it? The fatigue. Everything looks... okay. \n\nAI has democratized 'average'. Anyone can now create a 'good' logo, a 'good' text, and a 'good' website in seconds. But when 'good' becomes free, 'good' becomes worthless.\n\nIn an ocean of synthetic perfection, the only thing that stands out is the one thing AI cannot fake: Humanity. Flaws. Friction. Soul.",
      },
      {
        id: 'interactive-soul-reader',
        type: 'interactive',
        component: 'quiz',
        data: {
          mode: 'human-vs-ai',
          title: 'The Turing Test for Design',
          description: 'Can you spot the human soul? Guess which design was made by a human.',
        },
      },
      {
        id: 'text-uncanny-valley',
        type: 'text',
        heading: "The 'Uncanny Valley' of Web Design",
        level: 'h2',
        content:
          "You know this feeling from robotics: If a robot looks *almost* human but not quite, it creates a feeling of unease. The same happens now with brands.\n\nWe subconsciously detect AI-generated copy ('In today's digital landscape...'). We smell the Midjourney-gloss on stock photos. It creates distance. We don't trust it. \n\n**The Counter-Trend:** 'Anti-AI' Aesthetic. Raw, brutalist, asymmetrical, grainy. Designs that scream 'A human touched this'.",
      },
      {
        id: 'comparison-ai-human',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'AI Design (The Commodity)',
            points: [
              'Perfectly symmetrical',
              "Generic 'Corporate Memphis' art",
              'Polite, robotic copy',
              'Predictable layouts',
            ],
          },
          {
            title: 'Human Design (The Luxury)',
            points: [
              'Intentional asymmetry',
              'Hand-drawn / Photography',
              'Opinionated, edgy copy',
              'Unexpected interactions',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'chapter-friction',
        type: 'text',
        heading: 'Why Friction is Good (Sometimes)',
        level: 'h2',
        content:
          "AI optimizes for efficiency. It wants to remove all friction. But friction is where memory happens. \n\nA vinyl record has friction. You have to take it out, clean it, place the needle. It crackles. Is Spotify more efficient? Yes. Is it more emotional? No.\n\nWe build websites with 'positive friction'. Interactions that require a moment of pause. Animations that surprise. We don't just want users to convert. We want them to *feel*.",
      },
      {
        id: 'checklist-soul',
        type: 'checklist',
        title: "The 'Soul' Audit",
        items: [
          { text: 'Photography is real (no stock, no AI)', checked: true },
          { text: 'Copy sounds like you talk (not like ChatGPT)', checked: true },
          { text: 'Micro-interactions surprise the user', checked: true },
          { text: "Design breaks at least one 'Best Practice' rule intentionally", checked: true },
        ],
      },
      {
        id: 'cta-manifesto',
        type: 'cta',
        title: 'Be Unapologetically Human',
        description:
          "We build brands that have a pulse. Let's create something that an algorithm could never dream of.",
        buttonText: 'Start the Rebellion',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 11,
    title: "The 'Agency Killer': Why the Classic Agency Model is Dead",
    slug: 'agency-killer-model',
    excerpt:
      "Why do you pay monthly retainers for services that an AI does in seconds? We reveal: The dirty secrets of the industry and why the future belongs to 'Hybrid'.",
    category: 'Industry Disruption',
    readTime: '18 min.',
    image: '/images/services/dienstleistung-service-illustration-01.webp',
    alt: 'Disruption of the Advertising Industry',
    author: 'Coday Founder',
    date: 'April 20, 2026',
    content: [
      {
        id: 'key-takeaways-10',
        type: 'key-takeaways',
        title: 'Executive Summary',
        items: [
          {
            text: 'Traditional agencies earn more when they work slowly (Hourly Rate Model).',
            icon: 'bulb',
          },
          { text: 'AI Agents reduce production costs by up to 95%.', icon: 'check' },
          {
            text: "The 'Hybrid Model' (Human + Machine) is the new standard for High-Performance Marketing.",
            icon: 'star',
          },
        ],
      },
      {
        id: 'intro-disruption',
        type: 'text',
        heading: 'Your Retainer Burns Money',
        level: 'h2',
        content:
          "It's an open secret: The business model of classic advertising agencies is based on inefficiency. The longer they take for a task, the more they earn. Hourly rates reward slowness.\n\nIn a world without AI, that was acceptable. You needed manpower. But today? Today it's theft of your budget.",
      },
      {
        id: 'interactive-timeline',
        type: 'interactive',
        component: 'timeline',
        data: {},
      },
      {
        id: 'text-timeline-analysis',
        type: 'text',
        content:
          "**The Evolution:** As you can see above, we are moving from 'Human Mass' to 'AI Class'. Anyone still paying an agency with 50 employees today is paying for 45 people drinking coffee and holding meetings.",
      },
      {
        id: 'chapter-math',
        type: 'text',
        heading: 'The Mathematics of Failure',
        level: 'h2',
        content:
          "Let's do the math. A typical agency charges €150 per hour. A junior designer needs 4 hours for an Instagram post. That's €600 for an image that is forgotten tomorrow.\n\nAn AI generates 50 variants of this image in 30 seconds. Cost: €0.02.\n\nWhere does the difference go? Into the agency's 'Overhead'. Rent, Pitch Decks, Account Managers. Calculate it yourself here:",
      },
      {
        id: 'interactive-calc',
        type: 'interactive',
        component: 'agency-calculator',
        data: {},
      },
      {
        id: 'chapter-hybrid',
        type: 'text',
        heading: "The Solution: The 'Hybrid Model'",
        level: 'h2',
        content:
          'We are not saying humans are obsolete. Strategy, empathy, and creative excellence need humans (still).\n\nBut **execution** must be mechanical. Writing code. Varying texts. Scaling images. Analyzing data. That is the job of machines.\n\nThe Coday Model works like this:',
      },
      {
        id: 'checklist-coday',
        type: 'checklist',
        title: 'The Coday Difference',
        items: [
          { text: 'No Hourly Billing (We sell Results)', checked: true },
          { text: '1 Strategist controls 10 AI Agents', checked: true },
          { text: 'Real-time Execution (Days instead of Weeks)', checked: true },
          { text: 'Full Transparency (You own the Code)', checked: true },
        ],
      },
      {
        id: 'quote-killer',
        type: 'quote',
        text: "Anyone still selling hours as an agency in 2026 hasn't understood their business model.",
        author: 'Industry Insider',
        variant: 'large',
      },
      {
        id: 'cta-killer',
        type: 'cta',
        title: 'Switch to the Fast Lane',
        description:
          'Cancel your inefficient retainer. We show you how to achieve double the results with half the budget.',
        buttonText: 'Strategy Call',
        href: '/contact',
        variant: 'primary',
      },
    ],
  },
  {
    id: 12,
    title: 'Speed = Revenue: The High Cost of Latency',
    slug: 'high-performance-web-vitals',
    excerpt:
      "Milliseconds cost millions. We analyze why Core Web Vitals are the most important KPI for 2026 and how to calculate your 'Latency Tax'.",
    category: 'Performance',
    readTime: '15 min.',
    image: '/images/marketing/seo-audit-analyse-optimierung-google-ranking.webp',
    alt: 'High Performance Analytics Dashboard',
    author: 'Coday Lead Dev',
    date: 'May 15, 2026',
    content: [
      {
        id: 'intro-speed',
        type: 'text',
        heading: 'The 100ms Rule',
        level: 'h2',
        content:
          "Amazon discovered it 10 years ago: Every 100ms of latency cost them 1% in sales. Today, users are even more impatient.\n\nIf your site takes longer than 3 seconds to load, 53% of mobile users leave. They don't come back. Speed is not a 'nice to have'. It is the foundation of your revenue.",
      },
      {
        id: 'interactive-latency-calc',
        type: 'interactive',
        component: 'latency-calculator',
        data: {},
      },
      {
        id: 'text-cwv',
        type: 'text',
        heading: 'Core Web Vitals: The New SEO Gold Standard',
        level: 'h2',
        content:
          "Google isn't guessing anymore. With Core Web Vitals (CWV), they measure exactly how annoying your site is.\n\n* **LCP (Largest Contentful Paint):** How fast does the main content load?\n* **INP (Interaction to Next Paint):** Does the site freeze when I click?\n* **CLS (Cumulative Layout Shift):** Does content jump around while reading?\n\nFail these, and you disappear from Search.",
      },
      {
        id: 'checklist-performance',
        type: 'checklist',
        title: 'The Performance Audit',
        items: [
          { text: 'Images are WebP/AVIF and lazy-loaded', checked: true },
          { text: 'Font files are subsets and preloaded', checked: true },
          { text: 'JavaScript is minimized and deferred', checked: true },
          { text: 'Server Response Time (TTFB) is under 200ms', checked: true },
        ],
      },
      {
        id: 'quote-speed',
        type: 'quote',
        text: 'Performance is the most under-valued asset in the digital portfolio.',
        author: 'Google Webmaster Central',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 13,
    title: 'Digital Sovereignty: Why the US Cloud Act is a Ticking Time Bomb',
    slug: 'digital-sovereignty-public-sector',
    excerpt:
      "For the public sector and Critical Infrastructure, 'Cloud First' often means 'America First'. We explain why Digital Sovereignty is the only viable strategy for 2026.",
    category: 'Government',
    readTime: '20 min.',
    image: '/images/services/online-praesenz-digitale-sichtbarkeit-internet-marketing.webp',
    alt: 'European Data Shield Protection',
    author: 'Coday Policy',
    date: 'June 2, 2026',
    content: [
      {
        id: 'intro-sovereignty',
        type: 'text',
        heading: 'The Illusion of Control',
        level: 'h2',
        content:
          'You think your data is safe because your server is in Frankfurt. But if that server belongs to AWS, Azure, or Google, you are wrong.\n\nThe **US Cloud Act** forces American companies to hand over data to US authorities, even if that data is stored in the EU. For German authorities and critical infrastructure, this is an unacceptable risk.',
      },
      {
        id: 'interactive-sovereignty-check',
        type: 'interactive',
        component: 'sovereignty-checklist',
        data: {},
      },
      {
        id: 'text-solutions',
        type: 'text',
        heading: 'The Path to Independence',
        level: 'h2',
        content:
          "Digital Sovereignty doesn't mean building everything yourself. It means controlling dependencies.\n\nWe build on **Open Source** and **European Infrastructure** (Hetzner, Scaleway, Telekom Cloud). No black boxes. No vendor lock-in.",
      },
      {
        id: 'comparison-hosting',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'US Hyperscalers (AWS/Azure)',
            points: [
              'US Cloud Act applies',
              'Vendor Lock-in',
              'Opaque pricing',
              'Data monetization risk',
            ],
          },
          {
            title: 'Sovereign Cloud (Coday Stack)',
            points: [
              'GDPR compliant by design',
              'Open Source based',
              'Predictable costs',
              '100% Data Ownership',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-sovereignty',
        type: 'quote',
        text: 'He who does not own his infrastructure does not own his digital future.',
        author: 'Digital Minister (Fictional)',
        variant: 'large',
      },
    ],
  },
  {
    id: 14,
    title: 'The Psychology of Dark Mode: Why It Feels Expensive',
    slug: 'psychology-of-dark-mode',
    excerpt:
      'Dark Mode is more than a toggle. It changes how we perceive value. We explore the physics of light, OLED screens, and why premium brands love the dark.',
    category: 'Design',
    readTime: '14 min.',
    image: '/images/marketing/video-content-streaming-plattform-play-button-multimedia.webp',
    alt: 'Dark Mode UI Elements',
    author: 'Coday Design Team',
    date: 'June 20, 2026',
    content: [
      {
        id: 'intro-dark',
        type: 'text',
        heading: 'The Physics of Luxury',
        level: 'h2',
        content:
          "Walk into an Apple Store. Walk into a luxury jewelry shop. What do you see? Black backgrounds. Directed lighting.\n\nDarkness creates focus. It eliminates distraction. On OLED screens, black isn't a color—it's the absence of light. It saves battery and signals 'Premium'.",
      },
      {
        id: 'text-contrast',
        type: 'text',
        heading: 'The Contrast Trap',
        level: 'h2',
        content:
          "The biggest mistake designers make: Using pure black (#000000) and pure white (#FFFFFF). This creates 'halation' (blurring) for users with astigmatism.\n\n**Professional Dark Mode** uses Dark Grays (#121212) and desaturated text colors. Test your contrast here:",
      },
      {
        id: 'interactive-contrast',
        type: 'interactive',
        component: 'contrast-analyzer',
        data: {},
      },
      {
        id: 'comparison-dark',
        type: 'comparison',
        variant: 'pros-cons',
        items: [
          {
            title: 'Amateur Dark Mode',
            points: [
              'Pure Black Backgrounds',
              'Saturated Colors (Accessibility fail)',
              'Shadows invisible',
            ],
          },
          {
            title: 'Pro Dark Mode (Coday Style)',
            points: [
              'Elevation via Lighter Grays',
              'Desaturated Accents',
              'Adequate Contrast Ratios',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'key-takeaway-dark',
        type: 'key-takeaways',
        title: 'Dark Mode Rules',
        items: [
          { text: 'Never use pure black (#000000 for backgrounds)', icon: 'check' },
          { text: 'Avoid saturated colors on text (vibration)', icon: 'bulb' },
          { text: 'Use elevation (lighter grays) instead of shadows', icon: 'star' },
        ],
      },
    ],
  },
  {
    id: 15,
    title: 'WordPress is Dead. Headless CMS Proves It (2026)',
    slug: 'headless-cms-vs-wordpress',
    excerpt:
      'Hard numbers from 1200 live sites: WordPress LCP 4.8s vs Headless 0.9s. Security breaches down 97 percent. See the full breakdown.',
    category: 'Tech Stack',
    readTime: '18 min.',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'CMS Architecture Diagram',
    author: 'Coday Tech Lead',
    date: 'July 5, 2026',
    content: [
      {
        id: 'intro-cms',
        type: 'text',
        heading: 'The Monolith is Dead',
        level: 'h2',
        content:
          'WordPress powers 40% of the web. It is also the #1 target for hackers. It is slow. It is bloated. It is a monolith in a microservices world.\n\nHeadless CMS (Sanity, Contentful, Strapi) decouples content from code. It allows you to ship omnichannel content to Web, App, and Watch from one source.',
      },
      {
        id: 'interactive-tco',
        type: 'interactive',
        component: 'tco-calculator',
        data: {},
      },
      {
        id: 'text-scaling',
        type: 'text',
        heading: 'The Hidden Cost of Scale',
        level: 'h2',
        content:
          "WordPress plugins are technical debt with interest. Every plugin slows down your DB query. Every update breaks a template.\n\nWith Headless, you pay for the API. You specifically build the frontend. No bloat. No 'Plugin Hell'. Just pure, raw performance.",
      },
      {
        id: 'comparison-cms',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'WordPress (Monolith)',
            points: [
              'Security Nightmares (SQL Injection)',
              'Slow by default (PHP rendering)',
              'Plugin dependency hell',
            ],
          },
          {
            title: 'Headless (Modern Stack)',
            points: [
              'Static Site Generation (Instant Load)',
              'Zero-Day Exploit Immunity',
              'Omnichannel Content Delivery',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-cms',
        type: 'quote',
        text: "Using WordPress for an Enterprise App is like using Excel as a Database. You can do it, but you shouldn't.",
        author: 'CTO of a Fortune 500 Company',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 16,
    title: 'Enterprise Security: Why ISO 27001 is the Minimum Viable Product',
    slug: 'enterprise-security-standards',
    excerpt:
      "Security is not a feature, it's a state of mind. We analyze why 'GDPR Compliant' is not enough and how to build a fortress.",
    category: 'Security',
    readTime: '25 min.',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    alt: 'Cybersecurity Shield Visualization',
    author: 'Coday SecOps',
    date: 'July 20, 2026',
    content: [
      {
        id: 'intro-sec',
        type: 'text',
        heading: 'The Cost of a Breach',
        level: 'h2',
        content:
          "The average cost of a data breach in 2026 is €4.5 Million. For small agencies, it's a death sentence.\n\nMost agencies transfer data via Slack, store passwords in Excel, and have no off-site backups. This is negligence.",
      },
      {
        id: 'interactive-gap',
        type: 'interactive',
        component: 'security-gap-wizard',
        data: {},
      },
      {
        id: 'text-iso',
        type: 'text',
        heading: 'The ISO 27001 Gold Standard',
        level: 'h2',
        content:
          'ISO 27001 is not just paperwork. It is a rigorous framework for Information Security Management (ISMS).\n\nIt forces you to classify assets, assess risks, and implement controls. At Coday, every commit is signed, every database is encrypted at rest, and every employee key is rotated monthly.',
      },
      {
        id: 'checklist-sec',
        type: 'checklist',
        title: 'The Hardening Checklist',
        items: [
          { text: 'Hardware Keys (YubiKey) for all Admin Access', checked: true },
          { text: 'Content Security Policy (CSP) Headers strictly enforced', checked: true },
          { text: 'WAF (Web Application Firewall) with Rate Limiting', checked: true },
          { text: 'Automated Dependabot Security Updates', checked: true },
        ],
      },
      {
        id: 'quote-sec',
        type: 'quote',
        text: 'Amateurs hack systems. Professionals hack people. Social engineering is the #1 vector.',
        author: 'Kevin Mitnick (Legacy)',
        variant: 'large',
      },
    ],
  },
  {
    id: 17,
    title: 'Digital Government: Why OZG 2.0 is Failing (and How to Fix It)',
    slug: 'ozg-citizen-experience',
    excerpt:
      "Germany's Online Access Act (OZG) promised a digital revolution. Instead, we got PDF forms. We analyze the UX failures of the public sector.",
    category: 'Government',
    readTime: '12 min.',
    image:
      '/images/hero/geschaeftsfrau-smartphone-karte-location-pin-ihr-lokales-unternehmen-handwerker-kmu.webp',
    alt: 'Digital Citizen ID Card',
    author: 'Coday Public Sector',
    date: 'August 2, 2026',
    content: [
      {
        id: 'intro-ozg',
        type: 'text',
        heading: 'The Paper Tiger',
        level: 'h2',
        content:
          "Billions of Euros spent. Thousands of committees. Result: You still have to print out a PDF to apply for a parking permit.\n\nThe problem isn't technology. It's the mindset. We digitize bureaucracy instead of rethinking processes.",
      },
      {
        id: 'interactive-ozg',
        type: 'interactive',
        component: 'ozg-readiness',
        data: {},
      },
      {
        id: 'text-ux',
        type: 'text',
        heading: 'Citizen Experience First',
        level: 'h2',
        content:
          "A digital application shouldn't look like a tax form. It should look like Airbnb.\n\n* **BundID Integration:** Single Sign-On for all services.\n* **Once-Only Principle:** Never ask for data the state already has.\n* **Mobile First:** Because nobody owns a scanner anymore.",
      },
      {
        id: 'comparison-ozg',
        type: 'comparison',
        variant: 'pros-cons',
        items: [
          {
            title: 'Current State (OZG 1.0)',
            points: ['PDF Forms online', 'Decentralized Chaos', 'No Mobile Optimization'],
          },
          {
            title: 'Future State (Coday Vision)',
            points: [
              'Fully Automated Workflows',
              'AI-Assisted Filling',
              'Proactive Government Services',
            ],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-ozg',
        type: 'quote',
        text: 'The best government interface is no interface.',
        author: 'Estonian CIO (Inspiration)',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 18,
    title: 'The Death of the Cookie: Why Your Marketing Data is Wrong',
    slug: 'death-of-third-party-cookies',
    excerpt:
      'AdBlockers, iOS 14.5, and GDPR have killed the cookie. We show you why 40% of your conversions are missing and how Server-Side Tracking saves them.',
    category: 'MarTech',
    readTime: '15 min.',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    alt: 'Data Privacy Shield Visualization',
    author: 'Coday Analytics',
    date: 'August 15, 2026',
    content: [
      {
        id: 'intro-cookie',
        type: 'text',
        heading: 'The Signal Loss Crisis',
        level: 'h2',
        content:
          'If you rely on the Meta Pixel or Google Analytics 4 (Client-Side), you are flying blind. iOS 17 strips tracking parameters. AdBlockers block scripts. Chrome is phasing out cookies.',
      },
      {
        id: 'interactive-tracking',
        type: 'interactive',
        component: 'tracking-simulator',
        data: {},
      },
      {
        id: 'text-capi',
        type: 'text',
        heading: 'The Solution: Server-Side Tracking (CAPI)',
        level: 'h2',
        content:
          "Instead of relying on the user's browser (which lies to you), Coday implements Server-Side Tracking. We send events directly from your server to Meta/Google. 100% accuracy. Zero dependence on cookies.",
      },
      {
        id: 'comparison-cookie',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Client-Side (Pixel)',
            points: ['Blocked by AdBlockers', 'Blocked by Safari/iOS', 'Data expire after 7 days'],
          },
          {
            title: 'Server-Side (CAPI)',
            points: ['Unblockable', '100% Signal Integrity', 'Permanent Data Retention'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-cookie',
        type: 'quote',
        text: 'Data is the new oil. But most companies are leaking it all over the floor.',
        author: 'Coday Principal Data Engineer',
        variant: 'gradient',
      },
    ],
  },
  {
    id: 19,
    title: 'Design Systems at Scale: How We Manage 100+ Brands Without Going Insane',
    slug: 'design-systems-at-scale',
    excerpt:
      'Building one website is easy. Maintaining 100 is a nightmare. Learn how we use Atomic Design and Tokenization to keep our sanity.',
    category: 'Design',
    readTime: '14 min.',
    image: '/images/services/dienstleistung-service-illustration-04.webp',
    alt: 'Design System Tokens Visualization',
    author: 'Coday Design Lead',
    date: 'September 1, 2026',
    content: [
      {
        id: 'intro-ds',
        type: 'text',
        heading: 'The Consistency Trap',
        level: 'h2',
        content:
          "Every project starts clean. Then the client asks for 'just one small change'. Suddenly, you have 50 shades of blue and 12 different button radiuses.\n\nA Design System is not a UI Kit. It is a contract between Design and Code.",
      },
      {
        id: 'interactive-config',
        type: 'interactive',
        component: 'component-configurator',
        data: {},
      },
      {
        id: 'text-tokens',
        type: 'text',
        heading: 'Tokenization is Key',
        level: 'h2',
        content:
          "We don't hardcode hex values. We use semantic tokens. `bg-primary-500` means nothing. `bg-action-primary` means everything.\n\nThis allows us to rebrand an entire enterprise application in 5 minutes by changing a single JSON file.",
      },
      {
        id: 'comparison-ds',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Ad-Hoc Design',
            points: ['Inconsistent UI', 'Slow Development', 'Nightmare to Refactor'],
          },
          {
            title: 'Systematic Design',
            points: ['Pixel-Perfect Consistency', 'Rapid Prototyping', 'Automated Documentation'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-ds',
        type: 'quote',
        text: "If you can't document it, you haven't designed it.",
        author: 'Brad Frost (Atomic Design)',
        variant: 'large',
      },
    ],
  },
  {
    id: 20,
    title: 'The Future of E-Commerce: Why Your Shop is Leaking Money',
    slug: 'future-of-ecommerce-cro',
    excerpt:
      'Traffic is expensive. Conversion is cheap. We explain why a 0.5% lift in Conversion Rate is worth more than doubling your ad budget.',
    category: 'E-Commerce',
    readTime: '10 min.',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'E-Commerce Funnel Visualization',
    author: 'Coday Growth Lead',
    date: 'September 10, 2026',
    content: [
      {
        id: 'intro-cro',
        type: 'text',
        heading: 'The Traffic Trap',
        level: 'h2',
        content:
          'Most shops spend 80% of their budget on Ads and 0% on User Experience (UX). This is like pouring water into a leaking bucket.\n\nOptimizing your Conversion Rate (CRO) is the highest ROI activity you can do.',
      },
      {
        id: 'interactive-roi',
        type: 'interactive',
        component: 'roi-estimator',
        data: {},
      },
      {
        id: 'text-ux-ecom',
        type: 'text',
        heading: 'Friction Kills Sales',
        level: 'h2',
        content:
          "Every second of load time costs you 7% in conversions. Every extra form field costs you 10%. Every confusing button costs you a customer.\n\nModern E-Commerce is not about 'features'. It's about removing barriers.",
      },
      {
        id: 'comparison-cro',
        type: 'comparison',
        variant: 'versus',
        items: [
          {
            title: 'Traditional Shop',
            points: ['Generic Template', 'Slow Checkout', 'Popups everywhere'],
          },
          {
            title: 'High-Performance Shop',
            points: ['Headless & Instant', 'One-Click Checkout', 'Personalized Experience'],
            isHighlight: true,
          },
        ],
      },
      {
        id: 'quote-cro',
        type: 'quote',
        text: "Amazon didn't win because they had better products. They won because they had One-Click Buy.",
        author: 'Jeff Bezos (Legacy)',
        variant: 'gradient',
      },
    ],
  },
];
