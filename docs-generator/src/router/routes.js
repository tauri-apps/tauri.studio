
const routes = [
  {
    // redirect to docs
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Landing.vue') },
      { path: '/governance-and-guidance', component: () => import('pages/Governance.vue') }
    ]
  },
  {
    path: '/docs',
    meta: {
      showDocslink: false
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/docs/quickstart', component: () => import('pages/Quickstart.vue') },
      { path: '/docs/patterns', component: () => import('pages/Patterns.vue') },
      { path: '/docs/examples', component: () => import('pages/Examples.vue') },
      { path: '/docs/security', component: () => import('pages/Security.vue') },
      { path: '/docs/api', component: () => import('pages/API.vue') }
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
