import React from 'react'
import { Link } from 'react-router-dom'
import { restaurantImages } from '../utils/imageMap'

export default function RestaurantCard({ r }) {
  return (
    <>
      <style>{`
        :root {
          --primary: #ff6b35;
          --secondary: #22c55e;
          --bg-dark: #020617;
          --card-bg: #0f172a;
          --border: rgba(255,107,53,0.25);
          --muted: #cbd5e1;
        }

        .restaurant-card {
          background: linear-gradient(145deg, #1e293b, #020617);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(0,0,0,0.6);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .restaurant-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 70px rgba(255,107,53,0.35);
        }

        /* IMAGE */
        .restaurant-thumb {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          position: relative;
        }

        .restaurant-thumb::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.6),
            transparent
          );
        }

        .restaurant-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .restaurant-card:hover .restaurant-thumb img {
          transform: scale(1.1);
        }

        /* CONTENT */
        .restaurant-content {
          padding: 16px;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .restaurant-content h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #fed7aa;
        }

        .restaurant-meta {
          font-size: 13px;
          color: var(--muted);
        }

        /* ACTION */
        .restaurant-actions {
          margin-top: auto;
        }

        .view-btn {
          width: 100%;
          padding: 11px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 18px rgba(255,107,53,0.55);
        }
      `}</style>

      <div className="restaurant-card">
        {/* IMAGE */}
        <div className="restaurant-thumb">
          <img
            src={restaurantImages[r.id]}
            alt={r.name}
          />
        </div>

        {/* CONTENT */}
        <div className="restaurant-content">
          <h3>{r.name}</h3>
          <div className="restaurant-meta">
            {r.cuisine} · {r.deliveryTime} mins · Min ₹{r.minOrder}
          </div>

          <div className="restaurant-actions">
            <Link to={`/r/${r.id}`}>
              <button className="view-btn">
                View Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
