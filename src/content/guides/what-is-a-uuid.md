---
title: "What Is a UUID? Why Developers Use Random IDs"
description: "A UUID is a 128-bit identifier meant to be unique without a central authority. Learn the versions, when to use one, and how it beats an auto-increment counter."
category: "Explained"
difficulty: "Beginner"
tags: ["uuid", "identifiers", "generators", "explained"]
pubDate: 2026-10-15
faq:
  - question: "Are UUIDs guaranteed to be unique?"
    answer: "Not mathematically, but practically. The space is so large that accidental collisions are treated as impossible for real systems. The risk is a broken generator, not bad luck."
  - question: "What is the difference between UUID v1, v4, and v5?"
    answer: "v1 is time- and MAC-based (leaks the machine), v4 is random (the default everyone uses), and v5 is name-based and deterministic (same input always yields the same UUID)."
  - question: "Should I use a UUID as a database primary key?"
    answer: "You can, and many systems do, but UUIDs make indexes larger and inserts less cache-friendly than sequential integers. Use them when you need to generate IDs across many machines or before talking to a database."
  - question: "Is a UUID the same as a NanoID or ULID?"
    answer: "No. They are alternatives that solve the same problem with shorter or sortable strings. UUIDs are the oldest and most universally supported; NanoID is shorter, ULID is time-sortable."
---

## What is a UUID?

A UUID — short for *Universally Unique Identifier* — is a 128-bit label written as 32 hexadecimal characters split by hyphens, like this:

```
550e8400-e29b-41d4-a716-446655440000
```

The pitch is in the name: you can generate one on your laptop, I can generate one on mine, and neither of us has to ask a central server whether the ID is taken. The chance that our two IDs collide is so small it is not worth planning around.

UUIDs are also called GUIDs ("Globally Unique Identifier") in Microsoft-land. Same thing, different accent.

## The format

That string is five groups: 8-4-4-4-12 hex digits. The third group's first digit and the fourth group's first digit carry version and variant information, which is how you can tell a v4 from a v1 just by looking.

```
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
                  ^        ^
                version   variant
```

## The versions that matter

Not all UUIDs are generated the same way, and the version tells you the method:

- **v1 — time-based.** Built from the current time plus the machine's MAC address. It sorts by creation time but leaks both the clock and the device, which is why almost nobody uses it for public IDs.
- **v4 — random.** 122 bits are random. This is the default and the one you want 99% of the time.
- **v5 — name-based.** Derived by hashing a namespace and a name, so the same name always produces the same UUID. Useful when you want a stable ID derived from something like a URL or email.
- **v2, v3, v6–v8** exist but are niche (v3 is the MD5 name-based predecessor of v5; v6–v8 are newer time-ordered variants).

If you just need "a unique ID," pick v4 and move on.

## When you should reach for one

- **Distributed generation.** Many services create records before a database has assigned an ID. A UUID lets each service mint its own without coordination.
- **Public-facing IDs.** Exposing an auto-increment primary key (`/users/147`) tells attackers how many users you have and lets them enumerate them. A UUID hides that (`/users/550e8400-...`).
- **Merge-friendly data.** Two offline systems that later sync will not clash on IDs the way they would with separate counters.
- **Composite keys and foreign references** across services.

Generate one any time with a [UUID Generator](https://toolhub.51nav.com/tools/uuid-generator/). There is a [UUID tool on DevTools](https://devtools.51nav.com/encode/uuid-generator/) and a [UUID generator on Toolbox](https://toolbox.51nav.com/tools/generator/uuid/) too. If you want shorter or sortable IDs, look at the [NanoID Generator](https://toolhub.51nav.com/tools/nano-id/) and the [ULID Generator on Toolbox](https://toolbox.51nav.com/tools/generator/ulid/).

## UUIDs vs. auto-increment integers

The classic alternative is a database sequence: `1, 2, 3, ...`. Integers are smaller, faster to index, and naturally sorted. UUIDs are larger (16 bytes vs 4–8) and random, which scatters index inserts.

So the honest trade-off is:

- Use an **integer** when everything is created in one database and you care about index performance and storage.
- Use a **UUID** when you generate IDs before or outside the database, across services, or when you do not want to expose counts.

A common pattern is to use an internal integer primary key and hand out a UUID as the public ID — best of both.

## The "uniqueness" fine print

UUIDs are not unique by proof; they are unique by probability. The v4 space has 2^122 possibilities, which is a number so large that you would need to generate billions of IDs per second for centuries to stand a real chance of a collision. In practice, the only way to get a duplicate is a buggy random generator — which is why you should use a well-tested library, not your own `Math.random()` loop.

## A few gotchas

- **Storage size.** If you store UUIDs as strings (`CHAR(36)`) instead of binary (`BINARY(16)`), you waste space and slow comparisons. Store them as 16 bytes when you can.
- **v1 leaks identity.** Do not use time-based UUIDs where the MAC address or creation time is sensitive.
- **Readability.** A UUID is unreadable to a human. For debugging, pairing it with a short human label helps.
- **Sortability.** Random UUIDs do not sort by time. If you need time-sortable, use ULID or the newer UUIDv7.

## When not to use a UUID

- As a security token. A UUID is guessable enough that it should never be the only thing standing between an attacker and private data — add a random, high-entropy secret for that.
- When a simple counter is clearly enough and performance matters more than coordination-free generation.

## Next steps

- Need a shorter ID? Try the [NanoID Generator](https://toolhub.51nav.com/tools/nano-id/).
- Want time-sortable identifiers? The [ULID Generator on Toolbox](https://toolbox.51nav.com/tools/generator/ulid/) is worth a look.
- Pairs naturally with [What Is a Hash?](/guides/what-is-a-hash) if you are hashing IDs for privacy.
