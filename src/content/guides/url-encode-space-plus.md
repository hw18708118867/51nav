---
title: "URL Space: %20 or +? The Two Encoding Rules"
description: "Spaces turn into %20 almost everywhere, but into + inside form data. Knowing which rule applies stops broken links and missing query values."
category: "Explained"
difficulty: "Beginner"
tags: ["url-encoding", "encoding", "web"]
pubDate: 2026-10-15
faq:
  - question: "Is + valid in a URL path?"
    answer: "No. In a path segment + is a literal plus sign. Only inside the application/x-www-form-urlencoded query body does + mean space."
  - question: "Which should I use in a query string?"
    answer: "Both are accepted by most servers, but %20 is the safe, unambiguous choice everywhere. Use + only when producing form-encoded bodies."
  - question: "Why did my space disappear from the URL?"
    answer: "A server or client decoded + as a space (form rule) in a context where it should have stayed literal, or encoded a space as + in a path where it should have been %20."
---

## Two rules, one character

A space cannot live raw in a URL — it is not a safe character. But there are **two** encodings for it, and mixing them up is a classic bug.

| Context | Space becomes | Standard |
| --- | --- | --- |
| Path, fragment, generic URL | `%20` | RFC 3986 |
| Query, `application/x-www-form-urlencoded` | `+` | HTML form spec |

## Where `+` is correct

When a browser submits a form with `method="get"`, it encodes the body as `application/x-www-form-urlencoded`. In that encoding, spaces become `+` and other reserved chars become percent-escapes:

```text
name=Jane Doe  ->  name=Jane+Doe
```

So in a query string produced by a form, `+` means space. This is why `?q=hello+world` reads as `hello world`.

## Where `%20` is correct

Everywhere else — the path, the fragment, or a query you build by hand — a space is `%20`. RFC 3986 does not give `+` any special "space" meaning outside form encoding.

```text
/path/hello world   ->  /path/hello%20world   ✅
/path/hello+world   ->  /path/hello+world     (literal plus, NOT a space)
```

## The bug this causes

If you form-encode a query (`+` for space) but then drop it into a path, or a server decodes `+` as space in a path, your value shifts:

```js
// intent: search for "a+b"
encodeURIComponent('a b');  // "a%20b"  -> correct for a URL
// but if something later turns %20 into + you get "a+b" = "a b" again, fine
// the real trap is the reverse:
const raw = 'a+b';          // user typed a plus
new URLSearchParams({ q: raw }).toString(); // "q=a%2Bb" (plus is escaped!)
```

The safe habit: use `encodeURIComponent` for path/fragment pieces, and `URLSearchParams` for query values. Let the platform pick `%20` or `+` for you.

## Pick the right encoder

Encode and decode URLs correctly with the [URL Encode / Decode tool on Toolbox](https://toolbox.51nav.com/tools/encoding/url-encode/).

### Related tools
- [URL Encode / Decode on Toolbox](https://toolbox.51nav.com/tools/encoding/url-encode/)
- [URL Encode / Decode on Toolhub](https://toolhub.51nav.com/tools/url-encode/)
- [URL Encode on DevTools](https://devtools.51nav.com/encode/urlencode/)

## Next steps

- Characters that are not ASCII go through UTF-8 first — see [UTF-8 vs GBK](/guides/utf8-vs-gbk-mojibake).
- Binary data in a URL is wrapped in Base64 — see [Base64 Images in CSS](/guides/base64-data-uri-image).
