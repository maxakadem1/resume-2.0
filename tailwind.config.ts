import type { Config } from 'tailwindcss'

// Colours are CSS variables (see globals.css) so the ink and paper themes
// share every class. Each is an RGB triplet to keep Tailwind's alpha syntax.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        faint: token('faint'),
        acid: token('acid'),
        line: 'rgb(var(--fg) / 0.14)',
        'line-strong': 'rgb(var(--fg) / 0.32)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Consolas', 'monospace'],
      },
      maxWidth: { page: '1480px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
