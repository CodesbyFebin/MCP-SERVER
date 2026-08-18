import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          cyan: '#42d7ff',
          green: '#49e5a5',
          violet: '#a78bfa',
          amber: '#f7c873',
          danger: '#ff6b7a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
