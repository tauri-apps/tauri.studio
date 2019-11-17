(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["692f86f8"],{"4ce1":function(e,n,t){"use strict";var i=t("6bb1"),a=t.n(i);a.a},"5d68":function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("hero",[t("div",{staticStyle:{"padding-top":"260px"},attrs:{id:"padding"}}),t("q-markdown",{attrs:{src:e.markdown,toc:"","line-number-alt":"$"},on:{data:e.onToc}}),t("q-page-scroller",{attrs:{position:"bottom-right","scroll-offset":150,offset:[18,18]}},[t("q-btn",{attrs:{fab:"",icon:"keyboard_arrow_up",color:"warning"}})],1)],1)},a=[],o=t("2514"),s="## Security \nThis guide seeks to explain the high level concepts and Security Features at the core of Tauri's design that make you, your apps and your users safer by default.\n\n::: tip Please Note\nWhile we take every opportunity to help you harden your application - there are always underlying threats like BIOS attacks, memory rowhammering and other operating system vulnerabilities that are constantly being discovered and (in the best cases) responsibly disclosed.\nFurthermore, there are many ways that development teams can cut corners and either leak sensitive information or leave doors wide open to any of a range of attacks. Security is a never-ending quest, and your users count on you to keep them safe.\nTherefore, we highly recommend that you take some time to consider the security ramifications of everything that your application does, especially in the context of running on the semi-hostile platform of end-user devices.\nIf you need help or want a review, you are welcome to contact the Tauri team for security consultation.\n:::\n\n### Security Researchers\nIf you feel that there is a security concern or issue with anything in Tauri, please do not publicly comment on your findings. Instead, reach out directly to our security team:\n\n> <center>security@tauri-apps.org</center>\n\nAlthough we do not currently have a budget for Security Bounties, in some cases we will consider rewarding responsible disclosure with our limited resources.\n\n## Secure by Design \n\n### Dynamic Ahead of Time Compilation\nThis process of compilation happens several times during the build phase of a Tauri app. By using a dynamic Ahead of Time compiler, you can generate code references that are unique for every session and are still technically static code units.\n\n### One Time Pad Tokenization and Hashing\nHashing important messages with a OTP salt, you are able to encrypt messages between the UI and the Rust backend.\n\n### functional ASLR\nFunctional address Space Layout Randomization techniques randomize function names at runtime and can implement OTP hashing so no two sessions are ever the same. We propose a novel type of function naming at boot time and optionally after every execution. Using a UID for each function pointer prevents static attacks.\n\n### Bridge, don't serve\nInstead of passing potentially unsafe functions, a bridge can be used to pass messages and commands to named brokers at each respective side of the bridge. Most of the time you don't NEED a local server, and its inclusion opens security gaps in the final application.\n\n### API Whitelisting\nYou have the ability to pick and choose which API functions are available to the UI and to Rust. If they are not enabled, the code will not be shipped with your app, which reduces binary size and attack surface.\n\n### Kamikaze Function Injection\nThis advanced type of fASLR using the `EVENT` API endpoint, is a promise wrapped in a closure (with randomized handle) that Rust inserts at runtime into the Webview, where its interface is locked within the promise resolution handler and is nulled after execution.\n\n### Content Security Policy Management\nPreventing unauthorized code execution for websites has long since been \"resolved\" by using CSPs. Tauri can inject CSPs into the index.html of the user interface, and when using a localhost server it will also send these headers to the UI or any other clients that connect with it.\n\n### Decompilation is Difficult\nThis means that your apps cannot be easily decompiled as is the case with Electron ASAR  files, which makes the process of reverse engineering your project much more time intensive and requires specialist training.\n\n### Signed Binaries\nBecause the entire project is shipped within a monolithic binary, code can be signed for all distributables. This makes it virtually impossible for hackers to change an installed Application without the operating system noticing. [Reference](https://github.com/electron/asar/issues/123)\n\n### Post-Binary Analysis\nUse industrial-grade pentester-tooling (via our custom Tauri-Frida GUI) to discover and fix security weaknesses in your final binaries. \n\n### Post-Binary Enhancement\nAfter the build is before the shipping, and Tauri will provide you with advanced processes for integrated licensing including multi-layer checksums,\n\n## Audits\nWe have not yet undertaken an audit, but this is planned to be realized before the 1.0 stable release.\n",r=t("d152"),c={name:"PageIndex",components:{Hero:o["a"]},data:function(){return{markdown:s,json:r}},computed:{toc:{get:function(){return this.$store.state.common.toc},set:function(e){this.$store.commit("common/toc",e)}}},methods:{onToc:function(e){this.toc=e}}},u=c,l=(t("4ce1"),t("2877")),d=Object(l["a"])(u,i,a,!1,null,null,null);n["default"]=d.exports},"6bb1":function(e,n,t){}}]);