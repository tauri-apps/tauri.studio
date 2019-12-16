
const routes = [
  {
    // redirect to docs
    path: '/',
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
        path: '/governance-and-guidance',
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
        path: '/book',
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
        path: '/security',
        component: () => import('pages/Security.vue'),
        meta: {
          name: 'Security',
          page_title: 'Tauri - Secure by Design.',
          description: 'Learn about the current and forthcoming security approaches that Tauri apps leverage and for which your users will thank you.',
          tags: 'tauri, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/security'
        }
      }
    ]
  },
  {
    path: '/docs',
    meta: {
      showDocslink: false
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/docs', // todo: make this a nice list
        name: 'docs',
        component: () => import('pages/Docs.vue'),
        meta: {
          name: 'Docs',
          page_title: 'Tauri - Documentation Overview.',
          description: 'Table of Contents for the Documentation Pages.',
          tags: 'open-source, native-apps, development, macos, windows, linux, documentation',
          url: 'https://tauri.studio/docs'
        }
      },
      {
        path: '/docs/introduction',
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
        path: '/docs/quickstart',
        component: () => import('pages/Quickstart.vue'),
        meta: {
          name: 'Quickstart',
          page_title: 'Tauri - Setup your environment in 5 minutes.',
          description: 'Learn how to get your Linux, Mac or Windows development machine up and running with Node and Rust in order to make Tauri Apps.',
          tags: 'tauri, quick-start, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/quickstart'
        }
      },
      {
        path: '/docs/patterns',
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
        path: '/docs/frameworks',
        component: () => import('pages/Frameworks.vue'),
        meta: {
          name: 'Patterns',
          page_title: 'Tauri - Design Patterns',
          description: 'Learn about the variety of systems you can design with simple configuration changes - now includes flowcharts and grading to make it easier to compare and choose!',
          tags: 'tauri, architecture, flowcharts, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/frameworks'
        }
      },
      {
        path: '/docs/no-server',
        component: () => import('pages/Noserver.vue'),
        meta: {
          name: 'Patterns',
          page_title: 'Tauri - Design Patterns',
          description: 'Learn about the variety of systems you can design with simple configuration changes - now includes flowcharts and grading to make it easier to compare and choose!',
          tags: 'tauri, architecture, flowcharts, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/no-server'
        }
      },
      {
        path: '/docs/config',
        component: () => import('pages/Config.vue'),
        meta: {
          name: 'Config',
          page_title: 'Tauri - Configuration',
          description: 'Learn about the variety of ways you can configure tauri to meet your needs.',
          tags: 'tauri, api, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/config'
        }
      },
      {
        path: '/docs/api',
        component: () => import('pages/API.vue'),
        meta: {
          name: 'API',
          page_title: 'Tauri - API',
          description: 'Learn about the various endpoints and communication protocols that Tauri enables you to use',
          tags: 'tauri, api, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/api'
        }
      },
      {
        path: '/docs/cli',
        component: () => import('pages/Cli.vue'),
        meta: {
          name: 'CLI',
          page_title: 'Tauri - Node.js CLI.',
          description: 'Learn about the Node CLI commands and their configurations.',
          tags: 'tauri, cli, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/cli'
        }
      },
      {
        path: '/docs/bundler',
        component: () => import('pages/Bundler.vue'),
        meta: {
          name: 'Bundler',
          page_title: 'Tauri - Rust Bundler.',
          description: 'Learn about the Rust bundler.',
          tags: 'tauri, bundler, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/docs/bundler'
        }
      },
      {
        path: '/contribute',
        component: () => import('pages/Contribute.vue'),
        meta: {
          name: 'Develop',
          page_title: 'Tauri - Contribute.',
          description: 'Learn about the stack and processes involved in Tauri Development, and get involved in making it better.',
          tags: 'development, contributions, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/contribute'
        }
      },
      {
        path: '/wtf',
        component: () => import('pages/WTF.vue'),
        meta: {
          name: 'Develop',
          page_title: 'WTF Tauri?',
          description: 'When things go wrong, this page will help you get back and track.',
          tags: 'development, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/wtf'
        }
      },
      {
        path: '/partners',
        component: () => import('pages/Partners.vue'),
        meta: {
          name: 'Partners',
          page_title: 'Tauri - Partners',
          description: 'Meet the ',
          tags: 'development, open-source, native-apps, development, macos, windows, linux',
          url: 'https://tauri.studio/partners'
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
