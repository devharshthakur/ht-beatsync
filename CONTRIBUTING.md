# 💻 Contributing to BeatSync

Hey there! Thanks for checking out this project. This is my personal learning project where I'm porting an existing codebase. While I'm working on this independently, I'd love your help and contributions if you're interested!

## 🚀 Getting Started

1. 🍴 Fork the repository
2. 📋 Clone your fork: `git clone https://github.com/devharshthakur/ht-beatsync.git`
3. 📦 Install dependencies: `pnpm install`
4. 🏃‍♂️ Run the dev server: `pnpm dev`

## 🤝 How to Contribute

### 🌿 Branching

If you'd like to contribute, please create a branch with this naming:
| Type | Format | Example |
|------|--------|---------|
| 🆕 Feature | `feature/<what-you're-adding>` | `feature/login-page` |
| 🐛 Fix | `fix/<what-you're-fixing>` | `fix/button-alignment` |
| 📚 Documentation | `docs/<what-you're-documenting>` | `docs/api-usage` |

### ✏️ Making Changes

1. Make your changes in small, focused steps (It will help you in long run)
2. Add comments to explain tricky/main parts of your code refer the codebase to understand commenting pattern
3. Try to match the existing code style
4. Use TypeScript properly (avoid `any` when possible) , only use if its intentional , explain this in your pull request details

### 💬 Commit Messages

Keep commit messages clear and specific. For example:
```
Add login form validation
Fix navbar overflow on mobile
Update README with setup instructions
```

### 🔀 Pull Requests

When submitting a pull request:
1. 📝 Describe what you did in the PR description
2. 🔗 Mention any issues it addresses (`Fixes #123`)
3. 📸 Include screenshots if you made UI changes
4. 🗺️ Update the [PROGRESS.MD](docs/PROGRESS.MD) file to reflect your changes before creating pull request
5. 💡 I value your feedback and suggestions as I'm learning too!
6. 🙏 Thank you for taking the time to contribute to this project! Your help is greatly appreciated and helps me learn and improve.

## 🎨 Code Style

> Clean code always looks like it was written by someone who cares.

- 📝 Use TypeScript properly and avoid `any` type when possible
- 💭 Comment your code, especially for complex functions
- 🧩 Follow the existing patterns in the codebase
- ✨ Write clean, readable code

### 📚 Documentation & Comments

I strongly prefer professional JSDoc comments over scattered inline comments:

```typescript
/**
 * Calculates the total price including tax
 * 
 * @param {number} price - The base price of the item
 * @param {number} taxRate - The tax rate as a decimal (e.g., 0.07 for 7%)
 * @returns {number} The total price including tax
 * 
 * @example
 * // Returns 107
 * calculateTotal(100, 0.07);
 */
function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
```

#### Benefits of JSDoc:

- 📖 **Improved Readability**: Makes code self-documenting and easier to understand
- 🔍 **IDE Integration**: Provides intellisense and hover information in VSCode and other editors
- 🧪 **Type Checking**: Works with TypeScript to improve type safety
- 📊 **Documentation Generation**: Can be used to automatically generate documentation
- 🧠 **Knowledge Transfer**: Helps new contributors understand the codebase quickly

When adding or modifying functions, please take the time to write proper JSDoc comments for APIs and complex logic.

## 🗺️ Project Progress

The [PROGRESS.MD](docs/PROGRESS.MD) file serves as a living document tracking:
- ✅ Completed features and tasks
- 🔄 Current focus areas
- 📝 Planned future work

**When contributing**:
- Review this file to understand the project's current priorities
- Update it to reflect any changes you've made
- If you're working on a new feature, add it to the appropriate section

Keeping this document up-to-date helps everyone understand the project's evolution and current needs.

## ❓ Questions?

If you have any questions or need help, feel free to:
- 🐞 Open an issue
- 📧 Reach out to me directly

---

**Thanks for considering contributing to my learning project!** 👏
