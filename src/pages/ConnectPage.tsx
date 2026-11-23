import React from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Globe,
  KeyRound,
  Network,
  Server,
  Shield,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface ConnectPageProps {
  onNavigate: (path: string) => void;
}

interface ConnectionMethod {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  whenToUse: string;
  prerequisites: string[];
  steps: Array<{ title: string; detail: React.ReactNode }>;
  exampleUrls: string[];
  troubleshooting: string[];
}

const METHODS: ConnectionMethod[] = [
  {
    id: 'remote-url',
    badge: 'Option 1 · Anywhere',
    title: 'Remote URL (HTTPS Reverse Proxy)',
    subtitle:
      'Connect from anywhere over cellular or Wi-Fi using your own domain name and TLS.',
    icon: Globe,
    whenToUse:
      'Best when you want seamless access to your Paperless-ngx archive away from home without toggling a VPN on your iPhone.',
    prerequisites: [
      'A domain or subdomain (for example, docs.yourdomain.com) pointing to your server.',
      'A reverse proxy such as Caddy, Traefik, or nginx terminating HTTPS in front of Paperless-ngx.',
      'Your Paperless-ngx username/password or an API Auth Token.',
    ],
    steps: [
      {
        title: 'Expose Paperless-ngx behind an HTTPS reverse proxy',
        detail: (
          <>
            Configure <strong>Caddy</strong> (automatic Let&apos;s Encrypt TLS),{' '}
            <strong>Traefik</strong>, or <strong>nginx</strong> to proxy HTTPS traffic to your
            Paperless-ngx container (typically port <code className="font-mono">8000</code>). Ensure{' '}
            <code className="font-mono">PAPERLESS_URL</code> in your Paperless-ngx environment
            includes your public <code className="font-mono">https://</code> origin so CSRF and
            host checks succeed.
          </>
        ),
      },
      {
        title: 'Create or copy an API Auth Token (optional)',
        detail: (
          <>
            You can sign in directly with your username and password, or use an API token. To get
            your token in the Paperless-ngx web UI: click your username in the top-right corner
            &rarr; <strong>My Profile</strong> &rarr; copy or generate your{' '}
            <strong>API Auth Token</strong>.
          </>
        ),
      },
      {
        title: 'Connect in Paperless Companion',
        detail: (
          <>
            Open {SITE_CONFIG.appName} &rarr; tap <strong>Connect Paperless Server</strong> (or{' '}
            <strong>Settings &rarr; Connection</strong>), enter your{' '}
            <code className="font-mono">https://</code> Server URL, and choose{' '}
            <strong>Login</strong> or <strong>API Token</strong>.
          </>
        ),
      },
      {
        title: 'Behind Cloudflare Access or forward-auth?',
        detail: (
          <>
            Expand <strong>+ Custom proxy headers</strong> on the connection screen and tap{' '}
            <strong>CF-Access Headers</strong> to add{' '}
            <code className="font-mono">CF-Access-Client-Id</code> and{' '}
            <code className="font-mono">CF-Access-Client-Secret</code> service token headers.
          </>
        ),
      },
    ],
    exampleUrls: ['https://docs.yourdomain.com', 'https://paperless.yourdomain.com'],
    troubleshooting: [
      '401 / 403 errors: verify your API token has not been regenerated, or check that CF-Access service token headers are included if using Cloudflare Access.',
      'Certificate errors: iOS requires a trusted HTTPS certificate (such as Let’s Encrypt). Self-signed certificates fail unless their root CA is installed and trusted in iOS Settings.',
      '400 / CSRF errors from Paperless-ngx: confirm PAPERLESS_URL / PAPERLESS_ALLOWED_HOSTS matches your public domain.',
    ],
  },
  {
    id: 'local-network',
    badge: 'Option 2 · Home Wi-Fi',
    title: 'Same Network / Localhost (LAN IP)',
    subtitle:
      'Connect directly over your home or office Wi-Fi without exposing Paperless-ngx to the internet.',
    icon: Wifi,
    whenToUse:
      'Best when you only sync documents at home or in the office and keep Paperless-ngx strictly on your local network.',
    prerequisites: [
      'Your iPhone and your Paperless-ngx server must be on the same Wi-Fi / LAN.',
      'Your server’s local IP address (e.g. 192.168.1.50) and Paperless-ngx port (default 8000).',
      'Local firewall rules allowing incoming TCP traffic on that port from your LAN.',
    ],
    steps: [
      {
        title: 'Do not enter "localhost" on your iPhone',
        detail: (
          <>
            On an iPhone, <code className="font-mono">localhost</code> (or{' '}
            <code className="font-mono">127.0.0.1</code>) refers to <strong>the iPhone itself</strong>,
            not your Mac, PC, NAS, or home server. Always use your server&apos;s LAN IP address or{' '}
            <code className="font-mono">.local</code> hostname instead.
          </>
        ),
      },
      {
        title: 'Find your server’s LAN IP and port',
        detail: (
          <>
            Check your router&apos;s connected devices list, or run{' '}
            <code className="font-mono">ipconfig getifaddr en0</code> (macOS),{' '}
            <code className="font-mono">hostname -I</code> (Linux), or{' '}
            <code className="font-mono">ipconfig</code> (Windows). Paperless-ngx listens on port{' '}
            <code className="font-mono">8000</code> by default unless you remapped it in Docker.
          </>
        ),
      },
      {
        title: 'Check firewall & Docker port binding',
        detail: (
          <>
            Make sure your host firewall allows TCP port <code className="font-mono">8000</code> on
            your local network, and that Docker publishes{' '}
            <code className="font-mono">8000:8000</code> (not{' '}
            <code className="font-mono">127.0.0.1:8000:8000</code>, which blocks other devices).
          </>
        ),
      },
      {
        title: 'Allow iOS Local Network permission',
        detail: (
          <>
            Enter <code className="font-mono">http://192.168.x.x:8000</code> in {SITE_CONFIG.appName}{' '}
            (the app automatically uses <code className="font-mono">http://</code> for LAN IPs and{' '}
            <code className="font-mono">.local</code> names). When iOS prompts to find and connect to
            devices on your local network, tap <strong>Allow</strong>.
          </>
        ),
      },
    ],
    exampleUrls: ['http://192.168.1.50:8000', 'http://paperless.local:8000'],
    troubleshooting: [
      'Works only on the same Wi-Fi: if your iPhone switches to cellular or a guest Wi-Fi, the LAN IP will time out.',
      'Local Network denied: open iOS Settings → Privacy & Security → Local Network and enable Paperless Companion.',
      'IP changed after reboot: assign a static DHCP reservation for your server in your router settings.',
    ],
  },
  {
    id: 'tailscale',
    badge: 'Option 3 · Private Mesh VPN',
    title: 'Tailscale (Zero Public Exposure)',
    subtitle:
      'Reach your Paperless-ngx server from anywhere over an encrypted WireGuard tailnet—no open router ports required.',
    icon: Network,
    whenToUse:
      'Best when you want remote access from anywhere without opening ports on your router or managing a public domain.',
    prerequisites: [
      'A Tailscale account (free personal plan works).',
      'Tailscale installed on your Paperless-ngx server host (or a subnet router on your LAN).',
      'The Tailscale iOS app installed on your iPhone and signed in to the same tailnet.',
    ],
    steps: [
      {
        title: 'Install Tailscale on your server and iPhone',
        detail: (
          <>
            Install Tailscale on the machine running Paperless-ngx and install the{' '}
            <strong>Tailscale</strong> app from the App Store on your iPhone. Sign in to the{' '}
            <strong>same tailnet</strong> on both devices.
          </>
        ),
      },
      {
        title: 'Find your server’s Tailscale IP or MagicDNS name',
        detail: (
          <>
            In the Tailscale app or admin console, copy your server&apos;s{' '}
            <code className="font-mono">100.x.y.z</code> IPv4 address or its MagicDNS hostname
            (such as <code className="font-mono">paperless-host.tail1234.ts.net</code>).
          </>
        ),
      },
      {
        title: 'Keep Tailscale connected on your iPhone',
        detail: (
          <>
            Make sure the Tailscale VPN toggle is <strong>Active/Connected</strong> in the Tailscale
            iOS app (or iOS Settings &rarr; VPN) whenever you sync with your server.
          </>
        ),
      },
      {
        title: 'Enter the Tailscale address with the Paperless port',
        detail: (
          <>
            In {SITE_CONFIG.appName}, enter <code className="font-mono">http://100.x.y.z:8000</code>{' '}
            or <code className="font-mono">http://your-server:8000</code>. The app recognizes{' '}
            <code className="font-mono">100.64.0.0/10</code> Tailscale addresses and defaults to{' '}
            <code className="font-mono">http://</code>. If you use{' '}
            <code className="font-mono">tailscale serve</code> for HTTPS, use your{' '}
            <code className="font-mono">https://...ts.net</code> URL without{' '}
            <code className="font-mono">:8000</code>.
          </>
        ),
      },
    ],
    exampleUrls: [
      'http://100.101.102.103:8000',
      'http://paperless-host.tail1234.ts.net:8000',
    ],
    troubleshooting: [
      'Timeout when away from home: check that Tailscale is connected on both your iPhone and the server host.',
      'Wrong tailnet or ACLs: confirm both devices appear in the same Tailscale admin console and ACLs permit TCP port 8000.',
      'Server bound only to localhost: ensure Paperless-ngx listens on 0.0.0.0:8000 (or the Tailscale interface), not 127.0.0.1:8000.',
    ],
  },
];

