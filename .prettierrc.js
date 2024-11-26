module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cva'],
};
