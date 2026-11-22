import { Link } from 'react-router-dom';

// Shows one perfume in the shop grid.
// Falls back to a CSS-drawn bottle when no image is available.
export default function ProductCard({ product, onAddToCart }) {
  const anyInStock = product.sizes.some((s) => s.stock > 0);
  const sizeList = product.sizes.map((s) => `${s.size} Rs. ${s.price}`).join(' · ');

  return (
    <article className="card">
      <div style={{ height: 120, borderRadius: 6, overflow: 'hidden', marginBottom: '0.75rem', border: '1px solid var(--border)' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 140"
          role="img"
          aria-label={product.name}
        >
          <rect width="40" height="100" x="30" y="20" fill="#e7e4da" rx="4" />
          <rect width="20" height="30" x="40" y="0" fill={product.color || '#b08d3e'} rx="2" />
        </svg>
      </div>
      <h3>{product.name}</h3>
      <p className="stock">{product.category}</p>
      <p>{product.notes}</p>
      <p className="price">{sizeList}</p>
      <p className={`stock ${anyInStock ? 'in-stock' : 'out-of-stock'}`}>
        {anyInStock ? 'In stock' : 'Out of stock'}
      </p>
      <Link to={`/product/${product.id}`}>
        <button className="btn btn-primary" style={{ width: '100%' }}>
          View details
        </button>
      </Link>
    </article>
  );
}
