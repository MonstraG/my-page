---
{
    "title": "Covariance and contravariance",
    "slug": "covariance-contravariance",
    "date": "2023-11-30"
}
---

You can do:

```csharp
Animal animal = new Cat();
```

but you cannot do:

```csharp
List<Animal> animals = new List<Cat>();
```

Why?

The problem is, that if this would be allowed, then this could happen:

```csharp
List<Animal> animals = new List<Cat>();
animals.Add(new Dog());
```

By going through the intermediary `animals` list, we just put a `Dog` in the `Cat`s list.

And we could make the `Dog` meow:

```csharp
List<Cat> cats = new List<Cat>();
List<Animal> animals = cats; // the only problematic line
animals.Add(new Dog());

foreach (var cat in cats)
{
    cat.Meow();
}
```

For this reason, even though `Cat` inherits `Animal` and can be assigned, `T<Cat>` is not assignable to `T<Animal>`.

But for some cases, it would be really nice, I want to feed all of my pets (two cats and a dog):

```csharp
List<Cat> cats = new List<Cat> { new Cat(), new Cat() };
List<Dog> dogs = new List<Dog> { new Dog() };
List<Animal> pets = cats + dogs;

foreach (var pet in pets)
{
    pet.Eat();
}
```

Here, I'm not hiding the dog among cats, I just want them together, no matter who they are.
I would give up my ability to write to this list later, just to feed my pets!

Turns out, you can give it up, and feed everyone:

```csharp
List<Cat> cats = new List<Cat> { new Cat(), new Cat() };
List<Dog> dogs = new List<Dog> { new Dog() };
IEnumerable<Animal> pets = cats.Concat<Animal>(dogs); // works!

foreach (var pet in pets)
{
    pet.Eat();
}
```

Here, I replaced `pets` list with `IEnumerable`, which is a kind of sequence you cannot write to.
`.Concat` creates a new sequence, and in the definition of IEnumerable you can see:

```csharp
public interface IEnumerable<out T> { }
```

That `out` in `<out T>` means that you can only take `T`'s `out`, and cannot put anything `in` to break the list.

That's what covariance is.

Contravariance is the same, except it says `<in T>`, so you can put stuff in, but not take it out.
