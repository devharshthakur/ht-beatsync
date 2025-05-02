# 🎵 BeatSync

<div align="center">

![BeatSync Project Screenshot](/assets/project.png)

**A professional Node.js implementation of a music collaboration platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Latest-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-Latest-red)](https://nestjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 📋 About This Project

ht-beatSync is a Node.js port/implementation of [BeatSync](https://github.com/freeman-jiang/beatsync) project created with a focus on a better software architecture, maintainability, and contribution-friendly design. This project implements a robust full-stack application using TypeScript, Next.js, and NestJS.

> 💡 **Note:** This project is designed to run in a localhost environment and is not currently configured for production deployment.

### 🔍 Project Objectives

- 🏛️ **Professional Architecture**: Structured following best practices for maintainability
- ⚙️ **Modern Implementation**: Built with [NestJS](https://nestjs.com/) to leverage robust backend architecture
- 📊 **Code Quality**: Thoroughly documented and professionally commented codebase
- 🔄 **Contribution-Ready**: Designed for easier collaboration and extension

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PNPM 10+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/devharshthakur/ht-beatsync.git
   cd ht-beatsync
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development servers:
   ```bash
   pnpm dev
   ```

This will start both the Next.js frontend and NestJS backend in development mode.

## 🧩 Project Structure

```
ht-beatsync/
├── apps/
│   ├── web/         # Next.js frontend
│   └── api/         # NestJS backend
├── packages/
│   ├── ui/          # Shared UI components
│   ├── shared/      # Shared types and utilities
│   └── eslint-config/ # ESLint configuration
```

## 🛠️ Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, TypeScript
- **Package Management**: PNPM workspaces
- **Development Tools**: ESLint, Prettier, Turbo

## 🤝 Contributing

Contributions are welcome! This project emphasizes maintainability and professional structure. Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

When reporting issues or suggesting new features, please use the provided issue templates to ensure all necessary information is included.

For an up-to-date view of the project's current status, completed work, and planned features, check out the [CHANGELOG.md](CHANGELOG.md) file. This document serves as a roadmap and status tracker for the project.

## 🚨 Deployment Notes

This project is designed to run in a localhost environment. If you wish to deploy it:

- The frontend and backend would need to be deployed separately
- You would need to implement the necessary environment configuration, refactoring of code (backend mostly)
- NestJS deployment would require server hosting (unlike Vercel for Next.js)

Feel free to make the necessary refactoring for deployment if you wish to use this in a production environment.

## 🌟 Project Inspiration

During a late-night exploration of GitHub, I discovered [BeatSync](https://github.com/freeman-jiang/beatsync) – project. 
It was intresting when i saw the codebase, it used bun inbuilt utiliites flawlessly. While reading the server code i thought of nestjs as a better fit, since i code in nodejs like many other not having experience with bun , i thought having a nodejs based implementation with the main goal of a maintainable codebase is neccassary. It also gave an oppurtunity to practice nestjs as i am student myself. I am plannig to add my own tweaks . 

### 🔍 Architectural Considerations (My Personel Opinions)

The implementation approach was guided by several key technical and strategic considerations:

| Aspect | Observation | Motivation |
|--------|-------------|------------|
| **Technology Stack** | Original project used Bun | Explore Node.js for broader accessibility |
| **Backend Framework** | Seeking robust architecture | Leverage NestJS for scalable implementation |
| **Open Source Potential** | Limited maintainability | Create a more extensible, community-friendly version |

### 🚧 Development Priorities

This project represents a nodejs implementation focused on:
- 🏗️ Better architectural patterns
- 🧩 Framework-driven development
- 🔬 Innovative feature implementation
- 📝 Comprehensive documentation

## 🙏 Acknowledgements

### 🤝 Original Inspiration

Big thanks to [Freeman Jiang](https://github.com/freeman-jiang) and the other [BeatSync](https://github.com/freeman-jiang/beatsync) contributors for the original project codebase that inspired this implementation.

## 📝 Important Note

**This project is designed exclusively to run in localhost setup only.**

While it reimagines the original BeatSync concept, please note:
- This is not a production-ready application
- No deployment infrastructure is currently implemented
- The focus is on core functionality in a local development environment

> Contributions and experimentation are welcome, but please maintain the project's current scope.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

