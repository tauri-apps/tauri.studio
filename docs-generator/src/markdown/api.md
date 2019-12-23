The Tauri API is a set of opt-in tools that you can enable in order to do things like read and write from the filesystem and pass messages back and forth between the WebView and Rust. There are two parts to it, the Rust API and the JS API. The former is consumed in your `src-tauri/src/main.rs` file, and the latter is available at the `window.tauri` object.

## Installation
If you want to use the API, you will need to first choose how to integrate it into your UI. There are two suggested methods:
1. Use the webpack plugin (better)
2. Inject the official helper (easier)

### Webpack Plugin
Webpack will take care of everything for you, so after you have this done right, you can use `window.tauri` wherever you need to.
#### Installation
```bash
yarn add @tauri-apps/tauri-webpack
```

#### Integration
In your webpack config, add the following:
```js
chainWebpack (chain) {
  require('@tauri-apps/tauri-webpack').chain(chain, {
    tauriLazyLoading: !ctx.dev
  })
}
```

### Official Helper
The official helper waits for


They are configured in the `tauri.conf.js` file with the following object:

## Whitelist
```
whitelist: {              // all whitelist values are default:false
  all: false,             // use this flag to enable all API features
  answer: false,          // enable rust to direct the UI
  event: false,           // enable listening to messages from webview
  execute: false,         // enable application execution
  listFiles: false,       // list files in a directory
  open: false,            // open link in a browser
  readBinaryFile: false,  // read binary file from local filesystem
  readTextFile: false,    // read text file from local filesystem
  setTitle: false,        // set the window title
  writeFile: false        // write file to local filesystem
},
```

These features will be added to your project's `src-taurl/Cargo.toml` at build time (regardless of whether you are bundling or dev'ing). The API functions that you are not using will be stubbed by tree-flattening (the body of the function will merely reject() instead of throwing), so that there are no orphan functions still available in the JS bundle. This reduces the vulnerability footprint.

```
/**
 * @module tauri
 * @description This API interface makes powerful interactions available
 * to be run on client side applications. They are opt-in features, and
 * must be enabled in tauri.conf.js
 */

/**
  * @name invoke
  * @description Calls a Tauri Core feature, such as setTitle
  * @param {Object} args
  */

/**
  * @name addEventListener
  * @description Add an event listener to Tauri back end
  * @param {String} event
  * @param {Function} handler
  * @param {Boolean} once
  */

/**
  * @name emit
  * @description Emits an evt to the Tauri back end
  * @param {String} evt
  * @param {Object} payload
  */

/**
  * @name transformCallback
  * @description Registers a callback with a uid
  * @param {Function} callback
  * @param {Boolean} once
  * @returns {*}
  */

/**
  * @name promisified
  * @description Turns a request into a chainable promise
  * @param {Object} args
  * @returns {Promise<any>}
  */

/**
  * @name readTextFile
  * @description Accesses a non-binary file on the user's filesystem
  * and returns the content. Permissions based on the app's PID owner
  * @param {String} path
  * @returns {*|Promise<any>|Promise}
  */

/**
  * @name readBinaryFile
  * @description Accesses a binary file on the user's filesystem
  * and returns the content. Permissions based on the app's PID owner
  * @param {String} path
  * @returns {*|Promise<any>|Promise}
  */

/**
  * @name writeFile
  * @description Write a file to the Local Filesystem.
  * Permissions based on the app's PID owner
  * @param {Object} cfg
  * @param {String} cfg.file
  * @param {String|Binary} cfg.contents
  */

/**
  * @name listFiles
  * @description Get the files in a path.
  * Permissions based on the app's PID owner
  * @param {String} path
  * @returns {*|Promise<any>|Promise}
  */

/**
  * @name listDirs
  * @description Get the directories in a path.
  * Permissions based on the app's PID owner
  * @param {String} path
  * @returns {*|Promise<any>|Promise}
  */

/**
  * @name setTitle
  * @description Set the application's title
  * @param {String} title
  */

/**
  * @name open
  * @description Open an URI
  * @param {String} uri
  */

/**
  * @name execute
  * @description Execute a program with arguments.
  * Permissions based on the app's PID owner
  * @param {String} command
  * @param {String|Array} args
  * @returns {*|Promise<any>|Promise}
  */

```


