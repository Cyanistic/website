---
title: "I Built a Rust Reflection System That Doesn't Need Per-Type Code"
description: "A Rust library that discovers which traits a type implements at compile time, with zero per-type boilerplate. Generic capabilities, adapter traits, and stable Rust."
pubDate: 2025-06-03
tags: ["rust", "reflection", "traits", "macros"]
---

I was building a system where I needed to dispatch on trait bounds without enum-based type tagging. Every existing Rust reflection solution required per-type registration — derive `Reflect` on every type, annotate every variant, or register every concrete type. That defeated the whole point.

So I wrote a library that does the opposite: register a capability **once per trait**, and it applies to every type that implements that trait. Past, present, and future.

[![crates.io](https://img.shields.io/crates/v/irys.svg)](https://crates.io/crates/irys)
[![docs.rs](https://docs.rs/irys/badge.svg)](https://docs.rs/irys)
[![GitHub](https://img.shields.io/badge/GitHub-Cyanistic/irys-blue?logo=github)](https://github.com/Cyanistic/irys)

## What It Does

Five types implementing `Display`? One registration. Five hundred types? Still one registration.

```rust
use irys::*;
use std::fmt;

// 1. Define a capability
struct DisplayCap;
impl Capability for DisplayCap {
    type Handle = dyn fmt::Display;
}

// 2. Register it — ONE time, covers ALL types that implement Display
register_capability! {
    slot: 0,
    cap: DisplayCap,
    trait_bound: fmt::Display,
}

// 3. Reflect any value — capabilities are detected automatically
let envelope = reflect!("hello world");
assert!(envelope.has::<DisplayCap>());

let display = envelope.get::<DisplayCap>().unwrap();
assert_eq!(format!("{}", display), "hello world");
```

No derives. No proc macros. No per-type annotations. Just one `register_capability!` call and it works on any type that satisfies the bound.

## How It Works

The trick is **autoref specialization** combined with **const generics** on stable Rust.

`register_capability!` generates two impls per capability:

1. An inherent impl on `Probe<T, Registry, N>` with a trait bound (fires when `T: MyTrait`)
2. A blanket trait impl on `&Probe<T, Registry, N>` with no bound (a no-op fallback)

`reflect!` expands into a loop calling `.probe()` for each slot. Rust's method resolution prefers the inherent impl when the bound is satisfied, falling back to the no-op trait impl when it's not.

**The compiler resolves this statically** — there's no runtime branching. For capabilities a type doesn't have, the optimizer eliminates the no-op entirely. Zero runtime cost. Entire detection at compile time.

## Generic Capabilities

This is where irys does something no other Rust reflection library can do: register a capability with a generic type parameter, and let the compiler resolve it for every concrete instantiation.

```rust
use std::marker::PhantomData;

struct StreamCap<I>(PhantomData<I>);
impl<I: 'static> Capability for StreamCap<I> {
    type Handle = dyn Stream<Item = I> + Unpin;
}

// Register ONCE — works for ALL item types
register_capability! {
    slot: 0,
    cap: StreamCap<I>,
    trait_bound: Stream<Item = I> + Unpin,
    generics: [I: 'static],
}

// Query with specific types:
envelope.has::<StreamCap<String>>()    // does it stream strings?
envelope.has::<StreamCap<Event>>()     // does it stream events?
```

This works with any trait that has associated types or type parameters: `Iterator<Item=T>`, `Future<Output=T>`, `Stream<Item=T>`, `AsRef<T>`, etc.

The Rust compiler does the heavy lifting: it infers type parameters, catches ambiguities at compile time, and eliminates unmatched probes entirely.

## The Adapter Trait Pattern

The most powerful pattern: define an adapter trait with a blanket impl that composes multiple constraints, register it once, and it's automatically detected on any type satisfying the combination.

"I don't care WHAT this iterates — just that each item is serializable":

```rust
// The adapter trait — erases the item type
trait SerializableIter {
    fn next_ser(&mut self) -> Option<Box<dyn erased_serde::Serialize>>;
}

// Blanket impl — any Iterator with Serialize items qualifies
impl<T: Iterator> SerializableIter for T
where T::Item: erased_serde::Serialize + 'static {
    fn next_ser(&mut self) -> Option<Box<dyn erased_serde::Serialize>> {
        self.next().map(|item| Box::new(item) as _)
    }
}

struct SerializableIterCap;
impl Capability for SerializableIterCap {
    type Handle = dyn SerializableIter;
}

register_capability! { slot: 0, cap: SerializableIterCap, trait_bound: SerializableIter }
```

Now ANY iterator with serializable items is detected — `Vec<LogEntry>`, `Vec<Metric>`, anything. No per-type registration.

This completely skips the need to probe for every concrete item type. No other Rust reflection library supports this.

## A Real-World Example: Event Bus

Here's how you'd build a type-safe event bus with irys, routing heterogeneous events based on discovered capabilities:

```rust
use std::sync::{mpsc, Arc};
use std::thread;

let (tx, rx) = mpsc::channel::<Envelope>();

let router = thread::spawn(move || {
    let mut serialized = 0u32;
    let mut errors = 0u32;
    let mut dropped = 0u32;

    while let Ok(envelope) = rx.recv() {
        if envelope.has::<ErrorCap>() { errors += 1; }
        if envelope.has::<SerializeCap>() { serialized += 1; }
    }
    (serialized, errors, dropped)
});

tx.send(reflect!(UserLoginEvent { user_id: 1, success: true })).unwrap();
tx.send(reflect!(AuthError { user_id: 2, reason: "bad password" })).unwrap();
tx.send(reflect!(OpaqueBlob { _bytes: vec![0xFF] })).unwrap();
drop(tx);

let (serialized, errors, dropped) = router.join().unwrap();
assert_eq!(serialized, 2); // login + auth_error
assert_eq!(errors, 1);     // auth_error
assert_eq!(dropped, 1);    // opaque (no capabilities)
```

Events with no capabilities go to a dead letter queue. Error-enriched ones go to a fast path. Others go to batch processing. All without enum-based type tagging.

## Ownership Model

Irys follows the same ownership model as `Vec<T>` / `&[T]` / `&mut [T]`:

```rust
// Owned — consumes the value
let envelope = reflect!(value);

// Shared borrow — value remains available
let envelope_ref = reflect_ref!(&value);
// value is still usable here

// Mutable borrow — can mutate through capabilities
let mut envelope_mut = reflect_mut!(&mut value);
envelope_mut.get_mut::<ResettableCap>().unwrap().reset();
```

## Registries

Namespaces that isolate your capability slots from other libraries. Slot 0 in your registry doesn't collide with slot 0 in someone else's:

```rust
register_capability! {
    registry: MyRegistry,
    slot: 0,
    cap: SerializeCap,
    trait_bound: erased_serde::Serialize + Send + Sync,
}

let envelope = reflect!(value, [
    { registry: MyRegistry, slots: 0..5 },
]);
```

## Installation

```toml
[dependencies]
irys = "0.3"
```

One dependency (`seq-macro`). Edition 2024. MIT licensed. The public API is fully safe.

Check it out on [crates.io](https://crates.io/crates/irys), [docs.rs](https://docs.rs/irys), or [GitHub](https://github.com/Cyanistic/irys).
