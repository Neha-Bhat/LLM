// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' (but class is better for React)
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', // light theme primary
          dark: '#818cf8',  // dark theme primary
        },
      },
    },
  },
  plugins: [],
};
