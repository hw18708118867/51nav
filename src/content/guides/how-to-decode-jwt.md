---
title: "How to Decode a JWT (Without Breaking Security)"
description: "Decode the header and payload of a JSON Web Token to inspect its claims — safely and locally."
category: "How-to"
difficulty: "Intermediate"
tags: ["jwt", "decode", "auth", "how-to"]
pubDate: 2026-09-22
faq:
  - question: "Does decoding a JWT verify it?"
    answer: "No. Decoding only reads the header and payload. Verification, which checks the signature against the signing key, must happen on the server."
  - question: "Is it safe to paste a token into an online decoder?"
    answer: "Only if the decoder runs entirely in your browser. For a real session token, use a local or offline decoder so the token never leaves your machine."
  - question: "Why does atob fail on a JWT?"
    answer: "JWTs use Base64URL, which has - and _ instead of + and /. Convert those characters back to standard Base64 before calling atob."
  - question: "What do exp and iat mean?"
    answer: "exp is the expiry time as a Unix timestamp in seconds, and iat is when the token was issued. Both are standard registered claims."
---

## What "decoding" actually means

Decoding a JWT means reading its header and payload, which are just Base64URL-encoded JSON. That is it.
It does **not** verify the signature, and it proves nothing about whether the token is genuine.

Think of decoding as opening an envelope and reading the letter. Verifying is checking the wax seal to
confirm it was not swapped. You do the first one constantly while debugging; the second only happens on
the server, where the signing key lives.

## When decoding is the right tool

You decode a JWT when you want to know what it claims: who the user is, when it expires, which
audience it targets. That is enough to debug a login flow, confirm a token has not expired, or check
that the issuer is who you expect. It is a read-only inspection, and it is completely safe to do on
untrusted input — you are not executing anything.

## Decode in the browser

```js
function decodeJwt(token) {
  const [, payload] = token.split('.');
  const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(b64));
}

console.log(decodeJwt(myToken));
```

The `replace` calls turn Base64URL back into standard Base64, which `atob` understands. Grab the first
segment instead of the second if you want the header.

## Decode from the command line

If you have a token in your clipboard and a terminal open:

```bash
# decode the payload (second segment)
echo "<PAYLOAD>" | tr '_-' '/+' | base64 -d | jq .
```

`tr` converts the Base64URL characters back to standard ones, `base64 -d` decodes, and `jq .`
pretty-prints the JSON so it is readable. Drop the `jq` part if you just want the raw output.

## Decode with a GUI tool

For a one-off look, a [JWT decoder](https://toolhub.51nav.com/tools/jwt-decoder/) in your browser is the fastest path — paste, and the claims appear
instantly. The catch is trust: a decoder may send your token to its own backend unless it runs entirely
in the page. For anything sensitive, such as a real session token, prefer a local or offline decoder so
the token never leaves your machine.

On 51NAV the decoder runs in your browser, so the data you paste is not uploaded anywhere.

## What the claims tell you

After decoding, the fields worth checking:

- `sub` — who the token is about, usually a user ID.
- `exp` — when it expires, in Unix seconds. Compare it to the current time.
- `iss` — who issued it. Confirm it is an issuer you expect.
- `aud` — who it is for. If this is not your service, ignore the token.
- `iat` / `nbf` — when it was issued, and the earliest it is valid.

## A practical debugging workflow

1. Grab the token from your browser's dev tools — Application → Cookies or Local Storage.
2. Decode it and check that `exp` has not passed and `sub` matches the user you expect.
3. Check `iss` and `aud` against your setup.
4. If the data looks right but the server still rejects it, the problem is almost always the
   *signature* or the secret/key, not the payload you are looking at.

## Common pitfalls

- Assuming a decoded token is valid. It is not, until the signature is verified server-side.
- Pasting a production token into a random online decoder.
- Forgetting that `exp` is in seconds, not milliseconds like JavaScript's `Date.now()`.

## Decoding vs. verifying, in one line

Decode to read. Verify to trust. The first is a few lines of code; the second requires the signing key
and must happen on the server. Do not conflate them — a token that decodes beautifully can still be a
forgery.

> Decoding proves nothing about authenticity. Only signature verification does.

## Next steps

- Decode and inspect a token with the [JWT Decoder](https://toolhub.51nav.com/tools/jwt-decoder/). There is also a [JWT tool on DevTools](https://devtools.51nav.com/jwt/decoder/) and a [JWT tool on Toolbox](https://toolbox.51nav.com/tools/security/jwt/).
- Understand the encoding underneath in [What Is Base64?](/guides/what-is-base64).
- Learn what a JWT is in [What Is a JWT?](/guides/what-is-jwt).
