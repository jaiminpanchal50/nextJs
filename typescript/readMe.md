# TypeScript Notes

---

## What is TypeScript?

- TypeScript is a **superset of JavaScript** — meaning every valid JS code is also valid TS code.
- It adds **optional static typing** to JavaScript.
- Developed and maintained by **Microsoft**.
- TypeScript **never runs directly** in the browser or Node. It must first be **transpiled** (converted) into JavaScript.

---

## Transpile vs Compile

| Term | Meaning |
|------|---------|
| **Compile** | Converting high-level language to machine code (e.g., C to binary) |
| **Transpile** | Converting one high-level language to another (e.g., TypeScript to JavaScript) |

> TypeScript is **transpiled** into JavaScript, not compiled to machine code.

---

## Runtime vs Compile Time

| | JavaScript | TypeScript |
|--|--|--|
| **Type checking happens at** | Runtime (when browser/Node runs the code) | Compile time (before execution) |
| **Errors caught** | Only when code actually runs | Before running — saves time and catches bugs early |

**Example — JS catches error only at runtime:**
```js
let a = 10;
console.log(a.toUpperCase()); // Error only shows when code runs in browser
```

**Example — TS catches error at compile time:**
```ts
let a: number = 10;
console.log(a.toUpperCase()); // TS gives error BEFORE running
```

---

## JS vs TS — Type System

- **JavaScript** is a **dynamically typed** language — type of variable is checked at **runtime**
- **TypeScript** is a **statically typed** language — type of variable is checked at **compile time**

---

## Advantages of TypeScript

- Catches errors **before** running the code (at compile time)
- Code is more **readable and maintainable**
- Better **IDE support** (autocomplete, IntelliSense)
- Better **code quality** and **refactoring** support
- Makes large codebases easier to manage

---

## How to Setup TypeScript in a Node Project

```bash
npm i typescript --save-dev        # TypeScript compiler (only needed in dev, not production)
npm i @types/node --save-dev       # Node.js compatible type definitions
npm i tsx --save-dev               # Modern TS runner (replaces ts-node, supports TS 5+/7+)
```

> WARNING: `ts-node` is broken with TypeScript 5+ / 7+. Use `tsx` instead.

---

## Initialize TypeScript Config

```bash
npx tsc --init
```

This creates a `tsconfig.json` file — used to configure how TypeScript compiles your project (target JS version, strict mode, output folder, etc.)

---

## Run TypeScript Files

```bash
# Compile TS to JS manually
npx tsc filename.ts

# Run directly with tsx (recommended)
npx tsx filename.ts

# Run with nodemon (auto-restart on file change)
npx nodemon --exec tsx index.ts

# Or use the dev script from package.json
npm run dev
```

---

## TypeScript Types

### Primitive Types

```ts
let a: number = 10
let b: string = "hello"
let c: boolean = true

// a = "jk"  Error — can't assign string to number
```

---

### Arrays

```ts
let arr: number[] = [1, 2, 3]

arr.push(4)     // OK
arr.push("sd")  // Error — "sd" is not a number
```

- `number[]` means an array that can **only** contain numbers.
- You can also write it as `Array<number>`.

---

### Tuples

```ts
let newArr: [string, string] = ["jk", "jk"]
// newArr.push(1)  // Error — can't push a number into a string-string tuple
```

- A **tuple** is a fixed-length array where each position has a specific type.
- `[string, string]` means exactly 2 strings — defined at declaration.

**Difference from Array:**
| Array | Tuple |
|-------|-------|
| Can grow in size | Fixed structure |
| Holds one type | Each position can have a different type |
| `number[]` | `[string, number]` |

---

### Objects

```ts
let obj: { name: string, age: number } = { name: "jk", age: 10 }

obj.age = 25      // OK — number is valid
obj.age = "jk"   // Error — string can't be assigned to number type
```

- You define the **shape** of the object inline using `{ key: type }`.
- For reusable object types, use `interface` or `type` alias.

---

### Enum

```ts
enum Roles {
    admin,      // = 0
    user,       // = 1
    moderator   // = 2
}

let newRole: Roles = Roles.admin
console.log(newRole) // Output: 0
```

- **Enum** is a way to define a set of named constants.
- By default, values start at `0` and auto-increment.
- Makes code more readable — use `Roles.admin` instead of magic numbers.
- You can also assign custom values: `admin = "ADMIN"` (string enum).

---

### `any` | `unknown` | `never`

These three are special TypeScript types — here is the key difference:

#### `any`

```ts
let val: any = 10
val = "jk"    // OK
val = true    // OK
val = []      // OK
val.toUpperCase()  // No TS error — TS trusts you completely
```

- Disables all type checking. You can assign **anything** and call **any method**.
- Avoid using `any` — it defeats the purpose of TypeScript.

#### `unknown`

```ts
let val: unknown = 10
val = "jk"    // OK — can reassign to any type
val = true    // OK

// val.toUpperCase()  // Error — can't call methods without checking type first

if (typeof val === "string") {
    val.toUpperCase()  // OK — type narrowed to string inside this block
}
```

- Like `any`, you can assign anything to `unknown`.
- **But** you cannot perform operations on it without first checking its type (type narrowing).
- Safer alternative to `any`.

#### `never`

```ts
let val: never = 10   // Error — nothing can be assigned to never
```

- `never` represents a value that **never occurs**.
- You **cannot** assign any value to a `never` typed variable — not even `null` or `undefined`.
- Used in functions that **never return** (they throw an error or run forever):

```ts
function throwError(msg: string): never {
    throw new Error(msg)  // This function never returns normally
}
```

#### Summary Table

| Type | Assign anything? | Perform operations? | Use case |
|------|:---:|:---:|---------|
| `any` | Yes | Yes (no checks) | Escape hatch — avoid it |
| `unknown` | Yes | Only after type check | Safe way to handle dynamic values |
| `never` | No | No | Unreachable code / functions that never return |
