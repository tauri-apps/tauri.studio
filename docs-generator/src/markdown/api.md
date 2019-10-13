The Tauri API 

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
