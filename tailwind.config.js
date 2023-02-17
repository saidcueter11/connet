/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.tsx'
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {}
}
