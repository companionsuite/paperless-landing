import React from 'react';
import { FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-medium text-[var(--accent-600)] dark:text-[var(--accent-400)]">
          <FileText className="h-3.5 w-3.5" />
          Terms of Use
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Effective date: November 21, 2026 &middot; App: {SITE_CONFIG.appName} ({SITE_CONFIG.bundleId})
        </p>
      </div>

      <div className="space-y-6 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2">
            By downloading or using {SITE_CONFIG.appName}, you agree to these Terms of Use. If you do not agree,
            do not use the application.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            2. Independent Companion &amp; Self-Hosted Server
          </h2>
          <p className="mt-2">
            {SITE_CONFIG.appName} is an independent client for Paperless-ngx and is not affiliated with or
            endorsed by the Paperless-ngx project. You are responsible for operating, securing, and backing up
            your own Paperless-ngx server, API tokens, network tunnels, and documents.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            3. Acceptable Use &amp; Data Responsibility
          </h2>
          <p className="mt-2">
            Because {SITE_CONFIG.appName} connects directly to the server you configure and caches documents
            locally on your device for offline access, you are solely responsible for ensuring you have the
            right to access, scan, and store the documents you manage through the app.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            4. Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p className="mt-2">
            {SITE_CONFIG.appName} is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, express or implied. To the fullest extent permitted by applicable law, the
            maintainers shall not be liable for any indirect, incidental, or consequential damages, including
            loss of data or server unavailability.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            5. Privacy &amp; Contact
          </h2>
          <p className="mt-2">
            Your use of the app is also governed by our{' '}
            <button
              type="button"
              onClick={() => onNavigate('/privacy')}
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              Privacy Policy
            </button>
            . Questions may be directed to{' '}
            {SITE_CONFIG.supportEmail ? (
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                {SITE_CONFIG.supportEmail}
              </a>
            ) : (
              <a
                href={`${SITE_CONFIG.issuesRepoUrl}/issues`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                our support page
              </a>
            )}
            .
          </p>
        </section>
      </div>
    </article>
  );
};
