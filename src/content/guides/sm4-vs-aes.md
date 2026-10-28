---
title: "SM4 vs AES: Parameter Differences Compared"
description: "Both are 128-bit block ciphers, but their key sizes, structure, and standards differ. Here is a side-by-side of the parameters that actually matter when you pick one."
category: "Explained"
difficulty: "Intermediate"
tags: ["sm4", "aes", "encryption", "crypto"]
pubDate: 2026-10-15
faq:
  - question: "Is SM4 weaker than AES?"
    answer: "No public break of either at standard parameters. They are different designs from different standards bodies (China's GM/T 0002 vs NIST FIPS 197). Choose based on compliance and interoperability, not on a presumed strength gap."
  - question: "Can SM4 use a 256-bit key?"
    answer: "No. SM4 fixes the key at 128 bits. If you need 192- or 256-bit keys, that is AES's territory."
  - question: "Do they support the same modes?"
    answer: "Both support the standard modes (ECB, CBC, CTR, GCM, etc.). The difference is in the key length and round structure, not in which modes exist."
---

## Two 128-bit block ciphers

SM4 and AES both operate on 128-bit blocks. Past that, they diverge. The confusion usually comes from assuming "block cipher" means "interchangeable" — it does not. The parameters below change how you implement and validate each one.

## Side-by-side parameters

| Parameter | SM4 | AES |
| --- | --- | --- |
| Block size | 128 bits | 128 bits |
| Key size | **128 bits only** | 128 / 192 / 256 bits |
| Rounds | 32 (unbalanced Feistel) | 10 / 12 / 14 (SPN) |
| Structure | Feistel network | Substitution–permutation network |
| Standard | GM/T 0002 (China) | FIPS 197 (NIST) |
| S-box | fixed, 8-bit | fixed, 8-bit (algebraic) |
| Typical modes | ECB, CBC, CTR, GCM, CCM | ECB, CBC, CTR, GCM, CCM, XTS |

## Key size is the first fork

AES lets you pick 128, 192, or 256-bit keys. SM4 does not — it is always 128 bits. If a spec or auditor demands AES-256, SM4 cannot satisfy it, and you must use AES.

```text
AES-128  -> 10 rounds, 128-bit key
AES-192  -> 12 rounds, 192-bit key
AES-256  -> 14 rounds, 256-bit key
SM4      -> 32 rounds, 128-bit key  (fixed)
```

## Round structure

AES is a substitution–permutation network: layers of byte substitution, row shifting, column mixing, and key addition. SM4 is an unbalanced Feistel network with 32 rounds and a single non-linear substitution per round. Both are well studied; the practical difference is implementation detail, not security posture.

## Mode and padding still matter

Neither cipher defines padding — that comes from the mode. ECB needs padding (don't use ECB), CBC needs PKCS#7 padding and a random IV, and GCM is an AEAD mode that also gives you integrity, not just confidentiality.

```js
// conceptual: same mode, different key length
aes.encrypt(plaintext, aes256Key, { mode: 'gcm', iv });
sm4.encrypt(plaintext, sm4Key128, { mode: 'gcm', iv });
```

## When to use which

- **Use AES** when you need 192/256-bit keys, broadest library support, or FIPS/NIST alignment.
- **Use SM4** when a Chinese national standard (GM/T 0002) is required, or the other end only speaks SM4.

## Try both

Encrypt and decrypt with each to see the parameters side by side:

- [SM4 Encrypt / Decrypt on Toolbox](https://toolbox.51nav.com/tools/encryption/sm4/)
- [AES Encrypt / Decrypt on Toolbox](https://toolbox.51nav.com/tools/encryption/aes/)

### Related tools
- [SM4 Encrypt / Decrypt on Toolbox](https://toolbox.51nav.com/tools/encryption/sm4/)
- [AES Encrypt / Decrypt on Toolbox](https://toolbox.51nav.com/tools/encryption/aes/)
- [AES Encrypt / Decrypt on Toolhub](https://toolhub.51nav.com/tools/aes-encrypt/)

## Next steps

- Password hashing is a different problem from encryption — see [bcrypt vs scrypt vs Argon2](/guides/bcrypt-vs-scrypt-vs-argon2).
- The text you feed a cipher is often Base64 — see [Base64 Images in CSS](/guides/base64-data-uri-image).
