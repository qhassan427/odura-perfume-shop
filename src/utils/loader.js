import products from '../data/products.js';

// Mock async loader for product data.
// Simulates a network delay and an optional failure for testing error/retry states.
export function loadProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (window.localStorage.getItem('odura_simulate_failure') === 'true') {
        reject(new Error('Failed to load products'));
      } else {
        resolve(products);
      }
    }, 600);
  });
}
