module.exports = {
  daisyui: {
    themes: [
      {
        softtheme: {
          "primary": "#a8dadc", // Soft cyan
          "secondary": "#f1faee", // Soft cream
          "accent": "#457b9d", // Muted dark blue
          "neutral": "#f1faee", // Light neutral gray
          "base-100": "#ffffff", // White background
        },
      },
      "light", // Light theme for pastel look
    ],
  },
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ensure your React components are included
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
