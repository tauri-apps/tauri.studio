
const routes = [
  {
    // redirect to docs
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Landing.vue'), meta: { name: 'Menu' } },
      { path: '/governance-and-guidance', component: () => import('pages/Governance.vue'), meta: { name: 'Governance' } },
      { path: '/book', component: () => import('pages/Book.vue'), meta: { name: 'Book' } }
    ]
  },
  {
    path: '/docs',
    meta: {
      showDocslink: false
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Introduction.vue'), meta: { name: 'Docs' } },
      { path: '/docs/quickstart', component: () => import('pages/Quickstart.vue'), meta: { name: 'Quickstart' } },
      { path: '/docs/patterns', component: () => import('pages/Patterns.vue'), meta: { name: 'Patterns' } },
      { path: '/docs/examples', component: () => import('pages/Examples.vue'), meta: { name: 'Examples' } },
      { path: '/docs/security', component: () => import('pages/Security.vue'), meta: { name: 'Security' } },
      { path: '/docs/api', component: () => import('pages/API.vue'), meta: { name: 'API' } },
      { path: '/docs/cli', component: () => import('pages/Cli.vue'), meta: { name: 'CLI' } }
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
