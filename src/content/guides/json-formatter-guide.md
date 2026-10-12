---
title: "JSON Formatter Guide: Tidy Messy JSON in Seconds"
description: "A practical guide to formatting and pretty-printing JSON so it is readable, valid, and easy to debug."
category: "How-to"
difficulty: "Beginner"
tags: ["json", "format", "how-to", "developer"]
pubDate: 2026-09-21
faq:
  - question: "What is the difference between pretty and minified JSON?"
    answer: "Pretty adds indentation and newlines so humans can read it; minified strips them to save space in transit and storage. The data is identical."
  - question: "How do I format JSON in the browser?"
    answer: "console.log(JSON.stringify(data, null, 2)) pretty-prints any object. Online formatters and editor shortcuts like VS Code's Shift+Alt+F give you the same result with a UI."
  - question: "Why won't my JSON parse?"
    answer: "Look for single-quoted keys, trailing commas, undefined instead of null, and mismatched braces. A validator flags these instantly."
  - question: "How do I format a very large JSON file?"
    answer: "Use jq or a streaming parser on the command line rather than an in-browser formatter, which can struggle with multi-megabyte inputs."
---

## Why format JSON at all

Raw API responses are usually **minified** — one long line, no spaces, no newlines. That is ideal for
bandwidth and parsing, and terrible for a human who has to figure out what is inside. A formatter adds
indentation and line breaks so the structure becomes visible at a glance.

The moment you paste a 2,000-character single line into a formatter and it expands into a clean tree,
you will understand why this is one of the most-used developer tools on the web.

## Option 1: The browser console

```js
console.log(JSON.stringify(data, null, 2));
```

The `2` is the indent size in spaces. `JSON.stringify` will take any JavaScript value and hand you
formatted text. It also accepts a `replacer` function as the second argument if you want to filter or
reshape keys on the way out.

## Option 2: The command line

```bash
echo '{"a":1,"b":2}' | python3 -m json.tool
jq . file.json
```

`python3 -m json.tool` ships with Python and validates as it formats. `jq` is faster and far more
powerful — once you learn its syntax you can reformat, filter, and reshape JSON in a single line.

## Option 3: An online formatter

Paste your JSON and get a clean, indented result instantly, with no install required. On 51NAV the
formatter runs in your browser, so the data you paste is not uploaded anywhere. For sensitive payloads
that distinction matters.

## Validate while you format

A decent formatter does double duty: it tells you whether the input is valid JSON *and* pretty-prints
it. The errors you will hit most often:

- Unquoted or single-quoted keys — JSON demands double quotes.
- A trailing comma after the last element — invalid in strict JSON.
- Using `undefined` instead of `null` — JSON has no `undefined`.
- A missing or extra brace or bracket — the classic "unexpected end of JSON" message.

## Pretty vs. minified: when to use each

- **Pretty** — debugging, code review, documentation, and anything a human reads.
- **Minified** — sending over the network, storing in a database, caching. Smaller is better there.

Most formatters let you flip between the two with a toggle, so you can pretty-print to read and then
minify to ship.

## Editor shortcuts

You rarely need to leave your editor. VS Code formats the selected JSON with `Shift + Alt + F`, and
Prettier handles it in almost any setup. If your editor does not, a quick copy to a formatter and back
takes seconds.

## When a formatter isn't enough

If you are staring at a multi-megabyte JSON file, an in-browser formatter can strain the tab. For those
sizes, reach for `jq` or a streaming parser on the command line — they handle huge inputs without
loading everything into memory at once. The same thinking applies to NDJSON (JSON Lines), where each
line is its own JSON object: format line by line rather than treating the whole file as one document.

## A practical tip

If you work with JSON daily, keep a formatter one click away — pinned in your new tab or bookmarks. The
alternative is squinting at a wall of text and guessing where the bracket closes, which is a poor use
of anyone's afternoon.

## Where to go next

- Understand the format itself in [What Is JSON?](/guides/what-is-json).
- Validate and format JSON instantly with the [online JSON formatter](/tools).
