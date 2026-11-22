import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { deliveryRule } from '../utils/rules.js';

const CATEGORIES = ['For Him', 'For Her', 'Unisex'];

export default function Shop({ products, cart, loading, error, retry }) {
  if (loading) {
    return (
      <main>
        <div className="loading">Loading products...</div>
        <button className="btn btn-primary" onClick={retry} style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <div className="error">
          <p>Failed to load products.</p>
          <button className="btn btn-primary" onClick={retry} style={{ marginTop: '0.5rem' }}>
            Retry
          </button>
        </div>
      </main>
    );
  }
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('none');

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.notes.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || p.category === category;
      return matchSearch && matchCategory;
    });
    if (sort === 'price-asc') {
      result = [...result].sort(
        (a, b) =>
          Math.min(...a.sizes.map((s) => s.price)) -
          Math.min(...b.sizes.map((s) => s.price))
      );
    }
    if (sort === 'price-desc') {
      result = [...result].sort(
        (a, b) =>
          Math.min(...b.sizes.map((s) => s.price)) -
          Math.min(...a.sizes.map((s) => s.price))
      );
    }
    if (sort === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [products, search, category, sort]);

  const emptyDataset = products.length === 0;
  const noMatches = !emptyDataset && filtered.length === 0;

  const filterStyle = { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' };
  const colStyle = { flex: 1, minWidth: '200' };
  const labelStyle = { display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = deliveryRule(subtotal);

  return (
    <main>
      <h1>Shop</h1>
      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#faf9f6', border: '1px solid var(--border)', borderRadius: 6 }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          {delivery.message} <span style={{ fontWeight: '600' }}>Cart subtotal: Rs. {subtotal}</span>
        </p>
      </div>
      <div style={filterStyle}>
        <div style={colStyle}>
          <label htmlFor="search" style={labelStyle}>
            Search by name or notes
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus-visible"
          />
        </div>
        <div style={{ minWidth: '180' }}>
          <label htmlFor="category" style={labelStyle}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="focus-visible"
          >
            <option value="all">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ minWidth: '180' }}>
          <label htmlFor="sort" style={labelStyle}>
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="focus-visible"
          >
            <option value="none">Default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {emptyDataset ? (
        <div className="empty">
          <h2>No products available</h2>
          <p>The product list is currently empty.</p>
        </div>
      ) : noMatches ? (
        <div className="empty">
          <h2>No products found</h2>
          <p>Try changing your search, category, or sort options.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Change stock (demo)</h3>
        <p style={{ fontSize: '0.85rem', color: '#66625c', marginBottom: '0.5rem' }}>
          Adjust stock of a size to test out-of-stock and cart restore behaviour.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'end' }}>
          <select id="demo-product" className="focus-visible" style={{ minWidth: '160px' }}>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <select id="demo-size" className="focus-visible" style={{ minWidth: '90px' }}>
            <option value="5ml">5ml</option>
            <option value="30ml">30ml</option>
            <option value="50ml">50ml</option>
          </select>
          <input id="demo-stock" type="number" min="0" className="focus-visible" style={{ width: '70px' }} />
          <button className="btn btn-primary" style={{ padding: '0.6rem 1rem' }}>Set stock</button>
        </div>
      </div>
    </main>
  );
}