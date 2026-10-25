# ⚡ Merchant Instant Settlement & Micro-Cashflow Predictor

> Built as part of the **Razorpay Fix-My-Itch** payment engineering initiative. Solving working-capital lockups for D2C merchants with on-demand payouts and real-time fee transparency.

🔗 **Live Interactive Demo:** [https://merchant-instant-settlement.vercel.app](https://merchant-instant-settlement.vercel.app)  
📂 **Portfolio:** [Abhay Vinod Portfolio](https://github.com/abhayvinod-web)

---

## 📌 Problem Statement

Traditional payment gateways operate on a rigid **T+2 banking settlement cycle**, forcing high-growth D2C merchants to wait 48 to 72 hours for funds to clear. This creates acute operational bottlenecks:
- **Cashflow Lockup:** Inability to fund daily supplier payouts, urgent inventory restocking, or ad-spend replenishment over long weekends and bank holidays.
- **Opaque Deductions:** Obscure MDR, GST, and refund withholdings make reconciliation confusing and trigger endless merchant support queries.
- **Binary Choice:** Merchants are either forced into automated daily sweeps or stuck with rigid batch payouts without granular control.

---

## 💡 Solution Overview

An interactive, high-fidelity **Merchant Financial Settlement Console** that gives merchants on-demand liquidity and total fee transparency:
- **On-Demand Payout Slider:** Dynamic liquidity selector enabling merchants to withdraw custom percentages (25%, 50%, 75%, 100%) of their cleared balance.
- **Dual Settlement Modes:** Switch between **Instant (10-Second IMPS Push with 0.15% flat rate)** and **Standard (T+2 Free)**.
- **Real-Time Net Fee Calculator:** Live fee breakdown displaying gross withdrawal, exact convenience fee, and guaranteed net bank credit before dispatch.
- **Optimistic State & Transaction Ledger:** Immediate balance deduction, animated bank credit confirmation, and searchable settlement audit trail.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS (Modern token design & dark mode)
- **Icons:** Lucide React
- **Micro-Interactions:** Canvas Confetti & CSS keyframe animations
- **Build Tool:** Vite 6

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/abhayvinod-web/merchant-instant-settlement.git

# Navigate into project directory
cd merchant-instant-settlement

# Install dependencies
npm install

# Start local development server
npm run dev
