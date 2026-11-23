import React from 'react';
import {
  ArrowRight,
  Camera,
  ChevronDown,
  Download,
  Github,
  Inbox,
  Mail,
  Search,
  Shield,
  WifiOff,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

interface PhoneShot {
  src: string;
  alt: string;
  label?: string;
}

interface IPhoneFrameProps extends PhoneShot {
  eager?: boolean;
  className?: string;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  src,
  alt,
  label,
  eager = false,
  className = '',
}) => (
  <figure className={`flex flex-col items-center ${className}`}>
    <div className="w-full rounded-[2.25rem] bg-[#161a24] p-2 shadow-xl ring-1 ring-black/15 dark:bg-[#0b0e15] dark:ring-white/15 sm:rounded-[2.5rem] sm:p-2.5">
      <div className="relative overflow-hidden rounded-[1.8rem] bg-black sm:rounded-[2rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-2 left-1/2 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/10 sm:h-4 sm:w-20"
        />
        <img
          src={src}
          alt={alt}
          className="block h-auto w-full object-cover"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
    </div>
    {label && (
      <figcaption className="mt-3 text-center text-xs font-medium tracking-wide text-[var(--ink-muted)] sm:text-sm">
        {label}
      </figcaption>
    )}
  </figure>
);

const CHAPTERS = [
  {
    id: 'inbox-triage',
    eyebrow: 'Inbox Triage',
    icon: Inbox,
    title: 'Clear your inbox in seconds.',
    description:
      'Review incoming documents with one-tap Paperless classifier suggestions for correspondents, document types, and tags. Inspect inline PDFs, OCR text, notes, custom fields, and taxonomies right from the detail view.',
    chips: [
      'Classifier Suggestions',
      'Accept & Done',
      'Inline PDF Preview',
      'OCR Text & Notes',
      'Bulk Editing',
      'Taxonomies & Custom Fields',
    ],
    shots: [
      {
        src: '/screenshots/01-inbox.webp',
        alt: 'Paperless Companion Inbox tab showing incoming PDFs with Paperless classifier suggestion chips and Accept & Done buttons',
        label: 'Inbox Triage',
      },
      {
        src: '/screenshots/03-detail.webp',
        alt: 'Paperless Companion Document Detail view with inline PDF preview, Fullscreen button, Details/Content/Notes/Access tabs, and metadata editor',
        label: 'PDF Preview & Metadata',
      },
    ],
    layout: 'split-right' as const,
  },
  {
    id: 'search-saved-views',
    eyebrow: 'Search & Saved Views',
    icon: Search,
    title: 'Find any document, light or dark.',
    description:
      'Filter your archive with the horizontal filter bar, 12 sort options, full-text PDF search, and Saved Views or Quick Presets. Built natively for iOS 26 Liquid Glass with Light and Dark modes plus iOS Spotlight indexing.',
    chips: [
      'Saved Views & Quick Presets',
      '12 Sort Options',
      'Full-Text PDF Search',
      'iOS Spotlight Indexing',
      'iOS 26 Liquid Glass',
      'Light & Dark Mode',
    ],
    shots: [
      {
        src: '/screenshots/02-documents.webp',
        alt: 'Paperless Companion Documents tab in Light Mode with search field, horizontal filter pills, sort selector, and 2-column PDF grid',
        label: 'Light Mode',
      },
      {
        src: '/screenshots/08-dark-documents.webp',
        alt: 'Paperless Companion Documents tab in Dark Mode showing the 2-column PDF grid, colored tags, and dark Liquid Glass filter bar',
        label: 'Dark Mode',
      },
      {
        src: '/screenshots/05-saved-views.webp',
        alt: 'Paperless Companion Custom Queries tab showing Quick Presets and Saved Views with filter rule counts',
        label: 'Saved Views',
      },
    ],
    layout: 'spotlight-three' as const,
  },
  {
    id: 'multi-page-scanner',
    eyebrow: 'Multi-Page Scanner',
    icon: Camera,
    title: 'Scan, compress, and upload from anywhere.',
    description:
      'Capture paper documents with your iPhone camera or import photos and PDFs. Reorder, rotate, crop, apply grayscale, and compress PDFs on-device before uploading—or send files from any app via the Share Extension and Siri Shortcuts.',
    chips: [
      'Multi-Page Camera Scan',
      'Rotate & Crop',
      'On-Device Compression',
      'Grayscale Filter',
      'Share Extension',
      'Siri Shortcuts',
    ],
    shots: [
      {
        src: '/screenshots/04-scan.webp',
        alt: 'Paperless Companion Multi-page Scanner review sheet with page thumbnails, Rotate/Crop controls, quality presets, and Grayscale toggle',
        label: 'Scanner & Compression',
      },
    ],
    layout: 'split-left' as const,
  },
  {
    id: 'offline-private',
    eyebrow: 'Offline-First & Private',
    icon: WifiOff,
    title: 'Works offline. Talks only to your server.',
    description:
      'Pin essential PDFs for offline access, queue scans in the Upload Outbox, and stage metadata edits in Pending Changes until your server returns. Connect over LAN, Tailscale, or Cloudflare Access with trusted self-signed certs, Face ID lock, Trash management, and zero telemetry.',
    chips: [
      'Offline Pinning',
      'Upload Outbox & Pending Changes',
      'Tailscale & Cloudflare Access',
      'Self-Signed Certificates',
      'Face ID / Passcode Lock',
      'Trash & Zero Telemetry',
    ],
    shots: [
      {
        src: '/screenshots/06-offline-mode.webp',
        alt: 'Paperless Companion Documents grid in Offline Mode showing the cached archive banner and blue pin badges on pinned documents',
        label: 'Offline Pinning',
      },
      {
        src: '/screenshots/07-settings.webp',
        alt: 'Paperless Companion Settings tab showing Pending Changes queue, Manage Taxonomies, Trash, Offline Storage, and App Lock',
        label: 'Queues & App Lock',
      },
    ],
    layout: 'split-right' as const,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: 'How does Paperless Companion connect to my Paperless-ngx server?',
    answer:
      'It connects directly from your iPhone to your self-hosted Paperless-ngx instance over your local network, an HTTPS reverse proxy, Tailscale, or Cloudflare Access—with support for custom proxy headers and trusted self-signed certificates.',
    hasConnectLink: true,
  },
  {
    question: 'Which devices and iOS versions are supported?',
    answer:
      'Paperless Companion is built natively for iPhone on iOS 26 with Liquid Glass. It is an iPhone-only app.',
  },
  {
    question: 'What happens when I scan or edit documents offline?',
    answer:
      'Pinned documents stay readable in your offline cache. New scans wait in the Upload Outbox and metadata edits queue in Pending Changes, syncing automatically once your server is reachable again.',
  },
  {
    question: 'Does the app collect analytics or route documents through third-party servers?',
    answer:
      'No. There are zero developer servers, zero analytics, and zero telemetry. Credentials and documents stay strictly between your iPhone and your server, protected optionally by Face ID, Touch ID, or Passcode lock.',
  },
  {
    question: 'Can I import from other apps or automate workflows on iPhone?',
    answer:
      'Yes. You can send PDFs and images straight from any app using the iOS Share Extension, automate actions with Siri Shortcuts, and locate synced documents from iOS Spotlight search.',
  },
] as const;

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-6 sm:space-y-10 sm:px-6 sm:py-10">
      {/* Hero Sheet */}
      <section className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent-600)] dark:text-[var(--accent-400)]">
              <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Native iOS 26 Client for Paperless-ngx</span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Your Paperless-ngx archive, everywhere.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
              An offline-first iPhone app for your self-hosted Paperless-ngx server. Scan and
              compress multi-page PDFs, triage your inbox with classifier suggestions, and keep key
              documents pinned offline.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={SITE_CONFIG.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-600)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-700)]"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Download on App Store</span>
              </a>
              <a
                href="/connect"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/connect');
                }}
                className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[var(--ink-secondary)] transition hover:text-[var(--accent-600)] dark:hover:text-[var(--accent-400)]"
              >
                <span>How to Connect</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-6 text-xs font-medium tracking-wide text-[var(--ink-muted)] sm:text-sm">
              iPhone &middot; iOS 26 Liquid Glass &middot; Talks only to your server &middot; Zero
              tracking
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="mx-auto grid max-w-md grid-cols-2 items-start gap-4 sm:max-w-lg sm:gap-6">
              <IPhoneFrame
                src="/screenshots/01-inbox.webp"
                alt="Paperless Companion Inbox tab with classifier suggestions"
                eager
              />
              <IPhoneFrame
                src="/screenshots/02-documents.webp"
                alt="Paperless Companion Documents grid with filter bar"
                eager
                className="mt-6 sm:mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Chapters */}
      <div id="features" className="space-y-6 sm:space-y-10">
        {CHAPTERS.map((chapter) => {
          const Icon = chapter.icon;

          if (chapter.layout === 'spotlight-three') {
            return (
              <section
                key={chapter.id}
                id={chapter.id}
                className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
              >
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-semibold text-[var(--accent-600)] dark:text-[var(--accent-400)]">
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{chapter.eyebrow}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                    {chapter.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {chapter.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-[var(--bg-surface-2)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-secondary)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
                  {chapter.shots.map((shot) => (
                    <IPhoneFrame
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt}
                      label={shot.label}
                      className="mx-auto w-full max-w-[260px] sm:max-w-none"
                    />
                  ))}
                </div>
              </section>
            );
          }

          const isSingleShot = chapter.shots.length === 1;
          const textFirst = chapter.layout === 'split-right';

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
            >
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div
                  className={`lg:col-span-5 ${textFirst ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-semibold text-[var(--accent-600)] dark:text-[var(--accent-400)]">
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{chapter.eyebrow}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                    {chapter.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {chapter.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-[var(--bg-surface-2)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-secondary)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`lg:col-span-7 ${textFirst ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  {isSingleShot ? (
                    <IPhoneFrame
                      src={chapter.shots[0].src}
                      alt={chapter.shots[0].alt}
                      label={chapter.shots[0].label}
                      className="mx-auto w-full max-w-[280px] sm:max-w-[300px]"
                    />
                  ) : (
                    <div className="mx-auto grid max-w-lg grid-cols-2 items-start gap-4 sm:max-w-xl sm:gap-6">
                      {chapter.shots.map((shot, idx) => (
                        <IPhoneFrame
                          key={shot.src}
                          src={shot.src}
                          alt={shot.alt}
                          label={shot.label}
                          className={idx === 1 ? 'mt-6 sm:mt-8' : ''}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* FAQ */}
      <section
        id="faq"
        className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-600)] uppercase dark:text-[var(--accent-400)]">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
              Common questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Everything self-hosters ask about connecting, scanning, and staying offline.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-8">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl bg-[var(--bg-surface-2)] px-5 py-4 transition"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-[var(--ink-primary)] [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {item.answer}
                  {'hasConnectLink' in item && item.hasConnectLink && (
                    <>
                      {' '}
                      <a
                        href="/connect"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('/connect');
                        }}
                        className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
                      >
                        Read the connection guide
                      </a>
                      .
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Repeat App Store CTA */}
      <section className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-12 text-center shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-16">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
            Your archive, always in your pocket.
          </h2>
          <p className="mt-4 text-base text-[var(--ink-secondary)]">
            Native iPhone client for iOS 26. Direct to your Paperless-ngx server, with offline
            pinning and zero tracking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={SITE_CONFIG.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-600)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-700)]"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Download on App Store</span>
            </a>
            <a
              href="/connect"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/connect');
              }}
              className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[var(--ink-secondary)] transition hover:text-[var(--accent-600)] dark:hover:text-[var(--accent-400)]"
            >
              <span>How to Connect</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Support & Contact */}
      <section
        id="support"
        className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
              Support &amp; Contact
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)]">
              Need help connecting your Paperless-ngx instance, configuring reverse-proxy headers,
              or reporting a bug? Reach out via email or open an issue on GitHub.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <a
                href="/connect"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/connect');
                }}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                How to Connect
              </a>
              <span aria-hidden="true" className="text-[var(--ink-muted)]">
                &middot;
              </span>
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/privacy');
                }}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                Privacy Policy
              </a>
              <span aria-hidden="true" className="text-[var(--ink-muted)]">
                &middot;
              </span>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/terms');
                }}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                Terms of Use
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4">
            {SITE_CONFIG.supportEmail && (
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-600)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-700)]"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.supportEmail}</span>
              </a>
            )}
            <a
              href={`${SITE_CONFIG.issuesRepoUrl}/issues`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-2)] px-5 py-3 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-3)]"
            >
              <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>GitHub Issues</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
