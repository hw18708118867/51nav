---
title: "BIP39 Derivation Path m/44'/0'/0': What Each Segment Means"
description: "That slash-separated string decides which address your wallet shows. Here is what m, the apostrophes, purpose, coin type, account, change, and index each control."
category: "Explained"
difficulty: "Intermediate"
tags: ["bip39", "web3", "mnemonic", "crypto"]
pubDate: 2026-10-15
faq:
  - question: "What does the apostrophe (') mean?"
    answer: "An apostrophe marks a hardened derivation. Hardened children cannot be computed from the parent public key alone, so they stay private even if a public key leaks. Non-hardened segments (no apostrophe) can be derived from the public key."
  - question: "Why is coin type 0 Bitcoin and 60 Ethereum?"
    answer: "SLIP-44 assigns each coin a number. 0 is Bitcoin, 60 is Ethereum, 1 is Testnet, 145 is Bitcoin Cash, and so on. The same seed yields completely different addresses per coin type."
  - question: "What is the difference between change 0 and 1?"
    answer: "Per BIP44, branch 0 is for external addresses you share to receive funds; branch 1 is for internal change addresses the wallet creates when making a payment."
---

## Reading the path

A derivation path looks like `m/44'/0'/0'/0/0`. Read it left to right; each segment scopes the keys more narrowly.

```text
m / 44' / 0' / 0' / 0 / 0
│    │     │    │    │   │
│    │     │    │    │   └── address index
│    │     │    │    └────── change (0 = external, 1 = internal)
│    │     │    └─────────── account
│    │     └──────────────── coin type (SLIP-44)
│    └────────────────────── purpose (BIP number)
└─────────────────────────── master (from the seed)
```

## Segment by segment

- **`m`** — the master key derived from your BIP39 seed (which itself comes from the mnemonic + passphrase).
- **`44'`** — *purpose*. The `'` means hardened. `44` signals "use BIP44 structure." Other purposes exist (`49'` for SegWit, `84'` for native SegWit, `32'` for BIP32 ed25519).
- **`0'`** — *coin type* (SLIP-44). `0` = Bitcoin, `60` = Ethereum, `145` = Bitcoin Cash, `1` = Testnet.
- **`0'`** — *account*. Lets you separate funds into accounts (e.g., `0'` personal, `1'` savings) under one seed.
- **`0`** — *change*. `0` = external receiving addresses, `1` = internal change.
- **`0`** — *address index*. The nth address in that branch.

## Why a different path gives a different address

The same seed run through `m/44'/0'/0'/0/0` and `m/44'/60'/0'/0/0` produces **unrelated** keys, because the coin-type segment differs. This is why restoring a wallet on the wrong coin type shows zero balance even though the seed is correct.

## Hardened vs non-hardened, quickly

Hardened (`'`) segments require the private parent to derive the child; a watch-only wallet with only the public key cannot compute them. Non-hardened segments can be derived from the public key, which is what lets hardware wallets show addresses without exposing the seed.

## Generate and inspect

Create a mnemonic and walk the path yourself with the [BIP39 Mnemonic tool on Toolbox](https://toolbox.51nav.com/tools/web3/bip39/).

### Related tools
- [BIP39 Mnemonic on Toolbox](https://toolbox.51nav.com/tools/web3/bip39/)

## Next steps

- Need sortable, collision-resistant IDs instead of keys? See [UUID vs ULID](/guides/uuid-vs-ulid).
- Compare cipher parameters in [SM4 vs AES](/guides/sm4-vs-aes).
