# 🍔 FoodWay — Food Delivery Web Application

**FoodWay** is a modern, full-stack food delivery web application built using **React (Vite)** and **Supabase**.  
It simulates a real-world food ordering platform with authentication, cart management, orders, reviews, and user profiles.

🔗 **Live Demo:**  
👉 https://food-way-lake.vercel.app/

This project is designed to be **clean, scalable, and portfolio-ready**, suitable for internships, college projects, and real-world learning.

---

## 🚀 Features

### 👤 Authentication
- Email & password signup and login
- Secure authentication using Supabase Auth
- Persistent login sessions
- Protected routes for authenticated users

---

### 🏪 Restaurants & Menu
- Browse restaurants with images
- View restaurant menus
- Size-based pricing (Small / Regular / Large)
- Smooth UI animations and transitions

---

### 🛒 Cart & Checkout
- Add and remove items from cart
- Increase/decrease quantity
- Floating cart bar
- Checkout with delivery address
- Automatic order total calculation

---

### 📦 Orders
- Place orders linked to restaurants
- Live order status simulation:
  - Placed → Preparing → Out for Delivery → Delivered
- Order history page
- Status updates based on time (demo logic)

---

### ⭐ Reviews & Favorites
- Rate restaurants after delivery
- Optional written reviews
- Add/remove favorite restaurants
- View favorites in profile

---

### 👤 User Profile
- View account details
- Edit delivery address
- Save food preferences (Veg / preferred cuisines)
- Checkout directly from profile page

---

### 🎨 UI & UX
- **FoodWay branded theme**  
  - *Food* → warm colors  
  - *Way* → cool colors
- Responsive design (desktop & mobile)
- Clean component-based architecture
- Modern, minimal UI

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API (Auth & Cart)
- Custom CSS styling

### Backend (BaaS)
- Supabase
  - Authentication
  - PostgreSQL database
  - Realtime-ready architecture

---

## 📂 Project Structure (Simplified)

src/
├── components/
│ ├── RestaurantCard.jsx
│ ├── MenuItem.jsx
│ ├── CartBar.jsx
├── pages/
│ ├── Home.jsx
│ ├── Restaurant.jsx
│ ├── Orders.jsx
│ ├── Profile.jsx
│ ├── Login.jsx
│ ├── Signup.jsx
├── contexts/
│ ├── AuthContext.jsx
│ ├── CartContext.jsx
├── utils/
│ └── imageMap.js
├── supabase/
│ └── supabaseClient.js
├── App.jsx
├── main.jsx

yaml
Copy code

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/foodway.git
cd foodway
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create Supabase Project
Go to 👉 https://supabase.com

Create a new project

Enable Email/Password authentication

Create the following tables:

users

orders

reviews

favorites

4️⃣ Configure Supabase
Create src/supabase/supabaseClient.js:

js
Copy code
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
Create a .env file:

env
Copy code
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
5️⃣ Run the app locally
bash
Copy code
npm run dev
🚀 Deployment
The application is deployed using Vercel.

Deployment Steps:
Push code to GitHub

Import repository in Vercel

Add environment variables:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Deploy

🔗 Live URL:
👉 https://food-way-lake.vercel.app/

📝 Notes
Order status updates are time-based simulations for demo purposes

Architecture is ready for:

Supabase Realtime

Edge Functions

WebSockets

Project focuses on clarity, scalability, and learning best practices

🔮 Future Enhancements
Payment gateway integration

Admin dashboard

Real-time order tracking

Push notifications

Progressive Web App (PWA)

Automated backend workflows

👨‍💻 Author
Mohammed Ismail Y
Full-Stack Developer (React + Supabase)