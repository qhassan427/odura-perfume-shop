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

Runs the business rule test (max 5 per item) using Node.js built-in test runner.

## Links
- GitHub: https://github.com/qhassan427/odura-perfume-shop
- https://odura-perfume-shop.vercel.app

## Main Routes
- `/` - Home page
- `/shop` - Browse perfumes with search, filter, sort; delivery banner
- `/product/:id` - Product details page with add-to-cart; invalid ID shows feedback
- `/cart` - Shopping cart with itemised breakdown, delivery fee, stock checks
- `/checkout` - Checkout form with validation (name, phone, city, address)
- `/confirmation` - Order confirmation (simulated)

## Feature Summary
- 12 perfumes across For Him, For Her, Unisex categories; sizes 5ml / 30ml / 50ml
- Search by name and notes, works with category filter and sort
- Three business rules enforced:
  1. Max 5 of the same perfume and size per order
  2. A 5ml sample cannot be bought alone (needs a 30ml or 50ml bottle)
  3. Free delivery if subtotal is Rs. 5000 or more, otherwise Rs. 250
- Delivery fee shown on Shop and Product pages, not only at checkout
- Itemised cart breakdown (price x quantity, subtotal, delivery, total)
- localStorage persistence for cart; restored cart validated against current data
- Mock async data loader with loading, error, retry states
- Responsive design (390px and 1280px); keyboard accessible with visible focus states
- Per-perfume bottle colours via SVG illustration

## Edge Cases
- Empty search/filter results show guidance ("No products found")
- Invalid product ID shows feedback ("Product not found")
- Cart restored from localStorage checked against current data; invalid items removed with message
- Simulated loading failure with retry toggle (Nav checkbox)
- Change stock demo control on Shop page for testing availability
- Quantity cannot exceed stock; specific message shown

## Business Rules
Rule 1 (src/utils/rules.js, maxPerItemRule): Max 5 of the same perfume and size per order. Tested in tests/rules.test.js with quantities 3, 5, 6.
Rule 2 (src/utils/rules.js, sampleRule): A 5ml sample cannot be bought alone; cart needs at least one 30ml or 50ml bottle.
Rule 3 (src/utils/rules.js, deliveryRule): Free delivery if subtotal >= Rs. 5000, otherwise Rs. 250.

## Simulated Operations
All orders, payments, and deliveries are simulated. No real payment processing. Cash on delivery in Islamabad and Rawalpindi only.

## Known Limitations
- Deployment link not yet added
- Stock demo control UI does not persist changes to the data file (session-only)

## Concept Map
| Concept | File | Component/Function |
|---------|------|-------------------|
| Routing | src/App.jsx | Routes, Route |
| Product data | src/data/products.js | products array |
| Cart state | src/App.jsx | useState for cart, localStorage sync |
| Business rules | src/utils/rules.js | maxPerItemRule, sampleRule, deliveryRule |
| Async loader | src/utils/loader.js | loadProducts with loading/error/retry |
| Shop page | src/pages/Shop.jsx | Search, filter, sort, delivery banner |
| Product page | src/pages/Product.jsx | Details, add-to-cart, invalid ID |
| Cart page | src/pages/Cart.jsx | Itemised breakdown, restore validation |
| Checkout page | src/pages/Checkout.jsx | Validated form, order summary |
| Confirmation page | src/pages/Confirmation.jsx | Simulated order confirmation |
| Rule test | tests/rules.test.js | node:test, node:assert/strict |