/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pollard case studies used to have their own pages; they now live on the
  // home page, so old links land on the right card.
  async redirects() {
    return [
      'widget-platform',
      'vite-migration',
      'nextjs-migration',
      'arizona-relaunch',
    ].map((slug) => ({
      source: `/projects/${slug}`,
      destination: `/#${slug}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
