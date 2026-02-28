/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.md",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./.vitepress/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 太阳神宫主题色 - 待鲁班确认
        'xihe-gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // 主金色
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'xihe-orange': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // 主橙色
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'xihe-red': {
          500: '#dc2626', // 中国红
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        'serif': ['Noto Serif SC', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'sun-gradient': 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #dc2626 100%)',
        'palace-gradient': 'linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%)',
      },
      animation: {
        'shine': 'shine 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shine: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
