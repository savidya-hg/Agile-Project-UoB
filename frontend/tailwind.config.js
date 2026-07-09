/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          lilac: '#D6C7FF',     // Accent light purple/lilac
          lilacDark: '#B59EFF', // Darker accent for hover/active
          dark: '#111111',      // Minimalist deep luxury black
          darkGray: '#333333',  // Dark gray for text
          lightGray: '#F5F5F7', // Light gray for subtle backgrounds
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
