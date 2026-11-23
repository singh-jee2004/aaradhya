# Aaradhya Setu — Puja Booking Management Dashboard

A modern, spiritually inspired administrative platform for managing devotee Puja bookings. Built for **Aaradhya Setu** following the complete Product Requirements Document (PRD).

---

## 🕉️ Overview & Visual Identity

The dashboard combines traditional Indian devotional aesthetics (temple architecture, sandstone & marble surfaces, deep saffron, antique gold, and warm ivory) with a high-performance modern administrative experience.

### Brand Color Palette
- **Warm Ivory (`#FAF7F0`)**: Primary application background
- **Pure White (`#FFFFFF`)**: Surfaces, cards, and data tables
- **Deep Saffron (`#C66A24`)**: Primary actions and active highlights
- **Temple Orange (`#E58A38`)**: Accent badges
- **Antique Gold (`#B89555`)**: Subtle decorative ornaments and borders
- **Deep Maroon (`#642F35`)**: Secondary devotional accents
- **Dark Brown (`#34251E`)**: Headings & primary typography
- **Border Beige (`#EAE1D4`)**: Dividers and borders

---

## 🚀 Features Implemented

1. **Overview Dashboard**
   - **Key Metrics Cards**: Total Bookings, Pending, Confirmed, Completed, and Total Revenue.
   - **Booking Status Distribution**: Interactive visual chart showing counts of Pending, Confirmed, In Progress, and Completed.
   - **Recent Bookings Widget**: Displays the latest 5 bookings with one-click detail inspection.

2. **Booking Management Module**
   - **Full Structured Table**: Displays Booking ID, Devotee Details (Name, Email), Scheduled Puja Name, Scheduled Date, Amount, and Status Badges.
   - **Multi-Field Search**: Real-time case-insensitive search by Booking ID, Devotee Name, or Puja Name.
   - **Status Filtering**: Filter by `All Statuses`, `Pending`, `Confirmed`, `In Progress`, and `Completed`.
   - **Sorting**: Multi-column sorting by Scheduled Puja Date, Amount, and Devotee Name with toggleable Ascending/Descending order.
   - **Empty States & Reset**: Friendly spiritual empty state with a "Reset Filters" action.

3. **Booking Details & Status Management**
   - **Side Drawer**: Full devotee contact details, puja description, date, and fee.
   - **Status Updates**: Instant status transition (`Pending` → `Confirmed` → `In Progress` → `Completed`) with PATCH API integration.
   - **Persistence**: Status updates are saved to MongoDB (or cached store) and remain saved after refreshing.

4. **Robust Backend API**
   - `GET /api/bookings`: Query, search, filter, and sort bookings.
   - `GET /api/bookings/[id]`: Retrieve single booking by document ID or Booking ID.
   - `POST /api/bookings`: Create new booking with full Zod validation.
   - `PATCH /api/bookings/[id]`: Update booking status with validation.
   - `GET /api/stats`: Dashboard summary statistics.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Recharts
- **Backend**: Next.js Route Handlers (Node.js runtime)
- **Database**: MongoDB / Mongoose with cached connection and automated sample seeder
- **Validation**: Zod schema validation

---

## ⚙️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aaradhya_setu?retryWrites=true&w=majority
```
*(Note: If no MongoDB URI is provided, the application automatically uses an in-memory fallback store seeded with 18 realistic devotional bookings so you can run and test immediately).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
