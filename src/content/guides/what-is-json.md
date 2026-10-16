---
title: "What Is JSON? A Plain-English Guide"
description: "JSON (JavaScript Object Notation) is the lightweight data format that powers most modern web APIs. Learn what it is, how it is structured, and why it matters."
category: "Explained"
difficulty: "Beginner"
tags: ["json", "data", "api", "explained"]
pubDate: 2026-09-20
faq:
  - question: "Is JSON the same as JavaScript?"
    answer: "No. JSON is a text data format inspired by JavaScript object syntax, but it is parsed by nearly every language and has stricter rules: double-quoted keys, no comments, and no trailing commas."
  - question: "Why use JSON instead of XML?"
    answer: "JSON is lighter, maps directly onto native data structures like objects and arrays, and is far easier to parse. XML is more verbose and mostly lingers in legacy enterprise systems."
  - question: "What are the most common JSON errors?"
    answer: "Unquoted or single-quoted keys, trailing commas after the last element, using undefined instead of null, and mismatched braces or brackets."
  - question: "Is parsing JSON safe?"
    answer: "Parsing is safe, but never trust the data inside it. Validate and verify on the server, and cap the size and depth when the input comes from an untrusted source."
---

## What is JSON?

JSON stands for JavaScript Object Notation. Despite the name, it has almost nothing to do with
JavaScript today — it is a plain-text format for representing data that nearly every programming
language can read and write.

If you have ever called a web API, you have used JSON. The server sends back a string like
`{"user": "ada", "active": true}`, your code parses it, and suddenly you have a structured object to
work with. That round trip is the backbone of most modern web and mobile apps.

## What JSON looks like

```json
{
  "name": "51NAV",
  "type": "start-page",
  "categories": 16,
  "tools": ["Toolhub", "Finance", "Health"]
}
```

This is a JSON object: a set of key/value pairs. Keys are always strings in double quotes, and values
can be several different types.

## The two building blocks

Everything in JSON is built from two structures:

- **Objects** — unordered key/value pairs wrapped in `{ }`. Think of a dictionary or a map.
- **Arrays** — ordered lists of values wrapped in `[ ]`.

Values themselves can be:

- Strings (`"hello"`)
- Numbers (`42`, `3.14`, `-1`)
- Booleans (`true` or `false`)
- `null`
- Another object or array, so you can nest freely

## Why JSON won

Before JSON, XML was the default. XML is verbose — every value comes with opening and closing tags,
and parsing it is genuinely annoying. JSON is tighter and maps directly onto the data structures that
languages already have: objects, arrays, and primitives.

YAML is another alternative and is lovely for config files, but its reliance on indentation makes it
easy to break, and it is slower to parse. JSON hits a sweet spot: readable by humans, trivial to parse,
and unambiguous.

| Format | Readability | Size | Best for |
| --- | --- | --- | --- |
| JSON | High | Small | Web APIs, config |
| XML | Medium | Large | Legacy enterprise systems |
| YAML | High | Small | Human-written config |

## A note on numbers

JSON numbers are just numbers — there is no distinction between an integer and a float, and the spec
puts no hard limit on size (though many parsers cap at 64-bit floating point). If you need exact
decimals, such as currency values, send them as strings and parse carefully on the other side rather
than trusting floating-point math.

## Common mistakes that break parsing

These trip up almost everyone at some point:

- **Keys must be double-quoted.** `"name"` works; `name` and `'name'` do not.
- **No trailing commas.** `[1, 2, 3,]` is invalid in strict JSON, even though JavaScript objects allow it.
- **`null` is not `undefined`.** JSON has `null`; it has no concept of `undefined`.
- **Comments are not allowed.** If you need notes, use a separate field or a variant like JSONC.
- **One root value.** The whole document is a single object or array, not several placed side by side.

## Reading untrusted JSON safely

Parsing JSON from a source you do not control is fine, but keep two things in mind. First, never trust
the data inside it — a `"role": "admin"` field in a client-side payload means nothing until your server
verifies it. Second, watch out for excessively deep or huge documents; a malicious payload can blow up
memory. Most languages let you cap depth or size during parsing, and you should use those limits when
the input is untrusted.

## Validate and format

You do not have to catch the mistakes above by hand. A validator flags them before they reach
production, and a formatter turns a one-line mess into something you can actually read. Both are one
click away on 51NAV — the [JSON Formatter](https://toolhub.51nav.com/tools/json-formatter/) does both in the browser.

## Where to go next

- Format and validate JSON instantly with the [JSON Formatter](https://toolhub.51nav.com/tools/json-formatter/). There is also a [JSON Formatter on DevTools](https://devtools.51nav.com/json/formatter/) and a [JSON Formatter on Toolbox](https://toolbox.51nav.com/tools/data-format/json-format/).
- Get practical tips in the [JSON Formatter Guide](/guides/json-formatter-guide).
