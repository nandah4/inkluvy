/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#79B9F3',
        secondary: '#3874FF',
        ink: '#1F2937',
        muted: '#6B7280',
        canvas: '#F8FAFC',
        city: {
          ink: '#152238',
          blue: '#1769D8',
          steel: '#E8EDF3',
          fog: '#F7F9FC',
          slate: '#5D6A7A',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          400: '#FFBF00',
          500: '#E6A800',
          600: '#CC9500',
        },
      },
      boxShadow: {
        soft: '0 16px 40px rgba(31, 41, 55, 0.08)',
      },
      fontFamily: {
        display: ['Google Sans Flex', 'system-ui', 'sans-serif'],
        sans: ['Google Sans Flex', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
