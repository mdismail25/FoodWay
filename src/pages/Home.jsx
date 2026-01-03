import React, { useEffect, useState } from 'react'
import RestaurantCard from '../components/RestaurantCard'
import data from '../data/restaurants.json'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [q, setQ] = useState('')

  // Filters (UNCHANGED)
  const [cuisine, setCuisine] = useState('All')
  const [maxTime, setMaxTime] = useState(60)
  const [maxMinOrder, setMaxMinOrder] = useState(1000)

  useEffect(() => {
    setRestaurants(data)
  }, [])

  const cuisines = ['All', ...new Set(data.map(r => r.cuisine))]

  const filtered = restaurants.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(q.toLowerCase())

    const matchesCuisine = cuisine === 'All' || r.cuisine === cuisine
    const matchesTime = r.deliveryTime <= maxTime
    const matchesMinOrder = r.minOrder <= maxMinOrder

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesTime &&
      matchesMinOrder
    )
  })

  return (
    <>
      <style>{`
        :root {
          /* ===== FOODWAY BRAND COLORS ===== */
          --primary: #ff6b35;        /* Food Orange */
          --secondary: #22c55e;      /* Fresh Green */
          --accent: #facc15;         /* Warm Yellow */

          --bg-dark: #0f172a;
          --card-bg: rgba(30,41,59,0.9);
          --border: rgba(255,107,53,0.25);

          --text-main: #f8fafc;
          --text-muted: #cbd5e1;
        }

        body {
          background: radial-gradient(circle at top, #0f172a, #020617);
        }

        .home-page {
          max-width: 1280px;
          margin: auto;
          padding: 32px 20px 60px;
        }

        /* ===== HERO ===== */
        .hero {
          background: linear-gradient(145deg, #1e293b, #020617);
          border-radius: 26px;
          padding: 38px;
          margin-bottom: 32px;
          border: 1px solid var(--border);
          box-shadow: 0 30px 70px rgba(0,0,0,0.6);
          backdrop-filter: blur(12px);
        }

        .hero h1 {
          font-size: 36px;
          font-weight: 700;
          color: var(--primary);
        }

        .hero p {
          font-size: 14px;
          color: var(--text-muted);
          margin: 8px 0 26px;
        }

        /* ===== SEARCH ===== */
        .search-bar {
          margin-bottom: 22px;
        }

        .search-bar input {
          width: 100%;
          padding: 15px 20px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: #020617;
          color: var(--text-main);
          font-size: 14px;
          transition: 0.3s;
        }

        .search-bar input::placeholder {
          color: #94a3b8;
        }

        .search-bar input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 16px rgba(255,107,53,0.45);
        }

        /* ===== FILTERS ===== */
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .filters select {
          padding: 12px 18px;
          border-radius: 999px;
          background: #020617;
          color: var(--text-main);
          border: 1px solid var(--border);
          font-size: 13px;
          cursor: pointer;
          transition: 0.25s;
        }

        .filters select:hover {
          border-color: var(--secondary);
          box-shadow: 0 0 10px rgba(34,197,94,0.35);
        }

        /* ===== GRID ===== */
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 26px;
          margin-top: 34px;
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          margin-top: 40px;
          padding: 50px;
          text-align: center;
          border-radius: 22px;
          background: linear-gradient(145deg, #1e293b, #020617);
          border: 1px dashed rgba(255,107,53,0.4);
          color: #fed7aa;
          font-size: 15px;
        }

        @media (max-width: 600px) {
          .hero {
            padding: 26px;
          }

          .hero h1 {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="home-page">
        <div className="hero">
          <h1>Discover Restaurants</h1>
          <p>Order from the best places near you with FoodWay</p>

          <div className="search-bar">
            <input
              placeholder="Search restaurants or cuisine"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="filters">
            <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
              {cuisines.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select value={maxTime} onChange={e => setMaxTime(Number(e.target.value))}>
              <option value={30}>30 mins</option>
              <option value={45}>45 mins</option>
              <option value={60}>60 mins</option>
            </select>

            <select value={maxMinOrder} onChange={e => setMaxMinOrder(Number(e.target.value))}>
              <option value={200}>Min ₹200</option>
              <option value={400}>Min ₹400</option>
              <option value={600}>Min ₹600</option>
              <option value={1000}>All Orders</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            🍽️ No restaurants match your filters
          </div>
        ) : (
          <div className="restaurants-grid">
            {filtered.map(r => (
              <RestaurantCard key={r.id} r={r} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
