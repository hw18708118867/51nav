import type { Tone } from '../lib/tones';
import type { ToolItem, ToolSource } from '../lib/types';

// Tool data aggregated from 51NAV tool sites:
//   - https://toolhub.51nav.com   (DevTools Hub)
//   - https://devtools.51nav.com (Everyday Dev Tools)
//   - https://toolbox.51nav.com  (Multi-purpose Toolbox)
//   - https://moneytools.51nav.com (Everyday Money Tools)
//   - https://healthcalchub.51nav.com (HealthCalcHub)
//   - https://games.51nav.com (Brain Games Hub)
// Each entry links directly to the live tool on its source site.
// URLs use the exact slugs scraped from each site's HTML.

const TOOLHUB_BASE = 'https://toolhub.51nav.com/tools/';
const DEVTOOLS_BASE = 'https://devtools.51nav.com/';

// Per-category icon + accent tone (color only on the icon chip).
export const categoryMeta: Record<string, { icon: string; tone: Tone }> = {
  Encoding: { icon: 'binary', tone: 'violet' },
  Generators: { icon: 'sparkles', tone: 'amber' },
  'Colors & Design': { icon: 'palette', tone: 'pink' },
  'Data Converters': { icon: 'refresh-cw', tone: 'blue' },
  Development: { icon: 'code-2', tone: 'indigo' },
  'Text Tools': { icon: 'type', tone: 'emerald' },
  Network: { icon: 'globe', tone: 'cyan' },
  'Image Tools': { icon: 'image', tone: 'rose' },
  Security: { icon: 'shield', tone: 'red' },
  Formatters: { icon: 'braces', tone: 'teal' },
  Calculators: { icon: 'calculator', tone: 'green' },
  'SEO Tools': { icon: 'search', tone: 'orange' },
  'Date & Time': { icon: 'clock', tone: 'lime' },
  Encryption: { icon: 'lock', tone: 'purple' },
  Hashing: { icon: 'hash', tone: 'fuchsia' },
  'Document Conversion': { icon: 'file-text', tone: 'sky' },
  JavaScript: { icon: 'file-code', tone: 'yellow' },
  Math: { icon: 'calculator', tone: 'green' },
  'Data Analysis': { icon: 'bar-chart', tone: 'teal' },
  Web3: { icon: 'bitcoin', tone: 'orange' },
  Finance: { icon: 'landmark', tone: 'amber' },
  Health: { icon: 'heart', tone: 'rose' },
  Games: { icon: 'gamepad-2', tone: 'violet' },
};

// Maps a devtools.51nav.com category to the equivalent canonical category.
// Categories that already exist are fused; only genuinely new ones are added.
const devtoolsCategoryMap: Record<string, string> = {
  JSON: 'Data Converters',
  JWT: 'Development',
  Encode: 'Encoding',
  API: 'Network',
  Regex: 'Development',
  Color: 'Colors & Design',
  CSS: 'Formatters',
  Date: 'Date & Time',
  Crypto: 'Security',
};

// Source badge styling for cards.
export const sourceMeta: Record<ToolSource, { label: string; badge: string }> = {
  toolhub: { label: 'Toolhub', badge: 'bg-sky-500/15 text-sky-300' },
  devtools: { label: 'DevTools', badge: 'bg-emerald-500/15 text-emerald-300' },
  toolbox: { label: 'Toolbox', badge: 'bg-orange-500/15 text-orange-300' },
  finance: { label: 'MoneyTools', badge: 'bg-amber-500/15 text-amber-300' },
  health: { label: 'HealthCalc', badge: 'bg-rose-500/15 text-rose-300' },
  games: { label: 'BrainGames', badge: 'bg-violet-500/15 text-violet-300' },
};

// ---------------------------------------------------------------------------
// Per-tool icons. Instead of every tool in a category sharing one glyph, each
// tool gets a characteristic icon resolved from its name. Rules are tested in
// order; the category icon is the final fallback so nothing renders blank.
// The category's tone (color) is still applied to the icon chip, keeping the
// visual grouping by category while the glyphs vary per tool.
// ---------------------------------------------------------------------------
const iconRules: [RegExp, string][] = [
  // --- Finance (moneytools) ---
  [/401|roth|ira|retirement/, 'piggy-bank'],
  [/dividend/, 'coins'],
  [/inflation/, 'trending-down'],
  [/cagr|compound|investment.?growth/, 'trending-up'],
  [/apy|apr|roi|capital.?gains|tax/, 'percent'],
  [/paycheck|salary/, 'banknote'],
  [/social.?security/, 'shield'],
  [/health.?insurance/, 'heart'],
  [/life.?insurance/, 'heart-handshake'],
  [/rental.?property/, 'building'],
  [/rent.?vs.?buy/, 'scale'],
  [/net.?worth|debt.?to.?income|dti/, 'scale'],
  [/amortization/, 'calendar'],
  [/rmd/, 'calendar'],
  [/due.?date/, 'calendar-heart'],
  [/savings.?goal/, 'target'],
  [/emergency/, 'life-buoy'],
  [/down.?payment/, 'home'],
  [/mortgage|home.?afford/, 'house'],
  [/refinance/, 'refresh-cw'],
  [/pmi/, 'shield'],
  [/student.?loan/, 'graduation-cap'],
  [/auto.?loan|car.?afford/, 'car'],
  [/debt|credit.?card|loan/, 'credit-card'],
  [/budget/, 'wallet'],
  [/50.?30.?20/, 'pie-chart'],
  [/cd.?calc|certificate/, 'banknote'],

  // --- Health (healthcalchub) ---
  [/bac/, 'wine'],
  [/blood.?pressure/, 'activity'],
  [/bmi/, 'scale'],
  [/bmr|tdee|calorie|carb/, 'flame'],
  [/body.?fat|fat.?intake/, 'droplet'],
  [/fiber/, 'leaf'],
  [/heart.?rate/, 'heart-pulse'],
  [/ideal.?weight|lean.?body/, 'scale'],
  [/macro|meal/, 'utensils'],
  [/protein/, 'dumbbell'],
  [/ovulation|pregnancy/, 'calendar'],
  [/sleep/, 'moon'],
  [/water/, 'droplet'],

  // --- Games (games.51nav) ---
  [/iq|puzzle/, 'puzzle'],
  [/memory/, 'brain'],
  [/minesweep/, 'bomb'],
  [/sudoku/, 'grid-3x3'],
  [/reaction/, 'timer'],
  [/typing/, 'keyboard'],
  [/color.?test/, 'palette'],

  // --- IDs & generators ---
  [/uuid|nano.?id|ulid/, 'id-card'],
  [/slug/, 'link'],
  [/qr/, 'qr-code'],
  [/barcode/, 'barcode'],
  [/lorem/, 'align-left'],
  [/password/, 'key-round'],
  [/random/, 'shuffle'],
  [/fake|mock/, 'database'],

  // --- Encoding / crypto ---
  [/base64|base32|base58|base85/, 'binary'],
  [/morse/, 'radio'],
  [/rot13|caesar|tap|braille|aaencode/, 'code'],
  [/quoted.?printable|shell.?escape/, 'terminal'],
  [/url|uri|punycode|domain/, 'link'],
  [/html.?entit|html.?encode/, 'code'],
  [/unicode|utf|ascii|octal|hex|charset/, 'file-code'],
  [/jwt/, 'key-round'],
  [/hmac|hash|md5|sha|crc|scrypt|argon/, 'hash'],
  [/aes|des|3des|rsa|rc4|sm4|sm2|chacha20|blowfish/, 'lock'],
  [/bcrypt/, 'lock'],
  [/keygen|rsa.?key/, 'key-round'],
  [/totp|hotp/, 'timer'],
  [/ssl|csp|csrf/, 'shield'],
  [/breach/, 'shield-alert'],
  [/xss|sql.?inject/, 'bug'],
  [/cert/, 'file-check'],
  [/steganograph/, 'eye'],

  // --- Network ---
  [/whois/, 'search'],
  [/dns/, 'server'],
  [/ip.?lookup|my.?ip|ip.?addr/, 'globe'],
  [/query.?string|url.?pars/, 'link'],
  [/http.?header|http.?status|webhook/, 'server'],
  [/curl/, 'terminal'],
  [/websocket/, 'plug'],
  [/subnet|cidr|mac.?lookup/, 'network'],
  [/port/, 'plug'],
  [/user.?agent/, 'monitor'],
  [/ping/, 'activity'],
  [/seo/, 'search'],
  [/robots|sitemap/, 'file-text'],

  // --- Data converters ---
  [/json/, 'braces'],
  [/csv/, 'table'],
  [/yaml|xml|toml/, 'file-code'],
  [/tree.?viewer/, 'list-tree'],
  [/diff|compare/, 'git-compare'],
  [/timestamp|epoch/, 'clock'],
  [/timezone/, 'globe'],
  [/number.?base|radix/, 'hash'],
  [/escape|unescape/, 'code'],
  [/sort/, 'list-ordered'],
  [/flatten/, 'minimize-2'],
  [/word.?count/, 'type'],
  [/character.?count|char.?count/, 'hash'],
  [/line.?count/, 'list'],

  // --- Text ---
  [/dedupe|dedup/, 'copy'],
  [/remove.?empty/, 'eraser'],
  [/shuffle/, 'shuffle'],
  [/reverse/, 'arrow-left-right'],
  [/markdown/, 'file-text'],
  [/string.?escap/, 'code'],
  [/extract/, 'search'],
  [/split|join/, 'columns-2'],
  [/pad/, 'align-left'],
  [/wrap/, 'wrap-text'],
  [/prefix|suffix/, 'list-plus'],
  [/trim/, 'scissors'],
  [/replace/, 'replace'],
  [/chinese/, 'languages'],

  // --- Color & design ---
  [/gradient/, 'rainbow'],
  [/contrast/, 'contrast'],
  [/palette/, 'palette'],
  [/color.?pick/, 'pipette'],
  [/flexbox/, 'columns'],
  [/grid/, 'grid'],
  [/box.?shadow/, 'box'],
  [/border.?radius/, 'square'],
  [/tailwind/, 'palette'],
  [/color.?convert/, 'droplet'],

  // --- Image ---
  [/svg/, 'shapes'],
  [/image.?compress/, 'image'],
  [/crop/, 'crop'],
  [/resize/, 'maximize'],
  [/watermark/, 'droplet'],
  [/favicon|ico/, 'image'],
  [/format.?convert/, 'refresh-cw'],
  [/exif/, 'info'],

  // --- Dev / misc ---
  [/sql/, 'database'],
  [/chmod/, 'terminal'],
  [/llm.?token/, 'cpu'],
  [/prompt/, 'message-square'],
  [/regex/, 'code'],
  [/html.?preview/, 'monitor'],
  [/cron/, 'clock'],
  [/cheat.?sheet/, 'book'],
  [/unit.?convert/, 'ruler'],
  [/ascii|unicode.?table/, 'table'],
  [/html.?color/, 'palette'],
];

