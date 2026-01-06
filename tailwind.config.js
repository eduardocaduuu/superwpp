/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'emerald-green': '#50C878',
        'lime-green': '#32CD32',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-green': 'linear-gradient(135deg, #0a4d3c 0%, #1a1a2e 50%, #0f3460 100%)',
      },
    },
  },
  plugins: [],
}
