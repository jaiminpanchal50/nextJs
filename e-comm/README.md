# E-Commerce App (Next.js)

A simple e-commerce product listing app built with **Next.js App Router**. This project covers the fundamentals of building a real-world app using Next.js — including data fetching, dynamic routes, reusable components, loading states, and global layouts.

---

## What We Built

### 1. 🛍️ Product Listing Page (`/products`)

This is the main page of the app. When you visit `/products`, it **fetches all products** from the [Fake Store API](https://fakestoreapi.com/products) on the server side (no useEffect needed — Next.js Server Components handle this automatically).

The products are displayed in a **responsive grid layout**:
- 1 column on mobile
- 2 columns on tablets
- 4 columns on desktop

Each product is rendered using the reusable `ProductCard` component.

> **Key concept:** In Next.js App Router, `async` page components can directly `await` data — no need for `useEffect` or `useState`.

---

### 2. 🃏 ProductCard Component (`/components/ProductCard.js`)

A reusable UI component that takes a single `product` object as a prop and displays it as a styled card.

Each card shows:
- 🖼️ **Product Image** — links to the product detail page
- 📝 **Title** — clamped to 2 lines so cards stay uniform in height
- 🏷️ **Category** — shown in small gray text
- 📄 **Description** — clamped to 2 lines
- 💲 **Price** — shown in bold
- ⭐ **Rating** — the average star rating from the API

> **Key concept:** Reusable components make your code cleaner and easier to maintain. Instead of repeating the same HTML 20 times, you pass data as props.

---

### 3. 📄 Product Detail Page (`/products/[id]`)

A **dynamic route** page. The `[id]` in the folder name tells Next.js to capture whatever is in the URL — for example, visiting `/products/3` will pass `id = "3"` to the page.

We use `await params` to read the dynamic segment and can use it to fetch a specific product's details from the API.

> **Key concept:** Dynamic routes in Next.js are created by naming a folder with square brackets like `[id]`. The value from the URL is available via `params`.

---

### 4. 🔗 Navbar (`/components/Navbar.js`)

A global navigation bar added inside the **root layout** (`/app/layout.js`) so it appears on every page automatically.

It includes:
- A brand logo/name that links to the home page
- Navigation links: Home, Products, About, Contact
- A **hamburger icon** for mobile screens (visible on small screens, hidden on medium+)

> **Key concept:** Placing a component in `layout.js` means it renders on every page — perfect for navbars and footers.

---

### 5. ⏳ Loading Skeleton (`/products/loading.js`)

A **skeleton screen** shown automatically by Next.js while the products page is fetching data from the API.

It renders 8 placeholder cards with a **pulse animation** (via Tailwind's `animate-pulse`) that mimics the shape of a real product card — giving users a visual hint that content is loading instead of a blank screen.

> **Key concept:** In Next.js App Router, any `loading.js` file in a route folder is automatically displayed as the fallback UI while the page is loading. No manual state management needed.

---

### 6. ⚙️ Axios Setup (`/lib/api.js`)

We installed **Axios** (`npm i axios`) and created a pre-configured Axios instance with:
- A `baseURL` so you don't repeat the full URL on every request
- `withCredentials: true` for sending cookies with requests (useful for auth later)

> **Key concept:** Creating a shared Axios instance in a `lib/` folder keeps your API config in one place, making it easy to update later.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | Framework & routing |
| React | Building UI components |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client for API calls |
| Fake Store API | Mock product data source |

---

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout (Navbar lives here)
│   ├── products/
│   │   ├── page.js        # Product listing page
│   │   ├── loading.js     # Skeleton loading UI
│   │   └── [id]/
│   │       └── page.js    # Product detail page (dynamic route)
├── components/
│   ├── Navbar.js          # Global navigation bar
│   └── ProductCard.js     # Reusable product card
└── lib/
    └── api.js             # Axios instance
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and navigate to `/products` to see the app in action.