function resolveIcon(name: string, fallback: string): string {
  const n = name.toLowerCase();
  for (const [re, icon] of iconRules) {
    if (re.test(n)) return icon;
  }
  if (n.endsWith('calculator')) return 'calculator';
  if (n.includes('converter')) return 'refresh-cw';
  if (n.includes('generator')) return 'sparkles';
  if (n.includes('formatter')) return 'wand';
  if (n.includes('validator')) return 'circle-check';
  if (n.includes('viewer')) return 'eye';
  return fallback;
}

function makeTool(
  name: string,
  description: string,
  category: string,
  url: string,
  source: ToolSource
): ToolItem {
  const meta = categoryMeta[category] ?? { icon: 'wrench', tone: 'slate' as Tone };
  return { name, description, category, url, icon: resolveIcon(name, meta.icon), tone: meta.tone, source };
}

// [slug, name, description, category] — toolhub.51nav.com
const toolhubRaw: [string, string, string, string][] = [
  // Encoding
  ['base64-converter', 'Base64 Converter', 'Encode and decode Base64 strings online.', 'Encoding'],
  ['url-encode', 'URL Encode / Decode', 'URL encode and decode text.', 'Encoding'],
  ['html-entities', 'HTML Entities', 'HTML entity encode and decode.', 'Encoding'],
  ['unicode-converter', 'Unicode Converter', 'Encode and decode Unicode escape sequences.', 'Encoding'],
  ['hex-converter', 'Hex Converter', 'Convert text to and from hexadecimal.', 'Encoding'],
  ['binary-converter', 'Binary Converter', 'Convert text to and from binary.', 'Encoding'],
  ['ascii-converter', 'ASCII Converter', 'Convert text to and from ASCII codes.', 'Encoding'],
  ['utf8-converter', 'UTF-8 Converter', 'Encode and decode UTF-8 byte sequences.', 'Encoding'],
  ['rot13', 'ROT13 Cipher', 'Encode and decode text with the ROT13 cipher.', 'Encoding'],
  ['shell-escape', 'Shell Escape', 'Escape strings for bash, shell and the command line.', 'Encoding'],
  ['morse-code', 'Morse Code', 'Convert text to and from Morse code.', 'Encoding'],

  // Generators
  ['uuid-generator', 'UUID Generator', 'Generate UUID v4 identifiers.', 'Generators'],
  ['qr-code', 'QR Code Generator', 'Generate QR codes instantly.', 'Generators'],
  ['lorem-ipsum', 'Lorem Ipsum', 'Generate placeholder text.', 'Generators'],
  ['password-generator', 'Password Generator', 'Create secure random passwords.', 'Generators'],
  ['nano-id', 'Nano ID Generator', 'Generate compact unique IDs.', 'Generators'],
  ['slug-generator', 'Slug Generator', 'Create URL-friendly slugs.', 'Generators'],
  ['random-string', 'Random String Generator', 'Generate random alphanumeric strings.', 'Generators'],

  // Colors & Design
  ['color-picker', 'Color Picker', 'HEX/RGB/HSL color picker.', 'Colors & Design'],
  ['css-gradient', 'CSS Gradient', 'Create gradient CSS backgrounds.', 'Colors & Design'],
  ['color-contrast', 'Color Contrast Checker', 'Check WCAG contrast ratios.', 'Colors & Design'],
  ['color-palette', 'Color Palette Generator', 'Generate harmonious color palettes.', 'Colors & Design'],
  ['flexbox-generator', 'Flexbox Generator', 'Visual CSS flexbox layout generator.', 'Colors & Design'],
  ['grid-generator', 'CSS Grid Generator', 'Visual CSS grid layout generator.', 'Colors & Design'],
  ['box-shadow-generator', 'Box Shadow Generator', 'Generate CSS box-shadow styles visually.', 'Colors & Design'],
  ['border-radius-generator', 'Border Radius Generator', 'Generate CSS border-radius styles visually.', 'Colors & Design'],
  ['color-converter', 'Color Converter', 'Convert colors between HEX, RGB, HSL and CMYK.', 'Colors & Design'],
  ['tailwind-color-generator', 'Tailwind Color Generator', 'Generate Tailwind CSS color palette configs.', 'Colors & Design'],

  // Data Converters
  ['json-formatter', 'JSON Formatter', 'Format, validate and minify JSON.', 'Data Converters'],
  ['json-schema-generator', 'JSON Schema Generator', 'Generate JSON Schema from JSON data.', 'Data Converters'],
  ['json-to-code', 'JSON to Code', 'Convert JSON to TypeScript, Go, Rust, Kotlin, Dart.', 'Data Converters'],
  ['mock-data-generator', 'Mock Data Generator', 'Generate fake JSON data, mocks and fixtures.', 'Data Converters'],
  ['timestamp', 'Timestamp Converter', 'Convert between Unix time and human dates.', 'Data Converters'],
  ['hash-generator', 'Hash Generator', 'Generate MD5, SHA-1, SHA-256 and SHA-512 hashes.', 'Data Converters'],
  ['number-base', 'Number Base Converter', 'Convert between decimal, hex, binary and octal.', 'Data Converters'],
  ['timezone-converter', 'Timezone Converter', 'Convert time between different timezones.', 'Data Converters'],
  ['json-yaml', 'JSON ↔ YAML', 'Convert JSON to and from YAML.', 'Data Converters'],
  ['csv-to-json', 'CSV to JSON', 'Convert CSV data to JSON.', 'Data Converters'],
  ['json-compare', 'JSON Compare', 'Compare and diff two JSON objects.', 'Data Converters'],
  ['json-escape', 'JSON Escape', 'Escape and unescape JSON strings.', 'Data Converters'],
  ['json-sort', 'JSON Sort', 'Sort JSON object keys alphabetically.', 'Data Converters'],
  ['json-to-csv', 'JSON to CSV', 'Convert a JSON array to CSV format.', 'Data Converters'],
  ['json-flatten', 'JSON Flatten', 'Flatten nested JSON to dot-notation keys.', 'Data Converters'],
  ['json-xml', 'JSON ↔ XML', 'Convert between JSON and XML formats.', 'Data Converters'],
  ['json-to-toml', 'JSON to TOML', 'Convert JSON to TOML config format.', 'Data Converters'],
  ['json-tree-viewer', 'JSON Tree Viewer', 'Visualize JSON structure as a tree.', 'Data Converters'],

  // Development
  ['html-preview', 'HTML Preview', 'Preview HTML code in real time.', 'Development'],
  ['chmod-calculator', 'Chmod Calculator', 'Calculate Unix file permissions and chmod values.', 'Development'],
  ['llm-token-counter', 'LLM Token Counter', 'Count tokens for OpenAI, Claude and Gemini models.', 'Development'],
  ['prompt-tools', 'Prompt Tools', 'Format and optimize LLM prompts.', 'Development'],
  ['jwt-decoder', 'JWT Decoder', 'Decode JSON Web Tokens.', 'Development'],
  ['jwt-encoder', 'JWT Encoder', 'Create and sign JSON Web Tokens.', 'Development'],
  ['jwt-inspector', 'JWT Inspector', 'Inspect JWT claims, expiry and structure.', 'Development'],
  ['regex-tester', 'Regex Tester', 'Test regular expressions.', 'Development'],
  ['diff-checker', 'Diff Checker', 'Compare text differences.', 'Development'],
  ['sql-formatter', 'SQL Formatter', 'Format SQL queries.', 'Development'],
  ['sql-validator', 'SQL Validator', 'Validate SQL syntax and find errors.', 'Development'],
  ['url-parser', 'URL Parser', 'Parse URL components.', 'Development'],
  ['http-status', 'HTTP Status Codes', 'HTTP status code reference.', 'Development'],
  ['cron-parser', 'Cron Expression Parser', 'Parse cron schedule expressions.', 'Development'],
  ['cron-generator', 'Cron Expression Generator', 'Build cron schedule expressions visually.', 'Development'],
  ['regex-cheat-sheet', 'Regex Cheat Sheet', 'Quick reference for regex syntax and patterns.', 'Development'],
  ['regex-generator', 'Regex Generator', 'Generate regex patterns from descriptions.', 'Development'],

  // Text Tools
  ['string-escaper', 'String Escaper', 'Escape and unescape strings.', 'Text Tools'],
  ['text-case', 'Text Case', 'Convert text to UPPER, lower or CamelCase.', 'Text Tools'],
  ['word-counter', 'Word Counter', 'Count words, characters and lines.', 'Text Tools'],
  ['dedupe-lines', 'Dedupe Lines', 'Remove duplicate lines.', 'Text Tools'],
  ['character-counter', 'Character Counter', 'Count characters, letters, digits and spaces.', 'Text Tools'],
  ['line-counter', 'Line Counter', 'Count total, empty and non-empty lines.', 'Text Tools'],
  ['remove-empty-lines', 'Remove Empty Lines', 'Remove blank and whitespace-only lines.', 'Text Tools'],
  ['sort-lines', 'Sort Lines', 'Sort text lines alphabetically.', 'Text Tools'],
  ['shuffle-lines', 'Shuffle Lines', 'Randomly shuffle text lines.', 'Text Tools'],
  ['reverse-text', 'Reverse Text', 'Reverse characters, words or line order.', 'Text Tools'],
  ['markdown-preview', 'Markdown Previewer', 'Preview Markdown in real time.', 'Text Tools'],

  // Network
  ['ip-lookup', 'IP Address Lookup', 'Lookup IP geolocation and ISP.', 'Network'],
  ['my-ip', 'My IP Address', 'Show your public IP address.', 'Network'],
  ['dns-lookup', 'DNS Lookup', 'Query DNS records.', 'Network'],
  ['dns-log-monitor', 'DNS Log Monitor', 'Real-time DNS query logging.', 'Network'],
  ['user-agent', 'User Agent Parser', 'Parse browser user agent strings.', 'Network'],
  ['query-string-parser', 'Query String Parser', 'Parse and decode URL query parameters.', 'Network'],
  ['http-header-viewer', 'HTTP Header Viewer', 'View and analyze HTTP headers.', 'Network'],
  ['whois-lookup', 'WHOIS Lookup', 'Lookup domain registration info.', 'Network'],
  ['ping-tool', 'Ping Tool', 'Test network latency and packet loss.', 'Network'],
  ['port-checker', 'Port Checker', 'Check if TCP ports are open.', 'Network'],

  // Image Tools
  ['image-to-base64', 'Image to Base64', 'Convert images to Base64 data URIs.', 'Image Tools'],
  ['base64-image-viewer', 'Base64 Image Viewer', 'Decode and view Base64-encoded images.', 'Image Tools'],
  ['svg-viewer', 'SVG Viewer', 'View and preview SVG code in real time.', 'Image Tools'],
  ['svg-optimizer', 'SVG Optimizer', 'Optimize and clean up SVG markup.', 'Image Tools'],
  ['svg-minifier', 'SVG Minifier', 'Minify and compress SVG code.', 'Image Tools'],
  ['image-compressor', 'Image Compressor', 'Compress JPEG, PNG and WebP images.', 'Image Tools'],
  ['image-crop', 'Image Crop', 'Crop and trim images in the browser.', 'Image Tools'],
  ['image-resize', 'Image Resize', 'Resize images to exact dimensions.', 'Image Tools'],
  ['favicon-generator', 'Favicon Generator', 'Generate favicon.ico from any image.', 'Image Tools'],
  ['image-format-converter', 'Image Format Converter', 'Convert images between PNG, JPEG, WebP, SVG.', 'Image Tools'],
  ['exif-viewer', 'EXIF Viewer', 'View EXIF metadata from JPEG photos.', 'Image Tools'],

  // Security
  ['ssl-checker', 'SSL Certificate Checker', 'Check SSL certificate details.', 'Security'],
  ['password-strength', 'Password Strength Meter', 'Evaluate password strength.', 'Security'],
  ['crc32-hash', 'CRC32 Hash', 'Generate CRC32 checksums from text.', 'Security'],
  ['bcrypt-hash', 'Bcrypt Hash Generator', 'Hash passwords with the bcrypt algorithm.', 'Security'],
  ['aes-encrypt', 'AES Encrypt / Decrypt', 'Encrypt and decrypt text with AES.', 'Security'],
  ['rsa-key-generator', 'RSA Key Generator', 'Generate RSA public/private key pairs.', 'Security'],
  ['hmac-generator', 'HMAC Generator', 'Generate HMAC with SHA-256 and SHA-512.', 'Security'],

  // Formatters
  ['sql-minifier', 'SQL Minifier', 'Minify and compress SQL queries.', 'Formatters'],
  ['css-formatter', 'CSS Formatter', 'Format and beautify CSS.', 'Formatters'],
  ['css-minifier', 'CSS Minifier', 'Minify and compress CSS code.', 'Formatters'],
  ['html-formatter', 'HTML Formatter', 'Format and beautify HTML.', 'Formatters'],
  ['html-minifier', 'HTML Minifier', 'Minify and compress HTML code.', 'Formatters'],
  ['js-formatter', 'JavaScript Formatter', 'Format and beautify JavaScript.', 'Formatters'],

  // Calculators
  ['px-to-rem', 'PX to REM Converter', 'Convert PX to REM and EM units.', 'Calculators'],

  // SEO Tools
  ['robots-txt-validator', 'Robots.txt Validator', 'Validate and test robots.txt rules.', 'SEO Tools'],
  ['sitemap-validator', 'Sitemap Validator', 'Validate XML sitemap structure.', 'SEO Tools'],
];

