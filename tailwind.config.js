/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#e3e3e3",
        blue: {
          500: "#2081e2",
          900: "#1650e1"
        }
      }
    },
    container: {
      center: true
    }
  },
  plugins: [],
}