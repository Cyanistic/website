---
title: "mpd"
order: 110
url: "https://www.musicpd.org/"
description: "MPD serving ~/Music with replaygain and a fifo out, driven daily from ncmpcpp."
---

Music lives in `~/Music`, served locally by MPD with track replaygain and a fifo output at `/tmp/mpd.fifo` that feeds a spectrum visualizer. My daily driver is ncmpcpp in its alternative interface: column layout, the visualizer wired to that fifo, lyrics follow-off.

rmpc is also installed if I ever want a Rust client, but ncmpcpp is the one with my config and my muscle memory.
