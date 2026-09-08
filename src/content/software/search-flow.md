---
title: "search-flow"
order: 130
url: "https://github.com/junegunn/fzf"
description: "fzf on top, ripgrep and fd feeding it, bat rendering previews. One flow for finding and opening things."
---

Finding things is one pipeline: ripgrep lists files for fzf (`FZF_DEFAULT_COMMAND='rg --files --hidden'`), fd handles the directory side, and bat renders the preview pane in Nord colors. My `config-open` and `file-edit` functions are just `fd | fzf --preview 'bat ...'` with the editor on the end.

Nothing here is exotic on its own. The point is the wiring: every fuzzy prompt in my shell searches fast and previews richly, because all four tools assume each other.
