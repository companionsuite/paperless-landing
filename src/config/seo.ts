import { SITE_CONFIG } from './site';

export interface RouteSeo {
  path: '/' | '/connect' | '/privacy' | '/terms';
  title: string;
  description: string;
  canonical: string;
}

export const ROUTE_SEO: Record<RouteSeo['path'], RouteSeo> = {
  '/': {
    path: '/',
    title: 'Paperless Companion — iOS 26 Client for Paperless-ngx',
    description:
      'Offline-first iPhone app for Paperless-ngx. Scan multi-page PDFs, save from the Share Sheet, triage your inbox, and sync directly with your server.',
    canonical: `${SITE_CONFIG.siteUrl}/`,
  },
  '/connect': {
    path: '/connect',
    title: 'Connect Your Server — Paperless Companion Setup Guide',
    description:
      'Step-by-step guide to connect Paperless Companion to your self-hosted Paperless-ngx server over HTTPS, LAN, Tailscale, or Cloudflare Access.',
    canonical: `${SITE_CONFIG.siteUrl}/connect`,
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy — Paperless Companion for Paperless-ngx',
    description:
      'Zero analytics, zero tracking, and no developer servers. Learn how Paperless Companion connects directly to your own Paperless-ngx instance.',
    canonical: `${SITE_CONFIG.siteUrl}/privacy`,
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use — Paperless Companion for Paperless-ngx',
    description:
      'Read the Terms of Use for Paperless Companion, an independent offline-first iPhone client for your self-hosted Paperless-ngx document archive.',
    canonical: `${SITE_CONFIG.siteUrl}/terms`,
  },
};

export function getRouteSeo(pathname: string): RouteSeo {
  if (pathname === '/connect' || pathname === '/setup') {
    return ROUTE_SEO['/connect'];
  }
  if (pathname === '/privacy') {
    return ROUTE_SEO['/privacy'];
  }
  if (pathname === '/terms') {
    return ROUTE_SEO['/terms'];
  }
  return ROUTE_SEO['/'];
}

export function applyRouteSeo(pathname: string): void {
  const seo = getRouteSeo(pathname);
  document.title = seo.title;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[property="og:url"]', seo.canonical);
  setMeta('meta[property="og:title"]', seo.title);
  setMeta('meta[property="og:description"]', seo.description);
  setMeta('meta[name="twitter:title"]', seo.title);
  setMeta('meta[name="twitter:description"]', seo.description);

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', seo.canonical);
  }
}
