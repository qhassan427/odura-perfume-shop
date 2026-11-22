import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ cartCount }) {
  const [simulateFailure, setSimulateFailure] = useState(
    window.localStorage.getItem('odura_simulate_failure') === 'true'
  );

  function toggleFailure() {
    const next = !simulateFailure;
    setSimulateFailure(next);
    if (next) {
      window.localStorage.setItem('odura_simulate_failure', 'true');
    } else {
      window.localStorage.removeItem('odura_simulate_failure');
    }
  }

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          ODURA
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart <span className="cart-badge">{cartCount}</span></Link>
          </li>
        </ul>
        <div className="nav-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={toggleFailure}
              className="focus-visible"
            />
            Simulate load failure
          </label>
        </div>
      </div>
    </nav>
  );
}
