import type { Config } from 'tailwindcss'

// Dark-only tokens in the spirit of t3code, shared with Visual Lab and Godot
// Docs RAG: a pure black canvas, hairline white borders, dense small type.
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0e0e0e',
        'surface-2': '#161616',
        foreground: '#f2f2f2',
        muted: '#a3a3a3',
        faint: '#6b6b6b',
        line: 'rgb(255 255 255 / 0.08)',
        'line-strong': 'rgb(255 255 255 / 0.14)',
        hover: 'rgb(255 255 255 / 0.06)',
        primary: '#3d63f0',
        // One accent per project, used the same way everywhere.
        sky: '#5ea9f2',
        amber: '#f0c25c',
        mint: '#4fd1a5',
        violet: '#b48cf2',
        danger: '#f2705c',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [
          'var(--font-mono)',
          'ui-monospace',
          'SF Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': ['11px', '16px'],
        '3xs': ['10px', '14px'],
      },
      height: { 13: '3.25rem' },
      transitionTimingFunction: {
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
export default config
