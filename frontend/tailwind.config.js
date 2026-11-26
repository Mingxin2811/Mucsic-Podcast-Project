/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2fd973',
          hover: '#28b86c',
          dark: '#132c21',
          light: '#5af39f',
          muted: '#1b3b2c',
        },
        surface: {
          DEFAULT: '#0a0d14',
          sidebar: '#13151c',
          card: '#181b24',
          cardHover: '#1e222e',
          elevated: '#212532',
          border: '#262b3a',
          input: '#1a1d27',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 25px -5px rgba(47, 209, 123, 0.3)',
        'player': '0 -8px 30px rgba(0, 0, 0, 0.7)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'soundwave-1': 'soundwave 1.2s ease-in-out infinite alternate',
        'soundwave-2': 'soundwave 0.8s ease-in-out 0.2s infinite alternate',
        'soundwave-3': 'soundwave 1.4s ease-in-out 0.4s infinite alternate',
      },
      keyframes: {
        soundwave: {
          '0%': { height: '4px' },
          '100%': { height: '18px' },
        },
      },
    },
  },
  plugins: [],
};
