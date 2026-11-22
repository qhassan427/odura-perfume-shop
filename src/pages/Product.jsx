import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Product({ products, onAddToCart }) {
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
          <p className="price" style={{ marginTop: '1rem' }}>
            Starting from Rs. {minPrice}
          </p>
        </div>
      </div>
    </main>
  );
}