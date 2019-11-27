<template>
  <hero>
    <div id="padding" style="padding-top:260px"></div>
    <q-markdown toc @data="onToc">
## High Level Overview
Tauri is a polyglot system for building apps. It uses NodeJS to scaffold an HTML/JS rendering Window as a User Interface that is bootstrapped and managed by Rust. The final product is a monolithic binary that can be distributed as common file-types for Windows (exe/msi), Linux (deb/appimage) and Macintosh (app/dmg).

The following is merely an explanation of how Tauri works. If you want to skip this and dive right in, then please visit the [Quick Start](/docs/quickstart) section.

### Setting up Your Environment
We are assuming that you know what the command line is, how to install packages on your operating system and generally know your way around the development side of computing. Obviously, you must first make sure that all required languages / compilers are available and in your PATH. Then you globally install the Tauri CLI with your Node package manager.

### Initializing an App
The initialization phase creates a folder and places a few template files into your project directory. The most important file that it creates is the `tauri.conf.js` file, as this is where you manage the configuration of your project.

### Developing an App
There are several methods for developing an App and using the built-in development App Window. The most common is to point the Tauri configuration at a localhost port that your front-end framework's development server provides you with. If your framework doesn't provide you with this, or you like everything vanilla, then you can instruct Tauri to serve (and transpile if needed) from a relative file path. In both cases you will have HMR (Hot Module Reloading).

### Making App Icons
Your app will need icons, and Tauri also provides a command for making all the icons your app will need, no matter which platform you are using. Simply place a 1240x1240 png (with transparency) named `app-icon.png` in your project folder (where the `tauri.conf.js` file is to be found) and run `tauri icon`. The icons will be placed in `src-tauri/icons` and automatically consumed by Tauri during the build process.

### Bundling an App
The basic process of building a Tauri App is very straightforward and unopinionated. In the Tauri configuration file you reference a distribution folder e.g. `../dist/spa` where your HTML, CSS, JS and other assets can be found. Then you tell the Tauri CLI to build your app. Tauri prepares your code depending upon your configuration and bundles everything up into a nice and tidy binary.

> The first time you build a project it will take some time to collect the resources that Tauri needs from the relevant Rust Crates, but subsequent builds will be much faster.

## Technical Details
### CLI
The CLI is node.js based, because it is arguably the most accessible for the majority of the web-development community. Using Tauri requires the latest LTS because we track security patches.

### User Interface
The first generation User Interface in Tauri apps leverages Cocoa/WebKit on macOS, gtk-webkit2 on Linux and MSHTML (IE10/11) or Webkit via EdgeHTML / Chakra on Windows. **Tauri** leverages the MIT licensed prior work known as [webview](https://github.com/zserge/webview) and [web-view](https://github.com/Boscop/web-view).

## The Templates
TEMPLATES
---
First is the tauri.conf.js file - it is injected into the CWD at tauri init.
Then is the src-tauri folder, which is injected into the CWD and contains the rust stuff
Then is the tauri.js FILE that is constructed during the dev / build process according to the API settings that are configured in tauri.conf.js and is injected into /src-tauri
The node CLI has a bunch of "syntactic" sugar that sets up the dev env or prepares assets for the bundle process (as well as the tauri icon command for making icons.)
The next piece is the actual rust crate that binds web-view, constructs the webview and has the API (file read / write, etc.)
Finallly, the bundler, which takes all the stuff and puts it together in a nice and easy to consume binary for the three 1/2 desktop OS's

## Why Rust
> Rust is blazingly fast and memory-efficient: with no runtime or garbage collector, it can power performance-critical services, run on embedded devices, and easily integrate with other languages. Rust’s rich type system and ownership model guarantee memory-safety and thread-safety — and enable you to eliminate many classes of bugs at compile-time. Rust has great documentation, a friendly compiler with useful error messages, and top-notch tooling — an integrated package manager and build tool, smart multi-editor support with auto-completion and type inspections, an auto-formatter, and more. - [https://www.rust-lang.org/](https://www.rust-lang.org/)

This combination of power, safety and usability are why we chose Rust to be the default binding for Proton. It is our intention to provide the most safe and performant native app experience (for devs and app consumers), out of the box.

If you want a deep and rather nerdy look into Rust, check out what insider Tony Arcieri has to say in his article, [Rust in 2019. Security, maturity, stability](https://tonyarcieri.com/rust-in-2019-security-maturity-stability)

### Learning Rust 🦀❤️
You don't need to know Rust at all to use (most of) Tauri - but as with all things, the rabbit hole goes as deep as you are willing to dive. If you are new to Rust, then we recommend first watching this amazing playlist of tutorials from Team Member [@tensor](https://tensor-programming.com/):
- [Intro to Rust](https://www.youtube.com/playlist?list=PLJbE2Yu2zumDF6BX6_RdPisRVHgzV02NW)
- [Rust Projects](https://www.youtube.com/playlist?list=PLJbE2Yu2zumDD5vy2BuSHvFZU0a6RDmgb)

But if you are like us, just watching awesome people do stuff isn't enough. That's why we absolutely MUST recommend that you immediately curlbash [Rustlings](https://github.com/rust-lang/rustlings):
```bash
curl -L https://git.io/rustlings | bash
```
Why? Because it is an interactive leap into coding with Rust that forces you to solve compiler errors in order to progress in your understanding. It is addictive, so block a few hours and just do it!

At some point, learning about Rust will require a visit to the manual. Check it out:
- [Rust 1.31.0+](https://doc.rust-lang.org/stable/book/) by Steve Klabnik & Carol Nichols

And finally, there are a couple Rust communities on Discord that you can always fall back on if you need estra support:
- [Rust Community Discord](https://bit.ly/rust-community)
- [Rust Development Discord](https://discord.gg/SG3m9pk)
    </q-markdown>
    <!-- <div class="text-center full-width" v-html="graph"></div> -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import markdown from '../markdown/tauri.md'
import json from '../json/tauri.json'

export default {
  name: 'Introduction',

  components: {
    Hero
  },

  data () {
    return {
      markdown: markdown,
      json: json,
      graph: '',
      flow: {
        lifecycle: `
        graph LR
          A==>H
          H==>G
          A-->D
          D-->G
        `
      }
    }
  },
  mounted () {
    this.goMermaid(this.flow.lifecycle)
  },
  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
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
</script>
