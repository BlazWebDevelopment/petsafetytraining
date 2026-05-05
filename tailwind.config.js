/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3ead4',
        'paper-2': '#ece1c1',
        'paper-3': '#ddcfa6',
        ink: '#1a1410',
        'ink-soft': '#3a2f25',
        'ink-mute': '#6b5c47',
        accent: '#8a1c1c',
        'accent-2': '#a83333',
        'accent-blue': '#21425b',
        rule: '#1a1410',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        editorial: '0.18em',
      },
      boxShadow: {
        press: '4px 4px 0 0 #1a1410',
        'press-sm': '2px 2px 0 0 #1a1410',
      },
    },
  },
  plugins: [],
}
