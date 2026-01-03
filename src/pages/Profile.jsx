import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import restaurants from "../data/restaurants.json";

export default function Profile() {
  const { user } = useAuth();
  const { items, clear, total } = useCart();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isVeg, setIsVeg] = useState(false);
  const [preferredCuisines, setPreferredCuisines] = useState([]);
  const [isEditingPrefs, setIsEditingPrefs] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  /* ===============================
     LOAD PROFILE DATA
  =============================== */
  useEffect(() => {
    if (!user) return;

    async function loadData() {
      const { data: profileData } = await supabase
        .from("users")
        .select("id, name, email, address, is_veg, preferred_cuisines")
        .eq("id", user.id)
        .maybeSingle();

      if (!profileData) {
        await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          name: user.email.split("@")[0],
        });
        return loadData();
      }

      setProfile(profileData);
      setAddress(profileData.address || "");
      setIsVeg(profileData.is_veg ?? false);
      setPreferredCuisines(profileData.preferred_cuisines ?? []);
      setIsEditingAddress(!profileData.address);
      setIsEditingPrefs(
        !profileData.preferred_cuisines ||
        profileData.preferred_cuisines.length === 0
      );

      const { data: favs } = await supabase
        .from("favorites")
        .select("restaurant_id")
        .eq("user_id", user.id);

      setFavorites(favs || []);
      setLoading(false);
    }

    loadData();
  }, [user]);

  /* ===============================
     SAVE ADDRESS
  =============================== */
  async function saveAddress() {
    if (!address.trim()) return alert("Address cannot be empty");

    const { error } = await supabase
      .from("users")
      .update({ address })
      .eq("id", user.id);

    if (error) return alert(error.message);

    setIsEditingAddress(false);
    alert("Address saved");
  }

  /* ===============================
     SAVE PREFERENCES
  =============================== */
  async function savePreferences() {
    const { error } = await supabase
      .from("users")
      .update({
        is_veg: isVeg,
        preferred_cuisines: preferredCuisines,
      })
      .eq("id", user.id);

    if (error) return alert(error.message);

    setIsEditingPrefs(false);
    alert("Preferences saved");
  }

  /* ===============================
     PLACE ORDER
  =============================== */
 async function placeOrder() {
  // 🛑 Cart empty check
  if (items.length === 0) {
    alert("Cart is empty");
    return;
  }

  // 🛑 Address validation (IMPORTANT FIX)
  if (!address || address.trim().length < 5) {
    alert("Please add and save your delivery address before placing the order.");
    return;
  }

  // 🛑 Restaurant validation
  const restaurantId = items[0]?.restaurantId;
  if (!restaurantId) {
    alert("Restaurant info missing. Please re-add items.");
    return;
  }

  // ✅ Create order
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      restaurant_id: restaurantId,
      items,
      total,
      address,          // ✅ now guaranteed
      status: "Placed",
    })
    .select()
    .single();

  if (error) {
    alert(error.message);
    return;
  }

  // 🔄 Simulated live status updates
  setTimeout(() => {
    supabase
      .from("orders")
      .update({ status: "Preparing" })
      .eq("id", data.id);
  }, 10000);

  setTimeout(() => {
    supabase
      .from("orders")
      .update({ status: "Out for Delivery" })
      .eq("id", data.id);
  }, 20000);

  setTimeout(() => {
    supabase
      .from("orders")
      .update({ status: "Delivered" })
      .eq("id", data.id);
  }, 30000);

  // 🧹 Cleanup + redirect
  clear();
  alert("Order placed successfully!");
  navigate("/orders");
}


  if (!user) return <div>Please login</div>;
  if (loading || !profile) return <div>Loading profile...</div>;

  const favoriteRestaurants = restaurants.filter((r) =>
    favorites.some((f) => f.restaurant_id === r.id)
  );

  const cuisineOptions = ["Indian", "Chinese", "Italian", "Fast Food"];

  return (
    <>
      <style>{`
        :root {
          --primary: #ff6b35;
          --secondary: #22c55e;
          --bg: #020617;
          --card: #0f172a;
          --border: rgba(255,107,53,0.25);
          --muted: #94a3b8;
        }

        .card {
          background: linear-gradient(145deg, #1e293b, #020617);
          border-radius: 18px;
          padding: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        h2, h3 {
          color: var(--primary);
        }

        .btn {
          padding: 8px 14px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          cursor: pointer;
        }

        .btn.secondary {
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--border);
        }

        .muted {
          color: var(--muted);
          font-size: 14px;
        }

        textarea {
          background: #020617;
          border: 1px solid #334155;
          color: white;
          border-radius: 10px;
        }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
        {/* LEFT */}
        <div>
          <h2>Account Details</h2>

          <div className="card" style={{ marginBottom: 24 }}>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>

          <div className="card" style={{ marginBottom: 24 }}>
            <h3>Favorite Restaurants</h3>
            {favoriteRestaurants.length === 0 ? (
              <p className="muted">No favorites yet</p>
            ) : (
              favoriteRestaurants.map((r) => (
                <div key={r.id} className="card" style={{ marginTop: 12 }}>
                  <strong>{r.name}</strong>
                  <div className="muted">
                    {r.cuisine} · {r.deliveryTime} mins
                  </div>
                  <Link to={`/r/${r.id}`}>
                    <button className="btn" style={{ marginTop: 8 }}>
                      View Menu
                    </button>
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* ADDRESS */}
          <div className="card" style={{ marginBottom: 24 }}>
            <h3 style={{ display: "flex", justifyContent: "space-between" }}>
              Delivery Address
              {!isEditingAddress && (
                <button
                  className="btn secondary"
                  onClick={() => setIsEditingAddress(true)}
                >
                  ✏️ Edit
                </button>
              )}
            </h3>

            <textarea
              value={address}
              disabled={!isEditingAddress}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%", padding: 10 }}
            />

            {isEditingAddress && (
              <button className="btn" onClick={saveAddress} style={{ marginTop: 10 }}>
                Save Address
              </button>
            )}
          </div>

          {/* PREFERENCES */}
          <div className="card">
            <h3 style={{ display: "flex", justifyContent: "space-between" }}>
              Food Preferences
              {!isEditingPrefs && (
                <button
                  className="btn secondary"
                  onClick={() => setIsEditingPrefs(true)}
                >
                  ✏️ Edit
                </button>
              )}
            </h3>

            <label>
              <input
                type="checkbox"
                disabled={!isEditingPrefs}
                checked={isVeg}
                onChange={(e) => setIsVeg(e.target.checked)}
              /> Vegetarian
            </label>

            <div style={{ marginTop: 12 }}>
              {cuisineOptions.map((c) => (
                <label key={c} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    disabled={!isEditingPrefs}
                    checked={preferredCuisines.includes(c)}
                    onChange={() =>
                      setPreferredCuisines((p) =>
                        p.includes(c) ? p.filter((x) => x !== c) : [...p, c]
                      )
                    }
                  /> {c}
                </label>
              ))}
            </div>

            {isEditingPrefs && (
              <button className="btn" onClick={savePreferences} style={{ marginTop: 12 }}>
                Save Preferences
              </button>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ position: "sticky", top: 24 }}>
          <div className="card">
            <h3>Checkout</h3>
            <p><strong>Total:</strong> ₹{total}</p>
            <button className="btn" style={{ width: "100%" }} onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
