// apps/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Перенесено зі старих CSS-токенів
        bg: '#0d0f12',              // Глибокий вугільний (var(--bg-primary))
        surface: '#16191d',         // Темно-сірий для карток (var(--card-bg))
        ink: '#e0e0e0',             // Основний текст (var(--text-main))
        'ink-muted': '#888888',     // Вторинний текст (var(--text-dim))
        accent: '#d97706',          // Акцентний колір
        border: '#2a323d',          // Технічний сірий (var(--border-sharp))
        darkbar: '#111111',
        'tactical-green': '#3d5e3d',// Для бейджів наявності
        'tactical-red': '#5e3d3d',  // Для бейджів відсутності
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
      },
    },
    // Вбиваємо всі border-radius на рівні конфігу (залишаємо як було)
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '0',
    }
  },
  plugins: [],
}
export default config