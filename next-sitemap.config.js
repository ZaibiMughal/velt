/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://veltstudio.com',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
}
