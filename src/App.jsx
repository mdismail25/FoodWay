import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import { useAuth } from './contexts/AuthContext'
import { useCart } from './contexts/CartContext'
import CartBar from './components/CartBar'

/* =========================
   NAVBAR
========================= */
function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const displayName = user?.email ? user.email.split('@')[0] : ''

  return (
    <>
      <style>{`
        :root {
          --primary: #ff6b35;
          --secondary: #22c55e;
          --bg: #020617;
          --card: #0f172a;
          --border: rgba(255,107,53,0.25);
          --muted: #cbd5e1;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          padding: 14px 26px;
          background: linear-gradient(135deg, #1e293b, #020617);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 12px 30px rgba(0,0,0,0.5);
        }

        /* BRAND */
        .brand {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: var(--primary);
          text-decoration: none;
        }

        /* LINKS */
        .nav-links {
          display: flex;
          gap: 20px;
          margin-left: 36px;
        }

        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          position: relative;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 2px;
          background: var(--primary);
          transition: width 0.25s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-links a:hover {
          color: #fff;
        }

        /* RIGHT */
        .nav-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* CART */
        .cart-icon {
          position: relative;
          font-size: 20px;
          cursor: pointer;
          color: #fff;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -10px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 6px;
          border-radius: 999px;
          min-width: 18px;
          text-align: center;
        }

        /* BUTTONS */
        .nav-btn {
          padding: 8px 16px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
        }

        .nav-btn.secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: #fff;
        }

        /* USER */
        .user-name {
          font-size: 13px;
          color: #fff;
          cursor: pointer;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          transition: background 0.2s ease;
        }

        .user-name:hover {
          background: rgba(255,107,53,0.25);
        }

        @media (max-width: 700px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>

      <div className="navbar">
        {/* BRAND */}
        <Link to="/" className="brand">
          FoodWay
        </Link>

        {/* LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {/* CART */}
          <div
            className="cart-icon"
            title="Cart"
            onClick={() => navigate('/profile')}
          >
            🛒
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <div
                className="user-name"
                onClick={() => navigate('/profile')}
                title="Profile"
              >
                {displayName}
              </div>

              <button
                className="nav-btn secondary"
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="nav-btn secondary">Login</button>
              </Link>
              <Link to="/signup">
                <button className="nav-btn">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

/* =========================
   APP
========================= */
export default function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/r/:id" element={<Restaurant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <CartBar />
    </div>
  )
}
