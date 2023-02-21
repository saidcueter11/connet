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
  theme: {
    extend: {
      colors: {
        'light-green': '#D6E4E5',
        'text-dark-green': '#243C3E',
        'action-red': '#EB6440',
        'dark-green': '#233E40',
        'ligth-text-green': '#F3F4ED'
        // 'light-bg-green': 'bg-gradient-to-b from-[#D6E4E5] via-[#EDF4F5] to-[#EFF5F5]'
      },
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
        'concert-one': ['Concert One']
      }
    }
  }
}
