/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
  	extend: {
  		fontSize: {
  			'scale-xs': ['0.8rem', { lineHeight: '1.5' }],
  			'scale-sm': ['0.9rem', { lineHeight: '1.5' }],
  			'scale-base': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
  			'scale-lg': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }], // h6
  			'scale-xl': ['1.5625rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }], // h5
  			'scale-2xl': ['1.953125rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }], // h4
  			'scale-3xl': ['2.44140625rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }], // h3
  			'scale-4xl': ['3.0517578125rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }], // h2
  			'scale-5xl': ['3.814697265625rem', { lineHeight: '1.0', letterSpacing: '-0.02em' }], // h1
  		},
  		letterSpacing: {
  			'tight-xs': '-0.005em', // -0.5%
  			'tight-sm': '-0.01em',  // -1%
  			'tight-md': '-0.015em', // -1.5%
  			'tight-lg': '-0.02em',  // -2%
  		},
  		lineHeight: {
  			'tight': '1.0',    // 100%
  			'snug': '1.1',     // 110%
  			'normal-plus': '1.25', // 125%
  			'relaxed-plus': '1.3', // 130%
  			'loose': '1.5',    // 150%
  		},
  		fontFamily: {
  			sans: [
  				'Switzer-Variable',
  				'Switzer-Regular',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			switzer: [
  				'Switzer-Variable',
  				'Switzer-Regular',
  				'sans-serif'
  			],
  			'switzer-thin': [
  				'Switzer-Thin',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-extralight': [
  				'Switzer-Extralight',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-light': [
  				'Switzer-Light',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-medium': [
  				'Switzer-Medium',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-semibold': [
  				'Switzer-Semibold',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-bold': [
  				'Switzer-Bold',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-extrabold': [
  				'Switzer-Extrabold',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			'switzer-black': [
  				'Switzer-Black',
  				'Switzer-Variable',
  				'sans-serif'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			],
  			grotesk: [
  				'Space Grotesk',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			}
  		},
  		fontWeight: {
  			'thin': '100',
  			'extralight': '200',
  			'light': '300',
  			'normal': '400',
  			'medium': '500',
  			'semibold': '600',
  			'bold': '700',
  			'extrabold': '800',
  			'black': '900'
  		},
  		fontVariationSettings: {
  			'weight-100': '"wght" 100',
  			'weight-200': '"wght" 200',
  			'weight-300': '"wght" 300',
  			'weight-400': '"wght" 400',
  			'weight-500': '"wght" 500',
  			'weight-600': '"wght" 600',
  			'weight-700': '"wght" 700',
  			'weight-800': '"wght" 800',
  			'weight-900': '"wght" 900'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
