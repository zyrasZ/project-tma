# TMA Enterprise App

A modern enterprise web application for managing fuel station operations — built with React, TypeScript, TailwindCSS, and PrimeReact.

🔗 **Live Demo:** [https://project-tma.vercel.app](https://project-tma.vercel.app)

---

## Overview

TMA Enterprise App is a role-based management platform designed for fuel station chains. It provides two separate portals:

- **Admin Portal** — manage companies and system-level configuration
- **Staff Portal** — handle day-to-day operations: station overview, station management, and invoice configuration

---

## Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Framework      | React 19 + TypeScript          |
| Build Tool     | Vite                           |
| Styling        | TailwindCSS v3                 |
| UI Library     | PrimeReact v11                 |
| Icons          | Phosphor Icons                 |
| State (server) | TanStack React Query v5        |
| State (global) | Redux Toolkit                  |
| Routing        | React Router DOM v6            |
| Forms          | React Hook Form + Zod          |
| i18n           | i18next (Vietnamese / English) |
| Charts         | ApexCharts                     |

---

## Features

### Admin Portal (`/admin`)

- **Company Management** — view, search, add, edit, and delete companies with server-side pagination and filtering

### Staff Portal (`/staff`)

- **Overview** — dashboard with key metrics and charts for fuel station performance
- **Station Management** — manage station list, view fuel parameters per station
- **Invoice Config** — full CRUD for electronic invoice configurations per station, supporting multiple providers (MISA, VNPT, Viettel, BKAV, MobiFone, VNPAY, Softdreams)

---

## Project Structure

```
src/
├── api/              # API layer (mock implementations, ready to swap to real HTTP)
├── app/              # Router, providers, app config
├── components/       # Shared UI components (Button, DataTable, Modal, Select, etc.)
├── hooks/
│   ├── api/          # React Query custom hooks per domain
│   └── ui/           # Utility hooks (useDebounce, usePagination, useMediaQuery)
├── mocks/            # In-memory mock data
├── pages/
│   ├── Admin/        # Admin-only pages
│   ├── Staff/        # Staff-only pages
│   ├── Landing/
│   ├── Login/
│   └── Dashboard/
├── store/            # Redux store + slices
├── types/            # TypeScript interfaces and types
└── i18n/             # Translation files (en / vi)
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Demo Accounts

All accounts use the same password: **`password123`**

| Role      | Email            | Password      | Access                                        |
| --------- | ---------------- | ------------- | --------------------------------------------- |
| **Admin** | `an@gmail.com`   | `password123` | `/admin` — Company Management                 |
| **Staff** | `binh@gmail.com` | `password123` | `/staff` — Overview, Stations, Invoice Config |
| **Staff** | `dung@gmail.com` | `password123` | `/staff` — Overview, Stations, Invoice Config |

> Authentication is mocked client-side. Any email from the list above with password `password123` will log in successfully.

---

## Route Structure

```
/                          Landing page
/login                     Login page
/admin
  └── /companies           Company Management (Admin only)
/staff
  ├── /overview            Dashboard overview (Staff only)
  ├── /stations            Station list
  │     └── /:id/fuel-params   Fuel parameters detail
  └── /invoices
        └── /config        Invoice configuration
```

---

## Architecture Notes

- **Smart parent / dumb children** — page-level components own all state and logic; child components receive props and fire callbacks only
- **Server state via React Query** — all API data lives in the React Query cache; mutations automatically invalidate and refetch relevant queries
- **Global state via Redux** — only used for authentication (user, token, isAuthenticated)
- **Mock API layer** — `src/api/*.api.ts` files simulate real HTTP calls with in-memory data and artificial delays, making the swap to a real backend straightforward
- **Role-based routing** — `ProtectedRoute` wraps each portal and redirects unauthorized users to `/login`
