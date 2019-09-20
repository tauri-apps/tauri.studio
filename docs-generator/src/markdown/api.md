The Tauri API 

```
whitelist: {                  // all whitelist values are default:false
  all: false,                 // use this flag to enable all API features
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
```
