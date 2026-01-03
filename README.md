🍔 FoodWay — Food Delivery Web App

FoodWay is a modern, full-stack food delivery web application built with React and Supabase.
It provides a smooth, real-world food ordering experience with authentication, cart management, orders, and user profiles.

This project is designed to be minimal, clean, and internship/portfolio ready.

🚀 Features
👤 Authentication

Email & password signup and login

Secure session handling with Supabase Auth

Persistent login state

🏪 Restaurants & Menu

Browse restaurants

View menus with images

Size-based pricing (Small / Regular / Large)

Smooth UI with modern animations

🛒 Cart & Checkout

Add/remove items from cart

Quantity control

Floating cart bar

Checkout with delivery address

Order total calculation

📦 Orders

Place orders linked to restaurants

Live order status simulation:

Placed → Preparing → Out for Delivery → Delivered

Order history page

⭐ Reviews & Favorites

Rate restaurants after delivery

Write optional reviews

Add/remove favorite restaurants

View favorites in profile

👤 User Profile

View account details

Edit delivery address

Save food preferences (veg & cuisines)

Checkout directly from profile

🎨 UI & UX

FoodWay branded theme (Food = warm, Way = cool)

Responsive design (desktop & mobile)

Consistent global styling

Clean component architecture

🛠 Tech Stack
Frontend

React (Vite)

React Router

Context API (Auth & Cart)

CSS (custom global theme)

Backend (BaaS)

Supabase

Authentication

PostgreSQL database

Realtime-ready architecture

📂 Project Structure (Simplified)
src/
├── components/
│   ├── RestaurantCard.jsx
│   ├── MenuItem.jsx
│   ├── CartBar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Restaurant.jsx
│   ├── Orders.jsx
│   ├── Profile.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
├── contexts/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
├── supabase/
│   └── supabaseClient.js
├── styles/
│   └── index.css
├── App.jsx
├── main.jsx

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/foodway.git
cd foodway

2️⃣ Install dependencies
npm install

3️⃣ Create Supabase Project

Go to 👉 https://supabase.com

Create a new project

Enable Email/Password authentication

Create tables:

users

orders

reviews

favorites

4️⃣ Configure Supabase

Create src/supabase/supabaseClient.js:

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)


Create a .env file:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

5️⃣ Run the app
npm run dev

🚀 Deployment

You can deploy easily using:

Vercel (recommended)

Netlify

Steps:

Push code to GitHub

Import project in Vercel

Add environment variables

Deploy 

Notes

Order status is time-based simulated for demo purposes.

Architecture is ready for real-time updates using Supabase Realtime or Edge Functions.

Project is intentionally clean and minimal, suitable for:

Internships

College projects

Portfolio showcase

Future Enhancements (Optional)

Payment gateway integration

Admin dashboard

Real-time order tracking

Push notifications

PWA support

Cloud functions for order automation

Author
Mohammed Ismail Y
FoodWay
Built as a full-stack React + Supabase project for learning, assessment, and portfolio use.