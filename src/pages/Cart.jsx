import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { maxPerItemRule, sampleRule, deliveryRule } from '../utils/rules.js';

export default function Cart({ cart, setCart, products }) {
  const [rule1Message, setRule1Message] = useState('');
  const [restoreMessage, setRestoreMessage] = useState('');

  useEffect(() => {
    const invalid = [];
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        invalid.push(item.id + ' (' + item.size + ')');
        return;
      }
      const sizeEntry = product.sizes.find((s) => s.size === item.size);
      if (!sizeEntry || sizeEntry.stock < 1) {
        invalid.push(item.id + ' (' + item.size + ')');
      }
    });
    if (invalid.length > 0) {
      setRestoreMessage('Some saved items are no longer available: ' + invalid.join(', ') + '. They have been removed.');
      const next = cart.filter((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return false;
        const sizeEntry = product.sizes.find((s) => s.size === item.size);
        return sizeEntry && sizeEntry.stock > 0;
      });
      setCart(next);
    }
  }, [cart, products, setCart]);

  function itemProduct(id) {
    return products.find((p) => p.id === id);
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = deliveryRule(subtotal);
  const total = subtotal + delivery.deliveryFee;
  const sampleCheck = sampleRule(cart);

  function changeQuantity(index, delta) {
    const item = cart[index];
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    const rule = maxPerItemRule(newQty);
    if (!rule.allowed) { setRule1Message(rule.message); return; }
    setRule1Message('');
    const next = [...cart];
    next[index].quantity = newQty;
    setCart(next);
  }

  function removeItem(index) {
    const next = [...cart];
    next.splice(index, 1);
    setCart(next);
  }

  function changeSize(index, newSize) {
    const item = cart[index];
    const product = itemProduct(item.id);
    const sizeEntry = product.sizes.find((s) => s.size === newSize);
    if (!sizeEntry || sizeEntry.stock < 1) return;
    const next = [...cart];
    next[index] = { ...item, size: newSize, price: sizeEntry.price };
    setCart(next);
  }

  return (
    <main>
      <h1>Cart</h1>
      {restoreMessage && <p style={{ color: '#a33232', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{restoreMessage}</p>}
      {cart.length === 0 ? (
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p>Add perfumes from the shop to get started.</p>
          <Link to="/shop"><button className="btn btn-primary">Browse perfumes</button></Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            {rule1Message && <p style={{ color: '#a33232', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{rule1Message}</p>}
            {!sampleCheck.allowed && <p style={{ color: '#a33232', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{sampleCheck.message}</p>}
            <p style={{ fontSize: '0.9rem', color: '#66625c', marginBottom: '0.5rem' }}>{delivery.message}</p>
          </div>
          {cart.map((item, index) => {
            const product = itemProduct(item.id);
            const sizeEntry = product.sizes.find((s) => s.size === item.size);
            const inStock = sizeEntry ? sizeEntry.stock > 0 : false;
            return (
              <div key={item.id + '-' + item.size + '-' + index} className="card" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200' }}>
                  <h3 style={{ marginBottom: '0.25rem' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#66625c', marginBottom: '0.25rem' }}>Size: {item.size}</p>
                  <p style={{ fontSize: '0.9rem', color: '#66625c', marginBottom: '0.5rem' }}>Rs. {item.price} each</p>
                  <select value={item.size} onChange={(e) => changeSize(index, e.target.value)} disabled={!inStock} className="focus-visible">
                    {product.sizes.map((s) => <option key={s.size} value={s.size} disabled={s.stock < 1}>{s.size} - Rs. {s.price} {s.stock < 1 ? '(out of stock)' : ''}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '140' }}>
                  <button onClick={() => changeQuantity(index, -1)} disabled={item.quantity <= 1} className="btn btn-outline">-</button>
                  <span style={{ minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => changeQuantity(index, 1)} className="btn btn-outline">+</button>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600', marginLeft: '0.5rem' }}>Rs. {item.price * item.quantity}</p>
                </div>
                <button onClick={() => removeItem(index)} className="btn btn-danger" style={{ marginLeft: 'auto' }}>Remove</button>
              </div>
            );
          })}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Subtotal</span><span>Rs. {subtotal}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: '#66625c' }}><span>Delivery</span><span>Rs. {delivery.deliveryFee}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem' }}><span>Total</span><span>Rs. {total}</span></div>
            <button className="btn btn-primary" disabled={!sampleCheck.allowed || cart.length === 0}>Proceed to checkout</button>
          </div>
        </>
      )}
    </main>
  );
}