---
title: "Base64 Image in CSS Not Showing? data: URI Pitfalls"
description: "A Base64 image in a data: URI looks self-contained, but a missing MIME type, a stray newline, or a wrong encoding makes it render nothing. Here are the usual culprits."
category: "How-to"
difficulty: "Beginner"
tags: ["base64", "image", "css", "data-uri"]
pubDate: 2026-09-23
faq:
  - question: "Why is my data: URI image blank?"
    answer: "Most often the MIME type is missing or wrong (it must be e.g. image/png), or the Base64 string has whitespace/newlines, or it was encoded as Base64URL instead of standard Base64."
  - question: "Should I inline images as Base64?"
    answer: "Only for tiny, rarely-changing assets. Base64 is ~33% larger than the binary and cannot be cached separately from the CSS/HTML, so it hurts load time at scale."
  - question: "Is Base64URL okay in a data URI?"
    answer: "No. data: URIs expect standard Base64. Base64URL uses - and _ and lacks = padding, which browsers will not decode."
---

## The data: URI shape

```css
background: url('data:image/png;base64,iVBORw0KGgo...');
```

Three parts must be exactly right: the `image/png` MIME type, the `;base64,` marker, and the standard Base64 string.

## Pitfall 1: missing or wrong MIME type

Without a correct type the browser does not know how to decode it:

```css
/* wrong — no type */
url('data:base64,iVBORw0KGgo...')
/* right */
url('data:image/png;base64,iVBORw0KGgo...')
```

Match the type to the file: `image/png`, `image/jpeg`, `image/svg+xml`, `image/webp`, `image/gif`.

## Pitfall 2: whitespace and newlines

Base64 from a tool or a template literal often contains line breaks for readability. CSS data URIs must be **one continuous string** — a newline breaks it.

```css
/* wrong */
url('data:image/png;base64,iVBOR
w0KGgo...')
/* right: no line breaks */
```

## Pitfall 3: Base64URL vs standard Base64

JWTs and some APIs use Base64URL (`-`/`_` and no `=`). data: URIs need standard Base64 (`+`/`/` with padding). Mixing them yields a corrupt image.

## Pitfall 4: CSP and size

A strict Content-Security-Policy can block `data:` URLs, and very large inlined images bloat the document and defeat caching. Keep inlined images small (icons, sprites).

## Convert correctly

Encode an image to a clean, newline-free `data:` URI with the [Image to Base64 tool on Toolbox](https://toolbox.51nav.com/tools/image/image-base64/).

### Related tools
- [Image to Base64 on Toolbox](https://toolbox.51nav.com/tools/image/image-base64/)
- [Image to Base64 on Toolhub](https://toolhub.51nav.com/tools/image-to-base64/)
- [Base64 Image Viewer on Toolhub](https://toolhub.51nav.com/tools/base64-image-viewer/)

## Next steps

- The encoding character set matters elsewhere too — see [UTF-8 vs GBK](/guides/utf8-vs-gbk-mojibake).
- Base64 hides inside JWTs — see [JWT signature verification failed](/guides/jwt-signature-verification-failed).
