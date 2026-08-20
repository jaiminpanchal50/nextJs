# 🚀 Next.js Learning Project — Cohort 2.0

> A hands-on Next.js app built during **Cohort 2.0** to explore the core concepts of modern full-stack web development with the App Router.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📖 Table of Contents

- [What is Next.js?](#-what-is-nextjs)
- [Why Next.js over React?](#-why-nextjs-over-react)
- [Rendering Modes](#-rendering-modes)
- [Server vs Client Components](#-server-vs-client-components)
- [App Router & Routing](#-app-router--routing)
- [Project Overview](#-project-overview)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Key Concepts Practiced](#-key-concepts-practiced)
- [Getting Started](#-getting-started)
- [Resources](#-resources)

---

## 🤔 What is Next.js?

Next.js is a **React framework** that adds production-grade capabilities on top of React:

```
JavaScript → React → Next.js
```

| Capability | Description |
|---|---|
| **SSR** | Server-Side Rendering — HTML generated per request on the server |
| **SSG** | Static Site Generation — HTML built at compile time |
| **ISR** | Incremental Static Regeneration — static pages that refresh in background |
| **CSR** | Client-Side Rendering — traditional browser-side React rendering |
| **API Routes** | Backend endpoints built inside the same Next.js project |
| **Middleware** | Run logic before a request is completed (auth, redirects, etc.) |
| **File-based Routing** | Folder structure in `src/app/` automatically becomes URL routes |

---

## ⚡ Why Next.js over React?

React (by default) uses **Client-Side Rendering (CSR)**:
- Browser downloads a minimal HTML shell
- JS bundle executes to paint the UI
- **Result:** Slow initial load, poor SEO

Next.js solves these problems:

| Feature | React (CSR) | Next.js |
|---|---|---|
| Initial Load Speed | ❌ Slow | ✅ Fast |
| SEO | ❌ Poor (empty HTML) | ✅ Excellent (pre-rendered HTML) |
| Full-stack Support | ❌ Needs separate backend | ✅ Built-in API routes |
| Routing | ❌ Manual (React Router) | ✅ File-system based |
| Image Optimization | ❌ Manual | ✅ `next/image` built-in |

---

## 🖥️ Rendering Modes

### SSR — Server-Side Rendering
- HTML generated **on every request** on the server
- Best for: personalized pages, real-time data, dashboards

### SSG — Static Site Generation
- HTML generated **once at build time**
- Best for: blogs, documentation, marketing pages

### ISR — Incremental Static Regeneration
- Statically generated but **can re-build in background** after a set interval
- Best of both worlds: fast delivery + fresh data

### CSR — Client-Side Rendering
- Rendering happens **in the browser** via JS
- Needed when you use React hooks (`useState`, `useEffect`, etc.)
- Requires `"use client"` directive at the top of the file

---

## 🧩 Server vs Client Components

Next.js 13+ (App Router) introduced **React Server Components** as the default:

| | Server Component | Client Component |
|---|---|---|
| **Default?** | ✅ Yes | ❌ No — requires `"use client"` |
| **Runs on** | Server | Browser |
| **Data fetching** | ✅ `async/await` directly | Via `useEffect` or SWR/TanStack |
| **React Hooks** | ❌ Not supported | ✅ Fully supported |
| **Bundle impact** | ✅ Zero JS sent to client | Adds JS to client bundle |
| **Async params** | ✅ `await params` directly | ❌ Use `useParams()` hook |

> 💡 **Rule of thumb:** Use Server Components by default. Switch to `"use client"` only when you need interactivity (clicks, state, browser APIs).

---

## 🗂️ App Router & Routing

Next.js uses a **file-system based router**. Every folder inside `src/app/` maps directly to a URL:

```
src/app/
├── page.js            →  /              (Home)
├── layout.js          →  Shared root layout (Navbar, fonts, etc.)
├── globals.css        →  Global styles
├── about/
│   └── page.js        →  /about
└── products/
    ├── page.js        →  /products
    └── [id]/
        └── page.js    →  /products/:id  (Dynamic route)
```

### Routing Rules

- **`page.js`** — The UI for a route. Must be lowercase, always named `page.js`.
- **`layout.js`** — Wraps child pages. Place shared UI (Navbar, Footer) here.
- **`[folder]`** — Square brackets create dynamic route segments (e.g., `[id]`).
- **No third-party router needed** — Next.js routing is built-in.

### Shared Layout (Navbar / Footer)

Edit `src/app/layout.js` to add persistent UI:

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />           {/* Renders on every page */}
      <body>{children}</body>
      <Footer />           {/* Renders on every page */}
    </html>
  );
}
```

### Reusable Components

Components live in `src/component/` (outside `app/`) to **avoid accidental route creation**:

```
src/
└── component/
    ├── Navbar.js
    └── Footer.js
```

Import with the `@/` alias (maps to `src/`):

```js
import Navbar from "@/component/Navbar";
```

---

## 📦 Project Overview

This app was built to practice:
- Setting up a Next.js project with the **App Router**
- Creating **static** and **dynamic** routes
- Using **Server Components** vs **Client Components**
- Building a shared **Navbar** with `next/link`
- Passing and reading **dynamic route params** in async server components

---

## 🗃️ Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── page.js            # Home page (/)
│   │   ├── layout.js          # Root layout — wraps all pages
│   │   ├── globals.css        # Global CSS styles
│   │   ├── about/
│   │   │   └── page.js        # About page (/about) — uses "use client" + useState
│   │   └── products/
│   │       ├── page.js        # Products listing page (/products)
│   │       └── [id]/
│   │           └── page.js    # Dynamic product detail (/products/:id)
│   └── component/
│       └── Navbar.js          # Reusable Navbar (Server Component)
├── public/                    # Static assets (images, fonts, etc.)
├── next.config.mjs            # Next.js configuration
├── postcss.config.mjs         # PostCSS (required for Tailwind CSS v4)
├── jsconfig.json              # Path aliases (@/ → src/)
├── eslint.config.mjs          # ESLint configuration
└── package.json               # Scripts & dependencies
```

---

## 🛣️ Pages & Routes

| Route | File | Type | Notes |
|---|---|---|---|
| `/` | `src/app/page.js` | Server Component | Home page |
| `/about` | `src/app/about/page.js` | Client Component | Uses `useState` — requires `"use client"` |
| `/products` | `src/app/products/page.js` | Server Component | Products listing |
| `/products/:id` | `src/app/products/[id]/page.js` | Server Component (async) | Dynamic route — reads `params.id` |

---

## 🧠 Key Concepts Practiced

### 1. File-based Routing
No need to configure routes manually. The folder structure **is** the routing.

### 2. Dynamic Segments
Wrap a folder name in `[brackets]` → it becomes a URL parameter.

```
products/[id]/page.js  →  /products/any-value-here
```

Access the param in a Server Component using `await params`:

```jsx
// src/app/products/[id]/page.js

const page = async ({ params }) => {
  const { id } = await params; // ✅ await params in Server Components

  return (
    <div>
      <h1>Product — {id}</h1>
    </div>
  );
};

export default page;
```

> ⚠️ In Next.js App Router, `params` is a **Promise** in Server Components — always `await` it.
> Do **not** use the `useParams()` hook here — that's for Client Components only.

### 3. `"use client"` Directive

Add at the very top of any file that needs React hooks or browser APIs:

```js
"use client";
import { useState } from "react";
```

### 4. `async` Server Components

Server components can be `async` functions and directly `await` data — not possible in plain React:

```js
const page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const data = await res.json();
  // render data...
};
```

### 5. `@/` Path Alias

`@/` is a shortcut for the `src/` directory, configured in `jsconfig.json`:

```js
import Navbar from "@/component/Navbar"; // resolves to src/component/Navbar.js
```

### 6. Layout Composition

`layout.js` wraps all its child pages via the `{children}` prop — perfect for Navbar and Footer that should appear on every page.

```jsx
// layout.js
import Navbar from "@/component/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navbar />
      <body>{children}</body>
    </html>
  );
}
```

> ⚠️ Do **not** put reusable components inside the `app/` directory — they will be treated as routes!

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.3.1 | React framework |
| `react` | 19.2.8 | UI library |
| `react-dom` | 19.2.8 | DOM rendering |
| `tailwindcss` | ^4 | Utility-first CSS |
| `eslint` | ^9 | Code linting |
| `geist` | (via next/font) | Typography |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ installed
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd my-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev     # Start dev server with hot-reload (http://localhost:3000)
npm run build   # Build for production
npm run start   # Start production server (run after build)
npm run lint    # Run ESLint checks
```

---

## 📚 Resources

| Resource | Link |
|---|---|
| Next.js Docs | [nextjs.org/docs](https://nextjs.org/docs) |
| App Router Guide | [nextjs.org/docs/app](https://nextjs.org/docs/app) |
| React Docs | [react.dev](https://react.dev) |
| Tailwind CSS v4 | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Next.js Font Optimization | [next/font docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) |

---

> **Built with ❤️ during Cohort 2.0** — a progressive journey from JavaScript → React → Next.js.

---

## 📌 What is Next.js?

Next.js is a **React framework** that enables you to build **full-stack web applications** with features like:

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- File-based & App-based routing
- API routes (backend inside Next.js)
- Middleware support
- Server & Client Components

### Technology Progression

```
JavaScript → ReactJS → Next.js
```

---

## ❓ What Problem Does Next.js Solve?

### The CSR Problem (React default)

React by default uses **Client-Side Rendering (CSR)**:

- The browser downloads a minimal HTML shell
- JavaScript runs in the browser to render the UI
- This is **slow for initial load** and **bad for SEO**

### The Next.js Solution

Next.js adds **Server-Side Rendering (SSR)** and more on top of React:

| Feature | CSR (React) | SSR/SSG (Next.js) |
|--------|-------------|-------------------|
| Initial Load Speed | ❌ Slow | ✅ Fast |
| SEO Friendly | ❌ Poor | ✅ Excellent |
| Full-stack Support | ❌ No | ✅ Yes |
| Routing | Manual (React Router) | ✅ Built-in (file-based) |

---

## 🔑 Why Use Next.js if You Already Have React?

| Reason | Description |
|--------|-------------|
| **SEO** | Server-rendered HTML is indexed better by search engines |
| **SSR** | Pages are pre-rendered on the server per request |
| **SSG** | Pages are pre-built at compile time (blazing fast) |
| **ISR** | Pages are statically generated but can revalidate in background |
| **CSR** | Traditional client-side rendering is still supported |
| **Full-stack** | API routes let you write backend code inside Next.js |

---

## 📂 Rendering Modes Explained

### 🖥️ SSR — Server-Side Rendering
- HTML is generated **on each request** on the server
- Great for dynamic, personalized, or frequently-updated content

### 📄 SSG — Static Site Generation
- HTML is generated **at build time**
- Best for pages that don't change often (blogs, docs)

### 🔄 ISR — Incremental Static Regeneration
- Pages are statically built but can **re-generate in the background**
- Best of both SSG (speed) and SSR (freshness)

### 🌐 CSR — Client-Side Rendering
- Rendering happens **in the browser** via JavaScript
- Used for highly interactive sections (dashboards, etc.)

---

## 🗂️ Routing in Next.js (App Router)

Next.js uses a **file-system based router**. Files inside `src/app/` automatically become routes:

```
src/app/
├── page.js          →  /          (Home page)
├── layout.js        →  Root layout (shared wrapper)
├── globals.css      →  Global styles
└── favicon.ico      →  Browser tab icon
```

### Types of Routing Supported

- ✅ **File-based routing** — folder structure = URL structure
- ✅ **App Router** (Next.js 13+) — uses `layout.js`, `page.js`, `loading.js`, etc.
- ✅ **Dynamic routing** — `[id]/page.js` → `/posts/123`
- ✅ **Protected routing** — via middleware
- ✅ **API routing** — `app/api/route.js` → backend endpoint
- ✅ **Middleware** — runs before a request is completed (auth, redirects)

---

## 🧩 Server vs Client Components

Next.js 13+ introduced **React Server Components**:

| | Server Component | Client Component |
|-|-----------------|------------------|
| Default | ✅ Yes | ❌ No (needs `"use client"`) |
| Runs on | Server | Browser |
| Can fetch data | ✅ Directly | Via API/hooks |
| Can use hooks | ❌ No | ✅ Yes |
| Bundle size impact | ✅ Zero | Adds JS to bundle |

---

## ⚙️ Project Setup — `my-app`

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Tech Stack

| Package | Version |
|---------|---------|
| Next.js | 16.3.1 |
| React | 19.2.8 |
| React DOM | 19.2.8 |
| Tailwind CSS | ^4 |
| ESLint | ^9 |

### Project Structure

```
my-app/
├── src/
│   └── app/
│       ├── page.js        # Home page component
│       ├── layout.js      # Root layout
│       ├── globals.css    # Global CSS styles
│       └── favicon.ico    # App icon
├── public/                # Static assets
├── next.config.mjs        # Next.js configuration
├── postcss.config.mjs     # PostCSS (for Tailwind)
├── jsconfig.json          # JS path aliases
├── eslint.config.mjs      # ESLint configuration
└── package.json           # Dependencies & scripts
```

### Available Scripts

```bash
npm run dev     # Start development server (http://localhost:3000)
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 📚 Resources

- [Next.js Official Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)


## For routing we don't have to add any third party library.next support internally for routing.

## Route page is the the page which is created inside the `src/app/` directory.
## How to create a page in Next.js?
- Create a folder inside the `src/app/` directory.
- which page you want to create name that folder the folder name is the page path/slug 
- Inside the folder, create a file named `page.js` make sure the name is in lowercase and page.js dont use any fency name for this file.
- Write your React component code in `page.js`.
- The folder name will be the route of the page.


## If you want to add header of footer go to the layout.js file and add header content above the {children} and footer content below the {children}

## if you want to create a reusable component then create a component folder inside the src and create folder for each component or create a file for each component.

```
src/
    └── component/
    ├── Navbar.js
    └── Footer.js
```

## and if you import that component in any page then import it like this:

```
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
```

## You can use `@/` to refer to the `src` directory.            

## Don't add component inside the app folder if you add then this will create a new routes.

## By default next js uses server side rendering. so if you want to use useState,useEffect,useContext,useRef etc you have to use client side rendering.

## to use client side rendering in a page add "use client" at the top of the page.

## How to create dynamic page in next js?
- Create a folder inside the `src/app/` directory.
- Name the folder in square brackets like this: `[id]`.
- Inside the folder, create a file named `page.js`.
- Write your React component code in `page.js`.
- The folder name will be the route of the page.

Example:
```
src/app/
└──products
    └── [id]/
        └── page.js
```

## if you want to access the params of the dynamic page then use don't `useParams` hook coz this is the clientside hook.
## Use this way to access the params of the dynamic page:

```
const page = async ({ params }) => {
    const { id } = await params;
    return (
        <div className="text-center py-10">
            <h1>Product {id}</h1>
            <p className="text-orange-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>

    );
};

export default page;
```

## in react we dont pass async in component or page but in next js we can pass async in component or page coz of this is server component so server treat it as a function so we can await the params.