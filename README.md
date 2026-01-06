# Goal-Based Savings Planner 💰

A lightweight, Next.js-based application to follow your financial goals and track savings progress in multiple currencies (USD, INR).

![App Screenshot](https://via.placeholder.com/800x400?text=App+Screenshot+Placeholder)

## 🚀 Features

- **Goal Management**: Create multiple financial goals with custom targets.
- **Multi-Currency Support**: Track goals in USD or INR. Auto-converts values for a unified dashboard view.
- **Live Forex Rates**: Real-time USD ↔ INR exchange rates fetched from [ExchangeRate-API](https://www.exchangerate-api.com/).
- **Progress Tracking**: Visual progress bars and completion percentages.
- **Contributions**: Log contributions with dates to track your journey.
- **Client-Side Persistence**: Data is saved locally in your browser.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + Hooks
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/syfe-savings-planner.git
   cd syfe-savings-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📐 Architecture & Decisions

- **Client-Side Storage**: To keep the app lightweight and server-free as requested, all data is persisted in `localStorage`.
- **Currency Normalization**: The dashboard aggregates totals by converting all amounts to a common baseline (USD/INR) using the live exchange rate.
- **Component Structure**:
  - `src/lib/store.tsx`: Centralized state management using React Context.
  - `src/components/ui`: Low-level reusable primitives (Button, Card, Modal).
  - `src/components/dashboard`: Feature-specific components.

## 🎨 Design

The UI is designed to be clean, modern, and accessible, featuring a "Syfe Blue" color scheme (Indigo/Royal Blue) and a spacious card-based layout.

## ✅ Verification

The application has been tested for:
- Currency conversion accuracy.
- Persistence across reloads.
- Responsive layout on mobile and desktop.
- Error handling for API failures (falbacks to cached/default rates).
