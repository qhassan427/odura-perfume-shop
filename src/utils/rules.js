// Business rules for Odura.
// Each rule returns a result object the UI can use to show feedback and block actions.

// Rule 1: Max 5 of the same perfume and size per order.
// qty: requested quantity for one line item
// Returns { allowed: boolean, message: string }
export function maxPerItemRule(qty) {
  const limit = 5;
  if (qty > limit) {
    return {
      allowed: false,
      message: `Maximum ${limit} of the same perfume and size per order.`,
    };
  }
  return { allowed: true, message: '' };
}

// Rule 2: A 5ml sample cannot be bought alone.
// cart: array of { size, quantity }
// Returns { allowed: boolean, message: string }
export function sampleRule(cart) {
  const hasBottle = cart.some(
    (item) => item.size === '30ml' || item.size === '50ml'
  );
  const hasSample = cart.some((item) => item.size === '5ml');
  if (hasSample && !hasBottle) {
    return {
      allowed: false,
      message: 'A 5ml sample must be bought with at least one 30ml or 50ml bottle.',
    };
  }
  return { allowed: true, message: '' };
}

// Rule 3: Free delivery if subtotal is Rs. 5000 or more, otherwise Rs. 250.
// subtotal: number
// Returns { deliveryFee: number, message: string }
export function deliveryRule(subtotal) {
  const freeThreshold = 5000;
  const standardFee = 250;
  if (subtotal >= freeThreshold) {
    return {
      deliveryFee: 0,
      message: 'Free delivery',
    };
  }
  return {
    deliveryFee: standardFee,
    message: `Delivery fee Rs. ${standardFee}. Add Rs. ${
      freeThreshold - subtotal
    } more for free delivery.`,
  };
}