// [path, name, description, devtoolsCategory] — devtools.51nav.com
const devtoolsRaw: [string, string, string, string][] = [
  // JSON -> Data Converters
  ['json/formatter', 'JSON Formatter', 'Format, validate and pretty-print JSON.', 'JSON'],
  ['json/validator', 'JSON Validator', 'Validate JSON and catch syntax errors.', 'JSON'],
  ['json/compare', 'JSON Compare', 'Compare and diff two JSON documents.', 'JSON'],
  ['json/minify', 'JSON Minify', 'Minify JSON into compact one-line output.', 'JSON'],
  ['json/json-to-yaml', 'JSON to YAML', 'Convert JSON into YAML.', 'JSON'],
  ['json/json-to-csv', 'JSON to CSV', 'Convert JSON arrays into CSV.', 'JSON'],
  ['json/csv-to-json', 'CSV to JSON', 'Convert CSV data into JSON.', 'JSON'],
  ['json/json-schema-validator', 'JSON Schema Validator', 'Validate JSON against a JSON Schema.', 'JSON'],

  // Encode -> Encoding
  ['encode/base64', 'Base64', 'Encode and decode Base64 text.', 'Encode'],
  ['encode/base64url', 'Base64URL', 'URL-safe Base64 encode and decode.', 'Encode'],
  ['encode/urlencode', 'URL Encode', 'Percent-encode and decode URLs.', 'Encode'],
  ['encode/html-encode', 'HTML Encode', 'Encode and decode HTML entities.', 'Encode'],
  ['encode/unicode-escape', 'Unicode Escape', 'Escape and unescape Unicode sequences.', 'Encode'],
  ['encode/hex', 'Hex', 'Convert text to and from hexadecimal.', 'Encode'],
  ['encode/hash-generator', 'Hash Generator', 'Generate MD5, SHA-1, SHA-256, SHA-512.', 'Encode'],
  ['encode/hmac-generator', 'HMAC Generator', 'Generate HMAC with SHA-256 and SHA-512.', 'Encode'],
  ['encode/uuid-generator', 'UUID Generator', 'Generate UUID identifiers.', 'Encode'],
  ['encode/base32', 'Base32', 'Encode and decode Base32 strings.', 'Encode'],

  // JWT -> Development
  ['jwt/decoder', 'JWT Decoder', 'Decode JWT headers and payloads locally.', 'JWT'],

  // API -> Network
  ['api/status-checker', 'HTTP Status Checker', 'Check the status of a public URL from the browser.', 'API'],

  // Regex -> Development
  ['regex/tester', 'Regex Tester', 'Test regular expressions against sample text.', 'Regex'],

  // Color -> Colors & Design
  ['color/color-picker', 'Color Picker', 'Pick and convert colors (HEX/RGB/HSL).', 'Color'],
  ['color/color-converter', 'Color Converter', 'Convert between color formats.', 'Color'],

  // CSS -> Formatters
  ['css/css-formatter', 'CSS Formatter', 'Format and beautify CSS.', 'CSS'],
  ['css/css-gradient', 'CSS Gradient', 'Create gradient CSS backgrounds.', 'CSS'],
  ['css/css-flexbox', 'CSS Flexbox', 'Visual CSS flexbox layout generator.', 'CSS'],

  // Date -> Date & Time (new category)
  ['date/epoch-converter', 'Epoch Converter', 'Convert Unix epoch to human-readable dates.', 'Date'],
  ['date/timestamp-converter', 'Timestamp Converter', 'Convert between Unix time and dates.', 'Date'],
  ['date/date-formatter', 'Date Formatter', 'Format dates into readable strings.', 'Date'],
  ['date/date-diff', 'Date Diff', 'Calculate the difference between two dates.', 'Date'],
  ['date/timezone-converter', 'Timezone Converter', 'Convert times across timezones.', 'Date'],
  ['date/cron-generator', 'Cron Generator', 'Build cron schedule expressions visually.', 'Date'],

  // Crypto -> Security
  ['crypto/password-generator', 'Password Generator', 'Create secure random passwords.', 'Crypto'],
];

