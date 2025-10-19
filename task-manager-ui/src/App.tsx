import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
} from "lucide-react";

import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home"; 
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 transition-all duration-300 p-2 px-4 rounded-lg ${
      isActive
        ? "bg-teal-500 text-white shadow-sm"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-cyan-50 to-white">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-800 text-white flex flex-col p-6 shadow-xl">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <CheckSquare size={28} className="text-teal-400" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Task<span className="text-teal-400">Flow</span>
              </h2>
            </div>

            {/* Navigasi */}
            <nav className="flex flex-col gap-2 text-base">
              <NavLink to="/" className={linkClass} end>
                <LayoutDashboard size={20} /> Dashboard
              </NavLink>
              <NavLink to="/tasks" className={linkClass}>
                <CheckSquare size={20} /> Tasks
              </NavLink>
              <NavLink to="/reports" className={linkClass}>
                <FileText size={20} /> Reports
              </NavLink>
            </nav>

            <footer className="mt-auto border-t border-slate-700 pt-5 text-center text-slate-400 text-sm select-none">
              © {new Date().getFullYear()} Vira Narullita. All rights reserved.
            </footer>
          </aside>

          {/* Konten Halaman */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tasks" element={<Home />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
}