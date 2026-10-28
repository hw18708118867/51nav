---
title: "Unexpected token < in JSON at position 0: 5 Causes and Fixes"
description: "That parser error almost always means you did not get JSON back. Here are the five most common reasons it happens — and exactly how to fix each one."
category: "How-to"
difficulty: "Intermediate"
tags: ["json", "parse-error", "debugging", "api"]
pubDate: 2026-09-20
faq:
  - question: "Why does the error say position 0?"
    answer: "Position 0 is the first character of the response body. A `<` there means the response starts with HTML (such as `<!DOCTYPE` or `<html>`), so the server never returned JSON."
  - question: "Is the JSON I sent the problem?"
    answer: "Usually not. The error is about the response you received, not the request you sent. Log the raw response body to see what actually came back."
  - question: "Why does it work in the browser but fail in my code?"
    answer: "Browsers and some fetch wrappers hide the real status. Check the HTTP status code and Content-Type — a 403, 404, or login redirect returns HTML, which then fails to parse as JSON."
---

## What the error actually means

`Unexpected token < in JSON at position 0` is JavaScript's way of saying: *"I tried to parse this as JSON, and the very first character was a `<`, which is not valid JSON."*

JSON can only start with `{`, `[`, a quote, a digit, or one of the literals `true`, `false`, `null`. It can never start with `<`. So a `<` at position 0 means **you did not receive JSON** — you received HTML (or XML). The parser never got to your data because it choked on the first byte.

Here are the five causes, in order of how often they show up.

## 1. The server returned an HTML error page

This is the big one. Instead of your API response, you got a generic page:

```text
<!DOCTYPE html>
<html>
  <head><title>404 Not Found</title></head>
```

Common triggers:

- The endpoint URL is wrong (typo, missing `/api`, wrong environment).
- The request was redirected to a login page.
- A proxy or gateway returned a 502/503 HTML page.
- CORS preflight failed and the browser swallowed the real error.

**Fix:** stop parsing and *look at the raw response*.

```js
const res = await fetch('/api/user');
const text = await res.text();   // do NOT res.json() yet
console.log(res.status, res.headers.get('content-type'));
console.log(text.slice(0, 200));  // see what you actually got
```

If `content-type` is `text/html` and the body starts with `<`, fix the request (URL, auth, headers) before parsing.

## 2. A BOM or hidden character at the start

A UTF-8 BOM (`ï»¿`) or a stray space before the first `{` shifts everything and can surface as a parse error. This happens most often when a `.json` file is saved with a BOM or concatenated from a shell command.

**Fix:** trim and strip the BOM before parsing:

```js
const clean = text.replace(/^﻿/, '').trim();
JSON.parse(clean);
```

## 3. You got JSONP, not JSON

Some legacy endpoints wrap JSON in a callback: `handleResponse({ "ok": true })`. That is valid JavaScript but **not** valid JSON, so `JSON.parse` fails on the first `(` — or, if the wrapper starts with a `<` from an error page, on the `<`.

**Fix:** call the JSON endpoint (usually `?format=json` instead of `?callback=...`), or strip the wrapper if JSONP is unavoidable.

## 4. The response is double-encoded

Sometimes the value is a JSON *string* containing JSON: `"{\"ok\":true}"`. If you parse once you get a string; parse it again and you get the object. But if something interpolated it wrong, you may see a literal `<` from a serialized error.

**Fix:** confirm the top-level type before parsing, and only parse once:

```js
const data = JSON.parse(text);
const value = typeof data === 'string' ? JSON.parse(data) : data;
```

## 5. Compression or encoding was not decoded

If the server sends `Content-Encoding: gzip` (or `br`) but your client did not decompress, you are parsing compressed bytes — which look like garbage and can start with any byte, including one that renders as `<` in a log.

**Fix:** let `fetch` handle decompression automatically (it does by default), or decompress explicitly in Node with `zlib`.

## A 30-second debugging workflow

1. `await res.text()` and print `status` + `content-type`.
2. If it is `text/html`, you have a request/route problem, not a JSON problem.
3. If it is JSON but still fails, strip the BOM and trim, then parse.
4. When in doubt, paste the raw text into a formatter that shows the exact failing position.

## Validate before you ship

You do not have to find these by hand. The [JSON Formatter on Toolbox](https://toolbox.51nav.com/tools/data-format/json-format/) validates and pretty-prints a pasted string and points at the exact character that breaks parsing.

### Related tools
- [JSON Formatter on Toolbox](https://toolbox.51nav.com/tools/data-format/json-format/)
- [JSON Formatter on Toolhub](https://toolhub.51nav.com/tools/json-formatter/)
- [JSON Formatter on DevTools](https://devtools.51nav.com/json/formatter/)
- [JSON Validator on DevTools](https://devtools.51nav.com/json/validator/)

## Next steps

- Avoid the sibling trap in [YAML to JSON Gotchas](/guides/yaml-to-json-gotchas).
- Base64 is often the encoding hiding inside a broken payload — see [Base64 Images in CSS](/guides/base64-data-uri-image).