export const toolhubTools: ToolItem[] = toolhubRaw.map(([slug, name, description, category]) =>
  makeTool(name, description, category, TOOLHUB_BASE + slug + '/', 'toolhub')
);

export const devtoolsTools: ToolItem[] = devtoolsRaw.map(([path, name, description, devCat]) => {
  const category = devtoolsCategoryMap[devCat] ?? devCat;
  return makeTool(name, description, category, DEVTOOLS_BASE + path + '/', 'devtools');
});

const TOOLBOX_BASE = 'https://toolbox.51nav.com/tools/';

// Maps a toolbox.51nav.com category to the equivalent canonical category.
const toolboxCategoryMap: Record<string, string> = {
  encoding: 'Encoding',
  encryption: 'Encryption',
  hashing: 'Hashing',
  text: 'Text Tools',
  network: 'Network',
  'data-format': 'Data Converters',
  document: 'Document Conversion',
  image: 'Image Tools',
  javascript: 'JavaScript',
  generator: 'Generators',
  css: 'Colors & Design',
  math: 'Math',
  analysis: 'Data Analysis',
  regex: 'Development',
  web3: 'Web3',
  datetime: 'Date & Time',
  security: 'Security',
  converter: 'Converters',
};

// Per-tool canonical overrides (toolbox buckets are grab-bags).
const toolboxSlugCat: Record<string, string> = {
  'css-minify': 'Formatters',
  timestamp: 'Data Converters',
  radix: 'Calculators',
  'number-base': 'Calculators',
  'unit-convert': 'Calculators',
  'color-convert': 'Colors & Design',
  'html-color': 'Colors & Design',
  'color-contrast': 'Colors & Design',
  'ascii-table': 'Text Tools',
  'unicode-table': 'Text Tools',
  'qr-generate': 'Generators',
  'qr-decode': 'Generators',
  'barcode-gen': 'Generators',
  cron: 'Development',
};

