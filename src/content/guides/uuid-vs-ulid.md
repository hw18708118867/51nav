---
title: "UUID v1 vs v4, and Why ULID Sorts Better"
description: "UUID v1 leaks your MAC address and v4 is random. ULID stays sortable. Here is how the formats differ and when to pick each."
category: "Explained"
difficulty: "Beginner"
tags: ["uuid", "ulid", "identifier", "generator"]
pubDate: 2026-10-15
faq:
  - question: "Is a UUID v4 guaranteed unique?"
    answer: "Not mathematically, but the 122-bit random space is so large that collisions are astronomically unlikely in practice. Uniqueness comes from randomness, not from a central authority."
  - question: "Why avoid UUID v1?"
    answer: "v1 embeds the MAC address and a timestamp, which can fingerprint a machine and reveal creation time. Prefer v4 (random) or v7/v8 (time-ordered) for privacy."
  - question: "What makes ULID sortable?"
    answer: "ULID puts a millisecond timestamp first, encoded in Crockford Base32, so lexicographic order matches creation time — handy as a primary key in a database."
---

## Three identifiers, three trade-offs

| | UUID v1 | UUID v4 | ULID |
| --- | --- | --- | --- |
| Layout | timestamp + MAC | random | millisecond time + random |
| Sortable by time | Yes (but leaks MAC) | No | Yes |
| Privacy | Weak (MAC exposed) | Strong | Medium (time only) |
| Alphabet | hex + `-` | hex + `-` | Crockford Base32 |

## UUID v1

Built from a timestamp and the node's MAC address. It sorts and is unique without a coordinator, but the MAC is a privacy leak and the time reveals when you created the ID.

## UUID v4

Pure random (122 bits). No ordering, no leakage — the safe default when you just need a unique token and do not care about sort order.

```text
f47ac10b-58cc-4372-a567-0e02b2c3d479   (v4)
```

## UUID v7 / v8

Newer time-ordered UUIDs that keep v4's privacy story while sorting like ULID. If your stack supports them, they are a great middle ground.

## ULID

ULID leads with a millisecond timestamp in Base32, so string sorting equals chronological order — perfect as a database primary key where you want inserts to land in time order.

```text
01ARZ3NDEKTSV4RRFFQ69G5FAV   (timestamp | randomness)
```

The catch: 26 chars in Crockford Base32, so it is not drop-in compatible with UUID columns expecting 36-char hex.

## When to pick which

- **Random opaque token:** UUID v4.
- **Sortable DB primary key:** ULID or UUID v7.
- **Avoid v1** unless you specifically need MAC-based uniqueness and accept the leak.

## Generate them

- [UUID Generator on Toolbox](https://toolbox.51nav.com/tools/generator/uuid/)
- [ULID Generator on Toolbox](https://toolbox.51nav.com/tools/generator/ulid/)

### Related tools
- [UUID Generator on Toolbox](https://toolbox.51nav.com/tools/generator/uuid/)
- [ULID Generator on Toolbox](https://toolbox.51nav.com/tools/generator/ulid/)
- [UUID Generator on Toolhub](https://toolhub.51nav.com/tools/uuid-generator/)
- [UUID Generator on DevTools](https://devtools.51nav.com/encode/uuid-generator/)

## Next steps

- Wallet keys use a different scheme — see [BIP39 Derivation Path](/guides/bip39-derivation-path).
- Time values themselves need care — [Unix Timestamp: 10 vs 13 digits](/guides/unix-timestamp-10-vs-13).