## Custom commands

Rig your command in `src-tauri/src/cmd.rs` and define it in `src-tauri/src/main.rs`

### Rust
If your command is defined in rust as `MyCustomCommand`, you must use `myCustomCommand` in JS.

### ES
```js
tauri.invoke({ cmd: 'myCustomCommand', argument: 'thing' })
```
Calling this will write the word 'thing' in the Rust console in a Vanilla Tauri app.

## Promise response
```js
const response = await tauri.promisified({ cmd: 'myCustomCommand', argument: 'thing' })
```


## Response listener
If you expect an event, but don't know when, you can add an event listener. This way, when Rust finishes working it merely needs to emit the handle being expected and then your code can react to that.

```js
// Keep listening
tauri.addEventListener('key-generated', res => {
  console.table(res.payload.publicKey)
})
```

```js
// Just listen for one event only.
tauri.addEventListener('key-generated', res => {
  console.table(res.payload.publicKey)
}, true)
```

## Event
Here is a `src-tauri/main.rs` file that uses the Event API to rig Rust to listen for an event named `hello`, it then puts that in a `Reply` struct and passes the stringified struct back the WebView as a JSON object as an event `reply`.

```rust
// rustlang
mod cmd;

#[macro_use]
extern crate serde_derive;
extern crate serde_json;

fn main() {
  tauri::AppBuilder::new()
    .setup(|_webview| {
      let handle = _webview.handle();
      tauri::event::listen("hello", move |msg| {
        #[derive(Serialize)]
        pub struct Reply {
          pub msg: String,
          pub rep: String
        }

        let reply = Reply {
          msg: format!("{}", msg).to_string(),
          rep: "something else".to_string()
        };

        tauri::event::emit(&handle, "reply",  serde_json::to_string(&reply).unwrap());

        println!("Message from emit:hello => {}", msg);
      });
    })
    .build()
    .run();
}
```

On the WebView side, your code can look like this:
```js
eventToRust () {
  tauri.emit('hello', this.entry)
}
// set up an event listener

tauri.addEventListener('reply', res => {
  console.table(res)
  this.entry = res.payload.msg
})
```

But as long as `event: true` is set in `tauri.conf.js`, you can always emit from any part of your code. Here are a few more examples of things you can do:
```rust
tauri::event::emit(handle, "reply",  serde_json::to_string(&reply).unwrap());
tauri::event::emit(handle, "reply", "{'msg': 'changed by rust emit'}".to_string());
tauri::event::emit(handle, "reply", "eval(alert('you really should know better'))".to_string());
```

::: warning
Because of the way that this injection works, events can be very difficult to trace and may fail silently.
:::



    build: {
      distDir: distDir, (string required)
      devPath: 'http://localhost:7334' // devServer URL or path to folder where index.html is found
    },
    ctx: {
      prod: false,          // readonly
      dev: false,           // readonly
      debug: false          // readonly
    },
    tauri: {
      embeddedServer: {
        active: false
      },
      bundle: {
        active: true
      },
      whitelist: {        // all whitelist values are default:false
        all: false,             // use this flag to enable all API features
        answer: false,          // enable rust to direct the UI
        event: false,           // enable listening to messages from webview
        execute: false,         // enable application execution
        listFiles: false,       // list files in a directory
        open: false,            // open link in a browser
        readBinaryFile: false,  // read binary file from local filesystem
        readTextFile: false,    // read text file from local filesystem
        setTitle: false,        // set the window title
        writeFile: false        // write file to local filesystem
      },
      window: {
        title: 'Tauri App',
        width: 800,
        height: 600,
        resizable: true
      },
      security: {
        csp: 'default-src data: filesystem: ws: http: https: \'unsafe-eval\' \'unsafe-inline\''
      },
      edge: {
        active: true
      }
    }
  }
