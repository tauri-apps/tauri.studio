## Test Drive
This assumes you have git, node 10LTS or above, yarn, rust and cargo installed. If not, see below.

```bash
npm install -g tauri
git clone https://github.com/tauri-apps/tauri
cd examples/vue/quasar-app
yarn
cargo install tauri-cli
tauri build
```

After tauri has compiled its rust resources, look in the `src-tauri/target/release/bundle`.

## Add Rust and Build Toolchain
### Windows 64 or 32 bit

First you should [download](https://aka.ms/buildtools) and install Visual Studio MSBuild Tools and C++ build tools.

> This is a big download (over 1GB) and takes the most time, so go grab a :coffee:

Chocolatey is a great package manager for Windows. Follow these [these official instructions](https://chocolatey.org/install), or just do this:

Then install [nvm-windows](https://github.com/coreybutler/nvm-windows)
Then install Chocolatey

```powershell
# BE SURE YOU ARE IN AN ADMINISTRATIVE PowerShell!
nvm install 10.16.3
nvm use 10.16.3
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco install yarn
```
If you are running Windows 64-bit, download and run [rustup‑init.exe](https://win.rustup.rs/x86_64) and then follow the onscreen instructions.

If you are running Windows 32-bit, download and run [rustup‑init.exe](https://win.rustup.rs/i686) and then follow the onscreen instructions.

#### Enable loopback
Microsoft disables the loopback interface - you need to whitelist it:

Open an administrative console and enter:
```
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"
```

#### Devtools
https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide

<hr>

### Arch
According to the Arch manual, this is something you were born knowing. But seriously, if you want to help out
explaining how newbies to Arch can do this, please feel free to make a PR to this doc.

### BSD
Similar to Arch, you already have everything installed because you compile kernels. However:
- Execution on OpenBSD requires wxallowed mount(8) option.
- FreeBSD is also supported, to install webkit2 run pkg install webkit2-gtk3.

### Ubuntu
First install Ubuntu then:

    $ sudo apt update && sudo apt install libwebkit2gtk-4.0-dev build-essential

### MacOS
    $ brew install gcc

### Everybody except Windows

    $ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

> We have audited this bash script, and it does what it says it is supposed to do. Nevertheless, before blindly curl-bashing a script, it is always wise to look at it first. Here is the file as a mere [download link](https://sh.rustup.rs)

Make sure that `rustc` and `cargo` are in your $PATH. Run

    $ rustc --version
    latest update on 2019-11-07, rust version 1.39.0

and make sure you are on latest update on 2019-11-07, rust version 1.39.0 - otherwise be sure to update.

    $ rustup update stable
    $ rustup override set 1.39.0


## About rustup
- (from their [website](https://rustup.rs))

`rustup` installs rustc, cargo, rustup and other standard tools to Cargo's bin directory. On Unix it is located at `$HOME/.cargo/bin` and on Windows at `%USERPROFILE%\.cargo\bin`. This is the same directory that cargo install will install Rust programs and Cargo plugins.

This directory will be in your `$PATH` environment variable, which means you can run them from the shell without further configuration. **Open a new shell** and type the following:

    $ rustc --version

or run:

    source $HOME/.cargo/env

    # and then

    $ rustc --version

If you don't see 1.39.0 or later, then you'll need to upgrade your rust.

    $ rustup update stable
    $ rustup override set 1.39.0

## bundler
After you have installed Rust and the build toolchain, it is wise to open a new shell before continuing.

Setup the bundler:

    $ cargo install tauri-cli --force


## error reporting
Please report all library errors at https://github.com/tauri-apps/tauri
