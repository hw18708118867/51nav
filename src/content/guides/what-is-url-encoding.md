---
title: "What Is URL Encoding? Percent-Encoding, Explained"
description: "URL encoding turns unsafe characters into %-escapes so a string can safely travel inside a link. Learn why it exists, how it works, and the mistakes that break URLs."
category: "Explained"
difficulty: "Beginner"
tags: ["url", "encoding", "explained", "web"]
pubDate: 2026-10-15
faq:
  - question: "Is URL encoding the same as Base64?"
    answer: "No. URL encoding escapes unsafe characters as %XX; the data stays mostly readable. Base64 repackages the whole payload into a different alphabet. They solve different problems, and you sometimes use both together."
  - question: "What is double URL encoding?"
    answer: "It is encoding a string that is already encoded. It happens when two layers of a system both escape the same value, and it often produces URLs that do not match what the server expects. Avoid encoding the same value twice."
  - question: "Do I need to encode the entire URL?"
    answer: "No. You only encode the parts that can contain unsafe characters, usually query values and path segments. Scheme, host, and reserved delimiters like / and ? should be left alone."
  - question: "Why do spaces become %20 or +?"
    answer: "In the query string, spaces are encoded as + by form encoding and as %20 by percent-encoding. Both decode back to a space, but + is only valid inside the query, never in the path."
---

## What is URL encoding?

URL encoding, also called percent-encoding, is the rule that says: if a character is not safe to put inside a URL, replace it with a `%` followed by its two-digit hexadecimal code.

That is the whole idea. A space becomes `%20`. A `#` becomes `%23`. An emoji becomes a string of `%`-escapes you would never want to type by hand. The browser and the server agree on this rule, so a link that contains a space, a Chinese character, or a literal `&` still arrives intact instead of being chopped in half.

URLs are not allowed to contain just any byte. They have a defined set of characters that are always safe — letters, digits, and a handful of marks like `-`, `_`, `.`, and `~` — and a set of characters that have special meaning, such as `/` (path separator), `?` (start of query), and `&` (separator between parameters). Anything outside those two groups has to be escaped before it goes on the wire.

## Why it exists

A URL is a tiny command language. Every character in it can mean something. A `?` does not mean "question mark," it means "the query string starts here." An `&` means "here is the next parameter." So if the actual data you want to send contains a `&`, the server would get confused about where one value ends and the next begins.

This bites people constantly with search queries, form submissions, and API calls. You paste a sentence into a URL, it contains a space and an ampersand, and the link breaks or returns the wrong result. URL encoding is the escape hatch that lets real data ride inside a syntax that is full of special characters.

It matters even more on the modern web because URLs frequently carry non-ASCII text: names, addresses, and whole sentences in languages that do not fit in English. Those characters cannot go into a URL raw, so they are percent-encoded first (and usually converted to UTF-8 first — see [What Is UTF-8?](/guides/what-is-utf8)).

## How it works

Take a simple string to encode: `a b&c`. The space and the `&` are unsafe, so each becomes its byte value in hex:

```
a      -> a          (safe, left alone)
space   -> %20
b      -> b
&      -> %26
c      -> c
```

Result: `a%20b%26c`. The server reads that back, reverses the process, and recovers `a b&c` exactly.

The encoding is per-byte, not per-character. A plain ASCII letter is one byte, so it becomes one `%XX`. A non-ASCII character such as `é` is two or three bytes in UTF-8, so it becomes two or three `%XX` groups. That is why a single emoji can turn into a long, scary-looking escape sequence — it is just several bytes written out one at a time.

In JavaScript you get this for free:

```js
encodeURIComponent('a b&c'); // "a%20b%26c"
decodeURIComponent('a%20b%26c'); // "a b&c"
```

Notice the difference between `encodeURIComponent` and `encodeURI`. The second one leaves characters like `/` and `?` alone because it assumes you are encoding a whole URL. The first one escapes everything unsafe, which is what you want for a single value. Reaching for the wrong one is a classic source of broken links.

## Reserved vs. unreserved

The spec splits characters into three buckets:

- **Unreserved** — always safe: `A-Z a-z 0-9 - _ . ~`. Never encoded.
- **Reserved** — have syntactic meaning: `:/?#[]@!$&'()*+,;=`. Encoded only when they appear *outside* their normal role.
- **Everything else** — must be encoded.

The trick with reserved characters is context. A `/` in a path is fine; a `/` inside a parameter value is not, so there it gets encoded to `%2F`. Same character, different job.

## Where you will actually see it

- **Search boxes and forms.** When you submit a form with `method="get"`, the browser percent-encodes every field and appends it to the URL.
- **API query parameters.** Almost every REST API expects values encoded, especially when a value itself contains `&`, `=`, or spaces.
- **Non-Latin text in links.** A Chinese product name in a URL is encoded into UTF-8 bytes, then percent-escaped.
- **OAuth and signed URLs.** Tokens and signatures are often passed as parameters and must be encoded consistently or the signature will not match.

If you want to do this without thinking about hex tables, just paste the text into a [URL Encode / Decode tool](https://toolhub.51nav.com/tools/url-encode/) and copy the result. There is also a [URL Encode tool on DevTools](https://devtools.51nav.com/encode/urlencode/) and a [URL Parser](https://toolhub.51nav.com/tools/url-parser/) that breaks a link into its components so you can see what each part is.

## URL encoding vs. Base64

People mix these up because both turn weird data into safe text. They are different:

- URL encoding changes *only* the unsafe characters and leaves the rest readable. `hello world` becomes `hello%20world`.
- [Base64](/guides/what-is-base64) changes *everything* into a 64-character alphabet. `hello` becomes `aGVsbG8=`.

If you need a value to stay recognizable and only need to neutralize a few unsafe characters, percent-encode it. If you need to ship arbitrary binary as text, Base64 is the tool. Sometimes you do both: encode some data, then Base64 the result.

## Common mistakes

- **Double encoding.** Running encode twice so `&` becomes `%2526`. The server then decodes once and sees `%26` as literal text instead of `&`. Only encode a value once, at the boundary where it enters the URL.
- **Encoding the whole URL.** Encoding the slashes and colons of `https://` will produce something no browser can navigate to. Encode values, not structure.
- **Forgetting the query vs. path difference.** In the query string a space may be `+`; in the path it must be `%20`.
- **Assuming the server decodes for you everywhere.** Some frameworks decode automatically; others hand you the raw string. Know which one you are dealing with.

## When not to bother

If you are building a link in plain HTML or using a modern HTTP client, the library usually encodes for you. You only need to reach for `encodeURIComponent` when you are assembling a query string by hand, signing URLs, or debugging a request that is not arriving the way you sent it.

## Next steps

- Understand the character set underneath at [What Is UTF-8?](/guides/what-is-utf8).
- See the sibling encoding that turns data into a safe alphabet at [What Is Base64?](/guides/what-is-base64).
- Encode and decode values instantly with the [URL Encode / Decode tool](https://toolhub.51nav.com/tools/url-encode/).
