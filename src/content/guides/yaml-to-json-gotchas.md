---
title: "YAML to JSON Gotchas: When Types and Indentation Break"
description: "YAML looks like JSON's friendly cousin until a boolean, a date, or a leading zero gets silently coerced. Here are the conversions that bite people."
category: "How-to"
difficulty: "Intermediate"
tags: ["yaml", "json", "conversion", "data"]
pubDate: 2026-09-21
faq:
  - question: "Why did my 'yes' become true?"
    answer: "YAML 1.1 treats yes/no/on/off as booleans. Unless quoted, they coerce to true/false, which surprises anyone expecting a string."
  - question: "Do JSON and YAML mean the same thing?"
    answer: "They represent similar data, but YAML adds type inference, anchors, and multiline styles that JSON has no equivalent for. A round trip can change types."
  - question: "Is the conversion lossy?"
    answer: "For plain data it is fine. But YAML anchors/aliases, custom tags, and comments do not survive a JSON conversion."
---

## YAML is stricter than it looks

Converting YAML to JSON seems trivial — both are nested key/value structures. The traps appear because YAML *infers types* and JSON does not.

## Gotcha 1: boolean coercion

```yaml
active: yes
enabled: no
debug: on
```

Becomes:

```json
{ "active": true, "enabled": false, "debug": true }
```

If you wanted the strings `"yes"`/`"no"`, quote them. This is the single most common surprise.

## Gotcha 2: numbers

YAML guesses numeric types, and JSON has no integer/float distinction — but the *value* can still shift:

```yaml
zip: 01234      # becomes 1234 (leading zero dropped)
ratio: 1e3      # becomes 1000
hex: 0xFF       # becomes 255
```

Quote anything that must stay exactly as written.

## Gotcha 3: null vs empty

```yaml
note:          # empty value
other: ~       # ~ is null
```

Both become `null` in JSON, losing the distinction between "empty string" and "absent".

## Gotcha 4: indentation

YAML is whitespace-sensitive. One wrong space changes the tree:

```yaml
a:
  b: 1
   c: 2     # misindented -> error or wrong nesting
```

JSON's explicit braces avoid this, but you lose the readability that made you use YAML.

## Gotcha 5: multiline strings

YAML `|` (literal) and `>` (folded) blocks expand into strings with specific newline handling. JSON stores them as one escaped string, so line breaks and trailing newlines can differ from what you expect.

## Gotcha 6: anchors and aliases

```yaml
defaults: &d { retries: 3 }
job:
  <<: *d
```

Anchors (`&d`) and merges (`<<: *d`) have no JSON equivalent and are flattened during conversion — usually what you want, but worth knowing it is not reversible.

## Convert safely

Paste YAML and get JSON (and back) with the [YAML to JSON tool on Toolbox](https://toolbox.51nav.com/tools/data-format/yaml-to-json/).

### Related tools
- [YAML to JSON on Toolbox](https://toolbox.51nav.com/tools/data-format/yaml-to-json/)
- [JSON ↔ YAML on Toolhub](https://toolhub.51nav.com/tools/json-yaml/)
- [JSON to YAML on DevTools](https://devtools.51nav.com/json/json-to-yaml/)

## Next steps

- When the JSON itself will not parse, start with [Unexpected token in JSON](/guides/json-unexpected-token).
- Text bound for a URL is UTF-8 first — see [UTF-8 vs GBK](/guides/utf8-vs-gbk-mojibake).
