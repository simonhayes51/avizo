
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e9f3ff',
          100: '#c8e0ff',
          200: '#a3ccff',
          300: '#7bb5ff',
          400: '#4b94ff',
          500: '#2d6bff',
          600: '#2052db',
          700: '#1b42ae',
          800: '#183a8a',
          900: '#152f69'
        },
      },
      boxShadow: {
        soft: '0 18px 60px rgba(15,23,42,0.45)'
      },
      borderRadius: {
        xl: '1.25rem'
      }
    }
  },
  plugins: [],
};
