---
{
    "title": "Math.random and the highest number",
    "slug": "math-random",
    "date": "2025-06-17",
    "categories": ["Programming"]    
}
---

> `Math.random()` returns a floating-point, pseudo-random number in the range [0, 1) that is, from 0 (inclusive) up to but not including 1 (exclusive), which you can then scale to your desired range.

Says the entire internet. Is that actually true? Most likely. But how close does it go to 1?

Before actually thinking about it seriously, I just printed a bunch of `Math.random()`s:

```
>>> Math.random()
0.729915328944463
>>> Math.random()
0.03224859577769057
>>> Math.random()
0.8620920081096829
>>> Math.random()
0.7134743894246364
>>> Math.random()
0.13529371358407993
>>> Math.random()
0.5222580429369429
>>> Math.random()
0.6894964150128524
```

picked one of the longest, and counted the amount of digits

```
>>> "13529371358407993".length
17
```

Okay, so the max must be `0.99999999999999999` (17 nines), so I type it out in the console:

```
>>> 0.99999999999999999
1
```

What?

```
>>> 0.99999999999999999 === 1
true
```

...

But ain't supposed to return 1!

Turns out, `0.99999999999999998`, `0.99..97`, `0.99..96` and `0.99999999999999995` all actually equal to `1`.

If you don't believe me, go press `F12` and paste `0.99999999999999995` in the console!

The first number that is actually smaller is `0.99999999999999994`, that one is equal to `0.9999999999999999` (one nine less).

After that I went around googling and searching and found this stack overflow question: [What is the max value that Math.random can produce?](https://stackoverflow.com/questions/64052337/what-is-the-max-value-that-math-random-can-produce)

So in short, the max is all 53 significant bytes are 1 and mantissa is -1, which is the same as `Math.pow(2, -53)` (which is `1.1102230246251565e-16` btw), and subtracting it from 1 gives us the 16-nines number again:

```
>>> 1 - Math.pow(2, -53)
0.9999999999999999
```

So, takeaways I guess:

1. The maximum number `Math.random` can return is `0.9999999999999999`, and that is less than 1.
2. Some other numbers it returns could have more significant digits (sometimes 17, and I think I've seen 18), but the actual max number will have only 16 nines.

Huh. Today I learned.
