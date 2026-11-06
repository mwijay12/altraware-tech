# Altraware Technologies — Company Site

The public site for **Altraware Technologies**, a software studio in Dar es Salaam building web platforms, business systems and automation for East African organisations.

**Live:** [altraware-tech.vercel.app](https://altraware-tech.vercel.app)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Animation | GSAP + Lenis (smooth scroll) |
| Backend services | Firebase (Firestore, Auth) |
| Contact | Nodemailer |

## Structure

```
app/          routes, layouts and metadata
components/   section and UI components
lib/          shared helpers and Firebase client setup
public/       images, icons and static assets
```

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # lint
```

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need — every feature
degrades gracefully when its variables are blank:

```bash
cp .env.example .env.local
```

| Feature | Variables |
|---|---|
| Admin login | `ADMIN_EMAILS`, `ADMIN_MASTER_KEY`, `ADMIN_SESSION_SECRET` |
| Google sign-in | `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_API_KEY` |
| Inquiry email | `SMTP_*`, `ADMIN_NOTIFICATION_EMAIL` |
| AI assistant | `INCEPTION_API_KEYS`, `AGNES_API_KEYS` |
| Canonical URL | `NEXT_PUBLIC_SITE_URL` |

Never commit real keys — `.env*` is git-ignored.

### Admin access

`/admin` accepts either an allowed Google account or `ADMIN_MASTER_KEY`.

Google sign-in sends a Firebase ID token, which the server verifies with Google
before trusting the email inside it. The session cookie is HMAC-signed with
`ADMIN_SESSION_SECRET`; edit the cookie and the session is rejected.

Set `ADMIN_SESSION_SECRET` to a random value in production:

```bash
openssl rand -hex 32
```

Note: admin edits are stored in the browser's `localStorage`, so they apply to
that browser only and are not shared with visitors or other devices.

## Deployment

Deployed on Vercel; every push to the default branch produces a preview, and the production domain is `altraware-tech.vercel.app`.

## Licence

See [LICENSE](LICENSE).
