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
      'Connects directly to your own self-hosted Paperless-ngx server over LAN, Tailscale, or HTTPS reverse proxies—with support for Cloudflare Access, custom proxy headers, and trusted self-signed certificates.',
  },
  {
    icon: WifiOff,
    title: 'Offline Mode, Pinning & Queues',
    description:
      'Pin critical PDFs for offline access and browse your cached archive when signal drops. Queue scans in the Upload Outbox and metadata edits in Pending Changes—everything syncs when your server returns.',
  },
  {
    icon: Camera,
    title: 'Multi-Page Scanner & Compression',
    description:
      'Scan paper documents with your iPhone camera or import photos and PDFs. Reorder, rotate, crop, apply grayscale, and shrink PDFs on-device before uploading—plus import from any app via the Share Extension or Siri Shortcuts.',
  },
  {
    icon: Search,
    title: 'Inbox Triage, Search & Saved Views',
    description:
      'Triage your Inbox with one-tap Paperless classifier suggestions. Browse with the horizontal filter bar, 12 sort options, Saved Views, bulk editing, full-text PDF search, OCR text, notes, and iOS Spotlight indexing.',
  },
  {
    icon: Tags,
    title: 'Taxonomies & Trash Management',
    description:
      'Create and edit Tags, Correspondents, Document Types, and Storage Paths right from Settings. Filter and edit Custom Field values on documents, and restore or permanently clear soft-deleted items in Trash.',
  },
  {
    icon: FolderLock,
    title: 'App Lock & Zero Tracking',
    description:
      'Protect the app and extensions with Face ID, Touch ID, or Passcode. No developer servers, no analytics, and no ads—your credentials and documents stay between your iPhone and your server.',
  },
] as const;

const SCREENSHOTS = [
  {
    src: '/screenshots/01-inbox.webp',
    alt: 'Paperless Companion Inbox tab showing incoming PDFs with Paperless classifier suggestion chips and Accept & Done buttons',
    caption: 'Inbox Triage & Suggestions',
  },
  {
    src: '/screenshots/02-documents.webp',
    alt: 'Paperless Companion Documents tab with search field, horizontal filter pills, sort selector, and 2-column PDF grid',
    caption: 'Documents & Filter Bar',
  },
  {
    src: '/screenshots/03-detail.webp',
    alt: 'Paperless Companion Document Detail view with inline PDF preview, Fullscreen button, Details/Content/Notes/Access tabs, and metadata editor',
    caption: 'PDF Preview & Metadata',
  },
  {
    src: '/screenshots/04-scan.webp',
    alt: 'Paperless Companion Multi-page Scanner review sheet with page thumbnails, Rotate/Crop controls, quality presets, and Grayscale toggle',
    caption: 'Multi-Page Scanner & Compression',
  },
  {
    src: '/screenshots/05-saved-views.webp',
    alt: 'Paperless Companion Custom Queries tab showing Quick Presets and Saved Views with filter rule counts',
    caption: 'Saved Views & Quick Presets',
  },
  {
    src: '/screenshots/06-offline-mode.webp',
    alt: 'Paperless Companion Documents grid in Offline Mode showing the cached archive banner and blue pin badges on pinned documents',
    caption: 'Offline Mode & Pinned Docs',
  },
  {
    src: '/screenshots/07-settings.webp',
    alt: 'Paperless Companion Settings tab showing Pending Changes queue, Manage Taxonomies, Trash, Offline Storage, and App Lock',
    caption: 'Settings, Taxonomies & App Lock',
  },
  {
    src: '/screenshots/08-dark-documents.webp',
    alt: 'Paperless Companion Documents tab in Dark Mode showing the 2-column PDF grid, colored tags, and dark Liquid Glass filter bar',
    caption: 'Native Dark Mode',
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
                An offline-first iOS client for your self-hosted Paperless-ngx server. Scan and
                compress multi-page PDFs, triage your inbox with classifier suggestions, edit
                metadata, and keep key documents pinned for offline access.
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
                  Offline pinning &amp; sync queues
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  Face ID lock &amp; zero tracking
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="mx-auto grid max-w-md grid-cols-2 gap-4 sm:max-w-lg sm:gap-5">
                <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] shadow-md">
                  <img
                    src="/screenshots/01-inbox.webp"
                    alt="Paperless Companion Inbox tab with classifier suggestions"
                    className="h-auto w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] shadow-md">
                  <img
                    src="/screenshots/02-documents.webp"
                    alt="Paperless Companion Documents grid with filter bar"
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
              Captured directly from the Paperless Companion iOS app using sample workspace data.
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
