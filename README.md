# Favurr. Portfolio

A modern, responsive portfolio website built with Next.js, MDX, and Tailwind CSS. Showcasing projects, blog posts, and contact features for developers and creatives.

---

## Features
- **Next.js 14 App Router** with TypeScript
- **MDX** for blog posts and project content (`content/posts` & `content/projects`)
- **Tailwind CSS** with [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) for beautiful prose
- **Dynamic routing** for posts and projects
- **Newsletter subscription** with validation (Zod, React Hook Form)
- **Dark mode** with theme toggle
- **SEO metadata** via `app/layout.tsx`
- **Custom favicon** in `public/favicon.png`
- **Responsive, accessible UI**

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure
- `app/` — Main app directory (routing, layout, pages)
- `components/` — Reusable UI and logic components
- `content/posts/` — Blog posts in MDX
- `content/projects/` — Project case studies in MDX
- `public/` — Static assets (images, favicon)
- `lib/` — Utility functions, data fetching, schemas

---

## Customization
- **Add posts:** Place `.mdx` files in `content/posts/`
- **Add projects:** Place `.mdx` files in `content/projects/`
- **Update profile:** Edit `components/intro.tsx`
- **Newsletter:** Edit `components/newsletter-form.tsx` and `lib/schemas.ts`
- **Favicon:** Replace `public/favicon.png`

---

## Tech Stack
- [Next.js](https://nextjs.org/)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Lucide Icons](https://lucide.dev/)

---

## Deployment
Deploy on [Vercel](https://vercel.com/) or your preferred platform. See [Next.js deployment docs](https://nextjs.org/docs/deployment).

---

## License
MIT
