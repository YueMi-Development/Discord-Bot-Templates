---
trigger: always_on
---

### 1. General Rules
- Use meaningful and descriptive names (avoid `x`, `data1`, etc. unless trivial)
- Avoid reserved keywords (`class`, `function`, `return`, etc.)
- Be consistent across the project

---

### 2. Variable Naming (camelCase)
Variables use **camelCase** (first word lowercase, next words capitalized).

```js
let userName = "Neko";
let totalScore = 100;
let isLoggedIn = true;
````

✔ Good:

```js
let playerHealth = 80;
```

✘ Bad:

```js
let ph = 80; // unclear
```

---

### 3. Function Naming (camelCase + verb)

Functions should describe **actions**, so usually start with a verb.

```js
function getUserData() {}
function calculateScore() {}
function sendMessage() {}
```

✔ Good:

```js
function updateInventory() {}
```

✘ Bad:

```js
function inventory() {} // unclear action
```

---

### 4. Constants (UPPER_SNAKE_CASE)

Constants use all caps with underscores.

```js
const MAX_PLAYERS = 100;
const API_URL = "https://api.example.com";
```

---

### 5. Classes (PascalCase)

Classes use **PascalCase** (every word capitalized).

```js
class PlayerCharacter {}
class GameEngine {}
class InventoryManager {}
```

---

### 6. Object Keys

Usually follow camelCase unless matching external API.

```js
const player = {
  userName: "Neko",
  level: 5,
  isOnline: true
};
```

---

### 7. File Naming

Depends on ecosystem, but common styles:

* camelCase → `userService.js`
* kebab-case → `user-service.js` (very common in Node.js projects)

---

### 8. Boolean Variables (is/has/should prefix)

Use prefixes to clarify true/false meaning.

```js
let isActive = true;
let hasPermission = false;
let shouldUpdate = true;
```

---

### 9. Private / Internal Variables (convention)

Not enforced, but often:

```js
let _internalCache = {};
```

Or modern JS (true private fields in classes):

```js
class Example {
  #secretKey = "hidden";
}
```

---

### 10. Avoid These Mistakes

```js
let data = {};        // too generic
let a = 10;           // unclear
function doStuff() {} // meaningless
```

---

### Quick Summary

| Type     | Convention       | Example           |
| -------- | ---------------- | ----------------- |
| Variable | camelCase        | `userName`        |
| Function | camelCase (verb) | `getUserData()`   |
| Constant | UPPER_SNAKE_CASE | `MAX_SIZE`        |
| Class    | PascalCase       | `GameManager`     |
| File     | kebab-case       | `game-manager.js` |

---

### Pro Tip (Real-world)

Consistency > perfection.
Pick a style (usually Airbnb or Google JS style guide) and stick to it across your project.