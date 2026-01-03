import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/restaurants.json";
import MenuItem from "../components/MenuItem";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase/supabaseClient";
import { restaurantImages } from "../utils/imageMap";

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [restaurant, setRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  /* =============================
     LOAD RESTAURANT
  ============================== */
  useEffect(() => {
    const found = data.find((x) => x.id === id);
    setRestaurant(found);
  }, [id]);

  /* =============================
     CHECK FAVORITE STATUS
  ============================== */
  useEffect(() => {
    if (!user || !restaurant) return;

    async function checkFavorite() {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("restaurant_id", restaurant.id)
        .single();

      setIsFavorite(!error && !!data);
    }

    checkFavorite();
  }, [user, restaurant]);

  /* =============================
     TOGGLE FAVORITE
  ============================== */
  const toggleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("restaurant_id", restaurant.id);

      if (error) return alert(error.message);

      setIsFavorite(false);
      alert("Removed from favorites");
    } else {
      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        restaurant_id: restaurant.id,
      });

      if (error) return alert(error.message);

      setIsFavorite(true);
      alert("Added to favorites");
    }
  };

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <>
      {/* ================== STYLES ================== */}
      <style>{`
        :root {
          --primary: #ff6b35;
          --secondary: #22c55e;
          --bg: #020617;
          --muted: #cbd5e1;
        }

        .restaurant-page {
          max-width: 1100px;
          margin: 0 auto;
          padding-bottom: 40px;
        }

        /* BACK BUTTON */
        .back-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #020617;
          box-shadow: 0 14px 28px rgba(0,0,0,0.5);
          transition: transform 0.2s;
        }

        .back-btn:hover {
          transform: scale(1.05);
        }

        /* HERO */
        .restaurant-hero {
          position: relative;
          height: 360px;
          border-radius: 26px;
          overflow: hidden;
          margin-bottom: 36px;
          box-shadow: 0 30px 65px rgba(0,0,0,0.65);
        }

        .restaurant-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.06);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.95),
            rgba(0,0,0,0.25)
          );
        }

        .hero-content {
          position: absolute;
          bottom: 26px;
          left: 26px;
          right: 26px;
          color: white;
        }

        .hero-content h1 {
          margin: 0;
          font-size: 34px;
          color: #fff;
        }

        .hero-meta {
          margin-top: 8px;
          font-size: 14px;
          color: var(--muted);
        }

        /* FAVORITE */
        .favorite-btn {
          margin-top: 16px;
          padding: 11px 20px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
          box-shadow: 0 0 20px rgba(255,107,53,0.45);
          transition: transform 0.2s;
        }

        .favorite-btn:hover {
          transform: translateY(-2px);
        }

        /* MENU */
        .menu-title {
          margin: 36px 0 18px;
          font-size: 24px;
          font-weight: 700;
          color: var(--primary);
        }

        .menu-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        @media (max-width: 768px) {
          .restaurant-hero {
            height: 260px;
          }

          .hero-content h1 {
            font-size: 26px;
          }
        }
      `}</style>

      {/* ================== BACK ================== */}
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>

      <div className="restaurant-page">
        {/* ================== HERO ================== */}
        <div className="restaurant-hero">
          <img
            src={restaurantImages[restaurant.id]}
            alt={restaurant.name}
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1>{restaurant.name}</h1>
            <div className="hero-meta">
              {restaurant.cuisine} · {restaurant.deliveryTime} mins · Min ₹{restaurant.minOrder}
            </div>

            <button className="favorite-btn" onClick={toggleFavorite}>
              {isFavorite ? "❤️ Remove Favorite" : "🤍 Save to Favorites"}
            </button>
          </div>
        </div>

        {/* ================== MENU ================== */}
        <h3 className="menu-title">Menu</h3>

        <div className="menu-list">
          {restaurant.menu.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              restaurantId={restaurant.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
