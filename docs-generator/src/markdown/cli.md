# Introduction
The main Tauri CLI is a NodeJS program that has a number of subcommands:
- [init](/docs/cli#init)
- [dev](/docs/cli#dev)
- [build](/docs/cli#build)
- [icon](/docs/cli#icon)

## init
```
  Description
    Inits the Tauri template. If Tauri cannot find the tauri.conf.js
    it will create one.
  Usage
    $ tauri init
  Options
    --help, -h        Displays this message
    --force, -f       Force init to overwrite [conf|template|all]
    --log, -l         Logging [boolean]
    --directory, -d   Set target directory for init
    --tauriPath, -t   Path of the Tauri project to use (relative to the cwd)
```

## dev
```
  Description
    Tauri dev.
  Usage
    $ tauri dev
  Options
    --help, -h     Displays this message
```
This command is rigged via your `tauri.conf.js`.


## build
```
  Description
    Tauri build.
  Usage
    $ tauri build
  Options
    --help, -h     Displays this message
```
This command is rigged via your `tauri.conf.js`.

## icon
```
  Description
    Create all the icons you need for your Tauri app.

  Usage
    $ tauri icon

  Options
    --help, -h          Displays this message
    --log, l            Logging [boolean]
    --icon, i           Source icon (png, 1240x1240 with transparency)
    --target, t         Target folder (default: 'src-tauri/icons')
    --compression, c    Compression type [pngquant|optipng|zopfli]
```
