import { black, colors, hoverColors, white } from '@carbon/colors';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '30rem',
      md: '48rem',
      lg: '64rem',
      xl: '75rem',
      '2xl': '82rem',
    },
    colors: {
      ...colors,
      ...hoverColors,
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black,
      white,
    },
    fontFamily: {
      sans: ['var(--font-ibm-plex-sans)', ...defaultTheme.fontFamily.sans],
    },
    fontSize: ({ theme }) => ({
      base: [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: theme('fontWeight.normal'),
        },
      ],
      12: [
        '0.75rem',
        {
          lineHeight: `${18 / 12}`,
          fontWeight: theme('fontWeight.normal'),
        },
      ],
      14: [
        '0.875rem',
        {
          lineHeight: `${18 / 14}`,
          fontWeight: theme('fontWeight.normal'),
          letterSpacing: '0.01rem',
        },
      ],
      20: [
        '1.25rem',
        {
          lineHeight: `${26 / 20}`,
          fontWeight: theme('fontWeight.normal'),
        },
      ],
      h1: [
        '2.625rem',
        {
          lineHeight: `${50 / 42}`,
          fontWeight: theme('fontWeight.light'),
        },
      ],
      h2: [
        '1.5rem',
        {
          lineHeight: `${28 / 24}`,
          fontWeight: theme('fontWeight.semibold'),
        },
      ],
    }),
    fontWeight: {
      light: '300',
      normal: '400',
      semibold: '600',
    },
    borderRadius: {
      circle: '50%',
      1: '0.25rem',
      2: '0.5rem',
    },
    extend: {
      textColor: {
        dark: 'var(--text-dark)',
        light: 'var(--text-light)',
        secondary: 'var(--text-secondary)',
        link: 'var(--text-link)',
      },
      backgroundColor: {
        background: 'var(--bg-background)',
        layer: 'var(--bg-layer)',
        'layer-inverse': 'var(--bg-layer-inverse)',
        overlay: 'var(--bg-overlay)',
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
      },
      fill: {
        'layer-inverse': 'var(--bg-layer-inverse)',
      },
      transitionProperty: {
        DEFAULT:
          'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, visibility, box-shadow, transform, filter, backdrop-filter',
      },
      zIndex: {
        1: '1',
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
} satisfies Config;
