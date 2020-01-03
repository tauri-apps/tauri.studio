const routes = [
  {
    path: '/',
    redirect: '/en'
  },
  {
    path: '/en',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'landing',
        component: () => import('pages/Landing.vue'),
        meta: {
          name: 'Menu',
          page_title: 'Tauri Studio - Make smaller, faster more secure native apps with Rust.',
          description: 'Tauri is a toolchain for building highly secure native apps that have tiny binaries and are very fast. Whether coming from the front-end with Gatsby, Svelte, Vue, Angular or React - Tauri solves the hard problems of safe User Interfaces for all the desktop platforms.',
          tags: 'tauri, native-apps, rust, polyglot, vue, svelte, react, gatsby, quasar',
          url: 'https://tauri.studio/'
        }
      },
      {
        path: 'governance-and-guidance',
        name: 'governance-and-guidance',
        component: () => import('pages/Governance.vue'),
        meta: {
          name: 'Governance',
          page_title: 'Tauri Governance.',
          description: 'Tauri seeks to mitigate bus-factor by working in a collective, transparent and accountable way. We follow the greater-good affirmation, maintain our budget at opencollective and seek to comply with the best-practices outlined by the SFOSC.',
          tags: 'tauri, SFOSC, open-source, accountability, best-practice',
          url: 'https://tauri.studio/governance-and-guidance'
        }
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('pages/Book.vue'),
        meta: {
          name: 'Book',
          page_title: 'Tauri - The Book.',
          description: 'Some may think that Tauri is complex - they would be right. That is why we are writing the book about it. Discover its contents and how to get your hands on an advance copy.',
          tags: 'tauri, book, e-book, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/book'
        }
      },
      {
        path: 'security',
        name: 'security',
        component: () => import('pages/Security.vue'),
        meta: {
          name: 'Security',
          page_title: 'Tauri - Secure by Design.',
          description: 'Learn about the current and forthcoming security approaches that Tauri apps leverage and for which your users will thank you.',
          tags: 'tauri, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/security'
        }
      },
      {
        path: 'introduction',
        name: 'introduction',
        component: () => import('pages/Introduction.vue'),
        meta: {
          name: 'Introduction',
          page_title: 'Tauri - The Overview.',
          description: 'Learn about how Tauri works from a high-level and about the technology under the hood.',
          tags: 'open-source, native-apps, development, macos, windows, linux, documentation, tauri',
          url: 'https://tauri.studio/docs/introduction'
        }
      },
      {
        path: 'patterns',
        name: 'patterns',
        component: () => import('pages/Patterns.vue'),
        meta: {
          name: 'Patterns',
          page_title: 'Tauri - Design Patterns',
          description: 'Learn about the variety of systems you can design with simple configuration changes - now includes flowcharts and grading to make it easier to compare and choose!',
          tags: 'tauri, architecture, flowcharts, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/patterns'
        }
      },
      {
        path: 'partners',
        name: 'partners',
        component: () => import('pages/Partners.vue'),
        meta: {
          name: 'Partners',
          page_title: 'Tauri - Partners',
          description: 'Meet the companies and projects who support Tauri - from early adopters to tech-sponsors.',
          tags: 'development, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/partners'
        }
      }
    ]
  },
  {
    path: '*',
    name: 'notfound',
    redirect: '/en'
  }
]

export default routes
