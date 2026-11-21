import type { GoldieConfig } from '/Users/quandang_1/.nvm/versions/node/v22.17.1/lib/node_modules/goldie/dist/config.ts';

const config: GoldieConfig = {
  appRoot: process.cwd(),
  flowsDir: '.argent/flows',
  appPath: `${process.env.HOME}/Library/Developer/CoreSimulator/Devices/3F152064-5205-4034-982B-18EA3382D49D/data/Containers/Bundle/Application/73A4B1BA-17D5-4028-93FD-A753E8A43716/App.app`,
  bundleId: 'com.paperlesscompanion.app',

  devices: ['iphone-6.9'],
  locales: ['en-US'],
  appearance: 'light',

  frame: { variant: '17-pro-blue' },

  theme: {
    background: 'linear-gradient(160deg, #DCE7FF 0%, #F6F7F9 55%, #FFFFFF 100%)',
    headlineColor: '#14171F',
    subheadColor: '#4E5666',
    fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
    copyHeightRatio: 0.24,
    deviceWidthRatio: 0.84,
    layout: 'classic',
  },

  store: {
    name: 'Paperless Companion',
    subtitle: { 'en-US': 'Mobile client for Paperless-ngx' },
    developer: 'Companion Suite',
    category: 'Productivity',
    rating: 4.9,
    ratingCount: 'New',
    ageRating: '4+',
    price: 'Free',
    description: {
      'en-US':
        'An offline-first iOS companion for your self-hosted Paperless-ngx server. Scan multi-page PDFs, triage your inbox, and pin critical records to your Offline Vault.',
    },
  },

  scenes: [
    {
      kind: 'screenshot',
      id: 'inbox',
      flow: 'store-01-inbox',
      headline: { 'en-US': 'Your archive at a glance' },
      subhead: { 'en-US': 'Triage your inbox and track offline vault status.' },
    },
    {
      kind: 'screenshot',
      id: 'documents',
      flow: 'store-02-documents',
      headline: { 'en-US': 'Instant search & filters' },
      subhead: { 'en-US': 'Browse OCR text, saved views, tags, and correspondents.' },
    },
    {
      kind: 'screenshot',
      id: 'detail',
      flow: 'store-03-detail',
      headline: { 'en-US': 'Inspect & edit metadata' },
      subhead: { 'en-US': 'Preview PDFs, update tags, and add notes on the go.' },
    },
    {
      kind: 'screenshot',
      id: 'scan',
      flow: 'store-04-scan',
      headline: { 'en-US': 'Multi-page PDF scanner' },
      subhead: { 'en-US': 'Capture receipts and compile PDFs right on your iPhone.' },
    },
  ],
};

export default config;
