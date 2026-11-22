import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadProducts } from './utils/loader.js';
import Nav from './components/Nav.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const saved = window.localStorage.getItem('odura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await loadProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function retry() {
    setLoading(true);
    setError(null);
    loadProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    window.localStorage.setItem('odura_cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <Nav cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={loading}
              error={error}
              retry={retry}
              setCart={setCart}
              cart={cart}
            />
          }
        />
        <Route
          path="/shop"
          element={<Shop products={products} cart={cart} loading={loading} error={error} retry={retry} />}
        />
        <Route
          path="/product/:id"
          element={<Product products={products} setCart={setCart} cart={cart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} products={products} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} products={products} />}
        />
        <Route
          path="/confirmation"
          element={<Confirmation cart={cart} setCart={setCart} products={products} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;