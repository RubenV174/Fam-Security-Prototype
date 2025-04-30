import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme"); // Import fontFamily

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
        fontFamily: { // Add sans font family using the CSS variable
            sans: ["var(--font-sans)", ...fontFamily.sans],
        },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			md: 'calc(var(--radius) - 4px)',
  			sm: 'calc(var(--radius) - 8px)'
  		},
  		keyframes: {
            "fadeIn": {
                "from": { opacity: "0" },
                "to": { opacity: "1" },
            },
            "slideInUp": {
                "from": { transform: "translateY(20px)", opacity: "0" },
                "to": { transform: "translateY(0)", opacity: "1" },
            },
            "bounce": {
                "0%, 100%": {
                    transform: "translateY(-15%)",
                    animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
                },
                "50%": {
                    transform: "translateY(0)", // Changed from none to 0 for consistency
                    animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
                },
            },
            "shake": {
                "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
                "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
                "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
                "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
            },
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
            "fadeIn": "fadeIn 0.5s ease-in-out",
            "slideInUp": "slideInUp 0.5s ease-out",
            "bounce": "bounce 1.5s infinite",
            "shake": "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
