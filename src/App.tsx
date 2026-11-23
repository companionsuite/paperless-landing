import React, { useCallback, useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { SITE_CONFIG } from './config/site';
import { LandingPage } from './pages/LandingPage';
import { ConnectPage } from './pages/ConnectPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

const NAV_LINKS = [
  { href: '/connect', label: 'Connect', match: ['/connect', '/setup'] },
  { href: '/privacy', label: 'Privacy', match: ['/privacy'] },
  { href: '/terms', label: 'Terms', match: ['/terms'] },
] as const;

export const App: React.FC = () => {
  const [path, setPath] = useState<string>(() => normalizePath(window.location.pathname));
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
      setMobileMenuOpen(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((target: string) => {
    const [rawPath, hash] = target.split('#');
    const nextPath = normalizePath(rawPath || '/');
    setMobileMenuOpen(false);
    if (normalizePath(window.location.pathname) !== nextPath) {
      window.history.pushState({}, '', target);
      setPath(nextPath);
    }
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('pl_landing_theme', next ? 'dark' : 'light');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-600)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-base font-semibold text-[var(--ink-primary)]"
          >
            <img src="/icon.svg" alt="" aria-hidden="true" className="h-8 w-8 shrink-0 rounded-lg shadow-xs" />
            <span>{SITE_CONFIG.appName}</span>
          </a>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex sm:gap-2">
              {NAV_LINKS.map((item) => {
                const isActive = (item.match as readonly string[]).includes(path);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[var(--accent-50)] text-[var(--accent-600)] dark:text-[var(--accent-400)]'
                        : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)]"
            >
              {isDark ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)] sm:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile"
            className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-4 py-3 sm:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const isActive = (item.match as readonly string[]).includes(path);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[var(--accent-50)] text-[var(--accent-600)] dark:text-[var(--accent-400)]'
                        : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1">
        {path === '/connect' || path === '/setup' ? (
          <ConnectPage onNavigate={navigate} />
        ) : path === '/privacy' ? (
          <PrivacyPage onNavigate={navigate} />
        ) : path === '/terms' ? (
          <TermsPage onNavigate={navigate} />
        ) : (
          <LandingPage onNavigate={navigate} />
        )}
      </main>

      <footer className="mt-8 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-[var(--ink-muted)] sm:flex-row sm:px-6">
          <p>&copy; 2026 {SITE_CONFIG.appName}. Independent client for Paperless-ngx.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="hover:text-[var(--ink-primary)]"
            >
              Home
            </a>
            <a
              href="/connect"
              onClick={(e) => {
                e.preventDefault();
                navigate('/connect');
              }}
              className="hover:text-[var(--ink-primary)]"
            >
              How to Connect
            </a>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                navigate('/privacy');
              }}
              className="hover:text-[var(--ink-primary)]"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                navigate('/terms');
              }}
              className="hover:text-[var(--ink-primary)]"
            >
              Terms of Use
            </a>
            <a
              href={SITE_CONFIG.issuesRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--ink-primary)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
