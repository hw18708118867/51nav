---
title: "How to Generate a Strong Password (and Actually Remember It)"
description: "A strong password is long, random, and unique. Learn what makes passwords crackable, how generators and passphrases work, and how to check a password without leaking it."
category: "How-To"
difficulty: "Beginner"
tags: ["password", "security", "how-to", "generators"]
pubDate: 2026-10-15
faq:
  - question: "How long should a password be?"
    answer: "Aim for at least 12 characters, and 16 or more for anything important. Length is the single biggest factor in resisting guessing and brute force."
  - question: "Are passphrases better than random passwords?"
    answer: "For a password you must type or remember, a passphrase of four or more random words is both strong and usable. For an account you store in a manager, a 20-character random string is ideal — you never type it."
  - question: "Is it safe to check my password with an online tool?"
    answer: "Use a strength meter that evaluates the password locally in your browser and never sends it anywhere. Never paste a real password into a site you do not trust, and never reuse a password you just tested."
  - question: "Why is password reuse so dangerous?"
    answer: "One database breach exposes every account that shares that password. Unique passwords contain the damage to a single site. A manager makes uniqueness painless."
---

## How to generate a strong password

A "strong" password has three properties, and most advice overthinks the rest:

1. **Long.** Length beats complexity. A 16-character random password is far harder to crack than an 8-character "complex" one with symbols.
2. **Random.** The characters should come from a generator, not from a pattern, a name, or a dictionary word.
3. **Unique.** A different password for every account, so one breach does not cascade.

That is it. The popular rules — must include a symbol, must change monthly, cannot repeat a character — are mostly theater. Attackers do not care about your symbol count; they care about how many guesses your password needs, and length plus randomness is what drives that number up.

## What makes a password weak

Most weak passwords fail for boring reasons:

- **Dictionary words.** `dragon`, `football`, `password` — the first things every cracking tool tries.
- **Personal info.** Birthdays, pet names, and `John1985` are guessable by anyone with a social-media glance at you.
- **Common patterns.** `Password1`, `qwerty123`, `LetMeIn!` appear in every breach dataset.
- **Reuse.** The same password on ten sites means one leaked database unlocks them all.

Cracking is mostly guessing. Tools load billions of previously leaked passwords and variations, then hammer accounts with them. A password drawn from that pool falls in milliseconds. A random 16-character string is simply not in the pool.

## Option 1: use a password manager and its generator

This is the recommendation for almost everyone. A manager stores one master password and generates a unique, random password for every site. You only have to remember one thing, and every account gets a 20-character monster you never type.

The generator should let you pick length and character sets. For most sites, 16–20 mixed characters is plenty. Let the manager handle the rest. If you want to generate one right now, a [Password Generator](https://toolhub.51nav.com/tools/password-generator/) will do it in the browser. There is also a [Password Generator on DevTools](https://devtools.51nav.com/crypto/password-generator/) and a [password generator on Toolbox](https://toolbox.51nav.com/tools/security/password-gen/).

## Option 2: a passphrase you can remember

If you must type or memorize a password, random words beat random characters for usability. Pick four or more unrelated words:

```
correct-horse-battery-staple
```

That is long, hard to guess, and far easier to type than `Tq7$mK9!zX2&`. The famous example above is only famous — do not use that exact phrase; pick your own words. The strength comes from the number of possible combinations across many words, not from clever symbols. Add a number or a separator if a site demands it, but the words are doing the work.

## Option 3: the diceware approach

For maximum confidence, roll dice to pick words from a word list (the "diceware" method). Physical randomness, no algorithm you have to trust. Four to six words is considered strong. This is overkill for most people but perfect if you want a master password you can actually recall.

## How passwords should be stored (for builders)

If you run a service that stores user passwords, do not hash them with MD5 or SHA-1, and do not invent your own scheme. Use a deliberately slow, salted algorithm:

- **bcrypt**, **scrypt**, or **Argon2id** — these are designed to be expensive, so guessing is slow even on good hardware.
- **Always salt** — a random value per user so identical passwords produce different hashes and precomputed tables fail.

You can see one in action with the [Bcrypt Hash Generator on Toolbox](https://toolbox.51nav.com/tools/hashing/bcrypt/). The takeaway for everyone else: a reputable site never sees or stores your plaintext password; it stores a hash (see [What Is a Hash?](/guides/what-is-a-hash) for why that matters).

## How to check a password without leaking it

Before trusting a password, you want a sense of its strength. The safe way is a **local** strength meter that scores it in your browser and sends nothing over the network. That is exactly what a [Password Strength Meter](https://toolhub.51nav.com/tools/password-strength/) is for — judge it, then discard it, and never reuse a value you just tested on a random site.

To check whether a password has appeared in known breaches, use the k-anonymity model (your full password is never sent; only a prefix of its hash is). If a tool demands your actual password to "check" it, close the tab.

## Building the habit

The technical password is only half the picture. The habit matters more:

- **One unique password per account.** A manager makes this trivial.
- **Turn on two-factor authentication** where available — it blunts the impact of a leaked password.
- **Never reuse.** This is the single highest-leverage rule.
- **Update only when needed.** Change a password because of a breach or suspicion, not on a calendar. Forced monthly changes just push people to `Password1, Password2, ...`.

## Common mistakes

- **Leaning on symbols over length.** `Tr0ub4dour&3` is weaker than a long random phrase despite "looking" strong.
- **Writing it on a sticky note** next to the monitor — or in a notes app with no lock.
- **Reusing the "strong" one** everywhere. One strong password reused is one breach away from total.
- **Storing it in a plain text file** synced to the cloud. Use an actual manager.

## When a password is not the right tool

For sharing a secret, use a purpose-built secure share. For API access, use tokens or keys, not a user password. For encrypting a file, use real encryption rather than "password-protecting" via a weak scheme. Match the mechanism to the job.

## Next steps

- Generate a unique random password with the [Password Generator](https://toolhub.51nav.com/tools/password-generator/).
- Check a candidate's strength locally with the [Password Strength Meter](https://toolhub.51nav.com/tools/password-strength/).
- Understand the hashing that protects passwords at [What Is a Hash?](/guides/what-is-a-hash).
