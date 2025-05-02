# 💻 How to Contribute

Hey there! Thanks for checking out this project. This is my personal learning project where I'm implementing the original [BeatSync](https://github.com/freeman-jiang/beatsync) project. While I'm working on this independently, I'd love your help and contributions if you're interested!

## 🚀 Getting Started

1. 🍴 Fork the repository
2. 📋 Clone your fork: `git clone https://github.com/devharshthakur/ht-beatsync.git`
3. 📦 Install dependencies: `pnpm install`
4. 🏃‍♂️ Run the dev server: `pnpm dev`

## 🤝 How to Contribute

### 🌿 Branching

When contributing, please create a branch with this naming convention:

| Type | Format | Example |
| --- | --- | --- |
| 🆕 Feature | `feature/<what-you're-adding>` | `feature/login-page` |
| 🐛 Fix | `fix/<what-you're-fixing>` | `fix/button-alignment` |
| 📚 Documentation | `docs/<what-you're-documenting>` | `docs/api-usage` |

## 🔀 Git Workflow & Branch Strategy

#### This project follows a structured branch workflow designed for stability and maintainability:

### 📊 Contribution Flow

<table>
  <tr>
    <td width="25%" align="center">
      <img src="https://img.shields.io/badge/Step_1-blue?style=for-the-badge" alt="Step 1" /><br/>
      <b>🍴 Fork from Main</b>
    </td>
    <td width="75%">
      Always fork from the `main` branch to ensure you're working with the most stable version.

      > 💡 **Why?** The `main` branch contains thoroughly tested code that serves as a solid foundation for new features.
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Step_2-blue?style=for-the-badge" alt="Step 2" /><br/>
      <b>📝 Create PR to Dev</b>
    </td>
    <td>
      Submit your pull request targeting the `dev` branch, not `main`.

      > 🔍 **Dev Branch Role:** Integration point for all incoming changes
      > 
      > 🧪 **What Happens:** Initial testing and code review before integration
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Step_3-blue?style=for-the-badge" alt="Step 3" /><br/>
      <b>🧪 Testing in Dev</b>
    </td>
    <td>
      Once merged to `dev`, your changes undergo more thorough testing alongside other features.

      > 🔄 **Dev Environment:** Contains latest features being evaluated
      > 
      > 🛠️ **Possible Actions:** Bug fixes and adjustments before promotion
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Step_4-blue?style=for-the-badge" alt="Step 4" /><br/>
      <b>🚀 Promotion to Main</b>
    </td>
    <td>
      After rigorous testing, changes from `dev` are batched and merged to `main`.

      > ✨ **Main Branch Quality:** Always stable, production-ready code
      > 
      > 📊 **Merge Strategy:** Batched changes with detailed documentation
      > 
      > 🧹 **Result:** Clean history of significant, stable updates
    </td>
  </tr>
</table>

<div align="center">
  <img src="https://img.shields.io/badge/⭐_Benefits-green?style=for-the-badge" alt="Benefits" />
</div>

- 🛡️ **Stability:** Main branch remains reliable and bug-free
- 📈 **Quality:** Thorough testing at multiple stages
- 📚 **Documentation:** Clear history of meaningful changes
- 👥 **Collaboration:** Multiple contributors can work simultaneously

### ✏️ Making Changes

1. Make your changes in small, focused steps (It will help maintain code quality)
2. Add comments to explain tricky/main parts of your code; refer to the codebase to understand the established commenting pattern
3. Try to match the existing code style
4. Use TypeScript properly (avoid `any` when possible); only use if it's intentional and explain this in your pull request details

### 💬 Commit Messages

Keep main commit messages clear and if changes are extensive, add specifics in the commit description.

For example:
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

### 🔀 Pull Requests

When submitting a pull request:
1. 📝 Describe what you did in the PR description
2. 🔗 Mention any issues it addresses (`Fixes #123`)
3. 📸 Include screenshots if you made UI changes
4. 💡 I value your feedback and suggestions as I'm learning too!
5. 🙏 Thank you for taking the time to contribute to this project! Your help is greatly appreciated and helps me learn and improve.

## 🎨 Code Style

> Clean code always looks like it was written by someone who cares.

- 📝 Use TypeScript properly and avoid `any` type when possible
- 💭 Comment your code, especially for complex functions
- 🧩 Follow the existing patterns in the codebase
- ✨ Write clean, readable code

### 📚 Documentation & Comments

This project strongly emphasizes professional JSDoc comments over scattered inline comments:

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

### 📏 Cursor Rules (Optional but Helpful)

I've created a `.rules` directory with MDC format files to help maintain code consistency when using the Cursor editor. These are completely optional, but I've found them helpful for maintaining standards across the codebase.

#### 📚 What's in the Rules?

- 🔒 **typescript.mdc**: My preferred TypeScript patterns and type safety approaches
- 📖 **documentation.mdc**: How I like to document code (JSDoc format, examples, etc.)
- 🏗️ **code-organization.mdc**: The project's file organization and component structure

#### 🛠️ Using These Rules

These rules are primarily meant for the Cursor AI editor, but they're also a helpful reference regardless of your editor:

1. 📝 They're just guidelines - not strict requirements
2. 🔄 I'll improve and update them as the project evolves
3. 🎯 The ultimate goal is consistency - if you find better practices, please suggest updates!

> 💡 Whether you use these rules or not, the most important thing is that your code follows the general standards and patterns used throughout the project. These rules are just one tool to help achieve that consistency.

## 🗺️ Project Progress

The [CHANGELOG.md](CHANGELOG.md) file serves as a living document for tracking project status/current state:
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
- 📧 Reach out directly through GitHub

## 📋 Using Issue Templates

When opening a new issue, please use the appropriate issue template:

- 🐛 **Bug Report**: For reporting bugs or unexpected behavior
- 🚀 **Feature Request**: For suggesting new features or improvements
- 📚 **Documentation**: For suggesting documentation improvements

The templates help ensure you provide all the necessary information to address your issue efficiently.

---

**Thanks for considering contributing to this project!** 👏
