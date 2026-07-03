/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://hexspire.io',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
}
