import type { Config } from "tailwindcss";

export default {
	darkMode: 'class',
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-background': 'var(--gradient-background)',
				'gradient-interactive': 'var(--gradient-interactive)',
			},
			backdropBlur: {
				'glass': '20px',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'elegant': 'var(--shadow-elegant)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'gradient-shift': {
					'0%, 100%': { 
						backgroundPosition: '0% 50%' 
					},
					'50%': { 
						backgroundPosition: '100% 50%' 
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '0.8',
						transform: 'scale(1)' 
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.05)' 
					}
				},
				'move-diagonal-1': {
					'0%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(100px, -50px)' },
					'50%': { transform: 'translate(150px, 30px)' },
					'75%': { transform: 'translate(50px, 80px)' },
					'100%': { transform: 'translate(0, 0)' }
				},
				'move-diagonal-2': {
					'0%': { transform: 'translate(0, 0)' },
					'25%': { transform: 'translate(-80px, 60px)' },
					'50%': { transform: 'translate(-120px, -40px)' },
					'75%': { transform: 'translate(-30px, -90px)' },
					'100%': { transform: 'translate(0, 0)' }
				},
				'move-circular': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'25%': { transform: 'translate(60px, -60px) rotate(90deg)' },
					'50%': { transform: 'translate(0, -120px) rotate(180deg)' },
					'75%': { transform: 'translate(-60px, -60px) rotate(270deg)' },
					'100%': { transform: 'translate(0, 0) rotate(360deg)' }
				},
				'move-wave': {
					'0%': { transform: 'translateX(0) translateY(0)' },
					'25%': { transform: 'translateX(70px) translateY(-40px)' },
					'50%': { transform: 'translateX(140px) translateY(0)' },
					'75%': { transform: 'translateX(70px) translateY(40px)' },
					'100%': { transform: 'translateX(0) translateY(0)' }
				},
				'icon-glow': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 5px currentColor)',
						opacity: '0.6' 
					},
					'50%': { 
						filter: 'drop-shadow(0 0 15px currentColor)',
						opacity: '1' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
				'move-diagonal-1': 'move-diagonal-1 12s ease-in-out infinite',
				'move-diagonal-2': 'move-diagonal-2 14s ease-in-out infinite',
				'move-circular': 'move-circular 16s ease-in-out infinite',
				'move-wave': 'move-wave 10s ease-in-out infinite',
				'icon-glow': 'icon-glow 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
