# BetterKabankalan 🏛️

**BetterKabankalan** is a community-driven, open-source web portal designed to improve access to public information, services, and transparency-related resources for Kabankalan City.

The project aims to make government-related information easier to find, understand, and access — **anytime, anywhere** — using modern, low-cost, and open technologies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://betterkabankalan.vercel.app)

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

### 🏛️ Government Services

- **Complete Service Directory** - All city services with requirements and fees
- **Category Filtering** - Documents, Business, Health, Infrastructure
- **Service Search** - Find services quickly by name or description
- **Detailed Information** - Requirements, fees, processing time, office hours
- **Quick Access Dropdown** - Navigate to categories from header

### 📍 Barangays

- **32 Barangays Directory** - Complete information for all barangays
- **Search Functionality** - Find your barangay quickly
- **Contact Information** - Direct contact for each barangay

### 🚨 Emergency & Contact

- **Emergency Hotlines** - Quick access to emergency numbers
- **Contact Form** - Send inquiries to City Hall
- **Office Information** - Address, phone, email, office hours
- **Map Integration** - Find City Hall easily

### 📊 Transparency Portal

- **Budget Information** - Annual and quarterly financial reports
- **Ongoing Projects** - Track infrastructure and service projects
- **Project Progress** - Real-time status updates
- **Document Repository** - Download public documents
- **Open Data** - Accessible financial and procurement data

### 🔍 Search & Navigation

- **Global Search** - Search across services, barangays, and hotlines
- **Smart Filtering** - Filter by category, type, or keyword
- **Mobile-First Design** - Optimized for all screen sizes
- **Fast Loading** - Optimized for slow networks

### 📱 Mobile Experience

- **Responsive Design** - Works on phones, tablets, and desktops
- **Touch-Friendly** - Large buttons and easy navigation

---

## 🤝 Contributing

**Everyone is welcome!** No coding required for many contributions.

### Non-Coding Contributions

- ✏️ Update phone numbers, addresses, office hours
- 📝 Add missing services or barangays
- 🐛 Report bugs or data errors
- 📚 Improve documentation
- 🌐 Translate content (Hiligaynon, Tagalog)
- 📊 Add transparency data

### Developer Contributions

- 🔧 Fix bugs
- ✨ Add features
- 🎨 Improve UI/UX
- ♿ Accessibility improvements
- ⚡ Performance optimization
- 🧪 Write tests

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for detailed guide.

---

## 📁 Project Structure

```
betterkabankalan/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation with dropdown
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Layout.tsx       # Page wrapper
│   │   ├── ServiceCard.tsx  # Service display card
│   │   └── ServiceDetail.tsx # Service detail page
│   │
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── ServicesPage.tsx # All services listing
│   │   ├── ContactPage.tsx  # Contact form & info
│   │   ├── TransparencyPage.tsx # Budget & projects
│   │   └── SearchPage.tsx   # Search results
│   │
│   ├── data/               # JSON data (easy to edit!)
│   │   ├── services.json    # Government services
│   │   ├── barangays.json   # Barangay directory
│   │   ├── emergency.json   # Emergency hotlines
│   │   └── announcement.json # News & announcements
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useServices.ts   # Fetch services
│   │   └── useServiceDetail.ts # Fetch service detail
│   │
│   ├── services/           # API services
│   │   ├── api.ts          # API utilities
│   │   └── dataService.ts  # Data fetching logic
│   │
│   ├── utils/              # Utility functions
│   │   └── formatters.ts   # Text & date formatting
│   │
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   │
│   ├── constants/          # Config & constants
│   │   └── index.ts        # App constants
│   │
│   └── config/             # App configuration
│       └── index.ts        # Config settings
│
├── public/
│   └── assets/            # Images & static files
│
├── docs/                  # Documentation
├── CONTRIBUTING.md        # Contribution guide
├── LICENSE               # MIT License
└── README.md            # This file
```

---

## 🎯 Why No .env File?

### All APIs Are Free!

