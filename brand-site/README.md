# Heaven Made - Fashion Brand Website

This is the **Heaven Made** fashion brand e-commerce website.

## Features

- Premium fashion brand landing page
- Product catalog and detail pages
- Shopping cart functionality
- Lookbook and collection previews
- Brand story and atelier sections
- Shopify integration

## Tech Stack

- React 18.3 + TypeScript
- Vite
- Tailwind CSS
- Radix UI + shadcn/ui
- React Router DOM
- Zustand (cart state)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
brand-site/
├── src/
│   ├── components/     # UI components (Hero, Products, Footer, etc.)
│   ├── pages/          # Route pages (Index, ProductDetail, NotFound)
│   ├── stores/         # Zustand stores (cartStore)
│   ├── lib/            # Utilities and Shopify integration
│   └── App.tsx         # Main app with routes
├── public/             # Static assets
└── package.json        # Dependencies
```

## Routes

- `/` - Homepage with hero, products, lookbook
- `/product/:handle` - Product detail page
- `*` - 404 Not Found page
