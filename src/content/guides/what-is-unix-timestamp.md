---
title: "What Is a Unix Timestamp? Epoch Time, Explained"
description: "A Unix timestamp is the number of seconds since Jan 1 1970 UTC. Learn why it exists, how seconds differ from milliseconds, and the bugs that still bite developers."
category: "Explained"
difficulty: "Beginner"
tags: ["timestamp", "date", "epoch", "explained"]
pubDate: 2026-10-15
faq:
  - question: "What is the difference between seconds and milliseconds?"
    answer: "Unix time is defined in seconds, but JavaScript's Date.now() returns milliseconds. Mixing the two is the most common timestamp bug: a value 1000x too large. Check which unit your API expects."
  - question: "What happens at the 2038 problem?"
    answer: "Systems that store the 32-bit signed timestamp overflow on 2038-01-19. Modern 64-bit systems are immune, but old embedded and legacy software may still break."
  - question: "Does a Unix timestamp include timezones?"
    answer: "No, that is the point. It counts seconds from UTC, so it is the same number everywhere. The timezone only matters when you convert it to a human-readable local time."
  - question: "What is the year 2038 problem for timestamps?"
    answer: "It is the moment a signed 32-bit count of seconds since 1970 wraps around. If your stack is old enough to use 32-bit time, plan a migration before 2038."
---

## What is a Unix timestamp?

A Unix timestamp is a single number: the count of seconds that have passed since **00:00:00 UTC on January 1, 1970**, not counting leap seconds. That starting moment is called the *epoch*.

Right now the timestamp is somewhere around `1,780,000,000` and change. That one integer is enough to represent almost any moment in the practical past and future, which is why it shows up everywhere from database rows to server logs.

You will also hear it called *epoch time*, *Unix time*, or *POSIX time*. Same thing.

## Why it exists

Human date formats are a mess. `10/11/2026` means November 10 in the US and October 11 in most of Europe. Add timezones, daylight saving, and calendar quirks, and comparing two moments becomes painful. A timestamp throws all of that away: it is just a number, and you compare numbers by subtracting them.

That simplicity is the entire appeal:

- **Ordering.** A later moment is always a larger number. No parsing required.
- **Math.** "How many seconds between these two events?" Subtract. Done.
- **Timezone-free storage.** Store one number; render it in the user's local time only at the very end.
- **Compact.** One integer instead of a 20-character string.

## Seconds vs. milliseconds

This is the single most common timestamp bug, so it deserves its own section.

The *definition* of Unix time is **seconds**. But JavaScript, and a lot of frontend tooling, works in **milliseconds** because `Date.now()` returns milliseconds. So the same moment is:

```
seconds:   1780000000
milliseconds: 1780000000000
```

They differ by a factor of 1000. If a backend expects seconds and you send milliseconds, every date shows up as the year 57000 or similar. If the backend expects milliseconds and you send seconds, everything reads as 1970. Always confirm the unit before you send a timestamp.

## Where you will see it

- **APIs and databases.** PostgreSQL `TIMESTAMPTZ`, Unix columns, JSON payloads — all commonly store or accept epoch values.
- **[JWTs](/guides/what-is-jwt).** The `exp` and `iat` claims are Unix timestamps in seconds. That is why a token "expires at 1780000000."
- **Logs and metrics.** Every event line is usually stamped with one, so you can compute durations trivially.
- **Caching and signing.** "Valid until this timestamp" is a compact, unambiguous rule.

To convert one without mental math, paste it into a [Timestamp Converter](https://toolhub.51nav.com/tools/timestamp/). There is a [Timestamp Converter on DevTools](https://devtools.51nav.com/date/timestamp-converter/) and a [Timestamp tool on Toolbox](https://toolbox.51nav.com/tools/converter/timestamp/) too. For converting across timezones afterward, a [Timezone Converter](https://toolhub.51nav.com/tools/timezone-converter/) helps.

## Leap seconds and the "same number" trick

Because the timestamp counts seconds since the epoch and ignores leap seconds, two real-world seconds can map to the same timestamp during a negative leap second (which has never happened) — and positive leap seconds are handled by smearing, not by a gap in the count. In practice, for almost all applications, you can treat the timestamp as a perfectly smooth count and ignore leap seconds entirely.

## The 2038 problem

If a system stores the timestamp as a *signed 32-bit integer*, the largest value it can hold is `2,147,483,647`, which corresponds to **2038-01-19 03:14:07 UTC**. One second later, it overflows and wraps to a negative number, and date math breaks.

This is the Y2K of timestamps. Modern 64-bit systems have so much headroom (they will not overflow for hundreds of billions of years) that the problem is solved for new software. The risk is legacy embedded systems and old codebases still compiled with 32-bit time. If you maintain anything that old, the fix is to move to 64-bit time before 2038.

## Common mistakes

- **Unit confusion** (seconds vs. milliseconds) — already covered, but it is the big one.
- **Forgetting UTC.** The timestamp itself is UTC, but the human-readable conversion depends on the viewer's timezone. A "wrong time" bug is usually a wrong timezone, not a wrong timestamp.
- **Client-side generation for security.** Never trust a timestamp sent by the browser for things like "has this link expired" — the client can forge it. Generate and verify server-side.
- **Rounding.** Dividing milliseconds by 1000 with integer math is fine; doing it with floating point and then stringifying can produce off-by-one errors.

## When you do not need one

For displaying a date to a user, you usually want a proper date object or a formatted string, not a raw number. The timestamp is a storage and transport format, not a presentation format. Convert to a human date only at the edge, closest to where it is shown.

## Next steps

- Understand the tokens that rely on it at [What Is a JWT?](/guides/what-is-jwt).
- Convert any epoch value in seconds or milliseconds with the [Timestamp Converter](https://toolhub.51nav.com/tools/timestamp/).
- Move between timezones cleanly with the [Timezone Converter](https://toolhub.51nav.com/tools/timezone-converter/).
