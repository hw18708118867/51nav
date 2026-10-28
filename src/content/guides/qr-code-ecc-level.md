---
title: "QR Code Scanning as Garbage? ECC Level and Encoding Mode"
description: "A QR that scans as nonsense usually comes down to error-correction level, encoding mode, or contrast. Here is what to check before you regenerate."
category: "Explained"
difficulty: "Beginner"
tags: ["qr-code", "encoding", "ecc"]
pubDate: 2026-09-23
faq:
  - question: "What does ECC level do?"
    answer: "Error correction (L/M/Q/H) lets the code survive damage or dirt. Higher levels (Q/H) tolerate more occlusion but hold less data and are denser — which can hurt small prints."
  - question: "Why did my QR scan as the wrong text?"
    answer: "Usually the encoder chose a mode or character set the scanner misread, or the data was truncated. Keep payloads short, use the right mode, and keep quiet zones clear."
  - question: "Does a QR store bytes directly?"
    answer: "It can. Byte mode stores raw bytes (any encoding), while numeric/alphanumeric modes are denser but limited. Mixed or non-UTF-8 bytes need byte mode plus a known text encoding."
---

## A QR is not just "an image of text"

When a QR scans as garbage, the problem is almost never the scanner — it is how the code was generated or printed. Four things decide success.

## 1. Error-correction level (ECC)

| Level | Approx. recovery |
| --- | --- |
| L | ~7% |
| M | ~15% |
| Q | ~25% |
| H | ~30% |

Higher ECC survives scratches and partial cover, but packs the data denser. On a tiny print, **too high** ECC can backfire because the modules get too small to resolve.

## 2. Encoding mode

QR has modes: numeric (digits only, densest), alphanumeric (0-9 A-Z space %*+-./:) , byte (any 8-bit data), and others. Putting text in the wrong mode truncates or misreads it. For arbitrary strings, **byte mode** is safest; for a pure number, numeric mode fits more.

## 3. Contrast and quiet zone

A QR needs dark modules on a light background with a clear **quiet zone** (4 modules of margin) around it. Low contrast, colored backgrounds, or cropping the border makes scanners fail or misread.

## 4. Data size

The more data, the denser the grid. Long URLs push you to a higher version with tinier modules — bad for small screens or print. Shorten the payload (use a short link) before encoding.

## Generate it right

Pick the ECC level and mode, keep the payload short, and preview the matrix with the [QR Code Generator on Toolbox](https://toolbox.51nav.com/tools/converter/qr-generate/).

### Related tools
- [QR Code Generator on Toolbox](https://toolbox.51nav.com/tools/converter/qr-generate/)
- [QR Code Generator on Toolhub](https://toolhub.51nav.com/tools/qr-code/)

## Next steps

- The bytes a QR holds are often UTF-8 first — see [UTF-8 vs GBK](/guides/utf8-vs-gbk-mojibake).
- Binary data gets wrapped in Base64 — [Base64 Images in CSS](/guides/base64-data-uri-image).
