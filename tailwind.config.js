/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./index.html",
    "./.vitepress/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 太阳色系 - 主色
        'sun-gold': {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706',
        },
        'sun-orange': '#FB923C',
        'sun-red': '#DC2626',
        
        // 背景层次
        'bg-primary': '#0F0F0F',
        'bg-secondary': '#1A1A2E',
        'bg-tertiary': '#252542',
        'bg-highlight': '#374151',
        
        // 文字颜色
        'text-primary': '#FFFFFF',
        'text-secondary': '#E5E7EB',
        'text-tertiary': '#9CA3AF',
        'text-disabled': '#6B7280',
        
        // 强调色
        'accent-green': '#10B981',
        'accent-pink': '#F472B6',
      },
      fontFamily: {
        'display': ['Noto Serif SC', 'Songti SC', 'serif'],
        'body': ['Noto Sans SC', 'PingFang SC', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'sun-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FB923C 50%, #DC2626 100%)',
        'dawn-gradient': 'linear-gradient(180deg, #1A1A2E 0%, #0F0F0F 100%)',
        'golden-gradient': 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)',
        'dark-gold': 'linear-gradient(135deg, #B45309 0%, #F59E0B 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(245, 158, 11, 0.5)',
        'glow-lg': '0 0 40px rgba(245, 158, 11, 0.3)',
        'card': '0 12px 40px rgba(245, 158, 11, 0.15)',
      },
      animation: {
        'shine': 'shine 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'bounce': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          to: {
            backgroundPosition: '200% center',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.1)',
          },
        },
        spin: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(10px)',
          },
        },
      },
    },
  },
  plugins: [],
}
