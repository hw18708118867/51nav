---
title: "What Is a QR Code? How Those Squares Work"
description: "A QR code stores data in a grid of black and white modules. Learn how they work, what error correction does, and the security habit every phone owner needs."
category: "Explained"
difficulty: "Beginner"
tags: ["qr", "generators", "explained"]
pubDate: 2026-10-15
faq:
  - question: "What is inside a QR code besides the data?"
    answer: "A lot of structure: three finder squares in the corners, alignment patterns, timing lines, and error-correction bytes. Those extras are why a scanned code still works when a corner is torn or smudged."
  - question: "What does QR error correction do?"
    answer: "It stores redundant data so the code survives damage or partial covering. Higher levels tolerate more loss but make the code denser, so there is a trade-off between toughness and size."
  - question: "Is scanning a QR code safe?"
    answer: "The code itself is just a link. The risk is where it points. Never enter credentials or payment details on a site opened from an unknown QR code, and beware QR phishing ('quishing')."
  - question: "Can a QR code hold more than a URL?"
    answer: "Yes. Plain text, contact cards, Wi-Fi credentials, SMS drafts, and app deep links all have standard QR formats. URLs are just the most common use."
---

## What is a QR code?

A QR code — "Quick Response" code — is a two-dimensional barcode: a grid of black and white squares that a camera can read from any angle. Instead of the stripes on a product label, it is a square matrix that holds more data and reads faster, which is why it took over from older barcodes.

That little square can encode a URL, plain text, a Wi-Fi password, a contact card, or a payment link. Point a phone at it and the software decodes the pattern into something actionable in a fraction of a second.

## How it works, roughly

Underneath the noise, a QR code is just data written in a grid. A few structural pieces make it readable:

- **Finder patterns.** The three big squares in the corners let the scanner lock onto the code's position and orientation, even if the image is tilted or upside down.
- **Alignment pattern.** A smaller square that helps correct distortion on larger codes.
- **Timing patterns.** The alternating black/white lines that set the grid's rhythm.
- **Data and error-correction modules.** The actual payload plus redundant bytes.

The data is encoded in a binary format with Reed–Solomon error correction. That last part is the clever bit: it lets the code survive being printed badly, photographed in low light, or partially covered by a logo.

## Error correction levels

QR codes come in four error-correction levels, labeled L, M, Q, H:

- **L** — recovers about 7% of damaged data. Smallest, densest code.
- **M** — about 15%. The usual default.
- **Q** — about 25%.
- **H** — about 30%. Most robust, but the code gets visually busier.

The trade-off is straightforward: more correction means the code survives more abuse, but it also means more modules and a harder-to-scan pattern if the printing is poor. For a poster that might get a sticker slapped on it, go higher. For a clean screen display, M is fine.

## What you can put in one

A QR code is not limited to URLs:

- **URL** — the classic "scan to visit."
- **Plain text** — a message, a note, a code.
- **Wi-Fi credentials** — guests scan and join without typing the password.
- **Contact / vCard** — save a person's details in one tap.
- **SMS or email drafts** — prefilled so the recipient just hits send.
- **App deep links** — open a specific screen in an app.
- **Payment info** — common in parts of Asia for instant transfers.

Make your own with a [QR Code Generator](https://toolhub.51nav.com/tools/qr-code/). There is a [QR generator on Toolbox](https://toolbox.51nav.com/tools/converter/qr-generate/) and a [QR decoder](https://toolbox.51nav.com/tools/converter/qr-decode/) if you need to read a code back from an image. If you are building a code into a design, keep the contrast high and the quiet zone (the empty margin) intact — a code jammed against other artwork often fails to scan.

## Static vs. dynamic QR codes

- **Static** codes embed the data directly. What you see is what it points to, forever. Simple and free, but you cannot change the destination later.
- **Dynamic** codes point to a short redirect URL that you control. That lets you swap the target after printing and track scans — at the cost of depending on the redirect service staying up.

For most personal and small-business uses, static is enough. Reach for dynamic only when you expect to change the link or measure scans.

## The one security habit to build

A QR code is, fundamentally, a link that hides its destination until you scan it. That makes it a phishing vector: a sticker over a menu QR, a poster swapped in a public place, an email with a "scan to verify" code. The defense is boring but effective:

- Do not enter passwords, card numbers, or OTPs on a page opened from an unknown QR code.
- Be suspicious of codes that claim urgency ("scan now to secure your account").
- Prefer scanning codes from sources you trust, and check the URL before submitting anything.

This "quishing" trend is exactly why the convenience of QR codes needs a little skepticism attached.

## Common mistakes when making codes

- **Too much data.** A URL is fine; a whole paragraph makes a dense, fragile code. Keep payloads short.
- **Low contrast.** Light-gray on white might look tasteful but scanners hate it. Black modules on a white background is the safe choice.
- **No quiet zone.** Cropping the empty margin around the code breaks finder detection. Leave breathing room.
- **Tiny print.** Below a certain size, phone cameras cannot resolve the modules. Test at the actual print size.

## When not to use one

If the user is already on a screen, just show the link or button — making them scan a code on the same device they are holding is a pointless detour. QR codes earn their keep when the handoff is physical: a poster, a product, a business card, a storefront window.

## Next steps

- Generate a clean, scannable code with the [QR Code Generator](https://toolhub.51nav.com/tools/qr-code/).
- Decode a code from an image with the [QR decoder on Toolbox](https://toolbox.51nav.com/tools/converter/qr-decode/).
- Pair it with a short, memorable handle using the [Slug Generator](https://toolhub.51nav.com/tools/slug-generator/).
