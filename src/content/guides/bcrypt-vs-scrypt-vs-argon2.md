---
title: "bcrypt vs scrypt vs Argon2: How to Choose a Password Hash"
description: "Storing passwords means hashing with a slow, salted, memory-hard function. Here is how bcrypt, scrypt, and Argon2 differ and which to reach for in 2026."
category: "Explained"
difficulty: "Intermediate"
tags: ["bcrypt", "scrypt", "argon2", "password", "hashing"]
pubDate: 2026-10-15
faq:
  - question: "Plain SHA-256 is a hash, why not use it for passwords?"
    answer: "SHA-256 is fast and unsalted by default, so attackers brute-force or use rainbow tables cheaply. Password hashing needs salt and deliberate slowness, which SHA alone does not provide."
  - question: "Which is the safest?"
    answer: "Argon2id is the current recommendation — it won the Password Hashing Competition and is memory-hard. scrypt is a strong fallback, and bcrypt is still acceptable if bumping the cost factor."
  - question: "What is a salt?"
    answer: "A random value mixed into the hash so two users with the same password get different hashes, defeating precomputed rainbow tables."
---

## Password hashing is not ordinary hashing

A password hash must do three things ordinary hashes do not: be **salted** (unique per password), **slow** (costly to brute-force), and ideally **memory-hard** (costly to parallelize on GPUs). That is why `bcrypt`, `scrypt`, and `Argon2` exist.

## Side by side

| | bcrypt | scrypt | Argon2id |
| --- | --- | --- | --- |
| Year | 1999 | 2009 | 2015 (PHC winner) |
| Tunable cost | rounds (cost) | N (CPU), r (mem), p (parallel) | m (memory), t (time), p (parallel) |
| Memory-hard | No (some) | Yes | Yes |
| Salt | Built in | Built in | Built in |
| Output | `cost$salt$hash` | `Nrp$salt$hash` | `v=19$m=...,t=...,p=...$salt$hash` |

## bcrypt

The veteran. Simple, battle-tested, salt built in. Its weakness is low memory use, so dedicated hardware can parallelize it. Keep the cost factor at 12+ today.

```text
$2b$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdCE...
```

## scrypt

Adds a memory cost (`r`) on top of CPU cost, raising the bar against GPU farms. Good choice when you cannot use Argon2.

```text
params: N=2^14, r=8, p=1   (tune memory with r)
```

## Argon2id

The modern default. `id` (data-independent + data-dependent) resists both side-channel and GPU attacks. Tune memory `m`, iterations `t`, and parallelism `p`.

```text
m=19456, t=2, p=1   (≈19 MiB — a common starting point)
```

## How to choose

- **New project:** Argon2id, memory ≈ 19–64 MiB, tune `t` to keep a hash under ~500 ms.
- **Need broad legacy support:** scrypt, or bcrypt with cost ≥ 12.
- **Anything:** never use raw SHA-256/MD5, and always use a library that verifies in constant time.

## Generate and verify

Hash passwords locally with the matching tools:

- [Bcrypt Hash on Toolbox](https://toolbox.51nav.com/tools/hashing/bcrypt/)
- [Scrypt Hash on Toolbox](https://toolbox.51nav.com/tools/hashing/scrypt/)
- [Argon2 Hash on Toolbox](https://toolbox.51nav.com/tools/hashing/argon2/)
- Generate strong inputs with the [Password Generator on Toolbox](https://toolbox.51nav.com/tools/security/password-gen/)

### Related tools
- [Bcrypt Hash on Toolbox](https://toolbox.51nav.com/tools/hashing/bcrypt/)
- [Scrypt Hash on Toolbox](https://toolbox.51nav.com/tools/hashing/scrypt/)
- [Argon2 Hash on Toolbox](https://toolbox.51nav.com/tools/hashing/argon2/)
- [Password Generator on Toolbox](https://toolbox.51nav.com/tools/security/password-gen/)
- [Bcrypt Hash Generator on Toolhub](https://toolhub.51nav.com/tools/bcrypt-hash/)
- [Password Generator on Toolhub](https://toolhub.51nav.com/tools/password-generator/)
- [Password Generator on DevTools](https://devtools.51nav.com/crypto/password-generator/)

## Next steps

- Cipher parameters differ from hashing — see [SM4 vs AES](/guides/sm4-vs-aes).
- Tokens fail verification the same way — [JWT signature verification failed](/guides/jwt-signature-verification-failed).
