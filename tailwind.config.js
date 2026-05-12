/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f4ef',
        'paper-2': '#ebe8e0',
        'paper-3': '#ded8cc',
        surface: '#ffffff',
        ink: '#16231f',
        'ink-soft': '#3d4f48',
        'ink-mute': '#6a7a73',
        accent: '#c45c3e',
        'accent-hover': '#a84d33',
        'accent-muted': 'rgba(196, 92, 62, 0.12)',
        sage: '#2d6a5c',
        'sage-muted': 'rgba(45, 106, 92, 0.12)',
        rule: 'rgba(22, 35, 31, 0.12)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        editorial: '0.14em',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '4px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(22, 35, 31, 0.06), 0 12px 40px -24px rgba(22, 35, 31, 0.35)',
        'card-hover':
          '0 1px 0 rgba(22, 35, 31, 0.08), 0 20px 50px -28px rgba(22, 35, 31, 0.45)',
        press: '3px 3px 0 0 rgba(22, 35, 31, 0.18)',
        'press-sm': '2px 2px 0 0 rgba(22, 35, 31, 0.14)',
        nav: '0 1px 0 rgba(22, 35, 31, 0.06)',
      },
    },
  },
  plugins: [],
}
