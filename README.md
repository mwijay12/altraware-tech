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

The Firebase client and the contact endpoint read configuration at runtime. Copy the values used in `lib/` into your own environment before running against a different Firebase project — do not commit real keys.

## Deployment

Deployed on Vercel; every push to the default branch produces a preview, and the production domain is `altraware-tech.vercel.app`.

## Licence

See [LICENSE](LICENSE).
