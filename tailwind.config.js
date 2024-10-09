module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include your app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include components
    "./pages/**/*.{js,ts,jsx,tsx}", // Include pages, if applicable
  ],
  theme: {
    extend: {
      colors: {
        grey: "#f0f0f0",
        "light-grey": "#fafafa",
        "dark-blue": "#004368",
        green: "#0dc6a3",
        green2: "#60e2c9",
        orange: "#fdc666",
        black: "#191919",
      },
    },
  },
  plugins: [],
};
