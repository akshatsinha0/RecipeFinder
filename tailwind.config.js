import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        // Add other slate shades if needed
      },
      // Add other color palettes
    },
    extend: {},
  },
  plugins: [
    typography
  ],
  corePlugins: {
    preflight: false // Disable preflight since we're importing manually
  }
}
