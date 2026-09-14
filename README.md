# ⚡ Aplikante

> **Enterprise-Grade Job Application Tracker & Career Pipeline Command Center**

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start%20%26%20Router-FF4154?style=flat-square&logo=tanstack&logoColor=white)](https://tanstack.com/start)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Django](https://img.shields.io/badge/Django-6.1-092E20?style=flat-square&logo=django&logoColor=white)](https://www.djangoproject.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![IBM Carbon Design](https://img.shields.io/badge/IBM_Carbon-v11_Tokens-0F62FE?style=flat-square&logo=ibm&logoColor=white)](https://carbondesignsystem.com)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1_AA_Compliant-24A148?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📌 Executive Summary

Modern software engineers and tech professionals navigate complex, high-velocity job searches involving dozens of applications, multiple tailored resume variants, asynchronous assessments, take-home reviews, multi-stage virtual onsite loops, and competing offer deadlines.

Traditional tools fall short:
- **Spreadsheets** are clumsy, lack automated follow-ups, and don't integrate with calendars or resume files.
- **Consumer job trackers** are often bloated, slow, round-cornered toys with poor data density, missing edge states, and lack developer-centric workflows.

**Aplikante** is built differently. It is an **industrial, keyboard-first, high-density career command center** designed with **IBM Carbon Design System v11** tokens, zero-radius tactile ergonomics, strict **Vertical Slice Architecture (VSA)**, and high-performance server-side rendering powered by **TanStack Start**, **Vite**, and **Django REST Framework**.

---

## ✨ Key Features

### 1. 📊 Enterprise Job Data Grid & Pipeline Analytics
- **High-Density Tabular Engine**: Optimized for fast visual scanning with multi-level row density controls (`Compact`, `Normal`, `Tall`).
- **Interactive Stage Funnel**: Real-time visual pipeline showing stage progression from `Applied` → `Screening` → `Interview` → `Offer Received` with conversion rate calculations.
- **Multi-Column Sorting & Filtering**: Filter by company, priority (`High`, `Medium`, `Low`), status, or search query with keyboard focus.
- **Bulk Operations**: Batch select multiple records to update lifecycle status, delete entries, or export tabular data directly to CSV.

### 2. 📅 Interview Schedule & Deadlines Calendar
- **Full Month Interactive View**: Month-by-month grid with synchronized indicators for technical phone screens, architecture loops, and offer expiry dates.
- **Conference Link Access**: One-click launch for scheduled Google Meet, Zoom, Webex, and AWS Chime video conferences.
- **Panel & Interviewer Profiles**: Pre-interview dossiers recording interviewers, topics (e.g. distributed systems, canvas rendering), and preparation notes.

### 3. 📄 Tailored Resumes Repository & ATS Match Scoring
- **Version Management**: Maintain dedicated resume versions tailored for specific roles (e.g., *Senior Full Stack Engineer*, *Lead Frontend Architect*, *Systems & Python Specialist*).
- **ATS Keyword Match Score**: Quantitative match scoring ($0\text{--}100\%$) indicating keyword compatibility with target company reqs.
- **Linked Application Tracking**: Live counter showing exactly which job submissions were submitted with each document variant.
- **Drag-and-Drop Uploader**: Fast drag-and-drop interface for uploading `.pdf` and `.docx` resumes.

### 4. 🔔 Smart Actionable Reminders Center
- **Automated Follow-up Dispatch**: When a new job application is logged, Aplikante automatically schedules a 7-day follow-up reminder.
- **Priority Tiers**: Color-coded urgency alerts (`CRITICAL`, `WARNING`, `INFO`).
- **One-Click Snooze & Mark Done**: Postpone follow-up tasks by $+2$, $+5$, or $+7$ days, or mark completed with instant visual state feedback.
- **Side Panel & Dedicated Page**: Accessible via the persistent global header notification bell or the `/reminders` route.

### 5. ⚡ Django REST API Live Inspector
- **Interactive Developer Workbench**: Live documentation embedded right inside the web client at `/django-api`.
- **Endpoint Catalog & Curl Bench**: Pre-configured `curl` snippets with API authorization token headers.
- **Model Schema Viewer**: Transparent inspection of the underlying Django ORM Python models and JSON field structures.

### 6. ⌨️ Keyboard-First Ergonomics
- <kbd>/</kbd> : Instantly focus global search bar from anywhere.
- <kbd>Q</kbd> : Open the slide-out **Quick Track Application** drawer.
- <kbd>Esc</kbd> : Close active drawers, modals, or menus.

---

## 🎨 Design Philosophy: IBM Carbon v11 Compliance

Aplikante adheres strictly to the **IBM Carbon Design System (v11)** aesthetic and accessibility requirements:

```
┌────────────────────────────────────────────────────────┐
│  ZERO-RADIUS ARCHITECTURE                              │
│  border-radius: 0 across all buttons, inputs, tags     │
├────────────────────────────────────────────────────────┤
│  IBM PLEX TYPOGRAPHY                                   │
│  IBM Plex Sans for UI  •  IBM Plex Mono for Metrics   │
├────────────────────────────────────────────────────────┤
│  5-STATE ANTI-SLOP QUALITY GATE                        │
│  Initial  •  Loading  •  Empty  •  Error  •  Filled    │
├────────────────────────────────────────────────────────┤
│  ACCESSIBILITY STANDARD                                │
│  WCAG 2.1 AA certified contrast ratio (>= 4.5:1)       │
└────────────────────────────────────────────────────────┘
```

- **Color Tokens**:
  - Primary Interactive: `#0f62fe` (Carbon Blue 60)
  - Dark Surfaces: `#161616` (Gray 100), `#262626` (Gray 90), `#393939` (Gray 80)
  - Light Surfaces: `#f4f4f4` (Gray 10), `#ffffff` (White)
  - Semantic Status: `#24a148` (Offer / Success), `#b28600` (Interview / Warning), `#8a3ffc` (Screening), `#da1e28` (Rejected / Critical)

---

## 🏗️ Architecture & Technology Stack

```
                                  APLIKANTE ARCHITECTURE
                           
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                           WEB CLIENT (VSA Deep Modules)                         │
  │                                                                                 │
  │   Routes:  / (Dashboard)  │  /calendar  │  /resumes  │  /reminders  │ /django-api │
  │                                                                                 │
  │   Providers:  ToastProvider ➔ ResumesProvider ➔ RemindersProvider                │
  │                             ➔ ApplicationsProvider ➔ CalendarProvider            │
  │                                                                                 │
  │   Slices:                                                                       │
  │   • features/applications/ (DataGrid, QuickTrack, DetailModal, CarbonTag)       │
  │   • features/resumes/      (ResumeManager, DropZone, UploadModal, Cards)        │
  │   • features/reminders/    (NotificationCenter, RemindersView, Form)            │
  │   • features/calendar/     (CalendarView, MonthGrid, EventModal)                │
  │   • features/analytics/    (CarbonCharts, Funnel, Velocity, Health)             │
  │   • features/django-api/   (DjangoApiInspector)                                 │
  └──────────────────────────────────────┬──────────────────────────────────────────┘
                                         │  HTTP / REST API (JSON)
                                         ▼
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                           SERVER (Django REST API)                              │
  │                                                                                 │
  │   • Django 6.1+ / Python 3.12+                                                  │
  │   • Django REST Framework ViewSets & Serializers                                │
  │   • Models: JobApplication, ResumeDocument, SmartReminder, CalendarEvent        │
  │   • SQLite (Development) / PostgreSQL (Production)                              │
  └─────────────────────────────────────────────────────────────────────────────────┘
```

### Core Technologies

| Technology | Purpose | Documentation |
| :--- | :--- | :--- |
| **[TanStack Start](https://tanstack.com/start)** | Full-stack React SSR & Client hydration framework | [Docs](https://tanstack.com/start/latest/docs) |
| **[TanStack Router](https://tanstack.com/router)** | 100% type-safe, file-based routing | [Docs](https://tanstack.com/router/latest/docs) |
| **[React 19](https://react.dev)** | Modern declarative UI component library | [Docs](https://react.dev) |
| **[Vite 8](https://vitejs.dev)** | Next-generation frontend build tool | [Docs](https://vitejs.dev/guide/) |
| **[Tailwind CSS v4](https://tailwindcss.com)** | High-performance atomic CSS engine | [Docs](https://tailwindcss.com/docs) |
| **[IBM Carbon v11](https://carbondesignsystem.com)** | Open-source enterprise design system | [Docs](https://carbondesignsystem.com/guidelines/color/overview/) |
| **[Lucide Icons](https://lucide.dev)** | Crisp, consistent SVG icons | [Docs](https://lucide.dev/icons/) |
| **[Django 6.1](https://www.djangoproject.com)** | High-level Python web framework | [Docs](https://docs.djangoproject.com/) |
| **[Django REST Framework](https://www.django-rest-framework.org)** | Flexible, powerful REST API toolkit | [Docs](https://www.django-rest-framework.org/) |
| **[Nitro](https://nitro.unjs.io)** | Universal server engine powering SSR builds | [Docs](https://nitro.unjs.io) |

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: `v22.x` or higher
- **npm**: `v10.x` or higher (or `pnpm` / `yarn`)
- **Python**: `3.12+` or `3.14+`

---

### 1. Frontend Setup (`web/`)

```bash
# Navigate to the frontend directory
cd web

# Install dependencies
npm install

# Run the development server (with route watching & Hot Module Reload)
npm run dev

# Open your browser
# Client will be running at http://localhost:3000 (or displayed port)
```

#### Production Build & Verification:
```bash
# Type check strict TypeScript (verbatimModuleSyntax)
npx tsc --noEmit

# Regenerate TanStack routes
npm run generate-routes

# Build production bundle (Client + SSR + Nitro Server)
npm run build

# Preview production build locally
npx vite preview
```

---

### 2. Backend Setup (`server/`)

```bash
# Navigate to the server directory
cd server

# Activate the Python virtual environment
source .venv/bin/activate
# (Windows: .venv\Scripts\activate)

# Install Python requirements
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver 8000

# Django REST API will be running at http://127.0.0.1:8000/
# Django Admin portal: http://127.0.0.1:8000/admin/
```

---

## 🗺️ Product Roadmap

Aplikante is being actively developed in phased milestones:

```
[Phase 1] VSA Core & Carbon UI    [Phase 2] DRF & DB Sync        [Phase 3] AI Resume Matcher
            (DONE)                      (IN PROGRESS)                     (UPCOMING)
  ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
  │ • VSA Deep Modules      │     │ • Django REST Models    │     │ • ATS Resume Keyword AI │
  │ • Carbon v11 Interface  │ ──► │ • Token Authentication  │ ──► │ • Real-time PDF Parser  │
  │ • TanStack Start SSR    │     │ • SQLite & Postgres DB  │     │ • Cover Letter Gen      │
  │ • Keyboard Navigation   │     │ • Live API Inspector    │     │ • Skill Gap Analysis    │
  └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                                               │
                                                                               ▼
  ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
  │ • Full Mobile Native UI │     │ • Equity & RSUs Model   │     │ • Google / Outlook Sync │
  │ • Webhook Ingestion     │ ◄── │ • Comp Negotiation Sim │ ◄── │ • Auto Interview Linker │
  │ • Community Templates   │     │ • Offer Benchmarking    │     │ • Gmail Thread Parser   │
  └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
  [Phase 6] Ecosystem & Apps      [Phase 5] Offer Modeling        [Phase 4] Calendar & Mail
```

### Phase 1: VSA Core & Carbon Interface ✅ *(Completed)*
- [x] Initial migration from pure React prototype to TanStack Start & Router file-based routing.
- [x] Complete Vertical Slice Architecture refactor with deep modules (`applications`, `resumes`, `reminders`, `calendar`, `analytics`, `django-api`).
- [x] Full IBM Carbon Design System v11 tokens, zero-radius reset, dense scrollbars, and Google IBM Plex typography.
- [x] SSR-safe local storage adapters with fallback state initialization.
- [x] WCAG 2.1 AA keyboard shortcuts (<kbd>/</kbd>, <kbd>Q</kbd>, <kbd>Esc</kbd>).

### Phase 2: Django REST Framework & Database Persistence 🔄 *(In Progress)*
- [ ] Implement Django domain apps for `applications`, `resumes`, `reminders`, and `calendar`.
- [ ] Configure Django REST Framework ViewSets and nested JSON serializers.
- [ ] Connect TanStack Start client fetchers to Django REST backend endpoints via TanStack Query.
- [ ] JWT and Token authentication for multi-user support.

### Phase 3: AI Resume Tailoring & ATS Keyword Engine 🎯 *(Upcoming)*
- [ ] Automated PDF/DOCX text parsing and keyword extraction.
- [ ] Job description analyzer to compute semantic match scores against target resumes.
- [ ] Tailored summary and bullet-point optimization recommendations.

### Phase 4: Bi-directional Email & Calendar Sync 🎯 *(Planned)*
- [ ] OAuth integration with Google Calendar and Outlook to automatically schedule interview rounds.
- [ ] Inbound webhook parser for recruiter status update emails.

### Phase 5: Offer Compensation & Negotiation Simulator 🎯 *(Planned)*
- [ ] Compensation modeling tool calculating Base Salary, Annual Bonus, and Equity (RSU/Option) 4-year vesting schedules.
- [ ] Counter-offer comparison calculator with cost-of-living index adjustments.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Context | Action |
| :---: | :--- | :--- |
| <kbd>/</kbd> | Global | Focus the search input in the header / toolbar |
| <kbd>Q</kbd> or <kbd>q</kbd> | Global | Open the Quick Track Application drawer |
| <kbd>Esc</kbd> | Global | Dismiss any open modal, drawer, or dialog |
| <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> | Modals & Grid | Standard accessible keyboard focus navigation |

---

## 🤝 Contributing

Contributions, feedback, and architectural discussions are welcome!
1. Check the [AGENTS.md](AGENTS.md) file for design standards and directory conventions.
2. Fork the repository and create a feature branch (`git checkout -b feature/amazing-feature`).
3. Ensure strict TypeScript types pass (`npx tsc --noEmit` in `web/`).
4. Commit your changes with conventional commit messages (`feat: add resume keyword highlight`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
