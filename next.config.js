/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pollard case studies used to have their own pages; they are now one
  // Work section on the home page, so old links land there.
  async redirects() {
    return [
      'widget-platform',
      'vite-migration',
      'nextjs-migration',
      'arizona-relaunch',
    ].map((slug) => ({
      source: `/projects/${slug}`,
      destination: '/#work',
      permanent: true,
    }))
  },
}

module.exports = nextConfig
