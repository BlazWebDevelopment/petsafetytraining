/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        body: '#fff7f7',
        surface: '#ffffff',
        panel: '#fafafa',
        ink: '#333333',
        'ink-soft': '#666666',
        'ink-mute': '#999999',
        rose: '#b23674',
        'rose-soft': '#ffd9d9',
        'rose-pale': '#fae1e1',
        brown: '#b27436',
        line: '#e8dcdc',
      },
      fontFamily: {
        jp: ['var(--font-jp)', '"Hiragino Kaku Gothic ProN"', 'Meiryo', 'sans-serif'],
        round: ['var(--font-round)', 'var(--font-jp)', 'sans-serif'],
      },
      maxWidth: {
        shell: '1080px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(178, 54, 116, 0.08)',
        panel: '0 2px 10px -6px rgba(178, 54, 116, 0.28)',
      },
    },
  },
  plugins: [],
}
