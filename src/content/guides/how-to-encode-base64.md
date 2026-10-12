---
title: "How to Encode and Decode Base64"
description: "Practical Base64 commands for the browser, terminal, and Python — plus tips for Base64URL used in tokens."
category: "How-to"
difficulty: "Beginner"
tags: ["base64", "encode", "how-to", "developer"]
pubDate: 2026-09-23
faq:
  - question: "Why does btoa throw on non-Latin1 text?"
    answer: "btoa only accepts single-byte strings. For Unicode text, encode it to UTF-8 first with encodeURIComponent before calling btoa, and reverse the steps on decode."
  - question: "Why doesn't my decoded Base64 match the original?"
    answer: "Usually a stray newline from echo. Always use echo -n, or strip whitespace and any trailing = before decoding."
  - question: "When should I use Base64URL instead of Base64?"
    answer: "Any time the output goes into a URL, query string, or token. Standard Base64's + and / get mangled in those contexts."
  - question: "Is Base64 a way to hide data?"
    answer: "No. It is reversible by design. If you need confidentiality, encrypt the data first and only then Base64 the ciphertext."
---

## Why you would encode at all

You reach for Base64 when you have binary data that needs to live somewhere text-only: an image
embedded in a data URL, credentials in an HTTP header, or a blob inside JSON. The goal is never to hide
the data — it is to make it survive a text channel intact. Once you keep that in mind, the commands
below are straightforward.

## Encoding in the browser

Browsers expose `btoa()` (binary to ASCII) and `atob()` (the reverse) on the window object:

```js
btoa('51NAV');    // "NTe5TkFW"
atob('NTe5TkFW'); // "51NAV"
```

One gotcha: `btoa` only accepts Latin-1 (single-byte) strings. Hand it `"你好"` and it throws. For
Unicode text, encode to UTF-8 first:

```js
btoa(unescape(encodeURIComponent('你好')));
```

The reverse is `decodeURIComponent(escape(atob(...)))`. It is clumsy, but it works without pulling in a
library.

## Encoding in the terminal

On Linux and macOS, `base64` is built in:

```bash
echo -n "51NAV" | base64          # encode
echo -n "NTe5TkFW" | base64 -d    # decode

base64 image.png > image.b64      # encode a whole file
```

The `-n` matters more than it looks: without it, `echo` appends a newline that becomes part of the
encoded output. That trailing newline is the source of countless "why doesn't my decode match?" bugs.

## Encoding in Python

```python
import base64

encoded = base64.b64encode(b"51NAV").decode()
print(encoded)                            # NTe5TkFW
print(base64.b64decode(encoded).decode())  # 51NAV
```

Note the `b"..."` — `b64encode` wants bytes, not a string, so encode your text first. Python also
ships `base64.urlsafe_b64encode` and `urlsafe_b64decode` for the URL variant, which saves you from
doing the character swaps by hand.

## Base64URL for tokens and URLs

Standard Base64 uses `+` and `/`, which get mangled in URLs and tokens. Base64URL replaces them with
`-` and `_` and drops the `=` padding:

```js
function toBase64Url(str) {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
```

JWTs use this exact scheme, which is why a token string looks slightly wrong if you expect normal
Base64. When you decode a token, do the reverse swap before calling `atob`.

## A quick checklist

- Need to inspect an opaque blob? `base64 -d` it (after fixing any URL-safe characters).
- Carrying data in a URL or token? Use Base64URL, never plain Base64.
- Remember it is reversible — Base64 is not a way to hide anything.
- Watch for stray newlines from `echo` and stray padding when you strip it.

## Which method should you reach for?

- **Browser** — when you are already in front-end code and the string is small.
- **Terminal** — when you are scripting, piping between commands, or processing files.
- **Python** — when encoding is one step in a larger backend task.

They all produce identical output, so pick whatever is already in your hands. The only real decision is
Base64 versus Base64URL, and that is settled by where the result is going: a header or a file wants
plain Base64, a URL or token wants Base64URL.

## Common mistakes

- Encoding a string without converting to bytes first — this bites people in Python, Go, and Rust.
- Forgetting the newline from `echo -n`.
- Treating Base64 output as encrypted.
- Leaving `=` padding on when a downstream parser rejects it — strip it for URLs.

## Related

- Understand the basics in [What Is Base64?](/guides/what-is-base64).
- See Base64 inside tokens in [What Is a JWT?](/guides/what-is-jwt).
