# Introduction

Tauri is a polyglot system that uses:
- git
- node
- rust
- github actions

It can be developed on Mac, Linux and Windows.


## Contribution Flow
File an Issue
Fork the Repository
Make your Changes
Make a PR
Win

## Hands On Example
Let's make a new example. That's a great way to learn. We are going to assume you are on a nixy type of environment like Linux or MacOS and have all of your development dependencies like rust and node already sorted out.

```
git clone @tauri-apps/tauri
cd tauri/cli/tauri.js
yarn
mkdir ../../examples/vanillajs && cd "$_"
```

```
  "tauri:source": "node ../../../cli/tauri.js/bin/tauri",
```

```
  [dependencies.tauri]
  path = "../../../../tauri"
  features = [ "all-api", "edge" ]
```
