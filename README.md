# 📊 Excel Mastery Pro - Complete A-to-Z Data Analyst Platform

> **Created & Developed with ❤️ by Ujesh Mishra** (`ujeshmishra@gmail.com`)  
> *Lead Data Analytics Instructor & Platform Architect*

---

## 🌟 Overview

**Excel Mastery Pro** is a modern full-stack web application engineered for mastering Microsoft Excel for Corporate Data Analytics. It includes:

1. **10 In-Depth A-to-Z Modules** with a 5-Stage Pedagogical Blueprint (Definition ➔ Ribbon Menu Clicks ➔ Visual Arrows & Simulator ➔ Corporate Case Scenarios ➔ Progressive Examples ➔ Error Debugging).
2. **Interactive Live Excel Grid Simulator & Animation Engine** with formula bar typing, cell coordinate highlights, and automated step validation checks.
3. **Master Excel Ribbon Menu Guide & Shortcuts Hub** covering GUI click paths and speed keyboard shortcuts.
4. **Solved Corporate Practice Cases Hub (Medium to Hard)** covering Churn Diagnostics, Multi-Currency Consolidation, HR Attrition, Supply Chain ROP, and SaaS Cohort Retention (NRR).
5. **50-Mark Assessment Test Engine** (20 Objective MCQs + 30-Mark Multi-Step Practical Formula Problems with Instant Auto-Grading).
6. **Power BI Hub** for scheduling live masterclasses and sharing `.pbix` datasets.
7. **Admin & Teacher Dashboard** with dedicated authentication for `ujeshmishra@gmail.com` to review student telemetry and manage test questions.
8. **English & Hinglish Bilingual Mode** for natural learning intuition.

---

## 🛠️ Project Structure

```
excel-mastery-pro/
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── ModuleList.jsx
│   │   │   ├── ModuleDetail.jsx
│   │   │   ├── ExcelSimulator.jsx
│   │   │   ├── VisualArrowDiagram.jsx
│   │   │   ├── RibbonExplorer.jsx
│   │   │   ├── ShortcutsHub.jsx
│   │   │   ├── PracticeCasesHub.jsx
│   │   │   ├── AssessmentTest.jsx
│   │   │   ├── PowerBiHub.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminLoginModal.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/                     # Express.js Backend & Auto-Grader
│   ├── data/
│   │   └── store.json          # Complete curriculum, test bank & sessions
│   ├── routes/
│   │   ├── api.js              # Student APIs & auto-grading
│   │   └── admin.js            # Admin/Teacher auth & management
│   ├── services/
│   │   └── grader.js           # Automated formula validator
│   ├── index.js                # Express entry point
│   └── package.json
└── README.md
```

---

## 🚀 Running Locally

### 1. Start the Backend Server:
```bash
cd server
npm install
node index.js
# Runs on http://localhost:5000
```

### 2. Start the Frontend Client:
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 👨‍🏫 Instructor & Author

**Ujesh Mishra**  
- Email: `ujeshmishra@gmail.com`  
- Role: Lead Data Analytics Instructor & Admin  
- Repository: [https://github.com/Ujesh2104/Excel_DataAnalysis](https://github.com/Ujesh2104/Excel_DataAnalysis)
