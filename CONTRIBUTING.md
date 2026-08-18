# Contributing to BetterKabankalan 🎉

First off, thank you for considering contributing to BetterKabankalan!

This is a **community-driven project**, and we welcome contributions from **everyone** - regardless of your experience level. Whether you're fixing a typo, adding a service, or building a new feature, your contribution matters! ❤️

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
   - [Non-Coding Contributions](#non-coding-contributions)
   - [Developer Contributions](#developer-contributions)
3. [Getting Started](#getting-started)
4. [Contribution Workflow](#contribution-workflow)
5. [Style Guide](#style-guide)
6. [Data Contribution Guide](#data-contribution-guide)
7. [Testing](#testing)
8. [Pull Request Process](#pull-request-process)
9. [Community](#community)

---

## 📜 Code of Conduct

### Our Standards

**Positive behavior includes:**

- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what's best for the community
- ✅ Showing empathy towards others

### Enforcement

Report unacceptable behavior by contacting the project maintainers via GitHub issues or discussions. All complaints will be reviewed and investigated promptly and fairly.

---

## 🤝 How Can I Contribute?

### Non-Coding Contributions

You don't need to be a developer to contribute! Here are ways anyone can help:

#### 1. **Update Service Information** ✏️

- Add missing government services
- Update phone numbers, addresses, office hours
- Correct outdated information
- Add service requirements and fees

**How:** Edit `src/data/services.json` and submit a PR

#### 2. **Report Bugs** 🐛

- Found something not working? Let us know!
- Clear description of the problem
- Steps to reproduce
- Screenshots if possible

**How:** [Create an issue](https://github.com/betterkabankalan/betterkabankalan/issues/new)

#### 3. **Improve Documentation** 📚

- Fix typos and grammar
- Clarify confusing explanations
- Add examples
- Translate content (Hiligaynon, Tagalog)

**How:** Edit markdown files in `/docs` or `README.md`

#### 4. **Add Barangay Information** 📍

- Complete barangay details
- Add contact information
- Update officials list
- Add landmarks and services

**How:** Edit `src/data/barangays.json`

> ⚠️ **Heads up:** `barangays.json` currently holds emergency hotline data, not
> barangay records. The real barangay entries live in `barangays-template.json`
> under a `barangays` key, and nothing imports that file yet. This is a known
> issue, written up in `bugs/01-barangays-json-contains-emergency-data.md`. If
> you want to add barangay information, please
> [open an issue](https://github.com/betterkabankalan/betterkabankalan/issues/new)
> first so we can sort out the file mix-up before your work lands.

#### 5. **Verify Data Accuracy** ✅

- Check if services are still available
- Verify phone numbers and addresses
- Test links and forms
- Confirm office hours

**How:** Create an issue with verification results

#### 6. **Suggest Features** 💡

- Ideas for new features
- Improvements to existing features
- Better ways to present information

**How:** [Create a feature request](https://github.com/betterkabankalan/betterkabankalan/issues/new)

---

### Developer Contributions

If you can code, here are technical contributions we need:

#### 1. **Fix Bugs** 🔧

- Check [open issues](https://github.com/betterkabankalan/betterkabankalan/issues)
- Look for `bug` or `good first issue` labels
- Fix and submit PR

#### 2. **Add Features** ✨

- Implement requested features
- Improve existing functionality
- Add new pages or components

#### 3. **Improve UI/UX** 🎨

- Better layouts and designs
- Responsive design improvements
- Accessibility enhancements
- Animation and transitions

#### 4. **Performance Optimization** ⚡

- Reduce bundle size
- Optimize images
- Improve loading times
- Add caching strategies

#### 5. **Write Tests** 🧪

- Unit tests for utilities
- Component tests
- Integration tests
- E2E tests

#### 6. **Improve Accessibility** ♿

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast improvements

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- **Code editor** (VS Code recommended)
- **GitHub account**

### Initial Setup

1. **Fork the repository**

   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/betterkabankalan.git
   cd betterkabankalan
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### VS Code Setup (Recommended)

**Extensions:**

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

**Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 🔄 Contribution Workflow

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming:**

- `feature/add-emergency-page` - New features
- `fix/header-navigation` - Bug fixes
- `docs/update-readme` - Documentation
- `style/improve-mobile-layout` - Styling
- `refactor/service-component` - Code refactoring

### 2. Make Your Changes

- Write clean, readable code
- Follow the [style guide](#style-guide)
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run type check
npm run type-check

# Run linter
npm run lint

# Test in browser
npm run dev
```

**Manual testing:**

- ✅ Desktop view (1920x1080)
- ✅ Tablet view (768x1024)
- ✅ Mobile view (375x667)
- ✅ All links work
- ✅ Forms submit correctly
- ✅ No console errors

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add emergency hotlines page"
```

**Commit message format:**

```
type(scope): description

[optional body]
[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(services): add category filtering
fix(header): resolve mobile menu not closing
docs(readme): update installation steps
style(footer): improve responsive layout
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Fill out the PR template
4. Submit for review

---

## 📝 Style Guide

### TypeScript/JavaScript

```typescript
// ✅ Good
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-PH");
}

// ❌ Bad
export function formatDate(date) {
  return date.toLocaleDateString("en-PH");
}
```

**Rules:**

- Always use TypeScript types
- Use `const` for constants, `let` for variables
- Prefer arrow functions for callbacks
- Use meaningful variable names
- Add JSDoc comments for exported functions

### React Components

```tsx
// ✅ Good - Functional component with TypeScript
interface ServiceCardProps {
  service: Service;
  onSelect?: (id: string) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-bold">{service.title}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
    </div>
  );
}

// ❌ Bad - No types, inline styles
export function ServiceCard(props) {
  return (
    <div style={{ border: "1px solid gray", padding: "16px" }}>
      <h3>{props.service.title}</h3>
    </div>
  );
}
```

**Rules:**

- Use functional components (no class components)
- Always define prop types
- Use Tailwind classes (no inline styles)
- Export components with named exports
- Keep components under 200 lines

### File Naming

```
✅ Good:
- ServiceCard.tsx (components)
- ServicesPage.tsx (pages)
- useServices.ts (hooks)
- formatters.ts (utilities)

❌ Bad:
- servicecard.tsx
- services_page.tsx
- UseServices.ts
- Formatters.ts
```

### CSS/Tailwind

```tsx
// ✅ Good - Tailwind utilities
<button className="rounded-xl bg-blue-700 px-6 py-3 text-white hover:bg-blue-800">
  Click Me
</button>

// ❌ Bad - Inline styles
<button style={{
  borderRadius: '12px',
  background: '#1d4ed8',
  padding: '12px 24px'
}}>
  Click Me
</button>
```

**Rules:**

- Use Tailwind utility classes
- Follow mobile-first approach
- Group related classes (layout, colors, typography)
- Use consistent spacing scale (4, 6, 8, 12, 16)

---

## 📊 Data Contribution Guide

### Adding a New Service

Edit `src/data/services.json`:

```json
{
  "id": "unique-service-id",
  "title": "Service Name",
  "category": "government",
  "description": "Brief description of the service",
  "requirements": [
    {
      "id": "req-unique-1",
      "name": "Requirement name",
      "description": "Details about this requirement",
      "isMandatory": true,
      "documentType": "id"
    }
  ],
  "fees": [
    {
      "id": "fee-unique-1",
      "name": "Fee name",
      "amount": 100,
      "description": "What this fee covers",
      "isVariable": false
    }
  ],
  "steps": [],
  "location": {
    "id": "loc-office-slug",
    "name": "Office name",
    "address": {
      "street": "Street address",
      "barangay": "Barangay name",
      "city": "Kabankalan",
      "province": "Negros Occidental",
      "zipCode": "6111"
    }
  },
  "contact": {
    "phone": "(034) 471-2291"
  },
  "officeHours": {
    "weekdays": {
      "open": "08:00",
      "close": "17:00"
    },
    "lunchBreak": {
      "open": "12:00",
      "close": "13:00"
    }
  },
  "processingTime": "3-5 working days",
  "isActive": true,
  "tags": ["tag1", "tag2"],
  "relatedServices": [],
  "lastUpdated": "2026-01-19T00:00:00Z",
  "createdAt": "2026-01-19T00:00:00Z",
  "updatedAt": "2026-01-19T00:00:00Z"
}
```

**Field notes:**

- `category` must be one of the five categories already in use: `government`,
  `business`, `education`, `social_services`, `health`. Please reuse an existing
  one instead of inventing a new category, since the filters and dropdowns are
  built from these values.
- `requirements`, `fees`, and `location` each carry their own `id`. Follow the
  existing pattern, for example `req-psa-1`, `fee-psa-1`, `loc-civil-reg`.
- `officeHours` uses 24-hour time, so `08:00` and `17:00`, not `8:00 AM`.
- `steps` is currently an empty array on every service. If you have verified,
  accurate step-by-step instructions, adding them is very welcome.
- `contact` only uses `phone` today. Add `email` only if you have confirmed a
  working address for that office.
- Copy the shape of an existing entry in `services.json` when in doubt. That
  file is the source of truth for the schema.

### Data Quality Guidelines

- ✅ **Accurate**: Verify information is current
- ✅ **Complete**: Fill in all relevant fields
- ✅ **Consistent**: Follow existing format
- ✅ **Clear**: Use plain language
- ✅ **Validated**: Check phone numbers and emails

### Data Sources

Always cite your sources in commit messages:

```
feat(services): add building permit service

Source: Kabankalan City Hall website
Verified: 2025-01-15
Phone verified by calling office
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

**Desktop (Chrome/Firefox/Safari):**

- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms can be submitted
- [ ] Search functionality works
- [ ] Images load
- [ ] No console errors

**Mobile (Chrome/Safari):**

- [ ] Responsive layout works
- [ ] Mobile menu opens/closes
- [ ] Touch targets are large enough
- [ ] No horizontal scroll
- [ ] Forms work on mobile

**Accessibility:**

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Sufficient color contrast
- [ ] Alt text on images

### Running Tests

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
npm run preview
```

---

## 🔀 Pull Request Process

### PR Template

When creating a PR, include:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI improvement
- [ ] Refactoring
- [ ] Data update

## Changes Made

- Added X feature
- Fixed Y bug
- Updated Z documentation

## Screenshots (if applicable)

[Add screenshots]

## Testing

- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] No console errors
- [ ] TypeScript passes
- [ ] Lint passes

## Related Issues

Closes #123
```

### Review Process

1. **Automated Checks**: CI runs automatically
2. **Code Review**: Maintainer reviews within 48 hours
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, maintainer will merge
5. **Deployment**: Auto-deploys to Vercel

### PR Guidelines

- ✅ Keep PRs focused and small
- ✅ One feature/fix per PR
- ✅ Update documentation
- ✅ Add screenshots for UI changes
- ✅ Respond to feedback promptly

---

## 💬 Community

### Getting Help

**For Users:**

- 📧 Use contact form on website
- 💬 [GitHub Discussions](https://github.com/betterkabankalan/betterkabankalan/discussions)

**For Contributors:**

- 💬 [GitHub Discussions](https://github.com/betterkabankalan/betterkabankalan/discussions)
- 🐛 [GitHub Issues](https://github.com/betterkabankalan/betterkabankalan/issues)
- 📖 Check `/docs` folder

### Recognition

Contributors will be:

- ✨ Listed in [Contributors page](https://github.com/betterkabankalan/betterkabankalan/graphs/contributors)
- 🎉 Mentioned in release notes
- ⭐ Credited in README (for significant contributions)

### Communication Guidelines

- Be respectful and constructive
- Use clear, concise language
- Provide context and examples
- Be patient with responses
- Help others when you can

---

## 🎯 First-Time Contributors

### Good First Issues

Look for issues labeled:

- `good first issue` - Easy to fix, perfect for beginners
- `documentation` - Improve docs
- `help wanted` - Need assistance
- `data update` - Update JSON data

### Getting Started Checklist

- [ ] Read this guide
- [ ] Fork the repository
- [ ] Set up development environment
- [ ] Find a `good first issue`
- [ ] Ask questions if stuck
- [ ] Make your first PR!

### Resources for Beginners

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🏆 Contribution Examples

### Example 1: Add a Service

```bash
# 1. Create branch
git checkout -b feature/add-cedula-service

# 2. Edit src/data/services.json
# Add new service entry

# 3. Test
npm run dev

# 4. Commit
git commit -m "feat(services): add community tax certificate (cedula) service"

# 5. Push and create PR
git push origin feature/add-cedula-service
```

### Example 2: Fix a Bug

```bash
# 1. Create branch
git checkout -b fix/mobile-menu-overflow

# 2. Fix the bug in code
# Edit Header.tsx

# 3. Test on mobile
npm run dev

# 4. Commit
git commit -m "fix(header): resolve mobile menu overflow issue"

# 5. Push and create PR
git push origin fix/mobile-menu-overflow
```

### Example 3: Update Documentation

```bash
# 1. Create branch
git checkout -b docs/improve-setup-guide

# 2. Edit README.md or docs/

# 3. Commit
git commit -m "docs(readme): clarify installation steps"

# 4. Push and create PR
git push origin docs/improve-setup-guide
```

---

## 📝 Final Notes

### Questions?

Don't hesitate to ask! We're here to help:

- 💬 [Start a discussion](https://github.com/betterkabankalan/betterkabankalan/discussions)
- 🐛 [Open an issue](https://github.com/betterkabankalan/betterkabankalan/issues)

### Thank You! 🎉

Every contribution, no matter how small, makes a difference. Together, we're making government information more accessible to everyone in Kabankalan City!

**Happy contributing!** ❤️

---

<div align="center">

**Built with ❤️ by the Community**

[🏠 Back to README](README.md) •
[📖 View Docs](docs/) •
[🐛 Report Issue](https://github.com/betterkabankalan/betterkabankalan/issues)

</div>
