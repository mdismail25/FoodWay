import React from 'react'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

export default function CartBar() {
  const { items, total, clear } = useCart()

  if (items.length === 0) return null

  return (
    <>
      <style>{`
        :root {
          --primary: #ff6b35;
          --secondary: #22c55e;
          --bg: #020617;
          --card: #0f172a;
          --border: rgba(255,107,53,0.35);
          --muted: #cbd5e1;
        }

        .cart-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 1000px;
          background: linear-gradient(145deg, #1e293b, #020617);
          border-radius: 22px;
          padding: 18px 22px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.65);
          border: 1px solid var(--border);
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 999;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, 24px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        .cart-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cart-info strong {
          color: #fed7aa;
          font-size: 15px;
        }

        .cart-total {
          font-size: 14px;
          color: var(--muted);
        }

        .cart-actions {
          display: flex;
          gap: 12px;
        }

        .cart-btn {
          padding: 11px 18px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cart-btn.primary {
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
        }

        .cart-btn.secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: #fff;
        }

        .cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(255,107,53,0.45);
        }

        @media (max-width: 600px) {
          .cart-bar {
            flex-direction: column;
            gap: 14px;
            align-items: stretch;
          }

          .cart-actions {
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="cart-bar">
        <div className="cart-info">
          <strong>
            Cart · {items.length} item{items.length > 1 ? 's' : ''}
          </strong>
          <div className="cart-total">
            Total: ₹{total}
          </div>
        </div>

        <div className="cart-actions">
          <Link to="/profile">
            <button className="cart-btn primary">
              Checkout
            </button>
          </Link>

          <button
            className="cart-btn secondary"
            onClick={() => clear()}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  )
}
