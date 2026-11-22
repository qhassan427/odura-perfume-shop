# Frontend Decisions

## Decision 1: Delivery fee shown on Shop and Product pages (Problem 1)

**Problem:** The reference site shows "Shipping: Calculated at checkout", so the total isn't the real total until the final step. Customers may abandon when they see an unexpected fee late.

**Decision:** Show the delivery fee and a "Rs. X more for free delivery" message on the Shop page banner and the Product page details section, alongside the cart subtotal. The total always includes delivery.

**Alternative:** Only show the delivery fee in the cart (like the reference site does), and reveal it at checkout.

**Reason:** Customers on a budget need to know the full cost early, before they invest time browsing. Showing it on the Shop and Product pages prevents surprise at checkout and supports the business goal of completed orders.

**Tradeoff:** Adds a banner to two more pages, slightly increasing visual clutter. Requires keeping the cart subtotal in sync across pages via shared state.

**Code location:** src/pages/Shop.jsx (delivery banner), src/pages/Product.jsx (delivery banner), src/utils/rules.js (deliveryRule function)

**Evidence:** Shop page banner shows "Free delivery. Cart subtotal: Rs. 0" when empty; Product page shows the same banner above the details grid.

---

## Decision 2: Per-size prices on cards and itemised cart breakdown (Problem 2)

**Problem:** The reference site's pack cards show no individual prices and the pack price doesn't visibly add up, so customers can't verify the total.

**Decision:** Every Shop card lists all sizes with prices (e.g. "5ml Rs. 200 · 30ml Rs. 900 · 50ml Rs. 1400"). The cart shows an itemised breakdown: price x quantity per line, subtotal, delivery fee, and total.

**Alternative:** Show only the starting price on cards, and a single total in the cart without line-item detail.

**Reason:** Transparent pricing builds trust and lets customers compare options across sizes. The itemised cart makes the math visible at every step, directly supporting the business goal of completed purchases.

**Tradeoff:** Cards are taller with more text; cart takes more vertical space. Requires computing line totals from cart state.

**Code location:** src/components/ProductCard.jsx (sizeList), src/pages/Cart.jsx (itemised lines, subtotal, delivery, total)

**Evidence:** Shop card shows "5ml Rs. 300 · 30ml Rs. 1500 · 50ml Rs. 2400". Cart shows each line as "Size: 30ml, Rs. 1500 each, Qty 2, Rs. 3000" plus subtotal/delivery/total.

---

## Decision 3: Search by name and notes with filter and sort (Problem 3)

**Problem:** The reference site has no search, so customers must browse all products to find what they want.

**Decision:** Add a search field that matches product name and notes, working together with the category filter and sort control. Empty results show a "No products found" message with guidance.

**Alternative:** Add search only on product name, or make search a separate page.

**Reason:** Searching by name and notes (e.g. "oud", "citrus") helps customers find scents they like. Keeping search, filter, and sort on the same page lets customers narrow results incrementally without page reloads.

**Tradeoff:** Search, filter, and sort state must be kept in sync. Empty vs no-matches states need separate handling.

**Code location:** src/pages/Shop.jsx (search, category, sort, filtered results, empty states)

**Evidence:** Shop page has search input, category dropdown, and sort dropdown. Searching "oud" returns Oud Noir and Midnight Oud. No matches shows guidance text.