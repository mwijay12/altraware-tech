# Altraware Technologies — Website

The official website of **Altraware Technologies** — a Dar es Salaam–based studio building websites, web & mobile apps, and business systems for shops, schools, clinics, care centres, and NGOs across Tanzania. Kiswahili & English. M-Pesa ready. Friendly on slow connections.

- **Live site:** (Vercel URL hapa baada ya deploy)
- **Contact:** altrawaretechnology@gmail.com · +255 792 867 427 · WhatsApp: https://wa.me/255792867427
- **Hours:** Mon–Sat · 8:00–18:00 EAT · Dar es Salaam, Tanzania

---

## 🚀 What this site does

- **Agency homepage** with motion design: video hero, horizontal-words story strip, motion cards, products grid, service cards, marquee, and footer.
- **Inner pages:** About, Services, Platforms, Work (case studies), Pricing, Process, Contact, Blog.
- **Project inquiry form** (`/contact`) → saves + sends a client auto-reply and an admin alert email with a reference number (e.g. `ALT-XXXXXX`).
- **Admin console** (`/admin`) → edit hero text, services, work cases, contact info, and blog posts right in the browser — no code changes. Login via **Google account** (allowlist) or **passcode**.
- **Altra AI assistant** → floating chat widget answering visitor questions about services, pricing, and products (needs an AI API key, see env).
- **Blog** → posts editable from the admin console, rendered at `/blog/[slug]`.
- **Images** → local `/public/assets/…` or Cloudinary URLs (unsigned upload preset supported).
- **Fully mobile responsive** → stacked grids, touch-safe nav, single-column cards, and safe-area–aware widgets down to 400px screens.

---

## ✨ Key features

### 📄 Pages & content

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, story, motion cards, products, services, marquee |
| `/about` | Who we are, how we work |
| `/services` | Service catalogue (websites, apps & systems, retail & POS, support & hosting) |
| `/platforms` | Our products: Faida POS, CareTrack, ShuleDirect |
| `/work` | Case studies with problem → solution → scope → price |
| `/pricing` | Web Starter / Growth / Pro Portal packages in TSh |
| `/process` | Discovery → build → launch → support steps |
| `/contact` | Inquiry form, contact cards, Google Maps embed |
| `/blog`, `/blog/[slug]` | Articles, editable from admin |
| `/admin` | Admin console (Google login or passcode) |

### 🔐 Admin console & login

- **Google login (Firebase):** allowed Gmail addresses listed in `ADMIN_EMAILS` sign in with one click. Server sets the same `altraware_admin` session cookie the passcode flow uses.
- **Passcode fallback:** `ADMIN_MASTER_KEY` from `.env.local`.
- **Sign out** clears both the Firebase session and the server cookie.
- Without Firebase env vars, the console shows a setup hint and passcode login keeps working — nothing breaks.

### 💬 Altra assistant (`/api/chat`)

Server route with **fallback AI providers**: Inception Labs first, Agnes AI second. Configure either or both keys; the widget degrades gracefully when none is set.

### 📨 Inquiries (`/api/inquiries`)

Validates name + phone, generates a reference code, sends:
1. **Client auto-reply** (if they gave an email), and
2. **Admin alert** to `ADMIN_NOTIFICATION_EMAIL`.
Works without SMTP too — the inquiry still returns a reference, emails just report `SMTP_NOT_CONFIGURED`.

### 🎭 Motion & UX

- GSAP + ScrollTrigger animations, Lenis smooth scroll, custom cursor bubble, page-wipe transitions, kinetic fullscreen menu, scroll-drawn SVG underlines, elastic cards and stickers.
- All animation copy and content defaults live in `lib/site-content.js` and `lib/data.js` — editable from `/admin` (saved to `localStorage`, merged over defaults).

---

## 🛠️ Tech stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework, routing, API routes |
| **React 19** | UI components |
| **Vanilla CSS** (modular partials) | Design system via CSS variables — no Tailwind |
| **GSAP + ScrollTrigger** | Animations and scroll effects |
| **Lenis** | Smooth scrolling |
| **Firebase Auth** | Google sign-in for the admin console |
| **Nodemailer (SMTP)** | Inquiry auto-reply + admin alerts |
| **Cloudinary** (optional) | Image hosting via unsigned upload preset |

---

## 📦 Project structure

