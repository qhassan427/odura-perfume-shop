import { Link } from 'react-router-dom';

export default function Confirmation({ cart, setCart, products }) {
  return (
    <main>
      <h1>Order confirmation</h1>
      <p style={{ color: '#2e7d32', fontWeight: '600', marginBottom: '1rem' }}>
        Thank you for your order. This is a simulated order - no real payment was processed.
      </p>
      <div style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1.5rem', maxWidth: '500px' }}>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Order summary</h2>
        {cart.length === 0 ? (
          <p>No items.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id + '-' + item.size} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
              <span>{item.size} {item.quantity}x</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>
      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#66625c' }}>
        Your order will be delivered via cash on delivery in Islamabad or Rawalpindi.
      </p>
      <Link to="/shop"><button className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse more perfumes</button></Link>
    </main>
  );
}