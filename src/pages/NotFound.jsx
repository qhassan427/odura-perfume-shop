import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/shop">
        <button className="btn btn-primary">Go to shop</button>
      </Link>
    </main>
  );
}