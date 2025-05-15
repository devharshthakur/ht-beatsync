# 💻 Contributing to BeatSync

Hey there! Thanks for checking out this project. This is my personal learning project where I'm implementing the original [BeatSync](https://github.com/freeman-jiang/beatsync) project. While I'm working on this independently, I'd love your help and contributions if you're interested!

## 🚀 Getting Started

1. 🍴 Fork the repository
2. 📋 Clone your fork: `git clone https://github.com/devharshthakur/ht-beatsync.git`
3. 📦 Install dependencies: `pnpm install`
4. 🏃‍♂️ Run the dev server: `pnpm dev`

## 🤝 How to Contribute

### 🎯 Contribution Flow

```
Fork → Branch from dev → Code → PR → Review → Merge to dev → (Maintainer) → main
```

### 📝 Step-by-Step Guide

#### 1️⃣ Fork & Setup 🔱
> First steps to get started

- 🍴 Fork the repository
- ⬇️ Clone your fork locally
- 🔄 Add upstream remote: `git remote add upstream https://github.com/devharshthakur/ht-beatsync.git`
- 📦 Install dependencies: `pnpm install`

#### 2️⃣ Create Your Branch 🌿
> Always branch from dev!

```bash
git checkout dev
git pull upstream dev
git checkout -b your-branch-name
```

**Branch Naming Convention:** 
| Type | Format | Example |
|------|--------|---------|
| 🆕 Feature | `feature/<what-you're-adding>` | `feature/login-page` |
| 🐛 Fix | `fix/<what-you're-fixing>` | `fix/button-alignment` |
| 📚 Documentation | `docs/<what-you're-documenting>` | `docs/api-usage` |

#### 3️⃣ Development 👨‍💻
> Keep it clean, keep it working

- ✨ Make your changes
- 🧪 Test locally: `pnpm dev`
- 🎨 Follow code style guidelines
- 📝 Update docs if needed

#### 4️⃣ Commit Your Changes 💾
> Clear, focused commits

```bash
git add .
git commit -m "✨ feat: add awesome feature"
```

**Commit Types:**
| Emoji | Type | Description |
|-------|------|-------------|
| ✨ | feat | New feature |
| 🐛 | fix | Bug fix |
| 📚 | docs | Documentation |
| 🎨 | style | Formatting |
| ♻️ | refactor | Code restructure |
| 🧪 | test | Add tests |

Keep main commit messages clear and if changes are extensive, add specifics in the commit description.

**Example of a good commit message:**
```
Add user authentication and profile management

- Implement login form with validation
- Create user registration component
- Add password reset functionality
- Update user profile settings page
- Integrate authentication with backend API
- Implement role-based access control

Resolves #124 #125
```

#### 5️⃣ Submit PR 🚀
> Target the dev branch!

- 📤 Push your changes: `git push origin your-branch-name`
- 🔍 Create PR to `dev` branch only
- 📝 Fill out the PR template thoroughly
- 🖼️ Add screenshots for UI changes
- 📋 Link related issues with `Fixes #123`

#### 6️⃣ Review Process 👀
> Collaboration makes perfect

- 💬 Respond to reviews promptly
- ✅ Pass all checks
- 🔄 Update your PR if needed
- 👍 Get approval from maintainers

#### 7️⃣ After Merge 🎉
> What happens next?

- 🔄 Your code merges to `dev`
- 🧪 Further testing with other features
- ⭐ Maintainer handles main branch updates
- 🎯 Delete your branch when done

### 🧠 Branch Strategy

This project follows a structured branch workflow:

- 🌱 **dev**: Development branch - all contributions go here first
- 🌲 **main**: Production branch - managed by the project maintainer only

> 💡 **Important**: The maintainer will personally manage merges from `dev` to `main` when code is stable and ready for production.

### 🎭 Pro Tips

> 💡 **Stay Updated**
```bash
git checkout dev
git pull upstream dev
```

> 🔍 **Before PR**
- 🧹 Clean up commits with `git rebase -i`
- 🧪 Test everything thoroughly
- 📖 Update documentation if needed
- ✅ Check PR template is complete

> 🚫 **Common Mistakes to Avoid**
- ❌ Branching from main (branch from dev instead)
- ❌ Missing documentation
- ❌ Large, unfocused PRs
- ❌ No testing

## 🎨 Code Standards

> Clean code always looks like it was written by someone who cares.

### 📝 TypeScript Guidelines

- 🔍 Use proper TypeScript types (avoid `any` when possible)
- 🧩 Follow existing patterns in the codebase
- 📚 Maintain type safety throughout the project
- ⚠️ Only use `any` when absolutely necessary, with comments explaining why

### 📚 Documentation & Comments

This project emphasizes professional JSDoc comments:

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

- 📖 **Improved Readability**: Self-documenting code
- 🔍 **IDE Integration**: Intellisense and hover information
- 🧪 **Type Checking**: Works with TypeScript
- 📊 **Documentation Generation**: Auto-generate docs
- 🧠 **Knowledge Transfer**: Helps new contributors

### 📏 Cursor Rules (Optional)

The `.rules` directory contains MDC format files to help maintain code consistency when using the Cursor editor:

- 🔒 **typescript.mdc**: TypeScript patterns and type safety
- 📖 **documentation.mdc**: Documentation standards
- 🏗️ **code-organization.mdc**: Project structure

> 💡 These are guidelines, not strict requirements, but help maintain consistency.

## 🗺️ Project Progress

The [CHANGELOG.md](CHANGELOG.md) file tracks project status:
- ✅ Completed features
- 🔄 Current focus areas
- 📝 Planned work

When contributing:
- Review this file to understand current priorities
- Update it to reflect your changes
- Add new features to the appropriate section

## ❓ Questions?

Need help? Feel free to:
- 🐞 Open an issue
- 📧 Reach out directly through GitHub
- 📝 Use appropriate issue templates (Bug Report, Feature Request, Documentation)

---

**Thanks for considering contributing to this project!** 👏
