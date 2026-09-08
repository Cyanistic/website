---
title: "tomplate"
url: "https://github.com/Cyanistic/tomplate"
description: "A compile-time template engine for Rust. Templates live in TOML, the output is const strings with zero runtime cost."
order: 60
---

Tomplate started as a workaround for `sqlx::query!`. That macro wants a string literal, so you cannot hand it a const or compose fragments with ordinary code. I wanted reusable SQL pieces without giving that up, and it grew into a general compile-time template system.

Templates live in `.tomplate.toml` files. A build script turns them into `const &str`. Pick Handlebars, Tera, or MiniJinja. Eager mode feeds the result into other macros.
