## Consumption Paradigms
Its not about optimizing for the individual developer, but for the team. Tauri is not opinionated about what framework your web-interface is built with, and offers you easily configurable options.

This combination of power, safety and usability are why we chose Rust to be the default binding for Tauri. It is our intention to provide the most safe and performant native app experience (for devs and app consumers), out of the box.

To this end, we have spent a great deal of time creating an especially secure localhost-free backend for the security conscious application-artisans. This means that your app does not use a localhost server, as is generally the case with cordova apps. This also has the positive side effect, that less code is needed and the final binaries are smaller.

### For new projects
If you are making a greenfield project, you can literally choose anything that compiles to JS (soon WASM will also be supported).

### For existing projects
While it may seem at first glance complex, the fact that Tauri is framework agnostic and polyglot makes it very flexible. Chances are good that you already have a working legacy (or not so legacy) system that just doesn't warrant a completely new architecting - so you shouldn't have to retool in order to 

::: tip
This means that legacy systems can be relatively trivially given a [brownfield development](https://en.wikipedia.org/wiki/Brownfield_(software_development)) treatment. :star:
:::

