/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nord: {
          0: 'hsl(var(--nord-0))',
          1: 'hsl(var(--nord-1))',
          2: 'hsl(var(--nord-3))',
          3: 'hsl(var(--nord-3))',
          4: 'hsl(var(--nord-4))',
          5: 'hsl(var(--nord-5))',
          6: 'hsl(var(--nord-6))',
          7: 'hsl(var(--nord-7))',
          8: 'hsl(var(--nord-8))',
          9: 'hsl(var(--nord-9))',
          10: 'hsl(var(--nord-10))',
          11: 'hsl(var(--nord-11))',
          12: 'hsl(var(--nord-12))',
          13: 'hsl(var(--nord-13))',
          14: 'hsl(var(--nord-14))',
          15: 'hsl(var(--nord-15))',
        },
      },
      fontFamily: {
        notoSansJP: ['var(--font-notoSansJP)'],
        orbitron: ['var(--font-orbitron)'],
      },
      screens: {
        xs: '480px',
      },
      maxWidth: {
        widest: 'var(--max-screen-width)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.nord.3'),
            'blockquote, h1, h2, h3, h4, h5, h6, th, strong, code:not(.code-highlight)':
              {
                color: 'inherit',
              },
            img: {
              'margin-left': 'auto',
              'margin-right': 'auto',
              'box-shadow': 'rgba(141, 150, 160, 0.15) 0px 3px 6px 0px',
            },
            h1: {
              '&::before': {
                content: '"# "',
              },
              'margin-bottom': '2rem !important',
            },
            h2: {
              '&::before': {
                content: '"## "',
              },
              'margin-bottom': '2rem !important',
            },
            h3: {
              '&::before': {
                content: '"### "',
              },
            },
            h4: {
              '&::before': {
                content: '"#### "',
              },
            },
            h5: {
              '&::before': {
                content: '"##### "',
              },
            },
            h6: {
              '&::before': {
                content: '"###### "',
              },
            },
            'h1, h2': {
              'font-size': '1.5rem',
              'line-height': '1.75rem',
            },
            'h3, h4, h5, h6': {
              'font-size': '1.25rem',
              'line-height': '1.5rem',
            },
            // overwrite styles declared in prism-nord.css
            'pre[class*="language-"]': {
              margin: '1.7142857em 0 !important',
              padding: '0.8571429em 1.1428571em !important',
            },
            // add code title
            '.rehype-code-title': {
              display: 'table',
              'background-color': theme('colors.nord.3'),
              color: theme('colors.nord.6'),
              padding: '0px 8px 8px',
              'border-radius': '0.3em 0.3em 0 0',
              'margin-bottom': '-30px',
              'font-size': '12px',
            },
            '.rehype-code-title+pre[class*="language-"]': {
              'border-top-left-radius': '0 !important',
            },
            'li > p, li > input': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'li > ul, li > ol': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ol li::marker, ul li::marker': {
              color: theme('colors.nord.3'),
            },
            '.task-list-item': {
              listStyleType: 'none',
            },
            '.contains-task-list': {
              'padding-left': 0,
            },
            '.contains-task-list .contains-task-list': {
              'padding-left': '1.625em',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
