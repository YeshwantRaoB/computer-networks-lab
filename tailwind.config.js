/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        'dark': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-fast': 'glow 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': {
            textShadow: '0 0 5px rgba(59, 130, 246, 0.5)'
          },
          '50%': {
            textShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 15px rgba(59, 130, 246, 0.6)'
          },
          '100%': {
            textShadow: '0 0 5px rgba(59, 130, 246, 0.5)'
          },
        }
      }
    },
  },
  plugins: [],
}
