import type { Website } from '../lib/types';
import { slugify } from '../lib/types';
import type { Tone } from '../lib/tones';

type Raw = Omit<Website, 'id'>;

const raw: Raw[] = [
  // ---------------- AI Tools ----------------
  { name: 'ChatGPT', url: 'https://chat.openai.com', description: "OpenAI's conversational AI for chat, writing and coding.", category: 'ai', tags: ['chatbot', 'ai', 'writing'], featured: true },
  { name: 'Claude', url: 'https://claude.ai', description: "Anthropic's helpful, harmless AI assistant for writing and analysis.", category: 'ai', tags: ['chatbot', 'ai', 'assistant'] },
  { name: 'Gemini', url: 'https://gemini.google.com', description: "Google's multimodal AI chatbot integrated with Search and Workspace.", category: 'ai', tags: ['chatbot', 'ai', 'google'] },
  { name: 'Perplexity', url: 'https://www.perplexity.ai', description: 'AI answer engine that cites sources for factual responses.', category: 'ai', tags: ['ai', 'search', 'research'] },
  { name: 'Grok', url: 'https://grok.com', description: "xAI's conversational AI with real-time X data access.", category: 'ai', tags: ['chatbot', 'ai'] },
  { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com', description: "Microsoft's AI assistant across Windows, Office and the web.", category: 'ai', tags: ['assistant', 'ai', 'microsoft'] },
  { name: 'DeepSeek', url: 'https://chat.deepseek.com', description: 'Open AI models and chat for reasoning and coding.', category: 'ai', tags: ['chatbot', 'ai', 'open-source'] },
  { name: 'Mistral', url: 'https://chat.mistral.ai', description: 'European AI lab offering efficient open-weight models and chat.', category: 'ai', tags: ['models', 'ai', 'europe'] },
  { name: 'Hugging Face', url: 'https://huggingface.co', description: 'The platform for open ML models, datasets and demos.', category: 'ai', tags: ['ml', 'ai', 'models'] },
  { name: 'Poe', url: 'https://poe.com', description: "Quora's hub to chat with multiple AI bots in one place.", category: 'ai', tags: ['chatbot', 'ai', 'aggregator'] },
  { name: 'Character.AI', url: 'https://character.ai', description: 'Chat with AI characters and create your own personas.', category: 'ai', tags: ['chatbot', 'ai', 'roleplay'] },
  { name: 'NotebookLM', url: 'https://notebooklm.google.com', description: "Google's AI notebook that summarizes your documents.", category: 'ai', tags: ['notes', 'ai', 'research'] },
  { name: 'Meta AI', url: 'https://www.meta.ai', description: "Meta's assistant built into Facebook, Instagram and WhatsApp.", category: 'ai', tags: ['assistant', 'ai', 'meta'] },
  { name: 'Google AI Studio', url: 'https://aistudio.google.com', description: 'Build and prototype with Gemini models in the browser.', category: 'ai', tags: ['dev', 'ai', 'gemini'] },
  { name: 'Replicate', url: 'https://replicate.com', description: 'Run and fine-tune open-source ML models via API.', category: 'ai', tags: ['ml', 'ai', 'api'] },

  // ---------------- Developer ----------------
  { name: 'GitHub', url: 'https://github.com', description: "The world's leading developer platform for code hosting, collaboration and open-source projects.", category: 'developer', tags: ['git', 'code', 'developer'], featured: true, rating: 4.8, ratingCount: '12.5k', heroTags: ['Developer', 'Git', 'Open Source', 'Collaboration', 'Code Hosting'] },
  { name: 'GitLab', url: 'https://gitlab.com', description: 'DevOps platform for source, CI/CD and security.', category: 'developer', tags: ['git', 'devops', 'developer'] },
  { name: 'Bitbucket', url: 'https://bitbucket.org', description: 'Git code hosting with built-in CI for teams.', category: 'developer', tags: ['git', 'ci', 'developer'] },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com', description: 'Q&A community for programmers.', category: 'developer', tags: ['qa', 'community', 'developer'] },
  { name: 'MDN', url: 'https://developer.mozilla.org', description: "Mozilla's reference for web standards and APIs.", category: 'developer', tags: ['docs', 'web', 'developer'] },
  { name: 'npm', url: 'https://www.npmjs.com', description: 'Package registry for JavaScript and Node.', category: 'developer', tags: ['registry', 'js', 'developer'] },
  { name: 'PyPI', url: 'https://pypi.org', description: 'The Python Package Index.', category: 'developer', tags: ['registry', 'python', 'developer'] },
  { name: 'Docker Hub', url: 'https://hub.docker.com', description: 'Find and share container images.', category: 'developer', tags: ['containers', 'docker', 'developer'] },
  { name: 'Dev.to', url: 'https://dev.to', description: 'Community publishing platform for developers.', category: 'developer', tags: ['blog', 'community', 'developer'] },
  { name: 'Hacker News', url: 'https://news.ycombinator.com', description: 'Startup and tech news from Y Combinator.', category: 'developer', tags: ['news', 'tech', 'developer'] },
  { name: 'CodePen', url: 'https://codepen.io', description: 'Online playground for HTML, CSS and JS.', category: 'developer', tags: ['playground', 'frontend', 'developer'] },
  { name: 'JSFiddle', url: 'https://jsfiddle.net', description: 'Test and share JavaScript, CSS and HTML snippets.', category: 'developer', tags: ['playground', 'snippets', 'developer'] },
  { name: 'Replit', url: 'https://replit.com', description: 'Cloud IDE to code and ship apps in the browser.', category: 'developer', tags: ['ide', 'cloud', 'developer'] },
  { name: 'CodeSandbox', url: 'https://codesandbox.io', description: 'Online IDE for rapid web development.', category: 'developer', tags: ['ide', 'frontend', 'developer'] },
  { name: 'Postman', url: 'https://www.postman.com', description: 'API platform for building and testing requests.', category: 'developer', tags: ['api', 'testing', 'developer'] },
  { name: 'Insomnia', url: 'https://insomnia.rest', description: 'REST and GraphQL API client.', category: 'developer', tags: ['api', 'graphql', 'developer'] },
  { name: 'Swagger', url: 'https://swagger.io', description: 'Design and document REST APIs with OpenAPI.', category: 'developer', tags: ['api', 'openapi', 'developer'] },
  { name: 'OpenAPI', url: 'https://www.openapis.org', description: 'Specification for describing HTTP APIs.', category: 'developer', tags: ['api', 'spec', 'developer'] },
  { name: 'Webpack', url: 'https://webpack.js.org', description: 'Module bundler for modern JavaScript apps.', category: 'developer', tags: ['build', 'js', 'developer'] },
  { name: 'Vite', url: 'https://vitejs.dev', description: 'Fast build tool and dev server for the web.', category: 'developer', tags: ['build', 'frontend', 'developer'] },
  { name: 'Node.js', url: 'https://nodejs.org', description: 'JavaScript runtime for servers and tooling.', category: 'developer', tags: ['runtime', 'js', 'developer'] },
  { name: 'Python', url: 'https://www.python.org', description: 'Popular general-purpose programming language.', category: 'developer', tags: ['language', 'python', 'developer'] },
  { name: 'Rust', url: 'https://www.rust-lang.org', description: 'Systems programming language focused on safety.', category: 'developer', tags: ['language', 'rust', 'developer'] },
  { name: 'Go', url: 'https://go.dev', description: "Google's language for simple, fast services.", category: 'developer', tags: ['language', 'go', 'developer'] },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org', description: 'Typed superset of JavaScript at scale.', category: 'developer', tags: ['language', 'ts', 'developer'] },

  // ---------------- Search ----------------
  { name: 'Google', url: 'https://www.google.com', description: "The world's most popular search engine.", category: 'search', tags: ['google', 'search'], featured: true },
  { name: 'Bing', url: 'https://www.bing.com', description: "Microsoft's search engine with AI answers.", category: 'search', tags: ['microsoft', 'search'] },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com', description: 'Privacy-first search without tracking.', category: 'search', tags: ['privacy', 'search'] },
  { name: 'Brave Search', url: 'https://search.brave.com', description: 'Independent index with privacy by default.', category: 'search', tags: ['privacy', 'brave', 'search'] },
  { name: 'Yahoo', url: 'https://www.yahoo.com', description: 'Long-running portal and search engine.', category: 'search', tags: ['portal', 'search'] },
  { name: 'Yandex', url: 'https://yandex.com', description: 'Leading search engine in Russia.', category: 'search', tags: ['russia', 'search'] },
  { name: 'Ecosia', url: 'https://www.ecosia.org', description: 'Search that plants trees from ad revenue.', category: 'search', tags: ['green', 'search'] },
  { name: 'Startpage', url: 'https://www.startpage.com', description: 'Google results with maximum privacy.', category: 'search', tags: ['privacy', 'search'] },
  { name: 'Kagi', url: 'https://kagi.com', description: 'Ad-free, user-funded search with ranking control.', category: 'search', tags: ['premium', 'search'] },
  { name: 'Mojeek', url: 'https://www.mojeek.com', description: 'Independent search with its own index.', category: 'search', tags: ['independent', 'search'] },

  // ---------------- Productivity ----------------
  { name: 'Notion', url: 'https://www.notion.so', description: 'Docs, wikis and databases in one workspace.', category: 'productivity', tags: ['notes', 'docs', 'productivity'], featured: true },
  { name: 'Google Drive', url: 'https://drive.google.com', description: 'Cloud storage and file sync.', category: 'productivity', tags: ['storage', 'google', 'productivity'] },
  { name: 'Google Docs', url: 'https://docs.google.com', description: 'Collaborative word processing.', category: 'productivity', tags: ['docs', 'google', 'productivity'] },
  { name: 'Google Sheets', url: 'https://sheets.google.com', description: 'Collaborative spreadsheets.', category: 'productivity', tags: ['sheets', 'google', 'productivity'] },
  { name: 'Google Calendar', url: 'https://calendar.google.com', description: 'Schedule and share events.', category: 'productivity', tags: ['calendar', 'google', 'productivity'] },
  { name: 'Dropbox', url: 'https://www.dropbox.com', description: 'File hosting and cloud collaboration.', category: 'productivity', tags: ['storage', 'productivity'] },
  { name: 'Trello', url: 'https://trello.com', description: 'Visual kanban boards for project management.', category: 'productivity', tags: ['kanban', 'pm', 'productivity'] },
  { name: 'Asana', url: 'https://asana.com', description: 'Work management for teams and projects.', category: 'productivity', tags: ['pm', 'teams', 'productivity'] },
  { name: 'ClickUp', url: 'https://clickup.com', description: 'One app for docs, tasks and goals.', category: 'productivity', tags: ['pm', 'tasks', 'productivity'] },
  { name: 'Todoist', url: 'https://todoist.com', description: 'Task manager for personal to-do lists.', category: 'productivity', tags: ['tasks', 'gtd', 'productivity'] },
  { name: 'Evernote', url: 'https://evernote.com', description: 'Capture notes, web clips and ideas.', category: 'productivity', tags: ['notes', 'productivity'] },
  { name: 'Airtable', url: 'https://airtable.com', description: 'Spreadsheet-database hybrid for apps.', category: 'productivity', tags: ['database', 'no-code', 'productivity'] },
  { name: 'Slack', url: 'https://slack.com', description: 'Team messaging and collaboration.', category: 'productivity', tags: ['chat', 'teams', 'productivity'] },
  { name: 'Microsoft OneDrive', url: 'https://onedrive.live.com', description: "Microsoft's cloud storage service.", category: 'productivity', tags: ['storage', 'microsoft', 'productivity'] },
  { name: 'Microsoft 365', url: 'https://www.office.com', description: 'Office apps and cloud services.', category: 'productivity', tags: ['office', 'microsoft', 'productivity'] },

  // ---------------- Design ----------------
  { name: 'Figma', url: 'https://www.figma.com', description: 'Collaborative interface design in the browser.', category: 'design', tags: ['ui', 'prototyping', 'design'], featured: true },
  { name: 'Canva', url: 'https://www.canva.com', description: 'Easy graphic design for everyone.', category: 'design', tags: ['graphics', 'templates', 'design'] },
  { name: 'Adobe', url: 'https://www.adobe.com', description: 'Creative software for design and media.', category: 'design', tags: ['creative', 'adobe', 'design'] },
  { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html', description: 'Industry-standard photo editing.', category: 'design', tags: ['photo', 'adobe', 'design'] },
  { name: 'Illustrator', url: 'https://www.adobe.com/products/illustrator.html', description: 'Vector graphics and illustration.', category: 'design', tags: ['vector', 'adobe', 'design'] },
  { name: 'Dribbble', url: 'https://dribbble.com', description: 'Showcase and discover design work.', category: 'design', tags: ['inspiration', 'community', 'design'] },
  { name: 'Behance', url: 'https://www.behance.net', description: "Adobe's network for creative portfolios.", category: 'design', tags: ['portfolio', 'community', 'design'] },
  { name: 'Unsplash', url: 'https://unsplash.com', description: 'Free high-quality photos.', category: 'design', tags: ['photos', 'free', 'design'] },
  { name: 'Pexels', url: 'https://www.pexels.com', description: 'Free stock photos and videos.', category: 'design', tags: ['photos', 'free', 'design'] },
  { name: 'Pixabay', url: 'https://pixabay.com', description: 'Free images, videos and music.', category: 'design', tags: ['photos', 'free', 'design'] },
  { name: 'Freepik', url: 'https://www.freepik.com', description: 'Free and premium graphic resources.', category: 'design', tags: ['graphics', 'resources', 'design'] },
  { name: 'Framer', url: 'https://www.framer.com', description: 'Design and ship websites without code.', category: 'design', tags: ['web', 'no-code', 'design'] },
  { name: 'Webflow', url: 'https://webflow.com', description: 'Visual development for responsive sites.', category: 'design', tags: ['web', 'no-code', 'design'] },
  { name: 'Sketch', url: 'https://www.sketch.com', description: 'Vector UI design for Mac.', category: 'design', tags: ['ui', 'mac', 'design'] },
  { name: 'Coolors', url: 'https://coolors.co', description: 'Generate and explore color palettes.', category: 'design', tags: ['color', 'tools', 'design'] },

  // ---------------- Cloud ----------------
  { name: 'AWS', url: 'https://aws.amazon.com', description: "Amazon's comprehensive cloud platform.", category: 'cloud', tags: ['aws', 'hosting', 'cloud'], featured: true },
  { name: 'Google Cloud', url: 'https://cloud.google.com', description: "Google's cloud compute and data services.", category: 'cloud', tags: ['gcp', 'google', 'cloud'] },
  { name: 'Microsoft Azure', url: 'https://azure.microsoft.com', description: "Microsoft's enterprise cloud.", category: 'cloud', tags: ['azure', 'microsoft', 'cloud'] },
  { name: 'Cloudflare', url: 'https://www.cloudflare.com', description: 'CDN, DNS and edge security.', category: 'cloud', tags: ['cdn', 'security', 'cloud'] },
  { name: 'Vercel', url: 'https://vercel.com', description: 'Frontend cloud for frameworks like Next.js.', category: 'cloud', tags: ['hosting', 'frontend', 'cloud'] },
  { name: 'Netlify', url: 'https://www.netlify.com', description: 'Build, deploy and host web projects.', category: 'cloud', tags: ['hosting', 'jamstack', 'cloud'] },
  { name: 'DigitalOcean', url: 'https://www.digitalocean.com', description: 'Simple cloud compute for developers.', category: 'cloud', tags: ['vps', 'developers', 'cloud'] },
  { name: 'Render', url: 'https://render.com', description: 'Unified cloud to build and run apps.', category: 'cloud', tags: ['hosting', 'paas', 'cloud'] },
  { name: 'Railway', url: 'https://railway.app', description: 'Infrastructure that deploys from git.', category: 'cloud', tags: ['hosting', 'paas', 'cloud'] },
  { name: 'Fly.io', url: 'https://fly.io', description: 'Run apps close to users at the edge.', category: 'cloud', tags: ['edge', 'hosting', 'cloud'] },

  // ---------------- Learning ----------------
  { name: 'Coursera', url: 'https://www.coursera.org', description: 'Online courses from universities.', category: 'learning', tags: ['courses', 'university', 'learning'] },
  { name: 'Udemy', url: 'https://www.udemy.com', description: 'Marketplace of video courses.', category: 'learning', tags: ['courses', 'video', 'learning'] },
  { name: 'edX', url: 'https://www.edx.org', description: 'University-level courses online.', category: 'learning', tags: ['courses', 'university', 'learning'] },
  { name: 'Khan Academy', url: 'https://www.khanacademy.org', description: 'Free lessons from K-12 to college.', category: 'learning', tags: ['free', 'k12', 'learning'] },
  { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: 'Learn to code for free, earn certs.', category: 'learning', tags: ['coding', 'free', 'learning'], featured: true },
  { name: 'W3Schools', url: 'https://www.w3schools.com', description: 'Tutorials for web development.', category: 'learning', tags: ['web', 'tutorials', 'learning'] },
  { name: 'Codecademy', url: 'https://www.codecademy.com', description: 'Interactive coding lessons.', category: 'learning', tags: ['coding', 'interactive', 'learning'] },
  { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu', description: 'Free MIT course materials.', category: 'learning', tags: ['university', 'free', 'learning'] },
  { name: 'Stanford Online', url: 'https://online.stanford.edu', description: 'Courses and certificates from Stanford.', category: 'learning', tags: ['university', 'learning'] },
  { name: 'Harvard Online', url: 'https://online.harvard.edu', description: 'Online learning from Harvard.', category: 'learning', tags: ['university', 'learning'] },
  { name: 'MDN Learning', url: 'https://developer.mozilla.org/en-US/docs/Learn', description: 'Structured web development tutorials.', category: 'learning', tags: ['web', 'mdn', 'learning'] },
  { name: 'Pluralsight', url: 'https://www.pluralsight.com', description: 'Tech skills for professionals.', category: 'learning', tags: ['tech', 'courses', 'learning'] },
  { name: 'Brilliant', url: 'https://brilliant.org', description: 'Interactive math and science.', category: 'learning', tags: ['math', 'science', 'learning'] },
  { name: 'DataCamp', url: 'https://www.datacamp.com', description: 'Learn data science and AI online.', category: 'learning', tags: ['data', 'ai', 'learning'] },
  { name: 'LeetCode', url: 'https://leetcode.com', description: 'Practice coding interview problems.', category: 'learning', tags: ['coding', 'interview', 'learning'] },

  // ---------------- Business ----------------
  { name: 'LinkedIn', url: 'https://www.linkedin.com', description: 'Professional network and job platform.', category: 'business', tags: ['jobs', 'network', 'business'], featured: true },
  { name: 'Indeed', url: 'https://www.indeed.com', description: 'Job search engine.', category: 'business', tags: ['jobs', 'hiring', 'business'] },
  { name: 'Glassdoor', url: 'https://www.glassdoor.com', description: 'Company reviews and salaries.', category: 'business', tags: ['jobs', 'reviews', 'business'] },
  { name: 'Crunchbase', url: 'https://www.crunchbase.com', description: 'Company and funding intelligence.', category: 'business', tags: ['startups', 'data', 'business'] },
  { name: 'Shopify', url: 'https://www.shopify.com', description: 'E-commerce platform to sell online.', category: 'business', tags: ['ecommerce', 'stores', 'business'] },
  { name: 'Stripe', url: 'https://stripe.com', description: 'Payments infrastructure for the internet.', category: 'business', tags: ['payments', 'api', 'business'] },
  { name: 'PayPal', url: 'https://www.paypal.com', description: 'Online payments and money transfers.', category: 'business', tags: ['payments', 'money', 'business'] },
  { name: 'HubSpot', url: 'https://www.hubspot.com', description: 'CRM, marketing and sales software.', category: 'business', tags: ['crm', 'marketing', 'business'] },
  { name: 'Salesforce', url: 'https://www.salesforce.com', description: 'Cloud CRM for customer success.', category: 'business', tags: ['crm', 'enterprise', 'business'] },
  { name: 'Mailchimp', url: 'https://mailchimp.com', description: 'Email marketing and automation.', category: 'business', tags: ['email', 'marketing', 'business'] },

  // ---------------- Finance ----------------
  { name: 'Yahoo Finance', url: 'https://finance.yahoo.com', description: 'Markets, quotes and financial news.', category: 'finance', tags: ['stocks', 'news', 'finance'] },
  { name: 'Google Finance', url: 'https://www.google.com/finance', description: 'Track markets and portfolios.', category: 'finance', tags: ['stocks', 'google', 'finance'] },
  { name: 'Investing.com', url: 'https://www.investing.com', description: 'Global financial markets data.', category: 'finance', tags: ['markets', 'data', 'finance'] },
  { name: 'TradingView', url: 'https://www.tradingview.com', description: 'Charting and social trading.', category: 'finance', tags: ['charts', 'trading', 'finance'], featured: true },
  { name: 'Nasdaq', url: 'https://www.nasdaq.com', description: 'Exchange data and market insights.', category: 'finance', tags: ['stocks', 'exchange', 'finance'] },
  { name: 'NYSE', url: 'https://www.nyse.com', description: 'New York Stock Exchange.', category: 'finance', tags: ['stocks', 'exchange', 'finance'] },
  { name: 'Bloomberg', url: 'https://www.bloomberg.com', description: 'Financial news and terminal data.', category: 'finance', tags: ['news', 'markets', 'finance'] },
  { name: 'Reuters', url: 'https://www.reuters.com', description: 'Global news and financial reporting.', category: 'finance', tags: ['news', 'markets', 'finance'] },
  { name: 'MarketWatch', url: 'https://www.marketwatch.com', description: 'Market news and personal finance.', category: 'finance', tags: ['news', 'markets', 'finance'] },
  { name: 'Morningstar', url: 'https://www.morningstar.com', description: 'Investment research and ratings.', category: 'finance', tags: ['research', 'funds', 'finance'] },

  // ---------------- Social ----------------
  { name: 'Reddit', url: 'https://www.reddit.com', description: 'Communities and discussion on everything.', category: 'social', tags: ['community', 'forum', 'social'] },
  { name: 'X', url: 'https://x.com', description: 'Real-time microblogging and news.', category: 'social', tags: ['microblog', 'news', 'social'] },
  { name: 'Facebook', url: 'https://www.facebook.com', description: 'Connect with friends and communities.', category: 'social', tags: ['network', 'friends', 'social'] },
  { name: 'Instagram', url: 'https://www.instagram.com', description: 'Photo and video sharing.', category: 'social', tags: ['photos', 'video', 'social'] },
  { name: 'Threads', url: 'https://www.threads.net', description: 'Text-based conversations from Meta.', category: 'social', tags: ['microblog', 'meta', 'social'] },
  { name: 'TikTok', url: 'https://www.tiktok.com', description: 'Short-form video platform.', category: 'social', tags: ['video', 'creators', 'social'] },
  { name: 'LinkedIn Social', url: 'https://www.linkedin.com', description: 'Professional network and job platform.', category: 'social', tags: ['network', 'jobs', 'social'] },
  { name: 'Pinterest', url: 'https://www.pinterest.com', description: 'Visual discovery and idea boards.', category: 'social', tags: ['inspiration', 'visual', 'social'] },
  { name: 'Discord', url: 'https://discord.com', description: 'Voice, video and community chat.', category: 'social', tags: ['chat', 'community', 'social'] },
  { name: 'Telegram Web', url: 'https://web.telegram.org', description: 'Encrypted cloud messaging in the browser.', category: 'social', tags: ['messaging', 'privacy', 'social'] },

  // ---------------- Media ----------------
  { name: 'YouTube', url: 'https://www.youtube.com', description: "The world's largest video platform.", category: 'media', tags: ['video', 'streaming', 'media'], featured: true },
  { name: 'Twitch', url: 'https://www.twitch.tv', description: 'Live streaming for gaming and more.', category: 'media', tags: ['live', 'gaming', 'media'] },
  { name: 'Vimeo', url: 'https://vimeo.com', description: 'High-quality video hosting.', category: 'media', tags: ['video', 'hosting', 'media'] },
  { name: 'Spotify', url: 'https://www.spotify.com', description: 'Music and podcast streaming.', category: 'media', tags: ['music', 'podcasts', 'media'] },
  { name: 'SoundCloud', url: 'https://soundcloud.com', description: 'Audio sharing for creators.', category: 'media', tags: ['music', 'audio', 'media'] },
  { name: 'IMDb', url: 'https://www.imdb.com', description: 'Movies, TV and celebrity database.', category: 'media', tags: ['movies', 'database', 'media'] },
  { name: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com', description: 'Film and TV ratings and reviews.', category: 'media', tags: ['movies', 'ratings', 'media'] },
  { name: 'Letterboxd', url: 'https://letterboxd.com', description: 'Track and review the films you watch.', category: 'media', tags: ['movies', 'social', 'media'] },
  { name: 'Goodreads', url: 'https://www.goodreads.com', description: 'Book recommendations and reviews.', category: 'media', tags: ['books', 'reading', 'media'] },
  { name: 'Internet Archive', url: 'https://archive.org', description: 'Free books, media and the Wayback Machine.', category: 'media', tags: ['archive', 'free', 'media'] },

  // ---------------- Shopping ----------------
  { name: 'Amazon', url: 'https://www.amazon.com', description: "The world's largest online marketplace.", category: 'shopping', tags: ['marketplace', 'retail', 'shopping'], featured: true },
  { name: 'eBay', url: 'https://www.ebay.com', description: 'Auctions and new/used goods.', category: 'shopping', tags: ['auction', 'marketplace', 'shopping'] },
  { name: 'Etsy', url: 'https://www.etsy.com', description: 'Handmade and vintage goods.', category: 'shopping', tags: ['handmade', 'crafts', 'shopping'] },
  { name: 'Walmart', url: 'https://www.walmart.com', description: 'Everyday low prices, online and in store.', category: 'shopping', tags: ['retail', 'groceries', 'shopping'] },
  { name: 'Target', url: 'https://www.target.com', description: 'Style, home and essentials.', category: 'shopping', tags: ['retail', 'home', 'shopping'] },
  { name: 'Best Buy', url: 'https://www.bestbuy.com', description: 'Electronics and appliances.', category: 'shopping', tags: ['electronics', 'retail', 'shopping'] },
  { name: 'AliExpress', url: 'https://www.aliexpress.com', description: 'Global marketplace from China.', category: 'shopping', tags: ['marketplace', 'global', 'shopping'] },
  { name: 'IKEA', url: 'https://www.ikea.com', description: 'Furniture and home furnishings.', category: 'shopping', tags: ['home', 'furniture', 'shopping'] },
  { name: 'Costco', url: 'https://www.costco.com', description: 'Warehouse club for bulk savings.', category: 'shopping', tags: ['wholesale', 'retail', 'shopping'] },
  { name: 'Newegg', url: 'https://www.newegg.com', description: 'PC parts and electronics.', category: 'shopping', tags: ['electronics', 'pc', 'shopping'] },

  // ---------------- Travel ----------------
  { name: 'Google Maps', url: 'https://maps.google.com', description: 'Maps, directions and local search.', category: 'travel', tags: ['maps', 'navigation', 'travel'], featured: true },
  { name: 'Google Flights', url: 'https://www.google.com/travel/flights', description: 'Search and track flights.', category: 'travel', tags: ['flights', 'google', 'travel'] },
  { name: 'Booking.com', url: 'https://www.booking.com', description: 'Hotels, homes and vacation rentals.', category: 'travel', tags: ['hotels', 'booking', 'travel'] },
  { name: 'Airbnb', url: 'https://www.airbnb.com', description: 'Unique stays and experiences.', category: 'travel', tags: ['stays', 'rentals', 'travel'] },
  { name: 'TripAdvisor', url: 'https://www.tripadvisor.com', description: 'Reviews and bookings for travel.', category: 'travel', tags: ['reviews', 'booking', 'travel'] },
  { name: 'Expedia', url: 'https://www.expedia.com', description: 'Flights, hotels and vacation packages.', category: 'travel', tags: ['flights', 'packages', 'travel'] },
  { name: 'Kayak', url: 'https://www.kayak.com', description: 'Travel search across sites.', category: 'travel', tags: ['flights', 'metasearch', 'travel'] },
  { name: 'Skyscanner', url: 'https://www.skyscanner.com', description: 'Find the cheapest flights.', category: 'travel', tags: ['flights', 'metasearch', 'travel'] },
  { name: 'Rome2Rio', url: 'https://www.rome2rio.com', description: 'Discover how to travel anywhere.', category: 'travel', tags: ['routes', 'planning', 'travel'] },
  { name: 'Tripadvisor Flights', url: 'https://www.tripadvisor.com/Flights', description: 'Compare and book flights.', category: 'travel', tags: ['flights', 'booking', 'travel'] },

  // ---------------- Health ----------------
  { name: 'WebMD', url: 'https://www.webmd.com', description: 'Health news and symptom checker.', category: 'health', tags: ['medical', 'reference', 'health'] },
  { name: 'Mayo Clinic', url: 'https://www.mayoclinic.org', description: 'Trusted medical information.', category: 'health', tags: ['medical', 'reference', 'health'], featured: true },
  { name: 'Cleveland Clinic', url: 'https://my.clevelandclinic.org', description: 'Health library and care.', category: 'health', tags: ['medical', 'reference', 'health'] },
  { name: 'MedlinePlus', url: 'https://medlineplus.gov', description: 'U.S. National Library of Medicine.', category: 'health', tags: ['medical', 'gov', 'health'] },
  { name: 'NHS', url: 'https://www.nhs.uk', description: "UK's health service information.", category: 'health', tags: ['medical', 'gov', 'health'] },
  { name: 'Healthline', url: 'https://www.healthline.com', description: 'Evidence-based health and wellness.', category: 'health', tags: ['wellness', 'nutrition', 'health'] },
  { name: 'Johns Hopkins Medicine', url: 'https://www.hopkinsmedicine.org', description: 'Research and clinical care.', category: 'health', tags: ['medical', 'research', 'health'] },
  { name: 'CDC', url: 'https://www.cdc.gov', description: 'U.S. disease control and prevention.', category: 'health', tags: ['medical', 'gov', 'health'] },
  { name: 'WHO', url: 'https://www.who.int', description: 'World Health Organization.', category: 'health', tags: ['medical', 'global', 'health'] },
  { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Biomedical literature database.', category: 'health', tags: ['research', 'database', 'health'] },

  // ---------------- Entertainment ----------------
  { name: 'Netflix', url: 'https://www.netflix.com', description: 'Stream movies and series.', category: 'entertainment', tags: ['streaming', 'movies', 'entertainment'], featured: true },
  { name: 'Disney+', url: 'https://www.disneyplus.com', description: 'Disney, Marvel, Star Wars and more.', category: 'entertainment', tags: ['streaming', 'disney', 'entertainment'] },
  { name: 'Prime Video', url: 'https://www.primevideo.com', description: "Amazon's movie and series catalog.", category: 'entertainment', tags: ['streaming', 'amazon', 'entertainment'] },
  { name: 'Hulu', url: 'https://www.hulu.com', description: 'TV, movies and live TV.', category: 'entertainment', tags: ['streaming', 'tv', 'entertainment'] },
  { name: 'Max', url: 'https://www.max.com', description: 'HBO, Warner and Discovery content.', category: 'entertainment', tags: ['streaming', 'hbo', 'entertainment'] },
  { name: 'Crunchyroll', url: 'https://www.crunchyroll.com', description: 'Anime streaming.', category: 'entertainment', tags: ['streaming', 'anime', 'entertainment'] },
  { name: 'YouTube TV', url: 'https://tv.youtube.com', description: 'Live TV over the internet.', category: 'entertainment', tags: ['live', 'tv', 'entertainment'] },
  { name: 'Peacock', url: 'https://www.peacocktv.com', description: 'NBCUniversal streaming.', category: 'entertainment', tags: ['streaming', 'nbc', 'entertainment'] },
  { name: 'Paramount+', url: 'https://www.paramountplus.com', description: 'Paramount films and shows.', category: 'entertainment', tags: ['streaming', 'paramount', 'entertainment'] },
  { name: 'Apple TV+', url: 'https://www.apple.com/apple-tv-plus', description: "Apple's original series and films.", category: 'entertainment', tags: ['streaming', 'apple', 'entertainment'] },

  // ---------------- Games ----------------
  { name: 'Steam', url: 'https://store.steampowered.com', description: 'PC game store and community.', category: 'games', tags: ['pc', 'store', 'games'], featured: true },
  { name: 'Epic Games Store', url: 'https://store.epicgames.com', description: 'Free games and PC store.', category: 'games', tags: ['pc', 'store', 'games'] },
  { name: 'itch.io', url: 'https://itch.io', description: 'Indie games and assets.', category: 'games', tags: ['indie', 'store', 'games'] },
  { name: 'GOG', url: 'https://www.gog.com', description: 'DRM-free classic and indie games.', category: 'games', tags: ['pc', 'drm-free', 'games'] },
  { name: 'Poki', url: 'https://poki.com', description: 'Free browser games.', category: 'games', tags: ['browser', 'free', 'games'] },
];

const seen = new Set<string>();
export const websites: Website[] = raw.map((w) => {
  let id = slugify(w.name);
  if (seen.has(id)) id = `${id}-${w.category}`;
  seen.add(id);
  return { id, ...w };
});

export function getWebsitesByCategory(category: string): Website[] {
  return websites.filter((w) => w.category === category);
}

export function getFeaturedWebsites(): Website[] {
  return websites.filter((w) => w.featured);
}

export const websiteCategoryMeta: Record<string, { icon: string; tone: Tone }> = {
  ai: { icon: 'brain-circuit', tone: 'violet' },
  developer: { icon: 'code-2', tone: 'indigo' },
  search: { icon: 'search', tone: 'cyan' },
  productivity: { icon: 'list-checks', tone: 'emerald' },
  design: { icon: 'pen-tool', tone: 'pink' },
  cloud: { icon: 'cloud', tone: 'sky' },
  learning: { icon: 'book-open', tone: 'amber' },
  business: { icon: 'building-2', tone: 'blue' },
  finance: { icon: 'bar-chart-2', tone: 'amber' },
  social: { icon: 'users', tone: 'rose' },
  media: { icon: 'play', tone: 'red' },
  shopping: { icon: 'shopping-bag', tone: 'orange' },
  travel: { icon: 'plane', tone: 'teal' },
  health: { icon: 'heart', tone: 'green' },
  entertainment: { icon: 'clapperboard', tone: 'purple' },
  games: { icon: 'gamepad-2', tone: 'violet' },
};

export function getRelatedWebsites(site: Website, limit = 8): Website[] {
  return getWebsitesByCategory(site.category)
    .filter((w) => w.id !== site.id)
    .slice(0, limit);
}

export function getWebsiteTypeLabel(categorySlug: string): string {
  const map: Record<string, string> = {
    ai: 'AI Service',
    developer: 'Developer Platform',
    search: 'Search Engine',
    productivity: 'Productivity Tool',
    design: 'Design Tool',
    cloud: 'Cloud Service',
    learning: 'Learning Platform',
    business: 'Business Service',
    finance: 'Finance Service',
    social: 'Social Network',
    media: 'Media Platform',
    shopping: 'Shopping Site',
    travel: 'Travel Service',
    health: 'Health Resource',
    entertainment: 'Entertainment Service',
    games: 'Game Platform',
  };
  return map[categorySlug] ?? 'Website';
}
