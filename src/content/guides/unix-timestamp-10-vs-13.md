---
title: "Unix Timestamp: 10 Digits or 13? Seconds vs Milliseconds"
description: "A Unix timestamp is either 10 digits (seconds) or 13 (milliseconds). Mixing them up shifts dates by a factor of 1000 — here is how to tell and convert."
category: "Explained"
difficulty: "Beginner"
tags: ["timestamp", "unix", "date", "debugging"]
pubDate: 2026-10-15
faq:
  - question: "How do I know if a timestamp is seconds or ms?"
    answer: "Count digits. 10 digits (up to 2147483647) is seconds; 13 digits is milliseconds. A value like 1780000000 is seconds; 1780000000000 is milliseconds."
  - question: "Why does my date show as 1970 or the year 52000?"
    answer: "You passed milliseconds into something expecting seconds (or vice versa). The result is off by 1000x: seconds-treated-as-ms lands in 1970; ms-treated-as-seconds jumps past the year 50000."
  - question: "What does JavaScript use?"
    answer: "Date.now() returns milliseconds (13 digits). Many backend claims like JWT exp are seconds (10 digits), so convert before comparing."
---

## The two flavors

A Unix timestamp counts seconds (or milliseconds) since `1970-01-01T00:00:00Z`.

| Unit | Digits (now) | Example |
| --- | --- | --- |
| Seconds | 10 | `1780000000` |
| Milliseconds | 13 | `1780000000000` |

## The bug

Code that expects seconds but gets milliseconds (or the reverse) is wrong by exactly 1000×:

```js
const exp = 1780000000;          // seconds (JWT-style)
const now = Date.now();          // milliseconds
// WRONG: compares ms to seconds
if (now > exp) { /* always true */ }

// RIGHT: same unit
if (Math.floor(now / 1000) > exp) { /* correct */ }
```

## How to tell which you have

- **10 digits** → seconds.
- **13 digits** → milliseconds.
- If a "timestamp" is `1.78e12`, it is milliseconds.

## Convert

```js
const sec = Math.floor(Date.now() / 1000);     // ms -> s
const ms  = sec * 1000;                         // s -> ms
```

## Watch JWT and databases

- JWT `exp`/`iat`/`nbf` are **seconds**.
- JavaScript `Date.now()` is **milliseconds**.
- SQL `FROM_UNIXTIME()` usually expects **seconds**; `unix_timestamp()` returns seconds.

## Convert any value

Paste a timestamp and see the date in both units with the [Timestamp Converter on Toolbox](https://toolbox.51nav.com/tools/converter/timestamp/).

### Related tools
- [Timestamp Converter on Toolbox](https://toolbox.51nav.com/tools/converter/timestamp/)
- [Timestamp Converter on Toolhub](https://toolhub.51nav.com/tools/timestamp/)
- [Timestamp Converter on DevTools](https://devtools.51nav.com/date/timestamp-converter/)
- [Epoch Converter on DevTools](https://devtools.51nav.com/date/epoch-converter/)

## Next steps

- JWT claims use these seconds — see [JWT signature verification failed](/guides/jwt-signature-verification-failed).
- Sortable IDs also lean on time — [UUID vs ULID](/guides/uuid-vs-ulid).
