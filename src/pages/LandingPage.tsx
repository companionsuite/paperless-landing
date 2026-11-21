import React from 'react';
import {
  Camera,
  CheckCircle2,
  Download,
  FolderLock,
  Github,
  Mail,
  Search,
  Server,
  Shield,
  Tags,
  WifiOff,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const FEATURES = [
  {
    icon: Server,
    title: 'Direct & Private Connection',
    description:
      'Connects directly to your own self-hosted Paperless-ngx server over LAN, Tailscale, or HTTPS reverse proxies—with support for Cloudflare Access and custom headers.',
  },
  {
    icon: WifiOff,
    title: 'Offline-First Vault & Outbox',
    description:
      'Pin critical PDFs to your on-device Offline Vault for zero-signal access. Scan and edit metadata offline; changes queue in your Outbox and sync when your server returns.',
  },
  {
    icon: Camera,
    title: 'Multi-Page PDF Scanner',
    description:
      'Capture paper receipts and letters with your iPhone camera, import existing photos or PDFs, reorder pages, apply scan enhancement, and compile PDFs on-device.',
  },
  {
    icon: Search,
    title: 'Instant Search & Saved Views',
    description:
      'Search cached titles, OCR text, ASNs, tags, and correspondents instantly—or query your remote Paperless-ngx server with Saved Views and bulk metadata editing.',
  },
  {
    icon: Tags,
    title: 'Full Taxonomy Management',
    description:
      'Create and edit Tags, Correspondents, Document Types, Storage Paths, and Custom Fields, plus toggle Workflows and Mail Rules right from Settings.',
  },
  {
    icon: FolderLock,
    title: 'Zero Tracking, Private by Design',
    description:
      'No developer servers, no analytics, and no ads. Your credentials and documents stay between your iPhone and your own Paperless-ngx instance.',
  },
] as const;

const SCREENSHOTS = [
  {
    src: '/screenshots/01-inbox.png',
    alt: 'Paperless Companion Inbox Dashboard showing Archive, Vault, and Inbox counts',
    caption: 'Inbox & Vault Overview',
  },
  {
    src: '/screenshots/02-documents.png',
    alt: 'Paperless Companion Archive & Search with tags, correspondents, and saved views',
    caption: 'Archive & Instant Search',
  },
  {
    src: '/screenshots/03-detail.png',
    alt: 'Paperless Companion Document Detail view with PDF preview and metadata editor',
    caption: 'PDF Preview & Metadata',
  },
  {
    src: '/screenshots/04-scan.png',
    alt: 'Paperless Companion Multi-page PDF scanner and metadata review',
    caption: 'Multi-Page Scanner',
  },
] as const;

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-50)] px-3.5 py-1 text-xs font-medium text-[var(--accent-600)] dark:text-[var(--accent-400)]">
                <Shield className="h-3.5 w-3.5" />
                iOS Companion for Paperless-ngx
              </div>

              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-5xl">
                Your Paperless-ngx archive, everywhere.
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-[var(--ink-secondary)]">
                An offline-first iOS client for your self-hosted Paperless-ngx server. Scan
                multi-page PDFs, triage your inbox, edit metadata, and keep critical records pinned
                in your Offline Vault.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={SITE_CONFIG.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-600)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-700)]"
                >
                  <Download className="h-4 w-4" />
                  Download on App Store
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-1)] px-5 py-3 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-2)]"
                >
                  Explore Features
                </a>
                <a
                  href="/connect"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/connect');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-1)] px-5 py-3 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-2)]"
                >
                  How to Connect
                </a>
              </div>

              <ul className="mt-8 grid gap-2.5 text-sm text-[var(--ink-secondary)] sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  Talks only to your server
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  Works over Tailscale &amp; CF Access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  Offline Vault &amp; Outbox queue
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  No analytics or tracking
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="mx-auto grid max-w-md grid-cols-2 gap-4 sm:max-w-lg sm:gap-5">
                <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] shadow-md">
                  <img
                    src="/screenshots/01-inbox.png"
                    alt="Paperless Companion Inbox Dashboard"
                    className="h-auto w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] shadow-md">
                  <img
                    src="/screenshots/02-documents.png"
                    alt="Paperless Companion Documents Search"
                    className="h-auto w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-3xl">
            Built for self-hosted Paperless-ngx workflows
          </h2>
          <p className="mt-3 text-base text-[var(--ink-secondary)]">
            Fast mobile triage, reliable offline queuing, and full taxonomy parity without giving up
            control of your documents.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 transition hover:border-[var(--border-strong)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-50)] text-[var(--accent-600)] dark:text-[var(--accent-400)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-[var(--ink-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Screenshots */}
      <section
        id="screenshots"
        className="border-y border-[var(--border-subtle)] bg-[var(--bg-surface-1)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-3xl">
              Designed for iPhone
            </h2>
            <p className="mt-3 text-base text-[var(--ink-secondary)]">
              Captured directly from the Paperless Companion iOS app using demo workspace data.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SCREENSHOTS.map((shot) => (
              <figure key={shot.src} className="flex flex-col">
                <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] shadow-sm">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm font-medium text-[var(--ink-secondary)]">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Contact */}
      <section id="support" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
                Support &amp; Contact
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)]">
                Need help connecting your Paperless-ngx instance, configuring reverse-proxy headers,
                or reporting a bug? Reach out via email or open an issue on GitHub.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => onNavigate('/connect')}
                  className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
                >
                  How to Connect
                </button>
                <span className="text-[var(--ink-muted)]">&middot;</span>
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
                >
                  Privacy Policy
                </button>
                <span className="text-[var(--ink-muted)]">&middot;</span>
                <button
                  type="button"
                  onClick={() => onNavigate('/terms')}
                  className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
                >
                  Terms of Use
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4">
              {SITE_CONFIG.supportEmail && (
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-600)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-700)]"
                >
                  <Mail className="h-4 w-4" />
                  {SITE_CONFIG.supportEmail}
                </a>
              )}
              <a
                href={`${SITE_CONFIG.issuesRepoUrl}/issues`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-2)] px-5 py-3 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-3)]"
              >
                <Github className="h-4 w-4" />
                GitHub Issues
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
