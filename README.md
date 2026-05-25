# Welcome to Chaosware

Welcome to the first repo, [is-it-a-bug-or-a-feature](https://github.com/cybersighzero/is-it-a-bug-or-a-feature) in the **Chaosware** series, filled with absurdity, ridiculousness, and surprisingly fun little dev projects.  
Each repo in this series is designed to make you go:

> "Who TF makes this into a repo? …Anyway, it’s fun."

---

# 404 Feelings Not Found

Emotional HTTP status pages for emotionally unstable developers.

## What it does?
- Dynamic error pages
- Existential damage
- Themed backgrounds
- Absolutely no emotional support

## known codes

| code |
|------|
| 404  |
| 500  |
| 403  |
| 410  |
| 418  |
| 401  |
| 503  |
| 408  |

## usage

type a status code and press enter.

```
> 404
> 500
> 418
```

type `help` to see what else it accepts. there are commands that aren't listed there either.

---

## hidden commands

not telling you all of them. try things. try `love`. try `exit`. try `sudo fix-me`.

some commands only exist because someone needed them to.

---

## extending it

to add a new error code, open `errors.js` and add an entry to `ERRORS`:

```js
'429': {
  num: '429',
  lines: [
    { text: 'too many requests.', cls: 'warn' },
    { text: 'you needed too much.', cls: 'accent' },
  ],
  bg: 'radial-gradient(ellipse at 50% 50%, #100a06 0%, #060608 65%)',
  bgOpacity: 0.5,
  glitch: false,
  caOn: false,
},
```

to add a hidden command, add an entry to `HIDDEN`:

```js
'sudo be okay': [
  'command not found.',
  '',
  "but you might be anyway.",
],
```

use `'__CLEAR__'` as the value to make a command wipe the terminal.

---

## css classes for line styling

| class    | color      | use for             |
|----------|------------|---------------------|
| `dim`    | very dark  | system noise        |
| `muted`  | dark grey  | secondary info      |
| `mid`    | grey       | neutral responses   |
| `bright` | near white | emphasis            |
| `accent` | soft blue  | emotional lines     |
| `warn`   | red        | critical errors     |
| `good`   | green      | absurd/ironic lines |

---

## Why does this exist?
I don’t know.
It just does.

---

## Tech
- HTML
- CSS
- JavaScript

---

## Disclaimer
These errors may be more stable than your mental state.

---

## Created By

**Pratima Narang**  
[@cybersighzero](https://github.com/cybersighzero)

Feedback or ideas? Drop an [issue](https://github.com/cybersighzero/WeakSauce/issues) or submit a pull request!