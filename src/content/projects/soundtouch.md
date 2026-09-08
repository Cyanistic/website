---
title: "soundtouch-rs"
url: "https://github.com/Cyanistic/soundtouch"
description: "A safe Rust wrapper around the SoundTouch C++ audio library for tempo, pitch, and playback-rate control."
order: 70
---

The old sys crate had no update in 5 years. So I wrote new bindings and a safe wrapper on top. It changes tempo, pitch, and playback rate. The API stays close to the original C++ one, so the upstream docs still apply.

Linking lives in the companion crate [soundtouch-ffi](https://github.com/Cyanistic/soundtouch-ffi), which handles bundled versus dynamic linking. The main crate stays a thin, safe layer on top: set channels, sample rate, and tempo, push samples in, read them back out.
