import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontSize: {
        'fluid-2xl': 'clamp(1.25rem, 2.5vw, 1.5rem)',
        'fluid-6xl': 'clamp(1.5rem, 5vw, 4rem)',
        'fluid-8xl': 'clamp(2rem, 8vw, 6rem)', // min: 2rem, scale: 8vw, max: 6rem
      },
    },
  },
  plugins: [],
};
export default config;