// [slug, name, description, toolboxCategory] — toolbox.51nav.com
const toolboxRaw: [string, string, string, string][] = [
['base64', 'Base64', 'Encode and decode Base64 text.', 'encoding'],
  ['url-encode', 'URL Encode / Decode', 'Percent-encode and decode URLs.', 'encoding'],
  ['html-entity', 'HTML Entity', 'Encode and decode HTML Entity text.', 'encoding'],
  ['unicode', 'Unicode', 'Encode and decode Unicode text.', 'encoding'],
  ['hex', 'Hex', 'Encode and decode Hex text.', 'encoding'],
  ['binary', 'Binary', 'Encode and decode Binary text.', 'encoding'],
  ['base32', 'Base32', 'Encode and decode Base32 text.', 'encoding'],
  ['base58', 'Base58', 'Encode and decode Base58 text.', 'encoding'],
  ['jwt-decode', 'JWT Decoder', 'Decode JWT tokens and inspect claims locally.', 'encoding'],
  ['morse', 'Morse Code', 'Encode and decode Morse Code text.', 'encoding'],
  ['punycode', 'Punycode', 'Encode and decode Punycode text.', 'encoding'],
  ['charset-convert', 'Charset Convert', 'Convert between GBK, Big5, UTF-8 and more.', 'encoding'],
  ['utf8', 'UTF-8', 'Encode and decode UTF-8 text.', 'encoding'],
  ['octal', 'Octal', 'Encode and decode Octal text.', 'encoding'],
  ['quoted-printable', 'Quoted-Printable', 'Encode and decode Quoted-Printable text.', 'encoding'],
  ['base85', 'Base85', 'Encode and decode Base85 text.', 'encoding'],
  ['braille', 'Braille', 'Encode and decode Braille text.', 'encoding'],
  ['tap-code', 'Tap Code', 'Encode and decode Tap Code text.', 'encoding'],
  ['aaencode', 'AAEncode', 'Encode and decode AAEncode text.', 'encoding'],
  ['aes', 'AES Encrypt / Decrypt', 'Encrypt and decrypt with AES.', 'encryption'],
  ['des', 'DES Encrypt / Decrypt', 'Encrypt and decrypt with DES.', 'encryption'],
  ['3des', '3DES Encrypt / Decrypt', 'Encrypt and decrypt with 3DES.', 'encryption'],
  ['rsa', 'RSA Encrypt / Decrypt', 'Encrypt and decrypt with RSA.', 'encryption'],
  ['rc4', 'RC4 Encrypt / Decrypt', 'Encrypt and decrypt with RC4.', 'encryption'],
  ['sm4', 'SM4 Encrypt / Decrypt', 'Encrypt and decrypt with SM4.', 'encryption'],
  ['sm2', 'SM2 Encrypt / Decrypt', 'Encrypt and decrypt with SM2.', 'encryption'],
  ['chacha20', 'ChaCha20 Encrypt / Decrypt', 'Encrypt and decrypt with ChaCha20.', 'encryption'],
  ['blowfish', 'Blowfish Encrypt / Decrypt', 'Encrypt and decrypt with Blowfish.', 'encryption'],
  ['rsa-keygen', 'RSA Key Pair Generator', 'Generate RSA public/private key pairs.', 'encryption'],
  ['rabbit', 'Rabbit Encrypt / Decrypt', 'Encrypt and decrypt with Rabbit.', 'encryption'],
  ['pgp', 'PGP Encrypt / Decrypt', 'Encrypt and decrypt with PGP.', 'encryption'],
  ['aes-keygen', 'AES Key Generator', 'Generate random AES encryption keys.', 'encryption'],
  ['md5', 'MD5 Hash', 'Compute MD5 message digests.', 'hashing'],
  ['sha1', 'SHA-1 Hash', 'Compute SHA-1 message digests.', 'hashing'],
  ['sha256', 'SHA-256 Hash', 'Compute SHA-256 message digests.', 'hashing'],
  ['sha512', 'SHA-512 Hash', 'Compute SHA-512 message digests.', 'hashing'],
  ['sha3', 'SHA-3 Hash', 'Compute SHA-3 message digests.', 'hashing'],
  ['sm3', 'SM3 Hash', 'Compute SM3 message digests.', 'hashing'],
  ['ripemd160', 'RIPEMD-160 Hash', 'Compute RIPEMD-160 message digests.', 'hashing'],
  ['hmac', 'HMAC Generator', 'Generate HMAC authentication codes.', 'hashing'],
  ['crc', 'CRC Checksum', 'Compute CRC-8/16/32 checksums.', 'hashing'],
  ['bcrypt', 'Bcrypt Hash', 'Hash and verify passwords with Bcrypt.', 'hashing'],
  ['scrypt', 'Scrypt Hash', 'Derive keys and hash with Scrypt.', 'hashing'],
  ['argon2', 'Argon2 Hash', 'Hash passwords with Argon2id.', 'hashing'],
  ['hash-compare', 'Hash Compare', 'Compare text against known hashes.', 'hashing'],
  ['hash-all', 'All-Hash Generator', 'Generate MD5, SHA-1, SHA-256 and SHA-512 at once.', 'hashing'],
  ['text-case', 'Case Converter', 'Convert text between UPPER, lower and CamelCase.', 'text'],
  ['text-count', 'Word Counter', 'Count words, characters, lines and bytes.', 'text'],
  ['text-diff', 'Text Diff', 'Diff two blocks of text.', 'text'],
  ['text-remove-dup', 'Remove Duplicate Lines', 'Remove duplicate lines from text.', 'text'],
  ['text-remove-empty', 'Remove Empty Lines', 'Strip blank lines.', 'text'],
  ['text-trim', 'Trim Whitespace', 'Trim leading and trailing whitespace per line.', 'text'],
  ['text-sort', 'Sort Lines', 'Sort text lines.', 'text'],
  ['text-replace', 'Text Replace', 'Find and replace text.', 'text'],
  ['text-reverse', 'Reverse Text', 'Reverse characters or lines.', 'text'],
  ['text-pad', 'Pad Text', 'Pad lines to a fixed width.', 'text'],
  ['text-wrap', 'Wrap Text', 'Wrap text at a line width.', 'text'],
  ['text-prefix', 'Add Line Numbers / Prefix / Suffix', 'Add line numbers, prefixes or suffixes.', 'text'],
  ['text-extract', 'Text Extract', 'Extract lines by pattern.', 'text'],
  ['text-split-join', 'Split & Join', 'Split and join text blocks.', 'text'],
  ['text-chinese', 'Chinese Text Tools', 'Chinese punctuation and full/half-width tools.', 'text'],
  ['lorem-ipsum', 'Lorem Ipsum Generator', 'Generate placeholder text.', 'text'],
  ['markdown-preview', 'Markdown Preview', 'Preview Markdown in real time.', 'text'],
  ['text-slugify', 'Slug Generator', 'Turn text into URL-friendly slugs.', 'text'],
  ['text-escape', 'Escape Characters', 'Escape and unescape special characters.', 'text'],
  ['regex-tester', 'Regex Tester', 'Test regular expressions.', 'regex'],
  ['regex-cheatsheet', 'Regex Cheat Sheet', 'Regex syntax cheat sheet.', 'regex'],
  ['regex-generator', 'Regex Generator', 'Generate regex from descriptions.', 'regex'],
  ['json-format', 'JSON Formatter', 'Format, validate and minify JSON.', 'data-format'],
  ['json-to-yaml', 'JSON to YAML', 'Convert JSON to YAML.', 'data-format'],
  ['yaml-to-json', 'YAML to JSON', 'Convert YAML to JSON.', 'data-format'],
  ['json-to-xml', 'JSON to XML', 'Convert JSON to XML.', 'data-format'],
  ['xml-to-json', 'XML to JSON', 'Convert XML to JSON.', 'data-format'],
  ['xml-format', 'XML Formatter', 'Format and pretty-print XML.', 'data-format'],
  ['json-to-csv', 'JSON to CSV', 'Convert JSON arrays to CSV.', 'data-format'],
  ['csv-to-json', 'CSV to JSON', 'Convert CSV to JSON.', 'data-format'],
  ['json-to-toml', 'JSON to TOML', 'Convert JSON to TOML.', 'data-format'],
  ['toml-to-json', 'TOML to JSON', 'Convert TOML to JSON.', 'data-format'],
  ['json-path', 'JSONPath Query', 'Query JSON with JSONPath.', 'data-format'],
  ['json-diff', 'JSON Compare', 'Compare two JSON documents.', 'data-format'],
  ['json-schema', 'JSON Schema Validator', 'Validate JSON against a schema.', 'data-format'],
  ['protobuf-decode', 'Protobuf Decoder', 'Decode Protobuf messages.', 'data-format'],
  ['ip-lookup', 'IP Lookup', 'Look up IP geolocation and ISP.', 'network'],
  ['ip-calc', 'IP Subnet Calculator', 'Calculate subnet, mask and ranges.', 'network'],
  ['ip-convert', 'IP Format Converter', 'Convert between IP formats.', 'network'],
  ['url-parser', 'URL Parser', 'Parse URL components.', 'network'],
  ['dns-lookup', 'DNS Lookup', 'Query DNS records.', 'network'],
  ['dns-propagation', 'DNS Propagation Checker', 'Check DNS changes across regions.', 'network'],
  ['curl-generator', 'cURL Generator', 'Build cURL commands visually.', 'network'],
  ['user-agent', 'User Agent Parser', 'Parse browser user-agent strings.', 'network'],
  ['port-reference', 'Port Reference', 'Reference of common service ports.', 'network'],
  ['cidr-calc', 'CIDR Calculator', 'Compute CIDR blocks and ranges.', 'network'],
  ['mac-lookup', 'MAC Address Lookup', 'Look up MAC vendor info.', 'network'],
  ['http-headers', 'HTTP Headers Viewer', 'Inspect HTTP request headers.', 'network'],
  ['websocket-test', 'WebSocket Tester', 'Test WebSocket connections.', 'network'],
  ['whois', 'WHOIS Lookup', 'Look up domain WHOIS info.', 'network'],
  ['seo-analysis', 'SEO Analysis', 'Run a basic SEO audit.', 'network'],
  ['multi-ping', 'Multi-location Ping', 'Ping a host from multiple locations.', 'network'],
  ['password-gen', 'Password Generator', 'Create secure random passwords.', 'security'],
  ['password-strength', 'Password Strength Checker', 'Check password strength.', 'security'],
  ['password-breach', 'Password Breach Checker', 'Check passwords against known breaches.', 'security'],
  ['xss-payload', 'XSS Payload Generator', 'XSS payload reference and encoder.', 'security'],
  ['sql-inject', 'SQL Injection Reference', 'SQL injection reference.', 'security'],
  ['csp-generator', 'CSP Generator', 'Generate Content-Security-Policy headers.', 'security'],
  ['security-headers', 'Security Headers Checker', 'Analyze a site\'s security headers.', 'security'],
  ['cert-parser', 'Certificate Parser', 'Parse X.509 certificates.', 'security'],
  ['csrf-token', 'CSRF Token Generator', 'Generate CSRF tokens.', 'security'],
  ['totp', 'TOTP / HOTP Generator', 'Generate TOTP / HOTP codes.', 'security'],
  ['steganography', 'Steganography Detector', 'Basic image steganography analysis.', 'security'],
  ['reverse-shell', 'Reverse Shell Generator', 'Generate reverse-shell commands.', 'security'],
  ['lfi-payload', 'LFI Payload Reference', 'LFI payload reference.', 'security'],
  ['tty-shell', 'TTY Shell Upgrade', 'Upgrade to a full TTY shell.', 'security'],
  ['msfvenom', 'MSFvenom Payload Generator', 'Generate msfvenom payloads.', 'security'],
  ['nmap', 'Nmap Command Generator', 'Build nmap scan commands.', 'security'],
  ['sqlmap', 'SQLMap Command Generator', 'Build sqlmap commands.', 'security'],
  ['google-hacking', 'Google Hacking Generator', 'Build Google Hacking queries.', 'security'],
  ['linux-privesc', 'Linux Privilege Escalation', 'Linux privilege-escalation reference.', 'security'],
  ['powershell-commands', 'PowerShell Commands', 'Pen-test PowerShell commands.', 'security'],
  ['file-transfer', 'File Transfer Reference', 'File-transfer and exfil reference.', 'security'],
  ['windows-commands', 'Windows Commands', 'Windows admin commands.', 'security'],
  ['linux-commands', 'Linux Commands', 'Linux admin commands.', 'security'],
  ['firewalld', 'Firewalld Generator', 'Generate firewalld commands.', 'security'],
  ['iptables', 'Iptables Generator', 'Generate iptables rules.', 'security'],
  ['wireshark', 'Wireshark Filter Generator', 'Build Wireshark filters.', 'security'],
  ['tcpdump', 'Tcpdump Generator', 'Build tcpdump capture commands.', 'security'],
  ['jwt', 'JWT Signer / Verifier', 'Create, sign and verify JWTs.', 'security'],
  ['security-ports', 'Security Ports Reference', 'Common security ports reference.', 'security'],
  ['timestamp', 'Timestamp Converter', 'Convert between Unix time and dates.', 'converter'],
  ['radix', 'Radix Converter', 'Convert numbers between bases.', 'converter'],
  ['color-convert', 'Color Converter', 'Convert between color formats.', 'converter'],
  ['unit-convert', 'Unit Converter', 'Convert units of measurement.', 'converter'],
  ['number-base', 'Number Base Converter', 'Convert between arbitrary bases.', 'converter'],
  ['ascii-table', 'ASCII Table', 'Browse the ASCII character table.', 'converter'],
  ['unicode-table', 'Unicode Table', 'Browse Unicode characters.', 'converter'],
  ['html-color', 'HTML Color Table', 'Pick named HTML colors.', 'converter'],
  ['color-contrast', 'WCAG Contrast Checker', 'Check WCAG color contrast ratios.', 'converter'],
  ['bip39', 'BIP39 Mnemonic', 'Generate and validate BIP39 mnemonics.', 'web3'],
  ['addr-validate', 'Blockchain Address Validator', 'Validate blockchain addresses.', 'web3'],
  ['qr-generate', 'QR Code Generator', 'Generate QR codes.', 'converter'],
  ['qr-decode', 'QR Code Decoder', 'Decode QR codes from images.', 'converter'],
  ['barcode-gen', 'Barcode Generator', 'Generate barcodes.', 'converter'],
  ['cron', 'Cron Expression Generator', 'Build and parse cron expressions.', 'converter'],
  ['image-compress', 'Image Compressor', 'Compress images online.', 'image'],
  ['image-resize', 'Image Resizer', 'Resize images to any size.', 'image'],
  ['image-crop', 'Image Cropper', 'Crop images in the browser.', 'image'],
  ['image-convert', 'Image Format Converter', 'Convert between image formats.', 'image'],
  ['image-watermark', 'Image Watermark', 'Add watermarks to images.', 'image'],
  ['image-base64', 'Image to Base64', 'Convert images to and from Base64.', 'image'],
  ['image-metadata', 'Image EXIF Viewer', 'View image EXIF metadata.', 'image'],
  ['image-split', 'Image Split / Merge', 'Split or merge images.', 'image'],
  ['svg-optimizer', 'SVG Optimizer', 'Optimize SVG markup.', 'image'],
  ['ico-convert', 'ICO Converter', 'Convert images to ICO.', 'image'],
  ['favicon-gen', 'Favicon Generator', 'Generate a favicon from an image.', 'image'],
  ['css-gradient', 'CSS Gradient Generator', 'Build CSS gradient backgrounds.', 'css'],
  ['css-shadow', 'CSS Shadow Generator', 'Design CSS shadows visually.', 'css'],
  ['css-flexbox', 'CSS Flexbox Playground', 'Experiment with CSS flexbox.', 'css'],
  ['css-grid', 'CSS Grid Playground', 'Experiment with CSS grid.', 'css'],
  ['css-animation', 'CSS Animation Generator', 'Create CSS keyframe animations.', 'css'],
  ['css-minify', 'CSS Minifier', 'Minify and format CSS.', 'css'],
  ['js-minify', 'JS Minifier', 'Minify JavaScript code.', 'javascript'],
  ['js-format', 'JS Formatter', 'Format JavaScript.', 'javascript'],
  ['js-beautify', 'JS Beautifier', 'Beautify obfuscated JavaScript.', 'javascript'],
  ['js-run', 'JS Runner', 'Run JS in a sandbox.', 'javascript'],
  ['js-obfuscate', 'JS Obfuscator', 'Obfuscate JavaScript.', 'javascript'],
  ['js-deobfuscate', 'JS Deobfuscator', 'Deobfuscate JavaScript.', 'javascript'],
  ['babel-transform', 'Babel Transformer', 'Transpile JS with Babel.', 'javascript'],
  ['typescript-play', 'TypeScript Playground', 'Run TypeScript in the browser.', 'javascript'],
  ['uuid', 'UUID Generator', 'Generate UUID v1/v4/v5 identifiers.', 'generator'],
  ['ulid', 'ULID Generator', 'Generate ULID identifiers.', 'generator'],
  ['nanoid', 'NanoID Generator', 'Generate compact NanoID strings.', 'generator'],
  ['random-string', 'Random String Generator', 'Generate random strings.', 'generator'],
  ['random-number', 'Random Number Generator', 'Generate random numbers.', 'generator'],
  ['hash-batch', 'Batch Hash Generator', 'Generate hashes in bulk.', 'generator'],
  ['chinese-lorem', 'Chinese Lorem Ipsum', 'Generate Chinese placeholder text.', 'generator'],
  ['fake-data', 'Mock Data Generator', 'Generate mock data.', 'generator'],
  ['base-calculator', 'Base Calculator', 'Calculator with base conversion.', 'math'],
  ['bit-calculator', 'Bitwise Calculator', 'Bitwise AND/OR/XOR/NOT and shifts.', 'math'],
  ['math-expression', 'Math Expression Evaluator', 'Evaluate math expressions.', 'math'],
  ['percentage-calc', 'Percentage Calculator', 'Calculate percentages.', 'math'],
  ['bmi-calc', 'BMI Calculator', 'Calculate body mass index.', 'math'],
  ['html-to-md', 'HTML to Markdown', 'Convert HTML to Markdown.', 'document'],
  ['md-to-html', 'Markdown to HTML', 'Convert Markdown to HTML.', 'document'],
  ['csv-to-sql', 'CSV to SQL', 'Turn CSV into SQL INSERTs.', 'document'],
  ['sql-to-csv', 'SQL to CSV', 'Turn SQL into CSV.', 'document'],
  ['json-to-ts', 'JSON to TypeScript', 'Generate TypeScript interfaces from JSON.', 'document'],
  ['json-to-go', 'JSON to Go Struct', 'Generate Go structs from JSON.', 'document'],
  ['json-to-java', 'JSON to Java', 'Generate Java classes from JSON.', 'document'],
  ['json-to-mysql', 'JSON to MySQL', 'Generate MySQL tables from JSON.', 'document'],
  ['excel-to-json', 'Excel to JSON', 'Convert Excel to JSON.', 'document'],
  ['pdf-to-text', 'PDF Text Extractor', 'Extract text from PDFs.', 'document'],
  ['html-format', 'HTML Formatter', 'Format and minify HTML.', 'document'],
  ['sql-format', 'SQL Formatter', 'Format and minify SQL.', 'document'],
  ['timezone-convert', 'Timezone Converter', 'Convert times across timezones.', 'datetime'],
  ['date-diff', 'Date Diff', 'Compute the difference between dates.', 'datetime'],
  ['frequency-analysis', 'Frequency Analysis', 'Character and n-gram frequency analysis.', 'analysis'],
  ['entropy-calc', 'Entropy Calculator', 'Shannon entropy calculator.', 'analysis'],
  ['base-detect', 'Encoding Detector', 'Auto-detect text encoding.', 'analysis'],
  ['charset-detect', 'Charset Detector', 'Detect text character set.', 'analysis'],
  ['binary-analysis', 'Binary Analysis', 'Hex viewer and binary analysis.', 'analysis'],
  ['social-password', 'Social Password Generator', 'Generate social-engineering password candidates.', 'security'],
  ['emergency-response', 'Emergency Response Toolkit', 'Cybersecurity incident response toolkit.', 'security'],
];

