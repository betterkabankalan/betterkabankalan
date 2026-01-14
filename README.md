# BetterKabankalan

**BetterKabankalan** is a community-driven, open-source web portal designed to improve access to public information, services, and transparency-related resources for Kabankalan City.

The project aims to make government-related information easier to find, understand, and access — **anytime, anywhere** — using modern, low-cost, and open technologies.

---

## ⚠️ Important Disclaimer (Please Read)

> **This website is NOT an official government website.**
>
> BetterKabankalan is an **independent, community-led initiative**.  
> It is **not affiliated with, maintained by, or officially endorsed by** the City Government of Kabankalan or any government agency.
>
> All information published on this site is gathered from publicly available sources and community contributions.  
> Users are encouraged to verify critical or time-sensitive information directly with official government offices.

---

## 🌱 Project Principles

- **Transparency-first** — sources and update dates should be visible whenever possible
- **Accessibility** — usable on low-end devices and slow networks
- **Open data** — prefer structured formats (JSON, CSV) over PDFs
- **Community collaboration** — open to contributors of all skill levels
- **Low-cost & sustainable** — free/open-source tools and hosting-first mindset

---

## 🧱 Tech Stack

- **Frontend:** Vite + React + TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** lucide-react
- **Routing:** react-router-dom
- **Hosting:** Vercel
- **Package Manager:** npm

---

## 🚀 Getting Started (Local Development Setup)

### 1) Clone the repository

```bash
git clone https://github.com/betterkabankalan/betterkabankalan.git
cd betterkabankalan
```

### 2) Install Dependencies
```bash
npm install
```

### 3) Start Devleopment Server
```bash
npm run dev
```

### 4) Open
```bash
http://localhost:5173
```

## 🧱 Project Structure

```bash
src/
├─ components/      # Reusable UI components (Header, Hero, Preloader, etc.)
├─ pages/           # Route-based pages (Home, Services, Transparency, etc.)
├─ assets/          # Images, logos, static assets
├─ data/            # JSON / CSV content (services, directories, datasets)
├─ index.css        # Tailwind entry point + custom styles
└─ main.tsx         # Application entry point
```
