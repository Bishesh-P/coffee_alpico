/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        premium: ['Playfair Display', 'serif'],
      },
      colors: {
        premium: {
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          platinum: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          bronze: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#cd853f',
            500: '#a0522d',
            600: '#8b4513',
            700: '#654321',
            800: '#5d4037',
            900: '#3e2723',
          }
        },
        navy: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#0B1D51',
          950: '#0a1a4a',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#0B1D51',
          950: '#0a1a4a',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'wider': '0.1em',
        'widest': '0.25em',
      },
      lineHeight: {
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'scale-up': {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'scale-up-subtle': {
          '0%': {
            transform: 'scale(0.98)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
          }
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'premium-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.02)'
          }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'zoom-pan': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '25%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '50%': { transform: 'scale(1.1) translate(-2%, -2%)' },
          '75%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' }
        },
        'slide-in-bottom': {
          '0%': {
            transform: 'translateY(100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-down': 'fade-down 0.6s ease-out forwards',
        'fade-right': 'fade-right 0.6s ease-out forwards',
        'fade-left': 'fade-left 0.6s ease-out forwards',
        'scale-up': 'scale-up 0.6s ease-out forwards',
        'scale-up-subtle': 'scale-up-subtle 0.4s ease-out forwards',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'premium-pulse': 'premium-pulse 2s ease-in-out infinite',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'zoom-pan': 'zoom-pan 30s ease-in-out infinite',
        'slide-in-bottom': 'slide-in-bottom 0.6s ease-out forwards'
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'premium-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #0B1D51 0%, #1e3a8a 50%, #3730a3 100%)',
        'premium-gradient-subtle': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      filter: {
        'grayscale': 'grayscale(100%)',
      }
    },
  },
  plugins: [],
};