export const toolboxTools: ToolItem[] = toolboxRaw.map(([slug, name, description, tcat]) => {
  const category = toolboxSlugCat[slug] ?? toolboxCategoryMap[tcat] ?? tcat;
  return makeTool(name, description, category, TOOLBOX_BASE + tcat + '/' + slug + '/', 'toolbox');
});

// ---------------------------------------------------------------------------
// Finance — https://moneytools.51nav.com (Everyday Money Tools)
// Each vertical site is kept in its own canonical category (Finance / Health /
// Games) rather than being fused into the developer categories.
// ---------------------------------------------------------------------------
const MONEY_BASE = 'https://moneytools.51nav.com/calculators/';

// [slug, name, description] — all under the "Finance" category
const financeRaw: [string, string, string][] = [
  ['401k-calculator', '401(k) Calculator', 'Estimate 401(k) contributions, growth and retirement balance.'],
  ['50-30-20-budget-calculator', '50/30/20 Budget Calculator', 'Split income into needs, wants and savings with the 50/30/20 rule.'],
  ['apy-calculator', 'APY Calculator', 'Convert APR to APY and compare savings yields.'],
  ['auto-loan-calculator', 'Auto Loan Calculator', 'Estimate car loan payments, interest and total cost.'],
  ['budget-calculator', 'Budget Calculator', 'Plan monthly income and expenses with a simple budget.'],
  ['cagr-calculator', 'CAGR Calculator', 'Measure the compound annual growth rate of an investment.'],
  ['capital-gains-tax-calculator', 'Capital Gains Tax Calculator', 'Estimate tax on long- and short-term capital gains.'],
  ['car-affordability-calculator', 'Car Affordability Calculator', 'Find the car payment and price you can afford.'],
  ['cd-calculator', 'CD Calculator', 'Project returns from a certificate of deposit.'],
  ['compound-interest-calculator', 'Compound Interest Calculator', 'See how compounding grows savings over time.'],
  ['credit-card-payoff-calculator', 'Credit Card Payoff Calculator', 'Plan payments to clear credit card debt faster.'],
  ['debt-avalanche-calculator', 'Debt Avalanche Calculator', 'Pay debts fastest by targeting highest rates first.'],
  ['debt-consolidation-calculator', 'Debt Consolidation Calculator', 'Compare consolidation versus current debt payments.'],
  ['debt-payoff-calculator', 'Debt Payoff Calculator', 'Find how long it takes to become debt-free.'],
  ['debt-snowball-calculator', 'Debt Snowball Calculator', 'Pay off debts smallest-balance first for momentum.'],
  ['debt-to-income-ratio-calculator', 'Debt-to-Income Ratio Calculator', 'Check your DTI for loan eligibility.'],
  ['dividend-calculator', 'Dividend Calculator', 'Project dividend income and reinvestment growth.'],
  ['down-payment-calculator', 'Down Payment Calculator', 'Plan a home down payment and savings goal.'],
  ['emergency-fund-calculator', 'Emergency Fund Calculator', 'Size an emergency cash cushion for your expenses.'],
  ['extra-payment-mortgage-calculator', 'Extra Payment Mortgage Calculator', 'See savings from extra mortgage payments.'],
  ['federal-income-tax-calculator', 'Federal Income Tax Calculator', 'Estimate U.S. federal income tax owed.'],
  ['health-insurance-calculator', 'Health Insurance Calculator', 'Compare premiums, deductibles and out-of-pocket costs.'],
  ['home-affordability-calculator', 'Home Affordability Calculator', 'Estimate the home price you can afford.'],
  ['income-tax-calculator', 'Income Tax Calculator', 'Estimate income tax across filing statuses.'],
  ['inflation-calculator', 'Inflation Calculator', 'See how inflation erodes purchasing power.'],
  ['investment-growth-calculator', 'Investment Growth Calculator', 'Project portfolio growth with contributions.'],
  ['ira-contribution-calculator', 'IRA Contribution Calculator', 'Maximize IRA contributions and limits.'],
  ['life-insurance-calculator', 'Life Insurance Calculator', 'Estimate the life cover you need.'],
  ['loan-calculator', 'Loan Calculator', 'Estimate any loan payment, term and interest.'],
  ['mortgage-amortization-calculator', 'Mortgage Amortization Calculator', 'View a mortgage amortization schedule by month.'],
  ['mortgage-calculator', 'Mortgage Calculator', 'Estimate monthly mortgage payment and total cost.'],
  ['net-worth-calculator', 'Net Worth Calculator', 'Track assets minus liabilities over time.'],
  ['paycheck-calculator', 'Paycheck Calculator', 'Estimate take-home pay from gross wages.'],
  ['pmi-calculator', 'PMI Calculator', 'Estimate private mortgage insurance costs.'],
  ['refinance-calculator', 'Refinance Calculator', 'Check if refinancing a mortgage saves money.'],
  ['rent-vs-buy-calculator', 'Rent vs Buy Calculator', 'Compare renting versus buying a home.'],
  ['rental-property-calculator', 'Rental Property Calculator', 'Analyze rental property cash flow and ROI.'],
  ['retirement-calculator', 'Retirement Calculator', 'Plan the savings needed for retirement.'],
  ['rmd-calculator', 'RMD Calculator', 'Estimate required minimum distributions.'],
  ['roi-calculator', 'ROI Calculator', 'Calculate return on investment percentage.'],
  ['roth-ira-calculator', 'Roth IRA Calculator', 'Compare Roth IRA growth and taxes.'],
  ['rule-of-72-calculator', 'Rule of 72 Calculator', 'Estimate doubling time at a given rate.'],
  ['salary-calculator', 'Salary Calculator', 'Convert salary to hourly or annual pay.'],
  ['sales-tax-calculator', 'Sales Tax Calculator', 'Add or reverse sales tax on a price.'],
  ['savings-goal-calculator', 'Savings Goal Calculator', 'Plan monthly savings to hit a goal.'],
  ['self-employment-tax-calculator', 'Self-Employment Tax Calculator', 'Estimate self-employment tax on 1099 income.'],
  ['social-security-breakeven-calculator', 'Social Security Breakeven Calculator', 'Find the best age to claim Social Security.'],
  ['social-security-estimator', 'Social Security Estimator', 'Estimate future Social Security benefits.'],
  ['student-loan-calculator', 'Student Loan Calculator', 'Estimate student loan payments and payoff.'],
];

