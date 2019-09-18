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

## Sustainability
This is a
### Open Source
To the extent 

### Organizational Structure
Tauri apps is governed by the community and work is done in the context of public working groups. Each working group has a dedicated channel on the Discord server as well as a Team on GitHub. Other than that, each WG is free to use whatever type of organizational model it chooses.
 
 The current working groups are: 
- WG Governance & Guidance
- WG Tech
- WG Education
- WG Media
- WG Security

With the exception of the security working group, which is by invite only and convenes privately, all other working groups are public and open to any and all participants.

Please visit [this repository](https://github.com/tauri-apps/governance-and-guidance) to get more information.
