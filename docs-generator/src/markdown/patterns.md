# Introduction

There are many ways to use Tauri, and on this page we have collected 4 major patterns.

## Cloudish
The Cloudish recipe is a pattern for maximum flexibility and app performance.  
### Features
- ships with a rust-based localhost server 
- works out of the box
 - can utilize CSP for extra security
### Best When
 - starting out building Tauri apps if you have never used Rust before.
### Pros
- easy to use
- best WebAPI compliance  
### Cons:
- hard to secure against Man in the Machine attacks
 - gives you an easy excuse not to learn Rust
## Trollbridge
The Trollbridge recipe is a pattern for the highest degree of operational security.  
### Features
 - render UI securely at bootstrap 
- promise based message passing 
- RW access to filesystem 
- STDOUT access to other binaries 
- extensible with Rust functions 
- whitelist for functional codegen
- runtime message salting - fASLR & AoT Compiling

### Best When
- you are paranoid about security but still need the power of Rust.  

### Pros
- highly configurable and infinitely extensible	  

### Cons
- rust skills virtually required

## Cloudbridge
The Cloudbridge combines the flexibility of a localhost and the security of the bridge.   

### Features
- all bridge features 
- all localhost features

### Best When
- your project is complex and you need all the power available.

### Pros
- best of both worlds	  

### Cons
- rust skills helpful
- complexity can make it challenging to keep your application from becoming  bloated 

## Hermit
The Hermit recipe is a pattern for ultimate application isolation where all logic is self-contained.  

### Features
- render UI securely at bootstrap 
- no communication with Rust 
- CSP blocks all external resources 
- fASLR  & AoT Compiling  

### Best When
- you want to limit interaction with anything outside of the scope of the user interface like for a game.

### Pros
- safest possible distribution target  

### Cons
- limited device interaction
