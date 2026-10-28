import { img } from "@/lib/pro-assets";

// ─── Contact — single source of truth ───────────────────────────────────────
export const CONTACT = {
  email: "altrawaretechnology@gmail.com",
  phonePrimary: "+255 792 867 427",
  phoneSecondary: "+255 790 942 616",
  address: "Dar es Salaam, Tanzania",
  hours: "Mon–Sat · 8:00–18:00 EAT",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Altraware+Technology+Dar+es+Salaam",
};

export const wa = (text = "Hi Altraware, I want to start a project") =>
  `https://wa.me/255792867427?text=${encodeURIComponent(text)}`;

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/altraware-technologies" },
  { label: "Instagram", href: "https://www.instagram.com/altrawaretechnology/" },
  { label: "TikTok", href: "https://www.tiktok.com/@altraware" },
];

// ─── Navigation ─────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/platforms", label: "Platforms" },
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/process", label: "Process" },
  { to: "/blog", label: "Blog" },
];

export const MENU_LINKS = [
  { to: "/", label: "Home", note: "Start here" },
  { to: "/about", label: "About", note: "Roots & team" },
  { to: "/services", label: "Services", note: "What we build" },
  { to: "/platforms", label: "Platforms", note: "Touch the software" },
  { to: "/work", label: "Work", note: "Case studies" },
  { to: "/pricing", label: "Pricing", note: "Fixed packages" },
  { to: "/process", label: "Process", note: "How we work" },
  { to: "/blog", label: "Blog", note: "Latest insights" },
  { to: "/contact", label: "Contact", note: "Let's build" },
];

// ─── Page transition + document title per route ─────────────────────────────
export type RouteMeta = { tag: string; dest: string; kicker: string; doc: string };

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    tag: "00 / HOME",
    dest: "HOME",
    kicker: "Engineering from Dar es Salaam",
    doc: "Altraware Technologies — Websites, Apps & Systems in Tanzania",
  },
  "/about": {
    tag: "01 / ROOTS",
    dest: "ABOUT US",
    kicker: "Two people. Systems that stay.",
    doc: "About — Altraware Technologies",
  },
  "/services": {
    tag: "02 / CRAFT",
    dest: "SERVICES",
    kicker: "Websites, apps & management tools",
    doc: "Services — Altraware Technologies",
  },
  "/platforms": {
    tag: "03 / PLATFORMS",
    dest: "PLATFORMS",
    kicker: "Faida POS & CareTrack systems",
    doc: "Platforms — Altraware Technologies",
  },
  "/work": {
    tag: "04 / WORK",
    dest: "OUR WORK",
    kicker: "Selected deployments across Tanzania",
    doc: "Our Work — Altraware Technologies",
  },
  "/pricing": {
    tag: "05 / PRICING",
    dest: "PRICING",
    kicker: "Fixed packages & clear timelines",
    doc: "Pricing — Altraware Technologies",
  },
  "/process": {
    tag: "06 / PROCESS",
    dest: "PROCESS",
    kicker: "Discovery, delivery & lifelong support",
    doc: "Process — Altraware Technologies",
  },
  "/blog": {
    tag: "07 / NOTES",
    dest: "BLOG",
    kicker: "Plain answers, no jargon",
    doc: "Blog — Altraware Technologies",
  },
  "/contact": {
    tag: "08 / CONNECT",
    dest: "LET'S BUILD",
    kicker: "Direct WhatsApp & office support",
    doc: "Contact — Altraware Technologies",
  },
  "/email": {
    tag: "09 / PROPOSAL",
    dest: "PROPOSAL EMAIL",
    kicker: "The template our clients receive",
    doc: "Proposal email template — Altraware Technologies",
  },
};

// ─── Home content ───────────────────────────────────────────────────────────
export const HERO = {
  lineA: "we build websites, apps",
  lineB: "& systems",
  lineC: "for business in Tanzania",
};

export const MOTION = {
  badge: "what we do best",
  titleA: "Systems your team",
  titleB: "actually uses.",
  subtitle: "from websites to POS — M-Pesa ready, Kiswahili & English.",
  description:
    "To run a shop, a school or a clinic you need systems your team actually uses. We build websites, apps and tools for everyday work in Tanzania — simple to use, friendly on slow connections, and backed by real support.",
  labels: ["M-Pesa ready", "Kiswahili & English", "support after launch"],
  stats: [
    { num: "15+", label: "live deployments" },
    { num: "100%", label: "offline-ready builds" },
    { num: "SW·EN", label: "Kiswahili & English" },
  ],
};

