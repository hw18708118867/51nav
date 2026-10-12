---
title: "What Is Base64? Encoding, Not Encryption"
description: "Base64 is a way to represent binary data as text. Understand what it does, where it is used, and why it is not encryption."
category: "Explained"
difficulty: "Beginner"
tags: ["base64", "encoding", "explained"]
pubDate: 2026-09-23
faq:
  - question: "Is Base64 encryption?"
    answer: "No. Base64 is an encoding with no key involved, so anyone can decode it in a fraction of a second. Use it to move data through text-only systems, never to protect secrets."
  - question: "Why is Base64 output about 33% larger?"
    answer: "Every three input bytes become four output characters, so the encoded result is roughly a third bigger than the original. That overhead is the price of representing binary as text."
  - question: "What is the difference between Base64 and Base64URL?"
    answer: "Base64URL swaps + and / for - and _, and drops the = padding, so the result is safe inside URLs and tokens. JWTs use Base64URL for exactly this reason."
  - question: "Can I Base64 a large file?"
    answer: "You can, but it adds a third to the size and gives no advantage over sending raw bytes through a binary-safe channel such as HTTP/2 or gRPC."
---

## What is Base64?

Base64 is a way to turn any binary data — a file, an image, a chunk of bytes — into plain text made of
just 64 safe characters. It does not compress the data and it does not protect it. It just repackages
it so the data can travel through systems that only understand text.

That last point is the whole reason Base64 exists. Email, URLs, JSON, and plenty of older network
protocols were built around text. They do not know what to do with raw bytes. Base64 gives those bytes
a text costume they can wear on the way through, and the receiver takes it off at the other end.

## Why it exists

The story starts with email. SMTP, the protocol that moves mail around, was designed in an era when
messages were plain ASCII text. Try to send a binary file — a photo, a zip archive — straight through
it and the bytes get mangled in transit. Base64 let people attach files by encoding them as text first,
then decoding on the receiving side.

The same problem shows up everywhere text pipes move data: HTTP headers, configuration files,
certificates, and API payloads. Base64 is the duct tape that lets binary sit comfortably inside text.

## How the encoding works

Internally, Base64 groups the input into 24-bit blocks (three bytes at a time). Each block is split
into four 6-bit pieces, and every 6-bit piece becomes one character from a 64-character alphabet:

```
A-Z a-z 0-9 + /
```

Because three bytes become four characters, the output is about 33% larger than the input. That
overhead is the price you pay for text-safety, and it is why you should not Base64 a large file unless
you have a reason.

When the final block does not line up evenly, padding characters (`=`) are added so the length is
always a multiple of four. You will see one or two `=` symbols at the end of most Base64 strings.

## A quick example

```js
// In the browser
btoa('51NAV');    // "NTe5TkFW"
atob('NTe5TkFW'); // "51NAV"
```

Notice the output is longer than the input, and it looks like gibberish to a human but is trivially
reversible by a computer.

## Where you will actually see it

- **Data URLs** — small images embedded straight in HTML or CSS: `data:image/png;base64,iVBORw0...`.
- **HTTP Basic Auth** — credentials sent as `Authorization: Basic base64(user:pass)`.
- **TLS certificates and keys** — PEM files are Base64 wrapped in `-----BEGIN...-----` markers.
- **JWTs** — the header and payload are Base64URL-encoded JSON.
- **Email attachments** — MIME attachments are Base64 under the hood.

## Base64 vs. Base64URL

Standard Base64 uses `+` and `/`, which are awkward inside URLs (they need escaping) and can break
when used as a path or query parameter. Base64URL swaps those for `-` and `_` and drops the `=` padding
entirely. That makes the result safe to drop into a URL or a token. JWTs use Base64URL for exactly this
reason.

If you are debugging a token or a URL and a string uses `-` and `_` instead of `+` and `/`, you are
looking at Base64URL. The decoding logic is identical apart from those two characters.

## It is not encryption

This is the most common misunderstanding, so it is worth stating plainly. Base64 is encoding, not
encryption. There is no key, no secret, and no protection involved. Anyone who sees a Base64 string can
decode it in a fraction of a second with tools that ship with every operating system.

If you need confidentiality, Base64 is not the tool. Encrypt the data first — with AES, for example —
and only then Base64 the ciphertext if it needs to travel as text.

## When not to use it

- **Large files.** The 33% size bump adds real cost to bandwidth and storage.
- **As a security control.** It is reversible by definition; treat any "hidden" Base64 as public.
- **When a binary-safe channel exists.** Modern protocols such as HTTP/2, gRPC, and protobuf move
  bytes natively, so you rarely need to encode at all.

## How to spot Base64 in the wild

A long run of letters, digits, `+`, `/`, and trailing `=` is a good tell. Strings that are exactly a
multiple of four characters (ignoring whitespace) and use only the Base64 alphabet are almost
certainly encoded data. Decoding it is the fastest way to confirm what it actually contains.

## Next steps

- Put it into practice with [How to Encode Base64](/guides/how-to-encode-base64).
- See how Base64 fits into tokens in [What Is a JWT?](/guides/what-is-jwt).
