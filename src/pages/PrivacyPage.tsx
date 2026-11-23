import React from 'react';
import { Lock, Server, HardDrive, Camera, Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-medium text-[var(--accent-600)] dark:text-[var(--accent-400)]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Privacy Policy
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Effective date: November 21, 2026 &middot; App: {SITE_CONFIG.appName} ({SITE_CONFIG.bundleId})
        </p>
      </div>

      <div className="space-y-8 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Lock className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            1. Zero Developer Collection &amp; No Analytics
          </h2>
          <p className="mt-3">
            {SITE_CONFIG.appName} is built for private, self-hosted document archives. We do not operate any
            developer backend that collects, stores, or inspects your documents, credentials, or usage
            activity. The app contains <strong>no third-party analytics, no advertising SDKs, and no
            telemetry or crash-tracking trackers</strong>.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Server className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            2. Direct Connection to Your Self-Hosted Paperless-ngx Server
          </h2>
          <p className="mt-3">
            In the iOS app, network requests go <strong>only</strong> to the Paperless-ngx server URL you
            explicitly configure (along with any custom HTTP proxy headers you add, such as Cloudflare Access
            service tokens).
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>
              <strong>Username &amp; Password Login:</strong> If you sign in with a username and password,
              credentials are sent once to your Paperless-ngx server&apos;s <code>/api/token/</code> endpoint
              to obtain a DRF API token. Your password is never stored by the app.
            </li>
            <li>
              <strong>API Token &amp; Custom Headers:</strong> Your Paperless-ngx API token and any custom
              headers are stored locally on your device solely to authenticate requests to your server.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <HardDrive className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            3. On-Device Storage &amp; Offline Cache
          </h2>
          <p className="mt-3">
            To support offline browsing, scanning, and queuing, {SITE_CONFIG.appName} stores your configuration,
            synced taxonomy (tags, correspondents, document types, storage paths, custom fields), cached
            document metadata, queued Outbox PDFs, and pinned offline PDFs locally on your device using
            IndexedDB and browser/app local storage. Deleting the app or resetting to the Demo Sandbox clears
            this local data.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Camera className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            4. Camera &amp; Photo Library Permissions
          </h2>
          <p className="mt-3">
            {SITE_CONFIG.appName} requests Camera and Photo Library access only when you choose to scan paper
            documents or import existing photos/PDFs. Captured images are compiled into PDFs directly on your
            device and uploaded only to your configured Paperless-ngx server (or held in your local Outbox
            while offline).
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Sparkles className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            5. Optional AI Taxonomy Suggestions (Self-Hosted Web/PWA Only)
          </h2>
          <p className="mt-3">
            AI taxonomy classification is <strong>disabled in the native iOS app</strong>. If you separately
            deploy and use a self-hosted web/PWA companion server and explicitly trigger AI classification,
            document text/images and your taxonomy list are sent either to <strong>Google Gemini</strong>{' '}
            (using your own self-hosted <code>GEMINI_API_KEY</code>) or to your own self-hosted
            OpenAI-compatible LLM endpoint (such as Ollama), depending on your setting.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            6. Contact &amp; Support
          </h2>
          <p className="mt-3">
            For privacy questions or support, email{' '}
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              {SITE_CONFIG.supportEmail}
            </a>{' '}
            or open an issue on{' '}
            <a
              href={`${SITE_CONFIG.issuesRepoUrl}/issues`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              GitHub
            </a>
            . You can also return to the{' '}
            <button
              type="button"
              onClick={() => onNavigate('/#support')}
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              Support section
            </button>
            .
          </p>
        </section>
      </div>
    </article>
  );
};
