import { useTasks } from "../context/TaskContext";
import { FileDown, BarChart3 } from "lucide-react";

export default function ReportsPage() {
  const { tasks } = useTasks();
  const selesai = tasks.filter((t) => t.completed).length;
  const belum = tasks.length - selesai;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
        Laporan Aktivitas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-100">
          <BarChart3 size={28} className="text-teal-500 mb-3" />
          <p className="text-slate-500 text-sm">Progress Pekerjaan</p>
          <div className="w-full bg-slate-200 rounded-full h-4 mt-3">
            <div
              className="bg-teal-500 h-4 rounded-full transition-all"
              style={{ width: `${(selesai / tasks.length) * 100 || 0}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {selesai} dari {tasks.length} tugas selesai ({belum} belum selesai)
          </p>
        </div>

        {/* Download */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-100 flex flex-col gap-4">
          <div>
            <FileDown size={28} className="text-teal-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">Unduh Laporan</h3>
            <p className="text-slate-500 text-sm mb-4">
              Dapatkan laporan semua tugas dalam format PDF.
            </p>
          </div>

          {/* Tombol di bawah teks */}
          <button
            className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 
            text-white font-medium px-4 py-2 rounded-lg shadow-md text-sm transition-all w-max"
          >
            <FileDown size={16} />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