export const financeTools: ToolItem[] = financeRaw.map(([slug, name, description]) =>
  makeTool(name, description, 'Finance', MONEY_BASE + slug + '/', 'finance')
);

// ---------------------------------------------------------------------------
// Health — https://healthcalchub.51nav.com (HealthCalcHub)
// ---------------------------------------------------------------------------
const HEALTH_BASE = 'https://healthcalchub.51nav.com/';

// [slug, name, description] — all under the "Health" category
const healthRaw: [string, string, string][] = [
  ['bac-calculator', 'BAC Calculator', 'Estimate blood alcohol concentration.'],
  ['blood-pressure-calculator', 'Blood Pressure Calculator', 'Understand blood pressure categories and ranges.'],
  ['bmi-calculator', 'BMI Calculator', 'Calculate body mass index and healthy range.'],
  ['bmr-calculator', 'BMR Calculator', 'Estimate basal metabolic rate.'],
  ['body-fat-calculator', 'Body Fat Calculator', 'Estimate body fat percentage.'],
  ['calorie-calculator', 'Calorie Calculator', 'Estimate daily calorie needs.'],
  ['carb-calculator', 'Carb Calculator', 'Estimate daily carbohydrate intake.'],
  ['due-date-calculator', 'Due Date Calculator', 'Estimate pregnancy due date.'],
  ['fat-intake-calculator', 'Fat Intake Calculator', 'Estimate daily fat intake target.'],
  ['fiber-intake-calculator', 'Fiber Intake Calculator', 'Estimate daily fiber needs.'],
  ['heart-rate-zone-calculator', 'Heart Rate Zone Calculator', 'Find target heart rate training zones.'],
  ['ideal-weight-calculator', 'Ideal Weight Calculator', 'Estimate a healthy ideal weight.'],
  ['lean-body-mass-calculator', 'Lean Body Mass Calculator', 'Estimate lean body mass.'],
  ['macro-calculator', 'Macro Calculator', 'Estimate protein, carb and fat macros.'],
  ['meal-calorie-calculator', 'Meal Calorie Calculator', 'Estimate calories in a meal.'],
  ['ovulation-calculator', 'Ovulation Calculator', 'Estimate ovulation and fertile window.'],
  ['pregnancy-weight-gain-calculator', 'Pregnancy Weight Gain Calculator', 'Track healthy pregnancy weight gain.'],
  ['protein-calculator', 'Protein Calculator', 'Estimate daily protein needs.'],
  ['sleep-calculator', 'Sleep Calculator', 'Find optimal bedtime and wake time.'],
  ['tdee-calculator', 'TDEE Calculator', 'Estimate total daily energy expenditure.'],
  ['water-intake-calculator', 'Water Intake Calculator', 'Estimate daily water intake.'],
];

