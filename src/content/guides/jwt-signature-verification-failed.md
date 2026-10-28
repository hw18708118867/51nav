---
title: "JWT signature verification failed: A Debugging Checklist"
description: "When a library throws 'signature verification failed', the token decoded fine — the math just did not check out. Walk this checklist to find the exact mismatch."
category: "How-to"
difficulty: "Intermediate"
tags: ["jwt", "auth", "error", "debugging"]
pubDate: 2026-09-22
faq:
  - question: "Is the token expired or forged?"
    answer: "Those are different errors. 'Expired' means the exp claim is in the past. 'Signature verification failed' means the signature does not match the data and the secret/key, so the token was altered or signed with a different key."
  - question: "Does decoding the JWT tell me anything?"
    answer: "Decoding only reads the header and payload; it never checks the signature. A token can decode perfectly and still fail verification — that is expected and normal."
  - question: "Why does it work locally but not on the server?"
    answer: "The two sides are using different secrets or keys, or a different algorithm. Check environment variables and key rotation between environments."
---

## What the error means

`signature verification failed` is a good sign: it means the library parsed the token, read the header, and then **checked the signature against the signing key — and they did not match**. The payload may be perfectly valid JSON; the cryptographic proof is what broke.

Verification recomputes the signature over `header.payload` using the key and algorithm from the header, then compares it to the `signature` segment. If they differ, this error fires.

## The debugging checklist

### 1. Secret vs. key mismatch (HS256/HS384/HS512)

For HMAC algorithms the "key" is a shared secret. The most common cause is the verifying side using a *different* secret than the signing side.

- A trailing newline or whitespace in the secret string (`process.env.JWT_SECRET + "\n"`).
- Copy-paste that included invisible characters.
- Different secret per environment (dev vs prod) but the same token.

**Fix:** trim the secret and confirm both sides read the identical value:

```js
const secret = process.env.JWT_SECRET.trim();
jwt.verify(token, secret);
```

### 2. Algorithm confusion (RS256 vs HS256)

The header says `"alg":"RS256"` (asymmetric, public/private key pair), but your code verifies with an HMAC secret — or vice versa. A classic bug (and a known attack) is verifying an RS256 token with the public key *as if it were an HMAC secret*.

**Fix:** pin the algorithm explicitly instead of trusting the header:

```js
jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

### 3. The `none` algorithm

If verification accepts `alg: "none"`, an attacker can strip the signature. Always pass an `algorithms` allowlist so `none` is rejected.

### 4. Token truncated or altered in transit

A proxy, logging layer, or string split that drops a character from the signature will break verification. This often shows up after storing the token in a place that mangles it (e.g., a header folded across lines).

**Fix:** compare the raw token byte-for-byte on both sides before verifying.

### 5. Base64URL vs Base64 in manual verification

If you verify by hand, JWTs use Base64URL (`-` and `_`), not standard Base64 (`+` and `/`). Decoding with the wrong alphabet produces the wrong bytes and a failed signature.

### 6. Clock skew on `exp` / `nbf`

Some libraries fold "not yet valid" or "expired" into a verification failure, or apply a leeway you are not expecting. Server and verifier clocks a few minutes apart can trip `nbf`.

**Fix:** allow a small `clockTolerance` (e.g., 30s) and sync clocks with NTP.

## Verify it properly

Use a tool that lets you paste the token and the key and see the exact step that fails. The [JWT tool on Toolbox](https://toolbox.51nav.com/tools/security/jwt/) signs and verifies locally so the secret never leaves your browser.

### Related tools
- [JWT tool on Toolbox](https://toolbox.51nav.com/tools/security/jwt/)
- [JWT Decoder on Toolhub](https://toolhub.51nav.com/tools/jwt-decoder/)
- [JWT Inspector on Toolhub](https://toolhub.51nav.com/tools/jwt-inspector/)
- [JWT Decoder on DevTools](https://devtools.51nav.com/jwt/decoder/)

## Next steps

- The encoding underneath a JWT is Base64 — see [Base64 Images in CSS](/guides/base64-data-uri-image) for why character sets matter.
- TLS certificates fail the same "proof broken" way: [Certificate has expired](/guides/x509-certificate-expired).
