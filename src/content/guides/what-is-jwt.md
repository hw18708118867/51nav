---
title: "What Is a JWT? Understanding JSON Web Tokens"
description: "JWT (JSON Web Token) is a compact, URL-safe way to represent claims between two parties. Learn its structure and where it is used."
category: "Explained"
difficulty: "Beginner"
tags: ["jwt", "auth", "security", "explained"]
pubDate: 2026-09-22
faq:
  - question: "Is a JWT encrypted?"
    answer: "Usually not. Most JWTs are signed (JWS), so the payload is readable but tamper-proof. Encrypted tokens (JWE) exist but are far less common in everyday auth."
  - question: "What is the difference between decoding and verifying a JWT?"
    answer: "Decoding just reads the header and payload; verifying checks the signature with a secret or key. Only verification proves the token is genuine and unaltered."
  - question: "Where should I store a JWT on the client?"
    answer: "Prefer HttpOnly cookies, which resist XSS. localStorage is simpler but exposes the token to any script running on the page."
  - question: "What is the algorithm confusion attack?"
    answer: "A token claims alg: none or a weak algorithm and a careless server honors it. Always pin the expected algorithm in your server code instead of trusting the token's header."
---

## What is a JWT?

A JWT (JSON Web Token) is a compact, URL-safe token that carries a set of claims — statements about a
user or a request — as JSON. It is defined in RFC 7519 and has become the default way to handle
authentication and authorization on the web.

Every time you log in to a typical app and stay logged in as you click around, there is a good chance a
JWT is riding along with each request, telling the server who you are and what you are allowed to do.

## The three parts

A JWT is a single string split into three Base64URL-encoded sections, separated by dots:

```
header.payload.signature
```

- **Header** — usually just the token type and the signing algorithm, e.g. `{"alg":"HS256","typ":"JWT"}`.
- **Payload** — the claims: who the user is, when the token expires, what they are allowed to do.
- **Signature** — a cryptographic proof that the first two parts have not been altered.

You can decode the header and payload with any JWT decoder to read them, because they are just encoded
JSON — not encrypted.

## Example payload

```json
{
  "sub": "1234567890",
  "name": "Ada Lovelace",
  "admin": true,
  "exp": 1900000000
}
```

The `sub` (subject) identifies the user, and `exp` is the moment the token stops being valid.

## Signed vs. encrypted

This confuses a lot of people, so it is worth being precise:

- A **signed** JWT (JWS) guarantees the contents have not been tampered with. Anyone can read it, but
  nobody can change it without breaking the signature.
- An **encrypted** JWT (JWE) also hides the contents. The payload is unreadable without the key.

Most application authentication uses signed tokens. The payload is visible to whoever holds the token,
but it is trusted because the signature proves it came from the issuer.

## Standard claims worth knowing

- `sub` — the subject, normally a user or client ID.
- `exp` — expiry, as a Unix timestamp in seconds. After this, the token is invalid.
- `iat` — issued-at time.
- `iss` — the issuer, i.e. who created the token.
- `aud` — the intended audience, i.e. which service should accept it.
- `nbf` — "not before", a time before which the token is rejected.

## Where JWTs are used

- **Stateless auth** — the server does not need a session store; every request carries its own proof.
- **Single Sign-On (SSO)** — one login hands you a token accepted across several services.
- **Microservices** — passing identity and scopes between internal services without re-authenticating.

## Security notes that actually matter

- **Never put secrets in the payload.** It is readable by anyone who holds the token.
- **Always verify the signature on the server.** Decoding is not verifying; a client can fake a
  payload, and only the server can confirm the signature.
- **Pin the algorithm server-side.** The "alg" confusion attack happens when a server honors
  `alg: none` or switches to a weak algorithm the token claims. Decide the algorithm in your code, not
  in the token.
- **Keep `exp` short** and rotate signing keys on a schedule.
- **Store tokens safely on the client** — HttpOnly cookies beat `localStorage` for resisting XSS.

## How to inspect one

You do not need special tooling to peek at a token's claims. Paste it into a decoder, or decode the
middle section yourself. Just remember that looking inside tells you what the token *says*, not whether
it is *valid* — only signature verification answers that.

## Next steps

- Learn the safe way to look inside tokens in [How to Decode a JWT](/guides/how-to-decode-jwt).
- Understand the encoding underneath in [What Is Base64?](/guides/what-is-base64).
