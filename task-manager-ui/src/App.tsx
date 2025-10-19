import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { LayoutDashboard, CheckSquare, FileText, Menu } from "lucide-react";

import DashboardPage from "./pages/DashboardPage";
import Home from "./pages/Home";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 transition-all duration-300 p-2 px-4 rounded-lg ${
      isActive
        ? "bg-teal-500 text-white shadow-sm"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-cyan-50 to-white relative">
          {/* Sidebar */}
          <aside
            className={`fixed md:static top-0 left-0 h-full md:h-auto bg-slate-800 text-white flex flex-col p-6 shadow-xl z-40 transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            w-64 md:w-56 lg:w-64`}
          >
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <CheckSquare size={28} className="text-teal-400" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Task<span className="text-teal-400">Flow</span>
              </h2>
            </div>

            {/* Navigasi */}
            <nav className="flex flex-col gap-2 text-base">
              <NavLink to="/" className={linkClass} end onClick={() => setSidebarOpen(false)}>
                <LayoutDashboard size={20} /> Dashboard
              </NavLink>
              <NavLink to="/tasks" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <CheckSquare size={20} /> Tasks
              </NavLink>
              <NavLink to="/reports" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FileText size={20} /> Reports
              </NavLink>
            </nav>

            <footer className="mt-auto border-t border-slate-700 pt-5 text-center text-slate-400 text-sm select-none">
              © {new Date().getFullYear()} Vira Narullita
            </footer>
          </aside>

          {/* Overlay di HP */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Konten Halaman */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto w-full">
            {/* Tombol Menu untuk Mobile (dipindah ke dalam main agar tidak menutupi teks) */}
            <div className="md:hidden flex items-center mb-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="bg-slate-800 text-white p-2 rounded-md shadow-md mr-3"
              >
                <Menu size={22} />
              </button>
              <h1 className="text-xl font-semibold text-slate-800">Menu</h1>
            </div>

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
