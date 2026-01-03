import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { menuImages } from "../utils/imageMap";

export default function MenuItem({ item, restaurantId }) {
  const { items, addItem, increase, decrease } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [size, setSize] = useState("Regular");

  /* ===============================
     PRICE CALCULATION
  =============================== */
  function getPrice() {
    let price = item.price;
    if (size === "Small") price -= 20;
    if (size === "Large") price += 30;
    return price;
  }

  /* ===============================
     FIND CART ITEM (ID + SIZE)
  =============================== */
  const cartItem = items.find(
    (i) => i.id === item.id && i.size === size
  );

  function handleAdd() {
    if (!user) {
      navigate("/login");
      return;
    }

    addItem({
      id: item.id,
      name: item.name,
      price: getPrice(),
      restaurantId,
      size,
      addons: []
    });
  }

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

        .menu-item {
          background: linear-gradient(145deg, #1e293b, #020617);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 18px 40px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .menu-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px rgba(255,107,53,0.35);
        }

        /* IMAGE */
        .menu-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        /* INFO */
        .menu-info {
          padding: 14px 16px;
          flex: 1;
        }

        .menu-title {
          font-size: 16px;
          font-weight: 700;
          color: #fed7aa;
          margin-bottom: 6px;
        }

        .menu-price {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
        }

        .menu-price span {
          font-size: 12px;
          color: var(--muted);
        }

        /* SIZE BUTTONS */
        .menu-sizes {
          display: flex;
          gap: 6px;
        }

        .size-btn {
          flex: 1;
          padding: 6px 0;
          font-size: 12px;
          border-radius: 999px;
          border: 1px solid #334155;
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: 0.2s;
        }

        .size-btn.active {
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
          font-weight: 700;
          border: none;
        }

        .size-btn:hover {
          border-color: var(--primary);
        }

        /* ACTION */
        .menu-action {
          padding: 12px 16px 16px;
        }

        .add-btn {
          width: 100%;
        }

        .qty-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .qty-box span {
          font-weight: 700;
          color: #fff;
        }

        .btn {
          padding: 8px 14px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          cursor: pointer;
          color: #020617;
        }

        .btn.secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--primary);
        }
      `}</style>

      <div className="menu-item">
        {/* IMAGE */}
        <img
          src={menuImages[item.id]}
          alt={item.name}
          className="menu-img"
        />

        {/* INFO */}
        <div className="menu-info">
          <div className="menu-title">{item.name}</div>

          <div className="menu-price">
            ₹{getPrice()} <span>({size})</span>
          </div>

          <div className="menu-sizes">
            {["Small", "Regular", "Large"].map((s) => (
              <button
                key={s}
                className={`size-btn ${size === s ? "active" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ACTION */}
        <div className="menu-action">
          {!cartItem ? (
            <button className="btn add-btn" onClick={handleAdd}>
              + Add
            </button>
          ) : (
            <div className="qty-box">
              <button
                className="btn secondary"
                onClick={() => decrease(cartItem)}
              >
                −
              </button>

              <span>{cartItem.qty}</span>

              <button
                className="btn"
                onClick={() => increase(cartItem)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