✅ **Open-Meteo Weather** - No key needed  
✅ **Philippine Holidays** - No key needed  
✅ **All data** - Static JSON files  
✅ **No backend required** - Everything runs client-side

### Just Works™

Contributors can start coding in 30 seconds:

```bash
git clone → npm install → npm run dev
```

No hunting for API keys! 🎉  
No complex setup! ⚡  
No barriers to contribution! 🚀

---

## 🏗️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State**: React Hooks (useState, useEffect, useMemo)
- **HTTP**: Fetch API
- **Build**: Vite (Fast HMR)
- **Hosting**: Vercel (Auto-deploy)
- **Version Control**: Git + GitHub


---

### Example: Add a New Service

```json
// src/data/services.json
{
  "id": "business-permit",
  "title": "Business Permit",
  "category": "business",
  "description": "Required for operating a business in Kabankalan City",
  "requirements": [
    { "name": "Valid ID" },
    { "name": "Barangay Clearance" },
    { "name": "DTI Certificate (for sole proprietorship)" }
  ],
  "fees": [{ "name": "Application Fee", "amount": 500 }],
  "processingTime": "3-5 business days",
  "contact": {
    "phone": "(034) 471-2291",
    "email": "business@kabankalan.gov.ph"
  }
}
```

**No coding required!** Just edit the JSON and submit a PR. 🎉

---

## 🛠️ Scripts

```bash
# Development
npm run dev              # Start dev server
npm run dev -- --host    # Expose to network

# Build
npm run build           # Production build
npm run preview         # Preview production build

# Code Quality
npm run type-check      # Check TypeScript
npm run lint            # Run ESLint
npm run format          # Format with Prettier (if configured)

# Deployment
git push                # Auto-deploys to Vercel
```

---

## 🌱 Design Principles

### 1. **Transparency First**

- Show data sources and last updated dates
- Open by default - all code and data are public
- Clear disclaimer about unofficial status

### 2. **Accessibility for All**

- Works on old devices and slow connections
- Mobile-first responsive design
- Clear typography and high contrast
- Keyboard navigable

### 3. **Open Data Over Closed**

- JSON/CSV formats over PDFs
- Downloadable datasets
- Machine-readable information
- API-first thinking (even if static)

### 4. **Community-Driven**

- All skill levels welcome
- No-code contributions encouraged
- Clear contribution guidelines
- Responsive to issues and PRs

### 5. **Sustainable & Free**

- No paid services required
- Free hosting (Vercel, Netlify, GitHub Pages)
- Open source tools only
- Minimal dependencies

---

## 📚 Documentation

- 📖 [Contributing Guide](CONTRIBUTING.md) - How to contribute

---

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

---

## 📄 License

MIT License - Free to use, modify, and distribute!

See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **All Contributors** 🎉 - Thank you for making this better!
- **BetterBacolod and BetterGov** - For inspiration
- **Open Source Community** - For amazing tools and libraries


---

## 📞 Get Help & Support

### For Users

- 🌐 **Visit**: [betterkabankalan.vercel.app](https://betterkabankalan.vercel.app)
- 📧 **Email**: Contact via website form
- 📱 **City Hall**: (034) 471-2291

## 🌟 Star Us!

If you find BetterKabankalan useful, please consider:

- ⭐ **Starring this repository** - Helps others discover the project
- 🔀 **Forking** - Create your own version
- 📢 **Sharing** - Tell others about it
- 🤝 **Contributing** - Make it even better!

---

<div align="center">

**Built with ❤️ for Kabankalan City**

_Making government information accessible to everyone_

### Quick Links

[🏠 Website](https://betterkabankalan.vercel.app) •
[🐛 Report Bug](https://github.com/betterkabankalan/betterkabankalan/issues) •
[✨ Request Feature](https://github.com/betterkabankalan/betterkabankalan/issues) •
[🤝 Contribute](CONTRIBUTING.md)

---

⭐ **Star this repo** if you find it useful!

Made with TypeScript, React, and Tailwind CSS

</div>
