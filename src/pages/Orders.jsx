import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase/supabaseClient";

const STATUS_STEPS = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

/* ===============================
   LIVE STATUS CALCULATION
=============================== */
function getLiveStatus(order) {
  const createdTime = new Date(order.created_at).getTime();
  const now = Date.now();
  const diff = (now - createdTime) / 1000;

  if (diff < 10000) return "Placed";
  if (diff < 20000) return "Preparing";
  if (diff < 30000) return "Out for Delivery";
  return "Delivered";
}

function isDelivered(order) {
  return getLiveStatus(order) === "Delivered";
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState({});
  const [review, setReview] = useState({});

  /* ===============================
     LOAD ORDERS + REVIEWS
  =============================== */
  useEffect(() => {
    if (!user) return;

    async function loadOrders() {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Orders fetch error:", ordersError);
        setLoading(false);
        return;
      }

      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", user.id);

      if (reviewsError) {
        console.error("Reviews fetch error:", reviewsError);
      }

      const mergedOrders = ordersData.map((order) => ({
        ...order,
        reviews: (reviewsData || []).filter(
          (r) => r.order_id === order.id
        ),
      }));

      setOrders(mergedOrders);
      setLoading(false);
    }

    loadOrders();
    const interval = setInterval(loadOrders, 3000);
    return () => clearInterval(interval);
  }, [user]);

  /* ===============================
     SUBMIT REVIEW
  =============================== */
  async function submitReview(order) {
    if (!order.restaurant_id) {
      alert("Restaurant information missing");
      return;
    }

    if (!rating[order.id]) {
      alert("Please select a rating");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      restaurant_id: order.restaurant_id,
      order_id: order.id,
      rating: rating[order.id],
      review: review[order.id] || "",
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Thank you for your review!");
  }

  if (!user) {
    return <div style={{ padding: 24 }}>Please login to see your orders</div>;
  }

  return (
    <>
      <style>{`
        :root {
          --primary: #ff6b35;   /* FoodWay Orange */
          --secondary: #22c55e; /* Fresh Green */
          --accent: #facc15;

          --bg-dark: #020617;
          --card-bg: #0f172a;
          --border: rgba(255,107,53,0.25);
          --text-muted: #cbd5e1;
        }

        .orders-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px;
        }

        .page-title {
          font-size: 30px;
          margin-bottom: 24px;
          color: var(--primary);
          font-weight: 700;
        }

        .orders-grid {
          display: grid;
          gap: 22px;
        }

        .order-card {
          background: linear-gradient(145deg, #1e293b, #020617);
          border-radius: 20px;
          padding: 22px;
          border: 1px solid var(--border);
          box-shadow: 0 18px 40px rgba(0,0,0,0.55);
          transition: transform 0.25s ease;
        }

        .order-card:hover {
          transform: translateY(-2px);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .order-id {
          font-weight: 600;
          color: #fed7aa;
        }

        .status-pill {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(255,107,53,0.15);
          color: var(--primary);
        }

        /* ===== TRACKER ===== */
        .tracker {
          display: flex;
          justify-content: space-between;
          margin: 18px 0;
        }

        .tracker-step {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }

        .tracker-step.active {
          color: var(--secondary);
          font-weight: 600;
        }

        .tracker-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 auto 6px;
          background: rgba(255,255,255,0.25);
        }

        .tracker-step.active .tracker-dot {
          background: var(--secondary);
        }

        ul {
          padding-left: 18px;
          margin: 10px 0;
          color: var(--text-muted);
        }

        /* ===== REVIEW ===== */
        .stars {
          display: flex;
          gap: 6px;
          margin-bottom: 8px;
        }

        .star {
          font-size: 24px;
          cursor: pointer;
          color: #475569;
          transition: 0.2s;
        }

        .star.active {
          color: #facc15;
        }

        textarea {
          width: 100%;
          margin-top: 8px;
          padding: 10px;
          border-radius: 10px;
          background: #020617;
          color: #fff;
          border: 1px solid #334155;
          resize: none;
        }

        textarea:focus {
          outline: none;
          border-color: var(--primary);
        }

        .btn {
          margin-top: 10px;
          padding: 10px 16px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            var(--primary),
            var(--secondary)
          );
          color: #020617;
          font-weight: 700;
          cursor: pointer;
        }

        .btn:hover {
          box-shadow: 0 0 18px rgba(255,107,53,0.45);
        }
      `}</style>

      <div className="orders-page">
        <h2 className="page-title">Your Orders</h2>

        {loading && <div>Loading orders...</div>}

        <div className="orders-grid">
          {orders.map((o) => {
            const liveStatus = getLiveStatus(o);
            const activeIndex = STATUS_STEPS.indexOf(liveStatus);
            const hasReview = o.reviews && o.reviews.length > 0;
            const existingReview = hasReview ? o.reviews[0] : null;

            return (
              <div className="order-card" key={o.id}>
                <div className="order-header">
                  <div className="order-id">
                    Order #{o.id.slice(0, 8)}
                  </div>
                  <div className="status-pill">{liveStatus}</div>
                </div>

                <div className="tracker">
                  {STATUS_STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`tracker-step ${
                        i <= activeIndex ? "active" : ""
                      }`}
                    >
                      <div className="tracker-dot" />
                      {step}
                    </div>
                  ))}
                </div>

                <ul>
                  {o.items.map((it, idx) => (
                    <li key={idx}>
                      {it.name} × {it.qty}
                    </li>
                  ))}
                </ul>

                {/* ⭐ REVIEW SECTION */}
                {isDelivered(o) && (
                  <div style={{ marginTop: 16 }}>
                    {hasReview ? (
                      <>
                        <div>⭐ {existingReview.rating} / 5</div>
                        {existingReview.review && (
                          <p style={{ opacity: 0.7 }}>
                            "{existingReview.review}"
                          </p>
                        )}
                        <div style={{ color: "var(--secondary)" }}>
                          ✔ Review submitted
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={`star ${
                                rating[o.id] >= s ? "active" : ""
                              }`}
                              onClick={() =>
                                setRating({ ...rating, [o.id]: s })
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        <textarea
                          placeholder="Write a review (optional)"
                          value={review[o.id] || ""}
                          onChange={(e) =>
                            setReview({
                              ...review,
                              [o.id]: e.target.value,
                            })
                          }
                        />

                        <button
                          className="btn"
                          onClick={() => submitReview(o)}
                        >
                          Submit Review
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
