# friend-portfolio

Personal portfolio of **Aksa Biju**. Built with Next.js (App Router), GSAP and WebGL, deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Edit content

All text, links and data live in **`lib/content.ts`**. Change it there and every section updates.
Anything in `[square brackets]` is a placeholder. Leave a URL as `""` to hide that link.

## Files to replace

| File | What |
|---|---|
| `public/portrait.webp` | portrait, 1000x1150 (currently a placeholder) |
| `public/bg.jpg` | square portrait for link previews, 1280x1280 (currently a placeholder) |
| `public/case-study.png`, `public/project-1.png`, `public/project-2.png`, `public/project-3.png` | project images (placeholders) |
| `public/aksa-cv.pdf` | optional CV. Then set `cvUrl: "/aksa-cv.pdf"` in `lib/content.ts` |

## Open TODOs

- Email, location and LinkedIn URL in `lib/content.ts` (`person`, `socials`)
- Job titles, dates and duties for HDFC Bank and SUD Life (`journey`)
- Skills, projects and case study text
- Bio lead line and contact blurb

## Deploy (Vercel)

1. Vercel → Add New → Project → import `akashpm1458/friend-portfolio` (framework is detected automatically).
2. For the **Ask AI** chat, add an environment variable in Project → Settings → Environment Variables:
   `GOOGLE_GENERATIVE_AI_API_KEY` = your key from https://aistudio.google.com/apikey
   (optional `GEMINI_MODEL`, default `gemini-2.5-flash`). Without it the chat shows an "offline" message.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to the final domain (used for SEO tags).

Every push to `main` redeploys automatically.

## Structure

```
app/            layout (fonts, theme, SEO), page, api/chat route
components/     one file per section (NavPill, Hero, About, Skills, Projects, Experience, Contact, Footer, ChatWidget)
lib/            content.ts (all data), hashNav.ts
styles/         one stylesheet per section
```
