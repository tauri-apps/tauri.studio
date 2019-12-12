<template>
  <div>
    <div id="padding" style="padding-top:260px"></div>
    <p class="q-mt-xl">Tauri patterns are descriptions of use-cases that are entirely configurable within the tauri.conf.js file. These are not the limits of what Tauri can do, and there are probably more out there. If you discover one, why not get in touch and help us update this collection!
    </p>
    <p>If you haven't read about the general design of Tauri, then it would make the most sense for you to visit the
      <router-link to="/docs">INTRODUCTION</router-link> and become familiar with the basic architecture and terminology used in these patterns.
    </p>
    <q-card class="q-mt-xl">
      <q-card-section class="text-center" style="padding-bottom:-20px">
        <q-btn class="q-mx-xs" outline flat dense no-caps v-for="p in patterns" v-bind:key="p.id"  @click="pattern = p.name" :class="{'bg-cyan-2 text-black': pattern === p.name}" :disabled="pattern === p.name">{{ p.name }}</q-btn>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="bg-cyan-1">
        <q-ribbon :leaf-color="yellow.dark" :background-color="yellow.light" color="black" style="margin:-16px" type="corner" position="top-right">
          <small class="q-pa-md text-weight-bold">{{ active.most }}</small>
        </q-ribbon>
        <div id="tryout" class="fit row inline wrap" style="margin-top:26px">
          <img class="col-1 q-mt-md q-mr-md" :src="`statics/patterns/${pattern}.png`" style="height:50px; width:auto">
          <h4 class="col-grow text-weight-light text-cyan-10" style="margin:-30px 0">{{ pattern }}</h4>
          <span class="col-12 q-pa-sm text-weight-bold text-black">{{ active.bestWhen }}</span>

          <div class="row justify-around full-width">
            <div class="col-sm-5 col-xs-12">
              <ul class="text-weight-bold"> Pros:
                <li class="text-weight-regular row-12" v-for="p in active.pros" v-bind:key="p.id"  >{{ p }}</li>
              </ul>
              <ul class="text-weight-bold"> Cons:
                <li class="text-weight-regular row-12" v-for="p in active.cons" v-bind:key="p.id">{{ p }}</li>
              </ul>
            </div>
            <div class="col-sm-5 col-xs-12 q-mt-md block text-left">
              <div class="row">
                <span class="col-6 text-right q-pr-sm" style="white-space: nowrap">Ease of Use: </span>
                <q-rating class="col-6 inline-block" color="cyan-10" readonly :value="active.ratings.easeOfUse"></q-rating>
              </div>
              <div class="row">
                <span class="col-6 text-right q-pr-sm">Extensibility: </span>
                <q-rating class="col-6 inline-block" color="cyan-10" readonly :value="active.ratings.extensibility" :max="active.ratings.extensibility >= 6 ? active.ratings.extensibility : 5"></q-rating>
              </div>
              <div class="row">
                <span class="col-6 text-right q-pr-sm">Performance: </span>
                <q-rating class="col-6 inline-block" color="cyan-10" readonly :value="active.ratings.performance" :max="active.ratings.performance >= 6 ? active.ratings.performance : 5"></q-rating>
              </div>
              <div class="row">
                <span class="col-6 text-right q-pr-sm">Security: </span>
                <q-rating class="col-6 inline-block" color="cyan-10" readonly :value="active.ratings.security" :max="active.ratings.security >= 6 ? active.ratings.security : 5"></q-rating>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <q-no-ssr>
          <q-markdown :src="active.intro"></q-markdown>
        </q-no-ssr>
        <div class="text-center" id="temp" v-html="graph"></div>
      </q-card-section>
      <q-separator></q-separator>
      <!--<q-card-section>
        <ul class="text-weight-bold"> Features:
          <li class="text-weight-regular row-12" v-for="p in active.features" v-bind:key="p.id"  >{{ p }}</li>
        </ul>
      </q-card-section>
      <q-separator></q-separator>-->
      <q-card-section>
        <h6>Configuration</h6>
        <span>tauri.conf.js</span>
        <q-markdown :src="active.configMD" toc @data="onToc" no-line-numbers />
      </q-card-section>
    </q-card>

    <!-- <q-markdown :src="markdown" toc @data="onToc" /> -->

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </div>
</template>

