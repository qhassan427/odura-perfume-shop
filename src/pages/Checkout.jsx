import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sampleRule, deliveryRule } from '../utils/rules.js';

export default function Checkout({ cart, setCart, products }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', city: 'Islamabad', address: '' });
  const [errors, setErrors] = useState({});
  const [submitMsg, setSubmitMsg] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = deliveryRule(subtotal);
  const total = subtotal + delivery.deliveryFee;
  const sampleCheck = sampleRule(cart);

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.phone.trim()) next.phone = 'Phone is required.';
    if (!form.city) next.city = 'Please select a city.';
    if (!form.address.trim()) next.address = 'Address is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function change(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (errors[field]) { const n = { ...errors }; delete n[field]; setErrors(n); }
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!sampleCheck.allowed) { setSubmitMsg(sampleCheck.message); return; }
    if (!validate()) return;
    setSubmitMsg('Order placed (simulated).');
    setCart([]);
    setTimeout(() => navigate('/confirmation'), 800);
  }

  if (cart.length === 0) {
    return (
      <main><h1>Checkout</h1><div className="empty"><p>Your cart is empty.</p><Link to="/shop"><button className="btn btn-primary">Browse perfumes</button></Link></div></main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>
      {!sampleCheck.allowed && <p style={{ color: '#a33232', fontSize: '0.9rem', marginBottom: '1rem' }}>{sampleCheck.message}</p>}
      <form onSubmit={placeOrder} style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
        <div className="form-group">
          <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Full name</label>
          <input id="name" type="text" value={form.name} onChange={(e) => change('name', e.target.value)} className="focus-visible" />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Phone number</label>
          <input id="phone" type="tel" value={form.phone} onChange={(e) => change('phone', e.target.value)} className="focus-visible" />
          {errors.phone && <p className="field-error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="city" style={{ fontSize: '0.9rem', fontWeight: '500' }}>City</label>
          <select id="city" value={form.city} onChange={(e) => change('city', e.target.value)} className="focus-visible"><option value="Islamabad">Islamabad</option><option value="Rawalpindi">Rawalpindi</option></select>
          {errors.city && <p className="field-error">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Delivery address</label>
          <input id="address" type="text" value={form.address} onChange={(e) => change('address', e.target.value)} className="focus-visible" />
          {errors.address && <p className="field-error">{errors.address}</p>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!sampleCheck.allowed}>Place order</button>
      </form>
      {submitMsg && <p style={{ color: '#2e7d32', fontSize: '0.9rem', marginTop: '1rem' }}>{submitMsg}</p>}
      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Order summary</h2>
        {cart.map((item) => (<div key={item.id + '-' + item.size} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}><span>{item.size} {item.quantity}x</span><span>Rs. {item.price * item.quantity}</span></div>))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#66625c' }}><span>Delivery</span><span>Rs. {delivery.deliveryFee}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem' }}><span>Total</span><span>Rs. {total}</span></div>
        <p style={{ fontSize: '0.85rem', color: '#66625c' }}>Cash on delivery. Simulated order - no real payment.</p>
      </div>
    </main>
  );
}