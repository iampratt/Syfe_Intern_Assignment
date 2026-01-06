# Goal-Based Savings Planner 💰

A modern, responsive, and lightweight application designed to help users track their financial goals. Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, it features real-time currency conversion, local data persistence, and a polished user experience.

<img width="1470" height="923" alt="Screenshot 2026-01-06 at 18 53 02" src="https://github.com/user-attachments/assets/f2accbbc-a55b-4115-bc0d-f5317618f2ff" />


---

## 🚀 Features

### 📊 Interactive Dashboard
- **Financial Overview**: View aggregated stats including Total Target, Total Saved, and Overall Completion %.
- **Live Forex Rates**: Real-time **USD ↔ INR** exchange rates fetched from [ExchangeRate-API](https://www.exchangerate-api.com/).
- **Auto-Normalization**: Goals in different currencies are automatically converted to a common baseline for accurate total calculations.

### 🎯 Goal Management
- **Create Custom Goals**: Set targets in either **USD** or **INR**.
- **Visual Progress**: Each goal features a progress bar and completion percentage.
- **Smart Grouping**: Goals are automatically sorted into **Active** and **Completed** sections.
- **Contribution History**: Expandable log showing date-wise contributions for every goal.
- **Management Tools**: Easily delete goals or add new contributions with valid validation.

### ⚙️ Technical Highlights
- **Client-Side Persistence**: All data is securely stored in `localStorage`, allowing the app to work without a backend while retaining data across reloads.
- **Optimized Performance**: Minimized re-renders and efficient state updates using React Context.
- **Responsive Design**: Mobile-first approach ensuring the app looks great on devices of all sizes.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: Native JS & `date-fns` integration
- **Utilities**: `clsx`, `tailwind-merge`

---

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with GoalsProvider
│   ├── page.tsx          # Main Dashboard
│   └── globals.css       # Tailwind & Theme variables
├── components/
│   ├── dashboard/        # Feature-specific components
│   │   ├── GoalCard.tsx
│   │   ├── GoalList.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── AddGoalForm.tsx
│   │   └── AddContributionForm.tsx
│   └── ui/               # Reusable primitives
│       ├── primitives.tsx # Button, Card, Input, etc.
│       └── Modal.tsx
├── lib/
│   ├── store.tsx         # Central State Management (Context)
│   ├── api.ts            # External API services
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions (Currency formatting)
```

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iampratt/Syfe_Intern_Assignment.git
   cd Syfe_Intern_Assignment
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

### Building for Production

```bash
npm run build
npm start
```

---

## 📐 Architecture Decisions

### Why Client-Side Only?
Per the requirement for a "lightweight" planner, I chose to use `localStorage` for persistence. This avoids the complexity of setting up a database and authentication for a demo app, while still providing a persistent experience for the user on a single device.

### Currency Handling
The app uses a **Base Currency Strategy** for display. While goals retain their original currency property, the dashboard sums are calculated by converting everything to a common standard at the current exchange rate, ensuring the "Total Saved" figure is mathematically accurate.

### Styling Strategy
Tailwind CSS was chosen for its velocity and utility-first approach. I abstracted common UI elements (Buttons, Inputs) into a `ui/` folder to maintain consistency and keep the feature components clean.

---

## 🔮 Future Roadmap

- [ ] **Backend Integration**: Sync data across devices using Supabase or Firebase.
- [ ] **Authentication**: User accounts to protect private financial data.
- [ ] **Data Visualization**: Line charts showing savings growth over time.
- [ ] **Multiple Currencies**: Expand support beyond just USD and INR.
- [ ] **Export Data**: CSV/PDF export of financial progress.

---

**Developed by Pratyush**
