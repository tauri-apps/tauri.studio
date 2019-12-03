# The Tauri API

The Tauri API is a set of opt-in tools that you can enable in order to do things like read and write from the filesystem and pass messages back and forth between the WebView and Rust. They are configured in the `tauri.conf.js` file with the following object:

```
whitelist: {              // all whitelist values are default:false
  all: false,             // use this flag to enable all API features
  answer: false,          // enable rust to direct the UI
  bridge: false,          // enable Tauri Bridge
  event: false,           // enable binding to message
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
 * Each binding MUST provide these interfaces in order to be compliant,
 * and also whitelist them based upon the developer's settings.
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


  /**
   * @name bridge
   * @description Securely pass a message to the backend.
   * @example
   *  this.$q.tauri.bridge('QBP/1/ping/client-1', 'pingback')
   * @param {String} command - a compressed, slash-delimited and
   * versioned API call to the backend.
   * @param {String|Object}payload
   * @returns {*|Promise<any>|Promise}
   */


  /**
   * @name setup
   * @description Inform Rust that the webview has initialized and is
   * ready for communication
   */
  static setup () {
    document.querySelector('body').addEventListener('click', function (e) {
      let target = e.target
      while (target != null) {
        if (target.matches ? target.matches('a') : target.msMatchesSelector('a')) {
          tauri.open(target.href)
          break
        }
        target = target.parentElement
      }
    }, true)

    tauri.invoke({
      cmd: 'init'
    })
  }
}
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
Here is a `src-tauri/main.rs` file that uses the Event API to rig Rust to listen for an event named `hello`, it then puts that in a `Reply` struct and passes the stringified struct back the WebView as a JSON object as an event `reply`. If you need a more performant version of this, consider using the `Bridge`.

```rust
// rustlang
fn main() {
  tauri::AppBuilder::new()
  .invoke_handler(|_webview, arg| {
    use cmd::Cmd::*;
    let handle = _webview.handle();
    tauri::event::listen("hello", |msg| {

      #[derive(Serialize)]
      pub struct Reply {
        pub msg: String,
        pub rep: String
      }

      let reply = Reply {
        msg: format!("{}", msg).to_string(),
        rep: "something else".to_string()
      };

      tauri::event::emit(handle, "reply",  serde_json::to_string(&reply).unwrap());

      println!("Message from emit:hello => {}", msg);
    })
    .build()
    .run();
  }
});
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