<script>
// import markdown from '../markdown/patterns.md'
// import * as mermaid from 'mermaid'

const colors = {
  blue: {
    light: '#BAE5F2',
    dark: '#77CFE4'
  },
  yellow: {
    light: '#EFD3AF',
    dark: '#D08050'
  }
}

export default {
  name: 'Patterns',

  data () {
    return {
      // markdown: markdown,
      mermaidHTML: '',
      blue: colors.blue,
      yellow: colors.yellow,
      graph: '',
      clearfix: ' ',
      pattern: 'Bridge',
      patterns: [
        {
          name: 'Hermit',
          most: 'MOST SECURE',

          intro: 'The Hermit recipe is a pattern for ultimate application isolation where all logic is self-contained in the Window and the binary exists merely to bootstrap the Window. There is no communication back to Rust from the Window, there is no localhost server, and the Window has no access to any remote resources. The Hermit is great for interactive Kiosk Mode and standalone HTML based games.',
          ratings: {
            easeOfUse: 5,
            security: 5,
            extensibility: 0,
            performance: 6
          },
          bestWhen: 'Best when you want to lock down your app from all external influences.',
          features: [
            'Locked down interface'
          ],
          pros: [
            'Quick to make',
            'Smallest size'
          ],
          cons: [
            'No remote resources',
            'No access to API'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: false               // do not use a localhost server
  },
  whitelist: {
    all: false,                 // disable and tree-shake all api functions
  },
  security: {
    csp: 'default-src data: \\'unsafe-eval\\' \\'unsafe-inline\\''
    fASLR: 'aot'               // bootstrap with dynamic AOT of interface at every launch
  }
}
\`\`\`
          `,
          graph: `graph LR
          A==>H
          H==>F
          subgraph WEBVIEW
          F
          end

          subgraph RUST
          A
          end
          A[fa:fa-cog Binary ]
          F[fa:fa-window-maximize Window]
          H{Bootstrap}
          style RUST fill:${colors.yellow.light},stroke:${colors.yellow.dark},stroke-width:4px
          style WEBVIEW fill:${colors.blue.light},stroke:${colors.blue.dark},stroke-width:4px`
        },
        {
          name: 'Bridge',
          most: 'MOST POPULAR',
          intro: 'The Bridge recipe is a secure pattern where messages are passed between brokers via an implicit bridge using the API. ',
          bestWhen: 'Best when you want two-way communication between Rust and WebView.',
          ratings: {
            easeOfUse: 3,
            security: 4,
            extensibility: 5,
            performance: 4
          },
          pros: [
            'Highly configurable',
            'Rust skills not required'
          ],
          cons: [
            'Some WebAPIs unavailable',
            'Challenge to implement'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: false               // do not use a localhost server
  },
  whitelist: {                  // all whitelist values are default false
    all: true,                  // use this flag to enable all API features
    answer: false,              // enable rust to direct the UI
    bridge: false,              // enable Quasar Bridge
    event: false,               // enable binding to message
    execute: false,             // enable application execution
    listFiles: false,           // list files in a directory
    open: false,                // open link in a browser
    readBinaryFile: false,      // read binary file from local filesystem
    readTextFile: false,        // read text file from local filesystem
    setTitle: false,            // set the window title
    writeFile: false            // write file to local filesystem
  },
  security: {
    csp: 'default-src data: \\'unsafe-eval\\' \\'unsafe-inline\\'',
    messageSalt: 'none',        // one of: ['none'|'aot'|'otp']
    fASLR: 'none'               // one of: ['none'|'aot'|'otp']
  }
}
\`\`\`
          `,
          graph: `graph LR
          H==>F

          subgraph WEBVIEW
          F-.-E
          end

          D-->E
          E-->D
          B-->D
          D-->B

          subgraph RUST
          A==>H
          A-->B
          B-.-C
          B-.-G
          end

          A[Binary]
          B{Rust Broker}
          C[Subprocess 2]
          G[Subprocess 1]
          D(( API BRIDGE ))
          E{JS Broker}
          F[Window]
          H{Bootstrap}
          click D "/docs/api" "Visit the API page"
          style D fill:#ccc,stroke:#333,stroke-width:4px,color:white
          style RUST fill:${colors.yellow.light},stroke:${colors.yellow.dark},stroke-width:4px
          style WEBVIEW fill:${colors.blue.light},stroke:${colors.blue.dark},stroke-width:4px`
        },
        {
          name: 'Cloudish',
          most: 'MOST SIMPLE',
          intro: 'The Cloudish recipe is a pattern for maximum flexibility and app performance. It uses a localhost server, which means that your app will technically be available to other processes, like browsers and potentially other devices on the network. All of your assets are baked into the binary, but served as if they were distinct files.',
          ratings: {
            easeOfUse: 5,
            security: 2,
            extensibility: 3,
            performance: 3
          },
          bestWhen: 'Best when you have never used Rust before.',
          pros: [
            'No Rust skills necessary',
            'Similar to a SPA web-app'
          ],
          cons: [
            'No access to Rust API',
            'Uses a localhost server'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: true                // ship with a localhost server
  },
  whitelist: {
    all: false                  // disable entire API
  },
  security: {
    csp: 'default-src data: http: https: \\'unsafe-eval\\' \\'unsafe-inline\\''
  }
}
\`\`\`
          `,
          graph: `graph LR
          H==>F
          H==>D
          D-->F
          F-->D

          subgraph RUST
          A==>H
          end

          subgraph WEBVIEW
          F
          end

          subgraph SERVER
          D
          E-->D
          end

          A[Binary]
          D(( localhost ))
          E[bundled resources]
          F[Window]
          H{Bootstrap}
          style RUST fill:${colors.yellow.light},stroke:${colors.yellow.dark},stroke-width:4px
          style WEBVIEW fill:${colors.blue.light},stroke:${colors.blue.dark},stroke-width:4px
          style SERVER fill:#49A24A,stroke:#2B6063,stroke-width:4px`
        },
        {
          name: 'Cloudbridge',
          most: 'MOST COMPLEX',
          intro: 'The Cloudbridge recipe combines the flexibility of a localhost and the security of the bridge. With so many features, it can be easy to get lost.',
          ratings: {
            easeOfUse: 2,
            security: 2,
            extensibility: 6,
            performance: 2
          },
          bestWhen: 'Best when your project is complex and you need all available options.',
          pros: [
            'All available features',
            'Rust skills not required'
          ],
          cons: [
            'Largest bundle size',
            'Hard to separate concerns'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: true                // ship with a localhost server
  },
  whitelist: {
    all: true                   // enable entire API
  },
  security: {
    csp: 'default-src data: http: https: \\'unsafe-eval\\' \\'unsafe-inline\\''
  }
}
\`\`\`
          `,
          graph: `graph LR
          A== Bootstrap ==>F
          A[Rust Binary]
          F[WebView Window]
          `
        },
        {
          name: 'Kamikaze',
          most: 'MOST AWESOME',
          intro: 'The Kamikaze recipe is a minimal usage of the Bridge pattern, which only allows interaction between Rust and the Window via expiring JS Promise Closures that are injected into the Window by Rust and nulled as part of the callback.',
          ratings: {
            easeOfUse: 2,
            security: 6,
            extensibility: 4,
            performance: 5
          },
          bestWhen: 'Best when you want Rust to drive the Webview.',
          features: [
            'Locked down interface.'
          ],
          pros: [
            'Highest security rating',
            'Elegant and powerful'
          ],
          cons: [
            'Rust skills required',
            'No remote resources'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: false               // do not use a localhost server
  },
  whitelist: {                  // all API endpoints are default false
    event: true,                // Use the EVENT API for injections
  },
  security: {
    csp: 'default-src data: \\'unsafe-eval\\' \\'unsafe-inline\\'',
    fASLR: 'aot'               // bootstrap with dynamic AOT of interface on launch
    messageSalt: 'otp',        // use One-Time-Pads for injected function handles
    eventRecycle: 0            // never use an event twice
  }
}
\`\`\`
          `,
          graph: `graph LR
          H==>F
          G-.->B
          B-->G
          subgraph WEBVIEW
          G-->F
          end

          subgraph RUST
          A-->B
          A==>H
          end

          A[Binary]
          B[API:Event]
          F[Window]
          G((Promise Closure))
          H{Bootstrap}
          style RUST fill:${colors.yellow.light},stroke:${colors.yellow.dark},stroke-width:4px
          style WEBVIEW fill:${colors.blue.light},stroke:${colors.blue.dark},stroke-width:4px`
        },
        {
          name: 'Multiwin',
          most: 'COMING SOON ',
          intro: 'The Multiwin recipe will allow you to have multiple windows, some of which may be GL based.\n\nPlease note: This Pattern is not yet available.',
          ratings: {
            easeOfUse: 1,
            security: 5,
            extensibility: 4,
            performance: 3
          },
          bestWhen: 'Best when you need more than one window.',
          pros: [
            'Access to GL context',
            'Separation of concerns'
          ],
          cons: [
            'Extremely complex',
            'Not yet available'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: false               // do not use a localhost server
  },
  whitelist: {                  // all API endpoints are default false
    event: true,                // Use the EVENT API for injections
  },
  security: {
    csp: 'default-src data: \\'unsafe-eval\\' \\'unsafe-inline\\'',
    fASLR: 'aot'               // bootstrap with dynamic AOT of interface on launch
    messageSalt: 'otp',        // use One-Time-Pads for injected function handles
    eventRecycle: 0            // never use an event twice
  }
}
\`\`\`
          `,
          graph: `graph LR
          A==>H
          H==>F
          H==>G
          subgraph WEBVIEW
          F
          end
          subgraph GLUTIN
          G
          end
          subgraph RUST
          A
          end

          A[Binary]
          F[Window]
          G[GL Window]
          H{Bootstrap}
          style GLUTIN stroke:${colors.blue.dark},stroke-width:4px
          style RUST fill:${colors.yellow.light},stroke:${colors.yellow.dark},stroke-width:4px
          style WEBVIEW fill:${colors.blue.light},stroke:${colors.blue.dark},stroke-width:4px`
        },
        {
          name: 'GLUI',
          most: 'EXPERMIMENTAL',
          intro: 'The GLUI is a research pattern that we will use internally to test approaches using a GLUTIN window. We\'re not sure yet if it will make the final cut as a bona fide alternative to Webview, although early tests with transparent and multiwindow are exciting.\n\nPlease note: This Pattern is not available.',
          ratings: {
            easeOfUse: 0,
            security: 0,
            extensibility: 0,
            performance: 5
          },
          bestWhen: 'Best when you want to help Tauri evolve.',
          pros: [
            'Framebuffer FTW',
            'Window events rigged'
          ],
          cons: [
            'In development',
            'Broken on your machine'
          ],
          configMD: `
\`\`\`
tauri: {
  embeddedServer: {
    active: false               // do not use a localhost server
  },
  whitelist: {                  // all API endpoints are default false
    all: false,                // Use the EVENT API for injections
  },
  window: {
    glutin: true,
    webview: false
  }
}
\`\`\`
          `,
          graph: `graph LR
          A==>H
          H==>G
          A-->D
          D-->G

          subgraph GLUTIN
          G
          end

          subgraph RUST
          A
          end

          A[Binary]
          D(Framebuffer)
          G[GL Window]
          H{Bootstrap}
          style GLUTIN stroke:${colors.blue.dark},stroke-width:4px
          style RUST fill:${colors.yellow.light},stroke:${colors.yellow.dark},stroke-width:4px`
        }
      ]
    }
  },
  watch: {
    pattern: {
      handler (val, oldVal) {
        oldVal = !oldVal ? 'none' : oldVal
        val = !val ? 'none' : val
        const pattern = this.patterns.find(pattern => pattern.name === val)
        if (typeof pattern !== 'undefined') this.goMermaid(pattern.graph)
      },
      immediate: true
    }
  },
  computed: {
    toc: {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    },
    active: {
      get () {
        return this.patterns.find(p => p.name === this.pattern)
      }
    }
  },
  mounted () {
  },
  methods: {
    onToc (toc) {
      // add anything not picked uip by the markdown processor
      // toc.push({ id: 'Tauri-API', label: 'Tauri API', level: 1, children: Array(0) })
      // toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    },
    goMermaid (pattern) {
      // null it so that we don't accidentally append
      if (typeof window !== 'undefined') {
        this.graph = null

        // otherwise mermaid gets lost
        this.$nextTick(() => {
          this.graph = this.$mermaid.render('mermaid', pattern)
          // then measure height of svg
          // resize card / dom
        })
      }
    }
  }
}
</script>
<style lang="stylus">

#mermaid .arrowheadPath
  fill #2B6063!important
#mermaid .path
  stroke #2B6063!important
</style>
