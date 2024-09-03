import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aeonik', ...defaultTheme.fontFamily.sans],
        serif: ['Zodiak', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        contrast: {
          50: '#f0fdfa',
          100: '#cbfcf3',
          200: '#96f9e8',
          300: '#5aeeda',
          400: '#28d9c6',
          500: '#0fbdad',
          600: '#09988e',
          700: '#0c7973',
          800: '#0f605c',
          900: '#11504d',
          950: '#033030'
        }
      }
    }
  },
  plugins: []
}
