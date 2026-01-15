# BetterKabankalan 🏛️

**BetterKabankalan** is a community-driven, open-source web portal designed to improve access to public information, services, and transparency-related resources for Kabankalan City.

The project aims to make government-related information easier to find, understand, and access — **anytime, anywhere** — using modern, low-cost, and open technologies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ⚠️ Important Disclaimer

> **This website is NOT an official government website.**
>
> BetterKabankalan is an **independent, community-led initiative**.  
> It is **not affiliated with, maintained by, or officially endorsed by** the City Government of Kabankalan or any government agency.
>
> All information is gathered from publicly available sources. Users should verify critical information with official government offices.

---

## 🚀 Quick Start - No .env Needed!

This project works immediately after cloning. No API keys, no configuration!

```bash
# 1. Clone
git clone https://github.com/betterkabankalan/betterkabankalan.git
cd betterkabankalan

# 2. Install
npm install

# 3. Run
npm run dev

# 4. Open http://localhost:5173
```

**That's it!** 🎉 Start contributing immediately.

---

## ✨ Features

- 🏛️ **Government Services** - Requirements, locations, contacts
- 📍 **32 Barangays** - Complete directory
- 🚨 **Emergency Hotlines** - Quick access
- 📊 **Transparency** - Budget & project tracking
- 🌤️ **Live Weather** - Real-time for Kabankalan
- 📱 **Mobile-First** - Works on all devices
- ⚡ **Fast** - Optimized for slow networks

---

## 🤝 Contributing

**Everyone is welcome!** No coding required for many contributions.

### Non-Coding Contributions

- ✏️ Update phone numbers, addresses, office hours
- 📝 Add missing services or barangays
- 🐛 Report bugs or data errors
- 📚 Improve documentation

### Developer Contributions

- 🔧 Fix bugs
- ✨ Add features
- 🎨 Improve UI/UX
- ♿ Accessibility improvements

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guide.

---

## 📁 Project Structure

```
src/
├── components/      # React components
├── data/           # JSON data (easy to edit!)
│   ├── services.json
│   ├── barangays.json
│   └── emergency.json
├── hooks/          # Custom React hooks
├── utils/          # Utility functions (50+)
├── types/          # TypeScript types
├── constants/      # Config & constants
└── config/         # App configuration
```

---

## 🎯 Why No .env File?

### All APIs Are Free!

✅ **Open-Meteo Weather** - No key needed  
✅ **Philippine Holidays** - No key needed  
✅ **All data** - Static JSON files

### Just Works™

Contributors can start coding in 30 seconds:

```bash
git clone → npm install → npm run dev
```

No hunting for API keys! 🎉

---

## 🏗️ Tech Stack

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **Dates**: date-fns
- **Hosting**: Vercel

---

## 📊 Data is in JSON

All data lives in `src/data/` as JSON files:

```json
// src/data/services.json
{
  "id": "service-001",
  "title": "Business Permit",
  "requirements": ["Valid ID", "Barangay Clearance"],
  "contact": "(034) 471-2291"
}
```

Easy to edit, even without coding! See [Data Guide](src/data/README.md).

---

## 🏆 Enterprise Architecture

- ✅ Full TypeScript type safety
- ✅ 50+ utility functions
- ✅ Custom React hooks
- ✅ Service layer pattern
- ✅ Error boundaries
- ✅ Loading states
- ✅ Caching

See [Architecture Guide](docs/ARCHITECTURE.md).

---

## 📚 Documentation

- 📖 [Architecture](docs/ARCHITECTURE.md) - Technical deep dive
- 🚀 [Quick Start](docs/QUICK_START.md) - 5-minute guide
- 🔧 [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues
- 🤝 [Contributing](CONTRIBUTING.md) - How to help
- 📊 [Data Guide](src/data/README.md) - Data formats

---

## 🛠️ Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run type-check   # Check TypeScript
npm run lint         # Run linter
```

---

## 🌱 Principles

- **Transparency** - Show sources & dates
- **Accessibility** - Work on old devices
- **Open Data** - JSON/CSV over PDF
- **Community** - All skill levels welcome
- **Sustainable** - Free tools & hosting

---

## 📄 License

MIT License - Free to use, modify, distribute!

---

## 🙏 Acknowledgments

- All contributors 🎉
- Kabankalan community
- Open source tools

---

## 📞 Get Help

- [GitHub Issues](https://github.com/betterkabankalan/betterkabankalan/issues)
- [Discussions](https://github.com/betterkabankalan/betterkabankalan/discussions)
- Read the docs!

---

<div align="center">

**Built with ❤️ for Kabankalan City**

_Making government information accessible_

⭐ **Star this repo if you find it useful!** ⭐

[Report Bug](https://github.com/betterkabankalan/betterkabankalan/issues) · [Request Feature](https://github.com/betterkabankalan/betterkabankalan/issues) · [Contribute](CONTRIBUTING.md)

</div>
