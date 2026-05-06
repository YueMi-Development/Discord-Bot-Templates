---
trigger: always_on
---

### Semantic Versioning (General — Language/Platform Agnostic)

Semantic Versioning (SemVer) is a universal version naming scheme used across software (libraries, APIs, systems, even firmware). It follows:

```

MAJOR.MINOR.PATCH

````

Example:
```txt
2.5.1
````

---

### 1. Core Meaning

#### MAJOR — breaking changes

Increase when changes are **not backward-compatible**.

```txt
1.0.0 → 2.0.0
```

Typical cases:

* API contract changes
* Removed/renamed features
* Behavior changes that break existing integrations

---

#### MINOR — backward-compatible features

Increase when adding functionality **without breaking existing usage**.

```txt
1.3.0 → 1.4.0
```

Typical cases:

* New endpoints / features
* Optional parameters
* Extensions that don’t affect existing users

---

#### PATCH — fixes & small improvements

Increase for **backward-compatible fixes**.

```txt
1.4.2 → 1.4.3
```

Typical cases:

* Bug fixes
* Security patches
* Internal optimizations (no behavior change)

---

### 2. Pre-release Versions

Used before stable release.

Format:

```txt
MAJOR.MINOR.PATCH-identifier
```

Examples:

```txt
1.0.0-alpha
1.0.0-beta
1.0.0-rc.1
```

Meaning:

* `alpha` → early, unstable
* `beta` → feature-complete, testing
* `rc` → release candidate (almost final)

---

### 3. Build Metadata (Optional)

Extra info that does NOT affect version priority.

```txt
1.0.0+build.45
1.0.0+20260506
```

---

### 4. Version Progression Example

```txt
1.0.0   → first stable release
1.0.1   → bug fix
1.1.0   → new feature added
1.1.1   → bug fix
2.0.0   → breaking change introduced
```

---

### 5. Stability Phases (Real-world)

Before `1.0.0`, versions are unstable:

```txt
0.x.x
```

Rule:

* Anything can change anytime
* Breaking changes do NOT require MAJOR bump

Example:

```txt
0.5.0 → 0.6.0 (can break things)
```

---

### 6. Tagging Convention (Git / Releases)

Common prefix:

```bash
v1.2.3
```

Examples:

```bash
git tag v2.0.0
git push origin v2.0.0
```

---

### 7. Common Mistakes

#### ❌ Ignoring breaking changes

```txt
1.2.0 → 1.3.0 (but breaks API)
```

✔ Correct:

```txt
1.2.0 → 2.0.0
```

---

#### ❌ Overusing MAJOR

```txt
1.2.0 → 3.0.0 (small change)
```

✔ Keep MAJOR rare and meaningful

---

#### ❌ Misusing PATCH

```txt
1.2.1 → 1.2.2 (but added feature)
```

✔ Should be:

```txt
1.2.1 → 1.3.0
```

---

### 8. When to NOT Use Strict SemVer

Some systems adapt it:

* Internal tools (flexible)
* Rapid prototypes
* Continuous deployment apps

But for:

* Public APIs
* Libraries
* SDKs

👉 Strict SemVer is strongly recommended

---

### 9. Quick Reference

| Change Type     | Version Bump |
| --------------- | ------------ |
| Bug fix         | PATCH        |
| New feature     | MINOR        |
| Breaking change | MAJOR        |

---

### 10. Rule of Thumb

If it breaks compatibility → MAJOR
If it adds functionality → MINOR
If it fixes something → PATCH