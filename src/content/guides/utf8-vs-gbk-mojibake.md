---
title: "UTF-8 vs GBK: Why Chinese Text Turns to Mojibake"
description: "Garbled Chinese (乱码) is almost always a charset mismatch: bytes encoded one way are decoded another. Here is the root cause and how to fix it."
category: "Explained"
difficulty: "Beginner"
tags: ["utf-8", "gbk", "encoding", "charset"]
pubDate: 2026-10-15
faq:
  - question: "What is mojibake?"
    answer: "Mojibake (乱码) is text shown with the wrong character set. The bytes are intact; the decoder just maps them to the wrong characters, producing gibberish like 'ä¸­æ–‡'."
  - question: "Is GBK still needed?"
    answer: "Legacy Chinese systems and some files use GBK/GB2312. New projects should standardize on UTF-8, but you still meet GBK when reading old data or talking to older services."
  - question: "Why does it look fine in one editor but broken in another?"
    answer: "The editor guessed a different charset than the one used to write the file. Declaring the charset explicitly removes the guesswork."
---

## Bytes, not letters

Text on disk is bytes. A character set (charset) is the rule that maps bytes to characters. UTF-8 and GBK are two such rules. If you encode text with one rule and decode it with another, you get **mojibake** — the bytes are fine, the interpretation is wrong.

```text
"中" in UTF-8  ->  E4 B8 AD
"中" in GBK    ->  D6 D0
```

Decode `E4 B8 AD` as GBK and you get `ä¸­` — classic garbled Chinese. That is the whole bug.

## UTF-8 vs GBK at a glance

| | UTF-8 | GBK |
| --- | --- | --- |
| Coverage | Every Unicode character | Mostly Simplified Chinese + ASCII |
| Bytes per char | 1–4 (ASCII = 1) | 1 (ASCII) or 2 (Chinese) |
| ASCII compatible | Yes | Yes |
| Standard | Unicode | Chinese national (GB13000) |

UTF-8 is variable-length and ASCII-compatible, so English text costs one byte. GBK uses two bytes for Chinese and has no room for most non-Chinese scripts.

## The usual causes

- A UTF-8 file opened as GBK (or vice versa) in an editor or terminal.
- An HTTP response missing `Content-Type: text/html; charset=utf-8`, so the browser guesses.
- A database connection using `gbk` while the app writes `utf8mb4`.
- Copying text between systems that disagree on the charset.

## How to fix it

1. **Declare the charset everywhere**: `<meta charset="utf-8">`, the HTTP header, and the database/client encoding.
2. **Standardize on UTF-8** for new work.
3. **Convert, don't re-save**: re-saving garbled text bakes in the error. Convert the bytes from the source charset to the target.

```bash
# convert a GBK file to UTF-8
iconv -f GBK -t UTF-8 input.txt > output.txt
```

## Convert between charsets

Turn GBK/Big5/UTF-8 around without losing data using the [Charset Convert tool on Toolbox](https://toolbox.51nav.com/tools/encoding/charset-convert/).

### Related tools
- [Charset Convert on Toolbox](https://toolbox.51nav.com/tools/encoding/charset-convert/)
- [UTF-8 Converter on Toolhub](https://toolhub.51nav.com/tools/utf8-converter/)

## Next steps

- Before non-ASCII goes into a URL it is UTF-8 first, then percent-escaped — see [URL Space: %20 or +](/guides/url-encode-space-plus).
- Binary data is wrapped in Base64 — see [Base64 Images in CSS](/guides/base64-data-uri-image).