export const SERVICE_CARDS = [
  {
    bg: "#0a3d91",
    fg: "#fff",
    chip: "#bfd7ff",
    tag: "01 / WEB",
    title: "websites",
    icon: img.tech.websites,
    image: img.work.uautconnect,
    imageAlt: "UAUT Connect campus portal",
    sticker: img.sticker.camera,
    items: [
      "Business Websites",
      "School Websites",
      "Clinic & NGO Sites",
      "Kiswahili & English",
      "Contact & Maps",
      "Basic SEO",
      "Launch Support",
    ],
  },
  {
    bg: "#123b8f",
    fg: "#fff",
    chip: "#bfd7ff",
    tag: "02 / SYS",
    title: "apps & systems",
    icon: img.tech.apps,
    image: img.work.audenic,
    imageAlt: "Audenic audio store app",
    sticker: img.sticker.cardPhone,
    items: [
      "Web & Mobile Apps",
      "School Systems",
      "Clinic Systems",
      "Care Centre Systems",
      "Contractor Tools",
      "Offline-Friendly",
      "Training & Handover",
    ],
  },
  {
    bg: "#2563eb",
    fg: "#fff",
    chip: "#e8f1ff",
    tag: "03 / POS",
    title: "retail & pos",
    icon: img.tech.pos,
    image: img.work.faidahq,
    imageAlt: "Faida POS terminal",
    sticker: img.sticker.cardSmiley,
    items: [
      "Faida POS Setup",
      "Stock & Sales",
      "Receipts",
      "M-Pesa Records",
      "Staff Accounts",
      "Reports",
    ],
  },
  {
    bg: "#0b2545",
    fg: "#fff",
    chip: "#5b9cff",
    tag: "04 / HOST",
    title: "support & hosting",
    icon: img.tech.support,
    image: img.work.tzReach,
    imageAlt: "TZ Reach portal",
    sticker: img.sticker.hand,
    items: [
      "Hosting Setup",
      "Domain & Email",
      "Backups",
      "Security Basics",
      "Updates",
      "WhatsApp Support",
    ],
  },
];

export const MARQUEE_ITEMS = [
  "M-Pesa ready",
  "Kiswahili & English",
  "Offline-friendly",
  "POS systems",
  "School systems",
  "Clinic systems",
  "Care centre systems",
  "Support after launch",
];

export const MARQUEE_COLORS = [
  { bg: "#0a3d91", fg: "#fff" },
  { bg: "#5b9cff", fg: "#0b2545" },
  { bg: "#123b8f", fg: "#fff" },
  { bg: "#e8f1ff", fg: "#0b2545" },
  { bg: "#2f7bff", fg: "#fff" },
  { bg: "#0b2545", fg: "#fff" },
  { bg: "#bfd7ff", fg: "#0b2545" },
];

// ─── Live deployments (work carousel + work page) ───────────────────────────
export const DEPLOYMENTS = [
  {
    name: "FaidaHQ",
    desc: "Offline-first POS and retail dashboard with M-Pesa records and staff accounts.",
    url: "https://faida-hq.vercel.app/",
    img: img.work.faidahq,
    tag: "Retail · POS",
  },
  {
    name: "UAUT Connect",
    desc: "Campus and admissions portal for the United African University of Tanzania, Kigamboni.",
    url: "https://www.uautconnect.com/",
    img: img.work.uautconnect,
    tag: "Education",
  },
  {
    name: "Nike TZ Store",
    desc: "Online sneaker store with live catalogue and mobile-money checkout.",
    url: "https://niketz.vercel.app/",
    img: img.work.niketz,
    tag: "E-commerce",
  },
  {
    name: "AYMI Africa Hub",
    desc: "Pan-African youth movement hub with programs and membership.",
    url: "https://www.aymiafrica.org/",
    img: img.work.aymi,
    tag: "NGO",
  },
  {
    name: "Volta Rentals",
    desc: "Car-rental platform with fleet registry and trip calculator.",
    url: "https://volta-rentals.vercel.app/",
    img: img.work.volta,
    tag: "Booking",
  },
  {
    name: "Bongo Foodie",
    desc: "Authentic Swahili gastronomy with Chef AI, campaigns and ordering.",
    url: "https://bongofoodie.vercel.app/",
    img: img.work.bongofoodie,
    tag: "Food & ordering",
  },
  {
    name: "Audenic Audio Labs",
    desc: "Hand-tuned audio e-commerce from a Dar es Salaam studio.",
    url: "https://audenic.vercel.app/",
    img: img.work.audenic,
    tag: "E-commerce",
  },
  {
    name: "TZ Reach",
    desc: "Navigate Tanzania: investment, legal and sector intelligence.",
    url: "https://tanzaniareach.com/",
    img: img.work.tzReach,
    tag: "Portal",
  },
];

