export default {
  worker: {
    name: 'paperless-landing',
    compatibilityDate: '2026-11-21',
    assets: {
      htmlHandling: 'auto-trailing-slash',
      notFoundHandling: 'single-page-application',
    },
    domains: ['paperless.milliways.si'],
  },
};
