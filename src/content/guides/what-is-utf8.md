---
title: "What Is UTF-8? The Encoding Behind the Web"
description: "UTF-8 is the character encoding that lets the web carry every language in one standard. Learn how it works, why it won, and how to fix mojibake."
category: "Explained"
difficulty: "Beginner"
tags: ["utf-8", "encoding", "character-set", "explained"]
pubDate: 2026-10-15
faq:
  - question: "Is UTF-8 the same as Unicode?"
    answer: "No. Unicode is the catalog of characters and their numbers; UTF-8 is one way of writing those numbers as bytes. UTF-16 and UTF-32 are other ways. Unicode is the 'what', UTF-8 is the 'how'."
  - question: "Why does my text show as Ã© or ???"
    answer: "That is mojibake, caused by reading bytes with the wrong encoding. Usually a file saved as UTF-8 is being interpreted as Latin-1, or the other way around. Re-reading it with the correct encoding fixes it."
  - question: "Should I still use UTF-8 BOM?"
    answer: "Almost never on the web. A BOM at the start of a UTF-8 file can confuse parsers, break shebangs, and shift JSON by one character. Save as UTF-8 without BOM."
  - question: "Is ASCII the same as UTF-8?"
    answer: "For the first 128 characters, yes. UTF-8 was deliberately designed so that every valid ASCII file is also a valid UTF-8 file. That is a big reason it took over the web."
---

## What is UTF-8?

UTF-8 is a way of storing text as bytes. Specifically, it is the way that turns the characters in the Unicode standard — every letter, symbol, and emoji from every writing system — into the 0s and 1s a computer actually handles.

When you type `é`, `中`, or `😀`, none of those exists natively as a byte. A byte only goes up to 255. UTF-8 is the agreement that says: "Here is how we represent that character using one or more bytes." It is the reason a webpage can show Japanese, Arabic, and Swedish at the same time without falling apart.

The name means "Unicode Transformation Format, 8-bit." The 8-bit part is the important bit: it processes the data one byte at a time, which keeps it compatible with the older, byte-oriented world of the internet.

## Unicode vs. UTF-8 (the part everyone confuses)

These two get used interchangeably, but they are different layers:

- **Unicode** is the list. It assigns every character a number called a *code point*. The letter `A` is `U+0041`, the snowman `☃` is `U+2603`, and so on.
- **UTF-8** is one of several ways to write those numbers as bytes. (UTF-16 and UTF-32 are the others.)

Think of Unicode as the dictionary and UTF-8 as one particular spelling system for writing the entries down.

## How the encoding works

UTF-8 is *variable length*. Characters take 1 to 4 bytes depending on how far down the Unicode list they are:

- Code points `0–127` (basic English and punctuation) use **1 byte** — and by design those bytes are identical to ASCII.
- The next range uses **2 bytes**.
- Common scripts like Chinese, Japanese, and Korean mostly use **3 bytes**.
- Rare characters and emoji use **4 bytes**.

That design is the reason UTF-8 won. Every old ASCII file is automatically valid UTF-8, so nothing broke when the web switched over. English text did not get any bigger, while the rest of the world finally got a standard that fit.

A byte in UTF-8 also tells you its own role. If it starts with `0`, it is a single-byte character (ASCII). If it starts with `110`, it is the first byte of a 2-byte character; `1110` means 3 bytes; `11110` means 4. Continuation bytes all start with `10`. That self-describing structure is why a reader can resync after a corrupted byte instead of losing the whole document.

## Where you see it

- **Every webpage.** `meta charset="utf-8"` is on essentially all HTML. If it is missing or wrong, the page shows garbage for any non-English text.
- **JSON.** JSON mandates UTF-8 (or its ASCII subset). APIs that claim to speak JSON but send another encoding are technically non-compliant.
- **Source files, logs, databases.** Most modern systems default to UTF-8 end to end.
- **[URL encoding](/guides/what-is-url-encoding).** Before a non-ASCII character goes into a link, it is first turned into UTF-8 bytes, then percent-escaped.

## UTF-8 vs. the alternatives

- **UTF-16** uses 2 or 4 bytes and is what Windows and Java use internally. It is not byte-compatible with ASCII and is awkward on the wire.
- **UTF-32** uses 4 bytes for everything — simple to index, but wasteful for mostly-English text.
- **Latin-1 (ISO-8859-1)** covers Western European languages in 1 byte but cannot represent most of the world.
- **GBK / Big5 / Shift-JIS** are regional encodings that each cover one language group. They are the source of most compatibility headaches.

UTF-8 wins because it is backward-compatible with ASCII, compact for English, and complete for everything else.

## Mojibake: when it goes wrong

You have seen it: `café` shows up as `cafÃ©`, or a Chinese string becomes a row of black diamonds `�`. This is *mojibake*, and it almost always means one program wrote bytes as UTF-8 while another read them as Latin-1 (or vice versa). The bytes are fine; the interpretation is wrong.

The fix is always to make the reader use the same encoding the writer used. Concretely:

- Declare `charset="utf-8"` in your HTML.
- Set your database connection and file storage to UTF-8.
- When converting between legacy encodings like GBK or Big5 and UTF-8, use a proper [Charset Convert tool](https://toolbox.51nav.com/tools/encoding/charset-convert/) rather than guessing.

If you just want to see how a string's bytes look, a [UTF-8 Converter](https://toolhub.51nav.com/tools/utf8-converter/) will show you the encoded form directly. There is also a [UTF-8 tool on Toolbox](https://toolbox.51nav.com/tools/encoding/utf8/) and a [Unicode Converter](https://toolhub.51nav.com/tools/unicode-converter/) for the escape-sequence view.

## The BOM trap

A *byte order mark* is an optional marker at the very start of a UTF-8 file. It is harmless in theory and harmful in practice: it can break JSON files (the parser sees a stray character before the first `{`), confuse shells (`#!/usr/bin/env` stops working), and shift string offsets by one. Save as "UTF-8 without BOM" unless you have a specific reason not to.

## When you do not need to think about it

In a modern stack where every layer already defaults to UTF-8, you rarely touch it. The times you must pay attention are: reading a legacy file, talking to an old system, debugging garbled output, or accepting user input in many languages. In those moments, "set everything to UTF-8 and stay there" solves 90% of the problems.

## Next steps

- See how text is made safe to put *inside* a link at [What Is URL Encoding?](/guides/what-is-url-encoding).
- Understand the sibling encoding that repackages binary as text at [What Is Base64?](/guides/what-is-base64).
- Convert and inspect encoded text with the [UTF-8 Converter](https://toolhub.51nav.com/tools/utf8-converter/).
