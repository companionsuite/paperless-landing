import React, { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { SITE_CONFIG } from './config/site';
import { LandingPage } from './pages/LandingPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export const App: React.FC = () => {
  const [path, setPath] = useState<string>(() => normalizePath(window.location.pathname));
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((target: string) => {
    const [rawPath, hash] = target.split('#');
    const nextPath = normalizePath(rawPath || '/');
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
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="flex items-center gap-2.5 font-display text-base font-semibold text-[var(--ink-primary)]"
          >
            <img src="/icon.svg" alt="" className="h-8 w-8 rounded-lg shadow-xs" />
            <span>{SITE_CONFIG.appName}</span>
          </a>

          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                navigate('/privacy');
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                path === '/privacy'
                  ? 'bg-[var(--accent-50)] text-[var(--accent-600)] dark:text-[var(--accent-400)]'
                  : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Privacy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                navigate('/terms');
              }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                path === '/terms'
                  ? 'bg-[var(--accent-50)] text-[var(--accent-600)] dark:text-[var(--accent-400)]'
                  : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Terms
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {path === '/privacy' ? (
          <PrivacyPage onNavigate={navigate} />
        ) : path === '/terms' ? (
          <TermsPage onNavigate={navigate} />
        ) : (
          <LandingPage onNavigate={navigate} />
        )}
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-[var(--ink-muted)] sm:flex-row sm:px-6">
          <p>&copy; 2026 {SITE_CONFIG.appName}. Independent client for Paperless-ngx.</p>
          <div className="flex flex-wrap items-center gap-5">
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
              href={SITE_CONFIG.sourceRepoUrl}
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
