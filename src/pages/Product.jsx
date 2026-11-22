import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { maxPerItemRule } from '../utils/rules.js';

export default function Product({ products, setCart, cart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main>
        <h1>Product not found</h1>
        <p>The perfume you requested does not exist.</p>
        <Link to="/shop">
          <button className="btn btn-primary">Back to shop</button>
        </Link>
      </main>
    );
  }

  const minPrice = Math.min(...product.sizes.map((s) => s.price));
  const [addMsg, setAddMsg] = useState('');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
  const [selectedQty, setSelectedQty] = useState(1);

  function addToCart(size, qty) {
    const sizeEntry = product.sizes.find((s) => s.size === size);
    if (!sizeEntry || sizeEntry.stock < 1) {
      setAddMsg('This size is out of stock.');
      return;
    }
    const rule = maxPerItemRule(qty);
    if (!rule.allowed) {
      setAddMsg(rule.message);
      return;
    }
    setAddMsg('');
    const existing = cart.findIndex((i) => i.id === product.id && i.size === size);
    const next = [...cart];
    if (existing >= 0) {
      const combinedQty = next[existing].quantity + qty;
      const combinedRule = maxPerItemRule(combinedQty);
      if (!combinedRule.allowed) {
        setAddMsg(combinedRule.message);
        return;
      }
      next[existing].quantity = combinedQty;
    } else {
      next.push({ id: product.id, size, quantity: qty, price: sizeEntry.price });
    }
    setCart(next);
    setAddMsg('Added to cart.');
  }

  return (
    <main>
      <Link to="/shop" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        &larr; Back to shop
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div>
          <svg
            width="200"
            height="280"
            viewBox="0 0 100 140"
            role="img"
            aria-label={product.name}
          >
            <rect width="40" height="100" x="30" y="20" fill="#e7e4da" rx="4" />
            <rect width="20" height="30" x="40" y="0" fill="#b08d3e" rx="2" />
          </svg>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#66625c' }}>
            Image: bottle illustration for {product.name}
          </p>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="stock">{product.category}</p>
          <p>{product.description}</p>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#66625c' }}>
            Notes: {product.notes}
          </p>
          <h2 style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.75rem' }}>
            Sizes & prices
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {product.sizes.map((size) => (
              <li
                key={size.size}
                style={{ marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{size.size}</span>
                <span>Rs. {size.price}</span>
                <span className={`stock ${size.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {size.stock > 0 ? `In stock (${size.stock})` : 'Out of stock'}
                </span>
              </li>
            ))}
          </ul>
          {addMsg && <p style={{ color: addMsg === 'Added to cart.' ? '#2e7d32' : '#a33232', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{addMsg}</p>}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <label htmlFor="prod-size" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Size</label>
            <select id="prod-size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="focus-visible" style={{ minWidth: '80px' }}>
              {product.sizes.map((s) => (
                <option key={s.size} value={s.size} disabled={s.stock < 1}>
                  {s.size} - Rs. {s.price} {s.stock < 1 ? '(out)' : ''}
                </option>
              ))}
            </select>
            <label htmlFor="prod-qty" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Qty</label>
            <input id="prod-qty" type="number" value={selectedQty} onChange={(e) => setSelectedQty(Math.max(1, parseInt(e.target.value) || 1))} min="1" max="5" style={{ width: '50px' }} className="focus-visible" />
            <button onClick={() => addToCart(selectedSize, selectedQty)} className="btn btn-primary">Add to cart</button>
          </div>
          <p className="price" style={{ marginTop: '1rem' }}>
            Starting from Rs. {minPrice}
          </p>
        </div>
      </div>
    </main>
  );
}