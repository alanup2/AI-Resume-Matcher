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
        background: '#070B14',
        surface: {
          DEFAULT: '#0C0E12',
          low: '#111318',
          high: '#1A1C20',
          highest: '#282A2E',
        },
        primary: {
          DEFAULT: '#FF7A00',
          light: '#FFB68A',
          dark: '#5D2900',
        },
        secondary: {
          DEFAULT: '#00EEFC',
          light: '#D3FBFF',
          dark: '#00363A',
        },
        tertiary: {
          DEFAULT: '#C185FF',
          light: '#DCB8FF',
          dark: '#480081',
        },
        neon: {
          orange: '#FF7A00',
          cyan: '#00EEFC',
          purple: '#C185FF',
        },
        text: {
          primary: '#E2E2E8',
          secondary: '#E0C0AF',
          muted: '#A78B7C',
        },
        error: {
          DEFAULT: '#FFB4AB',
          container: '#93000A',
        },
        outline: {
          DEFAULT: '#A78B7C',
          variant: '#584235',
        },
      },
      fontFamily: {
        display: ['Metropolis', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255, 122, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 122, 0, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        neon: '0 0 20px rgba(255, 122, 0, 0.3)',
        'neon-cyan': '0 0 20px rgba(0, 238, 252, 0.3)',
        'neon-purple': '0 0 20px rgba(193, 133, 255, 0.3)',
        glow: '0 0 15px rgba(255, 182, 138, 0.15)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease',
        'slide-in': 'slideIn 0.3s ease',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
