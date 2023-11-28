/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)'],
      },
      colors: {
        'controls-green': '#A4FFAF',
        'background-black': '#18171F',
        'controls-background-dark-gray': '#24232C',
        'bright-gray': '#E6E5EA',
        'gray-dark': '#817D92',
        'strength-too-weak': '#F64A4A',
        'strength-weak': '#FB7C58',
        'strength-medium': '#F8CD65',
      }
    },
  },
  plugins: [],
}
