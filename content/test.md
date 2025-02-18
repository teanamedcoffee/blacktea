---
title: Example Title
draft: false
tags:
  - example-tag
---
 
The rest of your content lives here. You can use **Markdown** here :) **Understanding `--sref` in Midjourney**

### **What is `--sref`?**

Think of `--sref` as a tool that lets you apply style references to an image, similar to telling an AI to mimic a certain artistic style. Each number used in `--sref` represents a specific Style Reference ID stored within Midjourney.

---

### **Breakdown of an Example Command:**

```plaintext
--sref 653845861 1152456500 565858048 3378444519 1566182061 3537068100 1722650334 3664696729 236306076 3534786018::2 1500906155 3105375033 1122341361 683116229 --profile ueeo8az tlsfsfo em7wa59::4 --sw 500 --stylize 1000
```

#### **1. `--sref 653845861 1152456500 ... 683116229`**

- `--sref` applies **Style References** from various IDs.
- The numbers (`653845861`, `1152456500`, etc.) represent **Style Reference IDs** Midjourney recognizes.
- `3534786018::2` means that this particular style reference is given **twice as much weight** compared to the others.

💡 **Analogy:** If styles are ingredients in a dish, `--sref` lets you pick multiple ingredients, and `::2` means you’re using twice as much of one.

---

#### **2. `--profile ueeo8az tlsfsfo em7wa59::4`**

- `--profile` loads **custom user-saved style settings**.
- These profiles (`ueeo8az`, `tlsfsfo`, `em7wa59`) may store:
    - Preferred aesthetic choices
    - Color schemes
    - Image rendering methods
- `::4` means the profile `em7wa59` has **4 times more influence** than the others.

💡 **Analogy:** If `--sref` is picking ingredients, `--profile` is like using a pre-made spice mix.

---

#### **3. `--sw 500`**

- `--sw` (Style Weight) controls **how strongly the style references influence the final image**.
- **Higher values (e.g., 700-1000)** = More strict to the styles.
- **Lower values (e.g., 100-300)** = Allows more creative freedom.
- `500` is a moderate balance.

💡 **Analogy:** This is like deciding how strictly to follow a recipe. `500` means you follow it fairly closely but still allow some adjustments.

---

#### **4. `--stylize 1000`**

- `--stylize` controls **how artistic or abstract the final image is**.
- **Lower values (e.g., 100-500)** = More realistic.
- **Higher values (e.g., 800-1000)** = More stylized and expressive.
- `1000` makes the image highly creative and artistic.

💡 **Analogy:** This is like deciding how fancy the plating and decorations should be in a dish.

---

### **Final Summary**

| Parameter        | Function                                                                         |
| ---------------- | -------------------------------------------------------------------------------- |
| `--sref`         | Selects style references by ID, with `::2` boosting weight for a particular one. |
| `--profile`      | Uses custom saved user profiles for pre-set styles and color schemes.            |
| `--sw 500`       | Controls how strongly the style references impact the image.                     |
| `--stylize 1000` | Determines how creative and artistic the final image looks.                      |
|                  |                                                                                  |
