# Odura - Fine Perfumes

Student: Hassan Ali, Roll 22I-7423, Section CY-6B
Course: CS4032 Web Programming, Assignment 02

## Project Description
Odura is a fictional perfume shop retail website built with React. Customers can browse 12 perfumes, search and filter by category, view product details, add items to a cart, complete a checkout form, and reach a confirmation page. The site demonstrates three frontend improvements identified from reference-site research.

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Test
```bash
npm test
```

## Links
- GitHub: https://github.com/qhassan427/odura-perfume-shop
- Deployment: (to be added after deployment)

## Main Routes
- `/` - Home page
- `/shop` - Browse perfumes with search, filter, sort
- `/product/:id` - Product details page
- `/cart` - Shopping cart with itemised breakdown
- `/checkout` - Checkout form with validation
- `/confirmation` - Order confirmation (simulated)

## Feature Summary
- 12 perfumes across For Him, For Her, Unisex categories
- Search by name and notes, works with gender filter and sort
- Three business rules enforced: max 5 per item, sample needs bottle, free delivery at Rs. 5000
- Delivery fee shown on all pages (not just at checkout)
- Itemised cart breakdown (price x quantity, subtotal, delivery, total)
- localStorage persistence for cart
- Mock async data loader with loading, error, retry states
- Responsive design (390px and 1280px)
- Keyboard accessible with visible focus states

## Edge Cases
- Empty search/filter results show guidance
- Invalid product ID shows feedback
- Cart restored from localStorage checked against current data
- Simulated loading failure with retry toggle

## Simulated Operations
All orders, payments, and deliveries are simulated. No real payment processing.

## Known Limitations
- Deployment link not yet added
- Full edge-case documentation pending

## Concept Map
| Concept | File | Component/Function |
|---------|------|-------------------|
| Routing | src/App.jsx | Routes, Route, Navigate |
| Product data | src/data/products.js | products array |
| Cart state | src/App.jsx | useState for cart |
| Business rules | src/utils/rules.js | rule functions |