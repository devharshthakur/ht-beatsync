# 🎵 BeatSync

<div align="center">

![BeatSync Logo](https://placehold.co/600x300?text=BeatSync&font=montserrat)

**A Nodejs port of a music collaboration platform project**

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Latest-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-Latest-red)](https://nestjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 🌟 About This Project

This is a Nodejs port of [BeatSync](https://github.com/freeman-jiang/beatsync) that I'm developing as a personal learning journey. I found the original concept fascinating and decided to use it as a foundation to improve my skills in TypeScript, Next.js, and NestJS.

> 💡 **Note:** This is primarily a learning project, not intended for production use. It's designed to run in a localhost environment.

### ✨ Why I Created This Port

- 📚 **Learning Experience**: To deepen my understanding of TypeScript, websockets and NestJS
- 🧪 **Backend Implementation**: I decided to port server in [NestJS](https://nestjs.com/)
- 📝 **Code Quality**: To practice creating a well-documented and professionally commented codebase
- 🏗️ **Architecture**: To explore better ways to structure this full-stack application

## 📸 Screenshots

<div align="center">
  <img src="https://placehold.co/800x450?text=Homepage&font=montserrat" alt="Homepage" width="80%" />
</div>

<details>
  <summary>📷 More Screenshots</summary>
  <img src="https://placehold.co/800x450?text=Dashboard&font=montserrat" alt="Dashboard" width="80%" />
  <img src="https://placehold.co/800x450?text=Collaboration+Space&font=montserrat" alt="Collaboration Space" width="80%" />
</details>

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

Contributions are welcome! As this is a learning project, I'd love to see how others might improve or extend it. Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

For an up-to-date view of the project's current status, completed work, and planned features, check out the [PROGRESS.MD](docs/PROGRESS.MD) file. This document serves as a roadmap and status tracker for the project.

## 🚨 Deployment Notes

This project is designed to run in a localhost environment. If you wish to deploy it:

- The frontend and backend would need to be deployed separately
- You would need to implement the necessary environment configuration, refactoring of code (backend mostly)
- NestJS deployment would require server hosting (unlike Vercel for Next.js)

Feel free to make the necessary refactoring for deployment if you wish to use this in a production environment.

## 🙏 Acknowledgements

When I first discovered [BeatSync](https://github.com/freeman-jiang/beatsync) by [Freeman Jiang](https://github.com/freeman-jiang), I was immediately captivated by its innovative approach to audio synchronization. The way it achieves millisecond-accurate playback across multiple devices and its spatial audio capabilities really sparked my interest as a developer.

I want to express my sincere gratitude to Freeman and his contributors ([Jack Harrhy](https://github.com/jackharrhy) and [Gorkem Baris Yesiltas](https://github.com/gbyesiltas)) for creating such an inspiring project. Their work (https://beatsync.gg) gave me the perfect opportunity to challenge myself and grow as a developer.

What I found most fascinating about the original BeatSync:
- The technical achievement of synchronizing audio with such precision
- The elegant implementation of spatial audio features
- The clean, intuitive user interface

This port represents my personal learning journey and is not affiliated with the original project in any way. I created it solely for educational purposes as I explore and develop my skills in TypeScript, NestJS, and web audio technologies. The intention was also to create a better well written/documented contribution friendly codebase.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