```text
altraware-tech/
├── app/
│   ├── page.jsx               # Homepage assembly
│   ├── layout.jsx             # Root layout, footer, AI widget, menus
│   ├── globals.css            # Entry point — imports all style partials
│   ├── styles/                # Modular CSS (base, navbar, hero, cards, …)
│   ├── about|services|platforms|work|pricing|process|contact/  # Inner pages
│   ├── blog/ & blog/[slug]/   # Blog index + post pages
│   ├── admin/                 # Admin console (client)
│   └── api/
│       ├── admin/session/     # Login (passcode + Google), session check, logout
│       ├── inquiries/         # Inquiry form → emails
│       └── chat/              # Altra AI assistant (Inception → Agnes fallback)
├── components/
│   ├── FirebaseAuth.jsx       # Google sign-in button + session handoff
│   ├── InquiryForm.jsx        # Project brief form
│   ├── AiAssistant.jsx        # Floating chat widget
│   ├── Navbar.jsx / InnerNav.jsx / KineticMenu.jsx
│   ├── VimeoHero.jsx / HeroTrail.jsx / MotionCards.jsx / ServiceCards.jsx
│   ├── Showreel.jsx / DoubleMarquee.jsx / HorizontalWords.jsx
│   └── Footer.jsx / CursorBubble.jsx / PageWipe.jsx / …
├── lib/
│   ├── site-content.js        # Editable content defaults (hero, services, work, posts, contact)
│   ├── data.js                # Static data (brands, cards, icons, animation config)
│   ├── firebase.js            # Firebase client init (Google provider)
│   ├── email.js               # Nodemailer transporter + inquiry emails
│   └── cloudinary.js          # Cloudinary URL + unsigned browser upload
├── public/
│   ├── assets/                # Images, stickers, logos, SVGs
│   └── fonts/                 # Self-hosted DM Sans + Epilogue
├── .env.example               # All env vars (copy to .env.local)
├── next.config.mjs            # `@/` import alias
└── package.json
```

---

## ⚙️ Setup & installation

Needs **Node.js 18+**.

1. **Clone:**
   ```bash
   git clone https://github.com/mwijay12/altraware-tech.git
   cd altraware-tech
   ```

2. **Install:**
   ```bash
   npm install
   ```

3. **Configure env:**
   ```bash
   copy .env.example .env.local
   ```
   Then fill in `.env.local` (see table below) and **restart** the dev server after any change.

4. **Run:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 · Admin at http://localhost:3000/admin

5. **Build / start:**
   ```bash
   npm run build
   npm start
   ```

---

## 🔑 Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `INCEPTION_API_KEY` (or `INCEPTION_API_KEYS`) | server | Altra chat — primary AI provider |
| `AGNES_API_KEY` (or `AGNES_API_KEYS`) | server | Altra chat — fallback provider |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | server | Gmail SMTP (use a 16-digit **App Password**) |
| `SMTP_FROM` / `ADMIN_NOTIFICATION_EMAIL` | server | Sender name + inbox for new-inquiry alerts |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | client | Unsigned image uploads (optional) |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | server | Server-side Cloudinary signing (optional) |
| `ADMIN_MASTER_KEY` | server | Passcode for `/admin` — long and secret |
| `ADMIN_EMAILS` | server | Comma-separated Gmails allowed via Google login, e.g. `you@gmail.com,partner@gmail.com` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` / `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` / `NEXT_PUBLIC_FIREBASE_PROJECT_ID` / `NEXT_PUBLIC_FIREBASE_APP_ID` | client | Firebase web-app config for Google sign-in |

> Never commit `.env.local`. `.env.example` is the template — secrets stay out of git (see `.gitignore`).

### Firebase Google login — one-time setup

1. [Firebase Console](https://console.firebase.google.com) → create project → **Build → Authentication → Sign-in method → enable Google**.
2. **Authentication → Settings → Authorized domains** → add `localhost` and your Vercel domain (e.g. `altraware-tech.vercel.app`).
3. **Project settings → Your apps → Web app** → copy the config values into `.env.local` (`NEXT_PUBLIC_FIREBASE_*`).
4. Set `ADMIN_EMAILS` to the Gmail(s) allowed into `/admin`.
5. Restart `npm run dev`. On Vercel, add the same variables under **Settings → Environment Variables** and redeploy.

---

## 🖥️ Using the admin console

1. Open `/admin`.
2. Sign in with an allowed **Google account**, or enter the **passcode** (`ADMIN_MASTER_KEY`).
3. Edit sections (Hero, Motion, Home service cards, Work cases, Contact info, Blog posts) → **Save** per section. Changes apply to the browser immediately via `localStorage` (`altraware-site-content-v1`).
4. **Reset everything** restores the defaults from `lib/site-content.js`.
5. Images: paste a `/assets/…` path or any `https://` image (Cloudinary) URL.

> Note: edits save per-browser (localStorage), not to the codebase. To change defaults for everyone, edit `lib/site-content.js` and deploy.

---

## ☁️ Deployment (Vercel)

1. Push to `main` — or import the repo in Vercel directly.
2. Add **all** needed env vars (server + `NEXT_PUBLIC_*`) in Vercel → Settings → Environment Variables.
3. Deploy. No build config needed (`npm run build` is the default).

---

## 📞 Contact

**Altraware Technologies** — Dar es Salaam, Tanzania
- Email: altrawaretechnology@gmail.com
- Phone/WhatsApp: +255 792 867 427 · +255 790 942 616
- Hours: Mon–Sat · 8:00–18:00 EAT

## 📄 License

© Altraware Technologies. All rights reserved. This repository powers our official website — please don't reuse our copy, images, or brand assets without permission.
