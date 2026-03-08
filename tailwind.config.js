/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      Urbanist: ['var(--font-urbanist)', 'sans-serif'],
      AlfaSlabOne: ['var(--font-alfa)', 'cursive']
    }
  },
  plugins: []
}
