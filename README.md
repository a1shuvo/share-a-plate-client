# 🍽 ShareAPlate - Food Waste Reduction Platform

**ShareAPlate** is a MERN Stack-powered food donation and sharing platform that connects **restaurants**, **charities**, and **individuals** to reduce food waste and support communities in need.

🌐 **Live Site:** [Share A Plate](https://share-a-plate-a1shuvo.web.app)  
🛠 **Admin Panel:** [Admin Dashboard](https://share-a-plate-a1shuvo.web.app/dashboard/admin)  
👤 **Admin Login:**

- **Email:** admin@demo.com
- **Password:** 1234@A

---

## 🚀 Features

- 🔐 **Role-Based Authentication** with Firebase (Admin, Restaurant, Charity, User)
- 🍱 **Restaurant Dashboard** to add, manage, and track food donations
- 🎯 **Charity Dashboard** to request donations, confirm pickups, and review food
- ❤️ **User Dashboard** with favorites, review history, and charity role upgrade
- 📈 **Donation Statistics Chart** with Recharts showing quantities by food type
- ⭐ **Featured Donations** marked by admins for special highlighting
- 🧾 **Donation Request Flow** with request acceptance, rejection, and tracking
- 💳 **Stripe Integration** for upgrading to Charity role (with payment history)
- ✨ **Modern UI with DaisyUI & Tailwind CSS**, fully responsive
- 📂 **Protected Routes by Role** with route guards (Admin, Charity, etc.)
- ❌ **Custom 404 Not Found Page** for invalid routes

---

## 🛠 Technologies Used

- **Frontend:** React, Vite, React Router DOM, DaisyUI, Tailwind CSS, React Icons
- **Backend:** Express.js, MongoDB, Firebase Admin SDK, Stripe API
- **Authentication:** Firebase Auth (Email/Password + Google)
- **Authorization:** JWT, Custom Role Middleware
- **Charting:** Recharts
- **State Management:** React Hook Form, React Query
- **Deployment:** Firebase Hosting & Render.com (for backend)
