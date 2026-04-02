import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@angusp/configs',
  description: 'Shared JavaScript & TypeScript configuration packages',

  // Update to match your GitHub repo name if different
  base: '/configs/',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      {
        text: 'Packages',
        items: [
          { text: '@angusp/eslint-config', link: '/packages/eslint-config' },
          { text: '@angusp/prettier-config', link: '/packages/prettier-config' },
          { text: '@angusp/tsconfig', link: '/packages/tsconfig' },
          { text: '@angusp/vite-config', link: '/packages/vite-config' },
          { text: '@angusp/vitest-config', link: '/packages/vitest-config' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
      },
      {
        text: 'Packages',
        items: [
          { text: 'eslint-config', link: '/packages/eslint-config' },
          { text: 'prettier-config', link: '/packages/prettier-config' },
          { text: 'tsconfig', link: '/packages/tsconfig' },
          { text: 'vite-config', link: '/packages/vite-config' },
          { text: 'vitest-config', link: '/packages/vitest-config' },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/anguspiv/configs/edit/main/apps/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: { text: 'Last updated' },

    socialLinks: [{ icon: 'github', link: 'https://github.com/anguspiv/configs' }],

    search: { provider: 'local' },

    footer: {
      message: 'Released under the MIT License.',
    },
  },
})