// ─── Case studies ───────────────────────────────────────────────────────────
export const WORK_CASES = [
  {
    id: "faida-pos",
    badge: "Faida POS",
    status: "Live — ask us for a demo",
    title: "Sales, stock and receipts for a retail shop in Dar es Salaam.",
    image: img.work.faidahq,
    imageAlt: "Faida POS terminal",
    problem:
      "The shop recorded sales in a counter book. Stock counts were guesses, receipts were handwritten, and M-Pesa payments were hard to match to sales at the end of the day.",
    solution:
      "Faida POS: a point of sale that records each sale, updates stock, prints receipts, keeps M-Pesa records alongside cash, and gives the owner a daily report. Staff get their own accounts.",
    scope: [
      "Sales and receipts",
      "Stock in and out",
      "M-Pesa and cash records",
      "Staff accounts",
      "Daily and weekly reports",
      "Training for shop staff",
    ],
    price: "From TSh 1,200,000. Final price is fixed in a written quote after a free discovery call.",
    timeline: "Timeline is agreed in writing before we start.",
    next: "Send us a WhatsApp and we will arrange a demo.",
    demo: { label: "Open the Faida POS demo", url: "https://faida-hq.vercel.app/" },
  },
  {
    id: "caretrack",
    badge: "CareTrack",
    status: "Live — demo uses fake data only",
    title: "Simple records for a care centre.",
    image: null,
    imageAlt: "",
    problem:
      "Children’s files lived in paper folders. Finding one record took time, reports for partners took days to prepare, and papers could get lost or damaged.",
    solution:
      "CareTrack: one place for centre records, with clear roles for staff, safe backups, and reports at the press of a button. Our public demo only ever shows invented example entries — never real children’s names, photos or details.",
    scope: [
      "Records in one place",
      "Staff roles and logins",
      "Backups",
      "One-click reports",
      "Training and handover",
    ],
    price: "Custom quote. Final price is fixed in a written quote after a free discovery call.",
    timeline: "Timeline is agreed in writing before we start.",
    next: "Send us a WhatsApp and we will walk you through the demo.",
    demo: { label: "Open the CareTrack demo", url: "https://caretrack-six.vercel.app/dashboard" },
  },
  {
    id: "shuledirect",
    badge: "ShuleDirect",
    status: "In development",
    title: "Fees, attendance and reports for schools.",
    image: null,
    imageAlt: "",
    problem:
      "Many schools track fees and attendance on paper or in scattered spreadsheets. Following up on balances is slow, and term reports take weeks.",
    solution:
      "ShuleDirect (in development): fee tracking with M-Pesa records, attendance, and reports for head teachers and parents — in Kiswahili and English, friendly on slow connections.",
    scope: [
      "Fee tracking",
      "M-Pesa records",
      "Attendance",
      "Term reports",
      "Parent messages",
      "Training for school staff",
    ],
    price: "Custom quote. Final price is fixed in a written quote after a free discovery call.",
    timeline: "Timeline is agreed in writing before we start.",
    next: "Run a school? Message us on WhatsApp and we will keep you posted.",
    demo: null,
  },
];

// ─── Blog ───────────────────────────────────────────────────────────────────
export const POSTS = [
  {
    id: "website-cost-tanzania",
    title: "How much does a website cost in Tanzania?",
    excerpt: "Web Starter, Growth and Pro Portal — what each package includes and how to choose.",
    cover: img.work.uautconnect,
    date: "2026-09-20",
    body: [
      "A business website in Tanzania typically costs between TSh 350,000 and TSh 750,000 depending on size. Our Web Starter (TSh 350,000) is a fast one-page site with WhatsApp call buttons, Google Maps and basic SEO — enough for most small businesses to be found and contacted.",
      "The Growth Business Site (TSh 550,000) adds 4 to 6 pages, a product or service catalogue, quote forms and a Google Business profile. Choose it when customers need to browse before they message you.",
      "The Pro Web Portal (TSh 750,000) adds a database, booking or customer logins, and two months of priority support. Every package ends with a fixed written quote after a free discovery call — no hidden surprises.",
    ],
  },
  {
    id: "offline-first-pos",
    title: "Why your POS must work without internet",
    excerpt: "Bundles run out, networks drop. Offline-first systems keep selling anyway.",
    cover: img.work.faidahq,
    date: "2026-10-05",
    body: [
      "In a Dar es Salaam shop, the internet drops at the worst moment — right when a queue forms at the counter. A POS that needs constant connection stops your business. An offline-first POS keeps selling, prints receipts and updates stock with zero bundles.",
      "Faida POS stores every sale on the device and syncs to the cloud automatically when the connection returns. M-Pesa records sit next to cash records, so end-of-day reconciliation takes minutes, not hours.",
      "If you run a shop, duka or restaurant, ask any POS vendor one question first: what happens when the internet goes off? If the answer is not a clear “it keeps working”, walk away.",
    ],
  },
  {
    id: "m-pesa-records",
    title: "Matching M-Pesa payments to sales, without the midnight math",
    excerpt: "Cash plus mobile money should reconcile itself. Here is how we set it up.",
    cover: img.work.bongofoodie,
    date: "2026-10-12",
    body: [
      "Most shops take both cash and M-Pesa, then the owner spends the evening matching phone messages to counter-book entries. It is slow and mistakes hide in it.",
      "The fix is simple: record every payment method against the same sale, at the moment of sale. Faida POS does this — cash, M-Pesa and totals per method appear in one daily report.",
      "Start today even without software: one column for cash, one for M-Pesa, one for the total, per sale. When the columns stop adding up by hand, come talk to us on WhatsApp.",
    ],
  },
];

export function formatDate(iso: string) {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
