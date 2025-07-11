This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Visite Site:
[https://fullstack-nextjs-morning.vercel.app/] 

## About sitemap

Each object in the array represents one page (URL) in your website's sitemap.

Let’s explain the keys:

| Key              | Description |
|------------------|-------------|
| `url`            | The full URL of the page. |
| `lastModified`   | Tells search engines when the page was last updated. `new Date()` sets it to the current date/time. |
| `changeFrequency`| Suggests how often this page changes: values like `'daily'`, `'weekly'`, `'monthly'`, `'yearly'`, etc. |
| `priority`       | A number from `0.0` to `1.0` that suggests the importance of the page. `1.0` = highest priority. |

---

### 🗺️ What This Does

When this function is used in Next.js under the `app` directory (like `app/sitemap.ts`), Next.js **automatically serves the sitemap at `/sitemap.xml`** during build or runtime. It generates the proper XML structure behind the scenes.

---

### ✅ Example Use Case

| Page            | Frequency | Priority |
|-----------------|-----------|----------|
| `/` (Home)      | Yearly    | 1.0      |
| `/about`        | Monthly   | 0.8      |
| `/blog`         | Weekly    | 0.5      |

This tells search engines:
- "Home doesn’t change often, but it’s important."
- "Blog updates regularly, so check it more frequently."

---

### 🛠️ When to Use

Use this `sitemap.ts` file when:
- You want **Next.js to generate a sitemap automatically**
- You want to give search engines hints on how to crawl your site

---

Let me know if you want to **generate sitemap dynamically from a list of pages or posts (e.g., blogs)** — that’s also common.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
