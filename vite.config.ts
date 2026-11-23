import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const PRERENDER_ROUTES = [
  {
    route: 'connect',
    title: 'Connect Your Server — Paperless Companion Setup Guide',
    description:
      'Step-by-step guide to connect Paperless Companion to your self-hosted Paperless-ngx server over HTTPS, LAN, Tailscale, or Cloudflare Access.',
    canonical: 'https://paperless.milliways.si/connect',
  },
  {
    route: 'privacy',
    title: 'Privacy Policy — Paperless Companion for Paperless-ngx',
    description:
      'Zero analytics, zero tracking, and no developer servers. Learn how Paperless Companion connects directly to your own Paperless-ngx instance.',
    canonical: 'https://paperless.milliways.si/privacy',
  },
  {
    route: 'terms',
    title: 'Terms of Use — Paperless Companion for Paperless-ngx',
    description:
      'Read the Terms of Use for Paperless Companion, an independent offline-first iPhone client for your self-hosted Paperless-ngx document archive.',
    canonical: 'https://paperless.milliways.si/terms',
  },
] as const;

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function prerenderRouteHtmlPlugin(): Plugin {
  return {
    name: 'prerender-route-html',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const template = fs.readFileSync(indexHtmlPath, 'utf8');
      for (const item of PRERENDER_ROUTES) {
        const html = template
          .replace(/<title>[^<]*<\/title>/, `<title>${item.title}</title>`)
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${escapeAttr(item.description)}" />`
          )
          .replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
            `<link rel="canonical" href="${item.canonical}" />`
          )
          .replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:url" content="${item.canonical}" />`
          )
          .replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:title" content="${escapeAttr(item.title)}" />`
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${escapeAttr(item.description)}" />`
          )
          .replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:title" content="${escapeAttr(item.title)}" />`
          )
          .replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" content="${escapeAttr(item.description)}" />`
          );

        const outDir = path.join(distDir, item.route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderRouteHtmlPlugin()],
});
