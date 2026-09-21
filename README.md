<div align="center">

# The Daily Basket

**A sleek, responsive grocery & essentials e-commerce web application built for fast, frictionless shopping.**

<br />

<!-- Replace with your actual project demo preview image -->
<img src="front/src/assets/logo.svg" alt="The Daily Basket Preview" width="25%" />

</div>

## 📖 About The Project

**The Daily Basket** is a feature-packed e-commerce web platform tailored for grocery shopping. The goal was to build a real-world store interface combining dynamic filtering, full cart and wishlist persistence, responsive navigation, and smooth user interactions without unnecessary page reloads.

---

## ✨ Key Features

- **Dynamic Catalog & Filtering:** Browse products across multiple grocery departments; filter instantly by category, price range, and search query.
- **Cart Management:** Add, remove, and adjust item quantities with instant recalculations for subtotal, taxes, and shipping.
- **Wishlist & Favorites:** Save items to a persistent wishlist for later review.
- **Persistent State:** Cart items and user preferences remain intact across browser refreshes via localStorage synchronization.
- **Defensive UI & Loading States:** Built-in skeleton placeholders, empty-state illustrations, and error banners for network interruptions.
- **Responsive & Mobile-First:** Designed from the ground up to provide a smooth, native-like experience on phones, tablets, and desktops.

---

## 🛠️ Tech Stack

### Frontend
- **Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) / React Icons
- **State Management:** React Context API & Custom Hooks
- **HTTP Client:** [Axios](https://axios-http.com/) / Fetch API

### Tooling & Deployment
- **Bundler:** Vite
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

---

## 📁 Project Architecture

```plaintext
The-Daily-Basket/
├── public/                 # Static assets, favicon, site manifest
├── src/
│   ├── assets/             # Images, mock data, brand graphics
│   ├── components/         # Reusable UI elements
│   │   ├── common/         # Buttons, Modals, Badges, Loaders
│   │   ├── layout/         # Navbar, Footer, Mobile Drawer
│   │   └── product/        # ProductCard, ProductGrid, Filters
│   ├── context/            # React Context providers (Cart, Wishlist, Auth)
│   ├── hooks/              # Custom reusable React hooks
│   ├── pages/              # Route views (Home, Shop, Cart, Wishlist, ProductDetails)
│   ├── services/           # API integration and client configuration
│   ├── utils/              # Formatting helpers (currency, text truncation)
│   ├── App.jsx             # Main application layout and routes
│   └── main.jsx            # Entry point
├── .env.example            # Sample environment variables
├── .gitignore
├── package.json
└── README.md
```
---

## 🚀 Installation & Setup

Follow these steps to run the application locally on your machine:

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or newer is recommended) along with `npm` or `yarn`.

### 2. Clone the Repository

```bash
git clone [https://github.com/Fady-tamer/The-Daily-Basket.git](https://github.com/Fady-tamer/The-Daily-Basket.git)
cd The-Daily-Basket
```
### 3. Install Dependencies
```
npm i
```
