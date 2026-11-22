export default function Home({ products, loading, error, retry, setCart, cart }) {
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
  return (
    <main>
      <h1>Welcome to Odura</h1>
      <p>Fine perfumes for every moment.</p>
      <p>We offer {products.length} perfumes across For Him, For Her, and Unisex.</p>
    </main>
  );
}