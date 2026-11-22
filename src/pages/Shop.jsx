import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

const CATEGORIES = ['For Him', 'For Her', 'Unisex'];

export default function Shop({ products, loading, error, retry }) {
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

  return (
    <main>
      <h1>Shop</h1>
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
    </main>
  );
}