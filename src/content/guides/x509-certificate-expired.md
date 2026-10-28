---
title: "Certificate has expired: Locate the Expiry with X.509 Parsing"
description: "When TLS breaks with 'certificate has expired', you need the notAfter date and the exact cert in the chain. Here is how to parse an X.509 cert and find the culprit."
category: "How-to"
difficulty: "Intermediate"
tags: ["x509", "certificate", "tls", "ssl"]
pubDate: 2026-09-22
faq:
  - question: "Which certificate expired — the leaf or a CA?"
    answer: "Either. A client validates the whole chain, so an expired intermediate or root in the served chain fails just like an expired leaf. Parse each cert in the chain to find the bad one."
  - question: "Can I read a cert without openssl?"
    answer: "Yes. Any X.509 parser shows the subject, issuer, notBefore, and notAfter. The key fields are the validity window (notBefore–notAfter)."
  - question: "Why did it expire with days left on the calendar?"
    answer: "Client and server clocks can differ, or the cert's notAfter is in UTC while you read local time. Compare in UTC and allow a small clock-skew leeway."
---

## What "certificate has expired" means

TLS presents a chain of X.509 certificates: leaf → intermediate(s) → root. The client checks that **every** cert's validity window (`notBefore` … `notAfter`) contains the current time. If any one is past `notAfter`, the handshake fails with an expiry error.

## Parse it with openssl

```bash
openssl x509 -in cert.pem -noout -dates
# notBefore=May  1 00:00:00 2025 GMT
# notAfter =Apr 30 23:59:59 2026 GMT

openssl x509 -in cert.pem -noout -subject -issuer
```

If `notAfter` is in the past, that cert is the problem.

## Common causes

- **Renewal forgotten.** The leaf cert lapsed; renew and redeploy.
- **Wrong cert served.** The server is still pointing at the old file after renewal.
- **Expired intermediate.** Your bundle includes an intermediate that lapsed; update the full chain.
- **Clock skew.** Client or server time is off, making a valid cert look expired (or vice versa).

## Check the chain, not just the leaf

Browsers and libraries validate the entire chain, so an expired intermediate hidden in the bundle breaks everything even when the leaf is fine.

```bash
openssl s_client -connect example.com:443 -showcerts
```

Inspect each printed `BEGIN CERTIFICATE` block for its `notAfter`.

## Parse without the terminal

Paste a certificate and read its validity window, subject, and issuer with the [Certificate Parser on Toolbox](https://toolbox.51nav.com/tools/security/cert-parser/).

### Related tools
- [Certificate Parser on Toolbox](https://toolbox.51nav.com/tools/security/cert-parser/)
- [SSL Certificate Checker on Toolhub](https://toolhub.51nav.com/tools/ssl-checker/)

## Next steps

- Tokens fail the same "proof broken" way — [JWT signature verification failed](/guides/jwt-signature-verification-failed).
- Expiry math uses Unix time — [Unix Timestamp: 10 vs 13 digits](/guides/unix-timestamp-10-vs-13).
