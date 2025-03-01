
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
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
					foreground: 'hsl(var(--primary-foreground))'
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
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'gradient-rotate': {
					'0%': { backgroundSize: '200% 200%', backgroundPosition: '0% 50%' },
					'50%': { backgroundSize: '200% 200%', backgroundPosition: '100% 50%' },
					'100%': { backgroundSize: '200% 200%', backgroundPosition: '0% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'slide-out-left': 'slide-out-left 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'gradient-flow': 'gradient-shift 3s ease infinite',
				'gradient-rotate': 'gradient-rotate 3s ease infinite'
			},
			backgroundImage: {
				// Gradient opacity'yi artıralım ve daha belirgin renklere ayarlayalım
				'gradient-fab': 'linear-gradient(45deg, rgba(84,85,89,1) 0%, rgba(76,108,163,1) 50%, rgba(0,140,158,1) 100%)',
				'gradient-fab-hover': 'linear-gradient(225deg, rgba(84,85,89,1) 0%, rgba(76,108,163,1) 50%, rgba(0,140,158,1) 100%)',
				'gradient-fab-dark': 'linear-gradient(45deg, hsla(210,13%,40%,1) 0%, hsla(185,94%,7%,1) 50%, hsla(185,100%,15%,1) 100%)',
				'gradient-fab-dark-hover': 'linear-gradient(225deg, hsla(210,13%,40%,1) 0%, hsla(185,94%,7%,1) 50%, hsla(185,100%,15%,1) 100%)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.scrollbar-thin': {
					'scrollbarWidth': 'thin',
					'&::-webkit-scrollbar': {
						width: '6px',
					},
				},
				'.scrollbar-thumb-rounded': {
					'&::-webkit-scrollbar-thumb': {
						borderRadius: '0.25rem',
					},
				},
				'.scrollbar-thumb-sidebar-border': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'hsl(var(--sidebar-border))',
					},
				},
				'.scrollbar-thumb-sidebar-accent': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'hsl(var(--sidebar-accent))',
					},
				},
				'.gradient-mask': {
					'mask-image': 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)'
				},
				'.bg-gradient-animate': {
					'backgroundSize': '100% 100%', // 200% -> 100% olarak değiştirildi, daha az transparan olacak
					'transition': 'all 0.3s ease'
				},
				'.bg-gradient-animate:hover': {
					'backgroundPosition': 'right center'
				}
			};
			addUtilities(newUtilities, ['responsive', 'hover']);
		},
	],
} satisfies Config;
