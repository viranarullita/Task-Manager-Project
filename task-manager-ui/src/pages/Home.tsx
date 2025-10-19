import { useState } from "react";
import { PlusCircle } from "lucide-react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Manajemen Tugas
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Tambahkan, pantau, dan kelola semua tugas di sini.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 hover:scale-105 transition-all duration-300 text-white px-5 py-2 rounded-lg font-medium shadow-sm"
        >
          <PlusCircle size={20} />
          {showForm ? "Tutup Form" : "Tambah Task"}
        </button>
      </header>

      {showForm && (
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
          <TaskForm />
        </div>
      )}

      <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Daftar Tugas
        </h2>
        <TaskList />
      </div>

    </div>
  );
}
