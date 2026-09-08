---
title: "irys"
url: "https://github.com/Cyanistic/irys"
description: "Compile-time trait reflection for Rust. Register a capability once per trait and discover it on any type, on stable."
order: 20
---

Every other tool wanted per-type setup. That missed the point. I register once per trait. It covers each type that fits. Past, present, future.

The part I like most is generic capabilities. Register once for `Stream<Item = I>` or `Future<Output = O>` and the compiler resolves the concrete item type at each probe site. Envelopes come in owned, shared, and mutable flavors, and registries keep slot numbers from colliding between libraries.
