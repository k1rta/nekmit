/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './assets/**/*.{html,js,ts,jsx,tsx}',
  ],
  prefix: 'tw-',
  corePlugins: {
    preflight: false, // keep template styles intact
  },
  theme: {
    extend: {},
  },
};