const COMMON_ERRORS = [
  {
    title: 'Connection Timeout / Server Unreachable',
    detail:
      'Your iPhone cannot reach that host and port. Double-check that you are on the same Wi-Fi (for LAN IPs), Tailscale is connected (for 100.x.y.z), the server is running, and no host firewall is blocking the port.',
  },
  {
    title: '401 Unauthorized or 403 Forbidden',
    detail:
      'Your username/password or API Auth Token was rejected, or a proxy in front of Paperless-ngx blocked the request. Re-copy your token from Paperless Profile → API Auth Token, or add CF-Access custom headers if using Cloudflare Access.',
  },
  {
    title: 'Wrong Port',
    detail:
      'Direct Paperless-ngx connections usually use port :8000 (http://192.168.1.50:8000). Reverse proxies over HTTPS normally use standard port 443, so omit :8000 from https://docs.yourdomain.com.',
  },
  {
    title: 'SSL / Certificate Error',
    detail:
      'iOS blocks untrusted or self-signed HTTPS certificates. Use a valid certificate from Let’s Encrypt (via Caddy, Traefik, or nginx), or install and trust your private root CA under iOS Settings → General → About → Certificate Trust Settings.',
  },
] as const;

export const ConnectPage: React.FC<ConnectPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-50)] px-3.5 py-1 text-xs font-medium text-[var(--accent-600)] dark:text-[var(--accent-400)]">
          <Server className="h-3.5 w-3.5" />
          Connection Guide
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
          How to Connect to Your Paperless-ngx Server
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)]">
          {SITE_CONFIG.appName} connects directly from your iPhone to your own self-hosted
          Paperless-ngx instance. Choose the setup that matches how you host your server.
        </p>

        {/* Quick jump links */}
        <div className="mt-6 flex flex-wrap gap-2">
          {METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.id}
                href={`#${method.id}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-3.5 py-2 text-sm font-medium text-[var(--ink-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)]"
              >
                <Icon className="h-4 w-4 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                {method.title.split(' (')[0]}
              </a>
            );
          })}
        </div>
      </div>

      {/* Try the demo note */}
      <section className="mb-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--accent-50)] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-surface-1)] text-[var(--accent-600)] shadow-xs dark:text-[var(--accent-400)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-[var(--ink-primary)]">
              Want to try the app first? Use the built-in Demo Sandbox
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--ink-secondary)]">
              No server ready yet? Tap <strong>Explore Demo Sandbox</strong> on the welcome screen
              to browse sample documents, test the multi-page scanner, and try offline document
              pinning locally on your iPhone. You can connect your real server anytime in{' '}
              <strong>Settings</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Three Connection Methods */}
      <div className="space-y-8">
        {METHODS.map((method) => {
          const Icon = method.icon;
          return (
            <section
              key={method.id}
              id={method.id}
              className="scroll-mt-24 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-medium text-[var(--accent-600)] dark:text-[var(--accent-400)]">
                    <Icon className="h-3.5 w-3.5" />
                    {method.badge}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
                    {method.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {method.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    When to use
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {method.whenToUse}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    Example Server URL
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    {method.exampleUrls.map((url) => (
                      <div
                        key={url}
                        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-3 py-1.5 font-mono text-xs text-[var(--ink-primary)] sm:text-sm"
                      >
                        {url}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">Prerequisites</h3>
                <ul className="mt-2.5 space-y-2 text-sm text-[var(--ink-secondary)]">
                  {method.prerequisites.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">
                  Step-by-step setup
                </h3>
                <ol className="mt-3 space-y-3">
                  {method.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-600)] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <div className="text-sm leading-relaxed">
                        <div className="font-semibold text-[var(--ink-primary)]">{step.title}</div>
                        <p className="mt-1 text-[var(--ink-secondary)]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-primary)]">
                  <Shield className="h-4 w-4 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  Troubleshooting
                </h3>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {method.troubleshooting.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Common Errors */}
      <section
        id="troubleshooting"
        className="mt-12 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 sm:p-8"
      >
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
            Common Connection Errors
          </h2>
        </div>
        <p className="mt-2 text-sm text-[var(--ink-secondary)]">
          Quick checks if your server test fails during onboarding or in Settings.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {COMMON_ERRORS.map((err) => (
            <div
              key={err.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-primary)]">
                <KeyRound className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                {err.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                {err.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-sm">
          <p className="text-[var(--ink-secondary)]">
            Still stuck? Reach out via{' '}
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
            .
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="font-medium text-[var(--accent-600)] hover:underline dark:text-[var(--accent-400)]"
          >
            Return to Home &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
