import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',  // Customize the primary color
        secondary: '#9333ea', // Purple color for secondary elements
        accent: '#fbbf24',    // Yellow accent color
        background: '#f0f4f8', // Light background color
      },
      animation: {
        'shape-change': 'shapeChange 5s ease-in-out infinite',
      },
      keyframes: {
        shapeChange: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            borderRadius: '1rem',
            backgroundColor: '#3b82f6', // Primary color at start
          },
          '25%': {
            transform: 'scale(1.2) rotate(45deg)',
            borderRadius: '50%',
            backgroundColor: '#9333ea', // Secondary color on this frame
          },
          '50%': {
            transform: 'scale(1) rotate(90deg)',
            borderRadius: '1rem',
            backgroundColor: '#fbbf24', // Accent color at 50%
          },
          '75%': {
            transform: 'scale(1.2) rotate(135deg)',
            borderRadius: '10%',
            backgroundColor: '#10b981', // Green color for 75% state
          },
          '100%': {
            transform: 'scale(1) rotate(180deg)',
            borderRadius: '1rem',
            backgroundColor: '#3b82f6', // Revert back to primary color
          },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
