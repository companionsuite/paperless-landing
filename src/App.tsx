import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { SITE_CONFIG } from './config/site';
import { applyRouteSeo } from './config/seo';
import { LandingPage } from './pages/LandingPage';
import { ConnectPage } from './pages/ConnectPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function normalizePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

const NAV_LINKS = [
  { href: '/#features', label: 'Features', matchPath: ['/'], matchHash: '#features' },
  { href: '/#faq', label: 'FAQ', matchPath: ['/'], matchHash: '#faq' },
  { href: '/connect', label: 'Connect', matchPath: ['/connect', '/setup'], matchHash: null },
  { href: '/privacy', label: 'Privacy', matchPath: ['/privacy'], matchHash: null },
] as const;

export const App: React.FC = () => {
  const [path, setPath] = useState<string>(() => normalizePath(window.location.pathname));
  const [activeHash, setActiveHash] = useState<string>(() => window.location.hash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() =>
    document.documentElement.classList.contains('dark')
  );

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    applyRouteSeo(path);
  }, [path]);

  useEffect(() => {
    const syncLocation = () => {
      setPath(normalizePath(window.location.pathname));
      setActiveHash(window.location.hash);
      setMobileMenuOpen(false);
    };
    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('hashchange', syncLocation);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [mobileMenuOpen]);

  const navigate = useCallback((target: string) => {
    const [rawPath, hashPart] = target.split('#');
    const nextPath = normalizePath(rawPath || '/');
    const nextHash = hashPart ? `#${hashPart}` : '';
    const currentPath = normalizePath(window.location.pathname);

    setMobileMenuOpen(false);

    if (currentPath !== nextPath || window.location.hash !== nextHash) {
      window.history.pushState({}, '', target);
      setPath(nextPath);
      setActiveHash(nextHash);
    }

    if (hashPart) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(hashPart)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
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

  const isNavItemActive = (item: (typeof NAV_LINKS)[number]): boolean => {
    if (item.matchHash) {
      return path === '/' && activeHash === item.matchHash;
    }
    return (item.matchPath as readonly string[]).includes(path);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-600)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className="sticky top-0 z-30 border-b border-black/[0.08] bg-[var(--bg-surface-1)]/75 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.45)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.09] dark:bg-[var(--bg-surface-1)]/72 dark:shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="flex min-w-0 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg py-1 font-display text-[15px] font-semibold tracking-tight text-[var(--ink-primary)] transition hover:opacity-85 sm:text-base"
          >
            <img
              src="/icon.svg"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 shrink-0 rounded-lg shadow-xs ring-1 ring-black/5 dark:ring-white/10"
            />
            <span>{SITE_CONFIG.appName}</span>
          </a>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((item) => {
                const isActive = isNavItemActive(item);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[var(--accent-50)] text-[var(--accent-600)] dark:text-[var(--accent-400)]'
                        : 'text-[var(--ink-secondary)] hover:bg-[var(--bg-surface-2)]/80 hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <a
              href={SITE_CONFIG.appStoreUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Download on App Store"
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[var(--accent-600)] px-3 text-xs font-semibold whitespace-nowrap text-white shadow-xs transition hover:bg-[var(--accent-700)] sm:px-3.5 sm:text-[13px]"
            >
              <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sm:hidden">Get App</span>
              <span className="hidden sm:inline lg:hidden">Download</span>
              <span className="hidden lg:inline">Download on App Store</span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/80 text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
            >
              {isDark ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/80 text-[var(--ink-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)] md:hidden"
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
            className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-1)]/95 px-4 py-3 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item, idx) => {
                const isActive = isNavItemActive(item);
                return (
                  <a
                    key={item.href}
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
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
