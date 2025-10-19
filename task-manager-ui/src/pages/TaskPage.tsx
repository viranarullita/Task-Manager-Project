import { useState } from "react";
import { PlusCircle, X } from "lucide-react"; 
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-3 sm:px-4 md:px-6 lg:px-10 transition-all duration-300">
      <header className="flex flex-col items-start gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Manajemen Tugas
        </h1>
        <p className="text-slate-500 text-sm md:text-base leading-snug">
          Tambahkan, pantau, dan kelola semua tugas di sini.
        </p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-3 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 hover:scale-[1.03] transition-all duration-300 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm"
        >
          {showForm ? <X size={20} /> : <PlusCircle size={20} />}
          {showForm ? "Tutup Form" : "Tambah Task"}
        </button>
      </header>

      {showForm && (
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-7 border border-slate-100 transition-all duration-300">
          <TaskForm />
        </div>
      )}

      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-7 border border-slate-100 transition-all duration-300">
        <h2 className="text-lg md:text-xl font-semibold text-slate-700 mb-4 md:mb-6">
          Daftar Tugas
        </h2>
        <TaskList />
      </div>
    </div>
  );
}
