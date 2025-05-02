# 🧹 Project Cleanup Guide

## 📋 Overview

This project utilizes `rimraf` for efficient cleaning of build artifacts and temporary files across our monorepo.

## 🚀 Quick Reference

| Command | Scope | Description |
|---------|-------|-------------|
| `pnpm clean` | All Packages | Remove all build outputs and temporary files |
| `pnpm clean:root` | Root Directory | Clean only the root Turbo cache |

## 🔧 Detailed Cleaning Commands

### Global Cleanup

```bash
# Clean entire monorepo
pnpm clean
```

### Package-Specific Cleaning

<details>
<summary>🌐 Web Package</summary>

```bash
cd apps/web
pnpm clean  # Removes: .next/, .turbo/
```
</details>

<details>
<summary>🖥️ API Package</summary>

```bash
cd apps/api
pnpm clean  # Removes: dist/, .turbo/
```
</details>

<details>
<summary>📦 Shared Package</summary>

```bash
cd packages/shared
pnpm clean  # Removes: dist/, .turbo/
```
</details>

<details>
<summary>🎨 UI Package</summary>

```bash
cd packages/ui
pnpm clean  # Removes: dist/, .turbo/
```
</details>

<details>
<summary>⚙️ Configuration Packages</summary>

```bash
# ESLint Config
cd packages/eslint-config
pnpm clean  # Removes: .turbo/

# TypeScript Config
cd packages/typescript-config
pnpm clean  # Removes: .turbo/
```
</details>

## 🗑️ What Gets Cleaned

### Build Outputs Removed

| Package | Directories Cleaned | Purpose |
|---------|---------------------|---------|
| Web | `.next/`, `.turbo/` | Next.js build cache |
| API | `dist/`, `.turbo/` | NestJS build output |
| Shared | `dist/`, `.turbo/` | Compiled shared packages |
| UI | `dist/`, `.turbo/` | UI component library build |
| ESLint Config | `.turbo/` | Linting configuration cache |
| TypeScript Config | `.turbo/` | TypeScript configuration cache |
| Root | `.turbo/` | Root-level Turbo cache |

## 💡 Best Practices

- [ ] Run `pnpm clean` before major builds
- [ ] Use package-specific cleaning for targeted maintenance
- [ ] Commit all work before running cleanup commands

## ⚠️ Caution

> [!WARNING]
> - Cleaning removes build artifacts and cached files
> - Subsequent builds will require full recompilation
> - Recommended before switching branches or starting new development cycles

## 🔬 Troubleshooting

> [!TIP]
> If you encounter persistent build issues:
> 1. Run a global clean
> 2. Verify package dependencies
> 3. Rebuild from scratch

## 📄 License & Contributions

MIT License. See [LICENSE](LICENSE) for details.

Contributions welcome. Check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Last Updated:** `$(date +'%Y-%m-%d')` 