export const healthTools: ToolItem[] = healthRaw.map(([slug, name, description]) =>
  makeTool(name, description, 'Health', HEALTH_BASE + slug, 'health')
);

// ---------------------------------------------------------------------------
// Games — https://games.51nav.com (Brain Games Hub)
// ---------------------------------------------------------------------------
const GAMES_BASE = 'https://games.51nav.com/games/';

// [slug, name, description] — all under the "Games" category
const gamesRaw: [string, string, string][] = [
  ['color-test', 'Color Test', 'Test color vision and perception.'],
  ['iq-puzzle', 'IQ Puzzle', 'Challenge logic with brain-teasing puzzles.'],
  ['memory-test', 'Memory Test', 'Measure short-term memory performance.'],
  ['minesweeper', 'Minesweeper', 'Play the classic minesweeper puzzle game.'],
  ['number-memory', 'Number Memory', 'Train recall of number sequences.'],
  ['reaction-test', 'Reaction Test', 'Measure your reaction time.'],
  ['sudoku', 'Sudoku', 'Play classic sudoku number puzzles.'],
  ['typing-test', 'Typing Test', 'Test and improve typing speed.'],
  ['visual-memory', 'Visual Memory', 'Train visual memory and recall.'],
];

export const gamesTools: ToolItem[] = gamesRaw.map(([slug, name, description]) =>
  makeTool(name, description, 'Games', GAMES_BASE + slug + '/', 'games')
);

export const allTools: ToolItem[] = [
  ...toolhubTools,
  ...devtoolsTools,
  ...toolboxTools,
  ...financeTools,
  ...healthTools,
  ...gamesTools,
];

export const toolCategories: { name: string; count: number }[] = (() => {
  const counts = allTools.reduce((map, t) => {
    map.set(t.category, (map.get(t.category) || 0) + 1);
    return map;
  }, new Map<string, number>());
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
})();
